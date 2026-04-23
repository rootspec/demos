# Level 4: Layout System

## Responsibility

Defines the page structure: section order, navigation, meta-banner placement, and the overall reading flow. Ensures the meta-banner is always the first visible element. Provides the structural scaffold that PRESENTATION_SYSTEM renders.

## Boundaries

- Owns: section order, section IDs, navigation structure, meta-banner position
- Does not own: visual rendering (PRESENTATION_SYSTEM), content strings (CONTENT_SYSTEM), interactive state (INTERACTIVE_SYSTEM)
- No JavaScript logic; purely structural

## Page Structure

Sections render in this exact order:

1. **Meta-Banner** — Always first, always visible, always above the fold
2. **Header / Navigation** — Site name, theme toggle, optional section links
3. **Hero** — Tagline, one-sentence explanation, version badge, primary CTA anchor
4. **Problem** — Why existing approaches fail
5. **How It Works** — Four-skill workflow walkthrough with methodology diagram
6. **Hierarchy Explorer** — Interactive five-level visualization
7. **Spec Wizard** — "Spec Your Idea" interactive wizard
8. **Comparison** — Before/after comparison view
9. **CTA** — Open source entry point: GitHub, npm, docs
10. **Footer** — Attribution, build date

**Constraint:** The meta-banner position is inviolable. It must not be moved below the header or hidden behind a toggle. See L1 Inviolable Principles.

## Navigation

- Header is sticky or fixed for easy section jumping on long pages
- Navigation links (if present) are anchor links to section IDs
- Section IDs are stable and predictable (used by external links and Cypress tests)

**Section IDs:**
- `#hero`
- `#problem`
- `#how-it-works`
- `#hierarchy`
- `#wizard`
- `#comparison`
- `#cta`

## Meta-Banner Placement

- Positioned before the `<header>` element in DOM order
- Full-width, visually distinct (different background from header and hero)
- Not dismissable, not collapsible
- Links open in a new tab (absolute GitHub URLs)

## Base Path

All internal links and asset references are relative to the configured base path (`/demos/greenfield/`). The layout system does not hardcode paths; it uses the framework's base URL mechanism.

## Interaction with Other Systems

- **Provides to PRESENTATION_SYSTEM:** Section scaffold and structure for rendering
- **Provides to CONTENT_SYSTEM:** Section IDs and structure into which content is placed
- **Receives from CONTENT_SYSTEM:** Meta-banner text and links for placement in first position
