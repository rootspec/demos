# Technical Conventions

## Stack
- **Framework:** React 18 (Vite)
- **Language:** JavaScript (JSX) — mix of class and function components
- **Styling:** CSS Modules for most components; styled-components (v5) for FavoritesList and WeatherAlerts
- **State:** useState/useEffect hooks in App.jsx; class component state where legacy components remain
- **Data fetching:** Open-Meteo geocoding + weather APIs via utils/api.js; useWeather custom hook

## File Organization
- **Entry:** src/main.jsx → src/App.jsx
- **Components:** src/components/ (one file per component, CSS module alongside)
- **Hooks:** src/hooks/useWeather.js
- **Utils:** src/utils/ (api.js, storage.js, temperature.js)
- **Styles:** src/styles/global.css (global classes: .app, .header, .empty, .save-btn, .view-toggle, .view-btn, .compare-btn)
- **Tests:** cypress/e2e/mvp.cy.ts (single test file, all 14 stories)

## Routing
- **Base path:** /demos/brownfield/ (always, including dev server)
- **SPA:** No router — view state managed in App.jsx (view: 'weather' | 'dashboard' | 'compare')

## Component Patterns
- **Class components:** SearchBar, SettingsPanel, HourlyForecast, LocationsDashboard, ForecastChart
- **Function components:** App, CurrentWeather, FavoritesList, WeatherAlerts, ComparisonView
- **Props pattern:** callbacks passed down (onCitySelect, onUnitChange, etc.)

## Selector Conventions
- Global CSS classes used for test selectors: .save-btn, .empty, .view-toggle, .view-btn, .compare-btn, .comparison-view, .back-to-dashboard, .weather-alerts, .card, .details
- styled-components: add explicit className prop ("Chip", "RemoveBtn") for testability
- data-testid attributes: compare-card, comparison-column, comparison-remove

## App Readiness
- **Deferred-execution boundaries:** None detected (static React Vite project)
- **Current implementation:** cypress/support/app-ready.ts throws until customized
- **Readiness signal:** Not implemented - project appears to be static with no hydration islands, Suspense boundaries, or lazy loading
- **Framework contract:** cy.appReady() called after cy.visit() in test steps to ensure interactive readiness

## Build
- **Dev server:** ./scripts/dev.sh start (port 5173)
- **Build command:** vite build
- **Test command:** ./scripts/test.sh
