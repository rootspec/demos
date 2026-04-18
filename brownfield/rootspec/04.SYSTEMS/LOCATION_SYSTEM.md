# System: LOCATION_SYSTEM

**Product:** RootWeather
**Version:** 7.3.7
**Status:** Baseline

---

## Responsibility

Allow users to discover cities via search, save them as favorites, switch between saved locations, and manage their saved list (add, remove, select). Also responsible for loading and applying the user's default city on app start.

## Boundaries

**Owns:**
- City search UI and geocoding API calls (`SearchBar`)
- Favorites list display and interaction (`FavoritesList`)
- Locations dashboard grid display (`LocationsDashboard`)
- Reading/writing favorites from localStorage
- Default city resolution on app mount

**Does not own:**
- The weather data for any city (owned by WEATHER_SYSTEM)
- Unit/format preferences (owned by SETTINGS_SYSTEM)
- Compare mode activation or comparison selection (owned by COMPARISON_SYSTEM)

## Data Ownership

| Data | Type | Source | Persisted |
|------|------|--------|-----------|
| `favorites[]` | Array of `{name, latitude, longitude, country}` | User actions | Yes (localStorage: `rootweather_favorites`) |
| `city` | Selected city object or null | User actions + default city | No (in-memory; loaded from favorites on mount) |

## Key Files

| File | Role |
|------|------|
| `src/components/SearchBar.jsx` | Debounced city search input; dropdown with up to 5 results; calls `searchCities()` |
| `src/components/FavoritesList.jsx` | Horizontal chip list of saved locations; supports select and remove |
| `src/components/LocationsDashboard.jsx` | Grid of favorite city cards with live weather summaries; supports compare mode selection |
| `src/utils/storage.js` | `loadFavorites()`, `saveFavorites()`, `loadDefaultCity()`, `saveDefaultCity()` |

## Search Behavior

- Minimum 2 characters before geocoding request fires
- 300ms debounce on keystroke
- Returns up to 5 results: `{name, admin1, country, latitude, longitude}`
- Selecting a city populates the search field with the city name and triggers weather load

## Default City Behavior

On app mount:
1. Load `defaultCity` name from localStorage
2. Load `favorites[]` from localStorage
3. If `defaultCity` is set and a matching favorite exists by name, auto-select that city

Clearing a favorite that was the default city also clears the `defaultCity` preference.

## Interactions with Other Systems

| System | Direction | What |
|--------|-----------|------|
| VIEW_SYSTEM | Sends | Selected city object (triggers weather fetch) |
| VIEW_SYSTEM | Receives | `favorites[]`, `activeCity`, callbacks for select/remove |
| SETTINGS_SYSTEM | Shares storage | `defaultCity` key in localStorage (written by SETTINGS_SYSTEM, read on mount by LOCATION_SYSTEM) |
| COMPARISON_SYSTEM | Provides | Favorites list; dashboard's compare mode UI is orchestrated by COMPARISON_SYSTEM |
| WEATHER_SYSTEM | Consumed by | LocationsDashboard fetches weather for all favorites in parallel via `getWeather()` |
