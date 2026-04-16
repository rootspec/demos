# System: Presentation System

> References: L1 (01.PHILOSOPHY.md), L2 (02.TRUTHS.md), L3 (03.INTERACTIONS.md)
> Interacts with: CONTENT_SYSTEM, INTERACTIVE_SYSTEM, LAYOUT_SYSTEM

## Responsibility

Owns visual motion, transitions, and polish tokens. Defines animation durations, easing curves, and scroll-triggered entrance animations. Provides the RootSpec methodology diagram (SVG).

## Animation Scope

- **Section entrance** — Fade-in + slight upward translate on scroll into view (Intersection Observer)
- **Interactive transitions** — Hierarchy Explorer expand/collapse, Wizard step slide, theme toggle
- **Hover states** — Subtle scale or color shifts on interactive elements
- **Diagram** — SVG showing spec surrounding the development cycle; static but potentially animated on hover

## RootSpec Methodology Diagram

An SVG diagram illustrating the spec as a validation gate around the development cycle:
- Outer ring: "Spec" (L1–L5 labeled)
- Inner cycle: Dev → Implement → Validate → loop
- Gate: Arrow from outer ring showing "only valid solutions pass through"
- Style: Consistent with site color palette via CSS variables

## Tokens (values defined in fine-tuning)

- `--animation-duration-fast` — Used for hover states
- `--animation-duration-standard` — Used for section entrances and interactive transitions
- `--animation-easing` — Easing curve for all transitions
- `--animation-delay-stagger` — Stagger delay between successive entrance animations

## Boundaries

- Does NOT own component structure (CONTENT_SYSTEM, INTERACTIVE_SYSTEM)
- Does NOT own colors or typography (THEME_SYSTEM defines those via CSS variables)
- Provides animation utilities as CSS classes or Tailwind config extensions
- Respects `prefers-reduced-motion` — all animations disabled when user has set this preference
