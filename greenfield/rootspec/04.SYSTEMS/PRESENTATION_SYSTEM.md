# Level 4: Presentation System

> References: 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md

## Responsibility

Owns the page shell, section layout, and scroll structure. Renders all sections in order, provides the HTML skeleton, and coordinates the mounting of content and interactive components. Does not own any content or business logic.

## Boundaries

- **Owns:** `<html>`, `<body>`, `<main>`, section containers, header/footer shell
- **Does not own:** Text content (CONTENT_SYSTEM), interactive state (INTERACTIVE_SYSTEM), design tokens (THEME_SYSTEM), spacing/type scale (LAYOUT_SYSTEM)

## Page Structure

The page is a single scrolling document. Sections are rendered in this order:

1. **Header** — Logo, version badge, theme toggle, navigation anchors
2. **Meta Banner** — Persistent call-out about the site being a RootSpec demo
3. **Hero Section** — Tagline, one-sentence explanation, version badge, CTA
4. **Problem Section** — Why existing approaches fail
5. **How It Works Section** — Four-step workflow walkthrough
6. **Hierarchy Explorer Section** — Interactive component
7. **Spec Wizard Section** — Interactive component
8. **Before/After Comparison Section** — Interactive component
9. **CTA Section** — GitHub link, getting started
10. **Footer** — Builder attribution, build date

## Responsive Behavior

| Viewport | Layout | Column behavior |
|----------|--------|-----------------|
| Mobile (<768px) | Single column | All sections stack vertically |
| Tablet (768–1023px) | Single to two-column | Side-by-side only where content warrants |
| Desktop (≥1024px) | Full multi-column | Hero, comparison, and workflow show multi-column |

## Section Transitions

Sections animate into view on scroll (intersection observer). The animation is a subtle fade-up — opacity 0→1, translateY 20px→0. Timing is controlled by THEME_SYSTEM animation tokens. Reduced motion preference is respected.

## State Owned

- Scroll position (read-only, for active section highlighting)
- Current section in viewport (for navigation highlight)

## Data Owned

None. All content flows in from CONTENT_SYSTEM and INTERACTIVE_SYSTEM.

## Interactions with Other Systems

- Receives CSS custom properties from THEME_SYSTEM via `<html>` class
- Receives spacing/typography tokens from LAYOUT_SYSTEM via CSS variables
- Renders slots/slots provided by CONTENT_SYSTEM components
- Provides mount points (DOM nodes) where INTERACTIVE_SYSTEM hydrates
