# Level 4: Systems Overview

> References: `01.PHILOSOPHY.md`, `02.TRUTHS.md`, `03.INTERACTIONS.md`

## System Map

RootWeather is composed of four major systems:

| System | File | Responsibility |
|--------|------|----------------|
| LOCATION_SYSTEM | `LOCATION_SYSTEM.md` | City search, favorites management, default city |
| WEATHER_SYSTEM | `WEATHER_SYSTEM.md` | API integration, data fetching, weather data model |
| VIEW_SYSTEM | `VIEW_SYSTEM.md` | View state management, comparison mode, layout |
| SETTINGS_SYSTEM | `SETTINGS_SYSTEM.md` | User preferences, unit conversion, persistence |

---

## System Interactions

| From | To | Interaction |
|------|----|-------------|
| LOCATION_SYSTEM | WEATHER_SYSTEM | Provides lat/lon when a city is selected; triggers weather fetch |
| LOCATION_SYSTEM | VIEW_SYSTEM | City selection switches view to `weather` mode |
| SETTINGS_SYSTEM | WEATHER_SYSTEM | Temperature and wind unit affects display of fetched weather values |
| VIEW_SYSTEM | WEATHER_SYSTEM | Dashboard and comparison views trigger parallel weather fetches for all/selected cities |
| VIEW_SYSTEM | LOCATION_SYSTEM | Compare mode reads favorites list to populate city selection |
| SETTINGS_SYSTEM | LOCATION_SYSTEM | Default city setting references favorites list |

---

## Data Flow

```
User types query
  → LOCATION_SYSTEM (search API call)
    → returns city candidates with lat/lon
      → user selects city
        → LOCATION_SYSTEM stores selection
          → WEATHER_SYSTEM fetches forecast for lat/lon
            → VIEW_SYSTEM renders: CurrentWeather, HourlyForecast, ForecastChart, WeatherAlerts
              → SETTINGS_SYSTEM provides unit context for display
```

```
User opens Dashboard
  → VIEW_SYSTEM reads LOCATION_SYSTEM favorites
    → WEATHER_SYSTEM fetches current conditions for all favorites in parallel
      → VIEW_SYSTEM renders location cards with condition summaries
```

```
User initiates Comparison
  → VIEW_SYSTEM enters compare selection mode
    → User selects cities from favorites
      → VIEW_SYSTEM transitions to comparison view
        → WEATHER_SYSTEM fetches full forecast for each selected city
          → VIEW_SYSTEM renders side-by-side columns
```

---

## State Ownership

| State | Owner | Persistence |
|-------|-------|-------------|
| Active city (lat/lon/name) | LOCATION_SYSTEM | In-memory (session only) |
| Favorites list | LOCATION_SYSTEM | localStorage |
| Default city name | SETTINGS_SYSTEM | localStorage |
| Temperature unit | SETTINGS_SYSTEM | localStorage |
| Wind speed unit | SETTINGS_SYSTEM | localStorage |
| Time format | SETTINGS_SYSTEM | localStorage |
| Current view mode | VIEW_SYSTEM | In-memory (session only) |
| Compare mode active | VIEW_SYSTEM | In-memory (session only) |
| Cities selected for comparison | VIEW_SYSTEM | In-memory (session only) |
| Weather data cache | WEATHER_SYSTEM | In-memory (per-fetch, no caching) |
