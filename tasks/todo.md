## 2026-05-14 Resonance + Creative Reading Surface

### Plan
- [x] Add a workflow-aware resonance section to `reading.html` / `reading.js` / `reading.css` so `daily-practice` can render the new raaga/attunement block as a first-class reading surface.
- [x] Add a workflow-aware creative surface to the reading page for `creative-expression`, with explicit symbol, form, tone, numerology, and ritual rendering rather than generic text blobs.
- [x] Keep the existing `daily-practice` reading path stable and backward-compatible with older payloads while the richer workflow blocks remain additive.
- [x] Verify the updated reading page in build output and browser against both a `daily-practice` resonance payload and a `creative-expression` payload.

### Review
- Added two new workflow-aware reading surfaces:
  - a standalone `Attunement` panel for `daily-practice`
  - a first-class `Creative Surface` panel for `creative-expression`
- The new renderer in `js/reading.js` now:
  - formats the typed `resonance` object into visible attunement structure
  - formats the typed `creative_surface` object into symbol / form / tone / numerology / ritual sections
  - switches evidence and practice copy depending on workflow
  - preserves the older daily-reading flow when those richer fields are absent
- Added the corresponding markup in `reading.html` and styling in `css/reading.css`.
- Verification:
  - `npm run build`
  - Playwright browser verification against seeded `witness-agents.latest-reading` records for:
    - `daily-practice` at `1440px`
    - `creative-expression` at `1440px`
    - `creative-expression` at `390px`
  - confirmed:
    - `daily-practice` shows `Attunement`, keeps `Creative Surface` hidden, and preserves the generic evidence lede
    - `creative-expression` shows `Creative Surface`, hides the standalone resonance panel, swaps the evidence lede, and relabels practice as rehearsal
    - no horizontal overflow at the tested widths

## 2026-05-07 Narrative 3D Controller + Section 02 Wire-Up

### Plan
- [x] Add a shared narrative-3D controller skeleton that fits the current GSAP / ScrollTrigger boot flow.
- [x] Convert section `02` Sigil Forge from poster-only to progressive-enhancement poster + `model-viewer` object state.
- [x] Verify the change in build output and confirm the fallback path still works when the model is unavailable.

### Review
- Added the shared narrative controller in `js/sections-special/narrativeObjects.js`.
- Wired the controller into the main boot flow in `js/main.js` using the same `model-viewer` readiness path already used by the hero.
- Reworked section `02` in `index.html` so the reveal image now contains:
  - the original poster field
  - a geometry-object overlay with state variables
  - a Meshy still fallback
  - a live `model-viewer` layer for progressive enhancement
- Added the section-specific object surface and motion variables in `css/sections.css`.
- Implemented the first preset as `sigil-forge`, with:
  - scroll-driven state transitions
  - pointer-driven tilt / parallax / glow drift
  - camera-orbit and exposure adjustments when the GLB is available
- Verification:
  - `npm run build` passed
  - local preview smoke-tested at `http://127.0.0.1:5114/`
  - browser screenshot confirmed section `02` now renders the instrument overlay instead of staying poster-only
- Important first-pass constraint:
  - the Meshy GLB is still too dark to stand alone in this composition
  - the current implementation therefore uses the Meshy still as the readable primary surface and the GLB as the live enhancement layer
- Residual note:
  - the pre-existing large `model-viewer` bundle warning remains
  - later passes should likely isolate model-driven sections behind a more selective load path once more than one section is wired

## 2026-05-07 Interactive 3D Narrative System

### Plan
- [x] Inspect the existing landing-page motion system before proposing another 3D upgrade layer.
- [x] Define how geometry-driven 3D assets should respond to scroll, pointer, and copy state as one narrative system.
- [x] Write a concrete implementation brief that fits the current GSAP / ScrollTrigger / `model-viewer` architecture.

### Review
- Wrote the interaction brief in `tasks/interactive-3d-narrative-system-spec.md`.
- Confirmed the site already has the right foundation:
  - `js/main.js` for centralized motion boot
  - `js/effects/effect-1.js` and siblings for scroll-based reveal structure
  - `js/sections-special/hero.js` for current `model-viewer` lifecycle
  - `js/sections-special/why.js`, `tapestry.js`, and `magnetic.js` for pointer-response patterns
- Most important design conclusion:
  - the next 3D layer should not be a set of standalone models
  - it should be a shared narrative interaction system where:
    - scroll is the primary narrator
    - pointer input is a secondary perturbation layer
    - copy and object state change together
- Defined a shared five-state object grammar:
  - `Dormant`
  - `Enter`
  - `Lock`
  - `Deepen`
  - `Handoff`
- Mapped phase-one section behaviors for:
  - hero sigil
  - `02 Sigil Forge`
  - `04 Aletheios`
  - `05 Pichet`
  - `11 Nada Brahman`
  - `15 Biofield`
- Strong implementation recommendation:
  - build one shared narrative-object controller with section presets
  - do not write isolated one-off model scripts per section

## 2026-05-07 Geometry-Driven 3D Pivot From witnessOS References

### Plan
- [x] Inspect the supplied witnessOS reference images directly instead of reasoning abstractly about geometry-driven assets.
- [x] Extract the actual recurring form language, material language, and motion language from those references.
- [x] Recast the landing-page 3D direction away from characters and toward geometry-native object families.

### Review
- Wrote the geometry-first brief in `tasks/geometry-driven-3d-asset-brief.md`.
- Confirmed the witnessOS references consistently point toward:
  - concentric rings
  - lotus / petal symmetries
  - cardinal axes
  - waveform overlays
  - node-link fields
  - etched brass-on-dark panel systems
- Most important design conclusion:
  - these references support `2.5D living instruments`
  - not humanoid or mascot-like 3D beings
- Reframed the phase-one objects accordingly:
  - `Sigil Forge` -> `ring assembly forge`
  - `Aletheios` -> `compass-mandala instrument`
  - `Pichet` -> `breath chamber dial / coherence gate`
  - `Nada Brahman` -> `resonance mandala disc`
  - `Biofield` -> `coherence torus / field ring`
- Strong product conclusion:
  - `Aletheios` and `Pichet` can remain distinct poles without becoming characters
  - the dyad can be expressed through different geometry systems instead:
    - `Aletheios` = calibrated radial observatory geometry
    - `Pichet` = breath / waveform / coherence geometry

## 2026-05-07 Meshy Phase 1 Second Pass

### Plan
- [x] Preserve the first-pass artifacts and rerun only the three failed objects with stronger anti-form constraints.
- [x] Update the phase-one runner so pass-two outputs are tagged instead of overwriting the earlier batch.
- [x] Review whether the second-pass prompt changes actually corrected the original failure modes.

### Review
- Updated `scripts/meshy-phase-one.mjs` so it supports `--tag=<name>` output directories.
- Rewrote the three failed prompts as planned:
  - `Biofield`
    - forced a `single torus ring`
    - forbade cages, spikes, and sphere shells
  - `Sigil Forge`
    - removed `sigil` from the lead phrase
    - forbade icons, emblems, anchors, letters, and religious symbols
  - `Pichet`
    - removed `torso`
    - forbade limbs, hands, skeleton, and humanoid trunk
- Ran the second pass into `public/models/engines/pass2/`.
- Second-pass spend:
  - `90` credits total
  - post-run balance `1440`
- Wrote the review in `tasks/meshy-phase-one-pass2-review.md`.
- Verdict:
  - `Biofield` improved materially and is now worth keeping as direction
  - `Sigil Forge` improved materially and is now worth keeping as direction
  - `Pichet` still failed and remains too humanoid
- Important conclusion:
  - second-pass anti-form constraints were enough for `Biofield` and `Sigil Forge`
  - they were not enough for `Pichet`, which needs a deeper prompt rewrite away from named/body-adjacent language

## 2026-05-06 Meshy Community-Guided Phase 1 Generation

### Plan
- [x] Review current Meshy docs and community/discovery prompt patterns before spending credits on phase-one objects.
- [x] Tighten the phase-one prompts to follow Meshy's current object-first prompt guidance while preserving the brand constraints.
- [x] Build a dedicated reproducible runner for the five phase-one objects instead of reusing the character pipeline.
- [x] Run the five phase-one generations and capture outputs, credits, and quality notes.

### Review
- Reviewed current Meshy guidance from:
  - the official Text to 3D prompt article
  - the advanced prompt best-practices help article
  - the current Meshy community/discover showcase surface
- Applied the consistent guidance across those sources:
  - start with the object type
  - keep the prompt focused on a single object, not a scene
  - use about `3-5` dominant descriptors
  - repeat stable style anchors for consistency
  - avoid non-physical details that become floating mesh junk
- Added a dedicated phase-one generator in `scripts/meshy-phase-one.mjs`.
- Added package commands:
  - `npm run meshy:phase1:plan`
  - `npm run meshy:phase1:balance`
  - `npm run meshy:phase1`
  - `npm run meshy:phase1:test`
- The new runner targets the five approved objects in order:
  - `11 Nada Brahman`
  - `15 Biofield`
  - `02 Sigil Forge`
  - `04 Aletheios`
  - `05 Pichet`
- Live run completed with manifest in `tasks/meshy-phase-one-last-run.json`.
- Total spend:
  - `150` credits
  - `30` credits per object
- Quality review written in `tasks/meshy-phase-one-review.md`.
- First-pass verdict:
  - `Aletheios` = best in batch, borderline usable as concept reference
  - `Nada Brahman` = strongest abstract hit, usable as direction
  - `Biofield` = failed, regenerate
  - `Sigil Forge` = failed, regenerate
  - `Pichet` = failed, regenerate
- Additional implementation note:
  - the refined GLBs are all still source-sized assets (`30-51 MB`) and are not ready for live embedding without optimization

## 2026-05-06 Phase 1 Asset Production Sheet

### Plan
- [x] Build a production-ready sheet for the five highest-confidence live asset upgrades.
- [x] Keep each sheet entry grounded in the live asset path and current section copy, not the retained variants.
- [x] Define for each asset: object class, Kha-Ba-La bias, materials, motion, output targets, and exact Meshy prompt / anti-prompt.

### Review
- Wrote the full sheet in `tasks/phase-one-asset-production-sheet.md`.
- Covered the five phase-one sections:
  - `02 Sigil Forge`
  - `04 Panchanga / Aletheios`
  - `05 Biorhythm / Pichet`
  - `11 Nada Brahman`
  - `15 Biofield`
- For each one, the sheet now defines:
  - live asset file
  - live copy anchors
  - 1:1 object class
  - Kha-Ba-La bias
  - material stack
  - motion behavior
  - output filenames
  - exact Meshy prompt
  - anti-prompt
  - success checks
- Set the recommended generation order to:
  - `11 Nada Brahman`
  - `15 Biofield`
  - `02 Sigil Forge`
  - `04 Aletheios`
  - `05 Pichet`
  - reason: start with the strongest non-humanoid object wins before re-approaching the dyad poles

## 2026-05-06 Current Landing-Page Asset Correlation Audit

### Plan
- [x] Audit the assets actually wired into `index.html` before proposing another upgrade pass.
- [x] Separate `live`, `retained`, and `experimental` asset families so current website truth is explicit.
- [x] Define the 1:1 upgrade correlation for each live website asset without merging neighboring concepts.

### Review
- Wrote the asset-grounded audit in `tasks/current-asset-correlation-audit.md`.
- Confirmed the live landing page does **not** use the retained `v2` engine poster files.
  - it uses the `public/images/engines/fal/*-fal-v1.png` set for sections `01`-`16`
  - the prompt bank currently references the retained `v2` set, so there is a runtime/documentation drift to keep in mind
