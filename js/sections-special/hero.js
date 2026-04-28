/*
 * hero.js — minimal entrance for the hero section (no codrops effect)
 */

export default function initHero({ gsap, reduced, modelViewerReady }) {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const frame = hero.querySelector('.hero__sigil-frame');
  const viewer = hero.querySelector('.hero__sigil-viewer');

  if (frame && viewer) {
    const setSigilState = (state) => {
      frame.dataset.heroSigilState = state;
    };

    const syncViewerMotion = () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const manualReduced = document.documentElement.dataset.motion === 'reduced';
      const shouldReduce = prefersReduced || manualReduced;

      if (shouldReduce) {
        viewer.removeAttribute('auto-rotate');
        viewer.removeAttribute('camera-controls');
        return;
      }

      viewer.setAttribute('auto-rotate', '');
      viewer.setAttribute('camera-controls', '');
    };

    modelViewerReady
      ?.then(() => {
        viewer.addEventListener('load', () => setSigilState('ready'), { once: true });
        viewer.addEventListener('error', () => setSigilState('error'));
        syncViewerMotion();

        const observer = new MutationObserver(syncViewerMotion);
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['data-motion']
        });
      })
      .catch(() => {
        setSigilState('error');
      });
  }

  if (reduced) return;

  const title = hero.querySelector('.hero__title');
  const tagline = hero.querySelector('.hero__tagline');
  const meta = hero.querySelector('.hero__meta');
  const credibility = hero.querySelector('.hero__credibility');
  const sigil = hero.querySelector('.hero__sigil-shell') || hero.querySelector('.hero__sigil');

  const tl = gsap.timeline({ defaults: { ease: 'growth' } });
  tl.from(meta,    { opacity: 0, y: 16, duration: 0.8 })
    .from(title,   { opacity: 0, y: 32, duration: 1.2 }, '-=0.5')
    .from(tagline, { opacity: 0, y: 16, duration: 1.0 }, '-=0.7')
    .from(sigil,   { opacity: 0, scale: 0.85, duration: 1.6 }, '-=1.2')
    .from(credibility, { opacity: 0, duration: 0.8 }, '-=0.4');
}
