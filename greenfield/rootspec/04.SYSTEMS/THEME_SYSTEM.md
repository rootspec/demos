# Level 4: Theme System

## Responsibility

Dark/light theme management, CSS custom property resolution, system preference detection, and user override persistence.

## State

```
theme_state:
  current_theme: "light" | "dark"
  source: "system" | "user"
  system_preference: "light" | "dark"
```

## Behavior

### Initialization

1. Check localStorage for saved user preference
2. If found → apply saved theme, set `source: "user"`
3. If not found → read `prefers-color-scheme` media query, set `source: "system"`
4. Apply theme class to document root (`data-theme="light"` or `data-theme="dark"`)

### Toggle

1. Switch `current_theme` to opposite value
2. Set `source: "user"`
3. Save preference to localStorage
4. Update document root `data-theme` attribute
5. Transition smoothly (CSS transition on background/color properties)

### System Preference Change

- Listen for `prefers-color-scheme` media query changes
- If `source` is `"system"`, update theme to match
- If `source` is `"user"`, ignore system changes (user override takes precedence)

## CSS Custom Properties

The theme system defines CSS custom properties on `:root` that all other systems consume:

```
Categories:
  - Background colors (page, surface, elevated)
  - Text colors (primary, secondary, muted)
  - Accent colors (primary, hover, active)
  - Border colors
  - Shadow definitions
  - Code block colors (syntax highlighting)
```

All components reference these variables — no hardcoded colors anywhere in the codebase.

## Toggle UI

- Always visible in the header
- Icon reflects current state (sun/moon or similar)
- Accessible: `aria-label` describes current state and action ("Switch to dark mode")
- Keyboard: activates on Enter/Space

## Fallback

If JavaScript fails, the site renders in a default theme (light) using CSS-only `prefers-color-scheme` media queries as fallback.
