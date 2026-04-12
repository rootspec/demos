## Framework

- **Static Site Generator:** Astro 6.x
- **UI Components:** React 19 (client:load islands for interactive components)
- **Styling:** Vanilla CSS with custom properties (no Tailwind, no CSS-in-JS)
- **Testing:** Cypress 15 with RootSpec DSL runner

## Directory Structure

- **src/pages/:** Astro pages (`index.astro` for `/`)
- **src/layouts/:** Base HTML layout (`Layout.astro`)
- **src/components/:** React TSX components (ThemeToggle, HierarchyExplorer, SpecWizard, BeforeAfter)
- **src/styles/:** Global CSS (`global.css`)

## Key Patterns

- **Theme:** Applied via `data-theme` attribute on `<html>`; stored in `localStorage`; read before render via inline script to prevent flash
- **Version badge:** Read from `.rootspec.json` at build time in `index.astro` frontmatter
- **Build date:** Generated at build time via `new Date()` in frontmatter
- **Data attributes:** All test selectors use `data-test=` attributes on elements

## Build Commands

- **Dev server:** `./scripts/dev.sh start` (port 3000)
- **Build:** `astro build`
- **Test:** `./scripts/test.sh` (starts dev server, runs Cypress, stops server)

## TypeScript

- **Config:** `cypress/tsconfig.json` for test files
- **Component types:** Inline; no separate `.d.ts` files
