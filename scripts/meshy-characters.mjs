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
const MANIFEST_PATH = 'tasks/meshy-characters-last-run.json';

const COLOR = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  gold: '\x1b[33m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

const log = {
  info: (message) => console.log(`${COLOR.cyan}[meshy-characters]${COLOR.reset} ${message}`),
  ok: (message) => console.log(`${COLOR.green}[meshy-characters]${COLOR.reset} ${message}`),
  warn: (message) => console.log(`${COLOR.gold}[meshy-characters]${COLOR.reset} ${message}`),
  err: (message) => console.log(`${COLOR.red}[meshy-characters]${COLOR.reset} ${message}`),
  dim: (message) => console.log(`${COLOR.dim}${message}${COLOR.reset}`)
};

const VISUAL_SYSTEM = [
  'Bioluminescent consciousness.',
  'Void Black field.',
  'Witness Violet, Flow Indigo, Sacred Gold, and Coherence Emerald palette.',
  'Anatomical precision.',
  'Architectural sacred geometry.',
  'Ceremonial seriousness, not fantasy cosplay.',
  'No typography, no floating UI glyphs.'
].join(' ');

const NEGATIVE = [
  'No anime.',
  'No mascot cartoon proportions.',
  'No glossy superhero suit.',
  'No stock sci-fi armor.',
  'No floating text.',
  'No weapon.',
  'No cheap mystic fog.',
  'No neon HUD clutter.',
  'No photoreal human portrait.',
  'No horror deformation.'
].join(' ');

const CHARACTERS = {
  aletheios: {
    label: 'Aletheios',
    prompt: [
      'A full-body ceremonial witness character named Aletheios.',
      'Tall poised humanoid with a calm faceplate, observatory halo rings, articulated shoulders, and astronomical-instrument detailing.',
      'Represents lucid pattern recognition, observer-first intelligence, and truth witness.',
      'Materials: aged brass, dark bronze, amber glass, black stone insets.',
      'Elegant spare exact silhouette, A-pose for rigging, bioluminescent internal glow in Sacred Gold, Witness Violet, and restrained Coherence Emerald.',
      'Serious sacred-technology object, not fantasy armor, not cartoon, no weapon, no text.'
    ].join(' '),
    texturePrompt: [
      'Texture Aletheios as a lucid witness construct.',
      'Sacred Gold should define the instrument geometry.',
      'Witness Violet and restrained Coherence Emerald should glow from internal channels and sight lines, never as sprayed neon.',
      'Surface wear should be subtle and archival, like a ritual-scientific artifact maintained with care.',
      'The face should read as attentive and exact, not emotive or cartoonish.'
    ].join(' ')
  },
  pichet: {
    label: 'Pichet',
    prompt: [
      'A full-body ceremonial witness character named Pichet.',
      'Strong graceful humanoid with thoracic wave architecture, pulse-ring joints, grounded stance, and kinetic geometry suggesting breath moving through structure.',
      'Represents embodied intelligence, somatic rhythm, and decisive grounded action.',
      'Materials: dark bronze, ceramic black, oxidized gold, translucent emerald-glass channels.',
      'Rooted rhythmic silhouette, A-pose for rigging, internal glow in Coherence Emerald and Sacred Gold.',
      'Serious sacred-technology object, not militaristic, not monstrous, not cartoon, no weapon, no text.'
    ].join(' '),
    texturePrompt: [
      'Texture Pichet as an embodied witness construct.',
      'Coherence Emerald and Sacred Gold should carry the rhythm through pulse channels, chest cavities, and joint lines.',
      'Keep the surface grounded and material, with subtle patina and no plastic shine.',
      'The face and torso should suggest breath, gravity, and action without becoming a literal anatomical body.'
    ].join(' ')
  }
};

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

function getOutputRoot(runMode) {
  return runMode === 'live'
    ? 'public/models/characters'
    : '.artifacts/meshy-characters/test-mode';
}

