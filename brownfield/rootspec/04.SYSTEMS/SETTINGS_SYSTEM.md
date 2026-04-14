# Settings System

> References: `01.PHILOSOPHY.md`, `02.TRUTHS.md`, `03.INTERACTIONS.md`, `SYSTEMS_OVERVIEW.md`

## Responsibility

Manages user preferences: temperature unit, wind speed unit, time display format, and default city. Persists all preferences to localStorage. Provides display utilities for unit-aware formatting.

---

## Settings Data

| Setting | Key | Type | Default | Options |
|---------|-----|------|---------|---------|
| Temperature unit | `rootweather_unit` | enum | `'celsius'` | `'celsius'`, `'fahrenheit'` |
| Wind speed unit | `rootweather_wind_unit` | enum | `'kmh'` | `'kmh'`, `'mph'` |
| Time format | `rootweather_time_format` | enum | `'24h'` | `'24h'`, `'12h'` |
| Default city | `rootweather_default_city` | string \| null | `null` | Any city name from favorites |

All settings are read from localStorage on app mount. All settings are written to localStorage on every change (via React `useEffect`).

---

## Rules

### Temperature Unit

- Controls how all temperature values are displayed throughout the app
- Raw API data is always in °C; conversion to °F is applied at render time
- Conversion formula: `°F = (°C × 9/5) + 32`, rounded to nearest integer
- Display format: `{value}°C` or `{value}°F`

### Wind Speed Unit

- Controls how wind speed values are displayed
- Raw API data is in km/h
- Setting is stored and respected; wind unit toggle is available in settings panel
- Display note: km/h is the native API unit; mph conversion would be applied at render time

### Time Format

- Controls how hours are displayed in the hourly forecast
- `24h`: zero-padded hours, e.g., `09:00`, `14:00`
- `12h`: 12-hour format (available as setting; display rendering is time-format-aware)

### Default City

- Must be the name of a city currently in the favorites list
- When set, the matching favorite is auto-selected as the active city on app mount
- If the matching city is later removed from favorites, the default city setting is automatically cleared
- Clearing the setting: removing the city or selecting "None" in the dropdown sets value to `null`, which removes the localStorage key

---

## Settings Panel UI

The settings panel is a collapsible panel toggled by a "⚙️ Settings" / "⚙️ Hide Settings" button. The panel contains:

1. **Temperature** — Two-button toggle: °C / °F
2. **Wind Speed** — Two-button toggle: km/h / mph
3. **Time Format** — Two-button toggle: 24h / 12h
4. **Default Location** — Dropdown (only visible when favorites exist); options are "None" plus all saved city names

The panel is always accessible; it does not require navigation away from the current view.

---

## Persistence

All reads and writes use synchronous localStorage access wrapped in try/catch. Read failures return the default value. Write failures are silently swallowed.

| Operation | Behavior on Error |
|-----------|-------------------|
| Read | Returns default value |
| Write | Silently fails (no toast, no retry) |

---

## Interfaces Exposed

| Interface | Consumer | Description |
|-----------|----------|-------------|
| Temperature unit | WEATHER_SYSTEM display, VIEW_SYSTEM components | Passed to all temperature-displaying components |
| Wind unit | WEATHER_SYSTEM display | Passed to current weather and dashboard cards |
| Time format | VIEW_SYSTEM (HourlyForecast) | Passed to hourly forecast for time label rendering |
| Default city | LOCATION_SYSTEM | Read on mount to auto-select active city |
| Favorites reference | SETTINGS_SYSTEM (self) | Used to populate default city dropdown |
