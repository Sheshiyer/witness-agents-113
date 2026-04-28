#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile as execFileCb } from 'node:child_process';
import { promisify } from 'node:util';

const execFile = promisify(execFileCb);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const FFMPEG = '/opt/homebrew/bin/ffmpeg';

function readClaudeEnvFalKey() {
  const envPath = path.join(os.homedir(), '.claude', '.env');
  if (!existsSync(envPath)) return null;
  try {
    const raw = readFileSync(envPath, 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      if (line.startsWith('FAL_KEY=')) return line.slice('FAL_KEY='.length).trim();
    }
  } catch {
    return null;
  }
  return null;
}

const FAL_KEY = readClaudeEnvFalKey() || process.env.FAL_KEY;

if (!FAL_KEY) {
  console.error('FAL_KEY is not set in ~/.claude/.env or process.env.');
  process.exit(1);
}

const IMAGE_ENDPOINT = 'https://fal.run/fal-ai/flux/dev';
const IMAGE_TO_IMAGE_ENDPOINT = 'https://fal.run/fal-ai/flux/dev/image-to-image';
const VIDEO_ENDPOINT = 'https://fal.run/bytedance/seedance-2.0/image-to-video';

const VISUAL_SYSTEM = [
  'Bioluminescent Consciousness.',
  'Void Black canvas.',
  'Witness Violet, Flow Indigo, Sacred Gold, and Coherence Emerald palette.',
  'Anatomical precision.',
  'Architectural sacred geometry.',
  'Light from within organic structure.',
  'No embedded typography.'
].join(' ');

const NEGATIVE = [
  'No text.',
  'No watermark.',
  'No logo lockup.',
  'No generic nebula AI art.',
  'No chakra clipart.',
  'No vague mystical fog.',
  'No purple-on-white startup gradients.',
  'No glossy cyberpunk HUD overlays.',
  'No photoreal guru portraits.'
].join(' ');

const OUTPUTS = {
  og: 'public/og-image.png',
  heroStill: 'public/images/hero/hero-bg-fal-v1-still.png',
  heroVideoSource: 'public/videos/hero-bg-fal-v1-source.mp4',
  heroVideoLoop: 'public/videos/hero-bg-fal-v1-loop.mp4',
  manifest: 'tasks/fal-last-run.json'
};

