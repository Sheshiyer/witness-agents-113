import {
  firstFilledText,
  firstSentence,
  pickWitnessPracticalDetail,
  pickWitnessPrimary,
  readWitnessReading,
  splitWitnessResponse,
  summarizeWitnessInference,
  textValue,
  titleCase
} from './lib/witnessAccess.js';
import { initReadingMotion } from './readingMotion.js';

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

const isRecord = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value);

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

const formatBirthDate = (value) => {
  const text = textValue(value);
  if (!text) return '';

  const parsed = new Date(`${text}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return text;

  return parsed.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatReadingIntro = (record, payload) => {
  const subject = isRecord(payload?.subject) ? payload.subject : {};
  const bits = [];
  const name = textValue(subject.name) || textValue(record?.form?.name);
  const birthDate = formatBirthDate(textValue(subject.birth_date) || textValue(record?.form?.birth_date));
  const location = textValue(subject.location_label) || textValue(record?.location?.label);

  if (name) bits.push(`Held for ${name}`);
  if (birthDate) bits.push(birthDate);
  if (location) bits.push(location);

  return bits.join(' · ') || 'Latest witness reading';
};

const formatPromoExpiry = (value) => {
  const text = textValue(value);
  if (!text) return '';

  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return text;

  return parsed.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  });
};

const cleanInlineWitnessText = (value) =>
  textValue(value)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(^|[\s(])\*(?!\s)([^*]+?)\*(?=$|[\s).,!?:;])/g, '$1$2')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[ \t]{2,}\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .trim();

const normalizeText = (value) => cleanInlineWitnessText(value).replace(/\s+/g, ' ').toLowerCase();

const stripDuplicateTitleLead = (value, title) => {
  const text = cleanInlineWitnessText(value);
  const heading = cleanInlineWitnessText(title);
  if (!text || !heading) return text;

  const parts = splitWitnessResponse(text);
  if (!textValue(parts.body)) return text;

  return normalizeText(parts.title) === normalizeText(heading)
    ? parts.body
    : text;
};

const deriveReadingTitle = (witnessLayer, fallbackText) => {
  const explicitTitle = cleanInlineWitnessText(witnessLayer?.title);
  if (explicitTitle) return explicitTitle;

  const candidate = cleanInlineWitnessText(splitWitnessResponse(fallbackText).title);
  if (!candidate) return '';

  const trimmedCandidate = candidate.replace(/[.!?]+$/, '').trim();
  const firstClause =
    trimmedCandidate
      .split(/(?<=[.!?])\s+|,\s+/)
      .map((part) => part.trim())
      .find(Boolean) || trimmedCandidate;

  const loweredClause = firstClause.toLowerCase();
  const connectiveMatch = [' when ', ' because ', ' while ', ' before ', ' after ', ' so ', ' but ', ' and ']
    .map((separator) => {
      const index = loweredClause.indexOf(separator);
      return index > 0 ? { separator, index } : null;
    })
    .find(Boolean);

  if (connectiveMatch) {
    const connectiveLead = firstClause.slice(0, connectiveMatch.index).trim();
    if (connectiveLead.split(/\s+/).filter(Boolean).length >= 4) return connectiveLead;
  }

  if (firstClause.length <= 96) return firstClause;

  const words = firstClause.split(/\s+/).filter(Boolean);
  if (words.length <= 8) return firstClause;
  return `${words.slice(0, 8).join(' ')}…`;
};

const humanizeTraceRole = (value) => {
  const key = textValue(value).trim().toLowerCase();

  if (key === 'synthesis') return 'Opening';
  if (key === 'aletheios') return 'Truth witness';
  if (key === 'pichet') return 'Action witness';
  if (key === 'witness') return 'Witness';
  if (!key) return '';

  return titleCase(key.replace(/[_-]+/g, ' '));
};

const humanizeEngineId = (value) => titleCase(textValue(value).replace(/[_-]+/g, ' '));

const createEmptyCopyNode = () => {
  const empty = document.createElement('p');
  empty.className = 'reading-copy reading-copy--muted';
  empty.textContent = 'Nothing was returned for this part of the reading.';
  return empty;
};

const createNarrativeHeading = (value) => {
  const heading = document.createElement('h3');
  heading.className = 'reading-subhead';
  heading.textContent = value;
  return heading;
};

const createBulletList = (items) => {
  const list = document.createElement('ul');
  list.className = 'reading-bullet-list';

  items.forEach(({ text, depth = 0 }) => {
    const item = document.createElement('li');
    item.className = 'reading-bullet-list__item';
    item.style.setProperty('--reading-bullet-depth', String(Math.max(0, Math.min(depth, 3))));
    item.textContent = text;
    list.append(item);
  });

  return list;
};

const createParagraphNodes = (value) => {
  const raw = textValue(value).replace(/\r\n?/g, '\n').trim();
  if (!raw) return [createEmptyCopyNode()];

  const nodes = [];
  let paragraphLines = [];
  let bulletLines = [];

  const flushParagraph = () => {
    if (!paragraphLines.length) return;

    const text = cleanInlineWitnessText(paragraphLines.join(' '));
    paragraphLines = [];
    if (!text) return;

    const node = document.createElement('p');
    node.className = 'reading-copy';
    node.textContent = text;
    nodes.push(node);
  };

  const flushBullets = () => {
    if (!bulletLines.length) return;
    nodes.push(createBulletList(bulletLines));
    bulletLines = [];
  };

  raw.split('\n').forEach((rawLine) => {
    const line = rawLine.replace(/\u00a0/g, ' ').replace(/\s+$/, '');
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushBullets();
      return;
    }

    if (/^([-*_]\s*){3,}$/.test(trimmed)) {
      flushParagraph();
      flushBullets();
      return;
    }

    const headingMatch = trimmed.match(/^#{1,6}\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushBullets();

      const headingText = cleanInlineWitnessText(headingMatch[1]);
      if (headingText) nodes.push(createNarrativeHeading(headingText));
      return;
    }

    const bulletMatch = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
    if (bulletMatch) {
      flushParagraph();

      const depth = Math.floor(bulletMatch[1].replace(/\t/g, '  ').length / 2);
      const bulletText = cleanInlineWitnessText(bulletMatch[3]);
      if (bulletText) bulletLines.push({ text: bulletText, depth });
      return;
    }

    paragraphLines.push(trimmed);
  });

  flushParagraph();
  flushBullets();

  return nodes.length ? nodes : [createEmptyCopyNode()];
};

const renderCopy = (selector, value) => {
  const node = document.querySelector(selector);
  if (!node) return;

  node.innerHTML = '';
  createParagraphNodes(value).forEach((paragraph) => node.append(paragraph));
};

const normalizeListItems = (value) => {
  if (Array.isArray(value)) {
    return value.flatMap((entry) => normalizeListItems(entry));
  }

  const text = textValue(value).replace(/\r\n?/g, '\n').trim();
  if (!text) return [];

  return text
    .split(/\n+/)
    .map((line) =>
      cleanInlineWitnessText(
        line
          .replace(/^#{1,6}\s+/, '')
          .replace(/^(\s*)([-*]|\d+\.)\s+/, '')
      )
    )
    .filter(Boolean);
};

const createStructuredList = (items) => {
  const list = document.createElement('ul');
  list.className = 'reading-list';

  items.forEach((itemText) => {
    const item = document.createElement('li');
    item.className = 'reading-list__item';

    const copy = document.createElement('p');
    copy.className = 'reading-list__copy';
    copy.textContent = itemText;

    item.append(copy);
    list.append(item);
  });

  return list;
};

const renderStructuredList = (selector, value) => {
  const node = document.querySelector(selector);
  if (!node) return false;

  node.innerHTML = '';
  const items = normalizeListItems(value);
  if (!items.length) return false;

  node.append(createStructuredList(items));
  return true;
};

const renderStructuredListInNode = (node, items) => {
  if (!node) return false;

  node.innerHTML = '';
  const normalized = normalizeListItems(items);
  if (!normalized.length) {
    node.hidden = true;
    return false;
  }

  node.hidden = false;
  node.append(createStructuredList(normalized));
  return true;
};

const renderTokenItems = (node, items) => {
  if (!node) return false;

  const normalized = normalizeListItems(items);
  node.innerHTML = '';
  if (!normalized.length) {
    node.hidden = true;
    return false;
  }

  node.hidden = false;
  normalized.forEach((itemText) => {
    const token = document.createElement('span');
    token.className = 'reading-token';
    token.textContent = itemText;
    node.append(token);
  });

  return true;
};

const setOptionalText = (selector, value) => {
  const node = document.querySelector(selector);
  if (!node) return false;

  const text = cleanInlineWitnessText(value);
  node.textContent = text;
  node.hidden = !text;
  return Boolean(text);
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

const renderSourceMeta = (record, payload, engineCount) => {
  const subject = isRecord(payload?.subject) ? payload.subject : {};
  const timezone = textValue(subject.timezone) || textValue(record?.location?.timezone);

  renderMetaChips('[data-reading-source-meta]', [
    { label: 'Held', value: formatStoredMoment(textValue(payload?.created_at) || textValue(record?.saved_at)) },
    { label: 'Timezone', value: timezone },
    { label: 'Reading ID', value: textValue(payload?.reading_id) },
    { label: 'Mirrors', value: `${engineCount} mirror${engineCount === 1 ? '' : 's'}` }
  ]);

  const sourceMeta = document.querySelector('[data-reading-source-meta]');
  if (!sourceMeta) return;

  const hasContent = sourceMeta.childElementCount > 0;
  sourceMeta.hidden = !hasContent;
};

const renderReadingMap = () => {
  const map = document.querySelector('[data-reading-map]');
  const linksNode = document.querySelector('[data-reading-map-links]');
  if (!map || !linksNode) return [];

  const sections = Array.from(document.querySelectorAll('[data-reading-section]')).filter((node) => {
    const label = textValue(node.dataset.readingSectionLabel);
    return label && !node.hidden && node.getClientRects().length > 0;
  });

  linksNode.innerHTML = '';

  sections.forEach((section, index) => {
    const link = document.createElement('a');
    link.className = 'reading-map__link';
    link.href = `#${section.id}`;
    link.dataset.targetId = section.id;
    link.textContent = textValue(section.dataset.readingSectionLabel);
    if (index === 0) link.dataset.active = 'true';
    linksNode.append(link);
  });

  toggleHidden('[data-reading-map]', sections.length < 2);
  setText(
    '[data-reading-progress-text]',
    sections.length ? `Current turn: ${textValue(sections[0].dataset.readingSectionLabel)}` : 'Current turn: Opening'
  );

  return sections.map((section) => ({
    id: section.id,
    label: textValue(section.dataset.readingSectionLabel)
  }));
};

