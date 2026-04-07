# Technical Conventions

## Stack
- **Framework:** Astro 4.x (static site generation)
- **Language:** TypeScript (strict mode)
- **Styling:** CSS with custom properties and modern features
- **Build tool:** Vite (integrated with Astro)
- **Key libraries:** Client-side JavaScript for interactive components

## Code Patterns
- **File naming:** kebab-case for files, PascalCase for Astro components
- **Component style:** Astro component syntax with TypeScript frontmatter
- **Exports:** Named exports for utilities, default exports for components
- **Directory structure:** Feature-based organization (src/components, src/sections, src/layouts)

## Imports
- **Order:** External libraries > Astro components > Internal utilities > Relative imports
- **Barrel files:** No barrel files for this simple structure
- **Path aliases:** Default Astro aliases (src/ mapped)

## Types
- **Object shapes:** Interfaces for component props, type aliases for data shapes
- **Validation:** Client-side validation functions for user inputs
- **Generation:** No auto-generated types for this static site

## State Management
- **Global state:** Browser localStorage for theme preferences
- **Server state:** No server state (static generation)
- **Form state:** Vanilla JavaScript for wizard state management

## Routing
- **Approach:** File-based routing (Astro default)
- **Patterns:** Single page application with anchor-based navigation

## API
- **Style:** No API (client-side only interactive features)
- **Client:** No HTTP client needed
- **Auth:** No authentication required
- **Patterns:** Static site with interactive enhancements

## Error Handling
- **UI errors:** Inline validation feedback and graceful degradation
- **Async errors:** Not applicable (no async server operations)
- **Logging:** Client-side console logging for development

## Testing
- **Unit:** Not implemented for this demo
- **E2E:** Stories define acceptance criteria for future implementation
- **Patterns:** User story YAML format for test specifications