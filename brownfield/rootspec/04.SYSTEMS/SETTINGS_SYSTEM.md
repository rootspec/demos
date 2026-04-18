# System: SETTINGS_SYSTEM

**Product:** RootWeather
**Version:** 7.3.7
**Status:** Baseline

---

## Responsibility

Manage and persist all user display preferences: temperature unit, wind speed unit, time format, and default city. Expose a settings panel UI that applies changes immediately to all rendered data.

## Boundaries

**Owns:**
- Settings panel component (`SettingsPanel`)
- Reading/writing all preference keys to localStorage
- Default city preference (write side; read side is LOCATION_SYSTEM's responsibility on mount)

**Does not own:**
- Weather data rendering (WEATHER_SYSTEM consumes unit/timeFormat as props)
- Favorites list (LOCATION_SYSTEM owns that; SETTINGS_SYSTEM only reads the favorites array to populate the default city dropdown)
- App navigation or view state (VIEW_SYSTEM owns that)

## Data Ownership

| Preference | localStorage Key | Default | Options |
|------------|-----------------|---------|---------|
| Temperature unit | `rootweather_unit` | `celsius` | `celsius`, `fahrenheit` |
| Wind unit | `rootweather_wind_unit` | `kmh` | `kmh`, `mph` |
| Time format | `rootweather_time_format` | `24h` | `24h`, `12h` |
| Default city | `rootweather_default_city` | `null` | Any city name from favorites |

## Key Files

| File | Role |
|------|------|
| `src/components/SettingsPanel.jsx` | Toggle-able settings panel; button-group selectors for unit/format; dropdown for default city |
| `src/utils/storage.js` | `loadUnit()`, `saveUnit()`, `loadWindUnit()`, `saveWindUnit()`, `loadTimeFormat()`, `saveTimeFormat()`, `loadDefaultCity()`, `saveDefaultCity()` |

## Behavior

- Panel is collapsed by default; toggled open/closed by the "⚙️ Settings" / "Hide Settings" button
- All setting changes call their respective `onChange` callback immediately — no "Apply" step
- Default city dropdown only appears when favorites list is non-empty
- Selecting "None" as default city calls `onDefaultCityChange(null)`, which removes the key from localStorage

## Interactions with Other Systems

| System | Direction | What |
|--------|-----------|------|
| VIEW_SYSTEM | Receives | `unit`, `windUnit`, `timeFormat`, `defaultCity`, `favorites[]`, all change callbacks |
| VIEW_SYSTEM | Sends | Updated preference values via callbacks on user interaction |
| WEATHER_SYSTEM | Props threading | `unit` and `timeFormat` flow from VIEW_SYSTEM through to CurrentWeather, HourlyForecast, ForecastChart |
| LOCATION_SYSTEM | Reads favorites | SettingsPanel receives `favorites[]` to populate default city dropdown; does not mutate favorites |