const renderAppendix = (record, witnessLayer) => {
  const summary = record?.reporting?.inference || summarizeWitnessInference(witnessLayer);
  const hasTrace = textValue(summary.provider) || textValue(summary.primary_model) || summary.role_count > 0;

  setText(
    '[data-reading-appendix-lede]',
    hasTrace
      ? 'If you want to inspect the supporting weave beneath the reading, open the source trace below.'
      : 'This reading was saved without its supporting trace. The linked source is still here if you want the underlying record.'
  );

  toggleHidden('[data-reading-trace-shell]', !hasTrace);
  if (!hasTrace) return;

  const primaryRole = humanizeTraceRole(summary.primary_role);
  const roleNames = Array.isArray(summary.role_names)
    ? summary.role_names.map((role) => humanizeTraceRole(role)).filter(Boolean).join(', ')
    : '';

  renderMetaChips('[data-reading-trace-meta]', [
    { label: 'Lead Strand', value: primaryRole },
    { label: 'Held Through', value: roleNames }
  ]);

  setText(
    '[data-reading-trace-status]',
    `${summary.role_count || 0} held strand${summary.role_count === 1 ? '' : 's'}`
  );

  setText(
    '[data-reading-trace-copy]',
    summary.role_count
      ? 'This trace shows how the reading was braided together. Open it only when you want the supporting structure rather than another interpretation.'
      : 'This reading was stored without a supporting trace.'
  );

  const traceShell = document.querySelector('[data-reading-trace-shell]');
  if (traceShell instanceof HTMLDetailsElement) traceShell.open = false;
};

