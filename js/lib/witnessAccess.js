export const WITNESS_ORIGIN = 'https://48.tryambakam.space';
export const DAILY_WITNESS_WORKFLOW_URL = `${WITNESS_ORIGIN}/api/v1/workflows/daily-practice/execute`;
export const WITNESS_FORM_STORAGE_KEY = 'witness-agents.daily-witness-form';
export const WITNESS_READING_STORAGE_KEY = 'witness-agents.latest-reading';

export const WITNESS_LOCATIONS = [
  { key: 'bengaluru', label: 'Bengaluru, India', group: 'India', timezone: 'Asia/Kolkata', latitude: 12.9716, longitude: 77.5946 },
  { key: 'mumbai', label: 'Mumbai, India', group: 'India', timezone: 'Asia/Kolkata', latitude: 19.076, longitude: 72.8777 },
  { key: 'new-delhi', label: 'New Delhi, India', group: 'India', timezone: 'Asia/Kolkata', latitude: 28.6139, longitude: 77.209 },
  { key: 'chennai', label: 'Chennai, India', group: 'India', timezone: 'Asia/Kolkata', latitude: 13.0827, longitude: 80.2707 },
  { key: 'hyderabad', label: 'Hyderabad, India', group: 'India', timezone: 'Asia/Kolkata', latitude: 17.385, longitude: 78.4867 },
  { key: 'kolkata', label: 'Kolkata, India', group: 'India', timezone: 'Asia/Kolkata', latitude: 22.5726, longitude: 88.3639 },
  { key: 'kochi', label: 'Kochi, India', group: 'India', timezone: 'Asia/Kolkata', latitude: 9.9312, longitude: 76.2673 },
  { key: 'singapore', label: 'Singapore', group: 'Asia Pacific', timezone: 'Asia/Singapore', latitude: 1.3521, longitude: 103.8198 },
  { key: 'bangkok', label: 'Bangkok, Thailand', group: 'Asia Pacific', timezone: 'Asia/Bangkok', latitude: 13.7563, longitude: 100.5018 },
  { key: 'tokyo', label: 'Tokyo, Japan', group: 'Asia Pacific', timezone: 'Asia/Tokyo', latitude: 35.6762, longitude: 139.6503 },
  { key: 'sydney', label: 'Sydney, Australia', group: 'Asia Pacific', timezone: 'Australia/Sydney', latitude: -33.8688, longitude: 151.2093 },
  { key: 'dubai', label: 'Dubai, UAE', group: 'Middle East', timezone: 'Asia/Dubai', latitude: 25.2048, longitude: 55.2708 },
  { key: 'istanbul', label: 'Istanbul, Turkiye', group: 'Middle East', timezone: 'Europe/Istanbul', latitude: 41.0082, longitude: 28.9784 },
  { key: 'london', label: 'London, UK', group: 'Europe', timezone: 'Europe/London', latitude: 51.5072, longitude: -0.1276 },
  { key: 'paris', label: 'Paris, France', group: 'Europe', timezone: 'Europe/Paris', latitude: 48.8566, longitude: 2.3522 },
  { key: 'berlin', label: 'Berlin, Germany', group: 'Europe', timezone: 'Europe/Berlin', latitude: 52.52, longitude: 13.405 },
  { key: 'lisbon', label: 'Lisbon, Portugal', group: 'Europe', timezone: 'Europe/Lisbon', latitude: 38.7223, longitude: -9.1393 },
  { key: 'new-york', label: 'New York, USA', group: 'Americas', timezone: 'America/New_York', latitude: 40.7128, longitude: -74.006 },
  { key: 'miami', label: 'Miami, USA', group: 'Americas', timezone: 'America/New_York', latitude: 25.7617, longitude: -80.1918 },
  { key: 'chicago', label: 'Chicago, USA', group: 'Americas', timezone: 'America/Chicago', latitude: 41.8781, longitude: -87.6298 },
  { key: 'denver', label: 'Denver, USA', group: 'Americas', timezone: 'America/Denver', latitude: 39.7392, longitude: -104.9903 },
  { key: 'los-angeles', label: 'Los Angeles, USA', group: 'Americas', timezone: 'America/Los_Angeles', latitude: 34.0522, longitude: -118.2437 },
  { key: 'san-francisco', label: 'San Francisco, USA', group: 'Americas', timezone: 'America/Los_Angeles', latitude: 37.7749, longitude: -122.4194 },
  { key: 'toronto', label: 'Toronto, Canada', group: 'Americas', timezone: 'America/Toronto', latitude: 43.6532, longitude: -79.3832 },
  { key: 'mexico-city', label: 'Mexico City, Mexico', group: 'Americas', timezone: 'America/Mexico_City', latitude: 19.4326, longitude: -99.1332 }
];

export const titleCase = (value = '') =>
  value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export const textValue = (value) => (typeof value === 'string' ? value.trim() : '');

export const firstFilledText = (...values) => {
  for (const value of values) {
    const text = textValue(value);
    if (text) return text;
  }
  return '';
};

export const splitWitnessResponse = (value) => {
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

export const formatLatency = (value) => {
  const parsed = typeof value === 'number' ? value : Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) return '0ms';
  if (parsed < 1) return '<1ms';
  if (parsed < 10) return `${parsed.toFixed(1)}ms`;
  return `${Math.round(parsed)}ms`;
};

export const getWitnessLocation = (key) =>
  WITNESS_LOCATIONS.find((location) => location.key === key) || null;

export const getWitnessLocationGroups = () => {
  const groups = new Map();

  WITNESS_LOCATIONS.forEach((location) => {
    if (!groups.has(location.group)) groups.set(location.group, []);
    groups.get(location.group).push(location);
  });

  return Array.from(groups.entries()).map(([label, locations]) => ({ label, locations }));
};

const getStorageAreas = () => {
  if (typeof window === 'undefined') return [];

  const areas = [];

  try {
    if (window.sessionStorage) areas.push(window.sessionStorage);
  } catch {
    // Ignore session storage failures.
  }

  try {
    if (window.localStorage) areas.push(window.localStorage);
  } catch {
    // Ignore local storage failures.
  }

  return areas;
};

const readJSONStorage = (key) => {
  for (const storage of getStorageAreas()) {
    try {
      const raw = storage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') return parsed;
    } catch {
      // Try the next storage area.
    }
  }

  return null;
};

const writeJSONStorage = (key, value) => {
  const raw = JSON.stringify(value);
  let wrote = false;

  for (const storage of getStorageAreas()) {
    try {
      storage.setItem(key, raw);
      wrote = true;
    } catch {
      // Try the next storage area.
    }
  }

  return wrote;
};

export const readWitnessForm = () => readJSONStorage(WITNESS_FORM_STORAGE_KEY) || {};

export const writeWitnessForm = (value) => writeJSONStorage(WITNESS_FORM_STORAGE_KEY, value);

export const readWitnessReading = () => readJSONStorage(WITNESS_READING_STORAGE_KEY);

export const writeWitnessReading = (value) => writeJSONStorage(WITNESS_READING_STORAGE_KEY, value);
