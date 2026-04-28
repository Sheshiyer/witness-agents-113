/*
 * main.js — entry point for 113.tryambakam.space
 * Codrops poetic-typography flow retrofitted with Tryambakam Noesis.
 */

import { gsap, ScrollTrigger, Flip } from './lib/gsapSetup.js';
import { initLenis } from './lib/lenisSetup.js';
import { isReducedMotion, attachMotionToggle } from './lib/reducedMotion.js';
import { onFontsReady, onWindowLoad } from './lib/preload.js';
import { greet } from './easter-eggs/console.js';
import { registerAllEggs } from './easter-eggs/manifest.js';

import { ExpandImageEffect as Effect1 } from './effects/effect-1.js';
import { ExpandImageEffect as Effect2 } from './effects/effect-2.js';
import { ExpandImageEffect as Effect3 } from './effects/effect-3.js';
import { ExpandImageEffect as Effect4 } from './effects/effect-4.js';
import { ExpandImageEffect as Effect5 } from './effects/effect-5.js';

import initTapestry from './sections-special/tapestry.js';
import initThreshold from './sections-special/threshold.js';
import initHero from './sections-special/hero.js';
import initWhy from './sections-special/why.js';
import initFAQ from './sections-special/faq.js';
import initMagnetic from './sections-special/magnetic.js';
import initPlaylistRail from './sections-special/playlistRail.js';
import initScrollProgress from './sections-special/scrollProgress.js';

const reduced = isReducedMotion();
const EFFECTS = { 1: Effect1, 2: Effect2, 3: Effect3, 4: Effect4, 5: Effect5 };
const heroModelViewer = import('@google/model-viewer');

const lenis = reduced ? null : initLenis();

if (lenis) {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

attachMotionToggle(() => {
  if (lenis) lenis.stop();
  ScrollTrigger.refresh();
});

const boot = async () => {
  await onWindowLoad();
  await onFontsReady();

  document.body.classList.remove('loading');

  initHero({ gsap, ScrollTrigger, reduced, modelViewerReady: heroModelViewer });

  // Wire codrops type-expand effects per [data-effect] section.
  // Each article has one .type element; effect class is chosen by data-effect attr.
  const codropsSections = document.querySelectorAll('[data-effect]');
  codropsSections.forEach((el) => {
    const n = parseInt(el.dataset.effect, 10);
    const Cls = EFFECTS[n];
    const wrap = el.querySelector('.type');
    if (!Cls || !wrap) return;

    if (reduced) {
      wrap.classList.add('type--open');
      return;
    }

    try {
      new Cls(wrap);
    } catch (err) {
      console.warn('[effect]', n, 'on section', el.dataset.section, err);
    }
  });

  // Special sections (codrops + product-page enhancements)
  initWhy({ gsap, ScrollTrigger, reduced });
  initTapestry({ gsap, ScrollTrigger, reduced, lenis });
  initThreshold({ gsap, ScrollTrigger, reduced });
  initFAQ({ gsap, ScrollTrigger, reduced });
  initMagnetic({ reduced });
  initPlaylistRail({ gsap, reduced });
  initScrollProgress({ reduced });

  // Easter eggs
  registerAllEggs({ gsap, ScrollTrigger, lenis });

  // Console greeting
  greet();

  // Refresh ScrollTrigger after fonts settle
  ScrollTrigger.refresh();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
