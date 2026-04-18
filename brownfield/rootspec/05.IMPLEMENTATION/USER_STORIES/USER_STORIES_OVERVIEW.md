# User Stories Overview

**Product:** RootWeather
**Version:** 7.3.7
**Phase:** baseline (existing functionality)

---

## Story Index

| ID | Title | Phase | Systems |
|----|-------|-------|---------|
| US-001 | Search for a city and see weather | baseline | LOCATION_SYSTEM, WEATHER_SYSTEM |
| US-002 | Save a location to favorites | baseline | LOCATION_SYSTEM, VIEW_SYSTEM |
| US-003 | Switch between saved locations | baseline | LOCATION_SYSTEM, WEATHER_SYSTEM |
| US-004 | Remove a location from favorites | baseline | LOCATION_SYSTEM, VIEW_SYSTEM |
| US-005 | See current conditions | baseline | WEATHER_SYSTEM |
| US-006 | See hourly forecast | baseline | WEATHER_SYSTEM |
| US-007 | See 7-day forecast | baseline | WEATHER_SYSTEM |
| US-008 | See condition alerts | baseline | WEATHER_SYSTEM |
| US-009 | Change temperature unit | baseline | SETTINGS_SYSTEM, WEATHER_SYSTEM |
| US-010 | Change wind unit | baseline | SETTINGS_SYSTEM |
| US-011 | Change time format | baseline | SETTINGS_SYSTEM, WEATHER_SYSTEM |
| US-012 | Set a default city | baseline | SETTINGS_SYSTEM, LOCATION_SYSTEM |
| US-013 | View all saved locations on dashboard | baseline | LOCATION_SYSTEM, WEATHER_SYSTEM |
| US-014 | Compare two or more cities | baseline | COMPARISON_SYSTEM, WEATHER_SYSTEM |

## Story Files

- `by_phase/baseline/search.yaml` — US-001
- `by_phase/baseline/favorites.yaml` — US-002, US-003, US-004
- `by_phase/baseline/weather-display.yaml` — US-005, US-006, US-007, US-008
- `by_phase/baseline/settings.yaml` — US-009, US-010, US-011, US-012
- `by_phase/baseline/dashboard.yaml` — US-013
- `by_phase/baseline/comparison.yaml` — US-014
