# L4: Theme System

## Responsibility

Manages dark/light theme state. Detects system preference on first visit, allows manual override via a toggle, and persists the user's choice across sessions using localStorage.

## Boundaries

- Owns: Theme preference state and localStorage read/write for theme
- Does not own: Component styling (that is LAYOUT_SYSTEM's concern), interactive widget state
- Does not call: Any external services

## Data Ownership

| Data | Storage | Notes |
|------|---------|-------|
| Active theme | Runtime state + localStorage key `theme` | Values: `"light"` \| `"dark"` |
| System preference | Read-only from `prefers-color-scheme` media query | Never written, only read on init |

## Key Behaviors

- On first visit (no localStorage value): read `prefers-color-scheme`. Default to `dark` if the query is unavailable.
- On toggle: flip the active theme, write to localStorage, update the root element attribute (`data-theme` or class).
- On subsequent visits: read from localStorage; do not re-query system preference.
- Theme is applied before first paint to prevent flash of incorrect theme (set in `<head>` via inline script).
- Toggle control is always visible in the site header.

## Interactions with Other Systems

- **→ LAYOUT_SYSTEM:** Sets `data-theme` attribute on `<html>` or `<body>`; layout system's CSS responds to this attribute
- **→ INTERACTIVE_SYSTEM:** Interactive components inherit theme via CSS custom properties; no direct coupling required
