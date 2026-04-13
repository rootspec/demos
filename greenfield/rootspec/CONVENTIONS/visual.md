## Color Palette

### Light Theme
- **`--color-bg`:** `#ffffff` — page background
- **`--color-surface`:** `#f8f9fa` — card/section background
- **`--color-border`:** `#e2e8f0` — borders and dividers
- **`--color-text-primary`:** `#1a202c` — body text
- **`--color-text-secondary`:** `#718096` — muted/secondary text
- **`--color-accent`:** `#6366f1` — primary interactive elements (indigo)
- **`--color-accent-hover`:** `#4f46e5` — hover state
- **`--color-code-bg`:** `#f1f5f9`
- **`--color-code-text`:** `#0f172a`
- **`--color-meta-bg`:** `#eff6ff` — meta banner background
- **`--color-meta-border`:** `#bfdbfe`
- **`--color-meta-text`:** `#1e40af`

### Dark Theme
- **`--color-bg`:** `#0f172a`
- **`--color-surface`:** `#1e293b`
- **`--color-border`:** `#334155`
- **`--color-text-primary`:** `#f1f5f9`
- **`--color-text-secondary`:** `#94a3b8`
- **`--color-accent`:** `#818cf8`
- **`--color-accent-hover`:** `#a5b4fc`

## Typography
- **Body font:** System font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`)
- **Monospace font:** `'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace`
- **Base line-height:** `1.6`
- **Heading line-height:** `1.2`

## Spacing
- **Section padding:** `5rem 0` (desktop), `3rem 0` (mobile ≤768px)
- **Container max-width:** `1100px` with `1.5rem` horizontal padding
- **Container mobile padding:** `1rem`

## Component Patterns
- **Buttons:** `0.5rem` border-radius, `0.75rem 1.5rem` padding, `600` font-weight
- **Cards/panels:** `0.75rem` border-radius, `1px` border in `--color-border`
- **Section labels:** `0.75rem`, `700` weight, `0.1em` letter-spacing, uppercase, `--color-accent` color
- **Code blocks:** `0.5rem` border-radius, monospace font, `0.875rem` size

## Theme Toggle
- **Applied on:** `document.documentElement` via `data-theme` attribute
- **Values:** `"light"` | `"dark"`
- **Persistence:** `localStorage` key `rootspec-theme`
- **Flash prevention:** Inline script in `<head>` sets theme before first paint
