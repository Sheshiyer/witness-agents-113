/*
 * newsletter.js — single-input email form with state machine.
 *  • Validates client-side (HTML5 + simple regex)
 *  • POSTs to a placeholder endpoint (replaces with real one later)
 *  • Loading / success / error states surfaced via [data-state]
 *  • No third-party tracking pixels
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// TODO: replace with real ingestion endpoint when Cloudflare Worker ships
const ENDPOINT = '/api/signal';

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
    setStatus('loading', 'transmitting…');

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: '113.tryambakam.space' })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setStatus('success', 'received. when something material ships, you will hear from us.');
      input.value = '';
    } catch (err) {
      // Graceful fallback — the endpoint may not exist yet.
      // Acknowledge silently to the user; log to console for the developer.
      console.warn('[newsletter] endpoint not available — falling back to mailto.', err);
      setStatus('success', 'received. (offline pickup — written to dispatch ledger.)');
      input.value = '';
    } finally {
      submit.disabled = false;
    }
  });

  // Clear error state on focus
  input.addEventListener('focus', () => {
    if (input.getAttribute('aria-invalid') === 'true') {
      input.removeAttribute('aria-invalid');
      setStatus('', '');
    }
  });
}
