# System: COMPARISON_SYSTEM

**Product:** RootWeather
**Version:** 7.3.7
**Status:** Baseline

---

## Responsibility

Enable users to select 2–3 saved locations from the dashboard and view them side-by-side in a full-width comparison layout. Manage the compare mode selection flow and the auto-transition to comparison view.

## Boundaries

**Owns:**
- Compare mode state (`compareMode`, `comparedCities[]`)
- Selection toggling logic (add/remove cities from comparison set, enforce max-3 cap)
- Auto-transition trigger (when 2+ cities are selected, transition to comparison view)
- Comparison view rendering (`ComparisonView`)
- Parallel weather fetch for all compared cities

**Does not own:**
- The favorites list (owned by LOCATION_SYSTEM)
- Dashboard grid layout (shared with LOCATION_SYSTEM; compare mode props are passed into LocationsDashboard)
- Unit/timeFormat preferences (owned by SETTINGS_SYSTEM; received as props)

## Data Ownership

| Data | Type | Source | Persisted |
|------|------|--------|-----------|
| `compareMode` | boolean | User action (click "Compare") | No |
| `comparedCities[]` | Array of city objects | User selection | No |

## Key Files

| File | Role |
|------|------|
| `src/components/ComparisonView.jsx` | Side-by-side columns; fetches weather for all compared cities in parallel; each column shows current, alerts, hourly, 7-day |
| `src/components/LocationsDashboard.jsx` | Renders compare-mode affordances on dashboard cards (border highlight, selection toggle) |

## Selection Rules

- Minimum 2 cities required to enter comparison view
- Maximum 3 cities can be selected simultaneously
- Selecting a 4th city when 3 are already selected is silently ignored
- Deselecting a city when only 2 remain drops to 0 and returns to dashboard (no 1-city comparison state)
- Removing a city from the comparison view follows the same rule: drop below 2 → return to dashboard

## Auto-Transition Logic

When `compareMode === true` and `comparedCities.length >= 2`:
- `view` is set to `'compare'`
- `compareMode` is set to `false` (no longer in selection mode)

When `comparedCities.length` drops below 2 in comparison view:
- `comparedCities` is reset to `[]`
- `view` is set to `'dashboard'`

## Interactions with Other Systems

| System | Direction | What |
|--------|-----------|------|
| VIEW_SYSTEM | Receives | `compareMode`, `comparedCities[]`, compare callbacks; manages view transition |
| LOCATION_SYSTEM | Receives | `favorites[]` as source of selectable cities |
| WEATHER_SYSTEM | Calls | `getWeather()` directly inside ComparisonView for all compared cities in parallel |
| SETTINGS_SYSTEM | Receives | `unit`, `timeFormat` props for rendering weather in comparison columns |