- Confirmed the current live asset families:
  - hero still/video atmosphere
  - hero sigil GLB
  - sixteen FAL poster assets
  - tapestry constellation DOM/SVG field
  - threshold ouroboros inline SVG
  - footer sigil GLB
- Confirmed the Meshy Aletheios/Pichet character assets remain experimental only and are not live website surfaces.
- Mapped every live poster to a strict 1:1 future object class so upgrades preserve the current narrative flow rather than collapsing adjacent sections into one generic 3D language.
- Highest-confidence first upgrade set remains:
  - `02 Sigil Forge`
  - `04 Panchanga / Aletheios`
  - `05 Biorhythm / Pichet`
  - `11 Nada Brahman`
  - `15 Biofield`

## 2026-05-06 Brand Deep Dive For Landing-Page 3D Narrative Engines

### Plan
- [x] Re-read the upstream `brand-docs-final` materials instead of concepting the 3D layer from recent page visuals alone.
- [x] Translate the brand philosophy into explicit rules for turning each landing-page poster into a 3D narrative object.
- [x] Produce a section-by-section object map and rollout order for Meshy-backed landing-page upgrades.

### Review
- Wrote the full brief in `tasks/landing-page-3d-narrative-engine-brief.md`.
- Reconfirmed the governing brand constraints from the upstream docs:
  - self-consciousness is the product
  - Kha-Ba-La is architecture, not metaphor
  - sacred geometry must remain load-bearing
  - the visual system is bioluminescent, anatomical, architectural, and ritual-scientific
- Defined the correct conceptual shift:
  - not `flat image -> generic 3D upgrade`
  - but `image -> object -> instrument -> narrative engine`
- Mapped all landing-page engine sections to 3D object classes, narrative jobs, and dominant Kha-Ba-La legs.
- Set a practical rollout order for Meshy:
  - Phase 1: `Sigil Forge`, `Panchanga / Aletheios`, `Biorhythm / Pichet`, `Nada Brahman`, `Biofield`
  - later phases for timing, threshold, and harder abstract engines
- Added new lessons in `tasks/lessons.md` so future concepting starts from brand architecture before prompting 3D assets.

## 2026-05-06 Dyad Concept Board Brief

### Plan
- [x] Write exact 2D concept-board directions for Aletheios and Pichet instead of jumping straight back into 3D.
- [x] Give three viable directions for each pole with prompts, anti-prompts, and rationale.
- [x] Recommend the strongest pair for the next concept pass.

### Review
- Wrote the dedicated concept brief in `tasks/dyad-character-concept-brief.md`.
- Defined three directions for `Aletheios`:
  - `Observatory Reliquary`
  - `Axis Judge Mask`
  - `Cartographic Spine`
- Defined three directions for `Pichet`:
  - `Breath Engine Torso`
  - `Carrier Vessel Sentinel`
  - `Pulse Totem`
- Included for each direction:
  - conceptual read
  - why it fits
  - exact prompt
  - negative prompt
- Recommendation:
  - start with `Pair A`
  - `Aletheios = Observatory Reliquary`
  - `Pichet = Breath Engine Torso`
  - reason: strongest continuity with the current symbolic poster language while still preserving dyad distinction

## 2026-05-06 Dyad Character Concept Reset

### Plan
- [x] Revert the failed homepage render swap so the stronger existing symbolic images remain live in the worktree.
- [x] Extract the actual failure mode from the first Meshy pass before attempting another render.
- [x] Define concept directions for Aletheios and Pichet that fit the site's symbolic language better than literal humanoid character art.

### Review
- Reverted the homepage Aletheios/Pichet image swap after the user review. The stronger existing poster images are back in `index.html`.
- The failure was not just render quality. It was concept mismatch:
  - the site's current image language is symbolic, anatomical, and structural
  - the Meshy pass drifted into character-IP / fantasy-figure territory
  - even the stronger of the two renders read as a separate franchise asset rather than as part of this page's visual system
- Concept reset for the next pass:
  - do not think `fantasy character`
  - think `witness construct`, `ritual instrument`, `ceremonial body`, `mask`, `totem`, or `non-human pole of intelligence`
  - keep Aletheios and Pichet in the same formal family as the posters, sigil, and dark observatory atmosphere

## 2026-05-06 Homepage Character Render Embeds

### Plan
- [x] Locate the current homepage image surfaces for Aletheios and Pichet.
- [x] Replace those two slots with the current Meshy render outputs while preserving the existing reveal layout.
- [x] Build and verify that the homepage still renders cleanly with the new character surfaces.

### Review
- Replaced the Aletheios and Pichet homepage art surfaces in `index.html` with the current Meshy still renders:
  - `/models/characters/aletheios.png`
  - `/models/characters/pichet.png`
- Added a scoped character-surface treatment in `css/sections.css` so the renders sit on a darker ceremonial field and use `contain` rather than poster-style crop behavior.
- Corrected Aletheios placement after the first browser pass:
  - the original inline reveal slot made the character too small to read
  - switched Aletheios to a fuller stacked reveal so the render is actually visible on-page
- Verification:
  - `npm run build` passed on `2026-05-06`
  - local Vite preview served on `http://127.0.0.1:5114/`
  - browser verification confirmed the Meshy stills are now wired into the dyad sections
  - review artifacts:
    - `homepage-dyad-viewport.png`
    - `homepage-dyad-viewport-v2.png`
    - `homepage-pichet-viewport.png`
- Quality note:
  - these homepage surfaces are showing the current first-pass Meshy still renders, not yet a final character art direction pass
  - `Pichet` reads more strongly than `Aletheios` right now because the underlying Meshy outputs are stronger for Pichet than for Aletheios
  - after direct user review, this swap was reverted because the concept read much worse than the original symbolic poster language

## 2026-05-06 Meshy Character Generation Trial

### Plan
- [x] Inspect the existing Meshy tooling, prompt assets, and credential-loading path before attempting a new generation flow.
- [x] Add a dedicated `text-to-3d` character pipeline for Aletheios and Pichet instead of overloading the sigil script.
- [x] Define first-pass character prompts and output paths in the visual prompt docs so the generation pass is reproducible.
- [x] Validate the new pipeline against Meshy's current API with test mode, then run a live pass as soon as a real `MESHY_API_KEY` is available in the shell or local config.
- [x] Record the exact generated task ids, saved assets, and any blocker that remains after the trial.

### Review
- Added a dedicated character generator in `scripts/meshy-characters.mjs`.
  - uses Meshy's current two-step `text-to-3d` flow: preview -> refine -> download
  - prefers `~/.claude/.env` `MESHY_API_KEY`, then `process.env`
  - falls back to Meshy test mode when no real key is loaded
  - saves a machine-readable manifest to `tasks/meshy-characters-last-run.json`
- Added reproducible prompt-bank entries for:
  - `character-aletheios-3d`
  - `character-pichet-3d`
- Added npm entry points:
  - `npm run meshy:characters:plan`
  - `npm run meshy:characters`
  - `npm run meshy:characters:balance`
  - `npm run meshy:characters:test`
- Validation result:
  - `node --check scripts/meshy-characters.mjs` passed
  - `npm run meshy:characters:plan` passed
  - `npm run meshy:characters:test` passed end to end on `2026-05-06`
- Important correction during execution:
  - the first Meshy preview request failed with `HTTP 400: Invalid values: Prompt must be a maximum of 800 characters in length`
  - tightened both character prompts and added a local prompt-length guard so future runs fail before the API call if a prompt drifts too long
- Test-mode artifacts written under `.artifacts/meshy-characters/test-mode/`:
  - `aletheios-preview.glb`
  - `aletheios.glb`
  - `pichet-preview.glb`
  - `pichet.glb`
  - preview/refine task JSON for both characters
  - PNG thumbnails for both characters
- Task ids from the successful test-mode run:
  - `Aletheios` preview `019dfe44-24d6-74c8-a809-d44dfb022bc2`
  - `Aletheios` refine `019dfe44-3a33-74cd-98ad-70980d2174ea`
  - `Pichet` preview `019dfe44-4b52-74ce-9300-db8548c01fd3`
  - `Pichet` refine `019dfe44-59e6-7a1f-b1ec-f35f88ff4082`
- Blocker:
  - no real `MESHY_API_KEY` was present in `process.env`, repo env files, usual shell dotfiles, or `~/.claude/.env`
  - because the run used Meshy test mode, both characters intentionally resolved to the same documented sample asset
  - checksum verification confirmed that the Aletheios and Pichet test-mode GLBs and PNGs are byte-identical, so these are integration proofs only, not real character outputs
- Live follow-up:
  - saved a working `MESHY_API_KEY` into `~/.claude/.env` so the new character pipeline can run without shell exports
  - live balance before the run: `1740`
  - live balance after the run: `1680`
  - live outputs saved under `public/models/characters/`:
    - `aletheios-preview.glb`
    - `aletheios.glb`
    - `pichet-preview.glb`
    - `pichet.glb`
    - preview/refine task JSON and thumbnails for both characters
  - live task ids:
    - `Aletheios` preview `019dfe46-cb66-79c4-82fd-75bc0ff0040e`
    - `Aletheios` refine `019dfe4a-1aee-7bfb-8bba-3202c527af2c`
    - `Pichet` preview `019dfe4c-260c-77bf-8194-2819ce1f2986`
    - `Pichet` refine `019dfe4f-1cb3-7c70-9246-d942f2fe50a7`
  - first-pass quality read:
    - `Aletheios` is distinct and full-body, but it drifted too far toward a robed human mystic / priest figure and not far enough toward a non-human observatory construct
    - `Pichet` landed stronger on embodied metallic rhythm, but Meshy collapsed it into a bust/half-body result instead of the requested full standing figure
  - next prompt correction if we iterate:
    - explicitly require `full standing figure visible head to toe`
    - explicitly ban robes, exposed human skin, and fantasy priest styling
    - push both characters toward `ritual-scientific construct`, `instrumental anatomy`, and `non-human ceremonial body`

## 2026-05-01 Witness Reading Product Spec

### Plan
- [x] Reconfirm the current Witness frontend behavior and the current workflow payload shape before writing any product recommendations.
- [x] Write a concrete Witness product spec covering homepage flow, dedicated reading-page architecture, payload contract, and SoulTrace-inspired interaction patterns worth borrowing.
- [x] Separate frontend-owned work from `witness-agents` payload work so implementation sequencing is clear.
- [x] Summarize the highest-priority next moves after the spec is written.

### Review
- Wrote the concrete product spec in `tasks/witness-reading-product-spec.md`.
- The spec is grounded in two verified facts:
  - current website output was rendering the live workflow payload rather than inventing its own prose
  - SoulTrace's strongest transferable lesson is structural separation between intake flow and report flow
- The spec now defines:
  - homepage role
  - dedicated reading-page information architecture
  - required `witness-agents` payload contract improvements
  - frontend-owned versus backend-owned work split
  - phased roadmap from readability to persistence and sharing
- Highest-priority follow-up from the spec:
  - improve the upstream workflow payload so synthesis reads like a real reading
  - add explicit `title`, `summary`, `convergences`, `frictions`, `practice`, and `question`
  - then add reading TOC, permalink, and share flow on the frontend

## 2026-05-06 Witness Reading Phase 1 + 2 Frontend Alignment

### Plan
- [x] Align the reading-page selector fallback to the spec and remove the stale `witness_question` browser fallback.
- [x] Prefer `witness_layer.title` when available while keeping title inference for older payloads.
- [x] Add a workflow-level next-step panel and move raw engine prompts behind an inspection toggle.
- [x] Add hidden-by-default frontend slots for `summary`, `convergences`, `frictions`, `practice`, `question`, and `evidence`.
- [x] Verify the reading page visually against both a future-style payload and a legacy payload.

