# Level 4: Presentation System
# RootSpec Marketing Site

---

## Responsibility

The Presentation System owns all animations, transitions, and visual feedback on the site. It ensures that motion is purposeful, accessible, and consistently applied across all sections and interactive elements.

---

## Boundaries

**Owns:**
- Section reveal animations (scroll-triggered)
- Theme transition animation
- Interactive element feedback animations (expand/collapse in Hierarchy Explorer, step transitions in Wizard, panel focus change in Comparison)
- Hover and focus state visual feedback
- Reduced-motion handling

**Does not own:**
- Visual design tokens (colors, typography, spacing) — defined in CSS
- Layout structure — owned by Layout System
- Theme state — owned by Theme System
- Interactive state logic — owned by Interactive System

---

## Animation Categories

### Section Reveal
- Trigger: Section enters the viewport (observed by Layout System)
- Behavior: Section fades in and slides up from a slight vertical offset
- Duration: [short duration]
- Applies to: All non-header sections

### Theme Transition
- Trigger: User toggles theme
- Behavior: Smooth color crossfade across the page
- Duration: [very short duration]
- Note: Applied via CSS transition on custom properties; not a JS animation

### Interactive Element Feedback

**Hierarchy Explorer: Expand/Collapse**
- Trigger: Level clicked or keyboard-activated
- Behavior: Content area height animates from collapsed to full height
- Duration: [short duration]

**Hierarchy Explorer: Reference Highlight**
- Trigger: Level hovered or focused
- Behavior: Reference arrows and referenced level cards brighten; non-referenced cards dim
- Duration: [very short duration] (near-instant)

**Spec Wizard: Step Transition**
- Trigger: User advances to next step
- Behavior: Current step slides out; next step slides in from the same direction
- Duration: [short duration]

**Spec Wizard: Output Reveal**
- Trigger: Wizard reaches completion
- Behavior: Output skeleton fades in and expands
- Duration: [short duration]

**Before/After Comparison: Panel Focus**
- Trigger: User toggles active panel
- Behavior: Active panel brightens; inactive panel dims
- Duration: [very short duration]

---

## Reduced Motion

All animations respect the `prefers-reduced-motion: reduce` media query:
- Section reveals: instant display (no fade/slide)
- Theme transition: instant color change (no crossfade)
- Interactive feedback: instant show/hide (no duration)
- No animation is required for functionality — all state changes are reflected immediately when motion is reduced

---

## Rules

- No animation blocks content access — animations are additive, never gating
- All durations are defined as CSS custom properties or fine-tuning parameters (no hardcoded values in JavaScript)
- Hover animations require no JavaScript — CSS handles hover states
- Focus states must be visually distinct from hover states for keyboard users
- No infinite looping animations on the page — motion stops when the user has received the feedback
