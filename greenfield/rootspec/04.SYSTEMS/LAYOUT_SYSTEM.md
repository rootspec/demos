# Level 4: Layout System

## Responsibility

Owns the page structure, section ordering, responsive grid behavior, and scroll-based intersection logic. It coordinates the physical arrangement of content and triggers entry animations via PRESENTATION_SYSTEM.

## Data Ownership

### Page Section Order (top to bottom)
1. Header (version badge, theme toggle, nav)
2. Meta Banner
3. Hero Section (tagline, CTA, version badge)
4. Problem Section
5. How It Works Section
6. Hierarchy Explorer Section
7. Spec Wizard Section
8. Before/After Comparison Section
9. Open Source CTA Section
10. Footer (attribution, links)

### Responsive Breakpoints
- Mobile: < [N]px — single column, stacked panels, hidden reference arrows
- Tablet: [N]–[N]px — two columns for comparison, explorer collapses to accordion
- Desktop: > [N]px — full layout, side-by-side panels, explorer with arrow visualization

### Scroll Behavior
- Smooth scroll for internal anchor links
- Intersection Observer triggers section entry at [N]% visibility threshold
- Single-page layout — no routing

## Interfaces

- **Consumes from CONTENT_SYSTEM:** Section content and banner data for rendering
- **Consumes from THEME_SYSTEM:** Active theme class (passive, via CSS cascade)
- **Provides to PRESENTATION_SYSTEM:** Scroll intersection entry points per section
- **Provides to INTERACTIVE_SYSTEM:** Container dimensions for component layout decisions

## Constraints

- Base path `/demos/greenfield/` must be applied to all asset URLs (images, scripts, styles)
- All internal links are anchor-based (`#section-id`), not path-based
- No server-side routing — this is a fully static single-page site
- Layout must not cause horizontal scroll at any breakpoint
