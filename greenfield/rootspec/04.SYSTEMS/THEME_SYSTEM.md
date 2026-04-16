# Theme System

**Version:** 7.3.2
**Status:** Draft

---

## Responsibility

Detects the user's system color scheme preference, applies the appropriate theme (dark or light) to the page root, and manages the manual toggle that allows users to override the system preference.

## Boundaries

- **Owns:** Current theme state (dark/light), persistence of user preference
- **Does not own:** Visual design tokens (defined in stylesheet), component-level styles
- **Exposes:** Theme class on root element (e.g., `<html class="dark">` or `<html class="light">`)

## Data Owned

| Data | Source | Mutability | Persistence |
|------|--------|------------|-------------|
| Active theme | System preference or user override | Mutable | localStorage (if available) |
| User has overridden | Toggle interaction | Mutable | localStorage (if available) |

## State Transitions

```
Page Load
    │
    ▼
Read localStorage preference
    │
    ├── preference found ──► apply stored theme
    │
    └── no preference ──► read prefers-color-scheme
            │
            ├── dark ──► apply dark theme
            ├── light ──► apply light theme
            └── unavailable ──► apply dark theme (default)

User clicks toggle
    │
    ▼
Flip current theme ──► update localStorage ──► update root class
```

## Rules

- Theme is applied before first paint to prevent flash of wrong theme
- Default theme (when no preference is available) is dark mode
- The toggle button's accessible label must reflect the current state ("Switch to light mode" / "Switch to dark mode")
- System preference changes (e.g., OS setting change mid-session) are respected unless user has manually overridden

## Interactions with Other Systems

- **CONTENT_SYSTEM:** Receives theme class; all content styles are theme-aware via CSS
- **INTERACTIVE_SYSTEM:** Interactive components inherit theme through CSS; no JavaScript theme wiring required in components
- **PRESENTATION_SYSTEM:** Theme transitions are animated by PRESENTATION_SYSTEM; THEME_SYSTEM only manages state
