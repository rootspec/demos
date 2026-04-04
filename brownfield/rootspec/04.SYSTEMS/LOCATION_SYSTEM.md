# LOCATION_SYSTEM

## Purpose

Manages city search, saved locations (favorites), and the default city. Handles geocoding and location persistence.

## Boundary

Owns all communication with the Open-Meteo geocoding API. Owns the favorites list and default city preference. Does not own weather data fetching (WEATHER_SYSTEM) or display settings (SETTINGS_SYSTEM).

## Data

### City
- `name` (string) — display name from geocoding result
- `latitude` (number) — decimal degrees
- `longitude` (number) — decimal degrees
- `country` (string) — country name
- `admin1` (string, optional) — state/province for disambiguation

### Favorites List
- Ordered array of City objects
- Persisted to localStorage under a dedicated key
- Uniqueness enforced by latitude + longitude pair

### Default City
- Name of a city in the favorites list (or null)
- Persisted to localStorage under a dedicated key
- Cleared if the referenced favorite is removed

## Behavior

- **Search:** Queries geocoding API with [min_search_length]-character minimum, debounced by [search_debounce]. Returns up to [max_search_results] results.
- **Add favorite:** Checks for duplicate by lat/lon before adding. Appends to end of list.
- **Remove favorite:** Filters by lat/lon. If removed city is the default, clears default.
- **Default city load:** On app mount, if a default city is set and exists in favorites, auto-selects it.

## Interactions

- **→ WEATHER_SYSTEM:** Provides coordinates for weather fetching
- **→ VIEW_SYSTEM:** Provides favorites list for chips and dashboard, active city state
- **← VIEW_SYSTEM:** Receives user actions (search, select, save, remove)
