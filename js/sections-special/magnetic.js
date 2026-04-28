/*
 * magnetic.js — cursor magnetism on [data-magnetic] CTAs.
 *  • Pulls slightly toward cursor on hover
 *  • Pure CSS transform (translate3d) — no react state, no rerenders
 *  • Follows taste-design rule: NEVER useState for magnetic hover
 *  • Touch devices: no-op
 */

const STRENGTH = 0.18;   // 0..1 — how strongly the button moves
const RANGE    = 90;     // pixels around the button that activate the effect

export default function initMagnetic({ reduced }) {
  if (reduced) return;
  if (window.matchMedia('(hover: none)').matches) return;

  const targets = document.querySelectorAll('[data-magnetic]');
  if (!targets.length) return;

  targets.forEach((el) => {
    let raf = null;
    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;
    let active = false;

    const update = () => {
      if (!active) return;
      curX += (mouseX - curX) * 0.18;
      curY += (mouseY - curY) * 0.18;
      el.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
      raf = requestAnimationFrame(update);
    };

    el.addEventListener('pointerenter', () => {
      active = true;
      if (!raf) raf = requestAnimationFrame(update);
    });

    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > RANGE * 1.5) return; // ignore far-away noise
      mouseX = dx * STRENGTH;
      mouseY = dy * STRENGTH;
    });

    el.addEventListener('pointerleave', () => {
      active = false;
      mouseX = 0; mouseY = 0;
      const settle = () => {
        curX *= 0.85; curY *= 0.85;
        el.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
        if (Math.abs(curX) < 0.3 && Math.abs(curY) < 0.3) {
          el.style.transform = '';
          if (raf) { cancelAnimationFrame(raf); raf = null; }
          return;
        }
        raf = requestAnimationFrame(settle);
      };
      requestAnimationFrame(settle);
    });
  });
}
