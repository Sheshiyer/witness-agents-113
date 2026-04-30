const WITNESS_ORIGIN = 'https://48.tryambakam.space';
const DAILY_WITNESS_WORKFLOW_URL = `${WITNESS_ORIGIN}/api/v1/workflows/daily-practice/execute`;
const STORAGE_KEY = 'witness-agents.daily-witness-form';

const titleCase = (value = '') =>
  value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const textValue = (value) => (typeof value === 'string' ? value.trim() : '');

const firstFilledText = (...values) => {
  for (const value of values) {
    const text = textValue(value);
    if (text) return text;
  }
  return '';
};

const splitWitnessResponse = (value) => {
  const text = textValue(value);
  if (!text) return { title: '', body: '' };

  const paragraphs = text
    .split(/\n\s*\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (!paragraphs.length) return { title: text, body: '' };

  const [title, ...rest] = paragraphs;

  return {
    title: title.replace(/\s*\n\s*/g, ' '),
    body: rest.join('\n\n')
  };
};

const formatLatency = (value) => {
  const parsed = typeof value === 'number' ? value : Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) return '0ms';
  if (parsed < 1) return '<1ms';
  if (parsed < 10) return `${parsed.toFixed(1)}ms`;
  return `${Math.round(parsed)}ms`;
};

const buildWitnessPoints = (witnessLayer, engineResults) => {
  const engineCount = Object.keys(engineResults).length;

  return [
    {
      label: 'Routing',
      value: titleCase(witnessLayer.routing_mode || 'daily-practice'),
      emphasis: true
    },
    {
      label: 'Cadence',
      value: titleCase(witnessLayer.response_cadence || 'immediate')
    },
    {
      label: 'Tier',
      value: titleCase(witnessLayer.tier || 'initiate')
    },
    {
      label: 'Kosha',
      value: titleCase(witnessLayer.kosha_depth || 'anandamaya')
    },
    {
      label: 'Clifford',
      value: witnessLayer.clifford_level ? String(witnessLayer.clifford_level) : ''
    },
    {
      label: 'Mirrors',
      value: engineCount ? `${engineCount} active` : ''
    }
  ].filter((point) => textValue(point.value));
};

const readStoredValues = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

const writeStoredValues = (form) => {
  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore persistence failures.
  }
};

const setStatus = (node, message, state = '') => {
  if (!node) return;
  node.textContent = message;
  node.classList.remove('is-error', 'is-success', 'is-loading');
  if (state) node.classList.add(`is-${state}`);
};

const createPointNode = (point) => {
  const item = document.createElement('div');
  item.className = `signal__point${point.emphasis ? ' is-emphasis' : ''}`;

  const label = document.createElement('span');
  label.className = 'signal__point-label';
  label.textContent = point.label;

  const value = document.createElement('span');
  value.className = 'signal__point-value';
  value.textContent = point.value;

  item.append(label, value);
  return item;
};

