# Level 4: Theme System

**Product:** RootSpec Marketing Site
**Version:** 1.0.0
**Status:** Active

---

## Responsibility

The Theme System manages the site's visual mode (light or dark), detects system preferences, provides a user-controlled toggle, and ensures the selected theme persists across sessions. It is the source of truth for all color and appearance tokens.

---

## System Boundaries

**Owns:**
- Theme detection logic (system preference via `prefers-color-scheme`)
- Theme persistence (localStorage key)
- Theme toggle UI behavior
- CSS custom property token values for light and dark modes
- Flash-of-wrong-theme prevention

**Does not own:**
- Typography tokens (set globally; the same in both modes)
- Layout tokens (spacing, sizing — mode-independent)
- Individual component styling decisions (components consume tokens; they don't define them)

---

## Token Model

The Theme System defines a set of CSS custom properties applied to `:root`. All components — whether Astro static or React islands — consume these tokens rather than hardcoded color values.

Token categories:

| Category | Description |
|----------|-------------|
| `--color-bg` | Page background |
| `--color-bg-surface` | Card/panel/surface background |
| `--color-text-primary` | Primary body text |
| `--color-text-secondary` | Secondary/muted text |
| `--color-text-code` | Monospace text color |
| `--color-border` | Borders and dividers |
| `--color-accent` | Primary accent color (used sparingly) |
| `--color-accent-hover` | Accent hover state |
| `--color-link` | Hyperlink color |
| `--color-link-hover` | Hyperlink hover state |

The palette is restrained: two neutral colors (light background / dark background) plus one accent color. The accent is the same hue in both modes but may shift in lightness for contrast.

---

## State

| State | Type | Description |
|-------|------|-------------|
| `theme` | `'light' \| 'dark'` | Current active theme |
| `source` | `'system' \| 'user'` | Whether theme was set by system preference or explicit toggle |

**Defaults:**
- If no localStorage value exists and no system preference is detected: `light`
- If system preference exists and no localStorage override: follow system
- If localStorage override exists: override takes precedence

---

## Theme Resolution Order

1. Read `localStorage.getItem('theme')`
2. If a stored value exists (`'light'` or `'dark'`), apply it
3. Else, check `window.matchMedia('(prefers-color-scheme: dark)')`
4. Else, default to `'light'`

This resolution runs in an inline `<script>` in the document `<head>`, before first paint, to prevent flash of wrong theme.

---

## Toggle Behavior

- The toggle is a button in the header with a visual icon indicating the current mode
- Clicking the toggle flips the theme and writes the new value to localStorage
- The toggle icon updates immediately
- No page reload required

---

## Constraints

- Theme script must execute before any CSS is parsed or any content is painted — it belongs in `<head>` as an inline (non-deferred) script
- The dark mode palette must maintain WCAG AA contrast ratios against the background values
- Interactive island components must not define their own color values; they must inherit CSS custom properties from the root
- Transition between themes may use a brief CSS transition on `background-color` and `color` properties; transition duration should be [brief transition duration]

---

## Interactions with Other Systems

- **CONTENT_SYSTEM:** Consumes theme tokens via CSS custom properties on all static elements
- **HIERARCHY_EXPLORER, SPEC_WIZARD, COMPARISON_SYSTEM:** Consume theme tokens via CSS custom properties; no JS props or context needed
