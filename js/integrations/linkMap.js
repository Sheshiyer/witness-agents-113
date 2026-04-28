/*
 * linkMap.js — single source of truth for all inward-funnel destinations
 * DESIGN.md §9.
 */

export const LINK_MAP = Object.freeze({
  parent: {
    label: 'tryambakam.space',
    url: 'https://tryambakam.space',
    role: 'parent · the field'
  },
  selemene: {
    label: 'selemene',
    url: 'https://selemene.tryambakam.space',
    role: 'sixteen engines · API'
  },
  canticle: {
    label: '1319',
    url: 'https://1319.tryambakam.space',
    role: 'the canticle · 27 chapters · biorhythm-synchronized'
  },
  research: {
    label: 'research',
    url: 'https://18765.tryambakam.space/research',
    role: 'research library'
  },
  maps: {
    label: 'maps',
    url: 'https://18765.tryambakam.space/maps',
    role: 'orientation routes'
  },
  noesisTui: {
    label: 'noesis',
    url: 'https://github.com/Sheshiyer/Selemene-engine',
    role: 'terminal interface'
  },
  somaticRepo: {
    label: 'somatic-canticles',
    url: 'https://github.com/Sheshiyer/Somatic-Canticles',
    role: 'canticle source'
  }
});

export const getLink = (key) => LINK_MAP[key];