export default function initAgentAccess({ reduced }) {
  const section = document.querySelector('#signal');
  const root = section?.querySelector('[data-agent-access]');
  if (!section || !root) return;

  const tabs = Array.from(root.querySelectorAll('[data-signal-tab]'));
  const panels = Array.from(root.querySelectorAll('[data-signal-panel]'));
  const triggers = Array.from(document.querySelectorAll('[data-agent-access-trigger]'));

  const form = root.querySelector('[data-witness-form]');
  const submitButton = form?.querySelector('button[type="submit"]');
  const statusNode = root.querySelector('[data-witness-status]');
  const resultNode = root.querySelector('[data-witness-result]');
  const birthDateInput = form?.elements.namedItem('birth_date');
  const timezoneInput = form?.elements.namedItem('timezone');
  const latitudeInput = form?.elements.namedItem('latitude');
  const longitudeInput = form?.elements.namedItem('longitude');
  const advancedDetails = root.querySelector('.signal__advanced');

  const resultRefs = {
    engine: root.querySelector('[data-witness-engine]'),
    headline: root.querySelector('[data-witness-headline]'),
    next: root.querySelector('[data-witness-next]'),
    layer: root.querySelector('[data-witness-layer]'),
    visits: root.querySelector('[data-witness-visits]'),
    streak: root.querySelector('[data-witness-streak]'),
    latency: root.querySelector('[data-witness-latency]'),
    question: root.querySelector('[data-witness-question]'),
    points: root.querySelector('[data-witness-points]'),
    engines: root.querySelector('[data-witness-engines]'),
    platform: root.querySelector('[data-witness-platform]')
  };

  const hideResult = () => {
    if (resultNode) resultNode.hidden = true;
  };

  const focusDailyInput = () => {
    window.setTimeout(() => {
      if (birthDateInput instanceof HTMLElement) {
        birthDateInput.focus({ preventScroll: true });
      }
    }, reduced ? 0 : 260);
  };

  const activateTab = (key) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.signalTab === key;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.signalPanel !== key;
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      activateTab(tab.dataset.signalTab);
    });

    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (index + direction + tabs.length) % tabs.length;
      const nextTab = tabs[nextIndex];
      activateTab(nextTab.dataset.signalTab);
      nextTab.focus();
    });
  });

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      const key = trigger.dataset.agentAccessTrigger || 'daily';
      event.preventDefault();
      activateTab(key);
      section.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      if (key === 'daily') {
        focusDailyInput();
      }
    });
  });

  if (form) {
    const stored = readStoredValues();
    Array.from(form.elements).forEach((element) => {
      if (!(element instanceof HTMLInputElement)) return;
      const storedValue = stored[element.name];
      if (typeof storedValue === 'string' && storedValue) {
        element.value = storedValue;
      }
      element.addEventListener('change', () => writeStoredValues(form));
    });

    if (timezoneInput instanceof HTMLInputElement && !timezoneInput.value) {
      timezoneInput.value = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const birthDate = textValue(formData.get('birth_date'));
      if (!birthDate) {
        hideResult();
        setStatus(statusNode, 'Birth date is required for the public witness route.', 'error');
        if (birthDateInput instanceof HTMLElement) birthDateInput.focus();
        return;
      }

      const timezone = textValue(formData.get('timezone'));
      if (!timezone) {
        hideResult();
        setStatus(statusNode, 'Timezone is required for the interpreted witness route.', 'error');
        if (timezoneInput instanceof HTMLElement) timezoneInput.focus();
        return;
      }

      const latitude = textValue(formData.get('latitude'));
      const longitude = textValue(formData.get('longitude'));
      if (!latitude || !longitude) {
        hideResult();
        setStatus(statusNode, 'Latitude and longitude are required for the interpreted witness route.', 'error');
        if (advancedDetails instanceof HTMLDetailsElement) advancedDetails.open = true;
        const firstMissing = !latitude ? latitudeInput : longitudeInput;
        if (firstMissing instanceof HTMLElement) firstMissing.focus();
        return;
      }

      const parsedLatitude = Number(latitude);
      const parsedLongitude = Number(longitude);
      if (!Number.isFinite(parsedLatitude) || !Number.isFinite(parsedLongitude)) {
        hideResult();
        setStatus(statusNode, 'Latitude and longitude must be valid numbers.', 'error');
        if (advancedDetails instanceof HTMLDetailsElement) advancedDetails.open = true;
        if (latitudeInput instanceof HTMLElement) latitudeInput.focus();
        return;
      }

      const payload = {
        birth_data: {
          date: birthDate,
          timezone,
          latitude: parsedLatitude,
          longitude: parsedLongitude
        }
      };

      const birthTime = textValue(formData.get('birth_time'));
      if (birthTime) payload.birth_data.time = birthTime;

      const name = textValue(formData.get('name'));
      if (name) payload.birth_data.name = name;

      writeStoredValues(form);
      hideResult();
      submitButton?.setAttribute('disabled', 'disabled');
      setStatus(statusNode, 'Consulting the witness…', 'loading');

      try {
        const response = await fetch(DAILY_WITNESS_WORKFLOW_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const body = await response.json().catch(() => null);
        if (!response.ok || !body?.witness_layer) {
          const message = body?.error || body?.message || `Witness request failed with ${response.status}.`;
          throw new Error(message);
        }

        const witnessLayer = body.witness_layer || {};
        const decoderState = witnessLayer.decoder_state || {};
        const engineResults =
          body.engine_results && typeof body.engine_results === 'object' ? body.engine_results : {};
        const engines = Object.keys(engineResults)
          .map(titleCase)
          .join(' · ');
        const responseText = firstFilledText(witnessLayer.response, witnessLayer.synthesis);
        const { title, body: responseBody } = splitWitnessResponse(responseText);
        const points = buildWitnessPoints(witnessLayer, engineResults);
        const mirrorCount =
          Array.isArray(witnessLayer.enriched_engines) && witnessLayer.enriched_engines.length
            ? witnessLayer.enriched_engines.length
            : Object.keys(engineResults).length;

        if (resultRefs.engine) {
          resultRefs.engine.textContent = `Workflow · ${titleCase(body.workflow_id || 'daily-practice')}`;
        }
        if (resultRefs.headline) {
          resultRefs.headline.textContent = title || 'Witness response ready.';
        }
        if (resultRefs.next) {
          resultRefs.next.textContent = mirrorCount ? `${mirrorCount} mirrors enriched` : 'Witness workflow';
        }
        if (resultRefs.layer) resultRefs.layer.textContent = String(witnessLayer.max_layer_unlocked || 0);
        if (resultRefs.visits) resultRefs.visits.textContent = String(decoderState.total_visits || 0);
        if (resultRefs.streak) resultRefs.streak.textContent = String(decoderState.consecutive_days || 0);
        if (resultRefs.latency) resultRefs.latency.textContent = formatLatency(body.total_time_ms);
        if (resultRefs.question) {
          const renderedResponse = responseBody || responseText;
          resultRefs.question.hidden = !renderedResponse;
          resultRefs.question.textContent = renderedResponse;
        }
        if (resultRefs.points) {
          resultRefs.points.innerHTML = '';
          points.forEach((point) => resultRefs.points.append(createPointNode(point)));
        }
        if (resultRefs.engines) {
          resultRefs.engines.textContent = engines
            ? `Mirrors interpreted: ${engines}.`
            : 'Mirrors interpreted: Daily Practice.';
        }
        if (resultRefs.platform && typeof body.full_platform_url === 'string' && body.full_platform_url) {
          resultRefs.platform.href = body.full_platform_url;
        }

        if (resultNode) {
          resultNode.hidden = false;
        }

        setStatus(statusNode, 'Witness workflow returned from 48.tryambakam.space.', 'success');
      } catch (error) {
        hideResult();
        const message = error instanceof Error ? error.message : 'Witness request failed.';
        setStatus(statusNode, message, 'error');
      } finally {
        submitButton?.removeAttribute('disabled');
      }
    });
  }

  activateTab('daily');
}
