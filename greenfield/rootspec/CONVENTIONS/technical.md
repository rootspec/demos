# Technical Conventions

## Framework
- **Primary:** Astro for static site generation
- **Interactive:** TypeScript/React islands for dynamic features
- **Styling:** CSS custom properties with component-scoped styles

## File Structure
- **Pages:** src/pages/ for routes
- **Components:** src/components/ for reusable UI
- **Layouts:** src/layouts/ for page templates
- **Data:** src/data/ for static content
- **Assets:** src/assets/ for images, fonts

## Component Patterns
- **Naming:** PascalCase for components (HeroSection.astro)
- **Props:** TypeScript interfaces for type safety
- **Islands:** .tsx for interactive components requiring React
- **Data attributes:** data-test for testing selectors

## Astro Specifics
- **Frontmatter:** Script sections for component logic
- **Slots:** Named slots for flexible content composition
- **Client directives:** client:load for interactive islands
- **Static generation:** Default behavior, use SSR sparingly

## Testing
- **Framework:** Cypress for end-to-end testing
- **Selectors:** data-test attributes for stability
- **Patterns:** loadAndRun function with embedded YAML stories
- **Core steps:** visit, click, fill, loginAs, seedItem, shouldContain, shouldExist