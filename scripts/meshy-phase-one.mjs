#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const API_HOST = 'https://api.meshy.ai';
const API_V1 = `${API_HOST}/openapi/v1`;
const API_V2 = `${API_HOST}/openapi/v2`;
const TEST_MODE_KEY = 'msy_dummy_api_key_for_test_mode_12345678';
const POLL_MS = 5_000;
const MAX_POLLS = 120;
const MAX_PROMPT_LENGTH = 600;
const MANIFEST_PATH = 'tasks/meshy-phase-one-last-run.json';

const COLOR = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  gold: '\x1b[33m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

const log = {
  info: (message) => console.log(`${COLOR.cyan}[meshy-phase1]${COLOR.reset} ${message}`),
  ok: (message) => console.log(`${COLOR.green}[meshy-phase1]${COLOR.reset} ${message}`),
  warn: (message) => console.log(`${COLOR.gold}[meshy-phase1]${COLOR.reset} ${message}`),
  err: (message) => console.log(`${COLOR.red}[meshy-phase1]${COLOR.reset} ${message}`),
  dim: (message) => console.log(`${COLOR.dim}${message}${COLOR.reset}`)
};

const OBJECTS = {
  '11-nadabrahman': {
    label: 'Nada Brahman',
    section: '11',
    liveAsset: 'public/images/engines/fal/9A-09-nadabrahman-poster-fal-v1.png',
    previewPrompt: 'Harmonic resolution disc, thin layered bronze and brass rings around a central opening, concentric interference channels, clean front-readable silhouette, contemplative ritual-scientific object, sound resolving into coherence, restrained emerald resonance lines and sacred-gold harmonics, no text.',
    texturePrompt: 'Bronze and brass laminations, restrained emerald resonance channels, sacred-gold harmonic traces, deep witness-violet recess around the center opening, subtle amber convergence highlights, matte ceremonial finish, no rainbow neon.'
  },
  '15-biofield': {
    label: 'Biofield',
    section: '15',
    liveAsset: 'public/images/engines/fal/9A-06-biofield-poster-fal-v1.png',
    previewPrompt: 'Single torus ring around a short central axis, clean donut silhouette, measurable biofield instrument, circulating emerald current lines, sacred-gold nodal crossings, subtle-anatomy object, coherence and fracture made visible, bioluminescent from within, no cage, no spikes, no sphere shell, no person, no text.',
    texturePrompt: 'Dark short central axis, one translucent torus shell, emerald circulating lines, sacred-gold nodal crossings, indigo-violet recess depth, minimal structural braces, measured field-instrument finish, no fuzzy aura, no lattice cage, no spikes, no spherical enclosure.'
  },
  '02-sigil-forge': {
    label: 'Sigil Forge',
    section: '02',
    liveAsset: 'public/images/engines/fal/9A-16-sigil-forge-poster-fal-v1.png',
    previewPrompt: 'Geometric forge mechanism, partially assembled ring chassis above a dark ceramic anchor plane, open center, misaligned brass and dark bronze ringwork, load-bearing sacred geometry, precise observatory instrument, emerald seams and sacred-gold edges, no icon, no emblem, no anchor, no letter, no religious symbol, no text.',
    texturePrompt: 'Aged brass and dark bronze with subtle patina, dark ceramic anchor plane, engraved channels, emerald emissive seams, sacred-gold edge highlights, faint indigo-violet recess depth, matte ritual-scientific finish, no iconography, no neon overspray.'
  },
  '04-aletheios': {
    label: 'Aletheios',
    section: '04',
    liveAsset: 'public/images/engines/fal/9A-01-panchanga-poster-fal-v1.png',
    previewPrompt: 'Observatory reliquary named Aletheios, upright non-human witness instrument with concentric brass rings, dark bronze armatures, amber-glass insets, black structural core, sacred-gold index marks, calendrical divisions, sparse exact silhouette, no face, no text.',
    texturePrompt: 'Aged brass rings, dark bronze armatures, amber-glass insets, black ceramic core, sacred-gold index marks, restrained witness-violet depth in recesses, minimal emerald activation cues, archival patina, clean instrument finish.'
  },
  '05-pichet': {
    label: 'Pichet',
    section: '05',
    liveAsset: 'public/images/engines/fal/9A-07-biorhythm-poster-fal-v1.png',
    previewPrompt: 'Sealed breath vessel named Pichet, non-human thoracic chamber object built from dark bronze architecture, ceramic-black mass, oxidized-gold joints, pulse cavities and vented chambers, translucent emerald channels, grounded dense silhouette, ritual-scientific instrument for breath and rhythm, no limbs, no hands, no skeleton, no humanoid trunk, no face, no text.',
    texturePrompt: 'Dark bronze chamber architecture with subtle wear, ceramic-black body mass, oxidized-gold joints, emerald emissive channels through sealed pulse cavities, sacred-gold pulse traces, restrained indigo cavity depth, grounded matte finish, no plastic shine, no exposed bone anatomy.'
  }
};