const renderSummarySection = (summaryText, fallbackOrientationText = '') => {
  const explicitSummary = cleanInlineWitnessText(summaryText);
  const fallbackSummary = cleanInlineWitnessText(fallbackOrientationText);
  const body = explicitSummary || fallbackSummary;
  const hasContent = Boolean(textValue(body));

  toggleHidden('[data-reading-summary-panel]', !hasContent);
  if (!hasContent) return false;

  const usesExplicitSummary = Boolean(explicitSummary);
  setText('[data-reading-summary-label]', usesExplicitSummary ? 'Bearing' : 'Orientation');
  setText('[data-reading-summary-title]', usesExplicitSummary ? 'What this day is asking' : 'A shorter orientation');
  setText(
    '[data-reading-summary-lede]',
    usesExplicitSummary
      ? 'The longer reading condenses here into the thread it most wants you to keep.'
      : 'This shorter pass keeps the same field beside the fuller reading.'
  );
  toggleHidden('[data-reading-summary-lede]', false);
  renderCopy('[data-reading-summary]', body);
  return true;
};

const createResonanceMetric = (label, value) => {
  const card = document.createElement('article');
  card.className = 'reading-resonance__metric';

  const kicker = document.createElement('p');
  kicker.className = 'reading-label';
  kicker.textContent = label;

  const copy = document.createElement('p');
  copy.className = 'reading-resonance__metric-copy';
  copy.textContent = value;

  card.append(kicker, copy);
  return card;
};

