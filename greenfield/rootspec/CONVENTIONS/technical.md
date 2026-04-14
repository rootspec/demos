## Framework
- **Stack:** Astro 6 + React 19 + Tailwind CSS v4
- **Router:** Astro file-based routing (src/pages/)
- **Styles:** Tailwind CSS v4 via @tailwindcss/vite plugin (NOT @astrojs/tailwind)
- **React hydration:** Use `client:only="react"` for interactive components that require click events in tests (avoids hydration timing issues)
- **React hydration:** Use `client:load` for read-only interactive components (no click handling needed in tests)

## File Structure
- **Pages:** src/pages/index.astro
- **Layouts:** src/layouts/Layout.astro
- **Astro components:** src/components/*.astro
- **React components:** src/components/*.tsx
- **Global styles:** src/styles/global.css

## Config
- **Astro config:** astro.config.mjs (defineConfig with react integration + vite tailwindcss plugin)
- **TypeScript:** tsconfig.json extends astro/tsconfigs/strict, jsxImportSource: react
- **Cypress tsconfig:** cypress/tsconfig.json — ES2017 target, ignoreDeprecations: 6.0

## Dev Server
- **Command:** npx astro dev --port 3000
- **Port:** 3000
- **Start:** ./scripts/dev.sh start

## Testing
- **Framework:** Cypress 15
- **Test file:** cypress/e2e/mvp.cy.ts
- **Pattern:** loadAndRun() with embedded YAML string literals

## Theme
- **Dark mode:** Managed via html.dark class using localStorage + prefers-color-scheme
- **Toggle:** #theme-toggle button in Header.astro with inline script
- **Flash prevention:** Inline script in Layout.astro <head> sets dark class before paint
