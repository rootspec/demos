# System: THEME_SYSTEM
<!-- L4: References L1-3 + Sibling L4 + External -->

## Responsibility

Detects the user's color scheme preference, manages the active theme state (light or dark), and persists the user's explicit choice across sessions via localStorage. Applies the theme by toggling the `dark` class on the document root.

## State Owned

Lives in `src/lib/stores/theme.svelte.ts`:

| State | Type | Description |
|-------|------|-------------|
| `theme.current` | `'light' \| 'dark'` | Active theme value |

## Initialization Logic

On first load (browser only):
1. Read `localStorage.getItem('rootfeed-theme')`
2. If stored value is `'light'` or `'dark'`, use it
3. Otherwise, detect `window.matchMedia('(prefers-color-scheme: dark)')` and use the result

## Behaviors

### Theme Toggle
`toggleTheme()` flips `theme.current` between `'light'` and `'dark'`, writes the new value to localStorage, and toggles the `dark` class on `document.documentElement`.

### Theme Initialization
`initTheme()` applies the current theme class to `document.documentElement` on layout mount. This prevents flash of wrong theme on navigation.

### Persistence
The user's explicit choice is stored in localStorage under the key `rootfeed-theme`. It survives page reloads and new sessions. System preference is only used as a fallback when no stored value exists.

## Integration with VIEW_SYSTEM

The layout (`+layout.svelte`) calls `initTheme()` on mount and renders a toggle button in the navigation bar that calls `toggleTheme()`. All Tailwind dark mode classes (`dark:bg-gray-900`, etc.) respond to the `dark` class on `<html>`.

## Boundaries

**Does not:**
- Depend on any data or content system
- Handle any social interactions
- Manage any route-level state

**Used by:**
- VIEW_SYSTEM: layout and navigation toggle control

## Key Files

- `src/lib/stores/theme.svelte.ts` — ThemeState and toggle/init functions
- `src/routes/+layout.svelte` — Calls `initTheme()`, renders toggle button
