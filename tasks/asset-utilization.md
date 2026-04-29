# Asset Utilization Map

Date: 2026-04-29

## Live Delivery Assets

These generated assets are currently used by the shipped site.

- `public/og-image.png`
  - Used by page metadata for Open Graph, Twitter, and JSON-LD.
- `public/images/hero/hero-bg-fal-v1-still.png`
  - Used as the hero background still and video poster.
- `public/videos/hero-bg-fal-v1-loop.mp4`
  - Used as the live hero background video.
- `public/images/engines/fal/*.png`
  - All 16 generated engine posters are referenced by `index.html`.
- `public/models/sigil-emboss-hero.glb`
  - Used by the hero `model-viewer`.
- `public/models/sigil-base-preview.png`
  - Used as the hero model poster.
- `public/models/sigil-foil-hero.glb`
  - Used by the footer `model-viewer`.
- `public/models/sigil-foil-preview.png`
  - Used as the footer model poster and the `404.html` illustration.

## Retained Source Or Variant Assets

These are intentional retained assets, not forgotten assets.
They are not live delivery surfaces right now.

- `public/videos/hero-bg-fal-v1-source.mp4`
  - Intermediate source output from FAL before loop processing.
- `public/models/sigil-base.glb`
  - Original high-resolution Meshy source model.
- `public/models/sigil-duotone.glb`
  - High-resolution Meshy duotone source.
- `public/models/sigil-emboss.glb`
  - High-resolution Meshy emboss source.
- `public/models/sigil-foil.glb`
  - High-resolution Meshy foil source.
- `public/models/sigil-duotone-hero.glb`
  - Optimized alternate hero variant kept for future art direction.
- `public/models/sigil-hero.glb`
  - Earlier optimized fallback variant kept for rollback/reference.
- `public/models/sigil-duotone-preview.png`
  - Preview for the retained duotone variant.
- `public/models/sigil-emboss-preview.png`
  - Preview for the retained emboss source variant.

## Current Decision

- No generated asset from the FAL poster set is orphaned; all 16 are live.
- No new OG asset is needed right now.
- No new 404-specific generated asset is needed right now.
- The retained source and alternate Meshy/FAL artifacts are being kept intentionally for future art direction, rollback, and regeneration support.

## Follow-up Option

If delivery weight or public-directory hygiene becomes a priority, move retained source artifacts out of `public/` into a non-served archive directory and update the generation manifests accordingly.
