/*
 * acrostic.js — type "witnessed" anywhere → all type[data-acrostic-h] pulse Sacred Gold + URL hash
 * L2 reveal. L3 frag-A unlock.
 */

const TARGET = 'witnessed';
const KOSHA_TARGET = 'kosha';

export default function initAcrostic() {
  let buffer = '';
  let timeout = null;

  const acrosticReveal = () => {
    const headings = document.querySelectorAll('[data-acrostic-h], .hero__title');

    headings.forEach((h) => {
      h.classList.add('is-acrostic-revealed');
      setTimeout(() => h.classList.remove('is-acrostic-revealed'), 1600);
    });

    // L3 frag-A
    const url = new URL(window.location.href);
    if (!url.hash.includes('frag=a')) {
      url.hash = '#frag=a:VW1Q';
      window.history.replaceState(null, '', url);
    }

    console.log(
      '%c[ACROSTIC] WITNESSED · fragment-A unlocked · type "kosha" next.',
      'color: #C5A017; font-family: monospace; font-weight: bold;'
    );
  };

  const koshaReveal = () => {
    console.log(
      '%c[KOSHA] fragment-B: 9oP3aQ',
      'color: #10B5A7; font-family: monospace; font-weight: bold;'
    );
    console.log('%cSeek fragment-C in the steg image. fragment-D in tapestry coords.', 'color: #8A9BA8;');
  };

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = (e.target?.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target?.isContentEditable) return;

    const ch = e.key.toLowerCase();
    if (!/^[a-z]$/.test(ch)) return;

    buffer += ch;
    if (buffer.length > 32) buffer = buffer.slice(-32);

    if (buffer.endsWith(TARGET)) {
      acrosticReveal();
      buffer = '';
    } else if (buffer.endsWith(KOSHA_TARGET)) {
      koshaReveal();
      buffer = '';
    }

    clearTimeout(timeout);
    timeout = setTimeout(() => { buffer = ''; }, 5_000);
  });
}