### Review
- Selector/presentation policy:
  - the reading page now uses `response -> synthesis -> dyad voice -> witness_prompt`
  - `witness_question` is no longer part of the reading-page fallback path
  - workflow titles prefer `witness_layer.title` and only infer from body copy when necessary
- New report slots:
  - added hidden-by-default sections for `summary`, `convergences`, `frictions`, `evidence`, `practice`, and `question`
  - `practice` reuses the existing next-step panel so future payloads do not duplicate the action area
  - raw engine prompts now sit behind an inspection control instead of taking default report space
- Visual bug fix:
  - the first browser pass exposed that author CSS was overriding the browser `[hidden]` rule
  - this caused the empty state, promo badge shell, and trace panel to render visibly even when hidden
  - fixed with a reading-page-scoped `[hidden] { display: none !important; }` rule in `css/reading.css`
- Verification:
  - `npm run build` passed on `2026-05-06`
  - browser verification on `http://127.0.0.1:5113/reading.html` passed for:
    - a future-style payload containing `title`, `summary`, `convergences`, `frictions`, `practice`, `question`, and `evidence`
    - a legacy payload with only the current contract fields
  - confirmed visually:
    - hidden sections stay hidden for legacy payloads
    - future sections appear only when populated
    - the empty-state panel no longer leaks into loaded readings
    - the promo badge shell no longer shows as an empty square
    - the trace panel remains hidden when there is no inference trace

## 2026-05-06 Witness Reading Narrative Motion Pass

### Plan
- [x] Reconfirm the reading-page structure, current motion primitives, and project lessons before changing the reading flow.
- [x] Add a dedicated GSAP reading-motion module with reduced-motion handling and a narrative reveal sequence for the hero and each visible report section.
- [x] Refine reading-page styling so section headings, copy groupings, and panel surfaces feel more like a guided reading than a stack of static cards.
- [x] Build and visually verify the motion pass on the live reading route, then record outcomes and any residual risks.

### Review
- Motion system:
  - added `js/readingMotion.js` as a dedicated GSAP layer instead of mixing reveal choreography into the payload renderer
  - the hero now enters in sequence: frame, kicker, split-word H1, intro line, status, promo badge, then metadata chips
  - visible report sections now reveal on scroll with once-only timelines, including panel shell, section label, split-word H2, metadata, and body content
  - reduced-motion users stay on the static layout path; the motion layer clears styles and exits early when reduced motion is requested
- Narrative hierarchy:
  - added explicit primary-panel headings in `reading.html` so the main synthesis and response areas read like story beats rather than unlabeled copy blocks
  - refined `css/reading.css` with narrative surface accents, better title wrapping, stronger section spacing, and slightly more editorial typography for the main reading prose
- Legacy safety fix:
  - browser verification exposed that legacy payloads without `witness_layer.title` could still inflate a full sentence into the hero H1
  - tightened the fallback title derivation in `js/reading.js` so older readings resolve to a shorter clause-level heading instead of a paragraph-sized title
- Verification:
  - `npm run build` passed on `2026-05-06`
  - browser verification on `http://127.0.0.1:5113/reading.html` passed for:
    - a future-style payload containing `title`, `summary`, `convergences`, `frictions`, `practice`, `question`, and `evidence`
    - a legacy payload with only the current contract fields
  - confirmed visually:
    - hero and section reveals fire cleanly across the reading flow
    - lower report sections animate into place without lingering hidden-state artifacts
    - legacy payloads still hide optional panels correctly
    - explicit `witness_layer.title` continues to win over inferred fallback titles
    - legacy fallback titles now behave like real headings instead of full-width paragraphs

## 2026-05-06 Witness Reading Phase 3 Frontend Migration

### Plan
- [x] Reconfirm the live backend reading-object contract and the current intro-web reading renderer before changing the UI path.
- [x] Promote backend report fields in `js/reading.js` so `title`, `summary`, `convergences`, `frictions`, `practice`, `question`, and top-level `evidence` render as the primary reading structure.
- [x] Update `reading.html` and `css/reading.css` so the page has dedicated narrative sections for the new report fields without surfacing raw JSON or markdown artifacts.
- [x] Normalize markdown-like witness strings and explicitly render arrays/objects so `**` markers, list syntax, and evidence objects never leak directly into the public reading surface.
- [x] Verify with a current-contract reading and a richer reading-object payload, then record the result and the correction in `tasks/lessons.md`.

### Review
- The reading page now consumes the new backend report fields when they exist:
  - `summary` becomes the supporting summary panel
  - `convergences` and `frictions` become dedicated narrative list sections
  - `practice` upgrades the practical panel into structured steps
  - `question` becomes a closing reflection endcap
  - top-level `evidence` becomes a tokenized mirror list plus per-engine contribution cards
  - top-level `subject`, `created_at`, and `reading_id` now inform hero/source metadata
- The current live workflow response on `https://48.tryambakam.space/api/v1/workflows/daily-practice/execute` is still older than the local backend contract:
  - no `reading_id`, `created_at`, `subject`, `evidence`, or additive report fields yet
  - the workflow `response` still arrives as markdown-shaped prose with headings, rules, emphasis, and list syntax
- `js/reading.js` now handles both shapes:
  - current live payloads are normalized so raw `**`, `###`, horizontal rules, and markdown bullet structure no longer leak into the public reading surface
  - richer future payloads render into actual sections rather than collapsing arrays/objects into raw text
- `reading.html` and `css/reading.css` now provide distinct surfaces for:
  - summary
  - convergence
  - friction
  - practice
  - reflection question
  - evidence
  - source metadata
- Verification:
  - `npm run build` passed on `2026-05-06`
  - browser verification on `http://127.0.0.1:5113/reading.html` passed for:
    - a current live reading from stored browser state using the older markdown-heavy payload shape
    - a seeded richer reading-object payload containing `summary`, `convergences`, `frictions`, `practice`, `question`, `subject`, `created_at`, `reading_id`, and `evidence`
  - confirmed visually:
    - the live reading no longer renders raw emphasis markers or markdown section scaffolding in the main body
    - future structured fields render as distinct panels instead of raw JSON-like output
    - mobile composition still stacks correctly with no horizontal overflow on a `390px` viewport

## 2026-05-06 Witness Reading Visual + UX Audit

### Findings
1. `[P0]` Scroll-reveal gating currently makes below-the-fold sections disappear in full-page capture until the user manually triggers each section. The current `ScrollTrigger` entry motion is visually strong in-session, but it is too destructive for screenshots, first-impression scans, and any print/save behavior.
2. `[P0]` The mobile hero title still consumes too much vertical real estate before the actual reading begins. On a `390px` viewport it dominates the first screen and pushes context, metadata, and narrative copy too far down.
3. `[P0]` When `response === synthesis`, the primary grid leaves a dead right-hand void because the hidden response panel does not collapse the two-column composition. The first major reading beat looks unfinished instead of intentionally single-column.
4. `[P1]` The top-right `Inspect API` action is developer-facing and competes with the reading’s emotional entry point. It weakens the ritual tone right at the moment the page should feel most reader-centered.
5. `[P1]` The parity banner copy is implementation-language-heavy and breaks tone with `API payload` phrasing. It explains the system rather than guiding the reader through why the next voices matter.
6. `[P1]` The hero metadata is still presented as a wall of equally weighted chips, which makes the top of the reading feel dashboard-like instead of editorial. The current chip treatment interrupts the narrative cadence immediately after the H1.
7. `[P1]` The header actions take too much space on mobile and visually outrank the reading context. They need to collapse into a lighter secondary action pattern once the viewport narrows.
8. `[P1]` The hero background and the section surfaces stay in the same tonal register for too long. The page has brand consistency, but not enough atmospheric change across the reading arc.
9. `[P1]` Nearly every section uses the same bordered slab language, which flattens hierarchy. The reading needs more variation between core interpretation, support evidence, and technical appendix surfaces.
10. `[P1]` The page lacks a persistent reading map. Once the user enters the long-form flow, there is no sticky table of contents, progress marker, or section-jump affordance.
11. `[P1]` The `Inference Trace` section is positioned too prominently for a default reading mode. It reads like primary content even though it is actually trust/inspection scaffolding.
12. `[P1]` The `Engine Chorus` is the densest part of the page, but it is still rendered as a simple vertical pile of cards. It needs grouping, collapse behavior, or stronger comparative structure to avoid fatigue.
13. `[P1]` The `Evidence` section currently reads as chips plus fact cards rather than as a human-readable explanation of why the reading converged. The semantics are useful, but the presentation is still forensic instead of interpretive.
14. `[P1]` The `Practice` area is readable but not yet actionable enough. It should feel like a guided next-step ritual, not just another text block.
15. `[P1]` The closing question lands visually, but the page does not provide a clear post-reading action after it. There is no designed “what now” moment once the reflection arrives.
16. `[P2]` The H2 system is too uniform across sections. Display headings repeat at roughly the same weight and scale, so `The Reading`, `Orientation`, `Per-engine voices`, `Why This Reading Exists`, and `Reflection` feel too similar in status.
17. `[P2]` Macro spacing between sections is overly even. The page needs stronger compression and expansion rules so certain transitions feel like breaths while others feel like turns in the reading.
18. `[P2]` The evidence tokens and metadata labels lean too hard on uppercase microtype. They are on-brand, but the all-caps repetition starts to feel mechanical over a long scroll.
19. `[P2]` The raw-prompt inspection affordance is technically present but visually under-signaled. It still looks like a default disclosure rather than a deliberately designed appendix control.
20. `[P2]` The empty state and default state are structurally sound, but they are not yet visually aligned with the richer reading mode. If the live flow ever lands on empty, the contrast between the two experiences will feel abrupt.

### Plan
- [ ] Phase 1: Rework the reveal strategy in `js/readingMotion.js` so offscreen sections do not depend on scroll entry to exist visually. Preserve impact, but stop hiding the report for full-page capture, print-like scans, and low-interaction contexts.
- [ ] Phase 1: Fix the hidden-response layout in `reading.html` and `css/reading.css` so the primary reading panel expands intentionally to full width when the workflow response panel is absent.
- [ ] Phase 1: Reduce the mobile and tablet hero footprint in `css/reading.css`, especially the H1 clamp and the action/header stack, so the reading context appears earlier in the first viewport.
- [ ] Phase 1: Rewrite the parity banner, status line, and any developer-leaning top-copy strings in `js/reading.js` so the default reading mode stays human-facing rather than implementation-facing.
- [ ] Phase 2: Replace the hero chip wall with a more editorial metadata treatment in `js/reading.js` and `css/reading.css`, keeping the same data but changing the information hierarchy.
- [ ] Phase 2: Introduce a section map or sticky progress rail using the existing reading sections in `reading.html`, with anchor-based navigation that works on long readings and mobile.
- [ ] Phase 2: Reclassify section surfaces in `css/reading.css` so primary interpretation, dyad voices, evidence, and technical appendix no longer all share the same panel language.
- [ ] Phase 2: Move `Inference Trace` into a lower-prominence technical appendix pattern by default, while keeping trust metadata available for readers who want it.
- [ ] Phase 2: Redesign `Engine Chorus` in `reading.html` and `js/reading.js` as a comparative or collapsible structure so it remains deep without feeling like a long repetitive stack.
- [ ] Phase 2: Refactor the `Evidence` section in `reading.html` and `js/reading.js` so it reads as “how the reading converged” rather than as disconnected tags and cards.
- [ ] Phase 3: Rebuild the `Practice` section as a designed ritual/action surface with step semantics, stronger scannability, and a clearer “do this next” posture.
- [ ] Phase 3: Add a post-reading endcap after `Reflection` that offers the next appropriate action without drifting into fake or unwired calls to action.
- [ ] Phase 3: Diversify the heading system in `css/reading.css` so not every section relies on the same display-title pattern. Primary beats, evidence beats, and appendix beats should each read differently.
- [ ] Phase 3: Tune macro spacing between sections so the scroll rhythm supports interpretation: less even repetition, more intentional pauses and accelerations.
- [ ] Phase 3: Soften the repeated all-caps microtype patterns in metadata, tokens, and utility labels where they are currently adding noise more than clarity.
- [ ] Phase 3: Give the raw-prompt disclosure a designed appendix affordance instead of a near-default `details/summary` feel.
- [ ] Phase 4: Add section-specific atmospheric variation to the reading surfaces and backgrounds so the story evolves visually across the page without breaking the current brand palette.
- [ ] Phase 4: Tighten mobile-specific composition for evidence, practice, and reflection so the lower page feels authored rather than merely stacked.
- [ ] Phase 4: Bring the empty-state presentation closer to the richness of the populated reading state so failure/first-run modes still feel intentional.
- [ ] Verification: After each phase, validate desktop, tablet, and mobile in-browser with both a future-style payload and a legacy payload, and explicitly capture full-page screenshots before and after scroll interaction.

