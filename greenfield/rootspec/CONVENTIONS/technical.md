## Stack

- **Framework:** Astro 6 with static output
- **Interactivity:** React 19 (islands via `client:load`)
- **Styles:** Tailwind CSS v4 via `@tailwindcss/vite` plugin (NOT `@astrojs/tailwind`)
- **Language:** TypeScript
- **Base path:** `/demos/greenfield` (configured in `astro.config.mjs`)
- **Build:** `astro build` → `dist/`
- **Preview:** `astro preview` on port 4173

## File Organization

- `src/pages/index.astro` — single page
- `src/layouts/Layout.astro` — HTML shell, theme script
- `src/components/` — Astro static components + React island components
- `src/styles/global.css` — CSS custom properties, Tailwind import
- `cypress/e2e/mvp.cy.ts` — all tests (YAML embedded as string literals)
- `cypress/support/` — steps, schema, reporter, screenshot hook

## Readiness Signal

Every page sets `document.body.setAttribute('data-ready', 'true')` once interactive handlers are attached. For this static site, it's done in the `<script>` block in `Header.astro` (which executes after the document loads). The `safeVisit` step in `cypress/support/steps.ts` waits for this attribute before proceeding.

## Theme

- Inline script in `<head>` reads `localStorage.getItem('rootspec-theme')` before first paint
- Falls back to `prefers-color-scheme`, then defaults to `'light'`
- Storage key: `rootspec-theme`
- `data-theme` attribute on `<html>` element
- Theme toggle button in Header calls `document.documentElement.setAttribute('data-theme', next)`

## CSS Custom Properties

Defined on `:root` and `[data-theme="light"]` / `[data-theme="dark"]`:
- `--color-bg`, `--color-bg-surface`
- `--color-text-primary`, `--color-text-secondary`, `--color-text-code`
- `--color-border`
- `--color-accent`, `--color-accent-hover`
- `--color-link`, `--color-link-hover`

All components use inline `style` attributes referencing these CSS variables (not Tailwind classes) for theme-aware coloring.

## Version Reading

`Header.astro` and `HeroSection.astro` read `.rootspec.json` at build time using Node.js `fs.readFileSync`. Falls back to `'7.5.0'` if the file is missing.

## TypeScript / Cypress

- `cypress/tsconfig.json` uses `target: "ES2020"`, `ignoreDeprecations: "6.0"` to suppress TypeScript 7.x deprecation warnings
- Tests compile via Cypress's bundled webpack preprocessor
