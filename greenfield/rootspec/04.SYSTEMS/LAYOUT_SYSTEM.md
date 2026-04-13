# Level 4: Layout System

**System:** LAYOUT_SYSTEM
**Last Updated:** 2026-04-12

---

## Responsibility

The Layout System owns the structural wrapper of every page: the header, the footer, the meta banner, the navigation, and the responsive grid. It decides how sections are ordered, how wide the content column is, and what persistent elements (version badge, theme toggle) appear on every page view. It does not own content copy or interactive behavior.

---

## Boundaries

- **Owns:** Header, footer, navigation, meta banner, main content wrapper, responsive breakpoints, z-index stack
- **Does not own:** Section content, interactive section behavior, theme token values
- **Reads from:** FRAMEWORK_SYSTEM (version string at build time), THEME_SYSTEM (applies active theme class to root)
- **Wraps:** CONTENT_SYSTEM sections and INTERACTIVE_SYSTEM sections

---

## Page Structure

```
<html [data-theme]>
  <head>
    <!-- inline theme script (THEME_SYSTEM) -->
  </head>
  <body>
    <header>
      <!-- Logo / site name -->
      <!-- Version badge -->
      <!-- Theme toggle (THEME_SYSTEM renders; LAYOUT_SYSTEM positions) -->
      <!-- Navigation anchors -->
    </header>

    <div class="meta-banner" data-test="meta-banner">
      <!-- Meta banner content (CONTENT_SYSTEM) -->
    </div>

    <main>
      <!-- Hero section -->
      <!-- Problem section -->
      <!-- How It Works section -->
      <!-- Hierarchy Explorer section (INTERACTIVE_SYSTEM) -->
      <!-- Spec Wizard section (INTERACTIVE_SYSTEM) -->
      <!-- Before/After section (INTERACTIVE_SYSTEM) -->
      <!-- Open Source CTA section -->
    </main>

    <footer>
      <!-- Attribution, version, links -->
    </footer>
  </body>
</html>
```

---

## Header

| Element | Purpose |
|---------|---------|
| Site name / logo | Identifies the product; links to top of page |
| Version badge | Displays RootSpec version from `.rootspec.json` (build-time); `data-test=version-badge` |
| Theme toggle | Button rendered in header; THEME_SYSTEM handles behavior |
| Navigation anchors | Skip-links to major sections; visible on focus for keyboard users |

The header is sticky (visible while scrolling). It does not contain the meta banner.

---

## Meta Banner

- Rendered immediately below the header (or as a persistent top-of-page element, above the hero)
- Full viewport width; not dismissible
- Distinguishable from the hero (different background color from both header and page body)
- Contains: the demo disclosure text + two links (SEED.md, spec files)
- `data-test=meta-banner`

---

## Responsive Layout

| Viewport | Behavior |
|----------|----------|
| Narrow (mobile) | Single column; sections stack vertically; before/after uses toggle instead of slider |
| Mid (tablet) | Single column with slightly wider content area |
| Wide (desktop) | Centered content column with max-width; before/after uses side-by-side slider |

Breakpoints are defined as CSS custom properties. Actual pixel values are set at implementation time (placeholders: `[mobile-breakpoint]`, `[desktop-breakpoint]`).

---

## Section Ordering

Sections appear in this order from top to bottom:
1. Header (sticky)
2. Meta Banner
3. Hero
4. The Problem
5. How It Works
6. Hierarchy Explorer
7. Spec Your Idea Wizard
8. Before/After Comparison
9. Open Source CTA
10. Footer

---

## Z-Index Stack

| Layer | Element | Priority |
|-------|---------|---------|
| Top | Sticky header | Highest |
| Mid | Meta banner (if overlapping) | Secondary |
| Base | Page content | Normal |

---

## Accessibility

- Skip navigation link appears as the first focusable element; visible on focus
- All sections have appropriate landmark roles (`<header>`, `<main>`, `<footer>`, `<nav>`)
- Section headings follow a logical `<h1>` → `<h2>` → `<h3>` hierarchy
- Focus is not trapped anywhere except within wizard steps (intentional modal-like behavior)
