# Level 4: Layout System

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md
**Part of:** SYSTEMS_OVERVIEW.md

---

## Responsibility

The Layout System owns the page structure, responsive behavior, navigation, and section containers. It defines how sections are arranged, how the header and footer are composed, and how content reflows across screen sizes. It does not own copy (CONTENT_SYSTEM), tokens (THEME_SYSTEM), or interactive logic (INTERACTIVE_SYSTEM).

---

## Page Structure

The page is a single-column document with a persistent header and footer. Sections stack vertically in reading order.

```
[Header — sticky or fixed]
  [Version badge]
  [Theme toggle]
  [Navigation anchor links — optional]

[Page body — single column]
  [Meta Banner]
  [Hero Section]
  [Problem Section]
  [How It Works Section]
  [Hierarchy Explorer Section]
  [Spec Wizard Section]
  [Before/After Comparison Section]
  [Open Source CTA Section]

[Footer]
  [Attribution, build date, version]
```

---

## Section Layout Rules

Each section follows a consistent container pattern:
- Maximum content width: [comfortable reading width]
- Centered horizontally with auto margins
- Generous vertical padding (from `--space-section` token)
- Section heading is the entry point; body follows

Prose sections (Problem, How It Works, CTA):
- Body text constrained to [comfortable prose width]
- Left-aligned (not centered) for readability

Interactive sections (Hierarchy Explorer, Spec Wizard, Before/After):
- May use wider containers than prose
- But still bounded by the page maximum width

---

## Header

| Element | Behavior |
|---------|----------|
| Version badge | Displays current RootSpec version; read at build time |
| Theme toggle | Icon button; triggers THEME_SYSTEM toggle |
| Site title / logo | Text-based; links to page top |
| Nav links | Optional anchor links to major sections |

Header is sticky (remains visible on scroll) or placed at the very top with sufficient visual weight to orient the visitor. Light background in light mode, dark in dark mode. No heavy drop shadow — a simple border-bottom or slight background is sufficient.

---

## Responsive Strategy

| Breakpoint | Layout behavior |
|------------|----------------|
| Mobile (<[mobile breakpoint]) | Single column; wizard steps stack vertically; before/after uses toggle instead of slider |
| Tablet ([tablet breakpoint]+) | Wider content containers; before/after may use side-by-side panels |
| Desktop ([desktop breakpoint]+) | Full layout; all interactive features in intended orientation |

Rules:
- All interactive features must work on touch devices
- Touch targets must be [adequately sized]
- No horizontal scrolling at any breakpoint
- Font sizes scale appropriately — no fixed pixel sizes for body text

---

## Navigation

Navigation is anchor-link based. No JavaScript-driven routing. Section IDs are stable and predictable.

| Section | Anchor |
|---------|--------|
| Meta Banner | `#meta-banner` |
| Hero | `#hero` |
| Problem | `#problem` |
| How It Works | `#how-it-works` |
| Hierarchy Explorer | `#hierarchy` |
| Spec Wizard | `#wizard` |
| Before/After | `#comparison` |
| CTA | `#cta` |

---

## Boundaries

- The Layout System does NOT own copy or text content — that belongs to CONTENT_SYSTEM
- The Layout System does NOT own visual tokens (colors, fonts) — that belongs to THEME_SYSTEM
- The Layout System does NOT own interactive behavior — that belongs to INTERACTIVE_SYSTEM
- The Layout System provides the container and slot structure that other systems fill
