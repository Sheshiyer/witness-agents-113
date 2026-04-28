/*
 * l2-konami.js — 1·1·3 keystroke + 1·1·3 scroll rhythm
 * Both reveal a fragment / persistent glyph.
 */

export default function initKonami({ lenis }) {
  // ─── Keystroke 1·1·3 ───
  let keyBuffer = [];
  let keyTimeout = null;

  document.addEventListener('keydown', (e) => {
    const tag = (e.target?.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target?.isContentEditable) return;

    if (e.key === '1' || e.key === '3') {
      keyBuffer.push(e.key);
      if (keyBuffer.length > 3) keyBuffer.shift();

      if (keyBuffer.join('') === '113') {
        console.log(
          '%c[1·1·3] sequence recognized — fragment-2: 7uKPpHrA',
          'color: #C5A017; font-family: monospace; font-weight: bold;'
        );
        keyBuffer = [];
      }

      clearTimeout(keyTimeout);
      keyTimeout = setTimeout(() => { keyBuffer = []; }, 5_000);
    } else {
      keyBuffer = [];
    }
  });

  // ─── Scroll rhythm: down 1, up 1, down 3 within 30s ───
  let lastSection = -1;
  let pattern = []; // sequence of direction changes
  let resetTimer = null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const sec = parseInt(entry.target.dataset.section || '-1', 10);
        if (sec === lastSection) return;

        const direction = sec > lastSection ? 'down' : 'up';
        pattern.push(direction);
        if (pattern.length > 5) pattern.shift();

        // Pattern target: down, up, down, down, down (i.e. "1 down, 1 up, 3 down")
        const target = ['down', 'up', 'down', 'down', 'down'];
        if (pattern.join() === target.join()) {
          materializeGlyph();
          pattern = [];
        }

        lastSection = sec;

        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => { pattern = []; }, 30_000);
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('[data-section]').forEach((s) => observer.observe(s));

  // ─── Materialize glyph ───
  const materializeGlyph = () => {
    if (sessionStorage.getItem('glyph113') === '1') return;
    sessionStorage.setItem('glyph113', '1');

    const glyph = document.createElement('div');
    glyph.className = 'glyph-113-materialized';
    glyph.innerHTML = `
      <svg viewBox="0 0 80 80" width="36" height="36">
        <use href="#glyph-113"></use>
      </svg>
    `;
    document.body.appendChild(glyph);

    requestAnimationFrame(() => {
      glyph.classList.add('is-revealed');
    });

    console.log(
      '%c[1·1·3] rhythm recognized — glyph materialized.',
      'color: #C5A017; font-family: monospace;'
    );
  };

  // ─── Visit-113 counter ───
  const initVisitCounter = () => {
    const key = 'tn-visits';
    const count = parseInt(localStorage.getItem(key) || '0', 10) + 1;
    localStorage.setItem(key, String(count));

    if (count === 113) {
      const link = document.createElement('a');
      link.href = '/?gate=count-of-the-witness';
      link.textContent = 'the gate is the count';
      link.className = 'visit-113-link';
      link.style.cssText = `
        position: fixed;
        bottom: 1.5rem;
        left: 1.5rem;
        font-family: var(--font-mono);
        font-size: var(--type-meta);
        color: var(--sacred-gold);
        opacity: 0.7;
        text-decoration: none;
        z-index: 100;
        letter-spacing: var(--ls-meta);
      `;
      document.body.appendChild(link);
    }

    if (count > 0 && count % 13 === 0) {
      console.log(
        `%c[visit ${count}] the count is the gate is the count.`,
        'color: #8A9BA8; font-family: monospace;'
      );
    }
  };

  initVisitCounter();
}
