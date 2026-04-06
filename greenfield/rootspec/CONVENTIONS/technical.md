# Technical Conventions

## Stack
- **Framework:** Astro 4.x (static site generation)
- **Language:** TypeScript (strict mode)
- **Styling:** CSS Modules + custom properties
- **Key libraries:** None (minimal dependencies for reliability)

## Code Patterns
- **File naming:** kebab-case for components and pages
- **Component style:** Astro components (.astro), React islands for interactivity (.tsx)
- **Exports:** Default exports for components, named exports for utilities
- **Directory structure:** Feature-based (src/components, src/sections, src/layouts)

## Imports
- **Order:** External libraries > Astro components > React components > utilities > styles
- **Barrel files:** No barrel files (direct imports for clarity)
- **Path aliases:** @ maps to src/

## Types
- **Object shapes:** TypeScript interfaces for props and data structures
- **Validation:** Client-side validation using built-in browser APIs
- **Generation:** No auto-generated types (static content only)

## State Management
- **Global state:** localStorage for theme preference and wizard state
- **Server state:** None (fully static site)
- **Form state:** Vanilla JavaScript for wizard form handling

## Routing
- **Approach:** File-based routing (Astro default)
- **Patterns:** Single page with section anchors, no dynamic routes

## API
- **Style:** No external APIs (client-side only functionality)
- **Client:** Not applicable
- **Auth:** No authentication
- **Patterns:** No API endpoints

## Data Model
- **ORM/DB:** No database (static content from markdown)
- **Schema location:** TypeScript interfaces in component files
- **Patterns:** Static data transformation at build time

## Error Handling
- **UI errors:** Graceful degradation with fallback content
- **Async errors:** Try-catch blocks for localStorage operations
- **Logging:** Console logging for development only

## Testing
- **Unit:** Vitest for utility functions
- **E2E:** Playwright for interaction testing
- **Patterns:** Tests collocated with components (__tests__ folders)