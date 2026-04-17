# Presentation System

**References:** `01.PHILOSOPHY.md`, `02.TRUTHS.md`, `03.INTERACTIONS.md`, `SYSTEMS_OVERVIEW.md`, `THEME_SYSTEM.md`

---

## Responsibility

Manages all visual polish: scroll-triggered animations, interactive state transitions, and motion behavior. This system owns when and how things move — not what they say or what happens when the user interacts. It responds to signals from other systems and executes visual transitions.

---

## Animation Catalog

### Section Entrance Animations

- **Trigger:** Section enters viewport (IntersectionObserver or equivalent)
- **Behavior:** Fade-in with slight upward motion (from slightly below to final position)
- **Applies to:** All major page sections
- **Once-only:** Each section animates once on first viewport entry; does not repeat on scroll-back

### Interactive State Transitions

| Component | State Change | Transition |
|-----------|-------------|------------|
| Hierarchy Explorer | Level expanded | Content reveals with smooth height animation |
| Hierarchy Explorer | Level collapsed | Content collapses with smooth height animation |
| Hierarchy Explorer | Level hovered/focused | Reference highlights fade in |
| Spec Wizard | Step forward | Current step fades out, next step fades in |
| Spec Wizard | Step back | Reverse transition (next fades out, current fades in) |
| Before/After Comparison | View toggle | Panel crossfade or slide |
| Theme Toggle | Mode switch | Smooth color transition across page |

### Hover States

- Interactive elements (buttons, level cards, links) respond to hover with visual feedback
- Feedback is immediate — no perceptible delay
- Hover states do not cause layout shift

---

## Reduced Motion

All animations must respect `prefers-reduced-motion: reduce`:
- Section entrances: appear immediately without motion
- Transitions: instant switch (no fade, no movement)
- Theme toggle: instant color change
- The feature must work identically with or without motion — no functionality depends on animation

---

## Performance Rules

- Animations use CSS transitions or `transform`/`opacity` (GPU-accelerated properties)
- No layout-triggering properties animated (no `width`, `height` changes directly — use `max-height` or wrapper transforms)
- IntersectionObserver (not scroll events) for entrance triggers
- Transitions complete within [brief duration] — long animations are a distraction, not a feature

---

## Rules

- No animation delays visitor from accessing content — animations are additive, not blocking
- No animation conveys information that isn't available without it (accessibility requirement)
- SVG methodology diagram elements may animate on entrance but must be legible in static state

---

## Interactions with Other Systems

- Receives: animation trigger events from INTERACTIVE_SYSTEM (expand, collapse, step change)
- Receives: `currentMode` from THEME_SYSTEM (to animate theme transitions)
- Responds to: IntersectionObserver signals from page scroll (no dependency on other systems)
