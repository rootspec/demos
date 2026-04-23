# Level 4: Theme System

## Responsibility

Manages light/dark mode preference. Detects system preference on first visit, persists user override in localStorage, and exposes the active theme to PRESENTATION_SYSTEM via a CSS class or data attribute on the root element.

## Boundaries

- Owns: theme state, localStorage read/write for theme preference, system preference detection
- Does not own: CSS variables/tokens (PRESENTATION_SYSTEM), content (CONTENT_SYSTEM), layout (LAYOUT_SYSTEM)
- Single source of truth for active theme; no other system writes theme to localStorage

## Data

### Theme State
- **type:** 'light' | 'dark'
- **default:** system preference (`prefers-color-scheme`) on first visit; 'light' if system preference is unavailable
- **persisted in:** `localStorage` key `rootspec-theme`

### Theme Attribute
Applied to `<html>` element as `data-theme="light"` or `data-theme="dark"`. PRESENTATION_SYSTEM uses this attribute to select the correct CSS custom property set.

## State Transitions

**Initial load:**
1. Read `localStorage` for saved preference
2. If found: apply saved preference immediately (before paint, to prevent flash)
3. If not found: read `prefers-color-scheme` media query
4. If neither: default to 'light'
5. Apply `data-theme` attribute to `<html>`

**User toggle:**
1. User clicks theme toggle button
2. Toggle active theme: 'light' → 'dark' or 'dark' → 'light'
3. Write new preference to `localStorage`
4. Update `data-theme` attribute on `<html>`
5. PRESENTATION_SYSTEM CSS transitions apply

**System preference change (optional):**
If user has not manually overridden, system preference changes are reflected immediately. If user has manually overridden, system preference changes are ignored.

## Rules

- Theme is applied before first paint to prevent flash of incorrect theme
- Toggle button icon reflects current mode (sun icon for light mode, moon icon for dark mode — or equivalent)
- The toggle is accessible: `aria-label` updates to reflect current state and action ("Switch to dark mode" / "Switch to light mode")
- `prefers-reduced-motion` is respected by PRESENTATION_SYSTEM independently; THEME_SYSTEM does not need to handle it

## Interaction with Other Systems

- **Provides to PRESENTATION_SYSTEM:** `data-theme` attribute on `<html>`; PRESENTATION_SYSTEM's CSS custom properties respond to this attribute
- **Receives from LAYOUT_SYSTEM:** Location of toggle button in header (LAYOUT_SYSTEM places the button; THEME_SYSTEM wires its behavior)
