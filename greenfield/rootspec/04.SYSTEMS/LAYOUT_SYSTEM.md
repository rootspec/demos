# Level 4: Layout System

References: [01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md]

## Responsibility

The Layout System owns the page structure, navigation chrome, responsive grid, and the placement of all sections. It provides the structural containers into which all other systems render.

This system does NOT own:
- Content or copy within sections (owned by CONTENT_SYSTEM)
- Visual tokens (owned by THEME_SYSTEM)
- Interactive component behavior (owned by HIERARCHY_EXPLORER and SPEC_WIZARD)

## Page Shell Structure

```
┌─────────────────────────────────────┐
│ Meta Banner (sticky, above fold)    │
├─────────────────────────────────────┤
│ Header (nav, logo, version, toggle) │
├─────────────────────────────────────┤
│ Hero Section                        │
│ Problem Section                     │
│ How It Works Section                │
│ Hierarchy Explorer Section          │
│ Before/After Comparison Section     │
│ Spec Wizard Section                 │
│ Author's Notes Section              │
│ CTA Section                         │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

## Header

Contains:
- Site name / logo (links to top of page)
- RootSpec version badge (read from `.rootspec.json` at build time)
- Theme toggle control
- No additional navigation items — single-page site; no nav menu needed

## Meta Banner

**Rules:**
- Appears above the header or immediately below it — must be visible before any content
- Non-dismissable — never hidden
- Must appear above the fold on all viewports without scrolling
- Contains links to SEED.md and spec files using absolute GitHub URLs

## Section Structure

Each section follows a consistent structure:
- Section container with consistent horizontal padding
- Maximum content width that supports editorial line lengths for prose
- Generous vertical padding between sections (the page should breathe)

## Responsive Strategy

**Breakpoints:** Mobile-first. Three key breakpoints:
- Small (mobile) — single column, full width, touch-optimized
- Medium (tablet) — slightly wider, still single column for most content
- Large (desktop) — editorial max-width, centered, generous whitespace

**Interactive elements on mobile:**
- HIERARCHY_EXPLORER: touch-friendly tap targets; reference arrows replaced with text on small screens
- SPEC_WIZARD: full-screen step view; large touch targets for pillar selection

## Base Path

All internal asset URLs and links resolve under `/demos/greenfield/`. This base path is applied uniformly in dev, preview, and production. Does not change based on environment.

## Accessibility

- Semantic HTML: `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`
- Each section has an appropriate `aria-label` or a visible heading
- Skip-to-content link available for keyboard users
- Tab order follows reading order (top to bottom)
- Focus is visible on all interactive elements

## State Managed

| State | Type | Source |
|-------|------|--------|
| Current theme class | Enum: light, dark | THEME_SYSTEM |
| RootSpec version | String | Read-only at build time |

Layout System is otherwise stateless. It reads theme state from THEME_SYSTEM and applies the appropriate class to the root element.

## Interfaces

### Consumed from Other Systems

- THEME_SYSTEM: current theme state → applied as `data-theme` attribute on `<html>` or `<body>`
- CONTENT_SYSTEM: content rendered within section containers
- HIERARCHY_EXPLORER: island component mounted in explorer section
- SPEC_WIZARD: island component mounted in wizard section

### Exposes to All Systems

- Section containers with consistent padding and max-width
- CSS grid and responsive column classes (via Tailwind)
