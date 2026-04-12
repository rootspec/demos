# Level 4: Theme System
# RootSpec Marketing Site

## Responsibility

The Theme System manages the visual mode state (dark or light) across the entire page. It detects initial preference from the operating system, allows manual override via toggle, and persists the user's choice within the session and across refreshes.

## Data Owned

| Key | Type | Source | Persistence |
|-----|------|--------|-------------|
| `theme` | enum: `dark` \| `light` | OS detection or user toggle | `localStorage` |
| `system-preference` | enum: `dark` \| `light` | `window.matchMedia('prefers-color-scheme: dark')` | Not persisted — re-evaluated on each load |

## State Model

### Initial Load Sequence
1. Read `localStorage.theme`
2. If present: apply that theme
3. If absent: read `window.matchMedia('prefers-color-scheme: dark')`
4. Apply detected theme to root element
5. Render toggle control in matching state

### Toggle Interaction
1. User activates toggle (click or keyboard)
2. Current theme flips: `dark` → `light` or `light` → `dark`
3. Root element attribute updated immediately
4. New theme written to `localStorage`
5. Toggle control visual state updates to reflect new mode

### Boundaries
- Theme is applied as a root-level attribute (`data-theme` on `<html>` or equivalent)
- All CSS color tokens respond to the root attribute — no component-level theme logic
- THEME_SYSTEM owns only the attribute and localStorage key; LAYOUT_SYSTEM owns CSS tokens
- System preference changes (e.g., OS switches to dark mode while page is open) update the displayed theme only if the user has not set a manual override

## Interactions With Other Systems

| System | Interaction |
|--------|-------------|
| LAYOUT_SYSTEM | Reads root theme attribute; all color/surface CSS tokens are theme-scoped |
| INTERACTIVE_SYSTEM | Interactive component styles must also respond to root theme attribute; no component-level overrides |

## Rules

- Theme applies to all visual elements simultaneously; no mixed-mode regions
- Toggle is always visible and reachable by keyboard
- Theme change must be instantaneous — no fade or delay on the root color transition beyond [short duration]
- The system does not read or write any other localStorage keys
