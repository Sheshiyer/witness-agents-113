# Poster Reveal Sizing Map

## Native Asset Fact

- All 16 engine posters are `768 × 1024`
- Native aspect ratio: `3:4` portrait

## Why The Old System Broke

- The reveal container was hard-coded to `16:9`
- The poster surface used `background-size: cover`
- That combination guaranteed portrait cropping, especially on mobile
- A second verification trap existed too: GSAP Flip leaves transient inline width and height styles on the live reveal nodes, so naive DOM clones can report false `0×0` poster sizes for full-width sections

## Final Sizing Strategy

- Use the native poster ratio for reveal containers: `3 / 4`
- Use `background-size: contain` in the final open state so the full poster can be seen
- Keep view-type sizing as the baseline:
  - `content--left`
  - `content--center`
  - `content--right` / `type__expand--full`
- Layer section-level caps on top of that baseline in three bands:
  - mobile: `<= 767px`
  - tablet art-direction band: `768px – 847px`
  - desktop: `>= 848px`
- Compute the final usable poster width as:
  - `min(available inline space, max-inline cap, max-block cap × 0.75)`

## Verification Method

- Measure static open-state clones, not live scroll nodes
- Before measuring, strip transient GSAP Flip inline styles and `data-flip-id` attributes
- Preserve the intentional inline `background-image` style on `.type__expand-img-inner`
- Measure at the real breakpoint widths the site already uses:
  - `430 × 932`
  - `768 × 1024`
  - `1440 × 900`

## Section Intent Map

| Section | Poster | Intent | Mobile | Tablet | Desktop |
|---|---|---|---:|---:|---:|
| `01` | Sacred Geometry | steady opener | `300×400` | `348×464` | `297×396` |
| `02` | Sigil Forge | medium lift | `336×447` | `368×491` | `324×432` |
| `03` | Tarot | heroic anchor | `360×480` | `392×523` | `432×576` |
| `04` | Panchanga | tight pause | `276×368` | `288×384` | `284×378` |
| `05` | Biorhythm | medium interlude | `312×416` | `348×464` | `336×448` |
| `06` | Numerology | tight-medium | `294×392` | `312×416` | `284×378` |
| `07` | Human Design | large support | `336×447` | `368×491` | `390×520` |
| `08` | I Ching | heroic anchor | `361×482` | `392×523` | `432×576` |
| `09` | Enneagram | tight pause | `276×368` | `276×368` | `243×324` |
| `10` | Gene Keys | medium bridge | `294×392` | `312×416` | `296×395` |
| `11` | Nadabrahman | tight clause | `276×368` | `288×384` | `311×414` |
| `12` | Vedic Clock | medium bridge | `294×392` | `312×416` | `297×396` |
| `13` | Vimshottari Dasha | large support | `324×432` | `360×480` | `374×499` |
| `14` | Transits | medium interlude | `288×384` | `300×400` | `324×432` |
| `15` | Biofield | large soma anchor | `348×464` | `372×496` | `336×448` |
| `16` | Face Reading | tight close | `264×352` | `276×368` | `284×378` |

## Interpretation

- `03` and `08` are the largest reveals because they are the clearest narrative hinges in the sequence
- `15` stays enlarged on small screens where the soma-field turn needs more weight, but remains restrained on desktop so the left-column copy does not lose authority
- `04`, `09`, `11`, and `16` stay intentionally tighter so the sequence has contraction points instead of reading as sixteen equally loud posters
- The tablet band now has its own section-level tuning; it no longer falls back to generic view-type caps

## Files Driving The Behavior

- CSS sizing system:
  - `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/witness-agents-intro-web/css/sections.css`
- Reveal effects that consume the open-state geometry:
  - `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/witness-agents-intro-web/js/effects/effect-1.js`
  - `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/witness-agents-intro-web/js/effects/effect-2.js`
  - `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/witness-agents-intro-web/js/effects/effect-3.js`
  - `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/witness-agents-intro-web/js/effects/effect-4.js`
  - `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/witness-agents-intro-web/js/effects/effect-5.js`
- Measurement artifacts:
  - `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/witness-agents-intro-web/.artifacts/poster-art-direction/mobile-section-measures-v5-clean.json`
  - `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/witness-agents-intro-web/.artifacts/poster-art-direction/tablet-section-measures-v4-clean.json`
  - `/Volumes/madara/2026/twc-vault/01-Projects/tryambakam-noesis/witness-agents-intro-web/.artifacts/poster-art-direction/desktop-section-measures-v3-clean.json`
