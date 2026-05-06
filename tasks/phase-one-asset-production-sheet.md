# Phase 1 Asset Production Sheet

Date: 2026-05-06

## Goal

Translate the five highest-confidence live landing-page assets into production-ready 3D object briefs without merging their concepts.

This sheet is grounded in:

- live `index.html` asset references
- live section copy
- `tasks/current-asset-correlation-audit.md`
- `tasks/landing-page-3d-narrative-engine-brief.md`

## Scope

Phase 1 objects only:

1. `02 Sigil Forge`
2. `04 Panchanga / Aletheios`
3. `05 Biorhythm / Pichet`
4. `11 Nada Brahman`
5. `15 Biofield`

## Shared Guardrails

- Keep one live poster correlated to one upgraded object family.
- Do not turn these into fantasy characters or mascots.
- Use one shared material language, but preserve distinct silhouettes and motion logic.
- Prefer symbolic instruments, observatory bodies, torsos, discs, and field structures over humanoid figures.
- Light must originate from seams, channels, cavities, or rings.
- Avoid cloth, robes, exposed skin, weapons, and decorative sacred geometry.

## Shared Delivery Pattern

Every object should support four layers:

1. `Current poster`
2. `New 3D still render`
3. `Interactive GLB`
4. `Narrative state change`

Recommended output root:

- `public/models/engines/`

Recommended per-object files:

- `<slug>.glb`
- `<slug>-preview.png`
- `<slug>-still.png`

## 02 / Sigil Forge

### Live Correlation

- Live asset:
  - `public/images/engines/fal/9A-16-sigil-forge-poster-fal-v1.png`
- Live heading:
  - `In the gap between signal and self.`
- Live body copy:
  - `Calculation is easy. Translation is harder. A pattern matters only once it crosses into breath, mood, posture, and consequence.`

### Object Definition

- Object class:
  - `forged sigil chassis`
- Kha-Ba-La bias:
  - `Kha -> Ba`
- Core read:
  - a partially assembled emblem where abstract pattern is being forced into embodied form

### Material Stack

- aged brass frame
- dark bronze rings
- dark ceramic base plane or suspended anchor plate
- fine etched channels
- indigo depth planes
- emerald current lines
- sacred gold edge highlights

### Motion Behavior

- idle:
  - slow ring misalignment with faint energy travel through unclosed seams
- narrative event:
  - rings lock into alignment and the central sigil channel ignites in sequence
- forbidden motion:
  - constant spin
  - floating debris

### Camera / Composition

- three-quarter front view
- object should read as a forged apparatus, not a flat medallion
- preserve negative space in the center so the "formation" is legible

### Output Targets

- `public/models/engines/engine-02-sigil-forge.glb`
- `public/models/engines/engine-02-sigil-forge-preview.png`
- `public/models/engines/engine-02-sigil-forge-still.png`

### Meshy Prompt

`Generate a ritual-scientific 3D object for Tryambakam Noesis called Sigil Forge: a partially assembled sacred-geometry sigil chassis suspended above a dark ceramic anchor plane, with layered brass and dark bronze rings, engraved channels, and a clear central cavity where pattern is becoming form. The object represents translation from calculation into embodiment. Use precise structural geometry, sacred gold edge highlights, indigo depth, and restrained emerald current lines glowing from inside seams. Clean silhouette, no text, no pedestal clutter, no humanoid features, serious observatory-instrument mood.`

### Anti-Prompt

`No character. No robe. No weapon. No floating shards. No fantasy relic pile. No random neon. No decorative mandala wallpaper. No steampunk junk. No environment scene.`

### Success Check

- reads instantly as `formation`, not `finished logo`
- feels like an instrument under activation
- remains visually distinct from the hero sigil

## 04 / Panchanga / Aletheios

### Live Correlation

- Live asset:
  - `public/images/engines/fal/9A-01-panchanga-poster-fal-v1.png`
- Live heading:
  - `Names: Aletheios.`
- Live body copy:
  - `Kha is the naming register: the witness that can look at pattern without bargaining with comfort.`

### Object Definition

- Object class:
  - `observatory reliquary`
- Kha-Ba-La bias:
  - `Kha`
- Core read:
  - a lucid witness instrument for naming, measuring, and holding pattern without sentimentality

### Material Stack

- aged brass rings
- dark bronze armatures
- amber glass insets
- black stone or black ceramic structural core
- sacred gold index marks
- faint witness violet atmospheric depth
- minimal emerald accents only where signal activates

### Motion Behavior

