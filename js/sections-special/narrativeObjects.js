const STATE_BREAKPOINTS = [
  { max: 0.14, state: 'dormant' },
  { max: 0.34, state: 'enter' },
  { max: 0.64, state: 'lock' },
  { max: 0.86, state: 'deepen' },
  { max: Infinity, state: 'handoff' }
];

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const lerp = (start, end, progress) => start + (end - start) * progress;
const formatNumber = (value, digits = 3) => value.toFixed(digits);

const PRESETS = {
  'sigil-forge': {
    apply(instance) {
      const progress = clamp01(instance.progress);
      const align = clamp01((progress - 0.16) / 0.56);
      const energy = clamp01(Math.sin(progress * Math.PI));
      const pointerInfluence = instance.pointer.active ? 1 : 0.35;
      const pointerX = instance.pointer.x * pointerInfluence;
      const pointerY = instance.pointer.y * pointerInfluence;

      instance.root.style.setProperty('--n3d-progress', formatNumber(progress));
      instance.root.style.setProperty('--n3d-align', formatNumber(align));
      instance.root.style.setProperty('--n3d-energy', formatNumber(energy));
      instance.root.style.setProperty('--n3d-shell-scale', formatNumber(lerp(0.84, 1.02, align)));
      instance.root.style.setProperty('--n3d-shell-spin', `${lerp(-7, 7, progress).toFixed(2)}deg`);
      instance.root.style.setProperty('--n3d-depth', formatNumber(lerp(0.92, 1.08, align)));
      instance.root.style.setProperty('--n3d-overlay-opacity', formatNumber(lerp(0.26, 0.82, align)));
      instance.root.style.setProperty('--n3d-poster-opacity', formatNumber(lerp(0.88, 0.18, align)));
      instance.root.style.setProperty('--n3d-object-opacity', formatNumber(lerp(0.62, 0.98, align)));
      instance.root.style.setProperty('--n3d-still-opacity', formatNumber(lerp(0.76, 1, align)));
      instance.root.style.setProperty('--n3d-still-scale', formatNumber(lerp(0.98, 1.08, align)));
      instance.root.style.setProperty('--n3d-viewer-opacity', formatNumber(lerp(0.16, 0.58, align)));
      instance.root.style.setProperty('--n3d-grid-shift', `${lerp(-14, 18, progress).toFixed(2)}px`);
      instance.root.style.setProperty('--n3d-grid-shift-y', `${lerp(4.9, -6.3, progress).toFixed(2)}px`);
      instance.root.style.setProperty('--n3d-parallax-x', `${(pointerX * 16).toFixed(2)}px`);
      instance.root.style.setProperty('--n3d-parallax-y', `${(pointerY * 12).toFixed(2)}px`);
      instance.root.style.setProperty('--n3d-parallax-outer-x', `${(pointerX * -6.4).toFixed(2)}px`);
      instance.root.style.setProperty('--n3d-parallax-outer-y', `${(pointerY * -4.8).toFixed(2)}px`);
      instance.root.style.setProperty('--n3d-parallax-inner-x', `${(pointerX * 4.8).toFixed(2)}px`);
      instance.root.style.setProperty('--n3d-parallax-inner-y', `${(pointerY * 3.6).toFixed(2)}px`);
      instance.root.style.setProperty('--n3d-tilt-x', `${(-pointerY * 5).toFixed(2)}deg`);
      instance.root.style.setProperty('--n3d-tilt-y', `${(pointerX * 7).toFixed(2)}deg`);
      instance.root.style.setProperty('--n3d-glow-x', `${(50 + pointerX * 14).toFixed(2)}%`);
      instance.root.style.setProperty('--n3d-glow-y', `${(48 + pointerY * 12).toFixed(2)}%`);
      instance.root.style.setProperty('--n3d-glow-opacity', formatNumber(lerp(0.25, 0.99, align)));
      instance.root.style.setProperty('--n3d-grid-opacity', formatNumber(lerp(0.08, 0.3, align)));
      instance.root.style.setProperty('--n3d-shell-brightness', formatNumber(lerp(0.78, 1.06, energy)));
      instance.root.style.setProperty('--n3d-shell-saturate', formatNumber(lerp(0.9, 1.18, align)));
      instance.root.style.setProperty('--n3d-dormant-brightness', formatNumber(lerp(0.74, 0.8, align)));
      instance.root.style.setProperty('--n3d-dormant-saturate', formatNumber(lerp(0.82, 0.9, align)));
      instance.root.style.setProperty('--n3d-deepen-brightness', formatNumber(lerp(0.82, 1.16, energy)));
      instance.root.style.setProperty('--n3d-deepen-saturate', formatNumber(lerp(0.94, 1.28, align)));
      instance.root.style.setProperty('--n3d-orbit-outer-opacity', formatNumber(lerp(0.14, 0.46, align)));
      instance.root.style.setProperty('--n3d-orbit-inner-opacity', formatNumber(lerp(0.08, 0.3, energy)));
      instance.root.style.setProperty('--n3d-orbit-outer-rotate', `${(progress * 120 - 38).toFixed(2)}deg`);
      instance.root.style.setProperty('--n3d-orbit-inner-rotate', `${(-progress * 160 + 24).toFixed(2)}deg`);
      instance.root.style.setProperty('--n3d-orbit-outer-scale', formatNumber(lerp(1.02, 1.05, align)));
      instance.root.style.setProperty('--n3d-orbit-inner-scale', formatNumber(lerp(0.9, 0.95, align)));

      if (!instance.viewerLoaded || !instance.viewer) return;

      const azimuth = lerp(-24, 12, progress) + pointerX * 7;
      const polar = lerp(83, 72, align) + pointerY * 3;
      const distance = lerp(136, 112, align);
      const fieldOfView = lerp(26, 22, align);
      const exposure = lerp(0.94, 1.16, energy);

      instance.viewer.setAttribute(
        'camera-orbit',
        `${azimuth.toFixed(2)}deg ${polar.toFixed(2)}deg ${distance.toFixed(2)}%`
      );
      instance.viewer.setAttribute('field-of-view', `${fieldOfView.toFixed(2)}deg`);
      instance.viewer.setAttribute('exposure', exposure.toFixed(2));
    }
  }
};

