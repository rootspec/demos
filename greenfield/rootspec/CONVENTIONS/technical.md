## Framework
- **Framework:** Astro 6.x with static output
- **Renderer:** React 19 islands via `@astrojs/react` (client:load)
- **Styling:** Tailwind CSS 3.x via `@astrojs/tailwind` + inline CSS custom properties
- **Language:** TypeScript (strict mode for app code, relaxed for Cypress)

## Project Structure
- **Pages:** `src/pages/` — Astro pages
- **Components:** `src/components/` — `.astro` for static, `.tsx` for interactive React islands
- **Layouts:** `src/layouts/Layout.astro` — single root layout
- **Styles:** `src/styles/global.css` — global CSS with custom property variables

## Build
- **Dev command:** `npx astro dev` (via `scripts/dev.sh`, port 3000)
- **Build command:** `astro build`
- **Base path:** `/demos/greenfield` for production; `/` for development (env-conditional in `astro.config.mjs`)
- **Dev port:** 3000

## State Management
- React `useState` for interactive components (no external state library)
- Theme persisted via `localStorage` + `data-theme` attribute on `<html>`
- Theme applied via inline `<script is:inline>` in Layout to prevent flash

## Testing
- **Framework:** Cypress 15.x with TypeScript
- **Test file:** `cypress/e2e/mvp.cy.ts`
- **Support:** `cypress/support/` — steps.ts, schema.ts, e2e.ts, rootspec-reporter.ts
- **Base URL:** `http://localhost:3000` (root, since dev serves without base prefix)

## Imports
- `.rootspec.json` version imported directly in `Header.astro` for build-time version badge
- No external API calls — all client-side
