/*
 * hero.js — minimal entrance for the hero section (no codrops effect)
 */

export default function initHero({ gsap, reduced }) {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  if (reduced) return;

  const title = hero.querySelector('.hero__title');
  const tagline = hero.querySelector('.hero__tagline');
  const meta = hero.querySelector('.hero__meta');
  const sigil = hero.querySelector('.hero__sigil');
  const signal = hero.querySelector('.hero__signal');

  const tl = gsap.timeline({ defaults: { ease: 'growth' } });
  tl.from(meta,    { opacity: 0, y: 16, duration: 0.8 })
    .from(title,   { opacity: 0, y: 32, duration: 1.2 }, '-=0.5')
    .from(tagline, { opacity: 0, y: 16, duration: 1.0 }, '-=0.7')
    .from(sigil,   { opacity: 0, scale: 0.85, duration: 1.6 }, '-=1.2')
    .from(signal,  { opacity: 0, duration: 0.8 }, '-=0.4');
}
