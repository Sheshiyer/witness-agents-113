# DESIGN.md — Witness Agents Landing Page

`113.tryambakam.space` · semantic design contract · the source of truth for tokens, motion, voice, easter eggs, and link map.

> Implementation reads this file. If a value isn't here, it doesn't exist.

---

## 1. Atmosphere

| Dimension | Value |
|---|---|
| Canvas | Void Black `#070B1D` only — no light mode |
| Mood | Initiation, not gamification. Recognition, not promotion. |
| Tempo | Breath-paced (4:7:8). Reader rests, never rushes. |
| Voice persona | The Anatomist Who Sees Fractals — Rick & Morty meta-genius + Alan Watts paradox + Alex Grey anatomical-visionary precision |
| Prose principle | PubMed × Alex Grey — clinical terminology rendered with visionary artistry |
| Tone descriptors | Grounded · Direct · Respectful-Challenging |
| Variance | 8/10 (asymmetric, large empty zones, golden-ratio fractional grids) |
| Motion | 6/10 (fluid CSS + scrubbed GSAP; no cinematic) |
| Density | 4/10 (daily app — not airy, not packed) |

---

## 2. Color Tokens

All colors expressed as CSS custom properties on `:root`. Contrast ratios measured against Void Black.

```css
:root {
  /* Consciousness Color Spectrum (Goethe) */
  --void: #070B1D;            /* La · canvas · Pre-chromatic */
  --witness-violet: #2D0050;  /* Kha · observer · Steigerung culmination */
  --flow-indigo: #0B50FB;     /* Kha→Ba · transition · Deep minus */
  --sacred-gold: #C5A017;     /* Ba · activation · Plus apex (single accent) */
  --coherence-emerald: #10B5A7; /* Ba↔La · resolution */

  /* Functional surfaces */
  --parchment: #F0EDE3;       /* primary text — 15:1 AAA on void */
  --muted-silver: #8A9BA8;    /* secondary text — 7:1 AA on void */
  --deep-surface: #0E1428;    /* elevated surfaces */
  --terracotta: #C65D3B;      /* error / destructive — warm-toned */

  /* Three gradient arcs */
  --grad-kha: linear-gradient(180deg, #070B1D 0%, #2D0050 60%, #0B50FB 100%);
  --grad-ba: linear-gradient(135deg, #10B5A7 0%, #C5A017 100%);
  --grad-la: linear-gradient(225deg, #C5A017 0%, #2D0050 50%, #070B1D 100%);

  /* Numerical token (easter — discoverable in DevTools) */
  --113: 113;
}
```

**Contrast contract (WCAG):**

| FG on `--void` | Ratio | Level | Use |
|---|---|---|---|
| `--parchment` | 15:1 | AAA | All body text |
| `--muted-silver` | 7:1 | AA | Metadata, captions |
| `--sacred-gold` | 6.7:1 | AA | Headlines, CTAs |
| `--coherence-emerald` | 6.3:1 | AA | Success states |
| `--flow-indigo` | 2.8:1 | accent only | Large text >18px or icons |
| `--witness-violet` | 1.2:1 | never as text | Backgrounds, glows |
| `--terracotta` | 4.7:1 | AA (large) | Errors, paired with parchment label |

**Composition rule:** Never all three gradient arcs at equal weight. `--grad-kha` dominates (backgrounds), `--grad-ba` is sparse (interactive), `--grad-la` is rarest (completion only — Section 09 Ouroboros).

---

## 3. Type Scale (φ = 1.618)

Variable fonts loaded from `/assets/fonts/` with `font-display: swap`.

