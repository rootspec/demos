## Stack
- **Framework:** Astro 6 with React islands (`client:load`)
- **Styling:** Tailwind CSS v3 + CSS custom properties for theming
- **Language:** TypeScript (strict)
- **Testing:** Cypress 15 with js-yaml + zod DSL runner
- **Build:** `astro build` → `dist/`
- **Dev server:** `npx astro dev --port 3000` (managed by `scripts/dev.sh`)

## File Organization
- **Pages:** `src/pages/index.astro` — single-page site
- **Layouts:** `src/layouts/Layout.astro` — HTML shell, theme init script
- **Static components:** `src/components/*.astro` — server-rendered sections
- **Interactive components:** `src/components/*.tsx` — React islands
- **Styles:** `src/styles/global.css` — Tailwind directives + CSS variables

## Config
- **Astro config:** `astro.config.mjs` — base path `/demos/greenfield`, integrations: react, tailwind
- **Tailwind config:** `tailwind.config.mjs` — dark mode via `[data-theme="dark"]` selector
- **TypeScript:** `tsconfig.json` extends `astro/tsconfigs/strict`, jsx=react-jsx
- **Cypress tsconfig:** `cypress/tsconfig.json` — target ES2020, ignoreDeprecations: "6.0"

## Patterns
- **Theme:** `data-theme="light|dark"` on `<html>`, toggled via JS, persisted to localStorage
- **CSS variables:** `--bg`, `--text`, `--text-muted`, `--border`, `--surface`, `--accent` on `:root`
- **data-test attributes:** All testable elements have `data-test=kebab-case-name`
- **React state:** `useState` with functional updaters; no external state library
- **Event handling:** `onClick` on container divs where needed; buttons are direct click targets
