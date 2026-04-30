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
import initAgentAccess from './sections-special/agentAccess.js';
import initPlaylistRail from './sections-special/playlistRail.js';
import initScrollProgress from './sections-special/scrollProgress.js';

const reduced = isReducedMotion();
const EFFECTS = { 1: Effect1, 2: Effect2, 3: Effect3, 4: Effect4, 5: Effect5 };
const heroModelViewer = import('@google/model-viewer');
const EXPAND_EFFECT_RESET_PROPS = 'transform,transformOrigin,opacity,width,height,maxWidth,maxHeight,minWidth,minHeight,translate,rotate,scale,x,y,xPercent,yPercent,skewX,rotation,lineHeight,willChange';

const lenis = reduced ? null : initLenis();
let expandEffectInstances = [];
let expandEffectRefreshTimer = null;

const currentReduced = () => isReducedMotion();

const clearExpandEffectState = () => {
  document.querySelectorAll('[data-effect] .type').forEach((wrap) => {
    wrap.classList.remove('type--open');
  });

  document
    .querySelectorAll('[data-effect] .type__expand, [data-effect] .type__expand-img, [data-effect] .type__expand-img-inner, [data-effect] .anim, [data-effect] .block')
    .forEach((el) => {
      gsap.set(el, { clearProps: EXPAND_EFFECT_RESET_PROPS });
    });
};

const destroyExpandEffects = () => {
  ScrollTrigger.getAll().forEach((trigger) => {
    const triggerElement = trigger.vars?.trigger;
    if (triggerElement instanceof Element && triggerElement.closest('[data-effect]')) {
      trigger.kill(true);
    }
  });

  expandEffectInstances = [];
  clearExpandEffectState();
};

const initExpandEffects = () => {
  const reduceMotion = currentReduced();
  const codropsSections = document.querySelectorAll('[data-effect]');

  codropsSections.forEach((el) => {
    const n = parseInt(el.dataset.effect, 10);
    const Cls = EFFECTS[n];
    const wrap = el.querySelector('.type');
    if (!Cls || !wrap) return;

    if (reduceMotion) {
      wrap.classList.add('type--open');
      return;
    }

    try {
      expandEffectInstances.push(new Cls(wrap));
    } catch (err) {
      console.warn('[effect]', n, 'on section', el.dataset.section, err);
    }
  });
};

const rebuildExpandEffects = () => {
  destroyExpandEffects();
  initExpandEffects();
  ScrollTrigger.refresh();
};

const scheduleExpandEffectRefresh = () => {
  clearTimeout(expandEffectRefreshTimer);
  expandEffectRefreshTimer = window.setTimeout(() => {
    rebuildExpandEffects();
  }, 180);
};

if (lenis) {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

attachMotionToggle(() => {
  if (lenis) lenis.stop();
  scheduleExpandEffectRefresh();
});

const boot = async () => {
  await onWindowLoad();
  await onFontsReady();

  document.body.classList.remove('loading');

  initHero({ gsap, ScrollTrigger, reduced, modelViewerReady: heroModelViewer });
  initExpandEffects();

  window.addEventListener('resize', scheduleExpandEffectRefresh, { passive: true });
  window.addEventListener('orientationchange', scheduleExpandEffectRefresh, { passive: true });

  // Special sections (codrops + product-page enhancements)
  initWhy({ gsap, ScrollTrigger, reduced });
  initTapestry({ gsap, ScrollTrigger, reduced, lenis });
  initThreshold({ gsap, ScrollTrigger, reduced });
  initFAQ({ gsap, ScrollTrigger, reduced });
  initMagnetic({ reduced });
  initAgentAccess({ reduced, lenis });
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
