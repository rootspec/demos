# THEME_SYSTEM

**References:** L1 (Philosophy), L2 (Truths), L3 (Interactions), L4 sibling: VIEW_SYSTEM

---

## Responsibility

THEME_SYSTEM owns dark/light mode detection, storage, and application. It detects the user's system preference, allows manual override, and persists the choice so it survives page navigation within the session.

---

## State Owned

- **Current theme** — `'dark'` | `'light'`
- **Preference origin** — whether the current theme came from system preference or user override (used to decide persistence behavior)

---

## Behavior

### Initial Theme Resolution (on mount)

Priority order:
1. If `localStorage` has a stored preference, use it
2. Otherwise, read `window.matchMedia('(prefers-color-scheme: dark)')` and use the result
3. Apply the resolved theme by setting a class on `<html>` (e.g., `dark` or `light`)

### Manual Toggle

- User clicks theme toggle in nav
- THEME_SYSTEM flips current theme
- Stores new preference in `localStorage`
- Updates class on `<html>` immediately

### Theme Application

THEME_SYSTEM exposes the current theme class to VIEW_SYSTEM. VIEW_SYSTEM applies this as a class on the `<html>` or root container element. Tailwind's dark mode variant (`dark:`) is used throughout the component tree to style dark mode states.

---

## Boundaries

**THEME_SYSTEM owns:**
- Svelte store for current theme (`src/lib/stores/theme.ts` or equivalent)
- `localStorage` key for theme preference
- Logic for reading system preference
- Applying class to `<html>` element

**THEME_SYSTEM does NOT own:**
- The visual appearance of dark vs. light mode (that is each component's Tailwind classes)
- The toggle button UI (that lives in VIEW_SYSTEM's nav component)

---

## Interactions with Other Systems

| System | Interaction |
|--------|-------------|
| VIEW_SYSTEM | Provides current theme; VIEW_SYSTEM applies the class and renders the toggle button |
