/*
 * scrollProgress.js — top hairline that fills as the user scrolls.
 *  • Pure transform/scaleX for hardware acceleration
 *  • requestAnimationFrame, no scroll listener spam
 *  • Updates aria-valuenow on the parent for screen-reader feedback
 */

export default function initScrollProgress({ reduced }) {
  const root = document.querySelector('[data-scroll-progress]');
  if (!root) return;
  const bar = root.querySelector('.scroll-progress__bar');
  if (!bar) return;

  let raf = null;
  let lastPct = -1;

  const update = () => {
    const doc = document.documentElement;
    const max = (doc.scrollHeight - doc.clientHeight) || 1;
    const pct = Math.min(100, Math.max(0, (doc.scrollTop / max) * 100));
    const rounded = Math.round(pct);

    if (rounded !== lastPct) {
      bar.style.width = `${pct}%`;
      root.setAttribute('aria-valuenow', String(rounded));
      lastPct = rounded;
    }
    raf = null;
  };

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };

  document.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}
