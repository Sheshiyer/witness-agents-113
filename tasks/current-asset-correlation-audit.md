# Current Landing-Page Asset Correlation Audit

Date: 2026-05-06

## Goal

Read the assets that are actually live on the website first, without merging their concepts, then define the 1:1 correlation for how each one should upgrade.

This audit is intentionally grounded in:

- `index.html` live references
- `public/` asset files and dimensions
- `tasks/asset-utilization.md`
- `tasks/visual-prompt-bank.md`

## Immediate Findings

### 1. The flow is already organized as a 1:1 asset system

The site is not using one generic visual style blob. It already has a one-asset-per-section structure for sections `01` through `16`.

That means the correct upgrade path is:

- preserve each section's identity
- upgrade each section's asset individually
- only unify them at the material and motion grammar level

Not:

- merge them into a single generalized 3D aesthetic
- replace multiple section ideas with one shared "character" logic

### 2. The live posters are the `fal-v1` set, not the `v2` set

Important repo truth:

- live landing page uses `public/images/engines/fal/*-fal-v1.png`
- prompt bank references `public/images/engines/*-poster-v2.png`

So there is already a slight documentation/runtime drift.

For upgrade planning, the canonical source must be the live `index.html` references first.

### 3. Only the sigil is already a true live 3D object

Current live 3D on the page:

- hero sigil: `public/models/sigil-emboss-hero.glb`
- footer sigil: `public/models/sigil-foil-hero.glb`

Everything else in the engine procession is still planar poster delivery.

### 4. The Meshy Aletheios/Pichet character assets are experimental, not live

These exist in `public/models/characters/`, but are not currently referenced by `index.html`.

That distinction should remain explicit. They are concept experiments, not current website truth.

## Live Asset Families

| Family | Live now | Notes |
|-------|----------|-------|
| Hero atmosphere | yes | still + looping video |
| Hero sigil | yes | optimized GLB |
| Sections `01`-`16` engine posters | yes | all 16 are live via `background-image` |
| Section `17` tapestry field | yes | DOM/SVG generated, not file-backed poster |
| Section `18` threshold seal | yes | inline SVG, not file-backed poster |
| Footer sigil | yes | optimized GLB |
| `v2` poster set | no | retained in repo, not wired live |
| Brand logo PNG pack | no | retained source/variant assets |
| Meshy character renders | no | experimental only |

## Live Asset Inventory

### Hero

| Surface | Live asset | Type | Current job | Upgrade note |
|--------|------------|------|-------------|--------------|
| Hero background still | `public/images/hero/hero-bg-fal-v1-still.png` | PNG `1024x576` | atmospheric fallback and poster for video | can stay 2D or become a composited environment layer, not a section object |
| Hero background video | `public/videos/hero-bg-fal-v1-loop.mp4` | MP4 `1280x720`, `10.08s` | cinematic bioluminescent field motion | should remain environmental, not compete with section objects |
| Hero sigil | `public/models/sigil-emboss-hero.glb` | GLB `318,956` bytes | main live 3D proof-of-concept | keep as benchmark for future 3D delivery quality |
| Hero sigil poster | `public/models/sigil-base-preview.png` | PNG | model fallback poster | keep as progressive enhancement fallback |

### Engine Procession `01`-`16`

All sixteen section assets are live. Each is currently a single `background-image` panel inside the reveal typography.

| Section | Live file | Section role | What the asset currently means | 1:1 upgrade correlation | Do not merge with |
|--------|-----------|--------------|--------------------------------|--------------------------|-------------------|
| `01` | `public/images/engines/fal/9A-15-sacred-geometry-poster-fal-v1.png` | unnamed structure | structural cognition before naming | `origin lattice` object | numerology, sigil forge |
| `02` | `public/images/engines/fal/9A-16-sigil-forge-poster-fal-v1.png` | translation | signal becoming emblem | `forged sigil chassis` | hero sigil, sacred geometry |
| `03` | `public/images/engines/fal/9A-11-tarot-poster-fal-v1.png` | witness threshold | third register between poles | `mirrored witness gate` | enneagram, i ching |
| `04` | `public/images/engines/fal/9A-01-panchanga-poster-fal-v1.png` | Aletheios pole | analytical sky instrument, naming register | `observatory reliquary` | generic character art |
| `05` | `public/images/engines/fal/9A-07-biorhythm-poster-fal-v1.png` | Pichet pole | somatic rhythm and carrier logic | `breath engine torso` | literal anatomy, fantasy body |
| `06` | `public/images/engines/fal/9A-14-numerology-poster-fal-v1.png` | interpretation clause | arithmetic as structural tension | `integer lattice reliquary` | sacred geometry |
| `07` | `public/images/engines/fal/9A-04-human-design-poster-fal-v1.png` | pressure map | nodes, channels, authority, response | `nodal pressure scaffold` | biofield |
| `08` | `public/images/engines/fal/9A-12-i-ching-poster-fal-v1.png` | threshold logic | situational architecture | `bar lattice gate` | tarot |
| `09` | `public/images/engines/fal/9A-13-enneagram-poster-fal-v1.png` | fixation logic | recursive behavioral gravity | `fixation orbit mechanism` | gene keys |
| `10` | `public/images/engines/fal/9A-05-gene-keys-poster-fal-v1.png` | codon field | living lattice / shadow-gift-expression | `codon bloom vault` | numerology |
| `11` | `public/images/engines/fal/9A-09-nadabrahman-poster-fal-v1.png` | anti-dependency clause | resonance dissolving structure | `harmonic resolution disc` | hero background |
| `12` | `public/images/engines/fal/9A-08-vedic-clock-poster-fal-v1.png` | field edges | time made inspectable | `circadian observatory instrument` | vimshottari dasha |
| `13` | `public/images/engines/fal/9A-02-vimshottari-dasha-poster-fal-v1.png` | long-cycle time | decade-scale timing grammar | `long-arc orbit archive` | transits |
| `14` | `public/images/engines/fal/9A-03-transits-poster-fal-v1.png` | near-field time | active movement over stable chart | `near-field weather machine` | vimshottari dasha |
| `15` | `public/images/engines/fal/9A-06-biofield-poster-fal-v1.png` | field signature | measurable subtle anatomy | `toroidal field apparatus` | human design |
| `16` | `public/images/engines/fal/9A-10-face-reading-poster-fal-v1.png` | facial memory | surface structure as recorded force | `contour mask atlas` | literal portraiture |

