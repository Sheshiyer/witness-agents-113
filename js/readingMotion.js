import { gsap, ScrollTrigger } from './lib/gsapSetup.js';

let motionContext = null;
const headingRestores = new Set();

const MOTION_CLEAR_SELECTOR = [
  '.reading-frame',
  '.reading-hero',
  '.reading-kicker',
  '.reading-title',
  '.reading-intro',
  '.reading-status',
  '.reading-promo-badge',
  '.reading-chip',
  '.reading-map',
  '.reading-map__link',
  '.reading-panel',
  '.reading-empty',
  '.reading-label',
  '.reading-panel__title',
  '.reading-panel__meta',
  '.reading-copy',
  '.reading-bullet-list__item',
  '.reading-trace-copy',
  '.reading-engine-card',
  '.reading-engine-card__summary-copy',
  '.reading-engine-card__route',
  '.reading-section__lede',
  '.reading-panel__link',
  '.reading-inspection__summary',
  '.reading-appendix__summary',
  '.reading-motion-word-inner'
].join(', ');

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  document.documentElement.dataset.motion === 'reduced';

const visibleNodes = (nodes) =>
  nodes.filter((node) => node && !node.hidden && node.getClientRects().length > 0);

const restoreSplitHeadings = () => {
  headingRestores.forEach((restore) => restore());
  headingRestores.clear();
};

const clearAnimatedStyles = (root) => {
  const nodes = root.querySelectorAll(MOTION_CLEAR_SELECTOR);
  if (nodes.length) gsap.set(nodes, { clearProps: 'all' });
};

const splitHeading = (node) => {
  if (!node) return [];

  const original = node.textContent.trim();
  if (!original) return [];

  node.dataset.motionOriginalText = original;
  node.dataset.motionSplit = 'true';
  node.setAttribute('aria-label', original);
  node.textContent = '';

  const words = original.split(/\s+/).filter(Boolean);
  const fragment = document.createDocumentFragment();

  words.forEach((word, index) => {
    const outer = document.createElement('span');
    outer.className = 'reading-motion-word';
    outer.setAttribute('aria-hidden', 'true');

    const inner = document.createElement('span');
    inner.className = 'reading-motion-word-inner';
    inner.textContent = word;

    outer.append(inner);
    fragment.append(outer);

    if (index < words.length - 1) fragment.append(document.createTextNode(' '));
  });

  node.append(fragment);

  const restore = () => {
    if (!node.isConnected) return;
    node.textContent = original;
    node.removeAttribute('aria-label');
    delete node.dataset.motionOriginalText;
    delete node.dataset.motionSplit;
  };

  headingRestores.add(restore);
  return Array.from(node.querySelectorAll('.reading-motion-word-inner'));
};

const filterClosedDetails = (nodes) =>
  nodes.filter((node) => {
    const details = node.closest('details');
    return !details || details.open || node.matches('summary');
  });

const animateOnReveal = (trigger, start, build) => {
  let played = false;

  ScrollTrigger.create({
    trigger,
    start,
    onEnter: () => {
      if (played) return;
      played = true;
      build();
    },
    onEnterBack: () => {
      if (played) return;
      played = true;
      build();
    }
  });
};

const activateMapLink = (root, targetId, label) => {
  root.querySelectorAll('.reading-map__link').forEach((link) => {
    link.dataset.active = link.dataset.targetId === targetId ? 'true' : 'false';
  });

  const progressText = root.querySelector('[data-reading-progress-text]');
  if (progressText && label) progressText.textContent = `Current turn: ${label}`;
};

const initReadingMapSignals = (root) => {
  const map = root.querySelector('[data-reading-map]');
  if (!map || map.hidden) return;

  const progressBar = map.querySelector('[data-reading-progress-bar]');
  const links = Array.from(map.querySelectorAll('.reading-map__link'));
  if (!links.length) return;

  if (progressBar) {
    gsap.set(progressBar, {
      scaleX: 0.04,
      transformOrigin: '0 50%'
    });
  }

  const content = root.querySelector('.reading-stack') || root;
  ScrollTrigger.create({
    trigger: content,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      if (!progressBar) return;
      gsap.set(progressBar, { scaleX: Math.max(0.04, self.progress) });
    }
  });

  links.forEach((link, index) => {
    const targetId = link.dataset.targetId;
    if (!targetId) return;

    const target = root.querySelector(`#${targetId}`);
    if (!target) return;

    const label = link.textContent.trim();
    if (index === 0) activateMapLink(root, targetId, label);

    ScrollTrigger.create({
      trigger: target,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => activateMapLink(root, targetId, label),
      onEnterBack: () => activateMapLink(root, targetId, label)
    });
  });
};

