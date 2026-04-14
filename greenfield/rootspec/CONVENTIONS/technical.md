# Technical Conventions

## Framework
- **Framework:** Astro 6 with React 19 islands and Tailwind CSS 3
- **Language:** TypeScript (strict mode for app code, loose for Cypress)
- **Node version:** 22.x
- **Package manager:** npm with --legacy-peer-deps flag (needed for tailwindcss@3 + @astrojs/tailwind@6)

## Project Structure
- **Pages:** `src/pages/` — Astro pages
- **Components:** `src/components/` — `.astro` for static, `.tsx` for interactive React islands
- **Layouts:** `src/layouts/Layout.astro` — base HTML shell
- **Styles:** `src/styles/global.css` — Tailwind directives + CSS variables

## Dev Server
- **Command:** `npx astro dev --port 3000 --host`
- **Port:** 3000
- **Start/stop:** via `./scripts/dev.sh`

## Testing
- **Framework:** Cypress 15 with TypeScript
- **Test file:** `cypress/e2e/mvp.cy.ts`
- **DSL:** Extended RootSpec DSL — see `cypress/support/schema.ts` for all step types
- **Cypress tsconfig:** `target: ES2020`, `ignoreDeprecations: "6.0"` (required for TypeScript 6)

## Interactive Components
- **Pattern:** React islands using `client:load` directive in Astro
- **HierarchyExplorer:** `src/components/HierarchyExplorer.tsx` — accordion with `expanded` class
- **SpecWizard:** `src/components/SpecWizard.tsx` — 4-step multi-page wizard

## Theme
- **Default:** Dark mode (`html.dark` class set by inline script before paint)
- **Toggle:** Stores preference in `localStorage` as `'dark'` or `'light'`
- **CSS variables:** `--bg-primary`, `--bg-secondary`, `--text-primary`, `--text-secondary`, `--border-color`, `--accent`

## Dependencies Added
- `astro@^6.1.6`, `@astrojs/react@^5.0.3`, `@astrojs/tailwind@^6.0.2`
- `react@^19.2.5`, `react-dom@^19.2.5`, `tailwindcss@^3.4.19`
- `typescript@^6.0.2`, `cypress@^15.13.1`, `js-yaml@^4.1.1`, `zod@^4.3.6`
