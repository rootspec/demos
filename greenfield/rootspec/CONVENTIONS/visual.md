## Typography
- **Serif (body/headings):** Newsreader (Google Fonts) — editorial, essay quality
- **Sans-serif (UI/labels):** Inter (Google Fonts) — navigation, labels, captions
- **Monospace (code/skills):** JetBrains Mono (Google Fonts) — commands, skill names, code examples
- **Heading weight:** 300 (light) for large display headings; 600 for section labels
- **Section labels:** 0.75rem, uppercase, 0.1em letter-spacing, `var(--color-text-muted)`

## Color Palette (CSS Custom Properties)
### Light mode (default)
- `--color-bg`: `#fafaf8` (warm off-white)
- `--color-text`: `#1a1a18`
- `--color-text-muted`: `#5a5a52`
- `--color-border`: `#e2e2da`
- `--color-accent`: `#1a56db`
- `--color-surface`: `#f0f0eb` (section alternates)
- `--color-banner-bg`: `#f5f3ef`

### Dark mode (data-theme="dark")
- `--color-bg`: `#111110`
- `--color-text`: `#e8e8e2`
- `--color-text-muted`: `#8a8a80`
- `--color-border`: `#2a2a26`
- `--color-accent`: `#5b8df8`
- `--color-surface`: `#1e1e1c`
- `--color-banner-bg`: `#1a1a18`

## Layout
- **Max width:** 860px centered with `margin: 0 auto`
- **Section padding:** `4rem 1.5rem` standard; `5rem 1.5rem 4rem` hero
- **Section dividers:** `border-top: 1px solid var(--color-border)`
- **Alternating section backgrounds:** light sections use `var(--color-surface)`

## Interactive Elements
- **Transitions:** 150ms ease-out on border-color, background, transform
- **Border radius:** 3–6px (functional, not decorative)
- **Buttons:** no border-radius > 4px; flat, bordered, low-decoration
- **No:** gradients, glassmorphism, glows, springy animations, parallax

## Theme Toggle
- Button in header with `data-test=theme-toggle`
- Toggles `data-theme="dark"` on `<html>` element
- Persisted in `localStorage` under key `theme`
- Inline script in Layout prevents flash of wrong theme on page load

## Component Patterns
- Static sections: `.astro` components with inline styles using CSS custom properties
- Interactive sections: React `.tsx` islands mounted with `client:load`
- All data-test attributes use kebab-case identifiers matching spec selectors