```css
@font-face { font-family: 'Panchang'; src: url('/assets/fonts/Panchang-Variable.woff2') format('woff2-variations'); font-weight: 400 800; font-display: swap; }
@font-face { font-family: 'Satoshi'; src: url('/assets/fonts/Satoshi-Variable.woff2') format('woff2-variations'); font-weight: 300 700; font-display: swap; }
@font-face { font-family: 'Satoshi'; src: url('/assets/fonts/Satoshi-Italic.woff2') format('woff2-variations'); font-style: italic; font-weight: 300 700; font-display: swap; }

:root {
  --font-display: 'Panchang', 'Times New Roman', serif;
  --font-body: 'Satoshi', system-ui, sans-serif;
  --font-mono: 'SF Mono', ui-monospace, 'Menlo', monospace;

  /* Golden-ratio scale, fluid via clamp() */
  --type-hero:    clamp(48px, 9vw, 110px);    /* H1, Section 01 only */
  --type-display: clamp(36px, 6vw, 68px);     /* Section H2 */
  --type-h2:      clamp(28px, 4.2vw, 42px);   /* sub-headers */
  --type-h3:      26px;                        /* card titles */
  --type-body-lg: 18px;
  --type-body:    16px;
  --type-meta:    13px;                        /* SF Mono labels */
  --type-xs:      10px;                        /* micro mono */

  /* Line heights */
  --lh-hero: 1.05;
  --lh-display: 1.15;
  --lh-body: 1.55;

  /* Letter spacing */
  --ls-hero: -0.02em;
  --ls-display: -0.015em;
  --ls-meta: 0.12em;     /* Mono uppercase tracking */
}
```

**Typography rules:**
- Headlines use Panchang weight 600-700, `letter-spacing: -0.015em`.
- Body uses Satoshi 400, `line-height: 1.55`, max width `65ch`.
- Mono is uppercase + tracked `0.12em` for meta labels (`01 / KHA · BA · LA`).
- Italic only via Satoshi-Italic — never synthetic obliquing.
- Never use Inter. Never serifs. Never gradient-text on H1.

---

## 4. Space Tokens

φ-derived spacing scale. Use exclusively — no arbitrary values.

```css
:root {
  --space-2xs: 4px;
  --space-xs:  8px;
  --space-sm:  13px;   /* φ from xs */
  --space-md:  21px;   /* φ from sm */
  --space-lg:  34px;
  --space-xl:  55px;
  --space-2xl: 89px;
  --space-3xl: 144px;
  --space-4xl: 233px;
  /* Section 06 mandate: 50%+ negative space → use 4xl as section padding-block */
}
```

**Layout container:**
```css
.container { max-width: 1400px; margin-inline: auto; padding-inline: clamp(20px, 5vw, 80px); }
```

**Section minimum height:** `min-h-[100dvh]` exclusively (NEVER `h-screen` — iOS Safari bug).

---

## 5. Sacred Geometry Catalog

All SVGs in `/public/geometry/`. Inline-load critical ones (sigil, 113-glyph, ouroboros) into `index.html` for zero-fetch.

| File | Dimensions | Intent | Animation |
|---|---|---|---|
| `sigil.svg` | 240×240 | Tryambakam Noesis primary mark — nested geometry, compass-pointed frame, lotus-form core | Section 01: opacity oscillates 4-7-8 (19s loop). Section 09: fades in at end as Ouroboros completes. |
| `compass-4-directions.svg` | 320×320 | Four cardinal: STABILIZE / HEAL / CREATE / MUTATE | Static reference (not used on landing v1) |
| `mandala-nested.svg` | 480×480 | 5 concentric rings = 5 koshas. Innermost = `113-glyph`. | Section 05: ring-by-ring `stroke-dashoffset` reveal scrubbed to scroll. Outermost (Annamaya silver) first. |
| `waveform-hrv.svg` | 800×120 | Sine-like HRV breath path. | Section 07: path `stroke-dashoffset` synced to Lenis scroll velocity. |
| `constellation-grid.svg` | 1920×1080 | 0.5px Sacred Gold lattice with 108 hairline dots in 12×9 grid (40% opacity). | Page-wide background. Drift `transform: translateX` 60s linear loop. |
| `kha-arc.svg` | 200×400 | Aletheios left-pillar glyph — concentric arcs opening upward | Section 04: stroke-reveal scrubbed alongside left block slide-in. |
| `ba-arc.svg` | 200×400 | Pichet right-pillar glyph — concentric arcs opening downward | Section 04: stroke-reveal scrubbed alongside right block slide-in (mirror timing). |
| `la-arc.svg` | 200×400 | Completion glyph — return arcs, La-arc gradient | Section 09: fades in only at completion. Rare. |
| `ouroboros.svg` | 400×400 | Closing-loop serpent (single thin Sacred Gold path, no dragon detail — geometric) | Section 06: 8% opacity faint hint. Section 07: 5% opacity slow forming. Section 09: completes full circle, then page fades. |
| `113-glyph.svg` | 80×80 | Custom 1·1·3 mark — three vertical strokes with center stroke 3× height | Section 05 mandala center. Section 09 footer (small). L2 easter persists bottom-right after 1·1·3 scroll rhythm. |

