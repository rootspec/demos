## Framework
- **Stack:** Astro 6 + React 19 (islands) + Tailwind CSS 4 (@tailwindcss/vite)
- **Language:** TypeScript (strict mode via astro/tsconfigs/strict)
- **Package manager:** npm

## Structure
- **Pages:** `src/pages/` — Astro pages (index.astro is the homepage)
- **Layouts:** `src/layouts/` — Layout.astro wraps all pages
- **Components:** `src/components/` — `.astro` for static, `.tsx` for interactive islands
- **Styles:** `src/styles/global.css` — single global CSS file with CSS custom properties

## Patterns
- **Static components:** Use `.astro` files with inline styles (CSS variables)
- **Interactive components:** Use `.tsx` React components with `client:load` directive
- **Styling:** Inline styles using CSS custom property variables (`var(--accent)`, etc.)
- **Routing:** Single page (`/demos/greenfield/`) served at Astro base path
- **data-test attributes:** All testable elements have `data-test` attributes

## Dev Server
- **Command:** `npx astro dev --port 3000`
- **Port:** 3000
- **Base path:** `/demos/greenfield/`
- **PID management:** `./scripts/dev.sh start|stop|status`

## Tests
- **Framework:** Cypress e2e
- **Test file:** `cypress/e2e/mvp.cy.ts`
- **Pattern:** YAML embedded as string literals, `loadAndRun()` pattern
- **Reporter:** rootspec-reporter writes to `rootspec/tests-status.json`