- idle:
  - slow ring precession and tiny index sweeps
- narrative event:
  - inner calendar ring resolves into alignment and the central witness axis brightens
- forbidden motion:
  - emotive head movement
  - humanoid posing

### Camera / Composition

- frontal or slight three-quarter view
- emphasize ring precision and witness axis
- should feel taller and more vertical than Sigil Forge

### Output Targets

- `public/models/engines/engine-04-aletheios-reliquary.glb`
- `public/models/engines/engine-04-aletheios-reliquary-preview.png`
- `public/models/engines/engine-04-aletheios-reliquary-still.png`

### Meshy Prompt

`Generate a non-human 3D witness instrument called Aletheios for Tryambakam Noesis: an observatory reliquary built from concentric brass rings, angular calendrical divisions, fine sacred-gold index marks, dark bronze armatures, amber-glass insets, and a black structural core. It represents the naming register of clear observation. The form should feel upright, exact, sparse, and unsentimental, like an astronomical device fused with a ceremonial intelligence. Internal light should be subtle and load-bearing, with restrained witness-violet depth and minimal emerald activation cues. No face, no robe, no flesh, no text, clean silhouette.`

### Anti-Prompt

`No mystic priest. No humanoid body. No exposed skin. No helmeted warrior. No fantasy armor. No decorative halo without function. No random astrology props.`

### Success Check

- reads as `witness intelligence`, not `person`
- stays correlated to Panchanga sky architecture
- avoids drifting into generic “oracle” imagery

## 05 / Biorhythm / Pichet

### Live Correlation

- Live asset:
  - `public/images/engines/fal/9A-07-biorhythm-poster-fal-v1.png`
- Live heading:
  - `Pichet holds the form.`
- Live body copy:
  - `Ba is the carrier: breath, rhythm, fatigue, recovery. If a reading cannot enter the soma, it stays decorative.`

### Object Definition

- Object class:
  - `breath engine torso`
- Kha-Ba-La bias:
  - `Ba`
- Core read:
  - a somatic carrier object where rhythm, fatigue, and recovery are made inspectable

### Material Stack

- dark bronze rib structures
- ceramic black support mass
- oxidized gold junctions
- emerald emissive channels
- sacred gold pulse traces
- restrained indigo background cavities

### Motion Behavior

- idle:
  - slow inhale / exhale expansion through thoracic chambers
- narrative event:
  - pulse routing lights up across rib-like structures and settles into coherence
- forbidden motion:
  - walking stance
  - human facial expression

### Camera / Composition

- torso-forward composition
- full object can include lower support or pedestal-like tail, but not a literal human figure
- chest cavity and rhythm channels must remain readable

### Output Targets

- `public/models/engines/engine-05-pichet-breath-engine.glb`
- `public/models/engines/engine-05-pichet-breath-engine-preview.png`
- `public/models/engines/engine-05-pichet-breath-engine-still.png`

### Meshy Prompt

`Generate a non-human 3D object called Pichet for Tryambakam Noesis: a breath engine torso built from dark bronze rib architecture, ceramic-black mass, oxidized gold joints, and translucent emerald channel lines that show somatic rhythm moving through structure. It represents breath, fatigue, recovery, and embodied carrier intelligence. The object should feel grounded, dense, and rhythmic, with thoracic chambers that imply inhale and exhale without becoming literal anatomy. Serious ritual-scientific design, no face, no skin, no cloth, no weapon, no text, clean silhouette and clear chest cavity.`

### Anti-Prompt

`No superhero body. No flesh anatomy. No fantasy creature. No bust on a museum pedestal. No robe. No mech soldier. No monster. No horror ribs.`

### Success Check

- reads as `embodiment` immediately
- holds the current biorhythm-wave correlation
- feels denser and more grounded than Aletheios

## 11 / Nada Brahman

### Live Correlation

- Live asset:
  - `public/images/engines/fal/9A-09-nadabrahman-poster-fal-v1.png`
- Live heading:
  - `Success is needing us less.`
- Live body copy:
  - `If the work makes itself indispensable, it has failed. The useful outcome is sharper reading without permanent mediation.`

### Object Definition

- Object class:
  - `harmonic resolution disc`
- Kha-Ba-La bias:
  - `Ba -> Kha`
- Core read:
  - complexity resolving into coherence until the apparatus becomes less necessary

### Material Stack

- thin brass or bronze ring laminations
- translucent emerald resonance channels
- sacred gold harmonic traces
- witness violet void depth behind central opening
- subtle amber highlights where harmonics converge

