# Level 4: Systems Overview

## System Map

The RootSpec marketing site is a static site with client-side interactive components. Six systems handle the full surface area of the product.

| System | Responsibility | Key Data |
|--------|---------------|----------|
| [CONTENT_SYSTEM](CONTENT_SYSTEM.md) | Static page content, section structure, author's notes | Markdown/HTML content, section order |
| [THEME_SYSTEM](THEME_SYSTEM.md) | Dark/light mode, typography tokens, color palette | Theme preference, CSS custom properties |
| [LAYOUT_SYSTEM](LAYOUT_SYSTEM.md) | Responsive layout, navigation, meta banner, header/footer | Viewport state, nav open/closed |
| [INTERACTIVE_SYSTEM](INTERACTIVE_SYSTEM.md) | Hierarchy explorer, spec wizard, before/after comparison | Wizard state, explorer state, comparison state |
| [PRESENTATION_SYSTEM](PRESENTATION_SYSTEM.md) | Methodology diagram, version badge, code display | Version from .rootspec.json, SVG diagram |
| [META_SYSTEM](META_SYSTEM.md) | Meta banner, GitHub links, build provenance | Repo URLs, spec file paths |

## System Interactions

| From | To | Interaction |
|------|----|-------------|
| THEME_SYSTEM | All systems | Provides CSS custom properties consumed by every visible element |
| LAYOUT_SYSTEM | CONTENT_SYSTEM | Wraps content sections in responsive containers |
| LAYOUT_SYSTEM | INTERACTIVE_SYSTEM | Provides viewport context (mobile/desktop) to interactive components |
| INTERACTIVE_SYSTEM | THEME_SYSTEM | Interactive components consume theme tokens for consistent styling |
| PRESENTATION_SYSTEM | CONTENT_SYSTEM | Version badge and diagram are embedded within content flow |
| META_SYSTEM | LAYOUT_SYSTEM | Meta banner occupies a fixed slot above all other layout elements |

## Data Flow

```
.rootspec.json ──────────────────────────────> PRESENTATION_SYSTEM (version badge)
                                                        │
GitHub repo URLs ──────────────> META_SYSTEM ──────────> LAYOUT_SYSTEM (banner)
                                                        │
User preference (system/manual) ──> THEME_SYSTEM ──────> CSS custom properties
                                                        │
User interactions ──────────────> INTERACTIVE_SYSTEM ──> Component state (client-side)
                                                        │
Static content (spec, SEED.md) ──> CONTENT_SYSTEM ─────> Rendered HTML sections
```

## Boundary Rules

- THEME_SYSTEM owns all color and typography tokens; no other system defines visual values
- INTERACTIVE_SYSTEM is entirely client-side; it reads no server state and makes no external requests
- META_SYSTEM owns all external GitHub links; other systems do not construct external URLs
- PRESENTATION_SYSTEM reads `.rootspec.json` at build time; it does not read it at runtime
- CONTENT_SYSTEM owns the author's notes text verbatim; no system transforms or summarizes it

## Shared Patterns

- All interactive components use the same expand/collapse animation pattern (defined in THEME_SYSTEM)
- All external links open in new tab with `rel="noopener noreferrer"`
- All interactive elements implement keyboard accessibility (focus management, ARIA attributes)
- Mobile breakpoint is the single responsive threshold (defined in LAYOUT_SYSTEM)
- All section anchors follow the pattern `#section-name` for nav link targeting