class NarrativeObjectController {
  constructor(root, { ScrollTrigger, reduced, modelViewerReady }) {
    this.root = root;
    this.section = root.closest('[data-section]');
    this.viewer = root.querySelector('model-viewer');
    this.presetName = root.dataset.narrativePreset || '';
    this.preset = PRESETS[this.presetName];
    this.ScrollTrigger = ScrollTrigger;
    this.reduced = reduced;
    this.modelViewerReady = modelViewerReady;
    this.progress = reduced ? 0.58 : 0;
    this.pointer = { x: 0, y: 0, active: false };
    this.viewerLoaded = false;

    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerLeave = this.handlePointerLeave.bind(this);

    this.root.dataset.narrativeState = this.getStateName(this.progress);
    this.section?.setAttribute('data-narrative-state', this.root.dataset.narrativeState);

    this.setupModelLifecycle();
    this.setupPointer();
    this.setupScroll();
    this.render();
  }

  getStateName(progress) {
    const match = STATE_BREAKPOINTS.find((entry) => progress < entry.max);
    return match ? match.state : 'dormant';
  }

  setState(progress) {
    const state = this.getStateName(progress);
    this.root.dataset.narrativeState = state;
    this.section?.setAttribute('data-narrative-state', state);
  }

  setupModelLifecycle() {
    if (!this.viewer) return;

    const syncMotion = () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const manualReduced = document.documentElement.dataset.motion === 'reduced';
      const shouldReduce = this.reduced || prefersReduced || manualReduced;

      if (shouldReduce) {
        this.viewer.removeAttribute('auto-rotate');
        return;
      }

      this.viewer.setAttribute('auto-rotate', '');
    };

    this.modelViewerReady
      ?.then(() => {
        this.viewer.addEventListener('load', () => {
          this.viewerLoaded = true;
          this.root.dataset.narrativeStatus = 'ready';
          this.render();
        }, { once: true });

        this.viewer.addEventListener('error', () => {
          this.root.dataset.narrativeStatus = 'error';
        });

        syncMotion();

        this.motionObserver = new MutationObserver(() => {
          syncMotion();
          this.render();
        });

        this.motionObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['data-motion']
        });
      })
      .catch(() => {
        this.root.dataset.narrativeStatus = 'error';
      });
  }

  setupPointer() {
    if (this.reduced) return;
    if (window.matchMedia('(hover: none)').matches) return;

    this.root.addEventListener('pointermove', this.handlePointerMove, { passive: true });
    this.root.addEventListener('pointerleave', this.handlePointerLeave);
  }

  handlePointerMove(event) {
    const rect = this.root.getBoundingClientRect();
    const normalizedX = clamp01((event.clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = clamp01((event.clientY - rect.top) / rect.height) * 2 - 1;

    this.pointer = {
      x: normalizedX,
      y: normalizedY,
      active: true
    };

    this.render();
  }

  handlePointerLeave() {
    this.pointer = { x: 0, y: 0, active: false };
    this.render();
  }

  setupScroll() {
    if (!this.ScrollTrigger || !this.section) return;

    if (this.reduced) {
      this.setState(this.progress);
      return;
    }

    this.scrollTrigger = this.ScrollTrigger.create({
      trigger: this.section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        this.progress = self.progress;
        this.setState(this.progress);
        this.render();
      }
    });
  }

  render() {
    if (!this.preset) return;
    this.preset.apply(this);
  }
}

export default function initNarrativeObjects({ ScrollTrigger, reduced, modelViewerReady }) {
  const roots = Array.from(document.querySelectorAll('[data-narrative-object]'));
  if (!roots.length) return [];

  return roots
    .map((root) => new NarrativeObjectController(root, { ScrollTrigger, reduced, modelViewerReady }))
    .filter(Boolean);
}
