/*
 * preload.js — generic asset readiness gate
 * (replaces the imagesloaded-based original utils.js)
 */

export const onReady = (cb) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cb, { once: true });
  } else {
    cb();
  }
};

export const onFontsReady = () =>
  document.fonts?.ready ?? Promise.resolve();

export const onWindowLoad = () =>
  new Promise((resolve) => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', resolve, { once: true });
  });