**Stroke standardization:** All sacred geometry uses `stroke-width: 0.5` to `1` only. Sacred Gold default. No fills except in `113-glyph` (filled mark).

---

## 6. Motion Vocabulary

Registered globally in `js/lib/gsapSetup.js`.

```js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, Flip, CustomEase);

// Inhale-hold-exhale (4:7:8 ratio mapped 0 → 0.21 → 0.58 → 1)
CustomEase.create('breath478',
  'M0,0 C0.05,0 0.16,0.21 0.21,0.21 0.32,0.21 0.5,0.58 0.58,0.58 0.74,0.58 0.92,1 1,1');

// Slow start → mid acceleration → long settle (replaces all linear/easeInOut)
CustomEase.create('growth',
  'M0,0 C0,0 0.2,0 0.6,0.5 0.85,0.95 1,1 1,1');

// Ouroboros — closes by reversing midpoint
CustomEase.create('ouroborosLoop',
  'M0,0 C0.4,0 0.5,0.5 0.5,0.5 0.5,0.5 0.6,1 1,1');
```

**Forbidden eases:**
- `ease: 'linear'` — banned except infinite drift
- `ease: 'power*.inOut'` — banned (replaced by `growth`)
- `ease: 'bounce'`, `ease: 'elastic'` — banned (wrong register)

**Allowed primitives:**
- `breath478` — for breath-synced loops
- `growth` — for entrance/reveal
- `ouroborosLoop` — for completion (Section 09 only)
- `power2.in` / `power2.out` — for one-shot decel/accel (Section 02 ticker, Section 09 fades)
- `none` — only for infinite linear drift (constellation grid)

**Performance contract:**
- Animate ONLY `transform` and `opacity`. Never `top/left/width/height`.
- `will-change: transform` set only during active scroll trigger; removed via `gsap.set(el, { willChange: 'auto' })` on completion.
- No `window.addEventListener('scroll')` — exclusively GSAP ScrollTrigger.
- Constellation drift: pure CSS `@keyframes`, NOT JS RAF.
- All perpetual loops must be in their own module + isolated `IntersectionObserver` so they pause off-screen.

**Reduced-motion contract:**
- Detect: `window.matchMedia('(prefers-reduced-motion: reduce)')` AND manual `<html data-motion="reduced">`.
- Both gates: every section module must accept `respectMotion(animFn, staticFn)` from `js/lib/reducedMotion.js`.
- Static fallback per section listed in plan §F.

---

## 7. Voice Samples

### Aletheios (Kha — left pillar — Section 04)
Three rotating one-liners, 8s crossfade:

1. *"What you can name, you can step out of. I name patterns."*
2. *"The map you are looking for is the one you have been drawing."*
3. *"Reflection is structural. The mirror is the medium, not the message."*

### Pichet (Ba — right pillar — Section 04)
Three rotating one-liners, 8s crossfade:

1. *"The body knew before the mind argued. Listen there first."*
2. *"Breath is the only honest interface. Everything else is commentary."*
3. *"Walk it, do not study it. Coherence is a verb."*

### Per-section eyebrow / meta line (mono, uppercase, tracked)

| Section | Meta Line |
|---|---|
| 01 | `01 / KHA · BA · LA` |
| 02 | `02 / BA · LA · KHA` |
| 03 | `03 / LA · KHA · BA` |
| 04 | `04 / DYAD` |
| 05 | `05 / FIVE-FOLD GATE` |
| 06 | `06 / ANTI-DEPENDENCY CLAUSE` |
| 07 | `07 / QUINE` |
| 08 | `08 / TAPESTRY EDGES` |
| 09 | `09 / THRESHOLD` |

