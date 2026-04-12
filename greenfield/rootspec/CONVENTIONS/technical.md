## Framework
- **Framework:** Astro 6 with React islands + TailwindCSS
- **Language:** TypeScript (TSX for interactive components)
- **Package manager:** npm
- **Dev server:** `astro dev --port 3000`
- **Build:** `astro build`

## Project Structure
- **Pages:** `src/pages/` — Astro pages (SSG)
- **Layouts:** `src/layouts/` — Astro layout wrappers
- **Components:** `src/components/` — React TSX interactive components (`.tsx`)
- **Styles:** `src/styles/global.css` — Global CSS + CSS custom properties

## Patterns
- **Interactive components:** Use `client:load` hydration directive in `.astro` pages
- **Theme:** Applied via `data-theme` attribute on `<html>` element; CSS custom properties under `[data-theme]` selectors
- **Theme storage:** `localStorage` key `rootspec-theme`; inline script in `<head>` prevents FOUC
- **Section animations:** IntersectionObserver adds `.visible` class for fade-in + translateY effect
- **Testing:** Cypress + `data-test` attributes; test file at `cypress/e2e/mvp.cy.ts`

## Configuration
- **Astro config:** `astro.config.mjs` — integrations: react, tailwind
- **Cypress config:** `cypress.config.ts` — baseUrl `http://localhost:3000`
- **TypeScript:** Managed by Astro; no separate tsconfig needed at root
