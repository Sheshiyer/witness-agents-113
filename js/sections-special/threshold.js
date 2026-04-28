/*
 * threshold.js — Section 10 final vows + Ouroboros completion.
 */

export default function initThreshold({ gsap, ScrollTrigger, reduced }) {
  const section = document.querySelector('.content--threshold');
  if (!section) return;

  const vows = section.querySelectorAll('.vow');
  const ouroboros = section.querySelector('.ouroboros-final');

  if (!reduced) {
    gsap.from(vows, {
      scrollTrigger: { trigger: section, start: 'top center', once: true },
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'growth',
      stagger: 0.15
    });

    if (ouroboros) {
      ScrollTrigger.create({
        trigger: section,
        start: 'center center',
        once: true,
        onEnter: () => ouroboros.classList.add('is-revealed')
      });
    }
  } else if (ouroboros) {
    ouroboros.classList.add('is-revealed');
  }
}
