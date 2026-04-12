# L4: Interactive System

## Responsibility

Owns all runtime interactive state and behavior for the three interactive features: the Hierarchy Explorer, the Spec Your Idea Wizard, and the Before/After Comparison. Runs entirely client-side with no external dependencies.

## Boundaries

- Owns: All mutable runtime state for interactive widgets
- Does not own: Theme state, static content, layout structure
- Does not call: Any external APIs or services
- Produces: No persistent data — all state resets on page reload

## Data Ownership

### Hierarchy Explorer State
| Data | Type | Notes |
|------|------|-------|
| Expanded level | `null \| 1 \| 2 \| 3 \| 4 \| 5` | Only one level expanded at a time |
| Hovered level | `null \| 1 \| 2 \| 3 \| 4 \| 5` | For reference highlighting |
| Level definitions | Static array | Level names, descriptions, example content |

### Spec Wizard State
| Data | Type | Notes |
|------|------|-------|
| Current step | `1 \| 2 \| 3 \| "output"` | Step through the wizard |
| Product idea | String (max 200 chars) | Free text |
| Selected mission | String | From templates or free-write |
| Selected pillars | String[] (3–5 items) | From suggestions or free-write |
| Key interaction | String | Free text |

### Before/After State
| Data | Type | Notes |
|------|------|-------|
| Mode | `"toggle" \| "slider"` | Primary mode; slider is secondary |
| Active panel | `"before" \| "after"` | For toggle mode |
| Slider position | Number (0–100) | For slider mode; defaults to 50 |

## Key Behaviors

### Hierarchy Explorer
- Clicking an expanded level collapses it (toggle)
- Clicking a different level collapses the current and expands the new one
- Arrow direction indicators show which levels a given level can reference (upward only)
- On mobile: falls back to accordion layout if visualization doesn't fit viewport width
- Keyboard: Arrow keys navigate, Enter/Space expand/collapse, Escape collapses all

### Spec Wizard
- Next button is disabled until minimum required input is present for each step
- Step 2 enforces selection of 3–5 pillars (Next disabled outside this range)
- Output panel renders a formatted skeleton spec using the user's inputs as template values
- "Start over" resets all state without page reload
- Keyboard: Tab between fields, Enter advances step 3 to output, Escape resets

### Before/After Comparison
- Toggle mode: one panel visible at a time with a labeled switch
- Slider mode: both panels visible, divided by a draggable handle
- On mobile: toggle mode is the default; slider is hidden or disabled below a breakpoint

## Interactions with Other Systems

- **← THEME_SYSTEM:** Inherits active theme via CSS custom properties — no direct coupling
- **→ LAYOUT_SYSTEM:** Widget expansion/collapse causes reflow; layout handles gracefully via responsive CSS
