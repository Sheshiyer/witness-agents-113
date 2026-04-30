import {
  firstFilledText,
  formatLatency,
  readWitnessReading,
  splitWitnessResponse,
  textValue,
  titleCase
} from './lib/witnessAccess.js';

const setText = (selector, value) => {
  const node = document.querySelector(selector);
  if (!node) return;
  node.textContent = value;
};

const toggleHidden = (selector, hidden) => {
  const node = document.querySelector(selector);
  if (!node) return;
  node.hidden = hidden;
};

const formatStoredMoment = (value) => {
  if (!value) return 'Latest reading';

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return 'Latest reading';

  return parsed.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
};

const formatBirthLabel = (record) => {
  const bits = [];

  if (textValue(record?.form?.name)) bits.push(record.form.name);
  if (textValue(record?.form?.birth_date)) bits.push(record.form.birth_date);
  if (textValue(record?.location?.label)) bits.push(record.location.label);

  return bits.join(' · ') || 'Latest witness reading';
};

const createParagraphNodes = (value) => {
  const text = textValue(value);
  if (!text) {
    const empty = document.createElement('p');
    empty.className = 'reading-copy reading-copy--muted';
    empty.textContent = 'No value returned in this payload.';
    return [empty];
  }

  return text
    .split(/\n\s*\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => {
      const node = document.createElement('p');
      node.className = 'reading-copy';
      node.textContent = paragraph;
      return node;
    });
};

const renderCopy = (selector, value) => {
  const node = document.querySelector(selector);
  if (!node) return;

  node.innerHTML = '';
  createParagraphNodes(value).forEach((paragraph) => node.append(paragraph));
};

const createMetaChip = (label, value) => {
  const item = document.createElement('div');
  item.className = 'reading-chip';

  const kicker = document.createElement('span');
  kicker.className = 'reading-chip__label';
  kicker.textContent = label;

  const text = document.createElement('strong');
  text.className = 'reading-chip__value';
  text.textContent = value;

  item.append(kicker, text);
  return item;
};

const renderMetaChips = (selector, chips) => {
  const node = document.querySelector(selector);
  if (!node) return;

  node.innerHTML = '';
  chips
    .filter((chip) => textValue(chip.value))
    .forEach((chip) => node.append(createMetaChip(chip.label, chip.value)));
};

const renderEngineCards = (engineResults) => {
  const container = document.querySelector('[data-reading-engines]');
  if (!container) return;

  container.innerHTML = '';

  Object.entries(engineResults).forEach(([engineId, engineData]) => {
    const witnessLayer = engineData?.witness_layer || {};
    const synthesis = firstFilledText(witnessLayer.synthesis, witnessLayer.response);
    const aletheios = witnessLayer?.aletheios?.perspective || '';
    const pichet = witnessLayer?.pichet?.perspective || '';
    const prompt = engineData?.result?.witness_prompt || '';

    const card = document.createElement('article');
    card.className = 'reading-engine-card';

    const head = document.createElement('div');
    head.className = 'reading-engine-card__head';

    const label = document.createElement('p');
    label.className = 'reading-label';
    label.textContent = titleCase(engineId);

    const route = document.createElement('p');
    route.className = 'reading-engine-card__route';
    route.textContent = titleCase(firstFilledText(witnessLayer.routing_mode, witnessLayer.engine_role, 'engine voice'));

    head.append(label, route);

    const body = document.createElement('div');
    body.className = 'reading-engine-card__body';

    [
      ['Synthesis', synthesis],
      ['Aletheios', aletheios],
      ['Pichet', pichet],
      ['Raw Prompt', prompt]
    ]
      .filter(([, value]) => textValue(value))
      .forEach(([sectionLabel, value]) => {
        const block = document.createElement('section');
        block.className = 'reading-engine-card__section';

        const heading = document.createElement('h3');
        heading.className = 'reading-engine-card__section-label';
        heading.textContent = sectionLabel;

        block.append(heading, ...createParagraphNodes(value));
        body.append(block);
      });

    card.append(head, body);
    container.append(card);
  });
};

const boot = () => {
  const record = readWitnessReading();
  const payload = record?.payload;
  const witnessLayer = payload?.witness_layer || null;
  const engineResults = payload?.engine_results && typeof payload.engine_results === 'object' ? payload.engine_results : {};

  if (!witnessLayer) {
    setText('[data-reading-title]', 'No witness reading loaded yet.');
    setText('[data-reading-intro]', 'Run Daily Witness from the home page first. This page renders the latest workflow payload after submission.');
    setText('[data-reading-status]', 'Awaiting reading data');
    toggleHidden('[data-reading-shell-ready]', true);
    toggleHidden('[data-reading-shell-empty]', false);
    return;
  }

  const synthesis = firstFilledText(witnessLayer.synthesis, witnessLayer.response);
  const responseText = firstFilledText(witnessLayer.response, witnessLayer.synthesis);
  const aletheios = witnessLayer?.aletheios?.perspective || '';
  const pichet = witnessLayer?.pichet?.perspective || '';
  const { title } = splitWitnessResponse(synthesis || responseText);
  const responseMatchesSynthesis =
    textValue(responseText) && textValue(synthesis) && textValue(responseText) === textValue(synthesis);

  setText('[data-reading-kicker]', `${formatStoredMoment(record?.saved_at)} · ${titleCase(payload?.workflow_id || 'daily-practice')}`);
  setText('[data-reading-title]', title || 'Dedicated witness reading');
  setText('[data-reading-intro]', formatBirthLabel(record));
  setText('[data-reading-status]', 'Rendered directly from the latest workflow payload');
  setText('[data-reading-engine-count]', `${Object.keys(engineResults).length} engine voices`);

  renderMetaChips('[data-reading-meta]', [
    { label: 'Workflow', value: titleCase(payload?.workflow_id || 'daily-practice') },
    { label: 'Routing', value: titleCase(witnessLayer.routing_mode || '') },
    { label: 'Cadence', value: titleCase(witnessLayer.response_cadence || '') },
    { label: 'Tier', value: titleCase(witnessLayer.tier || '') },
    { label: 'Kosha', value: titleCase(witnessLayer.kosha_depth || '') },
    { label: 'Latency', value: formatLatency(payload?.total_time_ms) }
  ]);

  renderCopy('[data-reading-synthesis]', synthesis);
  renderCopy('[data-reading-aletheios]', aletheios);
  renderCopy('[data-reading-pichet]', pichet);

  if (responseMatchesSynthesis) {
    toggleHidden('[data-reading-response-panel]', true);
    toggleHidden('[data-reading-parity]', false);
    setText(
      '[data-reading-parity-text]',
      'Workflow response currently matches synthesis in the API payload. This page still breaks out Aletheios and Pichet so the dyad can be inspected directly.'
    );
  } else {
    toggleHidden('[data-reading-response-panel]', false);
    toggleHidden('[data-reading-parity]', true);
    renderCopy('[data-reading-response]', responseText);
  }

  renderEngineCards(engineResults);

  toggleHidden('[data-reading-shell-ready]', false);
  toggleHidden('[data-reading-shell-empty]', true);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
