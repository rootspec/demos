## Stack

- **Framework:** Astro 6 (static site, `output: "static"`)
- **UI Islands:** React 19 via `@astrojs/react`
- **Styling:** Tailwind CSS 3 via `@astrojs/tailwind`
- **Language:** TypeScript (strict)
- **Test runner:** Cypress 15
- **Base path:** `/demos/greenfield` (configured in `astro.config.mjs`)

## File Organization

- **Pages:** `src/pages/` — Astro pages (index.astro only)
- **Layouts:** `src/layouts/Layout.astro` — HTML shell, global CSS import, inline theme script
- **Components:** `src/components/` — `.astro` for static, `.tsx` for interactive islands
- **Styles:** `src/styles/global.css` — CSS custom properties, Tailwind directives, font imports

## Component Patterns

- **Static sections:** `.astro` components with `data-test` attributes in markup
- **Interactive islands:** React `.tsx` components, mounted with `client:load` in `.astro` wrappers
- **Island wrappers:** One `.astro` wrapper per React component (e.g., `HierarchySection.astro` wraps `HierarchyExplorer.tsx`)

## Theme System

- **Mechanism:** `data-theme="light|dark"` attribute on `<html>` element
- **Persistence:** `sessionStorage` key `rs-theme`
- **Default:** `light` (set in `<html>` tag; overridden by inline script before paint)
- **Toggle:** `Header.astro` `<script>` block manages toggle click and icon update
- **CSS tokens:** CSS custom properties on `:root` and `[data-theme="dark"]` in `global.css`

## App Readiness

- **Mechanism:** `document.readyState === 'complete'`
- **Rationale:** Static Astro site; all `data-test` attributes are in SSR HTML. React islands hydrate progressively after DOM ready; tests only need the DOM.
- **Implementation:** `cypress/support/app-ready.ts` — `cy.document().its('readyState').should('eq', 'complete')`

## Build

- **Command:** `npm run build` → `astro build`
- **Preview:** `npm run preview` → `astro preview --host` on port 4173
- **Dev:** `./scripts/dev.sh start` → `astro dev` on port 3000
- **Output:** `dist/` with index.html at root (Astro rewrites base path in asset URLs)

## Dependencies

Direct imports only:
- `astro`, `@astrojs/react`, `@astrojs/tailwind`, `tailwindcss`
- `react`, `react-dom`
- `typescript`, `cypress`, `zod`, `js-yaml`, `@types/js-yaml`
