# SETTINGS_SYSTEM

## Purpose

Manages user display preferences and persists them across sessions via localStorage.

## Boundary

Owns all user-configurable display settings. Does not own location data or weather data. A leaf system — consumes nothing from other systems.

## Data

### Settings
| Setting | Type | Values | Default |
|---------|------|--------|---------|
| Temperature unit | enum | celsius, fahrenheit | celsius |
| Wind speed unit | enum | kmh, mph | kmh |
| Time format | enum | 24h, 12h | 24h |
| Default city | string or null | Name from favorites list | null |

Each setting has a dedicated localStorage key prefixed with `rootweather_`.

## Behavior

- Settings are loaded from localStorage on app initialization with fallback to defaults
- Every setting change is immediately persisted to localStorage
- Settings apply instantly — no save/cancel flow, no confirmation
- Panel is collapsible (collapsed by default) to avoid visual clutter
- Default city selector only appears when favorites list is non-empty

## Interactions

- **→ VIEW_SYSTEM:** Provides current settings for rendering (unit conversions, time formatting)
- **→ WEATHER_SYSTEM:** Temperature unit affects display formatting (conversion is a presentation concern, not an API concern — API always returns Celsius)
- **← VIEW_SYSTEM:** Receives user setting changes
