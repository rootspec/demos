# Level 4: Theme System
<!-- L4: HOW it's built — References L1-3 + Sibling L4 + External only -->

## Responsibility

The Theme System owns dark/light mode detection, user preference persistence, and the mechanism for switching themes. It determines the active theme context that PRESENTATION_SYSTEM uses to render visual output.

---

## State Owned

- `activeTheme` — "dark" or "light"
- `source` — how the active theme was determined: "system" or "user"

---

## Detection and Initialization

On page load:

1. Check localStorage for a stored user preference
2. If found: apply that theme immediately
3. If not found: read `prefers-color-scheme` media query and apply matching theme
4. If neither is available: default to dark theme

The theme is applied by setting a class on the root `<html>` element before first render to prevent flash of incorrect theme.

---

## Persistence

When the user manually toggles the theme:
- Update `activeTheme` and `source`
- Write preference to localStorage
- Apply class change to root element immediately

---

## System Detection Reactivity

If the user has not manually set a preference (`source === "system"`), the system responds to changes in `prefers-color-scheme` during the session and updates the theme accordingly.

If the user has manually set a preference (`source === "user"`), system changes are ignored until the user resets preference (not a required feature — manual toggle is sufficient).

---

## Interface with Other Systems

- Provides `activeTheme` class to the root element; PRESENTATION_SYSTEM reads this to apply correct token set
- Receives toggle action from INTERACTIVE_SYSTEM (the theme toggle button)
- Does not own any visual tokens — only the active state
