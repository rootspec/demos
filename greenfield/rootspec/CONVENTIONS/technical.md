# Technical Conventions

## Stack
- **Framework:** Astro 4.x
- **Language:** TypeScript
- **Styling:** CSS with custom properties
- **Build:** Vite (Astro default)
- **Package Manager:** npm

## File Organization
- **Pages:** `src/pages/` (Astro routing)
- **Components:** `src/components/` (Astro + TypeScript)
- **Layouts:** `src/layouts/` (page templates)
- **Styles:** `src/styles/` (global CSS)
- **Assets:** `src/assets/` (images, fonts)

## Component Patterns
- **Astro Components:** `.astro` files for static + lightly interactive content
- **Interactive Components:** `.tsx` files for client-side interactivity
- **Client Hydration:** Selective with `client:load` directive
- **Data Attributes:** `data-test` for test selectors

## Testing Strategy
- **E2E Testing:** Cypress with RootSpec integration
- **Test Selectors:** `[data-test="element-name"]` pattern
- **Test Organization:** By user story and system

## TypeScript Configuration
- **Strict Mode:** Enabled for type safety
- **Path Mapping:** `@/` for `src/` directory
- **ESM Modules:** Full ES module support

## Performance
- **Static Generation:** All pages pre-rendered
- **Progressive Enhancement:** Core functionality without JavaScript
- **Lazy Loading:** Images and non-critical components
- **Bundle Splitting:** Automatic via Vite