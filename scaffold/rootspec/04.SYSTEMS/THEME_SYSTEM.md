# THEME_SYSTEM

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md

---

## Responsibility

Owns dark/light theme detection and switching. Reads system preference on first load, allows user override via toggle, and persists preference to localStorage.

---

## State Owned

| State | Type | Source | Description |
|-------|------|--------|-------------|
| theme | "light" or "dark" | Derived | Current active theme |
| userPreference | "light" or "dark" or null | localStorage | Manually set preference; null means use system |
| systemPreference | "light" or "dark" | `prefers-color-scheme` | OS/browser preference |

---

## Rules

### Theme Resolution

Priority order (highest first):
1. `userPreference` (from localStorage) — if set, use it
2. `systemPreference` (from `prefers-color-scheme` media query)
3. Default: `"light"`

### Applying Theme

- Active theme is applied as a class on the `<html>` or `<body>` element: `class="dark"` or `class="light"`
- Tailwind CSS `darkMode: 'class'` strategy is used for all dark-mode styling

### Toggle Behavior

- User clicks theme toggle button in VIEW_SYSTEM nav bar
- `userPreference` flips between "light" and "dark"
- New preference is written to localStorage under key `"theme"`
- Theme class on root element updates immediately

### Initial Load

- Read `localStorage.getItem("theme")` on mount
- If present, set as `userPreference`
- If absent, read `window.matchMedia("(prefers-color-scheme: dark)").matches`
- Apply resolved theme before first paint (to avoid flash)

---

## Interactions with Other Systems

- VIEW_SYSTEM renders the toggle button and calls THEME_SYSTEM's toggle function
- VIEW_SYSTEM applies the theme class from THEME_SYSTEM to the root layout element
- No other system depends on THEME_SYSTEM

---

## Rendered Elements

- Theme toggle button (owned by VIEW_SYSTEM, triggers THEME_SYSTEM logic)
- Theme class on root element (applied by THEME_SYSTEM, consumed by all component styles)