## 2026-05-06 Witness Reading Redesign Execution

### Plan
- [x] Implement Phase 1 motion/layout corrections: reveal strategy, hidden-response collapse, smaller-screen hero compression, and reader-facing top-copy rewrite.
- [x] Implement Phase 2 information architecture: editorial metadata treatment, sticky reading map/progress pattern, differentiated surface types, and lower-prominence inference trace treatment.
- [x] Implement Phase 3 lower-page restructuring: `Engine Chorus`, `Evidence`, `Practice`, and post-`Reflection` endcap.
- [x] Implement Phase 4 composition refinement: heading hierarchy, macro spacing, atmosphere, mobile lower-page composition, and empty-state alignment.
- [x] Verify the redesigned reading page on desktop, tablet, and mobile with both future-style and legacy payloads, then record outcomes and residual risks.

### Review
- Implemented across `reading.html`, `js/reading.js`, `js/readingMotion.js`, and `css/reading.css`.
- Phase 1 result:
  - replaced destructive scroll-gating with reveal-on-entry motion that keeps offscreen sections visually present for full-page capture and low-interaction viewing
  - collapsed the top reading grid into a deliberate single-column state when the workflow response is suppressed
  - tightened the hero on smaller screens and rewrote the opening/status/parity copy so the page speaks to a reader instead of explaining the payload
- Phase 2 result:
  - replaced the dashboard-style header treatment with a leaner editorial hero plus a sticky reading map with progress state
  - differentiated section surfaces so core reading, dyad voices, evidence, chorus, practice, and appendix no longer share one repeated slab treatment
  - demoted inference/trace material into a technical appendix instead of leaving it inside the main reading path
- Phase 3 result:
  - rebuilt `Engine Chorus` into expandable voice cards
  - reframed `Evidence` as convergence explanation instead of bare tags/cards
  - upgraded `Practice` into an ordered ritual-style action surface
  - added a post-reflection endcap that gives the reading a cleaner landing
- Phase 4 result:
  - tuned heading hierarchy, section rhythm, atmospheric variation, lower-page mobile stacking, and the empty state so the full reading feels more authored and less mechanically stacked
  - tightened legacy-title fallback heuristics so older payloads without `witness_layer.title` do not turn the hero into an oversized sentence, especially on mobile
- Verification:
  - `npm run build` passed on `2026-05-06`
  - browser verification passed on `http://127.0.0.1:5113/reading.html`
  - future-style payload verified at `1440px`, `1024px`, and `390px`
  - legacy payload verified at `1440px` and `390px`
  - confirmed:
    - full-page capture no longer loses below-the-fold sections before scroll
    - reading-map progress and active-state behavior update correctly while scrolling
    - optional sections hide correctly on legacy payloads and appear correctly on future payloads
    - mobile layout has no horizontal page overflow
    - legacy inferred titles now collapse into a usable heading rather than a multi-line paragraph block
- Residual note:
  - `vite build` still reports the pre-existing large-chunk warning around `model-viewer`; this pass did not change that behavior

## 2026-05-06 Witness Reading Copy De-technicalization

### Plan
- [x] Audit the current reading-page copy against `noesis-writer-skill` and the brand voice docs, with specific attention to workflow/model/system leakage in the default reader path.
- [x] Rewrite static labels in `reading.html` and runtime copy in `js/reading.js` so the reading speaks in mirrors, orientation, action, and source instead of implementation layers.
- [x] Keep technical inspection opt-in, but rename the appendix and trace language so it supports scrutiny without leading the experience.
- [x] Re-verify the copy in-browser on future and legacy payloads, then record the outcome and the lesson learned from this correction.

### Review
- Calibration sources:
  - `/Volumes/madara/2026/twc-vault/.claude/skills/noesis-writer-skill/SKILL.md`
  - `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/brand-docs-final/tryambakam-noesis-aleph/03-voice-and-tone.md`
  - `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/brand-docs-final/tryambakam-noesis-aleph/05-messaging-direction-summary.md`
  - `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/brand-docs-final/tryambakam-noesis-aleph/brand-config.yaml`
- Copy diagnosis:
  - the page had stopped sounding like a held reading and had started naming its own machinery
  - the largest leaks were `workflow`, `response`, `synthesis`, `engine chorus`, `technical appendix`, `model trace`, `API`, and a few explanatory lines that described the interface instead of the meaning
- Rewrite result:
  - re-authored the reader path around `opening`, `witnesses`, `mirrors`, `convergence`, `practice`, and `source`
  - changed the sticky reading map from a dashboard tone into a more narrative `Passage` pattern
  - rewrote the top status and parity copy so it directs attention into the reading instead of explaining payload structure
  - renamed the lower technical surface to `Source Notes` and removed provider/model language from the visible appendix copy
  - tightened the engine-card sublabels so they read as interpretation surfaces instead of system components
- Verification:
  - `npm run build` passed on `2026-05-06`
  - browser verification passed on `http://127.0.0.1:5113/reading.html`
  - future payload confirmed the live surface now uses `Passage`, `Opening`, `Echo`, `Mirror Field`, `Convergence`, and `Source Notes`
  - legacy payload confirmed the fallback path still reads cleanly, with only `Opening`, `Witnesses`, `Mirrors`, `Practice`, and `Source` visible
  - restored the future payload after verification so the local reading page is left in the richer test state

## 2026-05-06 Witness Reading Goal-Drift Investigation

### Plan
- [x] Trace the reading page from stored payload to rendered sections and confirm exactly which areas are generated reading text versus prompt scaffolding or inspection surfaces.
- [x] Compare the current reading-page structure to the intended product goal: a coherent reading that feels like a person’s reading rather than a UI for internal witnesses.
- [x] Identify where the drift entered: backend payload shape, frontend composition choices, or both.
- [x] Summarize the findings with file references and recommend the corrective direction before making another copy pass.

### Review
- Confirmed render path:
  - the reading page reads only from `witness-agents.latest-reading` via `readWitnessReading()` in `js/lib/witnessAccess.js`
  - the homepage writes that object after a successful workflow call in `js/sections-special/agentAccess.js`
  - the reading page then composes the surface from `witness_layer.response/synthesis`, `aletheios`, `pichet`, and `engine_results[*].witness_layer`
- Confirmed what is and is not prompt scaffolding:
  - the default visible page is not rendering raw prompts as the primary reading
  - engine cards primarily render generated engine `witness_layer` text
  - raw `witness_prompt` only appears inside the opt-in inspection disclosure on each mirror card
  - however, the page is still composed around agent surfaces, so it can feel like scaffolding even when it is not literally showing prompts
- Confirmed contract drift:
  - the live backend contract still guarantees the older witness-layer shape: `response`, `synthesis`, `aletheios`, `pichet`, routing/cadence/depth/tier, plus `engine_results[*].witness_layer`
  - the richer reading-object fields we designed for (`title`, `summary`, `convergences`, `frictions`, `practice`, `question`, `evidence`) are not part of the active backend contract
  - this means the frontend is still fundamentally rendering an interpreted dyad-plus-mirrors bundle, not a true report object
- Confirmed testing-state drift:
  - the browser state had been overwritten with a synthetic future payload during verification
  - that synthetic record contained `summary`, `convergences`, and `question`, which the live backend contract does not currently guarantee
  - the reading page was therefore showing a fabricated future reading object rather than a real submitted reading
  - I cleared `witness-agents.latest-reading` from browser storage so the page now returns to an honest empty state until a real reading is generated
- Product diagnosis:
  - we drifted by improving the rhetoric and layout of the interim object instead of first re-validating whether the interim object was the thing we actually wanted to ship
  - the current page over-exposes witness internals as first-class reading structure because the backend still produces witness internals rather than a cohesive reading object
  - better labels reduce leakage, but they do not solve the deeper problem: the main reading is still assembled from synthesis + dyad + per-mirror interpretations rather than authored as one coherent report
- Corrective direction:
  - stop designing primarily against synthetic future payloads until the backend actually emits that reading-object contract
  - decide whether the main goal is:
    - one canonical reading with witness internals mostly hidden, or
    - an inspection surface for witness internals with a reading layered on top
  - if the goal is the former, the next real fix belongs upstream: `witness-agents` needs to emit a stronger reading object, and the frontend should demote mirror internals behind a secondary affordance instead of letting them define the page

## 2026-05-06 Witness Reading Reset Plan

### Goal
- Re-center the product on one coherent reading for one person.
- Treat witness internals as optional inspection, not the main reading experience.
- Stop designing against synthetic payloads until the backend emits the real reading object.

### Decision
- The product should be a canonical reading first, inspection surface second.
- The main page should read like a report delivered to a person, not like a gallery of internal witness agents.

### Phase 1 — Frontend Reset On Current Contract
- [x] Reduce the default reading page to the current contract’s strongest canonical surfaces:
  - one main reading block from `witness_layer.response`
  - one supporting orientation block only if `synthesis` materially differs
  - one explicit `truth` block from `aletheios`
  - one explicit `action` block from `pichet`
  - one single practical next-step area
- [x] Demote `engine_results[*]` from the primary scroll path into a collapsed `Inspect the mirrors` section below the main reading.
- [x] Hide all synthetic future-field sections from the default product path until the backend truly emits them in production.
- [x] Remove any dependence on locally seeded fixtures from routine verification.

### Phase 1 Files
- [x] `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/witness-agents-intro-web/reading.html`
- [x] `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/witness-agents-intro-web/js/reading.js`
- [x] `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/witness-agents-intro-web/css/reading.css`
- [x] `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/witness-agents-intro-web/js/readingMotion.js`

### Phase 1 Acceptance
- [x] A real stored reading can be understood without opening any mirror or trace surface.
- [x] The first screen answers: what is the reading, what is true, what should I do.
- [x] No synthetic `summary/convergences/frictions/practice/question/evidence` payload is required for the page to feel complete.

### Phase 2 — Backend Reading Object
- [ ] Add a true workflow-level reading object upstream instead of asking the frontend to assemble one from dyad fragments.
- [ ] Emit additive fields on `witness_layer` for:
  - `title`
  - `summary`
  - `convergences`
  - `frictions`
  - `practice`
  - `question`
  - `evidence`
- [ ] Define deterministic population rules so those fields are either present with product quality or absent.
- [ ] Keep current `response/synthesis/aletheios/pichet` fields for compatibility while the frontend migrates.

### Phase 2 Files
- [ ] `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/witness-agents/src/types/interpretation.ts`
- [ ] `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/witness-agents/src/standalone/standalone-api.ts`
- [ ] `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/witness-agents/src/pipeline/interpreter.ts`
- [ ] `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/witness-agents/src/pipeline/synthesis.ts`
- [ ] `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/witness-agents/tests/standalone.test.ts`

