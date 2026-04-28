/*
 * manifest.js — registry of all easter eggs (L1 / L2 / L3)
 * Single source of truth. Imports + initializes each egg module.
 */

import initCursorHalo from './l1-breath.js';
import initKonami from './l2-konami.js';
import initAcrostic from './acrostic.js';
import initNumerology from './numerology.js';
import initFragment from './l3-fragment.js';

export const registerAllEggs = (ctx) => {
  // L1 — atmospheric
  initCursorHalo(ctx);

  // L2 — sustained attention
  initAcrostic(ctx);
  initKonami(ctx);

  // L3 — knowledge holders
  initNumerology(ctx);
  initFragment(ctx);
};

export const EGG_MANIFEST = [
  // L1
  { id: 'l1.sigil-breath', layer: 1, location: 'section-01' },
  { id: 'l1.cursor-halo', layer: 1, location: 'page' },
  { id: 'l1.kha-ba-la-meta', layer: 1, location: 'all-sections' },
  { id: 'l1.console-trishul', layer: 1, location: 'devtools' },

  // L2
  { id: 'l2.acrostic', layer: 2, trigger: 'type "witnessed"', reveal: 'all 9 H2s gold halo + url hash frag-A' },
  { id: 'l2.scroll-rhythm-113', layer: 2, trigger: 'down 1, up 1, down 3 (within 30s)', reveal: '113-glyph materializes' },
  { id: 'l2.keystroke-113', layer: 2, trigger: '1, 1, 3 keys (within 5s)', reveal: 'console fragment-2' },
  { id: 'l2.seed-echo', layer: 2, trigger: 'click 19912564 node', reveal: 'console seed math' },
  { id: 'l2.dissolve-word', layer: 2, trigger: '7s sustained hover on "dissolve"', reveal: 'char dissolve animation' },
  { id: 'l2.108-grid-count', layer: 2, trigger: 'reduced-motion enabled', reveal: 'constellation grid freezes' },
  { id: 'l2.visit-113', layer: 2, trigger: 'localStorage visit count = 113', reveal: 'hidden bottom-left link' },

  // L3
  { id: 'l3.frag-A', layer: 3, fragment: 'A:VW1Q', mechanic: 'acrostic completion' },
  { id: 'l3.frag-B', layer: 3, fragment: 'B:9oP3aQ', mechanic: 'view-source quine, type "kosha"' },
  { id: 'l3.frag-C', layer: 3, fragment: 'C:ZmrA5y', mechanic: 'PNG tEXt steganography' },
  { id: 'l3.frag-D', layer: 3, fragment: 'D:ksh-1319', mechanic: 'tapestry node coord numerology' }
];
