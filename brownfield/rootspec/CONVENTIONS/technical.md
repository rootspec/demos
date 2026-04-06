# Technical Conventions

## Stack
- **Framework:** React 18.2 with Vite 5
- **Language:** JavaScript (JSX)
- **Styling:** CSS Modules + styled-components hybrid
- **Key libraries:** styled-components 5.3.11

## Code Patterns
- **File naming:** PascalCase for components (e.g., CurrentWeather.jsx)
- **Component style:** Function components (some legacy class components)
- **Exports:** Default exports for components
- **Directory structure:** Feature-based under src/components/, utils/, hooks/

## Imports
- **Order:** React/libraries > internal utilities/hooks > components
- **Barrel files:** No
- **Path aliases:** None configured, relative imports

## State Management
- **Global state:** React useState in App.jsx root component
- **Server state:** Custom useWeather hook with fetch
- **Form state:** Local state with controlled inputs

## API
- **Style:** REST API (Open-Meteo weather service)
- **Client:** Fetch API with custom wrapper functions
- **Auth:** None required (public weather API)
- **Patterns:** Utility functions in src/utils/api.js

## Error Handling
- **UI errors:** Loading/error states in components
- **Async errors:** Try-catch in API utilities
- **Logging:** Console logging for debugging

## Testing
- **E2E:** Cypress 15.13
- **Patterns:** Test files in cypress/ directory