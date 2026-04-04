# WEATHER_SYSTEM

## Purpose

Fetches, parses, and presents weather data from the Open-Meteo API. Generates condition-based alerts from current readings.

## Boundary

Owns all communication with the Open-Meteo forecast API. Does not own city search (that's LOCATION_SYSTEM) or display preferences (SETTINGS_SYSTEM). Provides raw weather data; VIEW_SYSTEM handles rendering.

## Data

### Weather Response (from API)
- `current` — temperature_2m, relative_humidity_2m, wind_speed_10m, uv_index, weather_code
- `hourly` — temperature_2m[], weather_code[], precipitation_probability[] (indexed by time[])
- `daily` — temperature_2m_max[], temperature_2m_min[], weather_code[], precipitation_probability_max[] (indexed by time[])
- `timezone` — auto-detected from coordinates

### Weather Code Mapping
- Numeric code → human-readable description (e.g., 0 → "Clear sky")
- Numeric code → emoji indicator (e.g., 0 → sun, 95+ → thunderstorm)

### Condition Alerts
Derived from current readings using threshold checks:

| Condition | Thresholds | Severity Levels |
|-----------|-----------|-----------------|
| UV index | [moderate_uv], [high_uv], [very_high_uv] | Moderate, High, Very High |
| Wind speed | [breezy_wind], [strong_wind], [storm_wind] | Breezy, Strong, Storm-force |
| Humidity | [high_humidity] | Very humid |
| Temperature | [freezing_temp], [extreme_cold], [extreme_heat] | Freezing, Extreme cold, Extreme heat |

## Behavior

- Fetches [forecast_days]-day forecast with hourly and daily granularity
- Cancels in-flight requests when coordinates change (prevents race conditions)
- Returns loading, error, and data states
- Alert generation is a pure function of current conditions — no history, no persistence
- Hourly forecast window starts from the current hour and shows [hourly_window] hours ahead

## Interactions

- **← LOCATION_SYSTEM:** Receives latitude/longitude coordinates to fetch weather for
- **← VIEW_SYSTEM:** Dashboard view triggers parallel fetches for all favorite locations
- **→ VIEW_SYSTEM:** Provides weather data, loading state, error state, and alert list