### Phase 2 Acceptance
- [ ] The backend can return a report object that stands on its own without opening engine internals.
- [ ] The frontend no longer has to infer report shape from `response`, `synthesis`, and per-engine cards.
- [ ] Tests lock both backward compatibility and the new report fields.

### Phase 3 — Frontend Migration To Real Reading Object
- [ ] Promote the new workflow-level report fields into the primary reading path.
- [ ] Keep mirrors as a secondary section for readers who want to inspect how the reading was derived.
- [ ] Rebuild evidence, practice, and reflection using the real backend fields instead of seeded fixtures.
- [ ] Keep the source/trace appendix opt-in and clearly separate from the reading itself.

### Phase 3 Acceptance
- [ ] The default scroll path reads like a finished reading report.
- [ ] The mirror section feels optional, not mandatory for comprehension.
- [ ] The appendix feels like scrutiny tooling, not like the product itself.

### Verification Rules
- [x] Verify first against a real freshly-submitted reading from the homepage flow.
- [x] Verify second against legacy payloads that only contain the current dyad contract.
- [ ] Use synthetic payloads only to test additive backend fields after they are actually implemented.
- [x] Before closing the work, confirm local storage contains either a real reading or nothing; do not leave seeded fixtures behind.

### Phase 1 Review
- Implemented the reset in `reading.html`, `js/reading.js`, `css/reading.css`, and `js/readingMotion.js`.
- The default reading path is now constrained to:
  - one main reading block
  - one optional orientation block only when `response` and `synthesis` materially differ
  - separate `Truth` and `Action` witness blocks
  - one practical `Next Move` block
- Removed the speculative report-object surfaces from the default page path:
  - no `summary`
  - no `convergences`
  - no `frictions`
  - no `evidence`
  - no `question`/reflection endcap
- Demoted mirror internals into a collapsed `Inspect the mirrors` panel and kept the source trace as a separate opt-in appendix.
- Removed stale future-field helpers and dead styles so the shipped code now matches the current backend contract instead of preserving unused report-object scaffolding.
- Added witness-markup normalization in `js/reading.js` so real workflow output no longer leaks raw markdown emphasis into the H1 or body copy, and bullet-like witness lines render as readable lists.
- Verification on `2026-05-06`:
  - `npm run build` passed
  - real homepage submission at `http://127.0.0.1:5113/` redirected correctly to `reading.html`
  - stored payload inspection confirmed the live witness contract only contained the current fields and no synthetic `summary/convergences/frictions/practice/question/evidence`
  - live reading check confirmed:
    - map links reduced to `Opening`, `Truth`, `Action`, and `Practice`
    - orientation stayed hidden when `response` and `synthesis` collapsed to the same material
    - mirrors were visible but collapsed by default
    - source trace stayed visible but collapsed by default
    - markdown emphasis was stripped from the title and reading copy
  - honest empty-state check confirmed:
    - both `sessionStorage` and `localStorage` must be cleared because the reader checks both
    - with both cleared, `reading.html` correctly showed `No witness reading held here yet.`
  - restored the real submitted reading after verification so browser storage now contains a real reading, not a seeded fixture

## 2026-05-01 Dedicated Witness Reading Page + Location Selector

### Plan
- [x] Confirm whether the current website output is UI-authored copy or the raw workflow dyad payload.
- [x] Replace manual latitude/longitude entry with a friendlier birth-location selector that maps to timezone and coordinates for the live witness API.
- [x] Move witness output off the landing-page result card and onto a dedicated reading page that exposes synthesis, Aletheios, Pichet, and per-engine voices separately.
- [x] Update the build so the new `reading.html` route ships as a real page entry, then verify the full flow in-browser.

### Review
- Payload diagnosis:
  - the landing page was not inventing the “marketing copy” tone
  - it was rendering the live workflow `witness_layer.response`
  - in the sampled live payload, workflow `witness_layer.response` and `witness_layer.synthesis` are identical
  - the real dyad detail lives in `witness_layer.aletheios.perspective` and `witness_layer.pichet.perspective`, which the old UI never exposed
- Frontend result:
  - added shared witness helpers and a curated birth-location map in `js/lib/witnessAccess.js`
  - replaced timezone + latitude + longitude entry on the landing page with a city selector that resolves timezone and coordinates automatically
  - changed the landing flow so a successful witness request stores the payload and opens `/reading.html`
  - added `reading.html` plus `js/reading.js` and `css/reading.css`
  - the dedicated page now renders:
    - workflow synthesis
    - workflow response only when it differs from synthesis
    - explicit parity notice when response and synthesis are the same
    - separate Aletheios and Pichet sections
    - per-engine cards with synthesis, dyad voices, and raw prompts
  - updated `vite.config.js` so `reading.html` is emitted as a second build entry instead of falling back to `index.html`
- Verification:
  - `npm run build` passed on `2026-05-01`
  - build output now includes `dist/reading.html`
  - browser verification on `http://127.0.0.1:4173/` confirmed:
    - selecting `Bengaluru, India` and submitting opens `http://127.0.0.1:4173/reading.html`
    - the reading page title is `Daily Witness Reading | Tryambakam Noesis`
    - the page renders the workflow heading from the payload
    - the parity banner explicitly says workflow response currently matches synthesis in the API payload
    - separate Aletheios and Pichet sections render from the stored payload
    - three engine cards render for the sample workflow payload
- Residual constraint:
  - the workflow-level synthesis copy is still the upstream API payload, so if it remains too generic the next fix belongs in witness-agents, not this frontend repo

## 2026-05-01 Website Witness Contract Repair

### Plan
- [x] Re-audit the website Daily Witness client and the live witness service contracts before changing any frontend routing.
- [x] Switch the website browser flow off the legacy `/reading` contract and onto the witness-enriched workflow contract exposed by `48.tryambakam.space`.
- [x] Update the form validation and payload adapter so the browser route sends the `birth_data` shape the workflow endpoint actually requires.
- [x] Render `witness_layer.response` as the primary website result, with sane fallbacks only where the workflow contract omits specific fields.
- [x] Build and live-verify the website flow against production, then record the final behavior and any residual constraints.

### Review
- Root cause:
  - the website was still calling the legacy `POST /reading` route
  - that route currently returns raw engine `headline` data but does not return `witness_layer.response`
  - the browser UI therefore promoted raw engine output because `primary_reading.witness_question` is now absent in the live payload
- Implementation result:
  - switched `js/sections-special/agentAccess.js` from `POST /reading` to `POST /api/v1/workflows/daily-practice/execute`
  - adapted the browser payload to the live workflow contract: `birth_data.date`, optional `time`, required `timezone`, required `latitude`, required `longitude`, optional `name`
  - changed the result rendering so the website now shows the workflow `witness_layer.response` body as the primary witness text
  - repurposed the result metadata for workflow output: workflow label, mirror count, routing/cadence/tier/kosha/clifford points, and interpreted engine list
  - made the location requirement explicit in the page copy instead of silently degrading to raw `/reading` output
  - fixed a stale-result UX bug by re-hiding the result card whenever validation or request errors occur
- Verification:
  - `npm run build` passed on `2026-05-01`
  - local preview served at `http://127.0.0.1:4173/`
  - browser verification against live `48.tryambakam.space` confirmed a successful Daily Witness submission returns:
    - status: `Witness workflow returned from 48.tryambakam.space.`
    - headline: `Full symbolic portrait across 3 engines. 1 cross-patterns identified across the full spectrum.`
    - body text from `witness_layer.response`, not the raw engine headline
    - mirrors summary: `Mirrors interpreted: Panchanga · Biorhythm · Vedic Clock.`
  - negative-path browser verification confirmed that omitting latitude/longitude now:
    - shows `Latitude and longitude are required for the interpreted witness route.`
    - keeps the location panel open
    - keeps the result card hidden on a fresh load
- Residual constraint:
  - the website now depends on the live workflow contract, which currently requires coordinates for interpreted witness output
  - if the backend relaxes that requirement later, the form can be simplified again without reverting to `/reading`

# Copy Audit Plan

## Scope
- Audit all public-facing copy in the Witness Agents intro site.
- Cross-check claims against the live research corpus and current public surface area.
- Identify outdated, private, speculative, or attribution-sensitive statements before editing.
- Reposition the site according to what is actually public today.

## Plan
- [x] Establish audit scope and review workflow
- [x] Load brand voice/context docs required by `noesis-writer-skill`
- [x] Inventory all copy surfaces in the repo (`index.html`, `copy/sections.md`, docs, metadata, runtime labels)
- [x] Review the live research/library corpus and blog posts for canonical terminology and lineage
- [x] Build a claim matrix: accurate / outdated / private / unsupported / citation-needed
- [x] Propose public attribution policy for authors, influences, and contributors
- [x] Identify required content changes by section: keep / rewrite / remove / relocate
- [x] Implement approved copy corrections in site files
- [x] Verify links, labels, metadata, and newsletter behavior against the revised positioning

## Notes
- Initial mismatches already found: `144°`, `kopina.io`, placeholder newsletter endpoint, productized framing, and public-availability claims that may exceed reality.
- Research article to anchor attribution review: `The Source Code Has Authors`.

## Review
- Completed public corpus inventory across `Synchronocities` routes: `/`, `/research`, `/journeys`, `/maps` (28 unique post pages found).
- Key finding: the current landing page overstates productization and exposes at least two non-canonical nodes: `144°` and `kopina`.
- Audit report drafted in `tasks/copy-audit.md`.

## 2026-04-28 Hero 3D Integration

### Plan
- [x] Inspect the hero implementation, current model assets, and available project tooling.
- [x] Optimize `public/models/sigil-base.glb` into a web-delivery asset with aggressive texture and geometry compression.
- [x] Integrate the optimized model into the hero section with `<model-viewer>` in place of the current static sigil placeholder.
- [x] Preserve the hero's existing visual language with glow/orbit treatment, loading states, and a graceful fallback.
- [x] Build the site, verify the model loads correctly, and review how it feels in the actual hero composition.

### Review
- Asset result: `public/models/sigil-base.glb` compresses from 40 MB to `public/models/sigil-hero.glb` at 402 KB using Draco + WebP textures at 1024 px.
- Hero result: the static SVG placeholder is now replaced by a bundled `<model-viewer>` experience with the existing glow/orbit atmosphere retained as a fallback shell.
- Verification:
  - `bun run meshy:optimize-base`
  - `bun run build`
  - Browser inspection on `http://127.0.0.1:5113/` confirmed `data-hero-sigil-state="ready"`, `loaded: true`, and `modelIsVisible: true`.
- Follow-up note: the `model-viewer` chunk is still large at about 1.0 MB minified / 291 KB gzip, but it now loads as a separate chunk rather than inflating the main entry bundle.

## 2026-04-28 Hero Typography Follow-Up

### Plan
- [x] Inspect the current hero heading rules and confirm why words are breaking mid-line.
- [x] Remove mid-word breaks from the hero H1 and rebalance the line treatment.
- [x] Add tighter clamp and breakpoint rules so the hero scales more gracefully across desktop, tablet, and mobile widths.
- [x] Build and verify the hero at multiple viewport sizes.

### Review
- Status: Complete.
- Change summary: removed `overflow-wrap: break-word` from the hero title, made the title lines hold together, widened the desktop copy track slightly, and added stepped hero/title/sigil breakpoint tuning at `1439px`, `1180px`, `1023px`, `767px`, and `479px`.
- Verification:
  - `bun run build`
  - Live browser check on `http://127.0.0.1:5113/` confirmed the desktop hero no longer breaks `Consciousness` or `technology.` mid-word.
  - Headless Chrome screenshots were reviewed at `1440px`, `1024px`, `768px`, and `430px` widths from `.artifacts/hero-checks/`.