const renderResonanceBody = (node, value, { compact = false } = {}) => {
  const resonance = isRecord(value) ? value : null;
  if (!node || !resonance) return false;

  const primary = isRecord(resonance.primary_raga) ? resonance.primary_raga : null;
  const supporting = Array.isArray(resonance.supporting_ragas)
    ? resonance.supporting_ragas
      .filter((entry) => isRecord(entry))
      .map((entry) => cleanInlineWitnessText(entry.raga_name))
      .filter(Boolean)
    : [];
  const listeningWindow = cleanInlineWitnessText(resonance.listening_window);
  const doshaDominance = cleanInlineWitnessText(resonance.dosha_dominance);
  const energyQuality = cleanInlineWitnessText(resonance.energy_quality);
  const doshaGuidance = cleanInlineWitnessText(resonance.dosha_guidance);
  const rasa = cleanInlineWitnessText(resonance.rasa);
  const chakra = isRecord(resonance.chakra_attunement) ? resonance.chakra_attunement : null;
  const primaryName = cleanInlineWitnessText(primary?.raga_name);
  const primaryReason = cleanInlineWitnessText(primary?.reason);
  const metrics = [
    listeningWindow ? createResonanceMetric('Listening Window', listeningWindow) : null,
    rasa ? createResonanceMetric('Rasa', rasa) : null,
    doshaDominance ? createResonanceMetric('Dosha', doshaDominance) : null,
    energyQuality ? createResonanceMetric('Energy', energyQuality) : null,
    chakra?.chakra_name
      ? createResonanceMetric(
        'Chakra',
        [
          cleanInlineWitnessText(chakra.chakra_name),
          chakra.solfeggio_hz ? `${chakra.solfeggio_hz}Hz` : '',
        ].filter(Boolean).join(' · '),
      )
      : null,
  ].filter(Boolean);

  node.innerHTML = '';
  node.hidden = false;

  if (primaryName && !compact) {
    const lead = document.createElement('article');
    lead.className = 'reading-resonance__lead';

    const kicker = document.createElement('p');
    kicker.className = 'reading-label';
    kicker.textContent = 'Primary Raga';

    const title = document.createElement('h3');
    title.className = 'reading-resonance__title';
    title.textContent = primaryName;

    lead.append(kicker, title);

    if (primaryReason) {
      const copy = document.createElement('p');
      copy.className = 'reading-resonance__copy';
      copy.textContent = primaryReason;
      lead.append(copy);
    }

    node.append(lead);
  }

  if (metrics.length) {
    const grid = document.createElement('div');
    grid.className = compact ? 'reading-resonance__metrics reading-resonance__metrics--compact' : 'reading-resonance__metrics';
    metrics.forEach((metric) => grid.append(metric));
    node.append(grid);
  }

  if (supporting.length) {
    const supportingShell = document.createElement('div');
    supportingShell.className = 'reading-resonance__support';

    const label = document.createElement('p');
    label.className = 'reading-label';
    label.textContent = 'Supporting Ragas';

    const tokens = document.createElement('div');
    tokens.className = 'reading-token-list';
    supporting.forEach((itemText) => {
      const token = document.createElement('span');
      token.className = 'reading-token';
      token.textContent = itemText;
      tokens.append(token);
    });

    supportingShell.append(label, tokens);
    node.append(supportingShell);
  }

  const notes = normalizeListItems([
    doshaGuidance,
    chakra?.binaural_target_hz ? `Binaural focus: ${chakra.binaural_target_hz}Hz.` : '',
  ]);

  if (notes.length) {
    const noteShell = document.createElement('div');
    noteShell.className = 'reading-resonance__notes';
    noteShell.append(createStructuredList(notes));
    node.append(noteShell);
  }

  const hasContent = node.childElementCount > 0;
  node.hidden = !hasContent;
  return hasContent;
};

const renderResonanceSection = (value, workflowId = 'daily-practice', creativeSurfaceVisible = false) => {
  const shouldEmbedInCreative = workflowId === 'creative-expression' && creativeSurfaceVisible;
  const panel = document.querySelector('[data-reading-resonance-panel]');
  const body = document.querySelector('[data-reading-resonance]');
  if (!panel || !body) return false;

  if (shouldEmbedInCreative) {
    panel.hidden = true;
    return false;
  }

  const hasContent = renderResonanceBody(body, value);
  toggleHidden('[data-reading-resonance-panel]', !hasContent);
  if (!hasContent) return false;

  setText('[data-reading-resonance-label]', 'Attunement');
  setText('[data-reading-resonance-title]', 'Where to tune the day');
  setText(
    '[data-reading-resonance-lede]',
    'The reading is not only directional. It is also tonal, and this is the line that steadies the pace.'
  );
  return true;
};

