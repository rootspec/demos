# Technical Conventions

## Framework and Architecture

- **Framework:** Astro with TypeScript
- **Component Style:** .astro files for layout/static components, .tsx for interactive components
- **Styling:** CSS modules with global styles in src/styles/
- **State Management:** React state for interactive components

## Testing and Quality

- **Testing Framework:** Cypress with RootSpec DSL
- **Test Location:** cypress/e2e/
- **Test Data Attributes:** Use `data-test` attributes for element targeting
- **Accessibility:** WCAG 2.1 AA compliance required

## Code Organization

- **Source Directory:** src/
- **Components:** src/components/ for reusable components
- **Sections:** src/sections/ for page sections  
- **Pages:** src/pages/ for route definitions
- **Layouts:** src/layouts/ for page templates
- **Styles:** src/styles/ for global CSS

## Development and Build

- **Dev Server:** Port 4321, managed by ./scripts/dev.sh
- **Package Manager:** npm
- **Build Target:** Static site generation
- **Browser Support:** Modern browsers (ES2020+)