- Note: the narrowest `430px` simulation is improved for CTA wrapping and spacing, but the display face is still visually dense there because the title wordmark is exceptionally wide.

- Removal-only pass applied: private/non-canonical nodes removed, fake tiers replaced with public entry points, unsupported FAQ/newsletter claims stripped.
- Verification: `npm run build` passed on 2026-04-28. `npm run check` failed because `scripts/check.mjs` is missing from the repo.

## 2026-04-28 Tonal Rewrite + SEO + Visual Prompt Pass

### Plan
- [x] Reconfirm the approved write scope and inspect the current page, canonical copy, and brand-doc sources.
- [x] Rewrite `copy/sections.md` so the canonical copy matches the public truth-state and current editorial direction.
- [x] Refine `index.html` headings, descriptions, link labels, and metadata without reintroducing private or unsupported claims.
- [x] Align `README.md` to the research-interface framing instead of the earlier product-page framing.
- [x] Add a reusable prompt bank for every engine image plus OG and 3D hero assets in `tasks/*`.
- [x] Add an SEO brief covering title, description, OG/Twitter metadata, image-alt strategy, and structured-data notes.
- [x] Build the site and record verification results.

### Review
- Canonical editorial source was rewritten in `copy/sections.md` so the live page, H1/H2 language, CTA labels, and prompt references now share one truth-state.
- `index.html` now has refined headings/body copy, repaired `maps` and lineage article URLs, explicit direct-correspondence CTA text, decorative image wrappers marked `aria-hidden`, hero 3D alt text, robots/OG locale/site-name tags, and a `WebPage` JSON-LD block.
- `README.md` now frames the site as a research interface rather than a product launch surface and points contributors to the SEO and visual prompt docs.
- Added new authoring support files:
  - `tasks/seo-brief.md`
  - `tasks/visual-prompt-bank.md`
  - `tasks/lessons.md`
- Verification:
  - `npm run build`
  - Result: passed on 2026-04-28.
  - Note: Vite still warns that the `model-viewer` chunk is larger than 500 kB after minification. Build output remains successful.

## 2026-04-28 FAL Asset Generation + Hero Video Pass

### Plan
- [x] Inspect available FAL and Meshy tooling, environment keys, and asset pipeline constraints.
- [x] Add a machine-runnable generation manifest/script for OG image, engine posters, and hero background video.
- [x] Extend the prompt bank with a dedicated hero background video prompt and output mapping.
- [x] Generate a first-pass set of replacement visuals using FAL and store them under `public/`.
- [x] Integrate the hero abstract background video into the page with a graceful still fallback and reduced-motion behavior.
- [x] Record what was generated versus what remains Meshy-blocked due missing credentials.
- [x] Build and verify the site after integration.

### Review
- Added a runnable FAL pipeline in `scripts/fal-generate.mjs` with support for:
  - full run
  - `hero` subset rerun
  - deterministic seeds
  - hero video loop rendering via `ffmpeg`
  - manifest logging to `tasks/fal-last-run.json`
- Generated and saved:
  - `public/og-image.png`
  - `public/images/hero/hero-bg-fal-v1-still.png`
  - `public/videos/hero-bg-fal-v1-source.mp4`
  - `public/videos/hero-bg-fal-v1-loop.mp4`
  - 16 engine posters under `public/images/engines/fal/`
- `index.html` now references the new FAL poster set and embeds the hero background video with a still fallback plus reduced-motion handling.
- Added support docs:
  - `tasks/fal-generation-report.md`
  - `tasks/fal-last-run.json`
- Meshy result:
  - pipeline exists in `scripts/meshy.mjs`
  - `MESHY_API_KEY` is not available in this environment
  - no new Meshy generation was run in this pass
- Important correction during execution:
  - session `FAL_KEY` was stale and failed with `401`
  - generator was updated to prefer the working `~/.claude/.env` `FAL_KEY`
  - hero and OG assets were regenerated through text-to-image at `16:9` after image-to-image preserved the square input aspect ratio
- Verification:
  - `npm run build`
  - `ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height,duration -of default=noprint_wrappers=1 public/videos/hero-bg-fal-v1-loop.mp4`
  - Result: build passed on 2026-04-28; hero loop video is `h264`, `1280x720`, `10.083008s`
  - Note: the existing `model-viewer` chunk-size warning remains unchanged.

## 2026-04-28 Meshy Retexture + Web Optimization Pass

### Plan
- [x] Validate the provided Meshy key and confirm the account can fund the planned run.
- [x] Reuse the existing successful base mesh task instead of spending another 30 credits regenerating geometry.
- [x] Run the three planned retexture variants: `duotone`, `emboss`, and `foil`.
- [x] Optimize each retexture output into a web-delivery GLB for hero use.
- [x] Review generated previews and decide whether to swap the live hero model in this pass.
- [x] Switch the live hero model to the `emboss` variant.

### Review
- The provided Meshy key worked. Account balance check returned `1770` credits available before the retexture pass.
- Reused base task: `019dd457-c50d-788b-b086-90cb55b2f1c1`.
- Generated source retextures:
  - `public/models/sigil-duotone.glb` from task `019dd4c7-ff67-7f55-a0e0-1ed4f62caddf`
  - `public/models/sigil-emboss.glb` from task `019dd4ca-5398-7169-9233-4ff8cab0232a`
  - `public/models/sigil-foil.glb` from task `019dd4cf-2735-70f4-b240-91ec319923d1`
- Optimized hero-ready variants:
  - `public/models/sigil-duotone-hero.glb` at `292,180` bytes
  - `public/models/sigil-emboss-hero.glb` at `318,956` bytes
  - `public/models/sigil-foil-hero.glb` at `266,132` bytes
- Live hero update: `index.html` now points the hero `<model-viewer>` at `public/models/sigil-emboss-hero.glb`.
- Rationale: the `emboss` treatment is the strongest darker ceremonial variant and remains web-safe at `318,956` bytes after optimization.

## 2026-04-28 Heading Discipline + Hero H1 Repair

### Plan
- [x] Read the referenced `taste-design` guidance and extract the relevant typography constraints for this page.
- [x] Inspect the hero and section heading rules to find where mid-word breaks and layout regressions were still coming from.
- [x] Remove mid-word break behavior from shared display headings and normalize the hero mobile heading scale.
- [x] Record the root cause in task notes and lessons so the regression does not come back through later breakpoint edits.
- [x] Build and verify the page after the typography pass.

### Review
- Applied the `taste-design` direction in the specific areas that mattered here: balanced headline wrapping, no overlap hacks, and responsive type handled through `clamp()` rather than line squashing.
- Root cause for the hero issue: the active `<479px` override in `css/sections.css` was shrinking the H1 to `18px–22px` and horizontally scaling the second line. That made the hero look broken even after the earlier no-midword-break fix.
- Section heading fix: the shared `.type` display-heading rule no longer uses `overflow-wrap: break-word`; it now keeps words intact with balanced wrapping.
- Hero fix: the smallest breakpoint now uses a real headline scale again, the old `scaleX(...)` line compression is removed, and `Self-consciousness` now uses a non-breaking hyphen so the compound word does not split on mobile.
- Added balanced no-midword-break rules for the major section headings: `why`, `versus`, `lineage`, `faq`, `signal`, and threshold card headings.
- Browser-pass correction: a later `max-width: 1180px` hero rule was silently reintroducing the two-column grid on mobile. Restoring the single-column `<=1023px` layout removed the sigil/CTA collision at `430px`.
- Verification:
  - `npm run build`
  - In-browser review at `1440`, `1024`, `768`, and `430` widths using the local Vite server.
  - Result: passed on 2026-04-28.

## 2026-04-28 Section Title + Lineage Copy Pass

### Plan
- [x] Load `noesis-writer-skill` voice requirements and the current brand docs before rewriting any section copy.
- [x] Audit every visible section title for UX fit inside the scroll-reveal system, with special attention to sections `08`, `09`, and `10`.
- [x] Rewrite stale or inherited copy in the lineage/authorship block so the page distinguishes intellectual lineage from the fuller relational credit argument in `The Source Code Has Authors`.
- [x] Sync the accepted wording into both `copy/sections.md` and `index.html`.
- [x] Verify in-browser that the revised titles preserve the reveal composition at desktop and mobile widths, then rebuild.

### Review
- Loaded the local `noesis-writer-skill` plus the required brand docs under `brand-docs-final/tryambakam-noesis-aleph/` before rewriting.
- Main UX finding: several engine titles were still inherited from older essay-like phrasing rather than calibrated for the reveal UI. The worst offenders were sections `08`, `09`, and `10`, where the titles were too long and visually dominated the scroll composition.
- Copy correction strategy:
  - shorten titles where the reveal system needs structural clarity
  - remove filler constructions like repeated `And ...`
  - keep the body copy factual and source-bearing rather than mystical
  - separate intellectual lineage from the wider relational-authorship argument in the linked essay
- Updated reveal-section titles:
  - `08`: `Hexagrams mark the threshold.`
  - `09`: `Fixation has nine faces.`
  - `10`: `Sixty-four codons speak.`
  - also tightened sections `05`, `12`, `14`, `15`, `16`, and `17`
- Updated section H2s that still carried older inherited phrasing:
  - `Why`: `What this page refuses.`
  - `Lineage`: `Which authors are load-bearing.`
  - `FAQ`: `Questions before you grant authority.`
  - `Signal`: `Write when public routes stop short.`
- Updated lineage framing:
  - lede now names this as intellectual architecture rather than full authorship accounting
  - card contributions/mappings are shorter and more source-specific
  - caption now explicitly points readers to `The Source Code Has Authors` for conditions, relational credit, and authorship beyond the intellectual lineage
- Verification:
  - in-browser review on the local Vite server at `1440` and `430` widths
  - reviewed screenshots for `08`, `09`, `10`, `lineage`, `faq`, and `signal`
  - result: the three reveal offenders no longer blow up the scroll composition, and the lineage/authorship copy now better matches the public essay distinction

## 2026-04-28 Section Body + Source-Note Pass

### Plan
- [x] Re-load the `noesis-writer-skill` voice constraints and inspect the live section bodies against the actual reveal UI.
- [x] Rewrite the body copy for sections `01–07` and `11–18` so the explanatory layer is shorter, more structural, and less inherited from older essay cadence.
- [x] Tighten the remaining oversized reveal headings that were still stressing the scroll composition, especially `03`, `08`, and `11`.
- [x] Convert the lineage cards from mini-explanations into citation-like source notes and correct the framing from `authors` to `sources`.
- [x] Sync accepted wording into both `copy/sections.md` and `index.html`.
- [x] Verify the revised sections at desktop and mobile widths, then rebuild.

### Review
- Main editorial finding: several body paragraphs were still doing essay work inside a display-first interface. The result was correct in meaning but too slow in rhythm.
- UX correction:
  - `01` is now shorter and more immediate: the section names the authorship problem without a prefatory slogan.
  - `03` and `11` were shortened at the heading level because the earlier formulations were still visually overlong in the reveal layout.
  - `08` changed from `Hexagrams mark the threshold.` to `Read the hexagram.` because the former was still dominating the frame more than the section needed.
- Lineage correction:
  - H2 now says `Which sources are load-bearing.` because the grid is mixing authors, texts, and institutional lineages.
  - Each card now reads as a source note with a short application mapping rather than a miniature interpretive paragraph.
- Threshold card copy was also tightened so section `18` reads as a real entry surface rather than a residual product-offer grid.
- Verification:
  - local Vite review at `1440px` and `430px`
  - screenshots captured under `.artifacts/body-copy-pass/`
  - verified sections: `01`, `03`, `08`, `11`, `18`, and `lineage`