const renderCreativeSection = (value) => {
  const surface = isRecord(value) ? value : null;
  const panel = document.querySelector('[data-reading-creative-panel]');
  if (!panel || !surface) {
    toggleHidden('[data-reading-creative-panel]', true);
    return false;
  }

  const sigil = isRecord(surface.sigil) ? surface.sigil : null;
  const geometry = isRecord(surface.geometry) ? surface.geometry : null;
  const resonance = isRecord(surface.resonance) ? surface.resonance : null;
  const numerology = isRecord(surface.numerology) ? surface.numerology : null;
  const ritual = normalizeListItems(surface.ritual);
  const intention = cleanInlineWitnessText(surface.intention);

  setText('[data-reading-creative-label]', 'Creative Surface');
  setText('[data-reading-creative-title]', 'Symbol, form, and ritual');
  setText(
    '[data-reading-creative-lede]',
    'This is where the reading becomes something you can hold, repeat, and return to with your body.'
  );

  if (intention) {
    setText('[data-reading-creative-intention]', `Held intention: ${intention}`);
    toggleHidden('[data-reading-creative-intention]', false);
  } else {
    toggleHidden('[data-reading-creative-intention]', true);
  }

  const sigilVisible = Boolean(sigil && (
    textValue(sigil.method_name) || textValue(sigil.method_description) || textValue(sigil.note) || textValue(sigil.intention)
  ));
  toggleHidden('[data-reading-creative-sigil]', !sigilVisible);
  if (sigilVisible && sigil) {
    setText('[data-reading-creative-sigil-title]', cleanInlineWitnessText(sigil.method_name) || 'Portable mark');
    setOptionalText(
      '[data-reading-creative-sigil-body]',
      cleanInlineWitnessText(sigil.method_description) || cleanInlineWitnessText(sigil.note) || cleanInlineWitnessText(sigil.intention)
    );
    renderTokenItems(
      document.querySelector('[data-reading-creative-sigil-tags]'),
      [
        cleanInlineWitnessText(sigil.intention),
        cleanInlineWitnessText(sigil.svg_status),
      ]
    );
    renderStructuredListInNode(
      document.querySelector('[data-reading-creative-sigil-list]'),
      [
        ...(Array.isArray(sigil.next_steps) ? sigil.next_steps : []),
        ...(Array.isArray(sigil.charging_suggestions)
          ? sigil.charging_suggestions
            .filter((entry) => isRecord(entry))
            .map((entry) => {
              const name = cleanInlineWitnessText(entry.name);
              const description = cleanInlineWitnessText(entry.description);
              return name && description ? `${name}: ${description}` : name || description;
            })
          : []),
      ]
    );
  }

  const geometryVisible = Boolean(geometry && (
    textValue(geometry.form_name) || textValue(geometry.description) || textValue(geometry.symbolism)
  ));
  toggleHidden('[data-reading-creative-geometry]', !geometryVisible);
  if (geometryVisible && geometry) {
    setText('[data-reading-creative-geometry-title]', cleanInlineWitnessText(geometry.form_name) || 'Sacred form');
    setOptionalText(
      '[data-reading-creative-geometry-body]',
      cleanInlineWitnessText(geometry.symbolism) || cleanInlineWitnessText(geometry.description)
    );
    renderTokenItems(
      document.querySelector('[data-reading-creative-geometry-elements]'),
      Array.isArray(geometry.elements) ? geometry.elements : []
    );
    renderStructuredListInNode(
      document.querySelector('[data-reading-creative-geometry-list]'),
      [
        cleanInlineWitnessText(geometry.description),
        geometry.numerology ? `Geometry number: ${geometry.numerology}.` : '',
        geometry.duration_suggestion && geometry.meditation_prompt
          ? `${geometry.duration_suggestion}: ${cleanInlineWitnessText(geometry.meditation_prompt)}`
          : cleanInlineWitnessText(geometry.meditation_prompt),
      ]
    );
  }

  const attunementVisible = Boolean(resonance);
  toggleHidden('[data-reading-creative-attunement]', !attunementVisible);
  if (attunementVisible) {
    setText(
      '[data-reading-creative-attunement-title]',
      cleanInlineWitnessText(resonance.primary_raga?.raga_name) || 'Attunement'
    );
    setOptionalText(
      '[data-reading-creative-attunement-body]',
      cleanInlineWitnessText(resonance.primary_raga?.reason) || cleanInlineWitnessText(resonance.dosha_guidance)
    );
    renderResonanceBody(document.querySelector('[data-reading-creative-attunement-list]'), resonance, { compact: true });
  }

  const numerologyVisible = Boolean(numerology && (textValue(numerology.value) || textValue(numerology.phase)));
  toggleHidden('[data-reading-creative-numerology]', !numerologyVisible);
  if (numerologyVisible && numerology) {
    setText('[data-reading-creative-numerology-title]', textValue(numerology.value) || 'Pulse');
    setOptionalText(
      '[data-reading-creative-numerology-body]',
      cleanInlineWitnessText(numerology.phase) ? `${cleanInlineWitnessText(numerology.phase)} phase` : ''
    );
    renderStructuredListInNode(
      document.querySelector('[data-reading-creative-numerology-list]'),
      [
        numerology.percentage ? `Current intensity: ${numerology.percentage}%.` : '',
        numerology.cycle_day ? `Cycle day: ${numerology.cycle_day}.` : '',
        numerology.is_critical ? 'This pulse is currently in a critical window.' : 'The pulse is currently stable enough for repetition.',
      ]
    );
  }

  const ritualVisible = renderStructuredListInNode(
    document.querySelector('[data-reading-creative-ritual]'),
    ritual
  );
  toggleHidden('[data-reading-creative-ritual-panel]', !ritualVisible);

  const hasContent = [
    sigilVisible,
    geometryVisible,
    attunementVisible,
    numerologyVisible,
    ritualVisible,
    Boolean(intention),
  ].some(Boolean);

  toggleHidden('[data-reading-creative-panel]', !hasContent);
  return hasContent;
};