function getCharacterOutputPaths(characterKey, runMode) {
  const root = getOutputRoot(runMode);
  const base = path.join(root, characterKey);

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

function getCharacterKeys(value) {
  if (!value || value === 'all') return Object.keys(CHARACTERS);
  if (!CHARACTERS[value]) {
    throw new Error(`Unknown character "${value}". Choose one of: ${Object.keys(CHARACTERS).join(', ')}, all`);
  }
  return [value];
}

function ensurePromptLength(prompt, label) {
  if (prompt.length > MAX_PROMPT_LENGTH) {
    throw new Error(`${label} exceeds ${MAX_PROMPT_LENGTH} characters (${prompt.length}). Tighten the prompt before calling Meshy.`);
  }
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
  log.info('Character generation plan:');
  log.dim('');
  for (const [key, config] of Object.entries(CHARACTERS)) {
    log.dim(`  ${config.label} (${key})`);
    log.dim(`    preview prompt: ${config.prompt}`);
    log.dim(`    texture prompt: ${config.texturePrompt}`);
    log.dim(`    live outputs: public/models/characters/${key}-preview.glb, public/models/characters/${key}.glb`);
    log.dim('');
  }
  log.dim('Meshy flow: preview (20 credits) -> refine (10 credits) per character when using a real key.');
  log.dim('With no real key, the script can run in Meshy test mode for contract verification only.');
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
  log.dim('Estimated real run cost for both characters: 60 credits total.');
}

async function runCharacter(apiContext, characterKey) {
  const character = CHARACTERS[characterKey];
  const outputPaths = getCharacterOutputPaths(characterKey, apiContext.mode);
  ensurePromptLength(character.prompt, `${character.label} preview prompt`);
  ensurePromptLength(character.texturePrompt, `${character.label} texture prompt`);

  log.info(`Creating preview task for ${character.label} (${apiContext.mode} mode)…`);
  const previewRequest = {
    mode: 'preview',
    prompt: character.prompt,
    ai_model: 'meshy-6',
    should_remesh: true,
    topology: 'quad',
    target_polycount: 40000,
    symmetry_mode: 'auto',
    pose_mode: 'a-pose',
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
    throw new Error(`Preview task for ${character.label} did not return a task id.`);
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

  log.info(`Creating refine task for ${character.label} (${apiContext.mode} mode)…`);
  const refineRequest = {
    mode: 'refine',
    preview_task_id: previewTaskId,
    ai_model: 'meshy-6',
    enable_pbr: true,
    hd_texture: true,
    remove_lighting: true,
    texture_prompt: character.texturePrompt,
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
    throw new Error(`Refine task for ${character.label} did not return a task id.`);
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
    key: characterKey,
    label: character.label,
    mode: apiContext.mode,
    previewTaskId,
    refineTaskId,
    prompt: character.prompt,
    texturePrompt: character.texturePrompt,
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
  const characterKeys = getCharacterKeys(target);
  const apiContext = resolveApiContext(flags);
  const startedAt = new Date().toISOString();
  const results = [];

  log.info(`Run mode: ${apiContext.mode}`);
  log.info(`Output root: ${getOutputRoot(apiContext.mode)}`);

  for (const characterKey of characterKeys) {
    results.push(await runCharacter(apiContext, characterKey));
  }

  const runRecord = {
    startedAt,
    finishedAt: new Date().toISOString(),
    mode: apiContext.mode,
    usedRealKey: apiContext.hasRealKey,
    characters: results
  };

  await saveManifest(runRecord);
  log.ok(`Saved run manifest to ${MANIFEST_PATH}`);
}

async function cmdStatus(taskId) {
  if (!taskId) {
    throw new Error('Usage: node scripts/meshy-characters.mjs status <task_id>');
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
  status: () => cmdStatus(target)
};

if (!commands[command]) {
  console.log(`
${COLOR.gold}Meshy AI · Witness character pipeline${COLOR.reset}

Commands:
  plan
      Print the Aletheios/Pichet generation plan.
  balance
      Check live account balance. Requires a real MESHY_API_KEY.
  generate <aletheios|pichet|all>
      Run preview -> refine -> download for the requested character(s).
      Falls back to Meshy test mode when no real key is loaded.
  status <task_id>
      Check a text-to-3d task status using Meshy test mode credentials.

Flags:
  --test-mode
      Force Meshy sample mode even when a real key exists.
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
