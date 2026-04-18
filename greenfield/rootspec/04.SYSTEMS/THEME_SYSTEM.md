# Level 4: Theme System

## Responsibility

Manages dark/light mode preference detection, user override, persistence, and transition coordination. Ensures the correct theme is applied before the first render to prevent flash of wrong theme (FOWT).

## Data Ownership

### Theme State
- Values: `light` | `dark`
- Initial source: `prefers-color-scheme` media query
- Override source: `localStorage` key `rootspec-theme`
- Applied as: CSS class on `<html>` element (e.g., `class="dark"`)

### Persistence
- Storage: `localStorage`
- Key: `rootspec-theme`
- Values: `"light"` | `"dark"` | absent (use system preference)
- Written: on user toggle
- Read: on page load before first render

## State Transitions

```
Page Load:
  localStorage has value? → use stored value
  else → read prefers-color-scheme
  → apply class to <html> before body renders (inline script in <head>)

User Toggle:
  current: light → new: dark
  current: dark → new: light
  → update <html> class
  → write to localStorage
  → notify PRESENTATION_SYSTEM for transition duration
```

## Interfaces

- **Provides to LAYOUT_SYSTEM:** Active theme class on root element (passive — CSS cascade handles the rest)
- **Provides to PRESENTATION_SYSTEM:** Signal on theme change (for coordinating transition duration)
- **Reads from:** System `prefers-color-scheme`, `localStorage`

## CSS Custom Properties

Theme defines values for these properties on `:root` / `.dark`:
- Background, foreground, primary, secondary, accent, muted, border, shadow
- All interactive component theming cascades from these root properties

## Constraints

- Theme must be applied before body paint — use inline `<script>` in `<head>` to read localStorage and set class synchronously
- No theme flash allowed on first load
- System preference changes (e.g., OS switching dark/light) update the page only if no manual override is stored