const renderPracticalSection = (practiceValue, fallbackDetail, actionText = '', workflowId = 'daily-practice') => {
  const node = document.querySelector('[data-reading-practical]');
  const steps = normalizeListItems(practiceValue);
  const hasStructuredPractice = Boolean(node) && steps.length > 0;

  if (hasStructuredPractice && node) {
    toggleHidden('[data-reading-practical-panel]', false);
    if (workflowId === 'creative-expression') {
      setText('[data-reading-practical-label]', 'Ritual');
      setText('[data-reading-practical-title]', 'What to rehearse');
      setText('[data-reading-practical-lede]', 'Take the symbol into repetition until it starts carrying you back into the state it names.');
    } else {
      setText('[data-reading-practical-label]', 'Practice');
      setText('[data-reading-practical-title]', 'What to carry into the day');
      setText('[data-reading-practical-lede]', 'Let the reading leave you with one rhythm to embody, not just one idea to remember.');
    }

    node.innerHTML = '';
    steps.forEach((step, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'reading-practice-step';

      const marker = document.createElement('span');
      marker.className = 'reading-practice-step__index';
      marker.textContent = String(index + 1);

      const copy = document.createElement('p');
      copy.className = 'reading-practice-step__text';
      copy.textContent = step;

      wrapper.append(marker, copy);
      node.append(wrapper);
    });
    return;
  }

  const detail = firstFilledText(fallbackDetail, firstSentence(actionText));
  const hasContent = Boolean(textValue(detail));

  toggleHidden('[data-reading-practical-panel]', !hasContent);
  if (!hasContent) return;

  if (workflowId === 'creative-expression') {
    setText('[data-reading-practical-label]', 'Carry This');
    setText('[data-reading-practical-title]', 'First rehearsal');
    setText('[data-reading-practical-lede]', 'Reduce the reading to the first gesture that makes the symbol usable.');
  } else {
    setText('[data-reading-practical-label]', 'Carry This');
    setText('[data-reading-practical-title]', 'Next Move');
    setText('[data-reading-practical-lede]', 'Reduce the reading to one act you can carry into the day.');
  }
  renderCopy('[data-reading-practical]', detail);
};

const renderQuestionSection = (value) => {
  const question = cleanInlineWitnessText(value);
  const hasContent = Boolean(textValue(question));

  toggleHidden('[data-reading-question-panel]', !hasContent);
  if (!hasContent) return;

  setText('[data-reading-question]', question);
};

const renderEvidenceSection = (value, workflowId = 'daily-practice') => {
  const evidence = isRecord(value) ? value : null;
  const engines = Array.isArray(evidence?.engines_used)
    ? evidence.engines_used.map((engineId) => humanizeEngineId(engineId)).filter(Boolean)
    : [];
  const contributions = Array.isArray(evidence?.contributions)
    ? evidence.contributions.filter((entry) => isRecord(entry))
    : [];
  const hasContent = Boolean(engines.length || contributions.length);

  toggleHidden('[data-reading-evidence-panel]', !hasContent);
  if (!hasContent) return;

  setText(
    '[data-reading-evidence-count]',
    engines.length ? `${engines.length} mirror${engines.length === 1 ? '' : 's'}` : ''
  );
  setText(
    '[data-reading-evidence-lede]',
    workflowId === 'creative-expression'
      ? 'These mirrors shaped the symbol, form, tone, and cadence beneath the reading.'
      : 'This is the convergence beneath the reading: which mirrors were active and what each one contributed.'
  );

  const enginesNode = document.querySelector('[data-reading-evidence-engines]');
  if (enginesNode) {
    enginesNode.innerHTML = '';
    engines.forEach((engineName) => {
      const token = document.createElement('span');
      token.className = 'reading-token';
      token.textContent = engineName;
      enginesNode.append(token);
    });
  }

  const contributionsNode = document.querySelector('[data-reading-evidence-contributions]');
  if (!contributionsNode) return;

  contributionsNode.innerHTML = '';
  contributions.forEach((entry) => {
    const card = document.createElement('article');
    card.className = 'reading-evidence-card';

    const engine = document.createElement('p');
    engine.className = 'reading-evidence-card__engine';
    engine.textContent = humanizeEngineId(entry.engine_id);

    const signal = document.createElement('p');
    signal.className = 'reading-evidence-card__signal';
    signal.textContent = cleanInlineWitnessText(entry.signal);

    card.append(engine, signal);

    const impactText = cleanInlineWitnessText(entry.impact);
    if (impactText) {
      const impact = document.createElement('p');
      impact.className = 'reading-evidence-card__impact';
      impact.textContent = impactText;
      card.append(impact);
    }

    contributionsNode.append(card);
  });
};

