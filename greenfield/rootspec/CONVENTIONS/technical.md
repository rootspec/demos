## Stack

- **Framework:** Astro v6 with React islands (`@astrojs/react`)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` (Vite plugin, not PostCSS)
- **Language:** TypeScript (strict mode via `astro/tsconfigs/strict`)
- **Test runner:** Cypress v15 with js-yaml + Zod for DSL test loading
- **Package manager:** npm

## File Organization

- **Pages:** `src/pages/index.astro` (single page site)
- **Layouts:** `src/layouts/Layout.astro`
- **Astro components:** `src/components/*.astro` (static sections)
- **React components:** `src/components/*.tsx` (interactive islands)
- **Astro wrappers:** `src/components/*Wrapper.astro` wraps React components with `client:only="react"`
- **Styles:** `src/styles/global.css` (Tailwind import + CSS custom properties)

## Component Patterns

- Static Astro components for all non-interactive sections (Hero, Problem, Footer, etc.)
- React TSX components for interactive islands (HierarchyExplorer, SpecWizard, ComparisonSection)
- React components always wrapped in an Astro file with `client:only="react"` for hydration
- All components use inline styles (no Tailwind classes) for precise control

## Theme System

- Default theme: `dark` (always, ignoring `prefers-color-scheme` to ensure test determinism)
- Theme state stored in `localStorage` key `rootspec-theme`
- `data-theme` attribute set on: `html`, `body`, `#theme-root`, `#theme-indicator`
- Theme applied via inline `onclick` handler on the toggle button (not module script)
- `#theme-root` div wraps all page content; CSS custom properties scoped to `[data-theme=...]` selectors
- `#theme-indicator` is a hidden `<span>` queryable by Cypress for theme state assertions

## Build

- **Dev server:** `npx astro dev --port 3000` (configured in `scripts/dev.sh`)
- **Build command:** `astro build`
- **Test command:** `./scripts/test.sh` (starts dev server, runs Cypress, stops server)

## Cypress

- TypeScript: `ES2017` target with `ignoreDeprecations: "6.0"` (required for TS 7.x compat)
- Test pattern: YAML embedded as string literals in `cypress/e2e/mvp.cy.ts`, parsed with `loadAndRun()`
- React components use `client:only="react"` so Cypress waits for full React hydration before interacting