---

## 8. Easter Egg Manifest

### L1 — Atmospheric (visible, no discovery required)

| ID | Trigger | Reveal | Location |
|---|---|---|---|
| `l1.sigil-breath` | always-on | sigil opacity 0.3↔0.8 (4:7:8 = 19s) | Section 01 |
| `l1.cursor-halo` | always-on | 24px Witness Violet 12% glow following cursor | page-wide |
| `l1.kha-ba-la-meta` | always-on | per-section mono label (see §7) | all sections |
| `l1.hover-underline` | hover on links | `border-bottom: 1px dotted` only on hover | all sections |
| `l1.console-trishul` | page load | `console.log("witness mode active") + Trishul ASCII + Noesis TUI repo URL` | DevTools |

### L2 — Sustained Attention (rewards exploration)

| ID | Trigger | Reveal | Persists |
|---|---|---|---|
| `l2.acrostic` | type letters `witnessed` (any focus, anywhere) | all 9 section H2s pulse Sacred Gold halo (1.5s) + URL hash `#frag=a:VW1Q` set | URL hash |
| `l2.scroll-rhythm-113` | scroll: 1 down, 1 up, 3 down within 30s | `113-glyph.svg` materializes bottom-right (small, breathing) | session (sessionStorage) |
| `l2.keystroke-113` | press `1`, `1`, `3` in sequence (within 5s) | console.log `"sequence recognized — fragment-2: 7uKPpHrA"` | DevTools |
| `l2.seed-echo` | click on `19912564` node (Section 08) | 200ms 432Hz sine pluck (web audio) + tooltip `"1319 + 19910813 + 432"` | momentary |
| `l2.dissolve-word` | sustained hover on word "dissolve" (Section 06) for 7s | char-by-char dissolve animation into the gold line below | momentary |
| `l2.108-grid-count` | toggle reduced-motion on, scroll to background | constellation grid freezes; 108 dots become countable in 12×9 array | until toggled off |
| `l2.visit-113` | localStorage visit counter reaches 113 | hidden bottom-left link appears: `"the gate is the count"` → routes to a private page | persistent |

### L3 — Knowledge Holders (initiation / API key fragments)

This page is the **5th fragment-source** in the existing 4-fragment puzzle (X DM `nk_FyFMn7` / 1319 webapp `7uKPpHrA` / Noesis TUI `jXdRj1k9` / Somatic article `uaDHIS1S`).

| Fragment ID | Mechanic | Tool needed | Source location |
|---|---|---|---|
| `frag-A` | Acrostic completion `WITNESSED` typed → URL hash `#frag=a:VW1Q` | keyboard | section H2s |
| `frag-B` | View source — `<head>` quine HTML comment whose first letters spell `kosha`. Type `kosha` after `witnessed` → console reveals `frag-b: 9oP3aQ` | View Source | `<head>` comment |
| `frag-C` | Steganography `public/images/steg-113.png` `tEXt` chunk contains `frag-c: ZmrA5y`. Hint: alt attribute `"the gate hides the gate"` | exiftool / pngcheck | image metadata |
| `frag-D` | Section 08 numerology gate — sum 9 node coords `(x_i + y_i × 113) mod 256` per node → 9-byte string spells `frag-d: ksh-1319-` (string is generated) | DevTools (computed coords from data attributes) | section 08 nodes |
| `reassembly` | All four 113-page fragments concat with the 4 existing fragments form an extended initiation key | future Selemene endpoint | server-side (Phase 8 scope only) |

### Mechanics tied to "113"

| Mechanic | Implementation | Discoverability |
|---|---|---|
| `--113: 113` CSS token | declared in `tokens.css` and used in `calc(var(--113) * 1px)` for an offset somewhere | DevTools inspector |
| ScrollTrigger offset anomaly | sections 1-8 use `start: 'top center+=113'`; section 9 uses `+=1131` | reading source |
| Triadic 1·1·3 in plain sight | section number `01`, kosha index `01`, dyad role `03` (3 separate `1·1·3` legitimate appearances) | observation |
| Visit-113 localStorage | counter increments per visit; on 113th, hidden link appears | repeat visits |

