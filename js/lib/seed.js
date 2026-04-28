/*
 * seed.js — composite seed math (DESIGN.md §8)
 * 19912564 = 1319 + 19910813 + 432
 * 1319 → "the canticle"
 * 19910813 → composite component (date or numeric encoding)
 * 432 → universal frequency (Hz)
 */

export const COMPOSITE_SEED = 19_912_564;
export const SEED_PARTS = {
  canticle: 1_319,
  composite: 19_910_813,
  frequency: 432
};

export const verifyComposite = () =>
  SEED_PARTS.canticle + SEED_PARTS.composite + SEED_PARTS.frequency === COMPOSITE_SEED;

// L3 fragment-D math: per-node (x + y * 113) mod 256
export const numerologyHash = (x, y) => (x + y * 113) % 256;

// Fibonacci sequence — used for Section 08 node y-positions
export const fib = (n) => {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
};