const DEFAULT_ORDER = ['11-nadabrahman', '15-biofield', '02-sigil-forge', '04-aletheios', '05-pichet'];

function readClaudeEnvValue(name) {
  const envPath = path.join(os.homedir(), '.claude', '.env');
  if (!existsSync(envPath)) return null;

  try {
    const raw = readFileSync(envPath, 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      if (line.startsWith(`${name}=`)) {
        return line.slice(name.length + 1).trim();
      }
    }
  } catch {
    return null;
  }

  return null;
}

function parseCli(argv) {
  const flags = new Set();
  const positional = [];

  for (const arg of argv) {
    if (arg.startsWith('--')) {
      flags.add(arg);
      continue;
    }
    positional.push(arg);
  }

  return { flags, positional };
}

function getFlagValue(flags, prefix) {
  for (const flag of flags) {
    if (flag.startsWith(`${prefix}=`)) {
      return flag.slice(prefix.length + 1);
    }
  }
  return null;
}

function resolveApiContext(flags) {
  const envKey = readClaudeEnvValue('MESHY_API_KEY') || process.env.MESHY_API_KEY || null;
  const forceTestMode = flags.has('--test-mode');
  const useTestMode = forceTestMode || !envKey;
  const apiKey = useTestMode ? TEST_MODE_KEY : envKey;

  if (!envKey && !forceTestMode) {
    log.warn('No real MESHY_API_KEY found in process.env or ~/.claude/.env. Falling back to Meshy test mode.');
  }
  if (useTestMode) {
    log.warn('Meshy test mode returns a sample task/result and does not consume credits.');
  }

  return {
    apiKey,
    mode: useTestMode ? 'test' : 'live',
    hasRealKey: Boolean(envKey)
  };
}

function ensurePromptLength(prompt, label) {
  if (prompt.length > MAX_PROMPT_LENGTH) {
    throw new Error(`${label} exceeds ${MAX_PROMPT_LENGTH} characters (${prompt.length}). Tighten the prompt before calling Meshy.`);
  }
}

function getOutputRoot(runMode, tag) {
  const base = runMode === 'live'
    ? 'public/models/engines'
    : '.artifacts/meshy-phase-one/test-mode';

  return tag ? path.join(base, tag) : base;
}

function getOutputPaths(key, runMode, tag) {
  const root = getOutputRoot(runMode, tag);
  const base = path.join(root, key);

  return {
    previewModel: `${base}-preview.glb`,
    previewThumbnail: `${base}-preview.png`,
    refinedModel: `${base}.glb`,
    refinedThumbnail: `${base}.png`,
    previewTask: `${base}-preview-task.json`,
    refinedTask: `${base}-refine-task.json`
  };
}

