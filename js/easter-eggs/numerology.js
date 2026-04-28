/*
 * numerology.js — 113 / 432 / 108 / 144 / 1319 token math
 * Used by L2 seed-echo + diagnostic logging.
 */

import { COMPOSITE_SEED, SEED_PARTS, verifyComposite, fib } from '../lib/seed.js';

export default function initNumerology() {
  if (!verifyComposite()) {
    console.warn('[NUMEROLOGY] composite seed mismatch — math broken upstream.');
  }

  // Expose for L3 inspectors
  window.tnNumerology = Object.freeze({
    COMPOSITE_SEED,
    SEED_PARTS,
    fib,
    'mod-113': (n) => n % 113,
    'mod-256-via-113': (x, y) => (x + y * 113) % 256,
    sigma: { 'witnessed-letters': 9, 'tapestry-nodes': 9, 'koshas': 5, 'engines': 16, 'breath': '4:7:8' }
  });
}