### Motion Behavior

- idle:
  - concentric ripple drift and interference shimmer
- narrative event:
  - outer noise collapses inward and the center stabilizes into a cleaner coherent ring
- forbidden motion:
  - flashy equalizer effects
  - speaker-like gadget aesthetics

### Camera / Composition

- frontal disc bias with enough thickness to read in 3D
- center resolution zone must be clearly visible
- should feel lighter and more dissolving than the other phase-one objects

### Output Targets

- `public/models/engines/engine-11-nadabrahman-disc.glb`
- `public/models/engines/engine-11-nadabrahman-disc-preview.png`
- `public/models/engines/engine-11-nadabrahman-disc-still.png`

### Meshy Prompt

`Generate a high-detail 3D harmonic object for Tryambakam Noesis called Nada Brahman: a thin layered resonance disc made from concentric bronze and brass rings, harmonic interference channels, and a central opening where complexity resolves into coherence. The object should feel like sound becoming unnecessary through alignment, not like a speaker or gadget. Use restrained emerald resonance lines, sacred-gold harmonics, and deep witness-violet void behind the center. Clean front-readable silhouette, subtle thickness, no text, no environment clutter, no humanoid features, serious contemplative instrument mood.`

### Anti-Prompt

`No speaker cone. No DJ gear. No sci-fi HUD. No equalizer bars. No decorative mandala wallpaper. No neon rainbow. No cosmic fog background.`

### Success Check

- reads as `resolution`, not `audio device`
- keeps the anti-dependency meaning intact
- becomes one of the cleanest phase-one narrative engines

## 15 / Biofield

### Live Correlation

- Live asset:
  - `public/images/engines/fal/9A-06-biofield-poster-fal-v1.png`
- Live heading:
  - `The field keeps a signature.`
- Live body copy:
  - `Biofield names distributed signal: charge, depletion, coherence, and where the hum holds or fractures.`

### Object Definition

- Object class:
  - `toroidal field apparatus`
- Kha-Ba-La bias:
  - `Ba`
- Core read:
  - a measurable subtle field organized around a central axis, with coherence and fracture made visible

### Material Stack

- dark central axis spine
- translucent toroidal field shells
- emerald circulation lines
- sacred gold nodal crossings
- indigo-violet negative space
- restrained metallic braces only where needed for readability

### Motion Behavior

- idle:
  - circulating torus flow and slight axis breathing
- narrative event:
  - field lines converge into coherence, then show controlled fracture at selected seams
- forbidden motion:
  - generic aura shimmer
  - soft fuzzy energy cloud

### Camera / Composition

- three-quarter angle preferred so torus depth reads cleanly
- the field itself must remain the hero, not the spine
- preserve emptiness around the torus so the signature is readable

### Output Targets

- `public/models/engines/engine-15-biofield-torus.glb`
- `public/models/engines/engine-15-biofield-torus-preview.png`
- `public/models/engines/engine-15-biofield-torus-still.png`

### Meshy Prompt

`Generate a 3D subtle-anatomy object for Tryambakam Noesis called Biofield: a toroidal field apparatus organized around a dark central axis, with translucent field shells, circulating emerald current lines, sacred-gold nodal crossings, and deep indigo-violet negative space. It should represent measurable distributed signal, coherence, depletion, and fracture without becoming vague aura art. The field itself is the main object, not a human body. Keep the silhouette clean, the torus readable, and the lighting bioluminescent from within. No text, no person, no environment clutter, serious inspectable instrument mood.`

### Anti-Prompt

`No chakra clipart. No fuzzy aura cloud. No yoga silhouette. No rainbow energy blob. No generic meditation poster. No decorative plasma swirl.`

### Success Check

- reads as `field structure`, not `wellness aura`
- stays distinct from Human Design channel logic
- makes coherence and fracture inspectable

## Recommended Sequence

1. `11 Nada Brahman`
2. `15 Biofield`
3. `02 Sigil Forge`
4. `04 Aletheios`
5. `05 Pichet`

Why:

- `11` and `15` are the safest non-humanoid Meshy wins
- `02` is structurally precise and already object-like
- `04` and `05` are strongest once the non-character visual discipline is already locked

## Verification Checklist

- Each prompt still tracks one live section only.
- Each prompt stays inside the same ritual-scientific visual family.
- `Aletheios` and `Pichet` remain pole-specific and non-humanoid.
- No object requires a merged concept from another section to read correctly.
- The five objects together already demonstrate the landing page's Kha / Ba / integration range.
