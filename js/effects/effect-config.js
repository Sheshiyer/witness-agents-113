export const getRevealBlockFadeOpacity = (wrapElement, fallback = 0.82) => {
  const scope = wrapElement.closest('.content') ?? wrapElement;
  const raw = getComputedStyle(scope).getPropertyValue('--block-scroll-opacity').trim();
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : fallback;
};
