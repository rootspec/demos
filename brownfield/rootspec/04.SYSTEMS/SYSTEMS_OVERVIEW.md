# Level 4: Systems Overview

## System Map

```
┌──────────────────────────────────────────────────┐
│                   VIEW SYSTEM                     │
│  Weather · Dashboard · Comparison · View toggle    │
│  Settings panel · Search bar · Layout/chrome       │
├──────────────┬──────────────┬────────────────────┤
│              │              │                      │
│   WEATHER    │   LOCATION   │     SETTINGS         │
│   SYSTEM     │   SYSTEM     │     SYSTEM           │
│              │              │                      │
│  API calls   │  Favorites   │  Units, formats      │
│  Data parse  │  Default city│  Persistence         │
│  Alerts      │  Search      │                      │
└──────────────┴──────────────┴────────────────────┘
```

## System Responsibilities

| System | Owns | Consumes From |
|--------|------|---------------|
| WEATHER_SYSTEM | API integration, weather data, condition alerts | LOCATION_SYSTEM (coordinates), SETTINGS_SYSTEM (units for display) |
| LOCATION_SYSTEM | City search, favorites list, default city, geocoding | WEATHER_SYSTEM (weather per location for dashboard) |
| SETTINGS_SYSTEM | Temperature unit, wind unit, time format, localStorage persistence | Nothing — leaf system |
| VIEW_SYSTEM | Screen state (weather/dashboard/compare), layout, loading/error states | All other systems for rendering |

## Data Flow

1. **Search flow:** User types → LOCATION_SYSTEM queries geocoding API → returns city candidates → VIEW_SYSTEM renders dropdown → user selects → WEATHER_SYSTEM fetches weather for coordinates
2. **Favorites flow:** User saves city → LOCATION_SYSTEM adds to favorites list → persists to localStorage → VIEW_SYSTEM updates favorites bar
3. **Dashboard flow:** User switches to Dashboard → VIEW_SYSTEM triggers WEATHER_SYSTEM to fetch all favorites' weather in parallel → renders grid
4. **Settings flow:** User changes a setting → SETTINGS_SYSTEM updates value and persists → VIEW_SYSTEM re-renders with new format/unit
5. **Comparison flow:** User clicks "Compare" on Dashboard → VIEW_SYSTEM enters selection mode → user selects cities → WEATHER_SYSTEM fetches/reuses weather for selected cities → VIEW_SYSTEM renders side-by-side columns
