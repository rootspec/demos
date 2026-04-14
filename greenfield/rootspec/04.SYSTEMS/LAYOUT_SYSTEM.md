# Level 4: Layout System

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md

---

## Responsibility

Owns the page's structural layout: section ordering, responsive breakpoints, spacing, navigation anchors, and scroll behavior. Does not own content or interactivity — it provides the skeleton into which CONTENT_SYSTEM and INTERACTIVE_SYSTEM render.

---

## Page Structure

Sections appear in this order, top to bottom:

1. **Header** — Site name/logo, theme toggle, optional nav anchors (sticky or static)
2. **Meta Banner** — Always visible; cannot be dismissed
3. **Hero** — Full-width, above the fold
4. **Problem Section** — Explains the problem RootSpec solves
5. **How It Works** — Four-skill walkthrough
6. **Hierarchy Explorer** — Interactive component slot
7. **Spec Wizard** — Interactive component slot
8. **Before/After Comparison** — Interactive component slot
9. **Open Source CTA** — Call to action
10. **Footer** — Attribution and links

---

## Layout Constraints

### Width

- Max content width: `[MAX_CONTENT_WIDTH]` (center-aligned on wide screens)
- Full-width backgrounds allowed for section visual distinction
- Interactive components span the full content width within their section

### Spacing

- Consistent vertical spacing between sections: `[SECTION_SPACING]`
- Internal section padding: `[SECTION_PADDING]`
- Values defined in FINE_TUNING

### Responsive Breakpoints

| Breakpoint | Width      | Layout Change                                              |
|------------|------------|------------------------------------------------------------|
| Mobile     | <640px     | Single column, stacked sections                            |
| Tablet     | 640–1023px | Two-column where appropriate (comparison panels side-by-side) |
| Desktop    | ≥1024px    | Full layout with max-width constraint                      |

---

## Navigation

- **Anchor links** in header point to section `id` attributes
- Smooth scroll behavior for in-page navigation
- No full-page routing — this is a single page
- External links (GitHub) use `target="_blank"` with `rel="noopener noreferrer"`

---

## Header

- **Logo/name:** "RootSpec" text or simple wordmark (left-aligned)
- **Theme toggle:** Right-aligned, keyboard accessible
- **Optional nav anchors:** Links to major sections (scroll to anchor)
- **Version badge:** Optionally displayed in header (sourced from FRAMEWORK_SYSTEM)

The header does not require a sticky/fixed position, but if implemented it must not obscure anchor-linked section headings (use scroll padding).

---

## RootSpec Methodology Diagram

A visual diagram of the RootSpec methodology is included — either as an SVG embedded in the layout or as an image asset. The diagram conceptually depicts:
- A specification layer surrounding a development cycle
- Only outputs that satisfy the spec pass through
- Philosophy flows downward; implementation traces upward

If an image asset is not feasible, the diagram is rendered as an inline SVG with styled text and arrows.

---

## Data Owned

- Section order and structure
- Named section slots (empty containers for CONTENT_SYSTEM and INTERACTIVE_SYSTEM to fill)
- Responsive breakpoint definitions
- Scroll behavior settings

---

## Interfaces

- **Receives from THEME_SYSTEM:** Active theme class applied to `<html>` root
- **Provides to CONTENT_SYSTEM:** Named section containers
- **Provides to INTERACTIVE_SYSTEM:** Named component slots within sections

---

## Rules

- Section order is fixed — sections cannot be reordered at runtime
- The meta-banner always appears before the hero, never inside it
- No section may produce horizontal scroll at any breakpoint ≥320px
- All touch targets (buttons, links, interactive elements) must be at minimum `[MIN_TOUCH_TARGET]` in height and width
