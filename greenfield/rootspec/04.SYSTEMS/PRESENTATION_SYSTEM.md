# Level 4: Presentation System

## Responsibility

Owns all animation, transition, and visual feedback behavior. Responds to signals from LAYOUT_SYSTEM (scroll entry) and INTERACTIVE_SYSTEM (state changes). Respects user motion preferences.

## Data Ownership

### Animation Catalog

| Trigger                         | Animation Type         | Applied To                    |
|---------------------------------|------------------------|-------------------------------|
| Section scrolls into view       | Fade + slide up        | Each section container        |
| Hierarchy level expanded        | Height expand + fade   | Level content panel           |
| Hierarchy level hovered         | Highlight              | Level card + reference arrows |
| Theme toggle                    | Crossfade              | Entire page                   |
| Wizard step advance             | Slide left             | Step content area             |
| Wizard output appears           | Fade in                | Output skeleton panel         |
| Before/After toggle (mobile)    | Fade crossfade         | Panel content                 |

### Motion Reduction
- When `prefers-reduced-motion: reduce` is active:
  - All movement-based animations become instant or fade-only
  - Slide animations become instant opacity changes
  - Crossfades are removed (instant switch)
  - Height expansions remain but without easing duration

### Timing Tokens
- Section entry delay: staggered by [N]ms per element
- Level expansion duration: [N]ms
- Theme transition duration: [N]ms
- Wizard step transition duration: [N]ms

## Interfaces

- **Consumes from LAYOUT_SYSTEM:** Scroll intersection events (section entry triggers)
- **Consumes from INTERACTIVE_SYSTEM:** State change events (expand, step advance, panel toggle)
- **Consumes from THEME_SYSTEM:** Theme change signal (for transition timing)
- **Provides:** Visual output only — no data ownership beyond timing tokens

## SVG Diagram

The "RootSpec methodology" diagram is an SVG rendered inline in the How It Works section. It depicts:
- A circular development cycle (spec → code → test → deploy → repeat)
- A surrounding "spec boundary" that filters invalid solutions
- Arrows showing valid solutions passing through the spec gate
- Labels for each of the four skills: `/rs-init`, `/rs-spec`, `/rs-impl`, `/rs-validate`

The SVG is authored directly (not generated from data) and is theme-aware via CSS custom properties.

## Constraints

- No third-party animation libraries required — CSS transitions and Web Animations API are sufficient
- All transitions must complete within [N]ms to prevent perceived sluggishness
- Animation state must not block interactivity (no pointer-events: none during transitions except where intentional)
- SVG diagram must scale correctly at all breakpoints (viewBox-based, not fixed-size)
