# Level 4: Layout System

## Responsibility

Owns the page's structural layout — section ordering, responsive behavior, maximum content widths, scroll behavior, and viewport context. Provides the CSS framework (custom properties and utility classes) that all other systems' visual components consume for spacing and structure.

## Boundaries

- **Owns:** Section order, responsive breakpoints, max content width, page chrome (header, footer), scroll behavior, viewport context (mobile/desktop flag)
- **Does not own:** Color tokens (THEME_SYSTEM), interactive state (INTERACTIVE_SYSTEM), content (CONTENT_SYSTEM)
- **Does not compute:** Content values, theme preferences, or interactive state

## Data Structures

### Breakpoints

```
breakpoints:
  mobile: max-width [mobile_max_px]
  tablet: min-width [tablet_min_px] and max-width [tablet_max_px]
  desktop: min-width [desktop_min_px]
```

### Spacing Scale

```
spacing tokens (CSS custom properties):
  --space-xs: [xs_value]
  --space-sm: [sm_value]
  --space-md: [md_value]
  --space-lg: [lg_value]
  --space-xl: [xl_value]
  --space-2xl: [2xl_value]
  --space-3xl: [3xl_value]
```

### Content Width

```
--max-width-prose: [prose_width]     # body text column width
--max-width-wide: [wide_width]       # full-bleed sections (comparison, wizard)
--max-width-page: [page_width]       # overall page container
```

### Section Order

Fixed order (cannot be reordered at runtime):

1. Meta Banner
2. Header (with version badge and theme toggle)
3. Hero (with version badge)
4. Problem Section
5. How It Works
6. Hierarchy Explorer
7. Spec Wizard
8. Before/After Comparison
9. Open Source CTA
10. Footer

## Rules

- Sections stack vertically in fixed order; there is no dynamic reordering
- On mobile, all multi-column layouts collapse to single column
- Horizontal scrolling is forbidden — all content must fit within viewport width
- The meta-banner is sticky or fixed above fold and never hidden
- Header may be sticky on scroll (position: sticky) but must not obscure content
- Section vertical padding is generous; sections must breathe at all viewport sizes
- Maximum prose line length is capped at [max_line_length] characters to maintain editorial legibility
- Interactive sections (explorer, wizard) may use full-width containers on mobile

## Responsive Behavior

| Element | Mobile | Desktop |
|---------|--------|---------|
| Meta Banner | Full width, single column | Full width |
| Header | Logo + toggle (no nav) | Logo + toggle (no nav) |
| Hero | Centered, single column | Centered, max-width constrained |
| Problem / How It Works | Single column prose | Single column prose, max-width constrained |
| Hierarchy Explorer | Single column, stacked levels | Grid or horizontal layout |
| Spec Wizard | Full width, single step visible | Centered, max-width constrained |
| Before/After | Stacked panels with toggle | Side-by-side panels |
| CTA | Single column | Single column, centered |
| Footer | Single column | Single column |

## Scroll Behavior

- Smooth scrolling for internal anchor links
- No scroll-triggered animations or parallax effects
- Page starts at top on each load (no scroll-position persistence)

## Interactions with Other Systems

- **THEME_SYSTEM** → **LAYOUT_SYSTEM**: `data-theme` attribute on root; LAYOUT_SYSTEM's CSS custom properties for color consume THEME_SYSTEM tokens via cascade
- **LAYOUT_SYSTEM** → **INTERACTIVE_SYSTEM**: Exposes a CSS breakpoint or JS media query result so INTERACTIVE_SYSTEM can switch between hover (desktop) and tap (mobile) interaction models for the hierarchy explorer
