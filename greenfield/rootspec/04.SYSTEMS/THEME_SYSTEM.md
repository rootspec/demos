# Level 4: Theme System

## Responsibility

Manages the light/dark mode preference for the site. Detects system preference on load, persists manual overrides, and provides the current theme state to PRESENTATION_SYSTEM.

## Data Ownership

- **Current theme:** Enum value: `light` | `dark`
- **Preference source:** `user-override` | `system-preference` | `default`
- **Persisted preference:** Stored in `localStorage` under a stable key

## State Transitions

```
Initial load
  └─→ Check localStorage
        ├─→ Found: apply stored preference (source = user-override)
        └─→ Not found: check prefers-color-scheme media query
              ├─→ dark: apply dark (source = system-preference)
              └─→ else: apply light (source = default or system-preference)

User clicks theme toggle
  └─→ Flip current theme
        └─→ Write new preference to localStorage
              └─→ Notify PRESENTATION_SYSTEM
```

## Key Rules

- **No flash of wrong theme.** Theme must be applied before first paint. The detection and application script runs inline in `<head>`, not deferred.
- **Light is the default.** If no system preference and no stored preference, the site renders in light mode.
- **Manual override persists across sessions.** Once a user toggles, their choice is respected on return visits.
- **No animation on theme switch.** Transitioning between light and dark applies instantly — no CSS transition on the color swap — to avoid jarring color shifts.

## Interactions with Other Systems

- Provides current theme value to PRESENTATION_SYSTEM (via CSS class on `<html>` or `data-theme` attribute)
- Receives toggle events from LAYOUT_SYSTEM (the toggle control lives in the header)

## Attributes

| Attribute | Type | Values |
|-----------|------|--------|
| currentTheme | enum | `light`, `dark` |
| preferenceSource | enum | `user-override`, `system-preference`, `default` |
