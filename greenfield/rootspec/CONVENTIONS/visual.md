## Color Tokens (CSS Variables)
- **--bg:** `#ffffff` (light) / `#0f172a` (dark) — page background
- **--text:** `#0f172a` (light) / `#f1f5f9` (dark) — primary text
- **--text-muted:** `#64748b` (light) / `#94a3b8` (dark) — secondary text
- **--border:** `#e2e8f0` (light) / `#1e293b` (dark) — borders
- **--surface:** `#f8fafc` (light) / `#1e293b` (dark) — card/section backgrounds
- **--accent:** `#0ea5e9` (light) / `#38bdf8` (dark) — brand blue (sky-500/400)
- **--accent-dark:** `#0284c7` — hover/gradient end for accent

## Typography
- **Body font:** System sans-serif (Tailwind default)
- **Mono font:** JetBrains Mono (Google Fonts), fallback: Fira Code, monospace
- **Headings:** `font-bold`, sizes: `text-3xl` / `text-4xl` / `text-6xl` per breakpoint
- **Code samples:** `<pre>` with `font-mono text-sm`, surface background

## Spacing
- **Section padding:** `py-20 px-4` standard; `py-24` for hero/CTA
- **Content max-width:** `max-w-4xl` for text sections, `max-w-5xl` for comparison, `max-w-2xl` for wizard
- **Card padding:** `p-6` for feature cards, `p-8` for wizard interior

## Component Patterns
- **Cards:** `rounded-xl border` with `var(--surface)` bg and `var(--border)` border
- **Buttons (primary):** `var(--accent)` bg, white text, `rounded-lg px-6 py-2`
- **Buttons (secondary):** `var(--bg)` bg, `var(--text)` color, `var(--border)` border
- **Chips/pills:** `rounded-full px-4 py-2`, accent when selected
- **Meta banner:** Amber-50 bg, amber-200 border, amber-800 text (hardcoded for visibility)

## Alternating Section Backgrounds
- Hero → `var(--bg)` gradient
- Problem → `var(--surface)`
- How It Works → `var(--bg)`
- Hierarchy → `var(--bg)`
- Comparison → `var(--surface)`
- Wizard → `var(--surface)`
- CTA → accent gradient (blue)
- Footer → `var(--bg)`

## Theme Toggle
- Light mode default; stored in `localStorage` key `theme`
- Icon: ☀️ for light, 🌙 for dark
- Toggle button: `[data-test=theme-toggle]` in sticky header
