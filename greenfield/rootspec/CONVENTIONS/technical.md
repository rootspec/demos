## Framework

- **Framework:** Astro 4.x with React island integration (`@astrojs/react`)
- **Styling:** Tailwind CSS v3 via `@astrojs/tailwind`
- **Language:** TypeScript (strict mode via `astro/tsconfigs/strict`)
- **Dev command:** `npx astro dev --port 3000` (via `scripts/dev.sh`)
- **Test command:** `./scripts/test.sh` (Cypress e2e)

## Project Structure

- **Pages:** `src/pages/index.astro` — single-page marketing site
- **Layouts:** `src/layouts/Layout.astro` — base HTML shell with theme init script
- **Components:** `src/components/` — Astro + React TSX components
- **Styles:** `src/styles/global.css` — Tailwind base + CSS custom properties
- **Config:** `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`

## Patterns

- **React islands:** Interactive components (HierarchyExplorer, SpecWizard) use `client:load` directive
- **Data-test attributes:** All testable elements carry `data-test="..."` attributes
- **Theme:** Dark mode via `class` strategy; system preference detected inline in `<head>` to avoid flash
- **Version reading:** `fs.readFileSync` + `JSON.parse` at build time for `.rootspec.json`

## Testing

- **Framework:** Cypress with rootspec-reporter
- **Test file:** `cypress/e2e/mvp.cy.ts` — all 12 MVP stories embedded as YAML string literals
- **DSL steps used:** `visit`, `click`, `fill`, `shouldExist`, `shouldContain`
- **Status file:** `rootspec/tests-status.json`
