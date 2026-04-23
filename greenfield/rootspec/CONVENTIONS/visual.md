## Color system
- **Primary:** `#6d28d9` (violet-700) — buttons, links, accents
- **Primary hover:** `#5b21b6` (violet-800)
- **Accent:** `#7c3aed` / `#a78bfa` (dark/light mode)
- **Meta banner background:** `#1e1b4b` (indigo-950)
- **Meta banner text:** `#e0e7ff` (indigo-100)
- All semantic colors defined as CSS variables in `src/styles/global.css`

## Light theme tokens
- `--color-bg`: `#ffffff`
- `--color-text`: `#0f172a`
- `--color-text-muted`: `#64748b`
- `--color-border`: `#e2e8f0`
- `--color-surface`: `#f8fafc`
- `--color-card-bg`: `#ffffff`

## Dark theme tokens
- `--color-bg`: `#0f172a`
- `--color-text`: `#f1f5f9`
- `--color-text-muted`: `#94a3b8`
- `--color-border`: `#1e293b`
- `--color-surface`: `#1e293b`
- `--color-card-bg`: `#1e293b`

## Typography
- **Font:** `ui-sans-serif, system-ui, -apple-system, sans-serif`
- **Headings:** `font-extrabold` or `font-bold` with Tailwind classes
- **Hero h1:** `text-5xl font-extrabold`
- **Section h2:** `text-3xl font-bold`
- **Card h3:** `text-xl font-semibold` or `text-lg font-semibold`
- **Body:** default size, `var(--color-text-muted)` for secondary text

## Layout
- **Max content width:** 1100px (`section-container` class)
- **Section padding:** `py-20 px-4` (standard), `py-24` (hero/CTA)
- **Card border-radius:** `rounded-xl`
- **Grid:** 1-column mobile, 2–4 column desktop with Tailwind `grid` utilities

## Theming
- Theme stored in `localStorage` under key `rootspec-theme`
- Applied as `data-theme="light"` or `data-theme="dark"` on `<html>`
- Default: `light`
- Toggle button in header with sun/moon icon swap

## Component visual patterns
- Cards: `border: 1px solid var(--color-card-border)`, `background: var(--color-card-bg)`, `rounded-xl`
- Buttons: solid primary for CTAs, ghost border for secondary
- Code/version labels: `font-mono`, `var(--color-surface-alt)` background
- Meta banner: full-width strip, dark indigo, small text with links
