# Level 4: Theme System
# RootSpec Marketing Site

---

## Responsibility

The Theme System manages dark/light mode state across the entire site. It is the single authority on which theme is active and how that preference is persisted and applied.

---

## Boundaries

**Owns:**
- Current theme state (`dark` | `light`)
- Theme preference persistence (localStorage)
- CSS custom property application on the document root
- Initial theme resolution logic (localStorage → system preference → default)

**Does not own:**
- Visual design of each theme (colors, typography, shadows — defined in CSS)
- Theme toggle UI element (→ Layout System owns placement; Presentation System owns animation)
- Any user content or copy

---

## State

### Theme State
- `current_theme`: `dark` | `light`
- `source`: `persisted` | `system` | `default`

### Resolution Order (on page load)
1. Read `localStorage` key `rootspec-theme`
2. If not set, read `prefers-color-scheme` media query
3. If unavailable, default to `dark`

---

## Behavior

### Applying the theme
When `current_theme` changes:
1. Set `data-theme` attribute on the document root element
2. CSS custom properties scoped to `[data-theme="dark"]` and `[data-theme="light"]` handle all visual changes
3. No inline styles are set by this system — everything flows through CSS

### Persisting the theme
When the user manually toggles the theme:
1. Update `current_theme`
2. Write to `localStorage` key `rootspec-theme`
3. Dispatch a DOM event so other systems can react (e.g., Presentation System plays transition)

### Privacy / restricted environments
If `localStorage` is unavailable (e.g., private browsing, storage denied), the system operates in memory only. Preference is not persisted. No error is surfaced to the user.

---

## Rules

- Theme must be applied before first paint — initialization runs synchronously in a `<script>` tag in the document `<head>` to prevent flash of incorrect theme
- CSS custom properties are the only mechanism for applying theme — no JavaScript DOM manipulation of colors or backgrounds
- Both themes must meet WCAG AA contrast requirements for all text on background combinations
- Theme state is the only data persisted across sessions by any system on this site
