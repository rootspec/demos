# Weather System

> References: `01.PHILOSOPHY.md`, `02.TRUTHS.md`, `03.INTERACTIONS.md`, `SYSTEMS_OVERVIEW.md`

## Responsibility

Fetches weather data from the Open-Meteo API and provides it to the display layer. Owns the data model for weather conditions, forecasts, and alert derivation. Does not own display logic — it hands raw structured data to the view.

---

## Data Source

**API:** Open-Meteo (free, no API key required)
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Forecast: `https://api.open-meteo.com/v1/forecast`

The geocoding API is used by the LOCATION_SYSTEM for city search. The forecast API is used by the WEATHER_SYSTEM for all weather data.

---

## Data Model

### Current Conditions

| Field | Source | Description |
|-------|--------|-------------|
| temperature_2m | API | Temperature at 2m height in °C |
| relative_humidity_2m | API | Humidity as percentage |
| wind_speed_10m | API | Wind speed at 10m height in km/h |
| uv_index | API | UV index (numeric) |
| weather_code | API | WMO weather interpretation code |

### Hourly Forecast

Data provided for the next [hourly_forecast_hours] hours. Per-hour fields:
- `time` (ISO 8601 datetime string)
- `temperature_2m` (°C)
- `weather_code`
- `precipitation_probability` (percentage)

Display: Starting from the current hour of the current day, showing the next [hourly_forecast_hours] hours.

### Daily Forecast

Data provided for [forecast_days] days. Per-day fields:
- `time` (date string YYYY-MM-DD)
- `temperature_2m_max` (°C)
- `temperature_2m_min` (°C)
- `weather_code`
- `precipitation_probability_max` (percentage)

Display: Rendered as a 7-day chart with day labels, weather emoji, high/low temps, and a proportional bar.

### Weather Code Mapping

WMO weather interpretation codes are mapped to:
1. **Description** — Human-readable string (e.g., "Partly cloudy", "Heavy rain")
2. **Emoji** — Visual shorthand (e.g., ☀️, ⛅, ❄️, ⛈️)

Mappings are maintained as static lookup tables. Unmapped codes fall back to "Unknown" / 🌡️.

---

## Alert Derivation

Alerts are computed from current conditions — not fetched from an external service. Alert rules:

| Condition | Threshold | Alert Text | Severity |
|-----------|-----------|------------|----------|
| UV index | ≥ [uv_very_high_threshold] | "Very High UV" | High |
| UV index | ≥ [uv_high_threshold] | "High UV" | Medium |
| UV index | ≥ [uv_moderate_threshold] | "Moderate UV" | Low |
| Wind speed | ≥ [wind_storm_threshold] km/h | "Storm-force winds" | High |
| Wind speed | ≥ [wind_strong_threshold] km/h | "Strong winds" | Medium |
| Wind speed | ≥ [wind_breezy_threshold] km/h | "Breezy" | Low |
| Humidity | ≥ [humidity_high_threshold]% | "Very humid" | Low |
| Temperature | ≥ [temp_extreme_heat_threshold]°C | "Extreme heat" | High |
| Temperature | ≤ [temp_extreme_cold_threshold]°C | "Extreme cold" | High |
| Temperature | ≤ [temp_freezing_threshold]°C | "Freezing" | Low |

Multiple alerts can be active simultaneously. Alerts render as colored badges above the weather card.

---

## Fetch Behavior

### Single City (Weather View)

- Triggered by the `useWeather` hook when lat/lon changes
- Cancels any in-flight request when coordinates change (cleanup via cancelled flag)
- Exposes: `{ weather, loading, error }`
- No caching — each coordinate change triggers a fresh fetch

### Multiple Cities (Dashboard / Comparison)

- All cities fetched in parallel using `Promise.all`
- Individual city failures do not block other cities from rendering
- Failed city shows "Unable to load" in its card/column

---

## Interfaces Exposed

| Interface | Consumer | Description |
|-----------|----------|-------------|
| Weather data object | VIEW_SYSTEM | Full API response including current, hourly, daily |
| Loading state | VIEW_SYSTEM | Boolean; triggers loading indicator |
| Error state | VIEW_SYSTEM | Error message string; triggers error display |
| Alert derivation | VIEW_SYSTEM (WeatherAlerts) | Computes badge list from current conditions |
| Weather description | VIEW_SYSTEM | Human-readable string from WMO code |
| Weather emoji | VIEW_SYSTEM | Emoji character from WMO code |

---

## Temperature and Wind Display

Raw API data is always in metric (°C, km/h). The SETTINGS_SYSTEM provides the user's preferred unit. Conversion happens at display time via a utility function:
- °C → °F: `(celsius * 9/5) + 32`, rounded to nearest integer
- Wind: SETTINGS_SYSTEM determines displayed unit; currently km/h is the only fetched unit (conversion to mph would be done at display time if implemented)
