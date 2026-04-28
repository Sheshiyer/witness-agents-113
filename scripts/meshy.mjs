#!/usr/bin/env node
/*
 * scripts/meshy.mjs — Meshy AI API client for the Tryambakam Noesis sigil.
 *
 * Pipeline:
 *   1. image-to-3d  — generate base mesh from the primary gold logo (Asset 1).
 *   2. retexture    — apply the other logo variations as new texture passes.
 *   3. download     — pull the GLB / FBX / USDZ outputs into public/models/.
 *
 * Each operation is async (create task → poll → download). All polling uses
 * 5-second intervals per Meshy's recommendation.
 *
 * Usage:
 *   bun run meshy:plan                              # dry-run, prints what would be sent
 *   bun run meshy:gen-base                          # image-to-3D on primary gold logo
 *   bun run meshy:retexture <task_id> <variant>     # apply a retexture variation
 *   bun run meshy:status <task_id>                  # poll status of an existing task
 *   bun run meshy:balance                           # check account credit balance
 *
 * Or run directly:  node scripts/meshy.mjs <command> [args]
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.resolve(__dirname, '..');

// Most Meshy endpoints live on /openapi/v1. text-to-3d is on /openapi/v2.
const API_HOST  = 'https://api.meshy.ai';
const API_V1    = `${API_HOST}/openapi/v1`;
const API_V2    = `${API_HOST}/openapi/v2`;
const API_BASE  = API_V1; // default for image-to-3d, retexture, remesh, rigging, balance
const API_KEY   = process.env.MESHY_API_KEY;
const POLL_MS   = 5_000;
const MAX_POLLS = 120; // 10 min timeout

const COLOR = {
  reset: '\x1b[0m', dim: '\x1b[2m', gold: '\x1b[33m',
  green: '\x1b[32m', red: '\x1b[31m', cyan: '\x1b[36m'
};

const log = {
  info:  (m) => console.log(`${COLOR.cyan}[meshy]${COLOR.reset} ${m}`),
  ok:    (m) => console.log(`${COLOR.green}[meshy]${COLOR.reset} ${m}`),
  warn:  (m) => console.log(`${COLOR.gold}[meshy]${COLOR.reset} ${m}`),
  err:   (m) => console.log(`${COLOR.red}[meshy]${COLOR.reset} ${m}`),
  dim:   (m) => console.log(`${COLOR.dim}${m}${COLOR.reset}`)
};

const requireKey = () => {
  if (!API_KEY) {
    log.err('MESHY_API_KEY is not set in env. Save it via update-config skill.');
    process.exit(1);
  }
  if (!API_KEY.startsWith('msy_') && !API_KEY.startsWith('msy-')) {
    log.warn(`Key format unexpected (expected msy_… or msy-…). Got: ${API_KEY.slice(0, 5)}…`);
  }
};

// ─── Low-level HTTP ──────────────────────────────────────────
async function meshyRequest(method, endpoint, body = null) {
  const url = `${API_BASE}${endpoint}`;
  const opts = {
    method,
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Accept': 'application/json'
    }
  };
  if (body) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(url, opts);
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}: ${json.message || json.raw || res.statusText}`);
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}

// ─── Asset helpers ──────────────────────────────────────────
async function fileToDataUri(filepath) {
  const abs = path.resolve(ROOT, filepath);
  if (!existsSync(abs)) throw new Error(`Asset not found: ${abs}`);
  const buf = await readFile(abs);
  const ext = path.extname(abs).slice(1).toLowerCase();
  const mime = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;
  return `data:${mime};base64,${buf.toString('base64')}`;
}

async function downloadTo(url, savePath) {
  const abs = path.resolve(ROOT, savePath);
  await mkdir(path.dirname(abs), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(abs, buf);
  return { path: abs, size: buf.length };
}

// ─── Polling ────────────────────────────────────────────────
async function pollUntilDone(endpoint, taskId) {
  for (let i = 0; i < MAX_POLLS; i++) {
    const task = await meshyRequest('GET', `${endpoint}/${taskId}`);
    const status = task.status || task.task_status || 'UNKNOWN';
    process.stdout.write(`\r${COLOR.cyan}[poll]${COLOR.reset} ${taskId.slice(0,8)}… status=${status} progress=${task.progress ?? '?'}%   `);
    if (status === 'SUCCEEDED') {
      process.stdout.write('\n');
      return task;
    }
    if (status === 'FAILED' || status === 'CANCELED' || status === 'EXPIRED') {
      process.stdout.write('\n');
      throw new Error(`Task ${taskId} ended with status=${status}: ${task.task_error?.message || JSON.stringify(task.task_error || task)}`);
    }
    await new Promise(r => setTimeout(r, POLL_MS));
  }
  throw new Error(`Task ${taskId} timed out after ${MAX_POLLS * POLL_MS / 1000}s`);
}

// ─── Commands ───────────────────────────────────────────────

async function cmdBalance() {
  requireKey();
  // Balance endpoint lives on the v1 base, not v2.
  const res = await fetch('https://api.meshy.ai/openapi/v1/balance', {
    headers: { 'Authorization': `Bearer ${API_KEY}` }
  }).then(r => r.json());
  log.ok(`Credits available: ${COLOR.gold}${res.balance ?? '?'}${COLOR.reset}`);
  log.dim(`Full pipeline plan = 60 credits (${((60 / (res.balance || 1)) * 100).toFixed(1)}% of balance)`);
}

async function cmdPlan() {
  log.info('DRY RUN — no API calls will be made.');
  log.info('');
  log.info('Pipeline plan:');
  log.dim('  1. image-to-3d   — public/images/brand-logo/01-gold-thin.png  →  GLB base mesh');
  log.dim('     • model=meshy-6, target_polycount=12000, topology=quad,');
  log.dim('       enable_pbr=true, hd_texture=true, should_remesh=true');
  log.dim('     • cost: 30 credits');
  log.dim('     • turnaround: ~60-180s');
  log.dim('     • output: public/models/sigil-base.glb');
  log.dim('');
  log.dim('  2. retexture × 3 — using the other logo variants as texture references:');
  log.dim('     • 02-gold-duotone (Asset 2)        → public/models/sigil-duotone.glb');
  log.dim('     • 06-black-thick-amber (Asset 6)   → public/models/sigil-emboss.glb');
  log.dim('     • 07-gold-thick (Asset 7)          → public/models/sigil-foil.glb');
  log.dim('     • cost: 10 credits each (30 total)');
  log.dim('     • turnaround: ~30-90s each');
  log.dim('');
  log.dim('  Total: 60 credits · ~5-15 minutes wall-time.');
  log.dim('');
  log.info('Run  bun run meshy:gen-base  to start with image-to-3D.');
}

async function cmdGenBase() {
  requireKey();
  const inputPath = 'public/images/brand-logo/01-gold-thin.png';
  log.info(`Encoding ${inputPath} as data URI…`);
  const dataUri = await fileToDataUri(inputPath);
  log.info(`Encoded: ${(dataUri.length / 1024).toFixed(1)} KB base64`);

  const body = {
    image_url: dataUri,
    ai_model: 'meshy-6',
    topology: 'quad',
    target_polycount: 12000,
    should_remesh: true,
    should_texture: true,
    enable_pbr: true,
    hd_texture: true,
    symmetry_mode: 'auto',
    moderation: false
  };

  log.info('Creating image-to-3d task…');
  const create = await meshyRequest('POST', '/image-to-3d', body);
  const taskId = create.result || create.id || create.task_id;
  if (!taskId) throw new Error(`No task id in response: ${JSON.stringify(create)}`);
  log.ok(`Task created: ${taskId}`);

  // Save task id immediately for resumability
  await mkdir(path.resolve(ROOT, 'public/models'), { recursive: true });
  await writeFile(path.resolve(ROOT, 'public/models/.meshy-tasks.json'),
    JSON.stringify({ base: { taskId, createdAt: new Date().toISOString() } }, null, 2));

  log.info(`Polling every ${POLL_MS/1000}s (timeout ${MAX_POLLS * POLL_MS / 1000}s)…`);
  const task = await pollUntilDone('/image-to-3d', taskId);
  log.ok(`Task succeeded.`);
  log.dim(`  GLB:  ${task.model_urls?.glb}`);
  log.dim(`  FBX:  ${task.model_urls?.fbx}`);
  log.dim(`  USDZ: ${task.model_urls?.usdz}`);
  log.dim(`  Credits consumed: ${task.task_cost ?? task.consumed_credits ?? '?'}`);

  // Download primary GLB
  if (task.model_urls?.glb) {
    log.info('Downloading GLB → public/models/sigil-base.glb');
    const dl = await downloadTo(task.model_urls.glb, 'public/models/sigil-base.glb');
    log.ok(`Saved: ${dl.path} (${(dl.size/1024).toFixed(1)} KB)`);
  }
  if (task.thumbnail_url) {
    log.info('Downloading thumbnail → public/models/sigil-base-preview.png');
    await downloadTo(task.thumbnail_url, 'public/models/sigil-base-preview.png');
  }

  log.ok('Base mesh complete. Next: bun run meshy:retexture-all');
  return taskId;
}

async function cmdRetexture(taskId, variant) {
  requireKey();
  if (!taskId || !variant) {
    log.err('Usage: meshy:retexture <task_id> <variant: duotone|emboss|foil|all>');
    process.exit(1);
  }

  const variants = {
    duotone: { logo: 'public/images/brand-logo/02-gold-duotone.png',       out: 'sigil-duotone.glb',
               prompt: 'Sacred Gold lines with deep Witness Violet inner shadow, two-tone bioluminescent edge, ornamental sacred geometry, ceremonial bronze' },
    emboss:  { logo: 'public/images/brand-logo/06-black-thick-amber.png',  out: 'sigil-emboss.glb',
               prompt: 'Embossed black sigil with Sacred Gold inner glow, hot foil stamp on Void Black, blind-emboss sacred geometry' },
    foil:    { logo: 'public/images/brand-logo/07-gold-thick.png',         out: 'sigil-foil.glb',
               prompt: 'Polished Sacred Gold foil sigil, mirror-finish ceremonial metal, hot stamp on dark surface, archival pigment' }
  };

  const targets = variant === 'all' ? Object.keys(variants) : [variant];
  if (variant !== 'all' && !variants[variant]) {
    log.err(`Unknown variant: ${variant}. Choose: ${Object.keys(variants).join('|')}|all`);
    process.exit(1);
  }

  for (const v of targets) {
    const cfg = variants[v];
    log.info(`Retexture variant: ${v}`);
    const dataUri = await fileToDataUri(cfg.logo);

    const body = {
      input_task_id: taskId,
      ai_model: 'meshy-6',
      text_style_prompt: cfg.prompt,
      image_style_url: dataUri,
      enable_pbr: true,
      hd_texture: true
    };

    const create = await meshyRequest('POST', '/retexture', body);
    const newTaskId = create.result || create.id || create.task_id;
    log.ok(`Task created: ${newTaskId}`);

    const task = await pollUntilDone('/retexture', newTaskId);
    log.ok(`Variant ${v} succeeded. Credits: ${task.task_cost ?? task.consumed_credits ?? '?'}`);

    if (task.model_urls?.glb) {
      const savePath = `public/models/${cfg.out}`;
      log.info(`Downloading → ${savePath}`);
      const dl = await downloadTo(task.model_urls.glb, savePath);
      log.ok(`Saved: ${dl.path} (${(dl.size/1024).toFixed(1)} KB)`);
    }
    if (task.thumbnail_url) {
      const previewPath = `public/models/${cfg.out.replace('.glb', '-preview.png')}`;
      await downloadTo(task.thumbnail_url, previewPath);
    }
  }

  log.ok('Retexture pass complete.');
}

async function cmdStatus(taskIdOrEndpoint, taskIdMaybe) {
  requireKey();
  // Accept either: meshy:status <taskId>  (auto-detect endpoint via image-to-3d)
  //         or:    meshy:status <endpoint> <taskId>
  let endpoint = '/image-to-3d';
  let taskId = taskIdOrEndpoint;
  if (taskIdMaybe) {
    endpoint = taskIdOrEndpoint.startsWith('/') ? taskIdOrEndpoint : `/${taskIdOrEndpoint}`;
    taskId = taskIdMaybe;
  }

  const task = await meshyRequest('GET', `${endpoint}/${taskId}`);
  log.ok(`Status: ${task.status} progress=${task.progress ?? '?'}%`);
  console.log(JSON.stringify(task, null, 2));
}

// ─── CLI dispatch ────────────────────────────────────────────
const [, , cmd, ...args] = process.argv;

const commands = {
  plan:        cmdPlan,
  balance:     cmdBalance,
  'gen-base':  cmdGenBase,
  retexture:   () => cmdRetexture(args[0], args[1]),
  'retexture-all': async () => {
    const stateFile = path.resolve(ROOT, 'public/models/.meshy-tasks.json');
    if (!existsSync(stateFile)) {
      log.err('Run meshy:gen-base first — no base task id found.');
      process.exit(1);
    }
    const state = JSON.parse(await readFile(stateFile, 'utf-8'));
    if (!state.base?.taskId) throw new Error('No base task id in state');
    await cmdRetexture(state.base.taskId, 'all');
  },
  status:      () => cmdStatus(args[0], args[1])
};

if (!cmd || !commands[cmd]) {
  console.log(`
${COLOR.gold}Meshy AI · Tryambakam Noesis sigil pipeline${COLOR.reset}

Commands:
  plan              Print the planned pipeline (no API call)
  balance           Check account credit balance
  gen-base          Generate base 3D mesh from primary gold logo (image-to-3D)
  retexture-all     Apply all 3 retexture variations to the base mesh
  retexture <id> <duotone|emboss|foil|all>
                    Apply a single (or all) retexture variant(s)
  status <id> [endpoint]
                    Check status of an existing task

Env: MESHY_API_KEY required (read from process.env)

Examples:
  bun run meshy:plan
  bun run meshy:balance
  bun run meshy:gen-base
  bun run meshy:retexture-all
`);
  process.exit(0);
}

try {
  await commands[cmd]();
} catch (err) {
  log.err(err.message);
  if (err.body) console.error(JSON.stringify(err.body, null, 2));
  process.exit(1);
}