const ENGINE_ASSETS = [
  {
    key: 'engine-01-sacred-geometry',
    output: 'public/images/engines/fal/9A-15-sacred-geometry-poster-fal-v1.png',
    size: 'portrait_4_3',
    seed: 113015,
    prompt: 'Vertical poster showing sacred geometry as structural cognition: nested circles, radial grid, and subtle body-like proportions emerging from a Void Black field. Witness Violet and Flow Indigo form the deep structure; Sacred Gold reveals key intersections. The image should feel like an anatomical map for unnamed meaning, precise and reverent.'
  },
  {
    key: 'engine-02-sigil-forge',
    output: 'public/images/engines/fal/9A-16-sigil-forge-poster-fal-v1.png',
    size: 'portrait_4_3',
    seed: 113016,
    prompt: 'Vertical poster of a sigil being forged from signal into form. Show a half-formed geometric emblem suspended above a dark ceramic plane, with brass filaments, indigo voltage, and emerald current crossing through it. The visual should imply translation from calculation into embodiment.'
  },
  {
    key: 'engine-03-tarot',
    output: 'public/images/engines/fal/9A-11-tarot-poster-fal-v1.png',
    size: 'portrait_4_3',
    seed: 113011,
    prompt: 'Vertical tarot-adjacent poster without literal card borders. Create an anatomical-symbolic composition where a central witnessing axis sits between two mirrored forces. Use surgical precision, subtle occult geometry, Sacred Gold highlights, and deep indigo shadows. It should feel like a divination system translated into structural cognition, not fortune-telling kitsch.'
  },
  {
    key: 'engine-04-panchanga',
    output: 'public/images/engines/fal/9A-01-panchanga-poster-fal-v1.png',
    size: 'portrait_4_3',
    seed: 113001,
    prompt: 'Vertical poster for Panchanga as analytic sky architecture. Render an astronomical instrument made of concentric brass rings, calendrical markers, angular divisions, and fine etched geometry. The feeling is observer-first: lucid, exact, and unsentimental. Sacred Gold should lead, with violet-black depth and minimal emerald accents.'
  },
  {
    key: 'engine-05-biorhythm',
    output: 'public/images/engines/fal/9A-07-biorhythm-poster-fal-v1.png',
    size: 'portrait_4_3',
    seed: 113007,
    prompt: 'Vertical poster translating biorhythm into embodied wave architecture. Use layered sinusoidal bands, pulse rings, and subtle thoracic or breath-like cadence without literal anatomy. Emerald and gold should carry the rhythm; indigo should hold the field. The image should feel like the body already knows before language catches up.'
  },
  {
    key: 'engine-06-numerology',
    output: 'public/images/engines/fal/9A-14-numerology-poster-fal-v1.png',
    size: 'portrait_4_3',
    seed: 113014,
    prompt: 'Vertical poster for numerology as structural arithmetic rather than lifestyle mysticism. Show integer lattices, radial divisions, glyph-like number forms, and geometric tension inside a dark field. Gold marks the counts, violet and indigo hold the deeper architecture. The image should feel computational, ancient, and exact.'
  },
  {
    key: 'engine-07-human-design',
    output: 'public/images/engines/fal/9A-04-human-design-poster-fal-v1.png',
    size: 'portrait_4_3',
    seed: 113004,
    prompt: 'Vertical poster reinterpreting Human Design as a pressure map, not a branding diagram. Use a central body-like silhouette built from nodes, channels, gates, and directional force vectors. Sacred Gold and Emerald should indicate live pressure points, while indigo and violet hold the background lattice. No labels, no stock bodygraph replica.'
  },
  {
    key: 'engine-08-i-ching',
    output: 'public/images/engines/fal/9A-12-i-ching-poster-fal-v1.png',
    size: 'portrait_4_3',
    seed: 113012,
    prompt: 'Vertical poster for I Ching as situational geometry. Use hexagram bars arranged in a disciplined lattice, with some sets illuminated as if thresholds are becoming active. The frame should feel old, mathematical, and alive. Avoid fortune-cookie aesthetics. Use gold, indigo, and restrained emerald over Void Black.'
  },
  {
    key: 'engine-09-enneagram',
    output: 'public/images/engines/fal/9A-13-enneagram-poster-fal-v1.png',
    size: 'portrait_4_3',
    seed: 113013,
    prompt: 'Vertical poster for enneagram as fixation architecture. Nine-point geometry sits inside a contained field with angular stress lines, directional loops, and subtle orbit paths. The image should imply recursive selection and behavioral gravity, not coaching diagrams. Sacred Gold carries the primary structure with violet-black depth.'
  },
  {
    key: 'engine-10-gene-keys',
    output: 'public/images/engines/fal/9A-05-gene-keys-poster-fal-v1.png',
    size: 'portrait_4_3',
    seed: 113005,
    prompt: 'Vertical poster for Gene Keys as codon compression. Show a 64-fold living lattice that feels genetic, floral, and computational at once: branching symmetry, membrane-like layers, and luminous centers. Keep it serious and anatomical. Emerald and indigo can soften the structure, but gold should still define the logic.'
  },
  {
    key: 'engine-11-nadabrahman',
    output: 'public/images/engines/fal/9A-09-nadabrahman-poster-fal-v1.png',
    size: 'portrait_4_3',
    seed: 113009,
    prompt: 'Vertical poster for Nada Brahman as resonant dissolution. Create a sound-derived mandala with concentric waveform rings, harmonic interference patterns, and a center that feels like it is resolving rather than accumulating. The image should feel like structure becoming unnecessary through coherence. Emerald resonance, gold harmonics, violet void.'
  },
  {
    key: 'engine-12-vedic-clock',
    output: 'public/images/engines/fal/9A-08-vedic-clock-poster-fal-v1.png',
    size: 'portrait_4_3',
    seed: 113008,
    prompt: 'Vertical poster for Vedic Clock as circadian cosmology. Use a clock face, zodiacal segmentation, and diurnal energy arcs rendered as a precise instrument. The object should feel like time made inspectable. Gold markings, indigo night depth, and minimal emerald activation cues.'
  },
  {
    key: 'engine-13-vimshottari-dasha',
    output: 'public/images/engines/fal/9A-02-vimshottari-dasha-poster-fal-v1.png',
    size: 'portrait_4_3',
    seed: 113002,
    prompt: 'Vertical poster for Vimshottari Dasha as long-arc planetary weather. Show concentric timelines, long orbital tracks, segmented durations, and a sense of decades unfolding through clean geometry. The image should feel measured and fated without becoming theatrical. Use gold for timelines, indigo for depth, and restrained emerald pulse points.'
  },
  {
    key: 'engine-14-transits',
    output: 'public/images/engines/fal/9A-03-transits-poster-fal-v1.png',
    size: 'portrait_4_3',
    seed: 113003,
    prompt: 'Vertical poster for transits as near-field motion over a stable chart. Create moving vectors, crossing arcs, and brighter active nodes flowing over a quieter foundational geometry. The poster should feel like weather patterns moving through an existing system. Clean and exact.'
  },
  {
    key: 'engine-15-biofield',
    output: 'public/images/engines/fal/9A-06-biofield-poster-fal-v1.png',
    size: 'portrait_4_3',
    seed: 113006,
    prompt: 'Vertical poster for biofield as measurable subtle anatomy. Use toroidal field lines, nadi-like current paths, and layered energy shells around an implied body axis. The visual should feel biological, electromagnetic, and inspectable, not vague energy art. Emerald and gold should feel like measured signal, not decorative aura.'
  },
  {
    key: 'engine-16-face-reading',
    output: 'public/images/engines/fal/9A-10-face-reading-poster-fal-v1.png',
    size: 'portrait_4_3',
    seed: 113010,
    prompt: 'Vertical poster for face reading as physiognomic mapping. Use a face-like relief or contour field with meridian lines, topographic ridges, and analytic landmarks. Avoid surveillance aesthetics and avoid photoreal portraiture. The result should feel like surface structure becoming legible, with gold tracings over a dark indigo-violet ground.'
  }
];

