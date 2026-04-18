## Stack
- **Framework:** Astro 6.x with React integration (`@astrojs/react`)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` Vite plugin
- **Language:** TypeScript (strict mode via `astro/tsconfigs/strict`)
- **Runtime:** Node.js, served via `npx astro dev` on port 3000

## File Organisation
- **Pages:** `src/pages/` — Astro pages (index.astro is the single-page site)
- **Components:** `src/components/` — `.astro` for static, `.tsx` for interactive React
- **Layouts:** `src/layouts/Layout.astro` — base HTML shell with font loading
- **Styles:** `src/styles/global.css` — global CSS using `@import "tailwindcss"`

## Component Patterns
- **Static sections:** Astro components (`.astro`) — MetaBanner, Header, HeroSection, ProblemSection, Footer
- **Interactive components:** React TSX with `client:load` directive — HierarchyExplorer, SpecWizard, ComparisonSection
- **State management:** Local `useState` per component — no global state

## Testing
- **Framework:** Cypress 15.x with TypeScript
- **Test file:** `cypress/e2e/mvp.cy.ts` — single file with all stories as embedded YAML
- **Pattern:** `loadAndRun()` with inline YAML string literals
- **DSL steps:** visit, click, fill, shouldExist, shouldContain (core set only)
- **Config:** `cypress.config.ts` with rootspec-reporter for `tests-status.json` updates

## Build
- **Dev command:** `npx astro dev` (managed via `scripts/dev.sh`)
- **Build command:** `astro build` → `dist/`
- **Test command:** `./scripts/test.sh`

## Key Decisions
- Tailwind v4 requires `@tailwindcss/vite` — `@astrojs/tailwind` is incompatible with Tailwind v4
- CSS custom properties (`--color-bg`, `--color-text`, etc.) for theme switching without rehydration
- React components always render content in DOM (using `display: none` for hidden state) to ensure Cypress `shouldExist` works before hydration