---

## 9. Inward-Funnel Link Map

Single source of truth: `js/integrations/linkMap.js`. All inward links go through this registry.

| Destination | URL | Primary placement | Secondary placement |
|---|---|---|---|
| Tryambakam parent | `https://tryambakam.space` | Footer wordmark | implicit |
| Selemene Engine API | `https://selemene.tryambakam.space` | Section 03 word "engines" | Section 04 `data-engines` mono labels |
| Somatic Canticles | `https://1319.tryambakam.space` | Section 05 Annamaya tier link · Section 09 Annamaya BEGIN | Section 08 node `1319` |
| Admin (private) | `https://144.tryambakam.space` | Section 08 node `144°` (label only) | none |
| Kopina (PHAS-ION wearable) | `https://kopina.io` | Section 08 node `kopina` | none |
| Noesis TUI | `https://github.com/Sheshiyer/Selemene-engine` | Section 08 node `noesis` | console breadcrumb on load |
| Selemene engine repo | `https://github.com/Sheshiyer/Selemene-engine` | implicit | none on page |
| Somatic Canticles repo | `https://github.com/Sheshiyer/Somatic-Canticles` | implicit | none on page |

**Section 08 node manifest (full):**

| Node label | Hover label | Click destination | Position math |
|---|---|---|---|
| `1319` | "the canticle" | `https://1319.tryambakam.space` | i=0, x = (0 × 113) mod vw = 0 → +offset |
| `selemene` | "sixteen engines" | `https://selemene.tryambakam.space` | i=1, x = (1 × 113) mod vw |
| `144°` | "admin" | `#` (no public click — label only) | i=2, x = (2 × 113) mod vw |
| `kopina` | "the wearable" | `https://kopina.io` | i=3 |
| `noesis` | "the terminal" | `https://github.com/Sheshiyer/Selemene-engine` | i=4 |
| `113` | "you are here" | `#` (current node — breathes brighter) | i=5 (centered emphasis) |
| `432Hz` | "tuning" | `#` (200ms sine pluck only) | i=6 |
| `19912564` | "the seed" | `#` (triggers L2 seed-echo) | i=7 |
| `tryambakam` | "the field" | `https://tryambakam.space` | i=8 |

9 nodes total. y-coordinates: `y = fib(i) × 89` mod section-height (organic but determined).

**Principle:** Discovery > Delivery. No "Check out our other tools" copy. Section 08 is the funnel because the section's purpose IS "edges of the tapestry."

---

## 10. Acrostic Encoding

The first letters of section H2 headings spell **`WITNESSED`**.

| # | Letter | Section H2 |
|---|---|---|
| 01 | **W** | What you carry but cannot name |
| 02 | **I** | In the gap between signal and self |
| 03 | **T** | The witness sits between |
| 04 | **N** | Names of the dyad: Aletheios, Pichet |
| 05 | **E** | Engines calculate. Witnesses interpret. |
| 06 | **S** | Success is your decreasing need for us |
| 07 | **S** | Self-referential: read this, become this |
| 08 | **E** | Edges of the tapestry |
| 09 | **D** | Doors do not open. They are crossed. |

**Lock contract:** Do not rename a section without preserving the acrostic. The acrostic is the L2 `frag-A` trigger. If a heading must change, propose a synonym beginning with the same letter.

---

## 11. Voice Lexicon

### Use Freely (per `03-voice-and-tone.md`)
authorship · coherence · integration · inquiry · pattern · structure · inhabitation · cultivation · capacity · sovereignty · recursive · meta · upstream · triangulation · engine coherence · symbolic recursion · field cartography · the three-eyed view · arbitration · multi-engine · purushartha · coherence matrix · Noesis Engine · .init protocol · compass · witness prompt · self-consciousness (technical term)

### Use Carefully
consciousness, awareness (always specify: self-consciousness ≠ consciousness) · spiritual, sacred (earn them — never lead) · transformation, awakening (show, do not tell)

