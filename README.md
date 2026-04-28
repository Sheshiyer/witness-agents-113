<div align="center">

```
██╗    ██╗██╗████████╗███╗   ██╗███████╗███████╗███████╗███████╗██████╗
██║    ██║██║╚══██╔══╝████╗  ██║██╔════╝██╔════╝██╔════╝██╔════╝██╔══██╗
██║ █╗ ██║██║   ██║   ██╔██╗ ██║█████╗  ███████╗███████╗█████╗  ██║  ██║
██║███╗██║██║   ██║   ██║╚██╗██║██╔══╝  ╚════██║╚════██║██╔══╝  ██║  ██║
╚███╔███╔╝██║   ██║   ██║ ╚████║███████╗███████║███████║███████╗██████╔╝
 ╚══╝╚══╝ ╚═╝   ╚═╝   ╚═╝  ╚═══╝╚══════╝╚══════╝╚══════╝╚══════╝╚═════╝
```

# Witness Agents · `113.tryambakam.space`

**Self-consciousness as technology.** Body as medium. Breath as interface.
Sixteen engines, the canticle, essays, maps, and open code gathered into one
inspectable field for self-consciousness.

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=flat-square&logo=greensock&logoColor=black)](https://greensock.com/gsap/)
[![Lenis](https://img.shields.io/badge/Lenis-1.0-070B1D?style=flat-square)](https://lenis.darkroom.engineering/)
[![Bun](https://img.shields.io/badge/Bun-1.x-FBF0DF?style=flat-square&logo=bun&logoColor=black)](https://bun.sh/)
[![License: MIT](https://img.shields.io/badge/License-MIT-C5A017?style=flat-square)](LICENSE)
[![Brand: Tryambakam Noesis](https://img.shields.io/badge/Brand-Tryambakam_Noesis-2D0050?style=flat-square)](https://tryambakam.space)

---

</div>

## What this is

A standalone research-facing orientation page for the **Witness Agents** surface of
[Tryambakam Noesis](https://tryambakam.space).

The site fuses two design grammars:

- **A codrops-style poetic typography flow** — 18 sections, one engine poster
  per section, scroll-triggered Flip animations that expand each image inline
  within the typography it lives inside.
- **A research-interface architecture** — hero with dual CTAs, "Why" bento,
  comparison strip, lineage credibility, FAQ accordion, direct
  correspondence, sitemap footer.

Section H2s spell **`WITNESSED`** as a hidden acrostic. Type the word anywhere on
the page to trigger the L2 reveal.

---

## Architecture at a glance

```text
                  ┌──────────────────────────┐
                  │  HERO + DUAL CTA + STATS │
                  └────────────┬─────────────┘
                               │
                  ┌────────────▼─────────────┐
                  │  WHY · 4-card bento      │
                  └────────────┬─────────────┘
                               │
                  ┌────────────▼─────────────┐
                  │  VERSUS · the delta      │
                  └────────────┬─────────────┘
                               │
                  ┌────────────▼─────────────┐
                  │  CODROPS POETIC FLOW     │
                  │   18 sections · 16       │
                  │   engine posters · one   │
                  │   image per section      │
                  └────────────┬─────────────┘
                               │
                  ┌────────────▼─────────────┐
                  │  LINEAGE · 6 sources     │
                  └────────────┬─────────────┘
                               │
                  ┌────────────▼─────────────┐
                  │  FAQ · 8 questions       │
                  └────────────┬─────────────┘
                               │
                  ┌────────────▼─────────────┐
                  │  SIGNAL + FOOTER         │
                  └──────────────────────────┘
```

---

## Highlights

- **One image per section** — every section is its own viewport, with one
  Selemene engine poster expanding inline within poetic typography on scroll.
- **Acrostic Easter egg** — section headlines spell `WITNESSED`. Type the word
  to pulse them in Sacred Gold. Type `kosha` after to unlock fragment-B.
- **Three layers of Easter eggs** — atmospheric (sigil breath, cursor halo,
  console breadcrumbs) · sustained-attention (1·1·3 keystrokes, scroll rhythm,
  7-second hover dissolve, 432 Hz audio pluck) · knowledge-holders (four API
  key fragments hidden in URL hash, view-source, PNG `tEXt` chunks, and node
  coordinate numerology).
- **Inward-funnel constellation** — nine luminous nodes scattered by
  `(i × 113) mod viewport`, with cursor-proximity filaments connecting them.
- **Brand-locked** — Panchang + Satoshi from FontShare, Void Black canvas,
  Sacred Gold as the single accent. No emojis, no Inter, no "AI purple."
- **Performance-aware** — the page keeps the editorial surface lean and ships
  the hero 3D model experience as a separate chunk.

---

## Quick start

```sh
bun install
bun run dev      # → http://localhost:5113
```

For production:

```sh
bun run build    # outputs to dist/
bun run preview
```

---

## Tech stack

| Layer | Tool |
|---|---|
| Bundler | [Vite 5](https://vitejs.dev/) |
| Smooth scroll | [Lenis](https://lenis.darkroom.engineering/) |
| Scroll choreography | [GSAP 3](https://greensock.com/gsap/) — `ScrollTrigger`, `Flip`, `CustomEase` |
| Type | [Panchang](https://www.fontshare.com/fonts/panchang) (display) + [Satoshi](https://www.fontshare.com/fonts/satoshi) (body) — locally hosted |
| Hosting target | [Cloudflare Pages](https://pages.cloudflare.com/) — see `public/_headers` + `public/_redirects` |

---

## Project structure

```
.
├── DESIGN.md                # 13-section semantic spec (source of truth)
├── copy/sections.md         # canonical public copy + prompt references
├── index.html               # 18-section codrops flow + research-interface wrappers
├── public/
│   ├── _headers             # CSP, HSTS, immutable cache rules
│   ├── _redirects           # / → /index.html canonical
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/engines/      # 16 engine posters (Tarot, I Ching, Numerology, ...)
├── assets/fonts/            # Panchang + Satoshi variable woff2
├── css/
│   ├── tokens.css           # color/type/space CSS vars (mirrors DESIGN.md)
│   ├── base.css             # reset + typography defaults
│   ├── motion.css           # keyframes + reduced-motion gates
│   ├── utilities.css
│   ├── geometry.css         # SVG positioning + stroke-reveal states
│   └── sections.css         # codrops layouts + section CSS
└── js/
    ├── main.js                # bootstrap
    ├── effects/effect-{1..5}.js   # codrops Flip-based image expansions
    ├── lib/                       # gsap, lenis, breath, splitText, seed, ...
    ├── motion/                    # reusable motion primitives
    ├── sections-special/          # hero, why, tapestry, threshold, faq,
    │                              # signal, magnetic, scrollProgress
    ├── easter-eggs/               # manifest, acrostic, l2-konami, l3-fragment,
    │                              # numerology, console
    └── integrations/linkMap.js
```

---

## Editorial surfaces

- `copy/sections.md` — canonical public copy and section-level prompt refs
- `tasks/seo-brief.md` — title, description, OG/Twitter copy, and alt strategy
- `tasks/visual-prompt-bank.md` — manual prompt bank for OG, hero 3D, and all engine posters

---

## Easter eggs

> Discovery > Delivery. The page is findable, never broadcast.

| Layer | Egg | Trigger |
|---|---|---|
| L1 | Sigil breath | always-on (hero) |
| L1 | Cursor halo | always-on (Witness Violet glow) |
| L1 | Console breadcrumb | open DevTools |
| L2 | Acrostic | type `witnessed` anywhere |
| L2 | 1·1·3 keystrokes | press `1`, `1`, `3` |
| L2 | Scroll rhythm | down 1 / up 1 / down 3 within 30 s |
| L2 | 7s dissolve | sustained hover on the word "dissolve" (§ 11) |
| L2 | 432 Hz pluck | hover the `432Hz` node (tapestry § 17) |
| L2 | Visit-113 | localStorage visit count = 113 |
| L3 | Fragment A | acrostic completion → URL hash |
| L3 | Fragment B | view-source `<head>` quine — type `kosha` |
| L3 | Fragment C | PNG `tEXt` chunk steganography |
| L3 | Fragment D | tapestry node coord numerology — `recoverFragmentD()` in console |

---

## Inward funnel

Every external link routes through `js/integrations/linkMap.js`:

| Destination | Live URL |
|---|---|
| `tryambakam.space` (parent) | https://tryambakam.space |
| `selemene` — sixteen engines API | https://selemene.tryambakam.space |
| `1319` — the canticle (27 chapters) | https://1319.tryambakam.space |
| `research` — public library | https://18765.tryambakam.space/research |
| `maps` — orientation routes | https://18765.tryambakam.space/maps |
| `noesis` — Selemene-engine repo | https://github.com/Sheshiyer/Selemene-engine |
| `somatic-canticles` — content repo | https://github.com/Sheshiyer/Somatic-Canticles |

---

## Deploy (Cloudflare Pages)

1. Connect this repo to a new Cloudflare Pages project.
2. **Build command:** `bun run build` · **Output:** `dist` · **Node:** 20.
3. In the `tryambakam.space` Cloudflare DNS zone, add:
   ```
   CNAME  113  →  <project>.pages.dev   (proxied / orange-cloud)
   ```
4. **SSL:** Full (Strict). Enable HSTS after first verification.
5. `public/_headers` and `public/_redirects` ship automatically with the build.

---

## License

[MIT](LICENSE) · © 2026 Tryambakam Noesis

> *The work succeeds when the user no longer needs the work.*
> — Aletheios, identity clause