const renderEngineCards = (engineResults) => {
  const container = document.querySelector('[data-reading-engines]');
  if (!container) return;

  container.innerHTML = '';
  const entries = Object.entries(engineResults);

  if (!entries.length) {
    container.append(...createParagraphNodes('No additional mirrors were stored with this reading.'));
    return;
  }

  entries.forEach(([engineId, engineData], index) => {
    const witnessLayer = engineData?.witness_layer || {};
    const responseText = pickWitnessPrimary(witnessLayer, engineData?.witness_prompt);
    const practicalDetail = pickWitnessPracticalDetail(witnessLayer, responseText);
    const aletheios = witnessLayer?.aletheios?.perspective || '';
    const prompt = engineData?.witness_prompt || '';
    const excerpt = firstSentence(responseText || aletheios || prompt);

    const card = document.createElement('details');
    card.className = 'reading-engine-card';
    card.open = index === 0;

    const summary = document.createElement('summary');
    summary.className = 'reading-engine-card__summary';

    const head = document.createElement('div');
    head.className = 'reading-engine-card__summary-head';

    const identity = document.createElement('div');
    identity.className = 'reading-engine-card__summary-identity';

    const label = document.createElement('p');
    label.className = 'reading-label';
    label.textContent = titleCase(engineId);

    const route = document.createElement('p');
    route.className = 'reading-engine-card__route';
    route.textContent = 'Supporting mirror';

    identity.append(label, route);

    const toggle = document.createElement('span');
    toggle.className = 'reading-engine-card__toggle';
    toggle.textContent = 'Open mirror';

    head.append(identity, toggle);
    summary.append(head);

    if (excerpt) {
      const summaryCopy = document.createElement('p');
      summaryCopy.className = 'reading-engine-card__summary-copy';
      summaryCopy.textContent = cleanInlineWitnessText(excerpt);
      summary.append(summaryCopy);
    }

    const body = document.createElement('div');
    body.className = 'reading-engine-card__body';

    [
      ['What it saw', responseText],
      ['What it asks', practicalDetail],
      ['Deeper cut', aletheios]
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

    card.append(summary, body);
    container.append(card);
  });
};

const renderMirrorSection = (engineResults) => {
  const entries = Object.entries(engineResults || {});
  const count = entries.length;

  toggleHidden('[data-reading-mirror-panel]', count === 0);
  if (!count) return;

  setText('[data-reading-engine-count]', `${count} mirror${count === 1 ? '' : 's'}`);
  setText(
    '[data-reading-mirror-lede]',
    count === 1
      ? 'Open this only if you want to compare how the supporting mirror held the same day.'
      : 'Open this only if you want to compare how the supporting mirrors held the same day.'
  );

  const shell = document.querySelector('[data-reading-mirror-details]');
  if (shell instanceof HTMLDetailsElement) shell.open = false;

  renderEngineCards(engineResults);
};

const boot = () => {
  const record = readWitnessReading();
  const payload = record?.payload;
  const witnessLayer = payload?.witness_layer || null;
  const engineResults = payload?.engine_results && typeof payload.engine_results === 'object' ? payload.engine_results : {};
  const workflowId = textValue(payload?.workflow_id || witnessLayer?.workflow_id || 'daily-practice').trim().toLowerCase() || 'daily-practice';
  const isCreativeExpression = workflowId === 'creative-expression';

  if (!witnessLayer) {
    setText('[data-reading-title]', 'No witness reading held here yet.');
    setText('[data-reading-intro]', 'Run Daily Witness from the home page first. When a reading arrives, it opens here as the reading itself, what is true, what must be done, and what to carry forward.');
    setText('[data-reading-status]', 'Awaiting the next reading');
    toggleHidden('[data-reading-map]', true);
    toggleHidden('[data-reading-shell-ready]', true);
    toggleHidden('[data-reading-shell-empty]', false);
    requestAnimationFrame(() => initReadingMotion());
    return;
  }

  const responseText = firstFilledText(witnessLayer.response, witnessLayer.synthesis);
  const synthesis = firstFilledText(witnessLayer.synthesis);
  const aletheios = witnessLayer?.aletheios?.perspective || '';
  const pichet = witnessLayer?.pichet?.perspective || '';
  const promoLabel = textValue(witnessLayer.promo_label);
  const promoExpiry = formatPromoExpiry(witnessLayer.promo_expires_at);
  const promoActive = witnessLayer.promo_active === true && promoLabel;
  const title = deriveReadingTitle(witnessLayer, responseText || synthesis);
  const renderedPrimary = stripDuplicateTitleLead(responseText, title);
  const renderedOrientation = stripDuplicateTitleLead(synthesis, title);
  const renderedSummary = stripDuplicateTitleLead(witnessLayer.summary, title);
  const showOrientation =
    textValue(witnessLayer.response) &&
    textValue(witnessLayer.synthesis) &&
    normalizeText(renderedPrimary) !== normalizeText(renderedOrientation);
  const showSummary =
    textValue(renderedSummary) &&
    normalizeText(renderedPrimary) !== normalizeText(renderedSummary);
  const practicalDetail = pickWitnessPracticalDetail(witnessLayer, renderedPrimary || responseText);
  const engineCount = Object.keys(engineResults).length;
  const subject = isRecord(payload?.subject) ? payload.subject : {};
  const birthDate = formatBirthDate(textValue(subject.birth_date) || textValue(record?.form?.birth_date));
  const birthTime = textValue(subject.birth_time) || textValue(record?.form?.birth_time);
  const timezone = textValue(subject.timezone) || textValue(record?.location?.timezone);
  const location = textValue(subject.location_label) || textValue(record?.location?.label);
  const heldAt = textValue(payload?.created_at) || textValue(record?.saved_at);

  setText('[data-reading-kicker]', `${formatStoredMoment(heldAt)} · ${titleCase(workflowId)}`);
  setText('[data-reading-title]', title || 'Witness reading');
  setText('[data-reading-intro]', formatReadingIntro(record, payload));
  setText(
    '[data-reading-status]',
    isCreativeExpression
      ? 'Read the opening first. Then move through the symbol, the form, the tone, and the ritual the reading leaves in your hands.'
      : (
        showSummary || Array.isArray(witnessLayer.convergences) || Array.isArray(witnessLayer.frictions)
          ? 'Read the opening first. Then follow the points of agreement, the strain, and the practice the reading leaves behind.'
          : 'Read the opening first. Then let truth and action show you what is steady and what must move.'
      )
  );
  toggleHidden('[data-reading-promo]', !promoActive);
  if (promoActive) {
    setText(
      '[data-reading-promo]',
      promoExpiry ? `${promoLabel} · Free through ${promoExpiry}` : promoLabel
    );
  }

  renderMetaChips('[data-reading-meta]', [
    { label: 'Birth', value: birthDate },
    { label: 'Time', value: [birthTime, timezone].filter(Boolean).join(' · ') },
    { label: 'Place', value: location },
    { label: 'Mirrors', value: `${engineCount} mirror${engineCount === 1 ? '' : 's'}` }
  ]);

  renderCopy('[data-reading-primary]', renderedPrimary || responseText || synthesis);
  const truthVisible = Boolean(textValue(aletheios));
  const actionVisible = Boolean(textValue(pichet));
  toggleHidden('#reading-truth', !truthVisible);
  toggleHidden('#reading-action', !actionVisible);
  if (truthVisible) renderCopy('[data-reading-aletheios]', aletheios);
  if (actionVisible) renderCopy('[data-reading-pichet]', pichet);

  const voicesGrid = document.querySelector('.reading-grid--voices');
  if (voicesGrid) voicesGrid.classList.toggle('reading-grid--single', Number(truthVisible) + Number(actionVisible) < 2);

  const summaryWasRendered = renderSummarySection(
    showSummary ? renderedSummary : '',
    !showSummary && showOrientation ? renderedOrientation || synthesis : ''
  );

  if (!summaryWasRendered) {
    toggleHidden('[data-reading-summary-panel]', true);
  }

  const primaryGrid = document.querySelector('[data-reading-primary-grid]');
  if (primaryGrid) primaryGrid.classList.toggle('reading-grid--single', !summaryWasRendered);

  toggleHidden('[data-reading-convergences-panel]', !renderStructuredList('[data-reading-convergences]', witnessLayer.convergences));
  toggleHidden('[data-reading-frictions-panel]', !renderStructuredList('[data-reading-frictions]', witnessLayer.frictions));
  const creativeSurfaceVisible = renderCreativeSection(witnessLayer.creative_surface);
  renderResonanceSection(witnessLayer.resonance, workflowId, creativeSurfaceVisible);
  renderPracticalSection(witnessLayer.practice, practicalDetail, pichet, workflowId);
  renderQuestionSection(witnessLayer.question);
  renderEvidenceSection(payload?.evidence || witnessLayer.evidence, workflowId);
  renderMirrorSection(engineResults);
  renderSourceMeta(record, payload, engineCount);
  renderAppendix(record, witnessLayer);

  toggleHidden('[data-reading-shell-ready]', false);
  toggleHidden('[data-reading-shell-empty]', true);
  renderReadingMap();

  requestAnimationFrame(() => initReadingMotion());
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
