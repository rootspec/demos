# Level 4: Layout System
# RootSpec Marketing Site

## Responsibility

The Layout System owns page structure, visual spacing, responsive behavior, scroll mechanics, and the CSS design token layer. It provides the scaffolding within which all other systems render their content.

## Page Structure

```
<page>
  ├── <sticky-header>       — Logo, nav anchors, theme toggle (appears after hero scrolls out)
  ├── <meta-banner>         — Always visible at top; cannot be dismissed
  ├── <hero>                — Full-viewport-height section; version badge, tagline, CTA
  ├── <problem>             — Standard content section
  ├── <how-it-works>        — Standard content section with step indicators
  ├── <hierarchy-explorer>  — Interactive section (INTERACTIVE_SYSTEM renders here)
  ├── <wizard>              — Interactive section (INTERACTIVE_SYSTEM renders here)
  ├── <before-after>        — Interactive section (INTERACTIVE_SYSTEM renders here)
  ├── <open-source-cta>     — Standard content section
  └── <footer>              — Attribution, build date
```

## Responsive Breakpoints

| Name | Min Width | Layout Changes |
|------|-----------|----------------|
| `mobile` | [mobile minimum] | Single column; stacked components; before/after as toggle |
| `tablet` | [tablet minimum] | Two-column grid for some sections; wider content |
| `desktop` | [desktop minimum] | Full layout; before/after side-by-side; sticky nav visible |

All interactive components receive the current breakpoint name as context (see INTERACTIVE_SYSTEM).

## Design Token Layer

All visual values are expressed as CSS custom properties (design tokens). Two token sets exist — one for each theme. THEME_SYSTEM switches between them by updating the root attribute.

Token categories:
- **Color:** surface, text, accent, border, shadow — all theme-scoped
- **Typography:** font-family (monospace for code, sans-serif for body), size scale, line-height
- **Spacing:** consistent scale for padding, margin, gap
- **Motion:** transition durations — [short duration] for micro-interactions, [medium duration] for section animations
- **Radius:** border-radius values for cards, buttons, badges

## Scroll Behavior

- **Smooth scroll** on all in-page anchor links
- **Section entry animation:** each section fades/slides in on first scroll entry; animation does not repeat on scroll-out
- **Sticky header:** hidden on initial load (hero is visible); appears when hero bottom edge exits viewport
- **Active section tracking:** sticky nav highlights the section currently occupying the most viewport area

## SVG Diagram

The RootSpec methodology is represented as an SVG diagram (not an image file) embedded inline. The diagram depicts:
- A circular development cycle in the center (code → build → test → deploy)
- The spec hierarchy surrounding and filtering the cycle
- Arrows indicating valid solutions passing through the spec gate
- Invalid paths blocked at the spec boundary

The SVG is theme-aware — its colors respond to the root theme attribute via CSS custom properties.

## Interactions With Other Systems

| System | Interaction |
|--------|-------------|
| THEME_SYSTEM | Layout token layer responds to root theme attribute; no direct coupling |
| INTERACTIVE_SYSTEM | Provides breakpoint context; wraps interactive components in section containers |
| CONTENT_SYSTEM | Section containers are the scaffold; CONTENT_SYSTEM provides the content within |
| FRAMEWORK_INTEGRATION | None at runtime; FRAMEWORK_INTEGRATION is build-time only |

## Rules

- No section has a fixed pixel height (except the hero, which is [viewport height unit]-based)
- All interactive containers provide sufficient space for their largest responsive state
- Focus indicators must be visible in both themes — no focus style that disappears in dark mode
- The meta-banner must not be conditionally rendered — it is always in the DOM and always visible
- Section animation must not run before the JavaScript bundle is loaded — elements start in their non-animated state (visible, no offset)
