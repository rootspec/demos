# Level 4: Theme System

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md

---

## Responsibility

Owns dark/light mode detection, the theme toggle interaction, and preference persistence. Provides the active theme to all other systems via a root CSS class.

---

## State

| State Key        | Type             | Values              | Persistence     |
|------------------|------------------|---------------------|-----------------|
| activeTheme      | enum             | `dark`, `light`     | localStorage    |
| systemPreference | enum             | `dark`, `light`     | None (API)      |

**Resolution order:**
1. If localStorage has a saved preference → use it
2. Else if `prefers-color-scheme` media query returns `dark` → use `dark`
3. Else → use `light`

---

## Data Owned

- `activeTheme` — current theme in effect
- localStorage key: `rootspec-theme`

---

## Behavior

### Initial Load

The active theme class must be applied to the `<html>` element before the browser paints. This prevents a flash of incorrect theme (FOUC). The theme resolution script runs inline in the `<head>` — it is synchronous and cannot be deferred.

### Toggle

When the user activates the theme toggle:
1. `activeTheme` flips (dark → light or light → dark)
2. Root `<html>` class is updated immediately
3. New value is written to localStorage
4. All color transitions use a CSS `transition` on `background-color` and `color` — no class-swap flash

### CSS Strategy

Tailwind CSS `darkMode: 'class'` strategy. The `dark` class on the `<html>` element activates all dark-mode variants. All components use Tailwind's `dark:` prefix for dark-mode styles.

---

## Interfaces

- **Exports to LAYOUT_SYSTEM:** Active theme class applied to root element (read via CSS cascade)
- **Exports to INTERACTIVE_SYSTEM:** Theme state available to interactive components for consistent styling

---

## Rules

- Theme preference must be applied before first paint (no FOUC)
- Only THEME_SYSTEM may write to `localStorage` key `rootspec-theme`
- System preference is always read fresh on load — never cached
- The toggle must be keyboard accessible (focusable, operable with Enter/Space)
- Transitions must be smooth — no hard cuts when switching themes
