# ACCESSIBILITY_SYSTEM

*References: [[01.PHILOSOPHY]] [[02.TRUTHS]] [[03.INTERACTIONS]] [[SYSTEMS_OVERVIEW]]*

## Responsibility

Ensures equal access and usability for all users through keyboard navigation, screen reader support, motion preferences, and inclusive interaction patterns. Provides accessibility foundation for all other systems.

## Boundaries

**Owns**:
- Keyboard navigation implementation and focus management
- ARIA labels, landmarks, and live regions
- Screen reader compatibility patterns
- Motion preference detection and respect
- Color contrast validation and high contrast mode support

**Does Not Own**:
- Visual styling decisions (THEME_SYSTEM)
- Layout structure (LAYOUT_SYSTEM)
- Interactive component logic (INTERACTIVE_SYSTEM)
- Content creation (CONTENT_SYSTEM)

## Data Ownership

**Focus State**: Current focus position, focus trap boundaries, focus restoration points
**User Preferences**: Motion sensitivity settings, high contrast mode, screen reader detection
**Navigation Patterns**: Keyboard shortcuts, tab order specifications, skip link targets
**Announcement Queue**: Screen reader announcements for dynamic content changes

## Interactions with Other Systems

**→ INTERACTIVE_SYSTEM**: Provides keyboard event handlers, focus management coordination, ARIA state updates
**→ THEME_SYSTEM**: Supplies focus indicator requirements, high contrast specifications, motion preference data
**→ LAYOUT_SYSTEM**: Defines minimum touch target sizes, readable line length requirements
**→ CONTENT_SYSTEM**: Provides ARIA label patterns, semantic markup requirements

## Implementation Patterns

**Progressive Enhancement**: Semantic HTML foundation with ARIA enhancements where beneficial
**Focus Management**: Proper tab order, focus traps for modal content, focus restoration after interactions
**Keyboard Navigation**: Standard navigation patterns (Tab, Enter, Space, Arrow keys) with custom enhancements
**Screen Reader Support**: Logical heading hierarchy, descriptive link text, live region updates
**Motion Respect**: Automatic detection of `prefers-reduced-motion`, animation disable functionality

## ARIA Patterns

**Hierarchy Explorer**: 
- `role="tablist"` for level selector
- `role="tabpanel"` for expanded content
- `aria-expanded` for expansion state
- `aria-controls` for panel relationships

**Spec Wizard**:
- `role="progressbar"` for step indication
- `aria-live="polite"` for step transitions
- `aria-describedby` for help text
- `aria-invalid` for validation errors

**Comparison Toggle**:
- `role="tablist"` for before/after switcher
- `aria-selected` for active panel
- `aria-labelledby` for panel identification

## Keyboard Interaction Specifications

**Global Navigation**: Tab order respects logical reading flow, skip links for main content
**Explorer Component**: Arrow keys for level navigation, Enter/Space for expansion, Escape for reset
**Wizard Component**: Tab for field navigation, Enter for progression, Escape for exit
**Theme Toggle**: Space or Enter for activation, automatic announcement of new state

## Motion and Animation Guidelines

**Reduced Motion**: Disable animations when `prefers-reduced-motion: reduce` is detected
**Essential Motion**: Maintain functional transitions (focus indicators, state changes) even with reduced motion
**Animation Timing**: Respect user attention and processing speed, avoid flashing or rapid changes
**Motion Controls**: Provide manual animation disable for additional user control