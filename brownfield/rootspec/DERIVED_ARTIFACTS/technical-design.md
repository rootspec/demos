# Technical Design

Derived from the RootWeather specification. This is a brownfield project — conventions are documented from existing code, with notes on spec alignment.

---

## 1. Technology Stack

> Source: scan-project.sh output, 04.SYSTEMS/SYSTEMS_OVERVIEW.md

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | React | ^18.2.0 | Functional components + class components (mixed) |
| Build tool | Vite | ^5.0.0 | Default config, no custom plugins |
| Styling | CSS Modules + styled-components + inline styles | Mixed | Three styling approaches coexist |
| Language | JavaScript (ES modules) | — | No TypeScript, JSX files |
| API | Open-Meteo (REST, keyless) | — | Geocoding + forecast endpoints |
| Testing | Cypress (newly added) | — | E2E only, no unit tests |
| State | React useState + localStorage | — | No state library |

**Spec alignment notes:**
- L2 mandates client-only architecture — ✅ no backend exists
- L2 mandates free keyless APIs — ✅ Open-Meteo requires no auth
- Mixed component styles (class vs functional) are a legacy artifact, not a design choice

---

## 2. Architecture Patterns

> Source: 04.SYSTEMS/SYSTEMS_OVERVIEW.md, 02.TRUTHS.md

**Module structure:** Flat `src/components/` directory. No routing — single-page app with view state managed in `App.jsx`.

**State management:** All state lives in `App.jsx` and flows down via props. No context, no reducers, no state library. Settings and favorites are synced to localStorage via `useEffect`.

**Data flow:**
```
User action → App.jsx handler → state update → re-render
                                    ↓
                              localStorage sync (side effect)
```

Weather fetching is encapsulated in `useWeather` hook (cancellable). `LocationsDashboard` has its own fetch logic (class component with `componentDidMount`).

**Spec alignment notes:**
- L4 defines four systems; code maps to them naturally:
  - WEATHER_SYSTEM → `utils/api.js`, `hooks/useWeather.js`, `WeatherAlerts.jsx`
  - LOCATION_SYSTEM → `utils/api.js` (searchCities), `utils/storage.js` (favorites)
  - SETTINGS_SYSTEM → `utils/storage.js` (units/format), `SettingsPanel.jsx`
  - VIEW_SYSTEM → `App.jsx`, all display components

---

## 3. Coding Conventions

> Source: Existing codebase patterns

**File naming:**
- Components: PascalCase `.jsx` (e.g., `SearchBar.jsx`)
- Utilities: camelCase `.js` (e.g., `temperature.js`)
- Hooks: camelCase with `use` prefix `.js` (e.g., `useWeather.js`)
- CSS Modules: `ComponentName.module.css`

**Component patterns:**
- Class components: `SearchBar`, `ForecastChart`, `HourlyForecast`, `LocationsDashboard`, `SettingsPanel`
- Functional components: `CurrentWeather`, `FavoritesList`, `WeatherAlerts`, `App`
- No consistent pattern — legacy vs newer code

**Styling approaches (three coexist):**
1. CSS Modules (SearchBar, CurrentWeather, HourlyForecast, SettingsPanel)
2. styled-components (FavoritesList, WeatherAlerts)
3. Inline styles (ForecastChart, LocationsDashboard)

**Export pattern:** Default exports for all components. Named exports for utility functions.

---

## 4. API Approach

> Source: 04.SYSTEMS/WEATHER_SYSTEM.md, 04.SYSTEMS/LOCATION_SYSTEM.md

Two Open-Meteo endpoints, both GET with query parameters:

| Endpoint | Base URL | Purpose |
|----------|---------|---------|
| Geocoding | `geocoding-api.open-meteo.com/v1/search` | City search by name |
| Forecast | `api.open-meteo.com/v1/forecast` | Current + hourly + daily weather |

No auth headers, no API keys, no rate limiting (public tier). Responses are JSON. Error handling is minimal — fetch failures surface as error state in the UI.

---

## 5. Data Model

> Source: 04.SYSTEMS/ (all system docs)

**City** (transient, from geocoding response):
- `id`, `name`, `latitude`, `longitude`, `country`, `admin1`

**Favorite** (persisted to localStorage):
- `name`, `latitude`, `longitude`, `country`
- Keyed by `${latitude}-${longitude}` for uniqueness

**Settings** (persisted to localStorage):
- `rootweather_unit`: "celsius" | "fahrenheit"
- `rootweather_wind_unit`: "kmh" | "mph"
- `rootweather_time_format`: "24h" | "12h"
- `rootweather_default_city`: string | null
- `rootweather_favorites`: JSON array of Favorite objects

**Weather data** (transient, from API response):
- Not stored — re-fetched on every city selection

---

## 6. Testing Strategy

> Source: 05.IMPLEMENTATION/USER_STORIES/baseline.yaml

**E2E (Cypress):** 14 user stories with acceptance criteria covering all user-facing flows. Stories are tagged `@phase: baseline` — they validate existing functionality.

**Unit tests:** None currently. Low priority given the simple logic (temperature conversion, alert threshold checks). Could be added for `utils/temperature.js` and `WeatherAlerts` alert logic if regressions appear.

**Integration tests:** Not applicable — no backend, no database, no complex system interactions. E2E covers the integration surface.

**Test data:** Tests use real API calls (Open-Meteo is free and stable). No mocks, no fixtures. This means tests depend on network availability and may have non-deterministic results for condition-specific tests (e.g., US-103 alert visibility depends on actual Dubai weather).
