## Framework
- **Runtime:** Astro 6 with React integration (`@astrojs/react`)
- **CSS:** Tailwind CSS v4 via `@tailwindcss/vite`
- **Language:** TypeScript (strict mode via `astro/tsconfigs/strict`)
- **Build:** `astro build`
- **Dev server:** `npm run dev` → `./scripts/dev.sh start` → `astro dev` on port 3000
- **Test runner:** Cypress with `js-yaml` + `zod` for DSL validation

## File organization
- `src/pages/` — Astro page routes
- `src/layouts/` — Shared HTML shells
- `src/components/` — Astro and React components
- `src/styles/` — Global CSS (Tailwind + CSS variables)
- `cypress/e2e/` — Cypress test specs
- `cypress/support/` — DSL steps, schema, reporter

## Component conventions
- Static sections: `.astro` components
- Interactive islands: `.tsx` React components with `client:load` directive
- All interactive components export a default function
- Sections receive their data inline (no external data files)

## Base path
- **Base:** `/demos/greenfield` (set in `astro.config.mjs`)
- All internal links use `/demos/greenfield/` as root
- `Astro.props` and layouts handle path prefixing automatically

## Routing
- Single-page marketing site at `/demos/greenfield/`
- No dynamic routes or API endpoints in MVP
- Anchor-based section navigation (`#how-it-works`, `#hierarchy`, etc.)

## Testing
- Cypress base URL: `http://localhost:3000`
- Test entry: `cypress/e2e/mvp.cy.ts`
- Results written to `rootspec/tests-status.json` via rootspec-reporter
- All stories use `loadAndRun()` with embedded YAML string literals
