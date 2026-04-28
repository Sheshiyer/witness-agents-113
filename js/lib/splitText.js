/*
 * splitText.js — DIY char-split (avoids paid GSAP SplitText plugin)
 * Wraps each char of the target in <span class="char">.
 * Preserves whitespace via &nbsp;.
 */

export const splitChars = (el, opts = {}) => {
  if (!el) return [];
  const { className = 'char', preserveWhitespace = true } = opts;
  const text = el.textContent;
  if (!text) return [];

  const chars = [];
  el.textContent = '';

  for (const ch of text) {
    if (ch === ' ' && preserveWhitespace) {
      el.appendChild(document.createTextNode(' '));
      continue;
    }
    const span = document.createElement('span');
    span.className = className;
    span.textContent = ch;
    span.style.display = 'inline-block';
    el.appendChild(span);
    chars.push(span);
  }

  return chars;
};

export const splitWords = (el) => {
  if (!el) return [];
  const text = el.textContent;
  if (!text) return [];
  el.textContent = '';

  return text.split(/(\s+)/).map((segment) => {
    if (/^\s+$/.test(segment)) {
      el.appendChild(document.createTextNode(' '));
      return null;
    }
    const span = document.createElement('span');
    span.className = 'word';
    span.style.display = 'inline-block';
    span.textContent = segment;
    el.appendChild(span);
    return span;
  }).filter(Boolean);
};
