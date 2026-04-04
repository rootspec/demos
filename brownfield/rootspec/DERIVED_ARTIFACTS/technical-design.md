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
- L2 mandates client-only architecture — no backend exists
- L2 mandates free keyless APIs — Open-Meteo requires no auth
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

**Comparison view:** The new comparison feature introduces a third view state (`compare`) in App.jsx. Comparison selection state (`comparedCities` array) is managed alongside the existing `view` state. Weather data for compared cities can reuse the dashboard's parallel-fetch pattern from `LocationsDashboard`.

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
- New components should prefer functional style with hooks

**Styling approaches (three coexist):**
1. CSS Modules (SearchBar, CurrentWeather, HourlyForecast, SettingsPanel)
2. styled-components (FavoritesList, WeatherAlerts)
3. Inline styles (ForecastChart, LocationsDashboard)

New comparison components should use CSS Modules for consistency with the majority of existing components.

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

The comparison view fetches weather for 2-3 cities in parallel using the same pattern as the dashboard (`Promise.all` over `getWeather` calls).

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

**View state** (transient, in-memory):
- `view`: "weather" | "dashboard" | "compare"
- `comparedCities`: City[] (max 3, subset of favorites)

**Weather data** (transient, from API response):
- Not stored — re-fetched on every city selection or comparison entry

---

## 6. Testing Strategy

> Source: 05.IMPLEMENTATION/USER_STORIES/

**E2E (Cypress):** 19 user stories across 2 phases:
- `baseline` (14 stories) — existing functionality
- `comparison` (5 stories) — side-by-side comparison feature

**Unit tests:** None currently. Low priority given the simple logic (temperature conversion, alert threshold checks).

**Integration tests:** Not applicable — no backend, no database. E2E covers the integration surface.

**Test data:** Tests use real API calls (Open-Meteo is free and stable). No mocks, no fixtures, except US-103 which intercepts the API to ensure deterministic alert conditions.

**Comparison tests:** Require saving 2+ favorites as setup, then navigating through dashboard → compare mode → selection → comparison view. Each test has a long given-chain of setup steps.
