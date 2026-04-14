# Theme System

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md

---

## Responsibility

The Theme System manages the user's light/dark preference. It handles initial theme detection (from localStorage or system preference), applies the CSS class to the document root, persists the preference across page reloads, and exposes a toggle function to the VIEW SYSTEM.

## Boundaries

- **Owns:** `src/lib/stores/theme.svelte.ts`
- **Reads from:** `localStorage` (key: `rootfeed-theme`), `window.matchMedia('(prefers-color-scheme: dark)')`
- **Does not own:** Any visual styles (those are Tailwind `dark:` variants in VIEW SYSTEM), routing, or content

## State

| State | Type | Default | Description |
|---|---|---|---|
| `theme.current` | `'light' \| 'dark'` | Detected from localStorage or system | Active theme preference |

## Operations

### `getInitialTheme()` (internal, runs on module load)
1. If `localStorage['rootfeed-theme']` is `'dark'` or `'light'` → use that
2. Else if `window.matchMedia('(prefers-color-scheme: dark)').matches` → use `'dark'`
3. Else → use `'light'`
- Runs only in browser (guarded by `browser` from `$app/environment`)

### `initTheme()` (called in layout `onMount`)
- Applies `dark` class to `document.documentElement` based on current theme
- Ensures correct initial class without a flash of wrong theme

### `toggleTheme()` (called by theme toggle button in nav)
- Flips `theme.current` between `'light'` and `'dark'`
- Updates `document.documentElement.classList`
- Persists new value to `localStorage['rootfeed-theme']`

## Interactions with Other Systems

| System | Interaction |
|---|---|
| VIEW SYSTEM | Reads `theme.current` to show current state in toggle button; calls `toggleTheme()` on button click; calls `initTheme()` in layout `onMount` |

## Constraints

- Must be SSR-safe: all browser API access guarded by `browser` check
- All visual theming is done via Tailwind `dark:` class variants — THEME SYSTEM only manages the `dark` class on the root element
- Preference key in localStorage: `rootfeed-theme`
