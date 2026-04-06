# Technical Conventions

## Stack
- **Framework:** Astro 4.0 (static site generation with islands)
- **Language:** TypeScript (strict mode)
- **Interactive Components:** React/Preact (for complex UI state)
- **Styling:** Tailwind CSS v3 (utility-first, theme-aware)
- **Build System:** Vite (fast development and optimized production builds)
- **Key libraries:** React (interactive islands), Tailwind (styling)

## Code Patterns
- **File naming:** kebab-case for pages, PascalCase for components
- **Component style:** function components with TypeScript
- **Exports:** default exports for Astro components, named exports for utilities
- **Directory structure:** feature-based under src/ (components/, sections/, layouts/, pages/)

## Imports
- **Order:** external > internal > relative, grouped with blank lines
- **Path aliases:** @/ maps to src/ directory
- **Asset imports:** relative paths for local assets, @/ for shared assets

## Types
- **Object shapes:** interfaces for component props, type aliases for data
- **Validation:** runtime validation for user inputs and API responses
- **Generation:** TypeScript interfaces derived from YAML story schemas

## State Management
- **Global state:** React Context for theme preferences
- **Component state:** useState for interactive component state
- **Form state:** controlled components with useState

## Routing
- **Approach:** file-based routing (Astro pages directory)
- **Patterns:** single-page site with section anchors and smooth scrolling

## API
- **Style:** static data only, no runtime API calls
- **Content:** YAML data files processed at build time
- **External data:** GitHub API calls during build only (version fetching)

## Error Handling
- **UI errors:** graceful degradation with fallback content
- **Build errors:** fail fast with clear error messages
- **Runtime errors:** React error boundaries for interactive components

## Testing
- **E2E:** Playwright for critical user journeys
- **Component:** React Testing Library for interactive components
- **Patterns:** tests collocated with components, scenarios in test/ directory