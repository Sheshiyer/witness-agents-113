# Working Lessons

## 2026-04-28

- After any broad copy replacement pass, run a link sanity check on every edited `href`. Text substitutions can silently corrupt URLs.
- When the worktree is already dirty, restate and enforce the allowed write scope before editing. Do not let a content pass drift into adjacent files.
- In this environment, prefer checking `~/.claude/.env` for generation credentials before trusting session-level API key exports. The session key can be stale while the local config is current.
- Meshy retexture outputs arrive as source assets, not delivery assets. Always run the GLB optimization pass before deciding whether a new variant is viable for the live hero.
- When headline typography regresses, inspect the smallest breakpoint overrides before rewriting the base heading system. Late mobile hacks can silently undo the intended `clamp()` scale and no-midword-break rules.
- When responsive layout bugs seem inconsistent, check rule order across all breakpoints. A later broader media query can quietly override an earlier narrower mobile stack and create false “overlap” symptoms.
- When interface copy is adapted from long-form essays, re-audit every section title against the actual layout behavior. Good essay phrasing can be bad reveal-UI phrasing, especially in giant display sections with inline images.
- In this project, body copy length is part of layout behavior. A paragraph that reads well in a document can still slow or flatten the reveal rhythm, so test section bodies with their headings in-browser, not in isolation.
- If a lineage grid mixes texts, traditions, institutions, and named thinkers, frame it as `sources`, not `authors`. The heading has to match the actual attribution object on the page.
- On this site, lower-page continuity matters as much as single-section quality. If the reveal sequence drops into boxed product-panel patterns, the narrative fractures even when the copy is correct.
- When footer or header links target reveal articles, add explicit `id` anchors on the article wrappers. Do not assume `data-section` names or comments are navigable anchors.
- Do not promote internal voice DNA into public contributor credit. If a name came from tone/persona calibration, verify it separately before placing it in lineage or authorship copy.
- When reader-facing copy starts describing the page, route, node, or funnel more than the subject itself, rewrite it into first-order claims. Interface self-commentary is usually a drift signal.
- For decorative flares, placeholder copy and generic CSS loops read unfinished immediately. Use real source metadata, stronger typography, and a proper motion system or do not ship the flourish.
- Never present a polished public CTA for a channel that is not actually live. If email, subscription, or intake wiring is pending, the interface must say so plainly and point to the implementation tracker instead.
- Before tuning any reveal image system, audit the real asset dimensions first. A generic `16:9` container against portrait posters will force cropping and make every later mobile fix look random.
- When verifying GSAP Flip layouts from DOM clones, strip transient inline transform/size styles but preserve intentional inline data like `background-image`. Otherwise full-width reveal sections can look broken in measurement even when the CSS is correct.
- When a real brand asset pack already exists, replace placeholder glyphs in footer/favicon surfaces with the shipped mark before calling the branding pass complete.
- When the user separates asset roles explicitly, keep those roles separate. A theme-specific favicon pack is not permission to reuse those files as the footer or primary brand mark.
- When reveal prose sits on a dark field, never hard-code a deep fade like `opacity: 0.2` into the scroll effects. Keep paragraph fade floors responsive and verify them in-browser while the effect is active, not only at rest.
- For final copy passes, update `copy/sections.md`, live metadata in `index.html`, and `tasks/seo-brief.md` in one pass. If one source lags, stale titles, descriptions, and CTA labels drift back into the shipped page.
- CTA labels on this site should name the exact public surface they open. Generic verbs like `open`, `track`, or `see` weaken trust faster than the body copy does.
- On multi-surface pages, the primary CTA has to match the unfinished or decisive action on that page itself. Do not let a strong adjacent asset like the canticle replace the real object of the page, especially when the missing piece is an unwired access flow.
- After any generation pass, produce an explicit live-vs-retained asset map before pushing. “Not forgotten” is different from “currently live,” and the repo should state that distinction concretely.
