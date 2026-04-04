// LocalStorage helpers — no error handling because YOLO
const FAVORITES_KEY = 'rootweather_favorites';
const UNIT_KEY = 'rootweather_unit';
const WIND_UNIT_KEY = 'rootweather_wind_unit';
const TIME_FORMAT_KEY = 'rootweather_time_format';
const DEFAULT_CITY_KEY = 'rootweather_default_city';

export function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function loadUnit() {
  return localStorage.getItem(UNIT_KEY) || 'celsius';
}

export function saveUnit(unit) {
  localStorage.setItem(UNIT_KEY, unit);
}

export function loadWindUnit() {
  return localStorage.getItem(WIND_UNIT_KEY) || 'kmh';
}

export function saveWindUnit(unit) {
  localStorage.setItem(WIND_UNIT_KEY, unit);
}

export function loadTimeFormat() {
  return localStorage.getItem(TIME_FORMAT_KEY) || '24h';
}

export function saveTimeFormat(format) {
  localStorage.setItem(TIME_FORMAT_KEY, format);
}

export function loadDefaultCity() {
  return localStorage.getItem(DEFAULT_CITY_KEY) || null;
}

export function saveDefaultCity(cityName) {
  if (cityName) {
    localStorage.setItem(DEFAULT_CITY_KEY, cityName);
  } else {
    localStorage.removeItem(DEFAULT_CITY_KEY);
  }
}
