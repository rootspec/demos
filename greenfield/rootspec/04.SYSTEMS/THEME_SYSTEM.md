# Level 4: Theme System

**System:** THEME_SYSTEM
**Last Updated:** 2026-04-12

---

## Responsibility

The Theme System owns the active theme state and the design token layer. It detects system color-scheme preference, exposes a manual toggle, persists the user's choice, and applies the active theme by setting a class or attribute on the document root. All other systems consume theme values through CSS custom properties — they do not interact with localStorage or the toggle directly.

---

## Boundaries

- **Owns:** Active theme state, theme toggle button behavior, localStorage read/write for preference, CSS custom property definitions for both themes
- **Does not own:** Layout structure, content copy, interactive section behavior
- **Reads from:** Browser `prefers-color-scheme` media query (system preference), localStorage (persisted preference)
- **Read by:** All systems (via CSS custom properties), LAYOUT_SYSTEM (renders the toggle button)

---

## Theme States

| State | Description |
|-------|-------------|
| `light` | Default for users with no system preference or `prefers-color-scheme: light` |
| `dark` | Applied for users with `prefers-color-scheme: dark` or manual dark toggle |

---

## Preference Resolution

Priority order (highest to lowest):
1. Persisted user preference (localStorage)
2. System preference (`prefers-color-scheme`)
3. Default: `light`

On every page load, the system reads localStorage first. If a value is found, it is applied immediately (before first paint, to prevent flash). If no persisted value exists, the system reads `prefers-color-scheme`.

---

## Toggle Behavior

- Toggle button is rendered by LAYOUT_SYSTEM (in the header)
- Clicking the toggle flips the active theme
- New theme is written to localStorage
- Theme class is updated on the document root element
- All themed elements update immediately via CSS custom properties (no reload)

**Accessibility requirements:**
- Toggle button has `aria-label` describing the action (e.g., "Switch to dark mode")
- State change is announced via `aria-live` or equivalent
- Toggle is reachable via keyboard (Tab), operable via Enter or Space

---

## CSS Custom Properties

The Theme System defines a set of custom properties that all other systems consume. Actual hex/color values are defined at implementation time. Placeholder names are established here:

| Token | Role |
|-------|------|
| `--color-bg` | Page background |
| `--color-surface` | Card/section background |
| `--color-border` | Borders and dividers |
| `--color-text-primary` | Body text |
| `--color-text-secondary` | Secondary/muted text |
| `--color-accent` | Primary interactive elements, links, highlights |
| `--color-accent-hover` | Hover state for accent |
| `--color-code-bg` | Inline code background |
| `--color-code-text` | Inline code text |

---

## Flash Prevention

The theme must be applied synchronously before first paint to prevent a white flash in dark mode. This requires a small inline script in the document `<head>` that reads localStorage and sets the theme attribute before the stylesheet renders.

---

## Failure Mode

If localStorage is unavailable (private browsing, storage quota exceeded), the toggle still works for the duration of the session. The preference is not persisted. System preference continues to be honored on subsequent page loads.
