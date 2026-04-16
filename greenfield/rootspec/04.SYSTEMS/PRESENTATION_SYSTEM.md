# Level 4: Presentation System

References: [L1: Foundational Philosophy], [L2: Stable Truths], [L3: Interaction Architecture], [L4: SYSTEMS_OVERVIEW]

## Responsibility

Owns all visual design tokens and animation parameters. Defines the aesthetic language of the site — typography, color, spacing, and motion — as a consistent, readable token set that other systems consume. Does not own layout decisions or interactive logic.

## Design Token Categories

### Color
- **Foreground / background** — High-contrast text and surface colors for both light and dark themes
- **Accent** — A primary accent color used for interactive elements, highlights, and calls to action
- **Muted** — Reduced-contrast variants for secondary text and borders
- **Destructive / warning** — Reserved for validation error states in the wizard
- **Panel differentiation** — Distinct surface colors for Before/After panels

### Typography
- **Scale** — A limited type scale (heading sizes, body, caption) with clear hierarchy
- **Font family** — System or web-safe fonts preferred; no heavy custom font loading
- **Weight** — Regular and bold; minimal intermediate weights
- **Line height** — Comfortable reading line height for body copy; tighter for headings

### Spacing
- **Base unit** — A consistent base unit from which all spacing is derived (multiples/fractions only)
- **Section spacing** — Generous vertical space between major page sections
- **Component spacing** — Consistent internal padding within cards and panels

### Motion
- **Transition duration** — [short duration] for hover/focus state changes; [medium duration] for component expansion
- **Easing** — Ease-out for elements entering the viewport; ease-in-out for toggle transitions
- **Animation philosophy:** Smooth and purposeful — animations communicate state changes, not decoration. Motion respects `prefers-reduced-motion`.

## Visual Identity Principles

Derived from Design Pillars (L1):

- **Grounded Clarity** → Clean layouts, generous whitespace, clear typographic hierarchy
- **Trustworthy Confidence** → Consistent token application, no visual surprises
- **Approachable Rigor** → Professional but not corporate; developer-aesthetic with warmth
- **Collaborative Transparency** → Code-like formatting for spec fragments; readable prose for narrative

## RootSpec Diagram

A visual diagram (SVG) depicting the RootSpec methodology: a spec surrounding the development cycle, with only valid (spec-conforming) solutions passing through. The diagram shows the filtering/validation role of the spec, not just the hierarchy levels.

**Format:** SVG (inline or as a build artifact), so it renders without an image server and scales cleanly at all sizes.

## Boundaries

- PRESENTATION_SYSTEM defines tokens; it does not render components or manage layout
- Token values (actual numeric values: px, ms, rem) live in fine-tuning (L5)
- PRESENTATION_SYSTEM does not manage which theme is active — THEME_SYSTEM owns that
- All other systems consume tokens from PRESENTATION_SYSTEM; they do not define their own colors or spacing
