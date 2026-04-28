/*
 * lenisSetup.js — smooth scroll initialization
 */

import Lenis from 'lenis';

export const initLenis = () => {
  const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 1.5
  });

  return lenis;
};