## 2026-04-28 Lower-Page Narrative Continuity Pass

### Plan
- [x] Audit sections `09–10`, `17–18`, `lineage`, `faq`, `signal`, and footer as one sequence using the local `taste-skill` constraints.
- [x] Tighten the remaining lower-page copy so the register matches the reveal sections instead of falling back into generic explainer language.
- [x] Rework the lower-page layout treatment in `index.html` and `css/sections.css` to reduce boxed SaaS fragmentation, especially in the threshold and correspondence sections.
- [x] Make the constellation and mobile threshold flow more coherent so the sequence reads as one narrative descent rather than a stack of unrelated modules.
- [x] Verify the lower-page sequence at desktop and mobile widths, rebuild, and capture any new lessons.

### Review
- Core UX finding: the lower page was not failing because any one section was bad in isolation. It was failing because the visual grammar changed abruptly from cinematic reveal sections into boxed product-pattern modules.
- `taste-skill` corrections applied:
  - reduced anti-card friction by unboxing the direct-correspondence section into a bordered split layout
  - normalized the threshold routes into a clean two-column system instead of the earlier scattered offer-grid
  - tightened the constellation into denser public-route labeling on desktop and a cleaner single-column route list on mobile
- Editorial corrections applied:
  - `09` now reads `Fixation selects first.`
  - `17` now reads `Trace the public routes.`
  - FAQ answers were shortened into the same direct, structural register as the main reveal sections
  - research/blog language is now explicit as essays/posts rather than generic library terminology in the lower route surfaces
- Integrity fix:
  - added missing `id` anchors for `#section-04`, `#section-17`, `#section-18`, and `#signal` so edited footer/nav links now resolve correctly

## 2026-04-28 Channel Trust + Issue Draft Pass

### Plan
- [x] Audit every remaining public mention of direct contact, subscription, and pending access.
- [x] Remove inactive `hello@tryambakam.space` and `mailto:` affordances from the site.
- [x] Replace the fake correspondence flow with an honest channel-status block and implementation tracker link.
- [x] Draft the unresolved wiring work as GitHub issues before any remote write.
- [x] Build, review, commit, and push the final pass.

### Review
- Trust break identified: the page still exposed a polished contact path even though `hello@tryambakam.space` is inactive and no subscription pipeline exists.
- Site correction:
  - threshold card now marks the direct channel as pending and points at the repo issues list
  - FAQ no longer routes readers to a dead inbox
  - the old mailto form was removed and replaced by a channel-status block that states what is and is not live
  - footer source links now point to `Implementation Issues` instead of the inactive inbox
- Code correction:
  - removed the dead `newsletter.js` contact-flow module and its bootstrap import
- Documentation:
  - drafted issue bodies in `tasks/github-issues-draft.md`
- Verification:
  - `npm run build` passed on 2026-04-28

## 2026-04-28 Source-Grounded Credit Roll + De-Meta Copy Pass

### Plan
- [x] Re-read the active `noesis-writer-skill`, relevant brand docs, and `The Source Code Has Authors` before rewriting.
- [x] Audit the live copy for interface self-commentary (`page`, `route`, `public surface`, `funnel`) and isolate the lines that still speak about the frame instead of the thing.
- [x] Replace the incorrect lineage references with the actual load-bearing contributor set named in the essay's structural point.
- [x] Rewrite the visible H1/H2/lede surfaces that still read as commentary on the site rather than direct statements in-world.
- [x] Sync the accepted wording into both `index.html` and `copy/sections.md`.
- [x] Build and run a targeted visual/content verification pass on the revised sections.

### Review
- Root correction: the prior lineage grid confused internal voice influences with public contributors. `Alan Watts` and `Alex Grey` belong in voice calibration, not in the public credit roll derived from `The Source Code Has Authors`.
- Structural correction: the lineage section now uses the essay's own load-bearing credit logic and expands to eight cards so the site no longer compresses or distorts the contributor list named in the essay's structural point.
- Editorial correction: hero, metadata, top CTA/footer labels, the hidden DevTools breadcrumb, `why`, `versus`, section `12`, section `17`, threshold, FAQ, and direct-correspondence copy were rewritten to remove interface self-commentary and return to first-order claims.
- Verification:
  - `npm run build` passed on 2026-04-28.
  - Playwright browser checks on `http://127.0.0.1:5113/` confirmed:
    - hero H1 + tagline + CTA labels
    - section `17` heading/body/node labels
    - lineage section heading + eight-card contributor list + caption link
    - direct-correspondence heading + lede
  - Captures saved under `.artifacts/source-credit-pass/`:
    - `home-desktop-full.png`
    - `hero-desktop.png`
    - `section-17-desktop.png`
    - `lineage-desktop.png`
    - `signal-desktop.png`
  - Browser console: `0` errors, `2` pre-existing warnings from `model-viewer` / Lit dev-mode behavior.

## 2026-04-28 Playlist Marquee Flare

### Plan
- [x] Inspect the frame/hero structure and current motion system to find a clean placement for a vertical playlist flare.
- [x] Add a Spotify playlist marquee element in `index.html` with direct outbound link copy.
- [x] Style the marquee in `css/sections.css` as a fixed vertical side-channel with authored motion, not a generic badge.
- [x] Respect reduced motion and mobile constraints so the flare does not compete with the hero or break smaller layouts.
- [x] Build and visually verify the new element, then document the result.

### Review
- Added a new fixed right-edge playlist rail linking to the supplied Spotify playlist. The copy is split into a vertical marquee phrase: `vibe coded / while listening / to this playlist`.
- Placement choice: outside the hero copy stack and inside the page chrome layer, so it reads as an atmospheric side-channel rather than another CTA competing with the hero buttons.
- Motion choice: CSS-only vertical marquee loop with no new JavaScript.
- Constraint handling:
  - reduced motion disables the marquee animation
  - the rail is hidden at `<=1023px` to protect the tighter hero/mobile composition
- Verification:
  - `npm run build` passed on 2026-04-28
  - desktop render captured with local Chrome headless at `1440x2200`: `.artifacts/playlist-marquee-pass/desktop-1440.png`
  - narrow viewport check captured in the in-app browser: `.artifacts/playlist-marquee-pass/viewport-with-rail.png`
  - result: rail is visible and balanced on desktop; it drops out cleanly on the narrow in-app viewport

## 2026-04-28 Playlist Rail Redesign

### Plan
- [x] Pull the real public Spotify metadata for the playlist title, owner, track list, and visible artist names.
- [x] Replace the lightweight rail markup with a denser module: title treatment, metadata pills, animated vertical track marquee, and artist tags.
- [x] Move the rail animation from CSS-only scrolling into a dedicated GSAP module.
- [x] Rebuild and visually verify the redesigned rail on desktop and a narrow viewport, then document the result.

### Review
- Replaced the low-information rail with a full playlist module using the public Spotify embed metadata for:
  - playlist title: `begin_journey`
  - curator: `Mage Narayan`
  - visible artist roster and track titles
- The rail now contains:
  - vertical `vibe coded to` spine label
  - typographic title treatment for `begin / journey`
  - metadata pills
  - vertical marquee of real track-title / artist pairs
  - artist tags drawn from the public roster (`Bluetech`, `Shaman's Dream`, `Sensient`, `Plastikman`, `Richie Hawtin`, `Steve Moore`)
  - stronger CTA styling
- Motion system upgrade:
  - removed the CSS-only loop
  - added `js/sections-special/playlistRail.js`
  - GSAP now handles intro reveal, floating drift, halo pulse, marquee travel, and hover acceleration/state changes
- Constraint handling remains intact:
  - rail hides below `1024px`
  - reduced motion disables the animated behavior by exiting before marquee/tween setup
- Verification:
  - `npm run build` passed on 2026-04-28
  - desktop render captured with local Chrome headless at `1440x2200`: `.artifacts/playlist-rail-redesign/desktop-1440.png`
  - narrow viewport check captured in the in-app browser: `.artifacts/playlist-rail-redesign/narrow-viewport.png`
  - result: desktop rail now reads as a deliberate visual module; narrow viewport still stays clean without the rail

## 2026-04-29 Poster Reveal Sizing Pass

### Plan
- [x] Inspect the scroll-expand implementation, current open-state sizing rules, and section layout constraints.
- [x] Audit the actual poster assets to confirm their native dimensions and aspect ratio.
- [x] Replace the generic reveal sizing with poster-native aspect ratios and viewport-aware max sizes.
- [x] Map the final open-state sizes across the existing breakpoints so mobile sections can finish their reveal before the next section enters.
- [x] Verify with build plus browser measurements/screenshots at desktop, tablet, and mobile widths.

### Review
- Investigation finding:
  - all 16 FAL engine posters are `768×1024` (`3:4` portrait)
  - current reveal CSS forces them into `16/9` containers and paints them with `background-size: cover`
  - that guarantees destructive cropping, especially on mobile, before the section completes its scroll cycle
- Implementation result:
  - the reveal system now uses the native poster ratio in the open state
  - final reveal cards are capped by both viewport width and viewport height
  - view-type defaults are now only the base layer; mobile, tablet (`768–847px`), and desktop all have section-level poster caps where the composition needs it
  - larger anchor reveals are intentionally biased toward `03`, `08`, and `15`
  - tighter pauses are intentionally biased toward `04`, `09`, `11`, and `16`
- Representative final poster sizes after section tuning:
  - `03 / Tarot`: `360×480` on `430px`, `392×523` on `768px`, `432×576` on `1440px`
  - `08 / I Ching`: `361×482` on `430px`, `392×523` on `768px`, `432×576` on `1440px`
  - `09 / Enneagram`: `276×368` on `430px`, `276×368` on `768px`, `243×324` on `1440px`
  - `15 / Biofield`: `348×464` on `430px`, `372×496` on `768px`, `336×448` on `1440px`
  - `16 / Face Reading`: `264×352` on `430px`, `276×368` on `768px`, `284×378` on `1440px`
- Reference:
  - `tasks/poster-sizing-map.md`
- Verification:
  - `npm run build` passed on 2026-04-29
  - measured clean static open-state clones at `430×932`, `768×1024`, and `1440×900`
  - clean-clone verification strips transient GSAP Flip inline styles before measuring, otherwise full-width sections report false `0×0` poster sizes
  - visual artifacts captured in `.artifacts/poster-sizing-pass/`
  - note: the Flip end-state is still captured at page init, so breakpoint changes after load are best treated as a separate follow-up if we want rotation/resize-perfect behavior

## 2026-04-29 Playlist Rail Collapse Pass

### Plan
- [x] Inspect the existing playlist rail markup, animation hooks, and the provided reference state to confirm the intended closed/open interaction.
- [x] Restructure the rail so it has a compact default footprint and an explicit click target that expands into the current richer panel.
- [x] Update the rail motion and interaction logic to support expand, collapse, and reduced-motion-safe behavior without breaking the outbound Spotify link.
- [x] Build and visually verify the rail in its collapsed and expanded states, then document the result.

### Review
- Implementation result:
  - replaced the always-open playlist anchor with a `details/summary` rail shell that defaults to a slim vertical tab
  - kept the richer playlist card as the expanded state, with the outbound Spotify link still living on the open panel
  - added close affordances beyond a second click: outside-click dismissal and `Escape`
- Motion/result details:
  - the collapsed rail now gets its own intro reveal and keeps the existing floating drift
  - marquee, halo pulse, CTA arrow motion, and the dense content reveal only spin up once the rail is actually opened
  - reduced motion still preserves the interaction, but skips the GSAP-driven flourish
- Verification:
  - `npm run build` passed on 2026-04-29
  - live Chrome check on `http://127.0.0.1:5113/` confirmed the default collapsed tab, click-to-expand behavior, and retained Spotify link in the open state

