# L4: Layout System

## Responsibility

Owns the visual structure of the page: navigation header, section ordering, responsive grid, typography scale, spacing rhythm, scroll behavior, version badge rendering, and footer. Stateless at runtime — it responds to theme and content, but does not manage state itself.

## Boundaries

- Owns: Page structure, responsive breakpoints, CSS custom properties, animation/transition definitions
- Does not own: Content data, theme state, interactive widget state
- Receives from THEME_SYSTEM: `data-theme` attribute on root element
- Receives from CONTENT_SYSTEM: Section list and content for rendering
- Receives from FRAMEWORK_INTEGRATION: Version string for the version badge

## Key Behaviors

- Single-page layout; no client-side routing
- Navigation header is sticky; contains: logo/wordmark, nav links (anchors to sections), theme toggle, version badge
- Version badge shows `v{version}` pulled from FRAMEWORK_INTEGRATION at build time
- Smooth scroll to sections via anchor links
- Responsive breakpoints: mobile-first; key breakpoint at ~768px (tablet) and ~1200px (desktop)
- Section transitions use CSS animations (fade + slight translateY); respects `prefers-reduced-motion`
- All interactive sections use `min-height` to prevent layout shift during expansion/collapse
- Footer is full-width, contains: attribution (builder name, build date), GitHub link

## CSS Custom Properties (Theme-Driven)

| Property | Purpose |
|----------|---------|
| `--color-bg` | Page background |
| `--color-surface` | Card/panel background |
| `--color-text` | Primary text |
| `--color-text-muted` | Secondary text |
| `--color-accent` | Interactive highlight, links, badges |
| `--color-border` | Dividers and panel borders |
| `--radius-md` | Standard border radius |
| `--transition-speed` | Base animation duration |

Values for `[data-theme="light"]` and `[data-theme="dark"]` are defined in the global stylesheet.

## Interactions with Other Systems

- **← THEME_SYSTEM:** Reads `data-theme` attribute; applies light/dark token values
- **← CONTENT_SYSTEM:** Receives section content and ordering for rendering
- **← FRAMEWORK_INTEGRATION:** Receives version string for badge
- **← INTERACTIVE_SYSTEM:** Handles layout reflows from widget expansion via CSS (no JS coupling)