const ensureDirFor = async (filepath) => {
  await mkdir(path.dirname(path.resolve(ROOT, filepath)), { recursive: true });
};

const fileToDataUri = async (filepath) => {
  const abs = path.resolve(ROOT, filepath);
  const buf = await readFile(abs);
  const ext = path.extname(abs).slice(1).toLowerCase();
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`;
  return `data:${mime};base64,${buf.toString('base64')}`;
};

const withStyle = (prompt) => `${prompt} ${VISUAL_SYSTEM} ${NEGATIVE}`;

async function falRequest(url, payload, label) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = { raw: text };
    }

    if (res.ok) return json;

    if (attempt === 3) {
      throw new Error(`${label} failed: HTTP ${res.status} ${JSON.stringify(json)}`);
    }

    console.warn(`[fal] ${label} attempt ${attempt} failed with ${res.status}. Retrying…`);
    await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
  }
}

async function downloadFile(url, filepath) {
  const abs = path.resolve(ROOT, filepath);
  await ensureDirFor(filepath);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed for ${url}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(abs, buf);
  return { abs, bytes: buf.length };
}

async function generateImage({ output, prompt, size, seed, imagePath, strength = 0.82 }, label) {
  const usingImage = Boolean(imagePath);
  const payload = {
    prompt: withStyle(prompt),
    image_size: size,
    num_inference_steps: 32,
    guidance_scale: 4,
    sync_mode: false,
    num_images: 1,
    enable_safety_checker: true,
    output_format: 'png',
    acceleration: 'none',
    seed
  };

  if (usingImage) {
    payload.image_url = await fileToDataUri(imagePath);
    payload.strength = strength;
  }

  const endpoint = usingImage ? IMAGE_TO_IMAGE_ENDPOINT : IMAGE_ENDPOINT;
  console.log(`[fal] generating image: ${label}`);
  const result = await falRequest(endpoint, payload, label);
  const url = result?.images?.[0]?.url;
  if (!url) throw new Error(`${label} returned no image URL: ${JSON.stringify(result)}`);
  const saved = await downloadFile(url, output);
  return { label, output, url, bytes: saved.bytes, seed, endpoint };
}

async function generateVideo({ output, prompt, imagePath, seed, duration = '5' }, label) {
  const payload = {
    image_url: await fileToDataUri(imagePath),
    prompt: withStyle(prompt),
    duration,
    resolution: '720p',
    aspect_ratio: '16:9',
    generate_audio: false,
    seed
  };

  console.log(`[fal] generating video: ${label}`);
  const result = await falRequest(VIDEO_ENDPOINT, payload, label);
  const url = result?.video?.url;
  if (!url) throw new Error(`${label} returned no video URL: ${JSON.stringify(result)}`);
  const saved = await downloadFile(url, output);
  return { label, output, url, bytes: saved.bytes, seed, endpoint: VIDEO_ENDPOINT };
}

async function makeLoopedVideo(input, output) {
  if (!existsSync(FFMPEG)) {
    console.warn('[fal] ffmpeg not found; skipping loop render');
    return false;
  }
  await ensureDirFor(output);
  const inputAbs = path.resolve(ROOT, input);
  const outputAbs = path.resolve(ROOT, output);
  await execFile(FFMPEG, [
    '-y',
    '-i', inputAbs,
    '-filter_complex', '[0:v]reverse[r];[0:v][r]concat=n=2:v=1:a=0,format=yuv420p[v]',
    '-map', '[v]',
    '-movflags', '+faststart',
    outputAbs
  ]);
  return true;
}

async function main() {
  const mode = process.argv[2] || 'all';
  const startedAt = new Date().toISOString();
  const report = { startedAt, images: [], video: null };

  let heroStillOutput = OUTPUTS.heroStill;

  if (mode === 'all' || mode === 'hero' || mode === 'og') {
    const og = await generateImage({
      output: OUTPUTS.og,
      prompt: 'Create a cinematic 16:9 hero image for Tryambakam Noesis. Central object: a nested sacred-geometry sigil with a compass-point frame and lotus-form core, built like a precision instrument rather than an ornament. Materials: aged brass, bronze edges, subtle amber-glass insets. Lighting: bioluminescent internal glow in Witness Violet and Coherence Emerald, with Sacred Gold tracing the geometry. Background: deep Void Black with almost invisible constellation grain. Style: anatomical, architectural, spiritually serious, not fantasy. The object should feel like a consciousness engine rendered as a ritual instrument.',
      size: 'landscape_16_9',
      seed: 113900
    }, 'og-image-main');
    report.images.push(og);
  }

  if (mode === 'all' || mode === 'hero') {
    const heroStill = await generateImage({
      output: OUTPUTS.heroStill,
      prompt: 'Create a dramatic 16:9 hero background still for Tryambakam Noesis. The nested sigil should dissolve into a larger abstract consciousness field: violet and indigo depth planes, gold filaments, emerald pulse-lines, soft atmospheric grain, slow-cinema composition, a feeling of sacred technology waking up behind the interface. Keep it abstract enough to sit behind copy, but structurally coherent and serious.',
      size: 'landscape_16_9',
      seed: 113901
    }, 'hero-bg-still');
    heroStillOutput = heroStill.output;
    report.images.push(heroStill);
  }

  if (mode === 'all' || mode === 'engines') {
    for (const asset of ENGINE_ASSETS) {
      const image = await generateImage(asset, asset.key);
      report.images.push(image);
    }
  }

  if (mode === 'all' || mode === 'hero') {
    const heroVideo = await generateVideo({
      output: OUTPUTS.heroVideoSource,
      prompt: 'Animate this image into a slow abstract hero background. Gentle orbital drift, deep parallax, bioluminescent filaments breathing through the geometry, ceremonial atmosphere, no hard cuts, no sudden flashes, no characters, no typography, elegant dramatic motion suitable for a looping website background.',
      imagePath: heroStillOutput,
      seed: 113990,
      duration: '5'
    }, 'hero-bg-video');
    report.video = heroVideo;

    const looped = await makeLoopedVideo(OUTPUTS.heroVideoSource, OUTPUTS.heroVideoLoop);
    report.video.loopedOutput = looped ? OUTPUTS.heroVideoLoop : OUTPUTS.heroVideoSource;
  }

  report.finishedAt = new Date().toISOString();
  await ensureDirFor(OUTPUTS.manifest);
  await writeFile(path.resolve(ROOT, OUTPUTS.manifest), JSON.stringify(report, null, 2));

  console.log(`\n[fal] complete. Report written to ${OUTPUTS.manifest}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
