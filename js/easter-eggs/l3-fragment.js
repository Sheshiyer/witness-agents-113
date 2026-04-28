/*
 * l3-fragment.js — fragment recovery helpers (DevTools console-driven)
 *
 * Frag A: acrostic (acrostic.js)
 * Frag B: view-source HTML <head> comment quine (acrostic.js, "kosha" trigger)
 * Frag C: PNG tEXt steg metadata (external — exiftool / pngcheck)
 * Frag D: tapestry node coord numerology (this file — exposes window helper)
 */

export default function initFragment() {
  // Expose a debugging helper for fragment-D recovery
  window.recoverFragmentD = () => {
    const nodes = document.querySelectorAll('[data-node-i]');
    if (!nodes.length) {
      console.warn('Section 08 not in view yet — scroll to tapestry first.');
      return null;
    }
    const bytes = Array.from(nodes)
      .sort((a, b) => parseInt(a.dataset.nodeI, 10) - parseInt(b.dataset.nodeI, 10))
      .map((n) => parseInt(n.dataset.fragD || '0', 10));

    const hex = bytes.map((b) => b.toString(16).padStart(2, '0')).join('');
    const fragD = `frag-d:${hex}`;
    console.log(
      '%c[FRAG-D] tapestry coord numerology:',
      'color: #C5A017; font-family: monospace;'
    );
    console.table(
      Array.from(nodes).map((n) => ({
        i: n.dataset.nodeI,
        id: n.dataset.nodeId,
        x: n.dataset.x,
        y: n.dataset.y,
        '(x+y*113)mod256': n.dataset.fragD
      }))
    );
    console.log(`%c${fragD}`, 'color: #10B5A7; font-family: monospace; font-weight: bold;');
    return fragD;
  };

  // Subtle hint
  if (!sessionStorage.getItem('frag-d-hint')) {
    setTimeout(() => {
      console.log(
        '%c> 9 nodes carry numbers. (i × 113) mod ? · sum or concat?',
        'color: #8A9BA8; font-family: monospace; font-style: italic;'
      );
      sessionStorage.setItem('frag-d-hint', '1');
    }, 30_000);
  }
}