const animateHero = (root) => {
  const frame = root.querySelector('.reading-frame');
  const hero = root.querySelector('.reading-hero');
  if (!hero) return;

  const kicker = hero.querySelector('.reading-kicker');
  const titleWords = splitHeading(hero.querySelector('.reading-title'));
  const intro = hero.querySelector('.reading-intro');
  const status = hero.querySelector('.reading-status');
  const badges = visibleNodes(Array.from(hero.querySelectorAll('.reading-promo-badge')));
  const chips = visibleNodes(Array.from(hero.querySelectorAll('.reading-chip')));
  const map = root.querySelector('.reading-map:not([hidden])');

  const tl = gsap.timeline({ defaults: { ease: 'growth' } });

  if (frame) {
    tl.from(frame, {
      opacity: 0,
      y: 18,
      duration: 0.82
    });
  }

  if (kicker) {
    tl.from(
      kicker,
      {
        opacity: 0,
        y: 18,
        duration: 0.68
      },
      '-=0.44'
    );
  }

  if (titleWords.length) {
    tl.from(
      titleWords,
      {
        opacity: 0,
        yPercent: 108,
        rotateX: -72,
        transformOrigin: '50% 100%',
        duration: 0.98,
        stagger: 0.05
      },
      '-=0.28'
    );
  }

  if (intro) {
    tl.from(
      intro,
      {
        opacity: 0,
        y: 20,
        duration: 0.86
      },
      '-=0.64'
    );
  }

  if (status) {
    tl.from(
      status,
      {
        opacity: 0,
        y: 14,
        duration: 0.68
      },
      '-=0.66'
    );
  }

  if (badges.length) {
    tl.from(
      badges,
      {
        opacity: 0,
        y: 12,
        duration: 0.62,
        stagger: 0.08
      },
      '-=0.54'
    );
  }

  if (chips.length) {
    tl.from(
      chips,
      {
        opacity: 0,
        y: 16,
        duration: 0.78,
        stagger: 0.06
      },
      '-=0.44'
    );
  }

  if (map) {
    tl.from(
      map,
      {
        opacity: 0,
        y: 18,
        duration: 0.82
      },
      '-=0.38'
    );
  }
};

const animateBanner = (panel) => {
  const body = panel.querySelector('p');

  animateOnReveal(panel, 'top bottom-=72', () => {
    const tl = gsap.timeline({ defaults: { ease: 'growth' } });

    tl.from(panel, {
      opacity: 0,
      y: 24,
      duration: 0.84
    });

    if (body) {
      tl.from(
        body,
        {
          opacity: 0,
          y: 12,
          duration: 0.64
        },
        '-=0.52'
      );
    }
  });
};

const animatePanel = (panel) => {
  const label = panel.querySelector('.reading-label');
  const titleWords = visibleNodes(
    Array.from(panel.querySelectorAll('.reading-panel__title, .reading-empty__title')).flatMap((node) => splitHeading(node))
  );
  const meta = visibleNodes(Array.from(panel.querySelectorAll('.reading-panel__meta')));
  const support = visibleNodes(
    Array.from(panel.querySelectorAll('.reading-engine-card__route, .reading-evidence-card__engine, .reading-panel__link'))
  );
  const bodyItems = filterClosedDetails(
    visibleNodes(
      Array.from(
        panel.querySelectorAll(
          '.reading-section__lede, .reading-copy, .reading-list__item, .reading-chip, .reading-token, .reading-evidence-card, .reading-trace-copy, .reading-engine-card, .reading-engine-card__summary-copy, .reading-practice-step, .reading-endcap__copy, .reading-endcap__actions, .reading-inspection__summary, .reading-appendix__summary, .reading-empty__body, .reading-empty__cta'
        )
      )
    )
  );

  animateOnReveal(panel, 'top bottom-=96', () => {
    const tl = gsap.timeline({ defaults: { ease: 'growth' } });

    tl.from(panel, {
      opacity: 0,
      y: 32,
      duration: 0.92
    });

    if (label) {
      tl.from(
        label,
        {
          opacity: 0,
          y: 12,
          duration: 0.56
        },
        '-=0.68'
      );
    }

    if (titleWords.length) {
      tl.from(
        titleWords,
        {
          opacity: 0,
          yPercent: 108,
          rotateX: -70,
          transformOrigin: '50% 100%',
          duration: 0.82,
          stagger: 0.035
        },
        '-=0.44'
      );
    }

    if (meta.length) {
      tl.from(
        meta,
        {
          opacity: 0,
          y: 10,
          duration: 0.54,
          stagger: 0.04
        },
        '-=0.58'
      );
    }

    if (support.length) {
      tl.from(
        support,
        {
          opacity: 0,
          y: 10,
          duration: 0.52,
          stagger: 0.04
        },
        '<'
      );
    }

    if (bodyItems.length) {
      tl.from(
        bodyItems,
        {
          opacity: 0,
          y: 18,
          duration: 0.74,
          stagger: panel.querySelector('.reading-engine-card') ? 0.06 : 0.05
        },
        '-=0.36'
      );
    }
  });
};

export const initReadingMotion = () => {
  const root = document.querySelector('.reading-shell');
  if (!root) return;

  motionContext?.revert();
  motionContext = null;
  restoreSplitHeadings();
  clearAnimatedStyles(root);

  motionContext = gsap.context(() => {
    initReadingMapSignals(root);

    if (prefersReducedMotion()) return;

    animateHero(root);

    visibleNodes(
      Array.from(
        root.querySelectorAll(
          '.reading-stack > .reading-banner, .reading-stack .reading-panel, .reading-empty'
        )
      )
    ).forEach((panel) => {
      if (panel.classList.contains('reading-banner')) {
        animateBanner(panel);
        return;
      }

      animatePanel(panel);
    });
  }, root);

  requestAnimationFrame(() => ScrollTrigger.refresh());
};
