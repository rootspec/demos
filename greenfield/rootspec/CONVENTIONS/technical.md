# Technical Conventions

## Stack
- **Framework:** Astro 5.7.0 with React integration (@astrojs/react 4.2.0)
- **Language:** TypeScript 5.8.3
- **Package Manager:** npm (based on package.json structure)
- **Runtime:** Node.js (module type configuration)

## Code Patterns
- **Component Style:** Astro components (.astro) for layout/structure, React components (.tsx) for interactive features
- **Export Style:** ES modules with named and default exports
- **File Naming:** camelCase for data files, PascalCase for React components, lowercase for Astro components
- **Directory Structure:** 
  - `src/data/` for static configuration and content
  - `src/components/` for reusable components
  - `src/sections/` for page sections
  - `src/pages/` for route components

## Imports
- **Module Resolution:** TypeScript path mapping enabled via tsconfig.json
- **Import Order:** External packages first, then internal modules, then relative imports
- **File Extensions:** Explicit .ts/.tsx extensions for imports where required by Astro

## Types
- **Type Definitions:** TypeScript interfaces and types
- **Validation:** Zod library for runtime validation (v3.24.3)
- **Component Props:** Explicit TypeScript interfaces for all React component props

## State Management
- **Local State:** React hooks (useState, useEffect) for component state
- **Global State:** No centralized state management (appropriate for marketing site)
- **Persistence:** Browser localStorage for theme preferences

## Routing
- **Router:** Astro file-based routing in `src/pages/`
- **Navigation:** Static navigation appropriate for marketing site
- **Links:** Standard anchor tags and Astro navigation

## API Integration
- **External APIs:** None (client-side only per requirements)
- **Data Loading:** Build-time static data from TypeScript modules

## Data Handling
- **Static Data:** TypeScript modules in `src/data/` directory
- **Content:** Inline content in components, no CMS integration
- **Configuration:** Central config object pattern

## Testing
- **Framework:** Cypress 14.3.0 for end-to-end testing
- **Test Files:** `.cy.ts` extension in `cypress/e2e/` directory
- **Test Data:** Embedded test selectors with `data-test` attributes
- **Coverage:** User story acceptance criteria drive test generation