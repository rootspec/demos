## Color Palette

### Dark Mode (default CSS variables)
- **Background:** `#0f172a` (`--color-bg`)
- **Surface:** `#1e293b` (`--color-surface`)
- **Accent:** `#6366f1` (`--color-accent`)
- **Accent bright:** `#818cf8` (`--color-accent-bright`)
- **Text:** `#f1f5f9` (`--color-text`)
- **Text muted:** `#94a3b8` (`--color-text-muted`)
- **Border:** `#334155` (`--color-border`)

### Light Mode (`html.light` overrides)
- **Background:** `#f8fafc`
- **Surface:** `#ffffff`
- **Accent:** `#6366f1`
- **Accent bright:** `#4f46e5`
- **Text:** `#0f172a`
- **Text muted:** `#64748b`
- **Border:** `#e2e8f0`

## Typography
- **Font:** Inter (Google Fonts) — weights 400, 500, 600, 700, 800
- **Fallback:** `system-ui, -apple-system, sans-serif`
- **Monospace:** `ui-monospace, monospace` (used in wizard output and skill name badges)
- **Hero headline:** `clamp(2rem, 5vw, 3.75rem)`, weight 800, gradient text fill
- **Section headings:** `clamp(1.5rem, 3vw, 2.25rem)`, weight 700
- **Body text:** 0.875rem–1.1rem, line-height 1.5–1.6

## Spacing
- **Section padding:** `5rem 1.5rem` (vertical/horizontal)
- **Card padding:** `1.5rem–1.75rem`
- **Max content width:** `800px` (focused), `1100px` (wide grids)
- **Grid gap:** `1.5rem`

## Visual Effects
- **Hero background:** `radial-gradient(ellipse at top, rgba(99,102,241,0.15) 0%, transparent 70%)`
- **Meta banner background:** `linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)`
- **Version badge:** Pill shape, `rgba(99,102,241,0.2)` background, `border-radius: 9999px`
- **Cards:** `border-radius: 0.75rem`, 1px border using `--color-border`
- **Body transition:** `background-color 0.2s ease, color 0.2s ease` on theme switch

## Comparison Panel Colors
- **Without RootSpec:** `rgba(239,68,68,0.05)` background, `rgba(239,68,68,0.25)` border, `#f87171` accents
- **With RootSpec:** `rgba(34,197,94,0.05)` background, `rgba(34,197,94,0.25)` border, `#4ade80` accents
