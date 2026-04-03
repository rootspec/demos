# Level 4: Accessibility System

## Responsibility

Keyboard navigation, focus management, ARIA attributes, reduced motion support, and screen reader announcements. Ensures the site is usable by everyone regardless of input method or assistive technology.

## Keyboard Navigation

### Global
- Tab moves focus through all interactive elements in document order
- Shift+Tab moves focus backward
- Skip-to-content link as first focusable element

### Hierarchy Explorer
- Tab to the explorer, then arrow keys (Up/Down) to move between levels
- Enter/Space to expand/collapse a level
- Escape to collapse the currently expanded level
- When a level is focused, its reference highlights are shown (same as hover)

### Spec Wizard
- Tab moves between form fields within a step
- Enter on "Next"/"Generate" advances the step
- Shift+Tab returns to previous field
- Escape does not close the wizard (it's inline, not modal)

### Before/After Comparison
- Tab to the toggle
- Enter/Space or Arrow keys to switch views

### Theme Toggle
- Tab to reach it
- Enter/Space to toggle

## Focus Management

- Focus ring visible on all interactive elements (styled, not browser default)
- Focus ring uses sufficient contrast in both light and dark themes
- When a section of the hierarchy explorer expands, focus moves to the expanded content
- When the wizard advances a step, focus moves to the first input of the new step

## ARIA Attributes

| Element | Attributes |
|---------|------------|
| Hierarchy levels | `role="button"`, `aria-expanded`, `aria-controls` |
| Hierarchy container | `role="list"` with `aria-label="Specification hierarchy"` |
| Wizard steps | `role="tablist"` / `role="tabpanel"` pattern |
| Wizard progress | `aria-current="step"` on active step indicator |
| Before/After toggle | `role="radiogroup"` with `role="radio"` options |
| Theme toggle | `role="switch"`, `aria-checked`, `aria-label` |
| Section navigation | `role="navigation"`, `aria-label` per nav region |

## Reduced Motion

- Check `prefers-reduced-motion: reduce` media query
- If enabled: disable all CSS transitions and animations
- Scroll behavior becomes instant (no smooth scroll)
- Section entry animations are suppressed
- Interactive state changes are instant (no fade/slide)

## Screen Reader Announcements

- Live region (`aria-live="polite"`) for dynamic content changes:
  - Hierarchy explorer: announce level name and state when expanded/collapsed
  - Wizard: announce step transitions (e.g., "Choose design pillars")
  - Before/After: announce which view is active
  - Theme: announce new theme ("Switched to dark mode")
