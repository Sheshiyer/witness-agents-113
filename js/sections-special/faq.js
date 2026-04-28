/*
 * faq.js — accordion enhancements for <details> Q/A pairs.
 *  • Smooth height animation on open/close (uses Web Animations API)
 *  • Single-open behaviour: opening one closes the others
 *  • Scroll-reveal on enter (stagger)
 */

export default function initFAQ({ gsap, ScrollTrigger, reduced }) {
  const items = document.querySelectorAll('[data-faq]');
  if (!items.length) return;

  // Single-open behaviour
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        items.forEach((other) => {
          if (other !== item && other.open) other.open = false;
        });
      }
    });
  });

  // Smooth height animation (vanilla — open=false→true)
  if (!reduced) {
    items.forEach((item) => {
      const summary = item.querySelector('summary');
      const answer  = item.querySelector('.faq__a');
      if (!summary || !answer) return;

      summary.addEventListener('click', (e) => {
        e.preventDefault();
        if (item.open) {
          // Closing
          const startH = answer.offsetHeight;
          answer.animate(
            [{ height: `${startH}px`, opacity: 1 }, { height: '0px', opacity: 0 }],
            { duration: 360, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
          ).onfinish = () => { item.open = false; };
        } else {
          // Opening
          item.open = true;
          const targetH = answer.offsetHeight;
          answer.animate(
            [{ height: '0px', opacity: 0 }, { height: `${targetH}px`, opacity: 1 }],
            { duration: 420, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
          );
        }
      });
    });
  }

  // Scroll-reveal stagger
  if (!reduced && gsap && ScrollTrigger) {
    gsap.from(items, {
      scrollTrigger: {
        trigger: items[0],
        start: 'top bottom-=80',
        once: true
      },
      y: 16,
      opacity: 0,
      duration: 0.7,
      stagger: 0.06,
      ease: 'power2.out'
    });
  }
}
