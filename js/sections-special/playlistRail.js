export default function initPlaylistRail({ gsap, reduced }) {
  const rail = document.querySelector('[data-playlist-rail]');
  if (!rail || !gsap) return;

  const titleLines = rail.querySelectorAll('.playlist-rail__title-line');
  const pills = rail.querySelectorAll('.playlist-rail__pill');
  const tags = rail.querySelectorAll('.playlist-rail__tag');
  const rows = rail.querySelectorAll('.playlist-rail__row');
  const marquee = rail.querySelector('[data-playlist-marquee]');
  const halo = rail.querySelector('.playlist-rail__halo');
  const ctaArrow = rail.querySelector('.playlist-rail__cta-arrow');

  let marqueeTween = null;
  let floatTween = null;
  let haloTween = null;

  if (!reduced && marquee && marquee.children.length) {
    marquee.innerHTML += marquee.innerHTML;
    const originalHeight = marquee.scrollHeight / 2;
    marqueeTween = gsap.fromTo(
      marquee,
      { y: 0 },
      {
        y: -originalHeight,
        duration: 22,
        ease: 'none',
        repeat: -1
      }
    );
  }

  if (reduced) return;

  gsap.set(titleLines, { transformOrigin: '0% 100%' });

  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  intro
    .from(rail, { autoAlpha: 0, x: 36, duration: 1.1 })
    .from(titleLines, { yPercent: 120, rotateX: -48, opacity: 0, stagger: 0.08, duration: 0.9 }, '-=0.76')
    .from(pills, { y: 16, opacity: 0, stagger: 0.05, duration: 0.48 }, '-=0.55')
    .from(rows, { x: 18, opacity: 0, stagger: 0.05, duration: 0.48 }, '-=0.45')
    .from(tags, { scale: 0.88, opacity: 0, stagger: 0.04, duration: 0.4 }, '-=0.35');

  floatTween = gsap.to(rail, {
    y: '+=10',
    duration: 4.4,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  });

  haloTween = halo
    ? gsap.to(halo, {
        scale: 1.08,
        opacity: 0.84,
        duration: 3.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      })
    : null;

  if (ctaArrow) {
    gsap.to(ctaArrow, {
      x: 4,
      duration: 0.9,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  rail.addEventListener('mouseenter', () => {
    marqueeTween?.timeScale(1.9);
    floatTween?.timeScale(1.25);
    haloTween?.timeScale(1.4);
    gsap.to(tags, {
      y: -2,
      borderColor: 'rgba(197, 160, 23, 0.34)',
      color: 'rgba(240, 237, 227, 0.96)',
      stagger: 0.02,
      duration: 0.22,
      overwrite: 'auto'
    });
    gsap.to(pills, {
      borderColor: 'rgba(16, 181, 167, 0.34)',
      y: -1,
      stagger: 0.02,
      duration: 0.22,
      overwrite: 'auto'
    });
  });

  rail.addEventListener('mouseleave', () => {
    marqueeTween?.timeScale(1);
    floatTween?.timeScale(1);
    haloTween?.timeScale(1);
    gsap.to(tags, {
      y: 0,
      borderColor: 'rgba(197, 160, 23, 0.18)',
      color: 'var(--coherence-emerald)',
      stagger: 0.015,
      duration: 0.28,
      overwrite: 'auto'
    });
    gsap.to(pills, {
      y: 0,
      borderColor: 'rgba(197, 160, 23, 0.18)',
      stagger: 0.015,
      duration: 0.28,
      overwrite: 'auto'
    });
  });
}
