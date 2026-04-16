## Framework
- **Stack:** Astro 5 + React (islands) + Tailwind CSS
- **Language:** TypeScript strict
- **Node version:** 18+

## Project Structure
- **Pages:** `src/pages/` — Astro file-based routing
- **Components:** `src/components/` — `.astro` for static, `.tsx` for interactive React islands
- **Layouts:** `src/layouts/Layout.astro` — base HTML shell
- **Styles:** `src/styles/global.css` — Tailwind base + CSS custom properties

## Routing
- **Base path:** `/demos/greenfield` (set in `astro.config.mjs`)
- **Homepage:** `src/pages/index.astro` → serves at `/demos/greenfield/`

## Component Patterns
- **Static sections:** Astro components (`.astro`) — no client JS
- **Interactive components:** React TSX with `client:load` directive on import
- **Data test attributes:** All testable elements use `data-test=` for Cypress selectors
- **Theme:** CSS custom properties (`--bg-primary`, `--text-primary`, etc.) toggled via `dark`/`light` class on `<html>`

## Styling
- **Approach:** Tailwind utility classes + CSS variables for theme tokens
- **Dark mode:** `darkMode: 'class'` in tailwind config — toggle class on `<html>`
- **Fonts:** JetBrains Mono for code/mono, system sans for body

## Testing
- **Framework:** Cypress 15
- **Config:** `cypress.config.ts` — base URL `http://localhost:3000/demos/greenfield/`
- **Test file:** `cypress/e2e/mvp.cy.ts`
- **DSL:** RootSpec step DSL via `cypress/support/steps.ts`
