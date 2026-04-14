# VIEW_SYSTEM

## Purpose

Manages screen state, layout, and the composition of all visual elements. Orchestrates data from other systems into the user-facing interface.

## Boundary

Owns the active view state (weather vs. dashboard), loading/error presentation, and layout structure. Does not own data fetching, persistence, or business logic.

## Data

### View State
- `view` (enum) — `weather`, `dashboard`, or `compare`
- `city` (City or null) — currently selected city in weather view
- `comparedCities` (City[], max [max_comparison_cities]) — cities selected for side-by-side comparison

### Screen Regions
| Region | Contents |
|--------|----------|
| Meta Banner | Persistent top-of-page strip identifying this as a RootSpec brownfield demo, with links to SEED.md and spec files on GitHub |
| Header | App title, view toggle (appears when favorites exist) |
| Search | City search input with autocomplete dropdown |
| Settings | Collapsible settings panel |
| Content | Weather view OR Dashboard view (mutually exclusive) |
| Footer | Attribution and version info |

### Weather View Layout (when city selected)
1. Favorites bar (chips)
2. Save Location button (if current city is not a favorite)
3. Condition alerts (if any thresholds met)
4. Current weather card (temp, humidity, wind, UV)
5. Hourly forecast (scrollable horizontal strip)
6. 7-day forecast (vertical bar chart)

### Dashboard View Layout
- Grid of location cards (auto-fill, responsive columns)
- Each card shows city name, emoji, temperature, humidity, wind
- "Compare" button appears when [min_comparison_cities]+ favorites exist
- In comparison selection mode, cards show selectable highlight state

### Comparison View Layout
- Side-by-side columns ([min_comparison_cities] to [max_comparison_cities] equal-width columns)
- "Back to Dashboard" navigation at top
- Each column contains:
  1. City name header (click to deselect/remove from comparison)
  2. Current conditions card (temperature, humidity, wind, UV)
  3. Condition alerts (if any thresholds met)
  4. Hourly forecast (compact horizontal strip)
  5. 7-day forecast (compact bar chart)

## Behavior

- Meta banner is always visible regardless of view state; links use absolute GitHub URLs and open in new tabs
- View toggle only renders when favorites list is non-empty
- Selecting a city from search or dashboard switches to weather view
- Compare button only renders on dashboard when favorites count >= [min_comparison_cities]
- Entering comparison mode shows selectable cards; selecting enough cities transitions to comparison view
- Deselecting a city in comparison view removes its column; dropping below minimum exits to dashboard
- Loading state shows centered text during weather fetch
- Error state shows styled error message
- Empty state prompts user to search when no city is selected
- Dashboard fetches all locations in parallel on mount and when favorites change

## Interactions

- **← WEATHER_SYSTEM:** Receives weather data, loading, error states
- **← LOCATION_SYSTEM:** Receives favorites list, active city, search results
- **← SETTINGS_SYSTEM:** Receives display preferences for formatting
- **→ LOCATION_SYSTEM:** Dispatches search, select, save, remove actions
- **→ SETTINGS_SYSTEM:** Dispatches setting change actions
