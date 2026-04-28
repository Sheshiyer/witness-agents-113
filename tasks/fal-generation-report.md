# FAL + Meshy Generation Report

## Run Summary

Date: 2026-04-28

A full FAL generation pass was completed for:
- OG image
- hero background still
- hero background video
- 16 engine posters

FAL machine log:
- `tasks/fal-last-run.json`

## Output Files

### OG
- `public/og-image.png`

### Hero
- `public/images/hero/hero-bg-fal-v1-still.png`
- `public/videos/hero-bg-fal-v1-source.mp4`
- `public/videos/hero-bg-fal-v1-loop.mp4`

### Engine Posters
- `public/images/engines/fal/9A-01-panchanga-poster-fal-v1.png`
- `public/images/engines/fal/9A-02-vimshottari-dasha-poster-fal-v1.png`
- `public/images/engines/fal/9A-03-transits-poster-fal-v1.png`
- `public/images/engines/fal/9A-04-human-design-poster-fal-v1.png`
- `public/images/engines/fal/9A-05-gene-keys-poster-fal-v1.png`
- `public/images/engines/fal/9A-06-biofield-poster-fal-v1.png`
- `public/images/engines/fal/9A-07-biorhythm-poster-fal-v1.png`
- `public/images/engines/fal/9A-08-vedic-clock-poster-fal-v1.png`
- `public/images/engines/fal/9A-09-nadabrahman-poster-fal-v1.png`
- `public/images/engines/fal/9A-10-face-reading-poster-fal-v1.png`
- `public/images/engines/fal/9A-11-tarot-poster-fal-v1.png`
- `public/images/engines/fal/9A-12-i-ching-poster-fal-v1.png`
- `public/images/engines/fal/9A-13-enneagram-poster-fal-v1.png`
- `public/images/engines/fal/9A-14-numerology-poster-fal-v1.png`
- `public/images/engines/fal/9A-15-sacred-geometry-poster-fal-v1.png`
- `public/images/engines/fal/9A-16-sigil-forge-poster-fal-v1.png`

## Integration Notes

- `index.html` now points all 16 content posters at the new FAL-generated assets under `public/images/engines/fal/`.
- The hero now embeds `public/videos/hero-bg-fal-v1-loop.mp4` with `public/images/hero/hero-bg-fal-v1-still.png` as the visual fallback/poster.
- `/og-image.png` now exists and matches the current metadata.

## Corrections During The Run

- The session `FAL_KEY` was stale and returned `401`.
- The generator was updated to prefer `~/.claude/.env` for `FAL_KEY`, which is the working local source in this environment.
- FAL image-to-image preserved the square source aspect ratio for hero and OG assets. Those two assets were regenerated through text-to-image at `16:9`, then the hero video was regenerated from the corrected still.

## Meshy Follow-Up

Meshy machine log:
- `tasks/meshy-last-run.json`

### Meshy Task Results

- Base mesh reused from prior successful task:
  - task id: `019dd457-c50d-788b-b086-90cb55b2f1c1`
  - source output: `public/models/sigil-base.glb`
- Retexture tasks completed on 2026-04-28:
  - `duotone` via `019dd4c7-ff67-7f55-a0e0-1ed4f62caddf`
  - `emboss` via `019dd4ca-5398-7169-9233-4ff8cab0232a`
  - `foil` via `019dd4cf-2735-70f4-b240-91ec319923d1`

### Meshy Outputs

- Source GLBs:
  - `public/models/sigil-duotone.glb`
  - `public/models/sigil-emboss.glb`
  - `public/models/sigil-foil.glb`
- Preview thumbnails:
  - `public/models/sigil-duotone-preview.png`
  - `public/models/sigil-emboss-preview.png`
  - `public/models/sigil-foil-preview.png`
- Web-optimized hero variants:
  - `public/models/sigil-duotone-hero.glb` at `292,180` bytes
  - `public/models/sigil-emboss-hero.glb` at `318,956` bytes
  - `public/models/sigil-foil-hero.glb` at `266,132` bytes

### Meshy Recommendation

- Live hero asset now set to:
  - `public/models/sigil-emboss-hero.glb`
- Reason:
  - the `emboss` treatment produced the strongest ceremonial read among the first-pass Meshy variants
  - the optimized file remains web-safe at `318,956` bytes
- Previous live hero asset retained as fallback source:
  - `public/models/sigil-hero.glb`

## Next Visual Iterations Worth Considering

1. Generate a second hero-video variant with less cosmic atmosphere and more geometric parallax if you want the background to feel more architectural and less celestial.
2. Curate 2-3 alternate posters for the most visible engines (`9A-01`, `9A-11`, `9A-15`) if you want tighter art direction instead of first-pass singletons.
3. Add WebM transcodes for the hero video if you want a smaller secondary source for browsers that benefit from it.
