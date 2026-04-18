# Level 4: Systems Overview

**Product:** RootWeather
**Version:** 7.3.7
**Status:** Baseline

---

## System Map

RootWeather is composed of five systems. Each has a single responsibility and communicates with others through props, state callbacks, or shared utility functions.

```
┌─────────────────────────────────────────────────┐
│                   VIEW SYSTEM                   │
│  (App.jsx — view state, navigation, composition) │
└───────────────┬─────────────────────────────────┘
                │ uses
    ┌───────────┼───────────────────────┐
    ▼           ▼                       ▼
┌─────────┐ ┌──────────┐  ┌────────────────────┐
│ WEATHER │ │ LOCATION │  │  SETTINGS SYSTEM   │
│ SYSTEM  │ │ SYSTEM   │  │  (unit, windUnit,  │
│ (API,   │ │ (favs,   │  │   timeFormat,      │
│ hook,   │ │ default  │  │   defaultCity)     │
│ alerts) │ │ city)    │  └────────────────────┘
└─────────┘ └──────────┘
                │
                ▼
    ┌───────────────────────┐
    │  COMPARISON SYSTEM    │
    │  (compare mode,       │
    │   selected cities,    │
    │   side-by-side view)  │
    └───────────────────────┘
```

---

## Systems

| System | File(s) | Responsibility |
|--------|---------|----------------|
| **WEATHER_SYSTEM** | `utils/api.js`, `hooks/useWeather.js`, `components/CurrentWeather.jsx`, `components/HourlyForecast.jsx`, `components/ForecastChart.jsx`, `components/WeatherAlerts.jsx` | Fetch, decode, and render weather data for a single location |
| **LOCATION_SYSTEM** | `utils/storage.js` (favorites), `components/SearchBar.jsx`, `components/FavoritesList.jsx`, `components/LocationsDashboard.jsx` | Search cities, manage saved locations, display favorites |
| **SETTINGS_SYSTEM** | `utils/storage.js` (settings keys), `components/SettingsPanel.jsx` | Manage and persist user preferences (units, time format, default city) |
| **COMPARISON_SYSTEM** | `components/ComparisonView.jsx`, `components/LocationsDashboard.jsx` (compare mode) | Multi-city comparison selection and side-by-side display |
| **VIEW_SYSTEM** | `App.jsx` | Compose all systems, manage view state (weather / dashboard / compare), own top-level data flow |

---

## Interactions Table

| From | To | Mechanism | Data |
|------|----|-----------|------|
| VIEW_SYSTEM | WEATHER_SYSTEM | Props + `useWeather` hook | `latitude`, `longitude` → `weather`, `loading`, `error` |
| VIEW_SYSTEM | LOCATION_SYSTEM | Props + callbacks | `favorites[]`, `onSelect`, `onRemove`, `activeCity` |
| VIEW_SYSTEM | SETTINGS_SYSTEM | Props + callbacks | `unit`, `windUnit`, `timeFormat`, `defaultCity`, change handlers |
| VIEW_SYSTEM | COMPARISON_SYSTEM | Props + callbacks | `comparedCities[]`, `compareMode`, compare handlers |
| LOCATION_SYSTEM | WEATHER_SYSTEM | Parent (App) mediates | City selection triggers weather fetch via `city` state |
| COMPARISON_SYSTEM | WEATHER_SYSTEM | Direct fetch in component | Parallel `getWeather()` calls for all compared cities |
| SETTINGS_SYSTEM | WEATHER_SYSTEM | Props threading | `unit`, `timeFormat` passed down to all weather display components |
| SETTINGS_SYSTEM | LOCATION_SYSTEM | Shared storage | `defaultCity` key in localStorage; favorites loaded by location system |

---

## Data Flow

```
localStorage
    │
    ├── favorites[] ──────────────────────► LOCATION_SYSTEM (FavoritesList, LocationsDashboard)
    ├── unit ─────────────────────────────► SETTINGS_SYSTEM → all weather display components
    ├── windUnit ─────────────────────────► SETTINGS_SYSTEM → SettingsPanel
    ├── timeFormat ───────────────────────► SETTINGS_SYSTEM → HourlyForecast
    └── defaultCity ──────────────────────► LOCATION_SYSTEM → auto-select on mount

User types city
    └── SearchBar → geocoding API → city object (name, lat, lon, country)
            └──► App.city state → useWeather(lat, lon) → weather object
                        └──► CurrentWeather, HourlyForecast, ForecastChart, WeatherAlerts
```
