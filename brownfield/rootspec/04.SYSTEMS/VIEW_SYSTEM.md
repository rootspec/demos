# View System

> References: `01.PHILOSOPHY.md`, `02.TRUTHS.md`, `03.INTERACTIONS.md`, `SYSTEMS_OVERVIEW.md`

## Responsibility

Manages which view is active, orchestrates layout transitions, and coordinates the comparison flow. The View System is the conductor: it reads state from other systems and decides what the user sees.

---

## View States

The app has three mutually exclusive views:

| View | Value | Description |
|------|-------|-------------|
| Weather View | `'weather'` | Single-city detail: current conditions, hourly, 7-day chart, alerts |
| Dashboard View | `'dashboard'` | Grid of all saved cities with current conditions summary |
| Comparison View | `'compare'` | Side-by-side columns for 2–[max_compare_cities] cities |

View state is held in memory. It is not persisted across sessions. On mount, the app starts in `weather` view.

---

## View Transition Rules

| Trigger | From | To |
|---------|------|----|
| City selected (search or favorites) | Any | `weather` |
| "Weather" toggle button clicked | `dashboard` | `weather` |
| "Dashboard" toggle button clicked | `weather` | `dashboard` |
| [min_compare_cities]+ cities selected in compare mode | `dashboard` (compare mode active) | `compare` |
| "Back to Dashboard" clicked | `compare` | `dashboard` |
| Comparison drops below [min_compare_cities] cities | `compare` | `dashboard` |

The view toggle ("Weather" / "Dashboard") is only rendered when favorites exist ([min_favorites_for_dashboard] or more saved locations).

---

## Layout Behavior

| View | Max Width |
|------|-----------|
| Weather / Dashboard | [standard_max_width] |
| Comparison | [comparison_max_width] |

The app container class changes when comparison is active (`.app.comparison-active`), expanding the max-width to accommodate side-by-side columns.

---

## Comparison Mode

Comparison mode is a sub-state of the dashboard view, not a view itself. It activates a selection UI on top of the dashboard:

1. `compareMode: true` is set when the user clicks "Compare"
2. A prompt appears: "Select at least [min_compare_cities] cities to compare (N selected)"
3. Location cards become selectable — clicking toggles selection state
4. Selection is tracked as `comparedCities[]`
5. When `comparedCities.length >= [min_compare_cities]`, the view auto-transitions to `compare` and `compareMode` is reset to `false`
6. Maximum [max_compare_cities] cities can be selected; additional clicks are ignored when at the limit

### Comparison View Columns

Each selected city renders in a column containing:
- City name header with a remove (✕) button
- WeatherAlerts component
- CurrentWeather component
- HourlyForecast component
- ForecastChart component

Removing a city: if the remaining cities drop below [min_compare_cities], `comparedCities` is cleared and view returns to `dashboard`.

---

## Component Rendering Rules

### Weather View (`view === 'weather'`)

Renders:
- FavoritesList (if favorites exist)
- Loading indicator (if weather loading)
- Error message (if weather error)
- If weather data and active city exist:
  - "Save Location" button (if city not already in favorites)
  - WeatherAlerts
  - CurrentWeather
  - HourlyForecast
  - ForecastChart
- Empty state (if no city selected and not loading)

### Dashboard View (`view === 'dashboard'`)

Renders:
- LocationsDashboard (with all favorites, compare mode state, and handlers)

### Comparison View (`view === 'compare'`)

Renders:
- ComparisonView (with selected cities, unit settings, and handlers)

---

## Interfaces Consumed

| Interface | Source | Description |
|-----------|--------|-------------|
| Active city | LOCATION_SYSTEM | Determines what weather to show; drives view switch |
| Favorites list | LOCATION_SYSTEM | Controls view toggle visibility; populates dashboard |
| Weather data / loading / error | WEATHER_SYSTEM | Controls weather view rendering |
| Temperature unit | SETTINGS_SYSTEM | Passed to weather display components |
| Time format | SETTINGS_SYSTEM | Passed to hourly forecast component |