async function meshyRequest({ apiKey, method, url, body = null }) {
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: 'application/json'
    }
  };

  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const text = await response.text();
  let json;

  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }

  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}: ${json.message || json.raw || response.statusText}`);
    error.status = response.status;
    error.body = json;
    throw error;
  }

  return json;
}

async function pollTextTo3D(apiContext, taskId) {
  for (let poll = 0; poll < MAX_POLLS; poll += 1) {
    const task = await meshyRequest({
      apiKey: apiContext.apiKey,
      method: 'GET',
      url: `${API_V2}/text-to-3d/${taskId}`
    });

    const status = task.status || 'UNKNOWN';
    process.stdout.write(`\r${COLOR.cyan}[poll]${COLOR.reset} ${taskId.slice(0, 8)}… status=${status} progress=${task.progress ?? '?'}%   `);

    if (status === 'SUCCEEDED') {
      process.stdout.write('\n');
      return task;
    }

    if (status === 'FAILED' || status === 'CANCELED' || status === 'EXPIRED') {
      process.stdout.write('\n');
      throw new Error(`Task ${taskId} ended with status=${status}: ${task.task_error?.message || JSON.stringify(task.task_error || task)}`);
    }

    await new Promise((resolve) => setTimeout(resolve, POLL_MS));
  }

  throw new Error(`Task ${taskId} timed out after ${(MAX_POLLS * POLL_MS) / 1000}s`);
}

async function writeJson(relativePath, data) {
  const absolutePath = path.resolve(ROOT, relativePath);
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, `${JSON.stringify(data, null, 2)}\n`);
}

async function downloadTo(url, relativePath) {
  const absolutePath = path.resolve(ROOT, relativePath);
  await mkdir(path.dirname(absolutePath), { recursive: true });

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed: HTTP ${response.status} for ${url}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(absolutePath, buffer);

  return {
    path: absolutePath,
    bytes: buffer.length
  };
}

function getObjectKeys(value) {
  if (!value || value === 'all') return DEFAULT_ORDER;
  if (value === 'phase1') return DEFAULT_ORDER;
  if (!OBJECTS[value]) {
    throw new Error(`Unknown object "${value}". Choose one of: ${Object.keys(OBJECTS).join(', ')}, phase1, all`);
  }
  return [value];
}

async function loadManifest() {
  const absolutePath = path.resolve(ROOT, MANIFEST_PATH);
  if (!existsSync(absolutePath)) {
    return {
      date: new Date().toISOString(),
      runs: []
    };
  }

  return JSON.parse(await readFile(absolutePath, 'utf8'));
}

async function saveManifest(runRecord) {
  const manifest = await loadManifest();
  manifest.date = new Date().toISOString();
  manifest.runs.push(runRecord);
  await writeJson(MANIFEST_PATH, manifest);
}

async function cmdPlan() {
  log.info('Phase 1 generation plan:');
  log.dim('Meshy guidance applied: single object, object-first wording, 3-5 dominant descriptors, repeated style anchors, no scene prompting.');
  log.dim('');
  for (const key of DEFAULT_ORDER) {
    const object = OBJECTS[key];
    log.dim(`  ${object.section} · ${object.label} (${key})`);
    log.dim(`    live asset: ${object.liveAsset}`);
    log.dim(`    preview: ${object.previewPrompt}`);
    log.dim(`    texture: ${object.texturePrompt}`);
    log.dim('');
  }
  log.dim('Meshy flow: preview (20 credits) -> refine (10 credits) per object when using a real key.');
  log.dim(`Estimated phase 1 cost: ${DEFAULT_ORDER.length * 30} credits total.`);
}

async function cmdBalance(flags) {
  const apiContext = resolveApiContext(flags);
  if (apiContext.mode !== 'live') {
    throw new Error('A real MESHY_API_KEY is required for balance checks. Test mode does not expose account credits.');
  }

  const balance = await meshyRequest({
    apiKey: apiContext.apiKey,
    method: 'GET',
    url: `${API_V1}/balance`
  });

  log.ok(`Credits available: ${COLOR.gold}${balance.balance ?? '?'}${COLOR.reset}`);
  log.dim(`Estimated real run cost for phase 1: ${DEFAULT_ORDER.length * 30} credits total.`);
}

async function runObject(apiContext, key, tag) {
  const object = OBJECTS[key];
  const outputPaths = getOutputPaths(key, apiContext.mode, tag);
  ensurePromptLength(object.previewPrompt, `${object.label} preview prompt`);
  ensurePromptLength(object.texturePrompt, `${object.label} texture prompt`);

  log.info(`Creating preview task for ${object.label} (${apiContext.mode} mode)…`);
  const previewRequest = {
    mode: 'preview',
    prompt: object.previewPrompt,
    ai_model: 'meshy-6',
    should_remesh: true,
    topology: 'quad',
    target_polycount: 40000,
    symmetry_mode: 'auto',
    target_formats: ['glb'],
    moderation: false
  };

  const previewCreate = await meshyRequest({
    apiKey: apiContext.apiKey,
    method: 'POST',
    url: `${API_V2}/text-to-3d`,
    body: previewRequest
  });
  const previewTaskId = previewCreate.result;
  if (!previewTaskId) {
    throw new Error(`Preview task for ${object.label} did not return a task id.`);
  }

  const previewTask = await pollTextTo3D(apiContext, previewTaskId);
  await writeJson(outputPaths.previewTask, previewTask);

  let previewModel = null;
  let previewThumbnail = null;

  if (previewTask.model_urls?.glb) {
    previewModel = await downloadTo(previewTask.model_urls.glb, outputPaths.previewModel);
  }
  if (previewTask.thumbnail_url) {
    previewThumbnail = await downloadTo(previewTask.thumbnail_url, outputPaths.previewThumbnail);
  }

  log.info(`Creating refine task for ${object.label} (${apiContext.mode} mode)…`);
  const refineRequest = {
    mode: 'refine',
    preview_task_id: previewTaskId,
    ai_model: 'meshy-6',
    enable_pbr: true,
    hd_texture: true,
    remove_lighting: true,
    texture_prompt: object.texturePrompt,
    target_formats: ['glb'],
    moderation: false
  };

  const refineCreate = await meshyRequest({
    apiKey: apiContext.apiKey,
    method: 'POST',
    url: `${API_V2}/text-to-3d`,
    body: refineRequest
  });
  const refineTaskId = refineCreate.result;
  if (!refineTaskId) {
    throw new Error(`Refine task for ${object.label} did not return a task id.`);
  }

  const refineTask = await pollTextTo3D(apiContext, refineTaskId);
  await writeJson(outputPaths.refinedTask, refineTask);

  let refinedModel = null;
  let refinedThumbnail = null;

  if (refineTask.model_urls?.glb) {
    refinedModel = await downloadTo(refineTask.model_urls.glb, outputPaths.refinedModel);
  }
  if (refineTask.thumbnail_url) {
    refinedThumbnail = await downloadTo(refineTask.thumbnail_url, outputPaths.refinedThumbnail);
  }

  return {
    key,
    label: object.label,
    section: object.section,
    liveAsset: object.liveAsset,
    mode: apiContext.mode,
    previewTaskId,
    refineTaskId,
    previewPrompt: object.previewPrompt,
    texturePrompt: object.texturePrompt,
    consumedCredits: {
      preview: previewTask.consumed_credits ?? previewTask.task_cost ?? null,
      refine: refineTask.consumed_credits ?? refineTask.task_cost ?? null
    },
    outputs: {
      previewModel,
      previewThumbnail,
      refinedModel,
      refinedThumbnail
    }
  };
}

async function cmdGenerate(target, flags) {
  const keys = getObjectKeys(target);
  const apiContext = resolveApiContext(flags);
  const tag = getFlagValue(flags, '--tag');
  const startedAt = new Date().toISOString();
  const results = [];

  log.info(`Run mode: ${apiContext.mode}`);
  log.info(`Output root: ${getOutputRoot(apiContext.mode, tag)}`);
  if (tag) {
    log.info(`Output tag: ${tag}`);
  }

  for (const key of keys) {
    results.push(await runObject(apiContext, key, tag));
  }

  const runRecord = {
    startedAt,
    finishedAt: new Date().toISOString(),
    mode: apiContext.mode,
    usedRealKey: apiContext.hasRealKey,
    tag,
    order: keys,
    objects: results
  };

  await saveManifest(runRecord);
  log.ok(`Saved run manifest to ${MANIFEST_PATH}`);
}

async function cmdStatus(taskId, flags) {
  if (!taskId) {
    throw new Error('Usage: node scripts/meshy-phase-one.mjs status <task_id>');
  }

  const apiContext = resolveApiContext(flags);
  const task = await meshyRequest({
    apiKey: apiContext.apiKey,
    method: 'GET',
    url: `${API_V2}/text-to-3d/${taskId}`
  });

  log.ok(`Status: ${task.status} progress=${task.progress ?? '?'}%`);
  console.log(JSON.stringify(task, null, 2));
}

const { flags, positional } = parseCli(process.argv.slice(2));
const [command = 'help', target] = positional;

const commands = {
  plan: () => cmdPlan(),
  balance: () => cmdBalance(flags),
  generate: () => cmdGenerate(target, flags),
  status: () => cmdStatus(target, flags)
};

if (!commands[command]) {
  console.log(`
${COLOR.gold}Meshy AI · Witness phase 1 object pipeline${COLOR.reset}

Commands:
  plan
      Print the phase 1 object generation plan.
  balance
      Check live account balance. Requires a real MESHY_API_KEY.
  generate <11-nadabrahman|15-biofield|02-sigil-forge|04-aletheios|05-pichet|phase1|all>
      Run preview -> refine -> download for the requested object(s).
      Falls back to Meshy test mode when no real key is loaded.
  status <task_id>
      Check a text-to-3d task status.

Flags:
  --test-mode
      Force Meshy sample mode even when a real key exists.
  --tag=<name>
      Write outputs under a tagged subdirectory so previous runs are preserved.
`);
  process.exit(0);
}

try {
  await commands[command]();
} catch (error) {
  log.err(error.message);
  if (error.body) {
    console.error(JSON.stringify(error.body, null, 2));
  }
  process.exit(1);
}
