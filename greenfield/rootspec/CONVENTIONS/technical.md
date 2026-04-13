## Framework
- **Stack:** Astro v6 + React v19 + Tailwind CSS v4
- **Build tool:** Vite (via Astro)
- **Language:** TypeScript (strict mode, JSX via react-jsx transform)
- **Entry:** `src/pages/index.astro`

## Component Patterns
- **Static sections:** Pure Astro components (`*.astro`) — no client-side JS
- **Interactive components:** React TSX with `client:only="react"` for stateful multi-step components
- **Accordion/expand:** Use native HTML `<details>/<summary>` in Astro for zero-JS expand/collapse — eliminates React hydration race conditions
- **Always import React** in `.tsx` files: `import React, { useState } from 'react'`

## Styling
- **Approach:** Inline styles using CSS custom properties for theme-awareness
- **No utility classes in components** (Tailwind loaded globally, not used in component markup)
- **CSS variables:** Defined in `src/styles/global.css` under `:root` (dark default) and `html.light` overrides

## Theme System
- **Default theme:** Light (`html.light`)
- **Dark theme:** `html.dark`
- **Persistence:** `localStorage.setItem('theme', 'dark'|'light')`
- **Inline script** in `Layout.astro` applies saved theme immediately to avoid flash
- **Toggle:** In `Header.astro` — reads `classList.contains('dark')` to determine current theme

## Testing
- **Runner:** Cypress 15
- **Config:** `cypress.config.ts`, base URL `http://localhost:3000`
- **Support:** `cypress/support/e2e.ts` — suppresses Astro/Vite dev-server HMR module errors
- **Pattern:** `loadAndRun()` with embedded YAML string literals in `cypress/e2e/mvp.cy.ts`
- **Dev server:** HMR disabled in `astro.config.mjs` (`vite.server.hmr: false`) for stable Cypress runs

## Dev Server
- **Command:** `npm run dev` → `astro dev --port 3000`
- **Management:** `./scripts/dev.sh start|stop|restart`
- **Port:** 3000
