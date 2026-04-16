# Presentation System

**Version:** 7.3.2
**Status:** Draft

---

## Responsibility

Owns all animation, motion, accessibility enforcement, and keyboard navigation behavior. Translates state changes from other systems into visual transitions. Ensures all interactive elements meet accessibility requirements.

## Boundaries

- **Owns:** Animation timing, motion curves, keyboard event handling for interactive components, focus management, ARIA state management
- **Does not own:** Interaction state (INTERACTIVE_SYSTEM), theme state (THEME_SYSTEM), layout grid (LAYOUT_SYSTEM), content copy (CONTENT_SYSTEM)

## Data Owned

| Data | Type | Default |
|------|------|---------|
| Scroll position (observed) | integer | 0 |
| Sections in view | boolean map | all false |
| Reduced motion preference | boolean | from OS |
| Currently focused interactive element | reference or null | null |

## Animation Catalog

| Animation | Trigger | Behavior |
|-----------|---------|---------|
| Section entry | Section scrolls into view | Fade up from [slight offset]; duration [brief] |
| Hierarchy level expand | Level card activated | Height expand, content fade in; duration [brief] |
| Hierarchy arrow highlight | Level active or hovered | Arrow color/weight transition; duration [very brief] |
| Wizard step transition | Step advance or back | Slide out old step, slide in new step; duration [brief] |
| Comparison panel switch | Toggle activated | Cross-fade between panels; duration [brief] |
| Theme toggle | Theme state changes | Background/text color transition; duration [brief] |

## Reduced Motion

When `prefers-reduced-motion: reduce` is detected:
- All transitions replace motion with instant or opacity-only transitions
- No sliding, expanding, or positional animations
- Fade-in/out replaces all directional motion
- PRESENTATION_SYSTEM reads this preference at page load; does not re-check mid-session

## Keyboard Navigation

### Hierarchy Explorer
- Tab / Shift-Tab: move between level cards
- Enter or Space: activate (expand) focused card
- Escape: collapse currently expanded card, return focus to card header
- Arrow keys (optional enhancement): move between adjacent levels

### Spec Wizard
- Tab / Shift-Tab: move through form elements within active step
- Enter: advance to next step (when focused on primary action button)
- Escape: no action (wizard has no dismiss behavior)
- Multi-select pillars: Space to toggle selection on focused pillar

### Before/After Comparison
- Tab: reach toggle control
- Enter or Space: switch active panel
- Arrow keys (optional): switch panel if toggle is a slider

## Focus Management

- When a wizard step transitions, focus moves to the first interactive element of the new step
- When a hierarchy level card expands, focus remains on the card header (not the expanded content)
- Modal or overlay patterns are not used; no focus trap needed
- Visible focus indicator is always present (never removed via `outline: none` without replacement)

## ARIA State

| Component | ARIA Pattern |
|-----------|-------------|
| Hierarchy level cards | `role="button"`, `aria-expanded` |
| Wizard steps | `role="group"`, `aria-label` with step title; step indicator is `aria-live="polite"` |
| Theme toggle | `role="button"`, `aria-label` describes action (not current state) |
| Comparison toggle | `role="tab"` with `aria-selected` |

## Rules

- Animations must never block interaction — no "wait for animation to finish" gates
- Reduced motion preference is always respected; there is no override
- All interactive elements have visible focus indicators meeting WCAG AA contrast
- Touch targets meet minimum size requirements (no specific pixel values at this level)
- PRESENTATION_SYSTEM does not make decisions about what content to show — only how to show it

## Interactions with Other Systems

- **INTERACTIVE_SYSTEM:** Listens for state changes; plays corresponding animations
- **LAYOUT_SYSTEM:** Listens for scroll position; triggers section entry animations
- **THEME_SYSTEM:** Theme transitions are animated by this system; state is owned by THEME_SYSTEM
- **CONTENT_SYSTEM:** No direct interaction; content renders and PRESENTATION_SYSTEM handles scroll-triggered effects
