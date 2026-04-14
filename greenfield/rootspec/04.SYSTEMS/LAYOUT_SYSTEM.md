# Level 4: Layout System
<!-- L4: HOW it's built — References L1-3 + Sibling L4 + External only -->

## Responsibility

The Layout System owns page structure, responsive grid, navigation, and section ordering. It defines where things are, not what they contain or how they look visually.

---

## Page Structure

The site is a single-page layout with a persistent header and a vertical stack of sections:

1. Header (persistent, sticky)
2. Meta Banner (persistent, high-visibility)
3. Hero Section
4. Problem Section
5. How It Works Section
6. Hierarchy Explorer Section
7. Spec Wizard Section
8. Before/After Comparison Section
9. Open Source CTA Section
10. Footer

The header provides jump links to major sections via anchor navigation. Smooth scrolling is applied to all anchor links.

---

## Responsive Behavior

| Breakpoint | Behavior                                                              |
|------------|-----------------------------------------------------------------------|
| Mobile     | Single-column layout; header collapses to hamburger or simplified nav |
| Tablet     | Single-column with wider margins; interactive components full-width   |
| Desktop    | Content max-width centered; interactive sections may use two columns  |

All interactive components must be usable at all breakpoints. No content is hidden on mobile — it reflows.

---

## Z-Layering

| Layer    | Elements                                         |
|----------|--------------------------------------------------|
| Base     | Page content and sections                        |
| Elevated | Sticky header, Meta Banner                       |
| Overlay  | Modals or expanded states (if applicable)        |

---

## Navigation

- Header links are anchor tags pointing to section IDs
- Meta Banner is sticky or fixed at the top to maintain visibility
- No multi-page routing — single page with sections

---

## Subpath Deployment

All internal links and asset URLs must include the base path `/demos/greenfield/`. The framework (Astro or equivalent) is configured with `base: '/demos/greenfield'` so that build output resolves correctly on GitHub Pages.

---

## Interactions with Other Systems

- Receives section content slots from CONTENT_SYSTEM
- Provides structural context (grid, spacing) consumed by PRESENTATION_SYSTEM
- Hosts component slots for INTERACTIVE_SYSTEM components
- Is not responsible for colors, typography, or motion — those belong to PRESENTATION_SYSTEM
