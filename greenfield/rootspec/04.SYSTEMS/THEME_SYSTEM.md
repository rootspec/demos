# Level 4: Theme System

References: [L1: Foundational Philosophy], [L2: Stable Truths], [L3: Interaction Architecture], [L4: SYSTEMS_OVERVIEW]

## Responsibility

Owns dark/light theme detection, user override, and persistence. Determines which token set from PRESENTATION_SYSTEM is currently active. Is the single source of truth for theme state — no other system stores or decides the current theme.

## State

- **Resolved theme:** `dark` or `light` — the currently active theme applied to the page
- **Source:** `system` (from OS/browser preference) or `user` (manual override)
- **Stored preference:** User override persisted in `localStorage` so preference survives page reload

## Behavior

### Initial Load
1. Check `localStorage` for a stored user preference
2. If found, apply that preference as the resolved theme
3. If not found, read `prefers-color-scheme` media query and apply system preference
4. Apply resolved theme to the page root element before first paint (to prevent flash of wrong theme)

### User Toggle
1. User clicks theme toggle control (rendered by LAYOUT_SYSTEM)
2. THEME_SYSTEM inverts the current resolved theme (`dark` → `light` or `light` → `dark`)
3. Writes new preference to `localStorage`
4. Updates page root element class/attribute
5. PRESENTATION_SYSTEM token set switches immediately via CSS variable cascade

### System Preference Change
- If the user has not set a manual override, THEME_SYSTEM listens to `prefers-color-scheme` changes and updates the resolved theme reactively
- If the user has set a manual override, system preference changes are ignored until the user resets their preference

## Data Ownership

- Resolved theme (runtime state: `dark` | `light`)
- Source of resolved theme (`system` | `user`)
- `localStorage` key for theme preference (owned by this system exclusively)

## Boundaries

- THEME_SYSTEM does not define token values — those belong to PRESENTATION_SYSTEM
- THEME_SYSTEM does not render the toggle UI — LAYOUT_SYSTEM renders it and calls into THEME_SYSTEM on click
- THEME_SYSTEM does not manage any other user preferences or persistent state
- The theme toggle is always accessible: keyboard-operable and announced to screen readers
