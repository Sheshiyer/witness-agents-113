/*
 * why.js — 4-card asymmetric bento reveal + cursor spotlight on hover.
 *  • Stagger-fade-in on scroll
 *  • CSS custom properties --mx / --my track cursor for the radial gradient
 */

export default function initWhy({ gsap, ScrollTrigger, reduced }) {
  const section = document.querySelector('#why');
  if (!section) return;

  const cards = section.querySelectorAll('.why__card');

  if (!reduced && gsap && ScrollTrigger) {
    gsap.from(cards, {
      scrollTrigger: { trigger: section, start: 'top center+=80', once: true },
      y: 24,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.08
    });

    // Header lede slides in
    const header = section.querySelector('.why__header');
    if (header) {
      gsap.from(header, {
        scrollTrigger: { trigger: section, start: 'top bottom-=120', once: true },
        y: 16,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out'
      });
    }
  }

  // Cursor spotlight on hover (cssvar --mx/--my drives the radial gradient)
  if (!reduced && !window.matchMedia('(hover: none)').matches) {
    cards.forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', `${x}%`);
        card.style.setProperty('--my', `${y}%`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--mx');
        card.style.removeProperty('--my');
      });
    });
  }
}
