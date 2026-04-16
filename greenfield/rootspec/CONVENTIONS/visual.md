## Color System (CSS custom properties)
- **Background:** `var(--bg)` — `#0f0f0f` (dark) / `#ffffff` (light)
- **Foreground:** `var(--fg)` — `#f5f5f5` (dark) / `#0f0f0f` (light)
- **Accent:** `var(--accent)` — `#7c3aed` (purple, both modes)
- **Accent light:** `var(--accent-light)` — `#a78bfa` (dark) / `#6d28d9` (light)
- **Surface:** `var(--surface)` — `#1a1a1a` (dark) / `#f5f5f5` (light)
- **Border:** `var(--border)` — `#2a2a2a` (dark) / `#e5e5e5` (light)
- **Muted:** `var(--muted)` — `#888` (dark) / `#555` (light)

## Theme
- **Default:** Dark mode (`data-theme="dark"` on `<html>`)
- **Toggle:** Header button with `data-test="theme-toggle"`, persisted in `localStorage`
- **Transition:** `background 0.2s, color 0.2s` on body

## Typography
- **Font:** System UI stack (`system-ui, -apple-system, sans-serif`)
- **Monospace:** `ui-monospace, monospace` for code elements
- **Headings:** `font-weight: 700-800`, `letter-spacing: -0.02em to -0.03em`
- **Scale:** `clamp()` for responsive heading sizes

## Spacing
- **Section padding:** `5rem 1.5rem` (vertical/horizontal)
- **Max width:** `900px` for content containers, `600px` for narrow sections
- **Border radius:** `0.5rem` (buttons/inputs), `0.625rem-0.75rem` (cards)

## Components
- **Buttons:** Solid accent (`var(--accent)`) or ghost (surface + border)
- **Cards:** `background: var(--surface)`, `border: 1px solid var(--border)`, `border-radius: 0.75rem`
- **Section labels:** Uppercase, `0.75rem`, `letter-spacing: 0.12em`, accent color
- **Version badge:** Pill shape, surface background, accent-light text