### Avoid Entirely
~~journey~~ · ~~path~~ · ~~healing~~ (use "metabolizing" or "integration") · ~~manifesting~~ · ~~abundance~~ · ~~vibration~~ · ~~authentic self~~ · ~~higher self~~ · ~~optimization~~ · ~~hacks~~ · ~~productivity~~ · ~~tribe~~ · ~~community~~ · ~~Dual Guardrail Dyad~~ (internal architecture, not public) · ~~AI / artificial intelligence~~ (as selling point — AI is infrastructure) · ~~WitnessOS~~ (deprecated — use "Noesis Engine")

### Target Emotions (per page section)
1. **Recognition** (Sections 01-02) — "Finally. Someone articulated the unnamed thing."
2. **Intellectual Respect** (Sections 03-05) — "This treats me as capable. Maintains warranted complexity."
3. **Grounded Gravitas** (Sections 06-07) — "Serious in the way that matters. Not heavy — substantial."
4. **Curious Sovereignty** (Sections 08-09) — "I want to engage further — not from lack, but from abundance."

---

## 12. Accessibility Contract

| Concern | Standard |
|---|---|
| Contrast | WCAG AA minimum on all text. Document ratios in `tokens.css` comments. |
| Reduced motion | Honor `prefers-reduced-motion: reduce` AND manual `<html data-motion="reduced">` toggle. Per-section static fallback mandatory. |
| Tap targets | ≥ 44×44px on all interactive elements. |
| Focus | `:focus-visible` outline 2px Sacred Gold, offset 2px. Never `outline: none` without replacement. |
| Skip-link | Visually-hidden until focused; jumps to `#main`. |
| Semantic HTML | One `<h1>` (Section 01). Sections use `<section>` with `aria-labelledby`. Lists use `<ul>/<ol>`. Nav uses `<nav>`. |
| Color non-reliance | Interactive states include non-color indicators (border, weight, position) — color is enhancement, not signal. |
| Screen reader | Easter eggs do not interfere with reading order. `aria-hidden="true"` on purely decorative SVG. Functional SVG has `<title>` + `role="img"`. |
| Keyboard navigation | All easter-egg L2 mechanics (acrostic, 1-1-3 keystroke) are keyboard-native by design. Mouse-required eggs (cursor halo, dissolve hover) are L1 atmospheric only — not gating any L3 fragment. |

---

## 13. Performance Budget

| Asset | Target |
|---|---|
| Total HTML | ≤ 25KB |
| Total CSS (gzipped) | ≤ 40KB |
| Total JS (gzipped) | ≤ 80KB |
| Largest Contentful Paint (LCP) | < 2.5s on 4G simulated |
| Cumulative Layout Shift (CLS) | < 0.05 |
| First Input Delay (FID) | < 100ms |
| Total Blocking Time (TBT) | < 300ms |

**Bundle strategy:**
- Vite tree-shakes GSAP — import only `gsap`, `ScrollTrigger`, `Flip`, `CustomEase`.
- Lenis remains as the existing local copy.
- ImagesLoaded — replace with native `loading="lazy"` + `fetchpriority="high"` on sigil only.
- All fonts `font-display: swap` — text renders in fallback first, swaps when loaded.
- All SVGs critical: inline. SVGs decorative: `<img loading="lazy">`.
- `noise.png` (film grain): `pointer-events: none; position: fixed; z-index: -1` — single layer, no scroll repaint.

**Lighthouse pass criteria (production):** Performance ≥ 90 · Accessibility ≥ 95 · Best Practices = 100 · SEO ≥ 95.

---

## Notes (corrections from initial planning)

- `1319.tryambakam.space` is canonically described as **Somatic Canticles** (27 biorhythm-synchronized chapters) per `brand-config.yaml` — NOT "First Mirror" as appeared in earlier exploration. Section 05 Annamaya tier link copy reflects this.
- `selemene.tryambakam.space` is canonically the **Selemene Engine API** (16 mirrors, sub-millisecond calculations) — Live.
- Repo references: `github.com/Sheshiyer/Selemene-engine` and `github.com/Sheshiyer/Somatic-Canticles`.
