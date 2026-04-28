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
