# Location System

> References: `01.PHILOSOPHY.md`, `02.TRUTHS.md`, `03.INTERACTIONS.md`, `SYSTEMS_OVERVIEW.md`

## Responsibility

Manages everything related to cities: search, selection, favorites (saved locations), and default city. It is the primary entry point for the user's intent — "I want weather for THIS place."

---

## Data Owned

### City Entity

| Attribute | Type | Description |
|-----------|------|-------------|
| name | string | City display name |
| latitude | float | Geographic latitude |
| longitude | float | Geographic longitude |
| country | string | Country code or name |
| admin1 | string (optional) | State / province / region |

Cities are identified by their lat/lon coordinate pair, not by name alone. Two cities with the same name in different regions are distinct entities.

### Favorites List

An ordered array of City entities saved by the user. Stored in localStorage under a fixed key. Loaded on app mount; written on every change.

### Active City

The currently selected city whose weather is being displayed. Held in memory only; not persisted. On return visits, the active city is restored from the default city setting if one is configured.

---

## Rules

### Search

- Query must be at least [search_min_chars] characters to trigger an API call
- Search is debounced: API call fires after [search_debounce_ms] ms of inactivity
- Returns up to [search_max_results] candidate cities
- Dropdown displays: `{name}, {admin1} {country}` per result
- Selecting a result sets that city as the active city and clears the dropdown

### Favorites

- A city can only appear in favorites once (uniqueness enforced by lat/lon pair)
- Adding a favorite does not require the city to be currently active (though in practice it always is)
- Removing a favorite: if the removed city was the default city, the default city is cleared
- Favorites are saved to localStorage on every mutation
- Maximum favorites count: unconstrained (no enforced limit)

### Default City

- The default city is a city name string, not a full City entity
- On mount: if a default city is set and that name exists in favorites, the matching favorite is auto-selected as the active city
- If the name is not found in favorites (e.g., it was removed), no auto-selection occurs

---

## Interfaces Exposed

| Interface | Consumer | Description |
|-----------|----------|-------------|
| Active city (lat/lon) | WEATHER_SYSTEM | Triggers weather fetch when changed |
| Active city selection | VIEW_SYSTEM | Switches view to `weather` mode |
| Favorites list | VIEW_SYSTEM | Displayed as chips (weather view) and cards (dashboard) |
| Favorites list | SETTINGS_SYSTEM | Populates default city dropdown |
| Favorites list | VIEW_SYSTEM (compare) | Source of cities available for comparison selection |

---

## Interactions with Other Systems

- **→ WEATHER_SYSTEM:** When a city is selected, its lat/lon is passed to the weather fetch hook
- **→ VIEW_SYSTEM:** City selection sets view to `weather`
- **← SETTINGS_SYSTEM:** Default city name read from settings on mount to auto-select active city
