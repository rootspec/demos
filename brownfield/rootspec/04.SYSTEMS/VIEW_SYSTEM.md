# System: VIEW_SYSTEM

**Product:** RootWeather
**Version:** 7.3.7
**Status:** Baseline

---

## Responsibility

Compose all subsystems into the application shell. Manage the active view state (`weather`, `dashboard`, `compare`), route props and callbacks to the correct child systems, and own the top-level application state that is shared across systems.

## Boundaries

**Owns:**
- `view` state: which primary view is active
- Top-level state aggregation: `city`, `favorites`, `unit`, `windUnit`, `timeFormat`, `defaultCity`, `compareMode`, `comparedCities`
- All `useEffect` hooks for persisting preference state to localStorage
- Header UI (logo, view toggle tabs)
- Footer UI (attribution, RootSpec version, links)
- The default city auto-load effect on mount
- Conditional rendering logic for which view to show

**Does not own:**
- Weather data fetching (WEATHER_SYSTEM)
- City search logic (LOCATION_SYSTEM)
- Preferences UI (SETTINGS_SYSTEM)
- Comparison selection logic (COMPARISON_SYSTEM)

## Key Files

| File | Role |
|------|------|
| `src/App.jsx` | The entire VIEW_SYSTEM; single component managing all state and composition |
| `src/main.jsx` | React entry point; renders `<App />` into the DOM |

## View States

| State | Condition | What renders |
|-------|-----------|-------------|
| `weather` | Default | SearchBar, SettingsPanel, FavoritesList, weather components (if city selected) |
| `dashboard` | User clicked "Dashboard" tab; favorites exist | SearchBar, SettingsPanel, LocationsDashboard |
| `compare` | 2+ cities selected for comparison | SearchBar, SettingsPanel, ComparisonView |

## Tab Visibility Rule

The view toggle tabs ("Weather" / "Dashboard") are only rendered when `favorites.length > 0`. An empty favorites state hides the tabs; the user is always in `weather` view.

## Attribution (Footer)

The footer displays:
- Product name and tagline
- A link to the RootSpec project
- The current RootSpec version (read from `.rootspec.json`)
- Attribution to Open-Meteo as the data source
- Links to the SEED.md and rootspec/ spec files in the GitHub repository

## Interactions with Other Systems

| System | Direction | What |
|--------|-----------|------|
| WEATHER_SYSTEM | Sends | `city.latitude`, `city.longitude` via `useWeather` hook; passes `weather`, `loading`, `error` to display components |
| LOCATION_SYSTEM | Sends + Receives | Sends `favorites[]`, `activeCity`, callbacks; receives city selection events |
| SETTINGS_SYSTEM | Sends + Receives | Sends all preference values and change callbacks; receives preference change events |
| COMPARISON_SYSTEM | Sends + Receives | Sends `compareMode`, `comparedCities[]`, compare callbacks; receives selection events and back-navigation |
