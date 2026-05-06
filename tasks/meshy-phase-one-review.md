# Meshy Phase 1 Review

Date: 2026-05-06
Run manifest: `tasks/meshy-phase-one-last-run.json`

## Outcome

Phase 1 generation completed for all five approved objects:

1. `11 Nada Brahman`
2. `15 Biofield`
3. `02 Sigil Forge`
4. `04 Aletheios`
5. `05 Pichet`

Total run time:
- about `27.6` minutes

Credit use:
- `150` credits total
- `30` credits per object

Live task ids:
- `11 Nada Brahman`
  - preview `019dfe76-69bd-7c19-ada7-ddd92d0449e9`
  - refine `019dfe78-487b-775b-ab45-4bfebbc581dc`
- `15 Biofield`
  - preview `019dfe7a-17ad-7835-b4cc-39003317c37d`
  - refine `019dfe7d-e002-7d9b-9429-a08cc478c290`
- `02 Sigil Forge`
  - preview `019dfe80-0ce4-7908-b900-8fddedb24b2e`
  - refine `019dfe82-42ed-79ea-bdb2-6fb7906ffcc2`
- `04 Aletheios`
  - preview `019dfe84-fbb7-7a3b-9ed4-726a0a084573`
  - refine `019dfe88-100b-7b2f-998e-1ddb0cb367f9`
- `05 Pichet`
  - preview `019dfe8a-2091-7b7b-80f1-3a8c414adb6a`
  - refine `019dfe8d-ce50-7c0d-9ae4-9313c899a7d4`

## Quality Verdict

### 1. `04 Aletheios`

Verdict:
- `best in batch`
- `borderline usable as concept reference`
- `not final`

What worked:
- reads as an observatory-like reliquary
- stayed non-human
- preserved a vertical witness-instrument logic

What missed:
- too much pedestal / tabletop object energy
- not sparse or exact enough
- still not elevated enough to feel like the final Aletheios pole

Second-pass correction:
- remove `reliquary on stand` bias
- force `upright suspended instrument`
- emphasize ring calibration and central witness axis
- explicitly forbid `table ornament`, `astrolabe lamp`, and `museum stand`

### 2. `11 Nada Brahman`

Verdict:
- `strongest abstract result`
- `usable as direction`
- `not final`

What worked:
- landed as a coherent ring/disc object
- texture pass produced the best internal-emissive logic in the batch
- stayed in-family with the ritual-scientific material system

What missed:
- slightly too ornate and heavy
- less "resolution" and more "decorated ring" than ideal

Second-pass correction:
- reduce outer ornament
- force thinner laminations
- increase empty center emphasis
- explicitly ask for cleaner harmonic spacing

### 3. `15 Biofield`

Verdict:
- `failed`
- `regenerate`

What worked:
- internal green field logic at least attempted coherence

What missed:
- became a spiky spherical cage
- too much noise and debris
- not toroidal enough
- reads as a containment orb, not a measured field apparatus

Second-pass correction:
- replace `field apparatus` with `single torus ring around a short central axis`
- explicitly forbid:
  - spikes
  - cages
  - outer lattice shells
  - sphere enclosures
- reduce structural complexity
- bias toward one clean donut silhouette

### 4. `02 Sigil Forge`

Verdict:
- `failed`
- `regenerate`

What worked:
- metallic ring language is directionally compatible

What missed:
- hallucinated an unrelated anchor-like symbol
- refined the wrong emblem instead of correcting it
- lost the `formation / assembly` narrative entirely

Second-pass correction:
- remove the word `sigil` from the first sentence
- use `geometric forge mechanism` or `ring assembly chassis`
- explicitly forbid:
  - icons
  - emblems
  - anchors
  - letters
  - religious symbols
- push harder on `partially assembled`, `open center`, `misaligned ringwork`

### 5. `05 Pichet`

Verdict:
- `failed`
- `regenerate`

What worked:
- emerald thoracic lighting is directionally correct

What missed:
- fell into literal skeleton / humanoid torso anatomy
- hands and limbs reappeared
- reads as anatomical horror more than somatic instrument

Second-pass correction:
- remove `torso` from the first sentence
- use `breath vessel` or `thoracic chamber object`
- explicitly forbid:
  - limbs
  - hands
  - skeleton
  - ribs as bones
  - humanoid trunk
- focus on chamber vents, pulse cavities, and sealed body logic

## Asset Readiness

### Keep for reference

- `public/models/engines/04-aletheios.png`
- `public/models/engines/04-aletheios.glb`
- `public/models/engines/11-nadabrahman.png`
- `public/models/engines/11-nadabrahman.glb`

### Keep only as failure references

- `public/models/engines/15-biofield.png`
- `public/models/engines/15-biofield.glb`
- `public/models/engines/02-sigil-forge.png`
- `public/models/engines/02-sigil-forge.glb`
- `public/models/engines/05-pichet.png`
- `public/models/engines/05-pichet.glb`

## Delivery Note

All refined GLBs are still source-sized assets, not web-delivery assets.

Approximate refined file sizes:
- `11 Nada Brahman` -> `30.5 MB`
- `15 Biofield` -> `51.4 MB`
- `02 Sigil Forge` -> `39.9 MB`
- `04 Aletheios` -> `36.3 MB`
- `05 Pichet` -> `35.8 MB`

These should not be embedded on the site directly without an optimization pass, and there is no reason to optimize the failed ones.

## Recommendation

Do not ship this batch to the website.

Use it as prompt evidence:

- `Aletheios` and `Nada Brahman` prove the object-first direction can work.
- `Biofield`, `Sigil Forge`, and `Pichet` show exactly which prompt words are too permissive.

Best next move:

1. rewrite the three failed prompts with stronger anti-form constraints
2. optionally tighten `Aletheios` and `Nada Brahman`
3. run a second pass on only the weak three, or on all five if you want one coherent generation generation
