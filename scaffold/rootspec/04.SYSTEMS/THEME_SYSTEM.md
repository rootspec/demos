# Level 4: Theme System

**References:** L1 Philosophy, L2 Truths, L3 Interactions, SYSTEMS_OVERVIEW.md

---

## Responsibility

Owns dark/light theme detection, manual toggle, and persistence. Ensures the correct theme is applied before the first paint (no flash). Stores preference in localStorage so it survives page reloads.

---

## State

| Property         | Type              | Description                                                   |
|-----------------|-------------------|---------------------------------------------------------------|
| `theme.current`  | 'light' \| 'dark' | Currently active theme                                        |

Exposed as a reactive Svelte `$state` object from `src/lib/stores/theme.svelte.ts`.

---

## Initialization Logic

On load (before first render):
1. Check `localStorage` for `rootfeed-theme` key
2. If `'light'` or `'dark'` found → use stored value
3. If not found → check `window.matchMedia('(prefers-color-scheme: dark)')`
4. Apply result as initial theme value

On `initTheme()` call (in layout `onMount`):
- Apply or remove `class="dark"` on `document.documentElement`
- This triggers Tailwind's dark mode class-based styles

---

## Toggle Behavior

When `toggleTheme()` is called:
1. `theme.current` flips between `'light'` and `'dark'`
2. `document.documentElement.classList` is updated immediately
3. New value is written to `localStorage` as `rootfeed-theme`

---

## CSS Integration

Theme uses Tailwind CSS's `class` dark mode strategy:
- Dark mode styles use the `dark:` variant prefix
- Activated by the `dark` class on `<html>`
- No CSS variables required — Tailwind handles the color switching

---

## Boundaries

- **Reads from:** `localStorage`, `window.matchMedia`
- **Writes to:** `localStorage`, `document.documentElement.classList`
- **Provides to:** VIEW_SYSTEM (toggle button in nav, initial theme application)
- **Does not:** affect any data or interaction state
