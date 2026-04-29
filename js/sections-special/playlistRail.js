export default function initPlaylistRail({ gsap, reduced }) {
  const rail = document.querySelector('[data-playlist-rail]');
  const shell = rail?.querySelector('[data-playlist-shell]');
  const toggle = rail?.querySelector('[data-playlist-toggle]');
  const panel = rail?.querySelector('.playlist-rail__panel');
  const marquee = rail?.querySelector('[data-playlist-marquee]');
  const halo = rail?.querySelector('.playlist-rail__halo');
  const ctaArrow = rail?.querySelector('.playlist-rail__cta-arrow');

  if (!rail || !shell || !toggle || !panel) return;

  const titleLines = rail.querySelectorAll('.playlist-rail__title-line');
  const pills = rail.querySelectorAll('.playlist-rail__pill');
  const tags = rail.querySelectorAll('.playlist-rail__tag');
  const rows = rail.querySelectorAll('.playlist-rail__row');
  const summaryBits = rail.querySelectorAll(
    '.playlist-rail__summary-kicker, .playlist-rail__summary-title, .playlist-rail__summary-spine, .playlist-rail__summary-arrow'
  );

  const collapsedLabel = 'Expand Spotify playlist panel';
  const expandedLabel = 'Collapse Spotify playlist panel';

  let marqueeTween = null;
  let floatTween = null;
  let haloTween = null;
  let ctaArrowTween = null;
  let openTimeline = null;
  let motionReady = false;

  const syncExpandedState = () => {
    const expanded = shell.open;
    rail.dataset.expanded = expanded ? 'true' : 'false';
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.setAttribute('aria-label', expanded ? expandedLabel : collapsedLabel);
  };

  const syncAnimatedState = (expanded) => {
    marqueeTween?.paused(!expanded);
    haloTween?.paused(!expanded);
    ctaArrowTween?.paused(!expanded);
  };

  const setupExpandedMotion = () => {
    if (reduced || !gsap || motionReady || !shell.open) return;

    if (marquee && marquee.children.length) {
      if (!marquee.dataset.looped) {
        marquee.innerHTML += marquee.innerHTML;
        marquee.dataset.looped = 'true';
      }

      const originalHeight = marquee.scrollHeight / 2;
      if (originalHeight > 0) {
        marqueeTween = gsap.fromTo(
          marquee,
          { y: 0 },
          {
            y: -originalHeight,
            duration: 22,
            ease: 'none',
            repeat: -1,
            paused: true
          }
        );
      }
    }

    haloTween = halo
      ? gsap.to(halo, {
          scale: 1.08,
          opacity: 0.84,
          duration: 3.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          paused: true
        })
      : null;

    ctaArrowTween = ctaArrow
      ? gsap.to(ctaArrow, {
          x: 4,
          duration: 0.9,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          paused: true
        })
      : null;

    motionReady = true;
  };

  const animateOpen = () => {
    if (reduced || !gsap || !shell.open) return;

    setupExpandedMotion();
    if (!motionReady) return;

    openTimeline?.kill();
    gsap.killTweensOf([panel, titleLines, pills, rows, tags]);
    gsap.set(titleLines, { transformOrigin: '0% 100%' });

    openTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    openTimeline
      .fromTo(panel, { autoAlpha: 0, x: 18 }, { autoAlpha: 1, x: 0, duration: 0.38, clearProps: 'opacity,visibility,transform' }, 0)
      .from(titleLines, { yPercent: 120, rotateX: -48, opacity: 0, stagger: 0.08, duration: 0.82 }, 0.04)
      .from(pills, { y: 12, opacity: 0, stagger: 0.04, duration: 0.42 }, 0.16)
      .from(rows, { x: 18, opacity: 0, stagger: 0.04, duration: 0.42 }, 0.22)
      .from(tags, { scale: 0.88, opacity: 0, stagger: 0.03, duration: 0.34 }, 0.28);
  };

  const closeRail = () => {
    if (!shell.open) return;
    shell.open = false;
  };

  shell.addEventListener('toggle', () => {
    syncExpandedState();

    if (reduced || !gsap) return;

    if (shell.open) {
      requestAnimationFrame(() => {
        setupExpandedMotion();
        syncAnimatedState(true);
        animateOpen();
      });
      return;
    }

    openTimeline?.kill();
    syncAnimatedState(false);
  });

  document.addEventListener('click', (event) => {
    if (!shell.open) return;
    if (rail.contains(event.target)) return;
    closeRail();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !shell.open) return;
    closeRail();
  });

  syncExpandedState();

  if (!gsap || reduced) return;

  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  intro
    .from(rail, { autoAlpha: 0, x: 36, duration: 1.1 })
    .from(summaryBits, { y: 14, opacity: 0, stagger: 0.05, duration: 0.48 }, '-=0.72');

  floatTween = gsap.to(rail, {
    y: '+=10',
    duration: 4.4,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  });

  rail.addEventListener('mouseenter', () => {
    floatTween?.timeScale(1.25);
    if (!shell.open || !motionReady) return;

    marqueeTween?.timeScale(1.9);
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
    floatTween?.timeScale(1);
    if (!shell.open || !motionReady) return;

    marqueeTween?.timeScale(1);
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
