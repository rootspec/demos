## Framework

- **Framework:** Astro 6 with React islands (`@astrojs/react`) and Tailwind CSS (`@astrojs/tailwind`, tailwindcss v3)
- **TypeScript:** v4 (pinned for Cypress webpack-batteries compatibility)
- **Rendering:** Astro SSR for static components, `client:load` for React interactive islands
- **Base path:** `/demos/greenfield` in production (`NODE_ENV=production`), `/` in dev

## File Structure

- **Pages:** `src/pages/` — Astro page files
- **Layouts:** `src/layouts/Layout.astro` — root HTML layout with theme FOUC prevention
- **Components:** `src/components/` — `.astro` for static, `.tsx` for interactive
- **Styles:** `src/styles/global.css` — Tailwind base + CSS custom properties for theming

## Testing

- **Framework:** Cypress 15 with TypeScript
- **Pattern:** `loadAndRun()` with embedded YAML string literals in `cypress/e2e/mvp.cy.ts`
- **DSL:** `visit`, `click`, `fill`, `shouldExist`, `shouldContain`
- **Selectors:** All interactive elements have `data-test` attributes matching spec selector names
- **Note:** Cypress tsconfig uses `"ignoreDeprecations": "5.0"` and `target: es2017` to avoid TS5 deprecation errors

## Dev Server

- **Command:** `npx astro dev --port 3000`
- **Port:** 3000
- **Managed by:** `scripts/dev.sh`

## Dependencies

- **Runtime:** astro, @astrojs/react, @astrojs/tailwind, react, react-dom, tailwindcss@3
- **Dev:** cypress, js-yaml, zod, typescript@4
