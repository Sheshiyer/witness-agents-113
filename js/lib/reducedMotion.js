/*
 * reducedMotion.js — system pref + manual toggle gate
 */

const QUERY = '(prefers-reduced-motion: reduce)';

export const isReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  const sys = window.matchMedia(QUERY).matches;
  const manual = document.documentElement.dataset.motion === 'reduced';
  return sys || manual;
};

/**
 * Wrap motion logic — fall back to staticFn (or noop) under reduced.
 */
export const respectMotion = (animFn, staticFn) => {
  if (isReducedMotion()) {
    return staticFn?.() ?? null;
  }
  return animFn();
};

/**
 * Wire the footer motion toggle button.
 */
export const attachMotionToggle = (onToggle) => {
  const btn = document.querySelector('[data-motion-toggle]');
  if (!btn) return;

  const sync = () => {
    const reduced = document.documentElement.dataset.motion === 'reduced';
    btn.setAttribute('aria-pressed', reduced ? 'true' : 'false');
  };

  btn.addEventListener('click', () => {
    const current = document.documentElement.dataset.motion === 'reduced';
    document.documentElement.dataset.motion = current ? 'full' : 'reduced';
    sync();
    onToggle?.();
  });

  sync();
};
