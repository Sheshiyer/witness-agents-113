/*
 * newsletter.js — direct-contact form.
 *  • Validates client-side (HTML5 + simple regex)
 *  • Opens the user's mail client instead of POSTing to a placeholder endpoint
 *  • Loading / success / error states surfaced via [data-state]
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAILTO_BASE = 'mailto:hello@tryambakam.space?subject=Witness%20Agents%20%E2%80%94%20direct%20note';

export default function initNewsletter() {
  const form = document.querySelector('[data-newsletter]');
  if (!form) return;

  const input = form.querySelector('.signal__input');
  const status = form.querySelector('.signal__status');
  const submit = form.querySelector('.signal__submit');
  if (!input || !status || !submit) return;

  const setStatus = (state, message) => {
    status.dataset.state = state;
    status.textContent = message;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = input.value.trim();

    // Validate
    if (!EMAIL_RE.test(email)) {
      input.setAttribute('aria-invalid', 'true');
      setStatus('error', 'enter a valid email — practitioner@example.com');
      input.focus();
      return;
    }

    input.removeAttribute('aria-invalid');
    submit.disabled = true;
    setStatus('loading', 'opening your mail client...');

    const body = encodeURIComponent(`Reply-to: ${email}\n\n`);
    window.location.href = `${MAILTO_BASE}&body=${body}`;
    setStatus('success', 'mail client opened. if nothing happened, write to hello@tryambakam.space.');
    submit.disabled = false;
  });

  // Clear error state on focus
  input.addEventListener('focus', () => {
    if (input.getAttribute('aria-invalid') === 'true') {
      input.removeAttribute('aria-invalid');
      setStatus('', '');
    }
  });
}
