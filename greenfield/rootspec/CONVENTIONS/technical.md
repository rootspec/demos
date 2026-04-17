## Framework
- **Stack:** Astro 6 + React 19 + Tailwind CSS 3
- **Language:** TypeScript (strict mode)
- **Dev server:** `./scripts/dev.sh start` (runs `npx astro dev --port 3000`)
- **Build:** `astro build`
- **Tests:** `./scripts/test.sh` (Cypress e2e)

## File Organization
- **Pages:** `src/pages/` — Astro pages (`.astro`)
- **Layouts:** `src/layouts/` — page shells (`.astro`)
- **Components:** `src/components/` — static Astro (`.astro`) + interactive React (`.tsx`)
- **Styles:** `src/styles/global.css` — Tailwind base

## Component Patterns
- Static sections: Astro components (`.astro`)
- Interactive components: React TSX with `client:load` directive in wrapping Astro
- `data-test` attributes on all testable elements
- Props typed with TypeScript interfaces

## Routing
- Single-page marketing site: `/` (index.astro)
- All sections rendered server-side, interactive islands hydrated client-side

## Styling
- Utility-first Tailwind CSS
- Dark mode via `dark:` prefix — toggled by adding/removing `dark` class on `<html>`
- Theme state persisted in `localStorage`
- Responsive: mobile-first, `sm:` and `lg:` breakpoints
