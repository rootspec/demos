## Stack

- **Framework:** Astro 6 with React 19 islands
- **Styling:** Tailwind CSS v4 via @tailwindcss/vite
- **Language:** TypeScript

## File Organization

- `src/layouts/` — Astro layout components
- `src/pages/` — Astro page routes
- `src/components/` — Astro and React (.tsx) components
- `src/styles/` — Global CSS

## Dev Server

- **Stack:** Astro
- **Dev command:** `npx astro dev --port 4321`
- **Preview command:** `npx astro preview --port 4321`
- **Port:** 4321

## Base Path

- **Deployed at:** `/demos/greenfield/`
- **Visit targets in tests** include the full subpath (e.g. `visit: '/demos/greenfield/'`)

## Component Patterns

- Static sections: Astro components (.astro)
- Interactive components: React (.tsx) with `client:load` directive
- All interactive elements have `data-test` attributes for Cypress

## App Readiness

1. **Deferred-execution boundaries.** Components using `client:load`: `HierarchyExplorer.tsx` (src/components/HierarchyExplorer.tsx) and `SpecWizard.tsx` (src/components/SpecWizard.tsx). These are Astro client directives that hydrate React islands after the initial HTML arrives.

2. **Readiness signal.** Each `astro-island` element starts with a `ssr` attribute and removes it once hydration completes. `cy.appReady()` waits for `document.readyState === 'complete'` then polls until no `astro-island[ssr]` elements remain on the page.

## Test Viewports

- **MOBILE_JOURNEY:** 375x667
- **TABLET_JOURNEY:** 768x1024
