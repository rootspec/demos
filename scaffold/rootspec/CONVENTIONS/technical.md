# Technical Conventions

## Framework
- **Primary Framework:** Svelte/SvelteKit with TypeScript
- **Styling:** Tailwind CSS with PostCSS
- **Build Tool:** Vite
- **Package Manager:** npm

## Dependencies
- **Core:** svelte, @sveltejs/kit, typescript, vite
- **Styling:** tailwindcss, postcss, autoprefixer
- **Testing:** cypress, js-yaml
- **Development:** @sveltejs/adapter-auto

## File Structure
- **Routes:** `src/routes/` following SvelteKit file-based routing
- **Components:** `src/lib/components/` for reusable Svelte components
- **Types:** `src/lib/types/` for TypeScript type definitions
- **Data:** `src/lib/data/` for mock data and fixtures
- **Styles:** Global styles in `src/app.css`, component styles in `.svelte` files

## Component Patterns
- **Page Components:** Located in `src/routes/` with `+page.svelte` convention
- **Reusable Components:** Exported from `src/lib/components/` as `.svelte` files
- **Props:** Use TypeScript interfaces for component props
- **State Management:** Svelte stores for global state, local state with `let` variables

## Data Patterns
- **Mock Data:** Static JSON data in `src/lib/data/` directory
- **API Simulation:** Functions in `src/lib/data/` that return promises for realistic async behavior
- **Data Fetching:** Use SvelteKit's load functions in `+page.ts` files

## Testing Attributes
- **Test Selectors:** Use `data-test` attributes for all interactive and assertion elements
- **Naming Convention:** kebab-case for test selectors (e.g., `data-test="post-card"`)
- **Scope:** Every user-facing element referenced in acceptance criteria must have `data-test`