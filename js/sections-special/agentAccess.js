import {
  DAILY_WITNESS_WORKFLOW_URL,
  firstFilledText,
  getWitnessLocation,
  getWitnessLocationGroups,
  readWitnessForm,
  splitWitnessResponse,
  textValue,
  writeWitnessForm,
  writeWitnessReading
} from '../lib/witnessAccess.js';

const setStatus = (node, message, state = '') => {
  if (!node) return;
  node.textContent = message;
  node.classList.remove('is-error', 'is-success', 'is-loading');
  if (state) node.classList.add(`is-${state}`);
};

const renderLocationOptions = (select, selectedKey = '') => {
  if (!(select instanceof HTMLSelectElement)) return;

  select.innerHTML = '';

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = 'Select a city';
  select.append(placeholder);

  getWitnessLocationGroups().forEach((group) => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = group.label;

    group.locations.forEach((location) => {
      const option = document.createElement('option');
      option.value = location.key;
      option.textContent = location.label;
      option.selected = selectedKey === location.key;
      optgroup.append(option);
    });

    select.append(optgroup);
  });
};

const updateLocationMeta = (node, location) => {
  if (!node) return;

  if (!location) {
    node.textContent = 'Choose the closest city. The site maps timezone and coordinates to the witness API for you.';
    return;
  }

  node.textContent = `${location.label} maps to ${location.timezone}. Coordinates are passed to the API automatically.`;
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
  const birthDateInput = form?.elements.namedItem('birth_date');
  const locationSelect = form?.elements.namedItem('location_key');
  const locationMetaNode = root.querySelector('[data-witness-location-meta]');

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
      if (key === 'daily') focusDailyInput();
    });
  });

  if (form) {
    const stored = readWitnessForm();

    if (locationSelect instanceof HTMLSelectElement) {
      renderLocationOptions(locationSelect, textValue(stored.location_key));
      updateLocationMeta(locationMetaNode, getWitnessLocation(locationSelect.value));
      locationSelect.addEventListener('change', () => {
        updateLocationMeta(locationMetaNode, getWitnessLocation(locationSelect.value));
      });
    }

    Array.from(form.elements).forEach((element) => {
      if (!(element instanceof HTMLInputElement || element instanceof HTMLSelectElement)) return;
      const storedValue = stored[element.name];
      if (typeof storedValue === 'string' && storedValue) {
        element.value = storedValue;
      }
      element.addEventListener('change', () => {
        const payload = Object.fromEntries(new FormData(form).entries());
        writeWitnessForm(payload);
      });
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const birthDate = textValue(formData.get('birth_date'));
      if (!birthDate) {
        setStatus(statusNode, 'Birth date is required for the public witness route.', 'error');
        if (birthDateInput instanceof HTMLElement) birthDateInput.focus();
        return;
      }

      const locationKey = textValue(formData.get('location_key'));
      const location = getWitnessLocation(locationKey);
      if (!location) {
        setStatus(statusNode, 'Choose a birth location before opening the witness reading.', 'error');
        if (locationSelect instanceof HTMLElement) locationSelect.focus();
        return;
      }

      const payload = {
        birth_data: {
          date: birthDate,
          timezone: location.timezone,
          latitude: location.latitude,
          longitude: location.longitude
        }
      };

      const birthTime = textValue(formData.get('birth_time'));
      if (birthTime) payload.birth_data.time = birthTime;

      const name = textValue(formData.get('name'));
      if (name) payload.birth_data.name = name;

      const storedForm = {
        birth_date: birthDate,
        birth_time: birthTime,
        name,
        location_key: location.key
      };

      writeWitnessForm(storedForm);
      submitButton?.setAttribute('disabled', 'disabled');
      setStatus(statusNode, 'Consulting the witness and opening the dedicated reading…', 'loading');

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
        const previewLine =
          splitWitnessResponse(firstFilledText(witnessLayer.synthesis, witnessLayer.response)).title ||
          'Reading ready.';

        writeWitnessReading({
          saved_at: new Date().toISOString(),
          form: storedForm,
          location,
          payload: body
        });

        setStatus(statusNode, `Opening dedicated reading: ${previewLine}`, 'success');
        window.location.assign('/reading.html');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Witness request failed.';
        setStatus(statusNode, message, 'error');
      } finally {
        submitButton?.removeAttribute('disabled');
      }
    });
  }

  activateTab('daily');
}
