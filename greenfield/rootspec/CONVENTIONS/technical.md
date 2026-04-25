## Stack

- **Framework:** Astro v6
- **Integrations:** @astrojs/react, @astrojs/tailwind
- **Styling:** Tailwind CSS v3 + CSS custom properties
- **Language:** TypeScript (strict)
- **Test runner:** Cypress v15 (e2e, preview mode)

## File Organization

- `src/pages/` — Astro pages (index.astro = root)
- `src/layouts/` — Layout components (Layout.astro)
- `src/components/` — Page section components (.astro + .tsx for interactive)
- `src/styles/` — Global CSS (global.css)
- `cypress/` — E2E test infrastructure
- `rootspec/` — Spec hierarchy (L1–L5)

## Component Patterns

- **Static sections:** `.astro` components with inline styles using CSS custom properties
- **Interactive components:** `.tsx` React components hydrated with `client:load`
- **Hydration directive:** `client:load` for HierarchyExplorer and SpecWizard
- **Data passing:** Props from Astro to React; no shared state store

## Styling Approach

- CSS custom properties defined on `:root` and `[data-theme="dark"]`
- Tailwind utility classes used sparingly; inline styles preferred for spec-driven values
- Font stack: Source Serif 4 (prose), Inter (UI), JetBrains Mono (code)
- No gradients, no glassmorphism, no glow effects

## App Readiness

### Deferred-execution boundaries

Two components use `client:load` hydration:
- `src/components/HierarchyExplorer.tsx` — mounted via `client:load` in `HierarchySection.astro`
- `src/components/SpecWizard.tsx` — mounted via `client:load` in `SpecWizardSection.astro`

Astro serializes hydration islands as `<astro-island>` elements. When hydration completes, Astro sets `data-island-status="completed"` on each island element.

### Readiness signal

Astro removes the `[ssr]` attribute from `<astro-island>` elements once client-side hydration completes. Wait for `astro-island:not([ssr])` to exist — this confirms at least one `client:load` island has hydrated and the React component is interactive. The Cypress implementation is in `cypress/support/app-ready.ts`.

## Base Path

- **Value:** `/demos/greenfield`
- Configured in `astro.config.mjs` as `base: '/demos/greenfield'`
- All asset URLs, internal links, and the Cypress `visit` target use this base path
- Same value in dev, preview, and production

## Build

- `npm run build` → `astro build` → outputs to `dist/`
- `npm run preview` → `astro preview` → serves `dist/` on port 4173
