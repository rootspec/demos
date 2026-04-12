## Color Tokens (CSS Custom Properties)

### Dark Theme (default)
- **--bg:** `#0f172a` — Page background
- **--bg-secondary:** `#1e293b` — Alternate section background
- **--text:** `#f1f5f9` — Primary text
- **--text-muted:** `#94a3b8` — Secondary/muted text
- **--accent:** `#6366f1` — Indigo — CTA buttons, badges, borders
- **--accent-hover:** `#818cf8` — Accent hover state
- **--border:** `#334155` — Borders and dividers
- **--card-bg:** `#1e293b` — Card/panel backgrounds

### Light Theme
- **--bg:** `#ffffff`
- **--bg-secondary:** `#f8fafc`
- **--text:** `#0f172a`
- **--text-muted:** `#64748b`
- **--accent:** `#6366f1`
- **--accent-hover:** `#4f46e5`
- **--border:** `#e2e8f0`
- **--card-bg:** `#f8fafc`

## Typography
- **Font family:** `ui-monospace, 'Cascadia Code', 'Fira Code', monospace` — developer-audience aesthetic
- **Hero heading:** `clamp(2rem, 6vw, 3.5rem)`, weight 900
- **Section headings:** `1.8rem`, weight 800
- **Body text:** `1rem` / `0.9rem`, line-height 1.6
- **Code snippets:** `0.8rem` monospace, accent color on dark card background

## Spacing
- **Nav height:** `56px`
- **Max content width:** `1140px`
- **Section padding:** `64px 24px` (mobile: same, relies on responsive grid)
- **Mobile breakpoint:** `768px`
- **Desktop breakpoint:** `1200px`

## Component Tokens
- **Border radius (cards):** `10–12px`
- **Border radius (buttons):** `6–8px`
- **Transition duration:** `200ms ease` (theme), `300ms ease` (sections)
- **Section entry animation:** `opacity 0→1` + `translateY 12px→0` over `300ms`
