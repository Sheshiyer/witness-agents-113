/*
 * tapestry.js — Section 09 interactive constellation funnel.
 * 9 nodes scattered, cursor-proximity filaments, 432Hz pluck, seed echo.
 */

import { fib, numerologyHash } from '../lib/seed.js';

export default function initTapestry({ reduced }) {
  const section = document.querySelector('[data-tapestry-field]');
  if (!section) return;

  const field = section;
  const nodes = Array.from(field.querySelectorAll('.node'));
  const filamentSvg = field.querySelector('.tapestry__filaments');

  const layoutNodes = () => {
    const w = field.clientWidth;
    const h = field.clientHeight;
    if (w < 600) return; // mobile collapses to vertical list (CSS)

    nodes.forEach((node, i) => {
      const idx = parseInt(node.dataset.nodeI || i, 10);
      const padding = 80;
      let x = (idx * 113) % (w - padding * 2);
      x = padding + x;
      let y = ((fib(idx + 1) * 89) % (h - padding * 2));
      y = padding + y;

      if (node.dataset.nodeId === '113') {
        x = w / 2;
        y = h / 2;
      }

      node.style.position = 'absolute';
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      node.style.transform = 'translate(-50%, -50%)';

      node.dataset.x = String(Math.round(x));
      node.dataset.y = String(Math.round(y));
      node.dataset.fragD = String(numerologyHash(Math.round(x), Math.round(y)));
    });
  };

  layoutNodes();
  window.addEventListener('resize', () => requestAnimationFrame(layoutNodes), { passive: true });

  // Filaments on cursor proximity
  if (!reduced && filamentSvg && field.clientWidth >= 600) {
    let cursor = { x: -9999, y: -9999 };

    field.addEventListener('pointermove', (e) => {
      const rect = field.getBoundingClientRect();
      cursor.x = e.clientX - rect.left;
      cursor.y = e.clientY - rect.top;
    }, { passive: true });

    field.addEventListener('pointerleave', () => {
      cursor.x = -9999;
      cursor.y = -9999;
    });

    const renderFilaments = () => {
      const lines = nodes
        .map((n) => {
          const cx = parseFloat(n.dataset.x || '0');
          const cy = parseFloat(n.dataset.y || '0');
          const dx = cursor.x - cx;
          const dy = cursor.y - cy;
          return { node: n, cx, cy, d: Math.hypot(dx, dy) };
        })
        .filter(({ d }) => d < 220)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3);

      while (filamentSvg.lastChild && filamentSvg.lastChild.tagName === 'line') {
        filamentSvg.removeChild(filamentSvg.lastChild);
      }

      lines.forEach(({ cx, cy, d }) => {
        const opacity = Math.max(0, 1 - d / 220) * 0.6;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', String(cursor.x));
        line.setAttribute('y1', String(cursor.y));
        line.setAttribute('x2', String(cx));
        line.setAttribute('y2', String(cy));
        line.setAttribute('stroke', 'url(#grad-filament)');
        line.setAttribute('stroke-width', '0.5');
        line.setAttribute('stroke-opacity', String(opacity));
        filamentSvg.appendChild(line);
      });

      requestAnimationFrame(renderFilaments);
    };

    requestAnimationFrame(renderFilaments);
  }

  // 432Hz pluck
  const audioNode = field.querySelector('[data-egg="frequency"]');
  if (audioNode) {
    let audioCtx = null;
    audioNode.addEventListener('pointerenter', () => {
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.value = 432;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.02);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.2);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.22);
      } catch (e) { /* silent */ }
    });
    audioNode.addEventListener('click', () => {
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
      } catch (e) { /* silent */ }
    });
  }

  // Seed echo
  const seedNode = field.querySelector('[data-egg="seed-echo"]');
  if (seedNode) {
    seedNode.addEventListener('click', () => {
      console.log(
        '%c[SEED] 1319 + 19910813 + 432 = 19912564',
        'color: #C5A017; font-family: monospace;'
      );
    });
  }
}
