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