## 2026-04-29 Brand Mark + Reveal Lifecycle Pass

### Plan
- [x] Inspect the provided gold/white logo packs, current footer markup, favicon links, and current Flip effect lifecycle.
- [x] Import the selected logo pack assets into `public/` and replace the footer glyph with the generated 3D mark.
- [x] Update favicon, touch icon, and manifest references to the selected favicon pack.
- [x] Rebuild the reveal effect lifecycle so breakpoint/orientation changes recreate the Flip states instead of stretching the original load-time geometry.
- [x] Verify in the browser plus production build, then document the result and any new regression rules.

### Review
- Correction:
  - the previous pass misused the provided gold/white image packs as general brand assets
  - footer brand now uses the generated GLB mark instead
  - the provided gold/white image packs are now limited to light/dark favicon duties only
- Implementation result:
  - replaced the placeholder footer glyph and interim static image with a framed `model-viewer` instance using `/models/sigil-foil-hero.glb`
  - tuned the footer viewer to a fixed, flattering 3D orbit so the mark does not spin into an unreadable edge
  - reduced favicon wiring to a gold fallback `.ico` plus theme-specific light/dark PNG favicons
  - expand-image reveals now rebuild after resize/orientation changes by killing section-scoped ScrollTriggers, clearing transient Flip inline state, and re-instantiating the effects against the new viewport geometry
- Verification:
  - `npm run build` passed on 2026-04-29
  - browser check confirmed the corrected GLB footer render:
    - `.artifacts/brand-pass/footer-glb-desktop-corrected-v2.png`
  - live head verification confirmed the favicon set is now limited to:
    - `/favicon.ico`
    - `/favicon-light-32x32.png`, `/favicon-light-16x16.png`
    - `/favicon-dark-32x32.png`, `/favicon-dark-16x16.png`
  - resize-without-reload verification confirmed the reveal geometry actually rebinds:
    - desktop `1440px`: `08` `432×576`, `09` `243×324`, `15` `336×448`
    - mobile `430px`: `08` `361×482`, `09` `276×368`, `15` `348×464`
    - return to desktop `1440px`: `08` `432×576`, `09` `243×324`, `15` `336×448`

## 2026-04-29 Reveal Copy Readability Pass

### Plan
- [x] Inspect the reveal paragraph base color and the scroll-fade targets together.
- [x] Replace the hard-coded paragraph fade floor with responsive section-level tokens.
- [x] Verify the paragraph readability on mobile and desktop while the reveal effects are active.
- [x] Run a production build and record the regression rule in `tasks/lessons.md`.

### Review
- Investigation finding:
  - every reveal effect class was hard-coding the body paragraph fade target to `opacity: 0.2`
  - on this dark background, that effectively erased the paragraphs during the active scroll window, especially on mobile
  - the base paragraph ink was also slightly too muted to survive such a low fade floor
- Implementation result:
  - moved the fade floor into a reusable effect config helper instead of repeating `0.2` across five effect classes
  - added responsive reveal paragraph tokens on `.content`:
    - desktop fade floor `0.82`
    - tablet fade floor `0.88`
    - mobile fade floor `0.92`
  - brightened reveal paragraph ink from the shared muted-silver token to a dedicated reveal-copy tone
- Verification:
  - browser check at `430px` confirmed active reveal paragraphs at `opacity: 0.92` with color `rgb(179, 192, 202)`
  - browser check at `1440px` confirmed reveal paragraph ink stays visibly present during scroll instead of collapsing toward invisibility
  - visual artifacts:
    - `.artifacts/readability-pass/section-08-mobile-readable.png`
    - `.artifacts/readability-pass/section-03-desktop-readable.png`

## 2026-04-29 Final Editorial Copy Pass

### Plan
- [x] Audit the remaining live metadata, CTA labels, footer/source labels, and channel-status language against the Noesis voice contract.
- [x] Rewrite the canonical copy in `copy/sections.md` first so hero, threshold, lineage, FAQ, and channel copy all use the same register.
- [x] Sync the approved copy into `index.html` and `tasks/seo-brief.md`, including the stale JSON-LD image path.
- [x] Verify the revised copy in-browser and with a production build, then record the result and any new regression rule.

### Review
- Editorial result:
  - replaced the stale metadata set with a direct self-consciousness description and synchronized title/OG/Twitter variants
  - corrected the stale JSON-LD image path from the removed Android icon to the live OG image
  - rewrote the hero CTA pair so both buttons name the actual destination they open: `Read the canticle` and `Inspect the engines`
  - tightened the lower-page CTA language so threshold, FAQ, lineage, and channel-status copy use factual labels instead of generic route language
  - reframed the lineage section from implied authorship to structural sources so it matches the actual credit object on the page
- Verification:
  - `npm run build` passed on `2026-04-29`
  - live Playwright review on `http://127.0.0.1:5113/` confirmed the updated title, hero copy, threshold CTA labels, lineage heading, and channel-status block
  - review artifacts:
    - `.artifacts/final-copy-pass/desktop-hero.png`
    - `.artifacts/final-copy-pass/mobile-hero.png`
    - `.artifacts/final-copy-pass/desktop-full.png`
    - `.artifacts/final-copy-pass/mobile-full.png`

## 2026-04-29 Access CTA + 404 Pass

### Plan
- [x] Audit which current CTA surfaces imply a finished agent interaction flow that does not exist yet.
- [x] Reframe the header and hero CTAs so the primary path speaks honestly about agent-access status instead of pointing at unrelated public reading surfaces.
- [x] Add a branded `404.html` using existing shipped assets so the site has a coherent fallback state without requiring new generated artwork.
- [x] Verify the updated CTAs and 404 page in-browser and with a production build, then document whether any new visual-generation work is still actually needed.

### Review
- Investigation result:
  - the requested Higgsfield MCP surface is not available in this session, so no direct Higgsfield generation could be run from here
  - the actual gap was not missing OG artwork; `/og-image.png` is already adequate and wired
  - the real mismatch was UX truthfulness: the Witness Agents page was still pushing the canticle as the primary CTA even though the unfinished part is the agent-access flow itself
- Implementation result:
  - changed the header CTA from `Read the canticle` to `Agent access status`, targeting `#signal`
  - changed the hero primary CTA from `Read the canticle` to `Track agent access`, also targeting `#signal`
  - kept `Inspect the engines` as the secondary hero action because that surface is actually live
  - expanded the channel-status panel to state the missing frontend interaction flow explicitly
  - added `public/404.html` as a branded fallback page using the existing hero background and sigil preview assets
- Asset decision:
  - no new OG or 404-specific generated asset is required right now
  - the 404 surface is visually coherent with shipped assets, so generation can wait until there is a stronger art-direction need
  - generated asset usage is now explicitly accounted for in `tasks/asset-utilization.md`
  - all 16 FAL engine posters are live
  - retained Meshy/FAL source variants are documented as intentional non-live assets rather than forgotten files
- Verification:
  - `npm run build` passed on `2026-04-29`
  - `http://127.0.0.1:5113/404.html` returned `200`
  - live Playwright review confirmed:
    - hero CTA state on desktop and mobile
    - explicit `Agent access UI` note in the channel-status section
    - branded desktop and mobile 404 surfaces
  - review artifacts:
    - `.artifacts/access-404-pass/desktop-hero-access.png`
    - `.artifacts/access-404-pass/mobile-hero-access-corrected.png`
    - `.artifacts/access-404-pass/404-desktop.png`
    - `.artifacts/access-404-pass/404-mobile.png`

## 2026-04-29 Witness Agents Access Flow

### Plan
- [x] Audit the current CTA surfaces, status section, and JS boot path to determine where a real frontend access flow can live without inventing a backend.
- [x] Inspect the live Raycast extension and Selemene / Daily Witness surfaces so the new flow is grounded in what already works.
- [x] Replace the static channel-status block with a real access surface: live Daily Witness in-browser, Raycast field console entry, and Selemene Direct entry.
- [x] Wire the header CTA, hero primary CTA, and threshold/supporting actions into that real access surface instead of generic status copy.
- [x] Allow the page to call `https://48.tryambakam.space/reading` directly, render the returned witness reading, and keep the copy honest about what still remains pending.
- [x] Verify the flow on desktop and mobile, then document any remaining backend gaps separately from the frontend interaction now being live.

### Review
- Architecture result:
  - the Witness Agents page now points at the real system instead of a placeholder status panel
  - the browser route is `48.tryambakam.space/reading`
  - the native operator route is the Raycast extension in `/Users/sheshnarayaniyer/raycast-extensions/noesis/`
  - the engine-contract route is `https://selemene.tryambakam.space`
- Implementation result:
  - replaced the old `Agent access status` / `Track agent access` placeholder framing with a real `Live Entry` workspace
  - added a tabbed surface for `Daily Witness`, `Raycast Console`, and `Selemene Direct`
  - added a browser form that POSTs directly to `https://48.tryambakam.space/reading`, persists recent inputs in `localStorage`, and renders the returned headline, stats, data points, and engine list
  - updated the header CTA, hero primary CTA, and threshold route CTA to drive into the live witness flow
  - updated CSP in `public/_headers` so production can reach `48.tryambakam.space`
  - kept pending channels explicit: direct mail, subscription intake, and `hello@tryambakam.space`
- Verification:
  - `curl https://48.tryambakam.space` confirmed the public contract: `The Daily Witness`, 4 engines, 3 layers, public docs/repo links
  - `curl -X POST https://48.tryambakam.space/reading ...` returned a live reading payload with `reading`, `next_reading_available`, and `full_platform_url`
  - `npm run build` passed on `2026-04-29`
  - live browser verification in Chrome confirmed:
    - desktop: `Run Daily Witness` CTA opens the live-entry section
    - desktop: valid birth date submission returns a reading from `48.tryambakam.space`
    - desktop: `Raycast Console` and `Selemene Direct` tabs switch correctly and show the right route details
  - mobile verification at `430x932` confirmed:
    - the live-entry stack is readable
    - the form holds the smaller breakpoint
    - tab state is now styled from `aria-selected`, preventing false-active visual states
- Review artifacts:
  - `.artifacts/witness-access-pass/signal-mobile-anchored.png`
  - `.artifacts/witness-access-pass/signal-mobile-fixed.png`

## 2026-04-29 Live Copy De-Meta Pass

### Plan
- [x] Remove implementation-status commentary from the live-entry copy.
- [x] Replace backlog-oriented FAQ and support copy with route guidance.
- [x] Sync the same wording into `copy/sections.md` so the old phrasing does not return.

### Review
- Replaced the live-entry small note with direct route guidance.
- Rewrote FAQ `Q.02` around route choice instead of `open now / pending`.
- Removed the issue-log support line from the live page and replaced it with forward navigation into Selemene and the open record.
- Replaced the footer `Implementation Issues` source link with the public `Witness Agents` repo.

## 2026-04-29 Raycast Repo Link Pass

### Plan
- [x] Verify the actual public GitHub repo for the Raycast extension under `Sheshiyer`.
- [x] Update the Raycast route copy so the public action is installation/use from GitHub, not generic inspection language.
- [x] Update the footer source link so the public Raycast repo is visible there too.

### Review
- Verified the public repo via GitHub API: `Sheshiyer/noesis`
- Verified both live URLs respond:
  - `https://github.com/Sheshiyer/noesis`
  - `https://github.com/Sheshiyer/noesis/blob/main/QUICKSTART.md`
- Reframed the Raycast panel around the real public install path:
  - primary CTA is now `Install from GitHub`
  - secondary CTA is now `Read setup guide`
  - panel copy now names onboarding, local SQLite cache, execution flows, Daily Witness, and the pulse menu bar
- Replaced the footer source repo from `Witness Agents` to `Noesis Raycast` for stronger public route clarity.
