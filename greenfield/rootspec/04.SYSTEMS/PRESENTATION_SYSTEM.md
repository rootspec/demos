# Level 4: Presentation System
<!-- L4: HOW it's built — References L1-3 + Sibling L4 + External only -->

## Responsibility

The Presentation System owns visual design tokens, animation, and the visual expression of the active theme. It translates THEME_SYSTEM's active theme into concrete visual output and provides the motion vocabulary for interactive state changes.

---

## Design Tokens

Token categories and semantic roles are defined here. Concrete numeric values are set in implementation configuration.

### Color Tokens
- **Background** — page background, section backgrounds, card backgrounds
- **Surface** — elevated elements (header, cards, panels)
- **Brand** — primary brand color for CTAs, links, accents
- **Text** — primary, secondary, muted text colors
- **Border** — separator and outline colors
- **Semantic** — success, warning, error states

All color tokens have both dark-mode and light-mode values. THEME_SYSTEM determines which set is active.

### Typography Tokens
- **Font families** — heading and body (system stack or web-safe)
- **Font sizes** — scale from xs to 4xl
- **Font weights** — regular, medium, bold
- **Line heights** — tight, normal, relaxed

### Spacing Tokens
- Consistent scale for margin, padding, gap
- Applied via utility classes or design tokens consumed by LAYOUT_SYSTEM

### Motion Tokens
- **Duration** — [fast], [moderate], [slow] — distinct values for micro-interactions vs. section transitions
- **Easing** — ease-in-out for transitions; ease-out for reveals
- Respects `prefers-reduced-motion` — all animations disabled or minimized when preference is set

---

## Animation Vocabulary

| Interaction              | Animation                                              |
|--------------------------|--------------------------------------------------------|
| Section scroll reveal    | Fade up, [moderate] duration                           |
| Hierarchy level expand   | Smooth height transition, [fast] duration              |
| Hierarchy arrow highlight| Opacity transition, [fast] duration                    |
| Wizard step transition   | Slide or fade between steps, [fast] duration           |
| Before/after toggle      | Cross-fade or slide, [fast] duration                   |
| Theme toggle             | Immediate; no animation on theme switch                |
| CTA hover                | Scale or shadow change, [fast] duration                |

---

## SVG Diagram

The site includes an SVG diagram depicting the RootSpec methodology: a spec hierarchy surrounding the development cycle, with arrows showing that only valid (spec-conformant) solutions pass through. This is rendered inline as an SVG, not an image file, so it respects the active theme's color tokens.

---

## Interactions with Other Systems

- Consumes theme context from THEME_SYSTEM (dark/light class on root)
- Consumes layout tokens from LAYOUT_SYSTEM (spacing, grid)
- Provides animation classes and visual feedback to INTERACTIVE_SYSTEM components
- Does not own content, structure, or interaction logic
