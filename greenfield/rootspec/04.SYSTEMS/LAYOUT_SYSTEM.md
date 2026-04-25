# Level 4: Layout System

## Responsibility

Owns the page structure, section order, navigation, and base path configuration. Ensures all assets, links, and internal anchors resolve correctly under the `/demos/greenfield/` base path in all environments.

## Page Structure

Sections are rendered in this order:

1. **Header** — Site name/logo, theme toggle, navigation links
2. **Meta Banner** — Demo context notice with links to spec and seed files; above the fold, before all other content
3. **Hero** — Tagline, one-sentence explanation, version badge, primary CTA
4. **Problem** — Why existing approaches fail
5. **How It Works** — Four-skill walkthrough
6. **Hierarchy Explorer** — Interactive L1-L5 visualization
7. **Spec Wizard** — "Spec Your Idea" interactive wizard
8. **Comparison** — Before/After side-by-side
9. **Author's Notes** — Full verbatim author text
10. **CTA** — Open Source / GitHub / Getting Started
11. **Footer** — Builder attribution and build date

## Data Ownership

- **Section anchor IDs:** Stable IDs for each section (e.g., `#problem`, `#how-it-works`, `#explorer`, `#wizard`, `#comparison`, `#notes`, `#cta`)
- **Base path:** `/demos/greenfield/` — used for all asset references and internal links
- **Navigation links:** Ordered list of (label, anchor) pairs for the header nav

## Key Rules

- **Meta Banner is above all content.** It is rendered immediately after the header and before the hero. It must be visible on initial load without scrolling on all viewport widths.
- **Base path is consistent across environments.** Dev, preview, and production all use `/demos/greenfield/`. No environment-specific path logic.
- **All asset URLs are base-path-aware.** CSS, JS, font files, and SVG assets are referenced through the framework's base path configuration, not hardcoded as root-relative paths.
- **Internal links use anchor fragments.** Navigation within the page uses `#anchor` fragments. The framework resolves these correctly under the base path.
- **External links are absolute.** Any link to GitHub or other external resources uses the full URL.

## Navigation Behavior

- Header navigation links scroll to the corresponding section on click
- Active section is highlighted in the nav as the user scrolls (scroll-spy behavior)
- On mobile, navigation collapses to a compact or hamburger form

## Interactions with Other Systems

- Receives section content from CONTENT_SYSTEM for each section slot
- Provides the theme toggle control that sends events to THEME_SYSTEM
- Applies PRESENTATION_SYSTEM tokens to the page shell (header, footer, section wrappers)
- Hosts INTERACTIVE_SYSTEM components in the Explorer and Wizard sections

## Attributes

| Attribute | Value |
|-----------|-------|
| basePath | `/demos/greenfield/` |
| defaultSection | Hero |
| mobileBreakpoint | [small screen width] |
