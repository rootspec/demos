# Level 4: Systems Overview
# RootSpec Marketing Site

---

## System Map

| System | Responsibility | Owned Data |
|--------|---------------|------------|
| [CONTENT_SYSTEM](CONTENT_SYSTEM.md) | Static page content, copy, and metadata | Section text, headings, meta tags |
| [THEME_SYSTEM](THEME_SYSTEM.md) | Dark/light theme state and persistence | User theme preference |
| [INTERACTIVE_SYSTEM](INTERACTIVE_SYSTEM.md) | Hierarchy Explorer, Spec Wizard, and Before/After Comparison | Wizard state, active level, comparison panel state |
| [LAYOUT_SYSTEM](LAYOUT_SYSTEM.md) | Responsive layout, section structure, and navigation | Viewport breakpoints, scroll position |
| [PRESENTATION_SYSTEM](PRESENTATION_SYSTEM.md) | Animations, transitions, and visual feedback | Animation state, motion preference |

---

## System Interactions

| From | To | Interaction |
|------|----|-------------|
| THEME_SYSTEM | CONTENT_SYSTEM | Applies CSS custom properties that affect text and background rendering |
| THEME_SYSTEM | PRESENTATION_SYSTEM | Theme changes trigger a transition animation |
| LAYOUT_SYSTEM | INTERACTIVE_SYSTEM | Viewport size determines which interaction variant renders (e.g., stacked vs. side-by-side) |
| LAYOUT_SYSTEM | PRESENTATION_SYSTEM | Scroll position triggers section reveal animations |
| INTERACTIVE_SYSTEM | PRESENTATION_SYSTEM | User actions in interactive sections trigger feedback animations |
| CONTENT_SYSTEM | INTERACTIVE_SYSTEM | Static template data (pillar suggestions, mission templates) feeds the Spec Wizard |

---

## Data Flow

```
User arrives at page
  └─ LAYOUT_SYSTEM reads viewport, initializes scroll observer
  └─ THEME_SYSTEM reads localStorage → system preference → default (dark)
       └─ Applies CSS custom properties to document root

User scrolls
  └─ LAYOUT_SYSTEM fires section-enter events
       └─ PRESENTATION_SYSTEM plays section reveal animations

User opens Hierarchy Explorer
  └─ INTERACTIVE_SYSTEM manages active level state
       └─ PRESENTATION_SYSTEM animates expand/collapse
       └─ CONTENT_SYSTEM provides level example content

User runs Spec Wizard
  └─ INTERACTIVE_SYSTEM manages step state and collected inputs
       └─ CONTENT_SYSTEM provides templates for mission, pillars, interactions
       └─ INTERACTIVE_SYSTEM renders output skeleton from templates + inputs
       └─ PRESENTATION_SYSTEM animates step transitions and output reveal

User toggles Before/After Comparison
  └─ INTERACTIVE_SYSTEM manages active panel state
       └─ PRESENTATION_SYSTEM animates panel focus change
       └─ CONTENT_SYSTEM provides panel content

User toggles theme
  └─ THEME_SYSTEM updates preference in localStorage
       └─ CSS custom properties update on document root
       └─ PRESENTATION_SYSTEM plays theme transition
```

---

## Shared Constraints

- No system makes external network requests at runtime
- All system state is ephemeral (in-memory) except THEME_SYSTEM (localStorage)
- Systems communicate through DOM events and shared CSS custom properties — no shared mutable JS state between systems
- All interactive systems degrade gracefully when JavaScript is unavailable
