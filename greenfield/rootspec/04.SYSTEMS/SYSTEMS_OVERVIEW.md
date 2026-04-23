# Level 4: Systems Overview

## System Map

| System | Responsibility | Key Data |
|--------|---------------|----------|
| **CONTENT_SYSTEM** | Manages all static and structured content for each page section | Section copy, hierarchy level definitions, comparison panel content |
| **THEME_SYSTEM** | Light/dark mode state, color tokens, typography tokens | Theme preference (localStorage), CSS custom properties |
| **INTERACTIVE_SYSTEM** | Hierarchy explorer and spec wizard state | Explorer active level, wizard step/answers |
| **LAYOUT_SYSTEM** | Responsive layout, section order, scroll behavior | Viewport breakpoints, section visibility |
| **PRESENTATION_SYSTEM** | Build-time data injection (version badge, GitHub URLs) | `.rootspec.json` version, absolute GitHub base URL |

## System Interactions

| From | To | What |
|------|----|------|
| PRESENTATION_SYSTEM | CONTENT_SYSTEM | Injects version string into hero/header content at build time |
| THEME_SYSTEM | LAYOUT_SYSTEM | Applies `data-theme` attribute to root; LAYOUT_SYSTEM uses CSS custom properties set by THEME_SYSTEM |
| INTERACTIVE_SYSTEM | CONTENT_SYSTEM | Reads hierarchy level definitions and wizard template data from CONTENT_SYSTEM |
| LAYOUT_SYSTEM | INTERACTIVE_SYSTEM | Provides viewport state (mobile vs. desktop) to control layout of interactive components |

## Data Flow

```
Build Time:
  PRESENTATION_SYSTEM reads .rootspec.json → injects version into CONTENT_SYSTEM templates

Runtime:
  User loads page
    → LAYOUT_SYSTEM arranges sections
    → THEME_SYSTEM reads localStorage, applies theme
    → CONTENT_SYSTEM renders static section content
    → INTERACTIVE_SYSTEM initializes with explorer/wizard data from CONTENT_SYSTEM

User toggles theme
    → THEME_SYSTEM updates localStorage, updates root attribute
    → CSS custom properties cascade to all visual elements

User interacts with Hierarchy Explorer
    → INTERACTIVE_SYSTEM updates active level state
    → INTERACTIVE_SYSTEM renders expanded content + reference highlights

User steps through Spec Wizard
    → INTERACTIVE_SYSTEM advances step, stores answers in component state
    → On completion, INTERACTIVE_SYSTEM renders skeleton spec output
```

## Boundaries

- **PRESENTATION_SYSTEM** operates only at build time; it has no runtime state
- **THEME_SYSTEM** is the sole owner of theme preference; no other system reads localStorage directly
- **INTERACTIVE_SYSTEM** does not persist any user input (wizard answers are session-only)
- **CONTENT_SYSTEM** is read-only at runtime; all content is static after build
- **LAYOUT_SYSTEM** owns breakpoint logic; other systems query it for viewport context, they do not compute breakpoints themselves
