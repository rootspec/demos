# System: WEATHER_SYSTEM

**Product:** RootWeather
**Version:** 7.3.7
**Status:** Baseline

---

## Responsibility

Fetch weather data from Open-Meteo for a given latitude/longitude, decode weather codes into human-readable descriptions and emojis, derive condition-based alerts, and render all weather-related UI (current conditions, hourly forecast, 7-day forecast).

## Boundaries

**Owns:**
- All Open-Meteo API calls (geocoding and forecast)
- Weather code → description and emoji mapping
- Temperature conversion (°C ↔ °F)
- Alert threshold logic (UV, wind, humidity, temperature extremes)
- Rendering: `CurrentWeather`, `HourlyForecast`, `ForecastChart`, `WeatherAlerts`

**Does not own:**
- Which city is selected (owned by LOCATION_SYSTEM / VIEW_SYSTEM)
- User unit preferences (owned by SETTINGS_SYSTEM; received as props)
- Saving or persisting anything (no localStorage writes)

## Data Ownership

| Data | Type | Source | Persisted |
|------|------|--------|-----------|
| `weather` | Open-Meteo response object | API fetch | No (in-memory) |
| `loading` | boolean | fetch lifecycle | No |
| `error` | string or null | fetch rejection | No |

## Key Files

| File | Role |
|------|------|
| `src/utils/api.js` | `getWeather(lat, lon)`, `searchCities(query)`, `getWeatherDescription(code)`, `getWeatherEmoji(code)` |
| `src/hooks/useWeather.js` | React hook wrapping `getWeather`; manages `weather`, `loading`, `error` state with cancellation |
| `src/components/CurrentWeather.jsx` | Renders current temp, description, humidity, wind, UV |
| `src/components/HourlyForecast.jsx` | Renders next 24-hour strip with scrolling; shows temp, emoji, precip probability |
| `src/components/ForecastChart.jsx` | Renders 7-day bar chart with emoji, high/low temps, precip probability |
| `src/components/WeatherAlerts.jsx` | Derives and renders inline alert badges from current condition thresholds |
| `src/utils/temperature.js` | `formatTemp(celsius, unit)` — converts and formats temperature with unit suffix |

## Alert Thresholds

| Condition | Threshold | Alert Text | Severity |
|-----------|-----------|------------|----------|
| UV index | ≥ 8 | "Very High UV" | High (red) |
| UV index | ≥ 6 | "High UV" | Medium (yellow) |
| UV index | ≥ 3 | "Moderate UV" | Medium (yellow) |
| Wind speed | ≥ 60 km/h | "Storm-force winds" | High (red) |
| Wind speed | ≥ 40 km/h | "Strong winds" | Medium (orange) |
| Wind speed | ≥ 25 km/h | "Breezy" | Low (gray) |
| Humidity | ≥ 85% | "Very humid" | Low (blue) |
| Temperature | ≥ 35°C | "Extreme heat" | High (red) |
| Temperature | ≤ −10°C | "Extreme cold" | High (blue) |
| Temperature | ≤ 0°C | "Freezing" | Low (gray) |

## Interactions with Other Systems

| System | Direction | What |
|--------|-----------|------|
| VIEW_SYSTEM | Receives | `latitude`, `longitude` via `useWeather` hook arguments |
| SETTINGS_SYSTEM | Receives | `unit` prop for temperature formatting; `timeFormat` prop for hourly time display |
| COMPARISON_SYSTEM | Used by | `ComparisonView` calls `getWeather` directly (bypasses hook) for parallel multi-city fetches |
