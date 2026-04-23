# Level 4: Presentation System

## Responsibility

Renders all visible page content using the type system, spacing, and color tokens defined by THEME_SYSTEM. Translates layout structure from LAYOUT_SYSTEM into rendered HTML. Applies interactive states from INTERACTIVE_SYSTEM.

The presentation layer is the site's argument made visible: typography-first, generous whitespace, restrained palette. A generic-looking presentation layer actively contradicts the product's thesis.

## Boundaries

- Owns: visual rendering, component markup, CSS, animation behavior
- Does not own: content strings (CONTENT_SYSTEM), interactive logic (INTERACTIVE_SYSTEM), theme state (THEME_SYSTEM)
- Does not make network requests
- Does not write to localStorage

## Typography System

**Body / prose:** High-quality serif typeface (e.g., Source Serif 4, Newsreader, or similar). Signals essay-quality writing. Used for all paragraph text, section descriptions, long-form copy.

**UI / labels / navigation:** Clean sans-serif (e.g., Inter, IBM Plex Sans). Used for navigation, labels, buttons, captions, and short functional text.

**Code / commands:** Monospace face (e.g., JetBrains Mono, IBM Plex Mono). Used for all command examples (`/rs-init`, `/rs-spec`, etc.), code snippets, and technical labels.

**Scale:** Modular type scale with [minimum body size] at base, headings derived proportionally. Line length for prose capped at [comfortable reading width] characters.

## Color System

**Palette:** Two or three colors maximum plus neutrals. One accent color used sparingly for interactive states, links, and emphasis.

**Light mode (default):**
- Background: near-white (not pure white)
- Body text: dark neutral (not pure black)
- Accent: [single accent color]
- Borders/dividers: light neutral

**Dark mode:**
- Background: dark neutral (not pure black)
- Body text: near-white
- Accent: same or adjusted for contrast
- Borders/dividers: dark neutral

No gradients. No glassmorphism. No glows. No decorative effects. Color is used for meaning, not decoration.

## Animation and Motion

**Philosophy:** Mechanical, not magical. Transitions confirm state change; they do not entertain. Quick and functional.

**Durations:**
- State transitions (expand/collapse, toggle): [short transition duration] ease-out
- Theme switch: [short transition duration]
- No parallax, no springy physics, no entrance animations on scroll

**Accessibility:** Respects `prefers-reduced-motion`. All animated transitions degrade to instant state change when reduced motion is preferred.

## Responsive Behavior

**Breakpoints:**
- Mobile: single-column, stacked layout
- Tablet: intermediate adjustments
- Desktop: full layout with side-by-side comparison, wider prose columns

**Interactive components on mobile:**
- Touch targets minimum [minimum touch target size]
- Comparison view stacks vertically with toggle instead of side-by-side
- Hierarchy explorer uses full-width cards
- Wizard uses full-width single-column steps

## Component Patterns

### Section
Each page section has: heading, optional subheading, body content, optional interactive element. Sections are separated by generous whitespace, not decorative dividers.

### Interactive Cards (Hierarchy Explorer)
Cards with clear borders, no shadows. Expanded state shows content below the header. Reference lines are SVG overlays or CSS-drawn connections.

### Wizard Steps
Step indicator shows current position. Each step is a discrete panel. Output block renders in a styled code/prose hybrid.

### Comparison Panels
Two panels with equal visual weight. Toggle or slider control is clearly labeled "Without spec" / "With RootSpec."

### Meta-Banner
Visually distinct from the rest of the page — uses a background color that separates it from the header. Text is legible at small sizes. Links are clearly actionable.

### Version Badge
Inline badge element — not a large graphic. Positioned in the hero or header without competing with primary content.

## Accessibility

- Semantic HTML throughout: `<main>`, `<nav>`, `<section>`, `<article>`, `<header>`, `<footer>`
- All interactive elements have visible focus rings
- All images and SVGs have descriptive `alt` text or `aria-label`
- Color contrast meets WCAG AA for all text/background combinations in both modes
- Interactive components have appropriate ARIA roles and states (`aria-expanded`, `aria-selected`, etc.)

## Interaction with Other Systems

- **Receives from THEME_SYSTEM:** Active theme class/attribute applied to `<html>` or `<body>`; CSS custom properties update accordingly
- **Receives from CONTENT_SYSTEM:** Version string, meta-banner copy, section content
- **Receives from INTERACTIVE_SYSTEM:** Component state (which hierarchy level is expanded, which wizard step is active, which comparison panel is shown)
- **Renders:** All of the above into visible, accessible HTML
