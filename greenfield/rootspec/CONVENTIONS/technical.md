# Technical Conventions

## Stack
- **Framework:** Astro 4.x (static site generation)
- **Language:** TypeScript (strict mode enabled)
- **Runtime:** Node 18+ (for build process)
- **Styling:** CSS custom properties with component-scoped CSS
- **Key libraries:** None (client-side JavaScript minimized per L2 constraints)

## Code Patterns
- **File naming:** kebab-case for components (e.g., `theme-toggle.astro`)
- **Component style:** Astro components with frontmatter, React for interactivity
- **Exports:** Default exports for pages and components
- **Directory structure:** Feature-based organization by system (sections/, components/, data/)

## Imports
- **Order:** Framework imports > third-party > internal > relative
- **Barrel files:** Avoided to maintain explicit dependencies
- **Path aliases:** @/ maps to src/ for cleaner imports

## Types
- **Object shapes:** TypeScript interfaces for component props and data structures
- **Validation:** Runtime validation minimal (static site, no user input processing)
- **Generation:** Types derived from content structure and fine-tuning parameters

## State Management
- **Global state:** CSS custom properties for theme state, localStorage for preferences
- **Client state:** Vanilla JavaScript for interactive components (per L2 constraints)
- **Form state:** Simple form handling in spec wizard (no external library)

## Routing
- **Approach:** File-based routing (Astro convention)
- **Patterns:** Single-page application with anchor-link navigation

## Content
- **Source:** Markdown for static content, YAML for structured data
- **Processing:** Astro content collections for type-safe content handling
- **Meta:** Build-time injection of version and metadata (per Meta System)

## Error Handling
- **Build errors:** TypeScript strict mode catches issues at build time
- **Runtime errors:** Progressive enhancement ensures graceful degradation
- **Content errors:** Build fails on missing or malformed content files

## Testing
- **Unit:** Vitest for TypeScript utilities and data processing
- **E2E:** Playwright for user story acceptance criteria testing
- **Patterns:** Tests colocated with components, story-based e2e structure