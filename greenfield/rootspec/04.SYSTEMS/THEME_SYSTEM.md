# Level 4: Theme System

**System:** THEME_SYSTEM
**References:** L1-3, Sibling L4, External

---

## Responsibility

Manages dark/light mode detection, manual user override, and persistence. Ensures all UI surfaces — static content and interactive components — reflect the current theme without visual flash on load.

---

## State Managed

- **Active theme:** `light` or `dark`
- **Theme source:** `system` (from `prefers-color-scheme`) or `manual` (user toggled)
- **Persisted preference:** stored in `localStorage` under a consistent key

---

## Behavior Rules

1. On page load, check `localStorage` for a persisted manual preference
2. If no manual preference exists, read `prefers-color-scheme` from the browser
3. If neither is available, default to `light`
4. Apply the resolved theme by setting a class on the document root element (e.g., `class="dark"`)
5. When the user activates the theme toggle, flip the theme, update the root class, and write the new preference to `localStorage`
6. Theme transitions use a [very brief] CSS crossfade — not an instant flash, not an animated sweep

## Flash Prevention

Theme resolution logic runs in a blocking `<script>` tag in the document `<head>`, before any rendering, to prevent a flash of the wrong theme.

---

## Data Ownership

- Current theme state (`light` | `dark`)
- Theme source (`system` | `manual`)
- `localStorage` key for theme persistence

---

## Boundaries

- Does not own any visual design tokens (colors, typography) — those are in Tailwind config
- Does not own the toggle button's visual rendering — LAYOUT_SYSTEM renders it
- Does not own component-specific dark mode overrides — components use CSS variables that this system controls

---

## Interactions with Other Systems

| System | Nature |
|--------|--------|
| LAYOUT_SYSTEM | Toggle button rendered in the header; THEME_SYSTEM provides the handler |
| INTERACTIVE_SYSTEM | React components inherit CSS variables set by THEME_SYSTEM; no direct coupling |
| CONTENT_SYSTEM | Static sections inherit theme via root class; no direct coupling |
