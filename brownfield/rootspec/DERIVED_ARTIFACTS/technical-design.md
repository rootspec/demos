# Technical Design

*Generated from validated RootSpec specification and existing codebase analysis*

## 1. Technology Stack

### Core Framework
- **React 18.2** with functional components and hooks
- **Vite 5.0** for development server and build tooling  
- **JavaScript (ES modules)** — no TypeScript in current implementation despite devDependency

### Styling
- **styled-components 5.3** for component styling
- **Global CSS** (`src/styles/global.css`) for base styles and layout
- **CSS-in-JS approach** with component-specific styling

### External Dependencies
- **Open-Meteo API** — free, keyless weather and geocoding services
- **Browser APIs** — localStorage for persistence, fetch for HTTP

> Source: scan-project.sh output — package.json, vite.config.js, src/ analysis
> Source: 02.TRUTHS.md — client-only architecture, open data constraints

## 2. Architecture Patterns

### Component Organization
```
src/
├── components/          # UI components by feature
│   ├── SearchBar.jsx   # City search with autocomplete
│   ├── CurrentWeather.jsx
│   ├── ForecastChart.jsx
│   ├── HourlyForecast.jsx
│   ├── FavoritesList.jsx
│   ├── LocationsDashboard.jsx
│   ├── ComparisonView.jsx
│   ├── SettingsPanel.jsx
│   └── WeatherAlerts.jsx
├── hooks/              # Custom React hooks
│   └── useWeather.js   # Weather data fetching logic
├── utils/              # Pure utility modules
│   ├── api.js          # Open-Meteo API interface
│   ├── storage.js      # localStorage abstraction
│   └── temperature.js  # Unit conversion utilities
└── App.jsx            # Root component with state management
```

### State Management
- **React hooks** (`useState`, `useEffect`) in App.jsx for global state
- **Custom hooks** (`useWeather`) for data fetching with cleanup
- **localStorage** for persistent state (favorites, settings)
- **Props drilling** for component communication — no external state library

### Data Flow Patterns
- **Top-down props** from App.jsx to child components
- **Event handlers** passed down for state mutations
- **Effect synchronization** between React state and localStorage
- **Parallel fetching** for dashboard weather data

> Source: 04.SYSTEMS/SYSTEMS_OVERVIEW.md — system responsibilities and data flow
> Source: src/App.jsx analysis — actual state management patterns

## 3. Coding Conventions

### File Organization
- **PascalCase** for React components (`CurrentWeather.jsx`)
- **camelCase** for hooks (`useWeather.js`) and utilities
- **Single component** per file with default export
- **Relative imports** for local modules

### Component Patterns
- **Functional components** with hooks throughout
- **Props destructuring** in function parameters
- **Conditional rendering** with logical operators (`&&`, ternary)
- **Event handler** naming: `handleXxx` functions

### Code Style
- **ES6+ features** — arrow functions, destructuring, template literals
- **Array methods** for data transformation (`.map()`, `.filter()`, `.some()`)
- **Early returns** and guard clauses for error states
- **Inline styles** via styled-components, minimal className usage

> Source: src/ codebase analysis — existing patterns and conventions

## 4. API Approach

### External APIs
- **Open-Meteo Geocoding** — `GET /v1/search?name={query}` for city search
- **Open-Meteo Weather** — `GET /v1/forecast?lat={lat}&lon={lon}&current=...&hourly=...&daily=...`

### API Layer Organization
```javascript
// src/utils/api.js
export async function searchCities(query)    // Returns city candidates
export async function getWeather(lat, lon)   // Returns weather data
export function getWeatherDescription(code)  // Converts codes to text
export function getWeatherEmoji(code)        // Converts codes to emoji
```

### Request Patterns
- **No authentication** required — keyless APIs only
- **URL-encoded parameters** for GET requests
- **Fetch with async/await** for all HTTP calls
- **Error handling** via try/catch in calling code

### Data Transformation
- **Minimal processing** — API responses used mostly as-is
- **Weather code mapping** for human-readable descriptions and emoji
- **Coordinate-based** location identification (lat/lon pairs)

> Source: 04.SYSTEMS/WEATHER_SYSTEM.md — API integration responsibilities
> Source: src/utils/api.js analysis — actual API interface implementation

## 5. Data Model

### Core Entities

**City Location**
```javascript
{
  name: string,           // Display name (e.g., "New York")
  latitude: number,       // Decimal coordinates
  longitude: number,      // Decimal coordinates  
  country: string         // Country code (e.g., "US")
}
```

**Weather Data** (Open-Meteo response format)
```javascript
{
  current: {
    temperature_2m: number,
    relative_humidity_2m: number,
    wind_speed_10m: number,
    uv_index: number,
    weather_code: number
  },
  hourly: {
    time: string[],
    temperature_2m: number[],
    weather_code: number[],
    precipitation_probability: number[]
  },
  daily: {
    time: string[],
    temperature_2m_max: number[],
    temperature_2m_min: number[],
    weather_code: number[],
    precipitation_probability_max: number[]
  }
}
```

**Settings**
```javascript
{
  unit: "celsius" | "fahrenheit",
  windUnit: "kmh" | "mph", 
  timeFormat: "24h" | "12h",
  defaultCity: string | null,
  favorites: CityLocation[]
}
```

### Data Ownership
- **WEATHER_SYSTEM** owns weather API responses and condition alerts
- **LOCATION_SYSTEM** owns city search results and favorites list
- **SETTINGS_SYSTEM** owns user preferences and localStorage keys

> Source: 04.SYSTEMS/SYSTEMS_OVERVIEW.md — system data ownership
> Source: src/utils/storage.js analysis — actual data persistence structure

## 6. Testing Strategy

### Current Setup
- **Cypress** for end-to-end testing (15.13.0 detected)
- **No unit testing framework** — Jest or Vitest would be typical additions
- **Husky** for pre-commit hooks

### Recommended Testing Approach

**E2E Testing** (using existing Cypress)
- **Search and select city** — core user journey
- **Save and manage favorites** — persistence verification
- **Settings changes** — unit switching and persistence
- **View transitions** — weather/dashboard/comparison modes
- **Comparison workflows** — multi-city selection and display

**Unit Testing** (recommended addition)
- **Utility functions** — `src/utils/` modules (temperature conversion, weather code mapping)
- **Custom hooks** — `useWeather` hook with mocked API responses
- **localStorage abstraction** — `storage.js` functions with mocked localStorage

**Integration Testing** (recommended addition)
- **Component interactions** — settings panel affecting weather display
- **API integration** — actual Open-Meteo responses (with network stubbing)
- **State synchronization** — React state ↔ localStorage consistency

> Source: 05.IMPLEMENTATION/USER_STORIES/ — testable acceptance criteria
> Source: cypress/ directory detected — existing E2E setup

## Implementation Notes

### Existing Code Alignment
The current codebase closely follows the L4 system design:
- Clear separation between weather data, location management, settings, and view logic
- Client-only architecture with localStorage persistence
- Open-Meteo API integration matching the "open data" constraint

### Technical Debt Areas
- TypeScript configured but not used — consider full migration or removal
- No unit testing framework — limits refactoring confidence
- Global CSS + styled-components mixture — could standardize approach

### Performance Considerations
- **Parallel weather fetching** for dashboard view already implemented
- **Request cancellation** in useWeather hook prevents race conditions
- **localStorage persistence** on every settings change — acceptable for small data volumes

> Source: 02.TRUTHS.md — client-only architecture trade-offs
> Source: App.jsx analysis — performance patterns in actual implementation