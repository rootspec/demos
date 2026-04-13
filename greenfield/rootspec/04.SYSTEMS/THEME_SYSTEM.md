# Level 4: Theme System

*References: 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md*

## Responsibility

Manages the dark/light color theme state for the entire site. Handles system preference detection, manual override, and persistence across sessions.

## Boundaries

- **Owns:** Theme state, preference detection, manual toggle, `localStorage` persistence
- **Does not own:** Visual design tokens (LAYOUT_SYSTEM manages CSS variables), component rendering (LAYOUT_SYSTEM + INTERACTIVE_SYSTEM)
- **Exposes:** Current theme value (`light` | `dark`) to all other systems via CSS class on `<html>` element

## State

| Property | Type | Values | Default |
|----------|------|--------|---------|
| `theme` | enum | `light`, `dark` | Detected from system, fallback `light` |
| `override` | boolean | true if manually set | false |

## Theme Detection

1. On page load, check `localStorage` for stored preference
2. If stored preference exists, apply it immediately (before first paint)
3. If no stored preference, read `window.matchMedia('(prefers-color-scheme: dark)')`
4. Apply detected or stored theme by adding class to `<html>` element: `class="dark"` or `class="light"`

## Flash Prevention

The theme detection script must execute before the page renders to prevent a light-flash on dark-preference visits:

- Inject an inline `<script>` in the `<head>` (before any CSS or body content)
- This script reads localStorage and applies the class synchronously
- No async operations allowed in this script

## Manual Toggle

- Toggle button in site header
- Clicking toggle: flip current theme (`light` → `dark` or `dark` → `light`)
- After toggle: write new preference to `localStorage`
- Update `<html>` class immediately
- Toggle button renders appropriate icon for current state (sun for light, moon for dark)

## Persistence

- Storage key: `rootspec-theme`
- Storage mechanism: `localStorage`
- Stored value: `"light"` or `"dark"` (string)
- Cleared when: never (user must manually toggle back)

## CSS Class Contract

The theme system exposes exactly one class on `<html>`:

| Theme | Class on `<html>` |
|-------|-------------------|
| Dark | `dark` |
| Light | `light` (or no class, if light is default) |

All visual systems consume this class via CSS selectors (`.dark body { ... }`). This is the single point of truth for theme state.

## Transition

- Theme change triggers a CSS transition on `background-color` and `color`
- Transition duration: `[short duration]`
- Transition easing: ease-in-out
- No transition on initial load (prevent flash of transition)
