/*
 * l1-breath.js — cursor halo (atmospheric, always-on)
 */

export default function initCursorHalo({ reduced }) {
  if (reduced) return;
  if (window.matchMedia('(hover: none)').matches) return; // mobile/touch — no cursor halo

  const halo = document.querySelector('.cursor-halo');
  if (!halo) return;

  let raf = null;
  let target = { x: -100, y: -100 };
  let current = { x: -100, y: -100 };

  const move = () => {
    current.x += (target.x - current.x) * 0.15;
    current.y += (target.y - current.y) * 0.15;
    halo.style.left = `${current.x}px`;
    halo.style.top = `${current.y}px`;
    raf = requestAnimationFrame(move);
  };

  document.addEventListener('pointermove', (e) => {
    target.x = e.clientX;
    target.y = e.clientY;
    if (!raf) raf = requestAnimationFrame(move);
  }, { passive: true });

  document.addEventListener('pointerleave', () => {
    target.x = -100;
    target.y = -100;
  });
}
