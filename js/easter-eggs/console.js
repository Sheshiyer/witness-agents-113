/*
 * console.js — DevTools breadcrumb (L1)
 * Trishul ASCII + funnel destinations + initiation hint.
 */

export const greet = () => {
  const STYLE_GOLD = 'color: #C5A017; font-family: monospace; font-weight: bold;';
  const STYLE_PARCH = 'color: #F0EDE3; font-family: monospace;';
  const STYLE_MUTED = 'color: #8A9BA8; font-family: monospace; font-style: italic;';
  const STYLE_VIOLET = 'color: #2D0050; font-family: monospace;'; // not visible on dark term, intentional

  console.log('%cwitness mode active', STYLE_GOLD);
  console.log(
    '%c\n         /\\\n        /  \\\n       /----\\\n      / |  | \\\n        |  |\n        |  |        TRYAMBAKAM NOESIS\n        |__|        Self-Consciousness as Technology\n',
    STYLE_PARCH
  );
  console.log('%c> noesis-tui  : github.com/Sheshiyer/Selemene-engine', STYLE_PARCH);
  console.log('%c> selemene    : selemene.tryambakam.space', STYLE_PARCH);
  console.log('%c> the canticle: 1319.tryambakam.space', STYLE_PARCH);
  console.log('%c> the field   : tryambakam.space', STYLE_PARCH);
  console.log('%c\n(one field. nine coordinates. count again.)\n', STYLE_MUTED);
  console.log('%c[hint] try typing.', STYLE_MUTED);
};
