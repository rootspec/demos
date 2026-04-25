## Typography

- **Body / prose:** Source Serif 4 (400, 400i, 600) — all running text, Author's Notes, Problem/How It Works
- **UI / labels:** Inter (400, 500, 600) — navigation, section labels, buttons, meta-banner
- **Code / commands:** JetBrains Mono (400, 500) — skill names, code examples, version badge

## Color Tokens

| Token | Light | Dark |
|-------|-------|------|
| `--color-bg` | `#f8f7f4` | `#141310` |
| `--color-surface` | `#f0ede8` | `#1e1c18` |
| `--color-text-primary` | `#1a1916` | `#e8e5df` |
| `--color-text-secondary` | `#6b6760` | `#928f88` |
| `--color-accent` | `#2d5a8e` | `#7aa8d8` |
| `--color-border` | `#d4d0ca` | `#2e2c27` |
| `--color-banner-bg` | `#eef2f8` | `#1a2030` |

## Spacing Scale

- `--space-xs`: 0.25rem
- `--space-sm`: 0.5rem
- `--space-md`: 1rem
- `--space-lg`: 1.5rem
- `--space-xl`: 3rem
- `--space-2xl`: 5rem

## Motion

- **Transition duration:** 200ms expand, 150ms collapse (hierarchy explorer)
- **Easing:** ease-out
- **Theme switch:** Instant (0ms transition)
- No spring physics, no parallax, no scroll animations

## Theme

- **Default:** Light
- **Toggle:** Header button with `data-test="theme-toggle"`
- **Storage key:** `rootspec-theme` (localStorage)
- **HTML attribute:** `data-theme="dark"` on `<html>` element

## Anti-patterns

- No gradients, glassmorphism, or glow effects
- No decorative color use
- No hero sections with massive gradient text
- No stat counters or testimonial cards