### Lower-page Procedural Surfaces

| Section | Live surface | Type | Current job | Upgrade note |
|--------|--------------|------|-------------|--------------|
| `17` | tapestry constellation | DOM + SVG filaments | public ecosystem / open record | should become its own 3D constellation field only if it keeps the node logic; it is not part of the poster pipeline |
| `18` | ouroboros seal | inline SVG | threshold / closure | can become a 3D seal later, but should stay conceptually separate from engine assets |

### Footer

| Surface | Live asset | Type | Current job | Upgrade note |
|--------|------------|------|-------------|--------------|
| Footer mark | `public/models/sigil-foil-hero.glb` | GLB `266,132` bytes | ceremonial closing mark | keep as separate mark logic, not an engine object |
| Footer poster | `public/models/sigil-foil-preview.png` | PNG | model fallback poster | delivery fallback only |

### Ambient Utility Assets

| Asset | Live now | Role |
|------|----------|------|
| `public/images/noise.png` | yes | base texture field |
| `public/og-image.png` | yes | metadata / social share only |

These are not the main asset-upgrade target set.

## What This Means For The Upgrade

### Preserve the existing 1:1 relationship

Each live section already has:

- one section concept
- one primary poster
- one conceptual role in the procession

So the upgrade path should remain:

`one live poster -> one upgraded object family`

Not:

- one poster family -> one merged symbolic object
- both dyad poles -> one blended character
- all time engines -> one reused clock asset

### Upgrade families, not only files

The correct unit is not just the file. It is:

- section copy
- live poster
- conceptual engine
- future object class

That four-part correlation should remain intact for every replacement.

## Recommended Correlation Strategy

### Tier 1: highest-confidence 1:1 upgrades

These have the cleanest translation from current live poster to future 3D object.

1. `02 Sigil Forge` -> forged sigil chassis
2. `04 Panchanga / Aletheios` -> observatory reliquary
3. `05 Biorhythm / Pichet` -> breath engine torso
4. `11 Nada Brahman` -> harmonic resolution disc
5. `15 Biofield` -> toroidal field apparatus

Why:

- the live posters already imply objecthood
- they do not require concept merging
- they can become strong narrative engines quickly

### Tier 2: clearly separable but more abstract

1. `07 Human Design`
2. `08 I Ching`
3. `12 Vedic Clock`
4. `13 Vimshottari Dasha`
5. `14 Transits`

### Tier 3: easiest to damage if over-generalized

1. `01 Sacred Geometry`
2. `03 Tarot`
3. `06 Numerology`
4. `09 Enneagram`
5. `10 Gene Keys`
6. `16 Face Reading`

These need tighter concept control because they can easily collapse into generic sacred-tech art if prompted too loosely.

## Asset Upgrade Rules

1. Do not replace a live section with a concept from a neighboring section.
2. Do not convert all sixteen assets into a single repeated 3D object template.
3. Do not let `Aletheios` and `Pichet` drift away from their live correlations:
   - `Aletheios` correlates to the current `Panchanga` observatory poster
   - `Pichet` correlates to the current `Biorhythm` somatic-wave poster
4. Treat `17` and `18` as procedural/ritual surfaces, not as poster upgrades.
5. Keep the hero and footer sigils as their own mark family.

## Practical Next Step

Before generating anything new, make a phase-one sheet with exactly five live correlations:

1. current live poster
2. section copy snippet
3. named object class
4. material stack
5. motion behavior

Do that for:

- `02`
- `04`
- `05`
- `11`
- `15`

That will give a real upgrade plan without losing the distinctions that currently make the landing-page flow coherent.

## Bottom Line

The page already has a strong procession. The problem is not structure. The problem is that most of the procession still terminates in flat poster delivery.

So the right move is:

- keep the flow
- keep the one-to-one conceptual mapping
- upgrade each live asset into its own object class
- avoid merging neighboring concepts just because they can be rendered with the same 3D tool

The site does not need fewer concepts. It needs stronger delivery of the concepts it already has.
