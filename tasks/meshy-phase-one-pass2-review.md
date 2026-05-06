# Meshy Phase 1 Pass 2 Review

Date: 2026-05-07
Manifest: `tasks/meshy-phase-one-last-run.json`
Output tag: `pass2`
Output directory: `public/models/engines/pass2/`

## Scope

Second pass was run only for the three failed first-pass objects:

1. `15 Biofield`
2. `02 Sigil Forge`
3. `05 Pichet`

Reason:
- keep the stronger first-pass `Aletheios` and `Nada Brahman` results intact
- use stronger anti-form constraints only where the first pass clearly failed

## Credit Use

Second-pass spend:
- `90` credits total
- `30` credits per object

Balance after the run:
- `1440`

Task ids:
- `15 Biofield`
  - preview `019dfe93-6b48-7d45-878a-1536927820d3`
  - refine `019dfe96-23f3-7dc6-b9b4-cc24dbdcf8d3`
- `02 Sigil Forge`
  - preview `019dfe98-33f5-74bb-b899-e6790dc867f7`
  - refine `019dfe9a-12eb-796d-bbf2-d8587b245180`
- `05 Pichet`
  - preview `019dfe9c-2006-7e76-8dad-31ded18694d7`
  - refine `019dfe9e-1877-7f26-95e5-8d01a2ea69a5`

## Verdict

### `15 Biofield`

Pass 1:
- failed
- spiky containment sphere
- wrong silhouette

Pass 2:
- improved materially
- now reads as a toroidal ring structure
- still too braided and busy
- but the core form is finally correct

Verdict:
- `keep as direction`
- `not final`

What changed:
- replacing the looser `field apparatus` phrasing with `single torus ring` plus explicit anti-cage rules corrected the silhouette fast

What still needs work:
- simplify the braid/lattice texture logic
- introduce a clearer short central axis
- reduce incidental wire-noise

### `02 Sigil Forge`

Pass 1:
- failed
- hallucinated a foreign anchor-like emblem

Pass 2:
- improved materially
- now reads as open-centered geometric ringwork
- the wrong emblem problem is gone
- still too resolved and ornamental for an object called `forge`

Verdict:
- `keep as direction`
- `not final`

What changed:
- removing `sigil` from the lead phrase and forbidding icons/emblems/anchors fixed the largest conceptual failure

What still needs work:
- bring back more `partial assembly`
- add visible misalignment or tension
- reduce finished-seal energy

### `05 Pichet`

Pass 1:
- failed
- literal skeleton / humanoid torso

Pass 2:
- still failed
- skeleton issue softened
- but the object remains humanoid with limbs and body stance

Verdict:
- `reject`
- `needs a third prompt rewrite, not another texture attempt`

What changed:
- removing `torso` helped only partially
- the model still interprets `Pichet` + `breath vessel` + chamber anatomy as a person-shaped ceremonial body

What still needs work:
- stop leading with the named pole
- stop using body-near composition cues
- push toward `sealed chamber apparatus`, `breath canister`, or `somatic vessel mechanism`
- explicitly forbid:
  - standing figure
  - legs
  - arms
  - shoulders
  - humanoid posture

## File Sizes

Refined pass-two GLBs:
- `public/models/engines/pass2/15-biofield.glb` -> `31.0 MB`
- `public/models/engines/pass2/02-sigil-forge.glb` -> `37.9 MB`
- `public/models/engines/pass2/05-pichet.glb` -> `36.9 MB`

These are still source assets, not delivery assets.

## Best Current Set

### Keep as strongest references

- pass 1 `Aletheios`
  - `public/models/engines/04-aletheios.png`
  - `public/models/engines/04-aletheios.glb`
- pass 1 `Nada Brahman`
  - `public/models/engines/11-nadabrahman.png`
  - `public/models/engines/11-nadabrahman.glb`
- pass 2 `Biofield`
  - `public/models/engines/pass2/15-biofield.png`
  - `public/models/engines/pass2/15-biofield.glb`
- pass 2 `Sigil Forge`
  - `public/models/engines/pass2/02-sigil-forge.png`
  - `public/models/engines/pass2/02-sigil-forge.glb`

### Reject for now

- pass 1 `Biofield`
- pass 1 `Sigil Forge`
- pass 1 `Pichet`
- pass 2 `Pichet`

## Recommendation

Do not run all three again blindly.

Next move should be narrower:

1. keep `Biofield` and `Sigil Forge` as pass-two references
2. write one more sharper `Pichet` prompt that removes character/body bias from the first sentence
3. optionally do a light cleanup pass later for `Biofield` and `Sigil Forge`, but only after `Pichet` stops collapsing into a body
