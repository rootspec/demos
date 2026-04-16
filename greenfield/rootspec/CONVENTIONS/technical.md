## Framework
- **Stack:** Astro v6 + React v19 + Tailwind CSS v3
- **Language:** TypeScript (strict mode)
- **Rendering:** Astro SSR (static pages) with React client islands

## File Organization
- **Pages:** `src/pages/` (Astro .astro files)
- **Layouts:** `src/layouts/Layout.astro` (single base layout)
- **Static components:** `src/components/*.astro` (no JS/interactivity)
- **Interactive components:** `src/components/*.tsx` (React islands)
- **Styles:** `src/styles/global.css` (Tailwind + CSS custom properties)

## Component Patterns
- **Astro components:** Server-rendered, no hydration cost; use for headers, footers, static sections
- **React components:** Client-only interactive widgets; use `client:load` directive for immediate hydration
- **Naming:** PascalCase for component files; e.g., `HierarchyExplorer.tsx`, `MetaBanner.astro`

## Styling
- **Approach:** Tailwind utility classes with CSS custom properties for theme colors
- **Theme vars:** `--bg`, `--fg`, `--muted`, `--border`, `--card` defined in `:root` and `html.dark`
- **Dark mode:** Class-based (`html.dark`), default is dark, toggle persisted in `localStorage`
- **Responsive:** Mobile-first with Tailwind breakpoints (`md:`, `lg:`)

## Testing
- **Framework:** Cypress 15 with TypeScript
- **Test file:** `cypress/e2e/mvp.cy.ts` (single file, all stories)
- **Pattern:** `loadAndRun()` with inline YAML string literals
- **Test infra:** `steps.ts` has 600ms hydration wait after `visit` for React island compatibility
- **Data attributes:** All testable elements use `data-test="..."` attributes

## Dev Server
- **Command:** `npx astro dev` (via `./scripts/dev.sh start`)
- **Port:** 3000
- **Build:** `npx astro build` → `dist/`

## TypeScript
- **Cypress tsconfig:** `ignoreDeprecations: "6.0"` required for TS6 + Cypress webpack compatibility
