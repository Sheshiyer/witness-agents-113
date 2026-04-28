/*
 * breath.js — 4:7:8 timing primitives
 * Pranayama-derived breath cadence used across the page.
 */

export const BREATH = {
  inhale: 4,
  hold: 7,
  exhale: 8,
  totalSeconds: 4 + 7 + 8, // 19s
  totalMs: 19_000
};

export const breathProgress = (timeMs) => {
  const t = (timeMs / 1000) % BREATH.totalSeconds;
  if (t < BREATH.inhale) return t / BREATH.inhale;                 // 0 → 1 (inhale)
  if (t < BREATH.inhale + BREATH.hold) return 1;                   // hold
  return 1 - (t - BREATH.inhale - BREATH.hold) / BREATH.exhale;    // 1 → 0 (exhale)
};
