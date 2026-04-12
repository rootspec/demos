## Framework
- **Runtime:** Astro 6 with React integration (`@astrojs/react`)
- **Rendering:** SSR (server-side rendering) + client hydration for interactive components
- **Hydration strategy:** `client:load` for interactive React islands (HierarchyExplorer, SpecWizard)
- **Output:** Static HTML with lightweight JS bundles

## Structure
- **Pages:** `src/pages/` — Astro page files (`.astro`)
- **Layouts:** `src/layouts/Layout.astro` — root HTML shell with theme flash-prevention script
- **Components:** `src/components/` — `.astro` for static, `.tsx` for interactive React islands
- **Styles:** `src/styles/global.css` — global CSS with theme custom properties

## Styling
- **Approach:** Plain CSS with CSS custom properties (no CSS framework)
- **Scoping:** Astro component-scoped styles + global custom properties
- **No utility classes:** Plain semantic CSS only

## Testing
- **Framework:** Cypress 15 with TypeScript
- **Test file:** `cypress/e2e/mvp.cy.ts` — all MVP user stories embedded as YAML string literals
- **Hydration guard:** `cy.visit()` overwritten in `cypress/support/e2e.ts` to wait for `astro-island[ssr]` to be removed before proceeding
- **DSL:** RootSpec step DSL (`visit`, `click`, `fill`, `shouldExist`, `shouldContain`)

## Build
- **Dev command:** `npx astro dev --port 3000 --host` (via `scripts/dev.sh`)
- **Build command:** `astro build`
- **Test command:** `./scripts/test.sh` (starts dev server, runs Cypress, stops server)

## Data
- **Version source:** `.rootspec.json` — version `7.2.0` hardcoded at build time in Header and HeroSection
- **No external APIs:** All content is static; no runtime data fetching
