# Level 4: Systems Overview

*References: 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md*

## System Map

The RootSpec marketing site is a static site with client-side interactivity. All systems run in the browser; there are no external API calls or server-side data processing.

| System | Responsibility | File |
|--------|---------------|------|
| **CONTENT_SYSTEM** | Static page content, copywriting structure, version data | CONTENT_SYSTEM.md |
| **THEME_SYSTEM** | Dark/light mode detection, manual toggle, persistence | THEME_SYSTEM.md |
| **LAYOUT_SYSTEM** | Responsive layout, navigation, section structure | LAYOUT_SYSTEM.md |
| **INTERACTIVE_SYSTEM** | Hierarchy Explorer, Spec Wizard, Before/After Comparison | INTERACTIVE_SYSTEM.md |
| **FRAMEWORK_SYSTEM** | Build framework, component model, asset pipeline | FRAMEWORK_SYSTEM.md |

## System Interactions

| Source System | Interacts With | Interaction |
|--------------|----------------|-------------|
| CONTENT_SYSTEM | LAYOUT_SYSTEM | Provides content to render into layout slots |
| CONTENT_SYSTEM | FRAMEWORK_SYSTEM | Reads `.rootspec.json` for version badge data |
| THEME_SYSTEM | LAYOUT_SYSTEM | Applies theme class to root element; layout responds |
| THEME_SYSTEM | INTERACTIVE_SYSTEM | Interactive components observe theme state |
| LAYOUT_SYSTEM | INTERACTIVE_SYSTEM | Provides responsive breakpoint context |
| INTERACTIVE_SYSTEM | THEME_SYSTEM | Reads current theme to style interactive components |
| FRAMEWORK_SYSTEM | All systems | Provides build pipeline, routing, component primitives |

## Data Flow

```
.rootspec.json
    ↓ (build-time read)
CONTENT_SYSTEM → version badge data → LAYOUT_SYSTEM → rendered hero/header

User loads page
    ↓
THEME_SYSTEM detects system preference → applies class to <html>
    ↓
LAYOUT_SYSTEM renders responsive structure
    ↓
INTERACTIVE_SYSTEM mounts React components into Astro layout
    ↓
User interacts → INTERACTIVE_SYSTEM handles state → no external calls
```

## Boundaries

- **No external API calls** — All data is static or generated client-side from user input
- **No authentication** — Anonymous visitors only
- **No persistence except theme** — Theme preference stored in `localStorage`; wizard state is session-only
- **No server-side rendering of interactive state** — React components hydrate client-side

## Key Constraints

- Build-time: Read `.rootspec.json` version at build time; bake into rendered output (not runtime fetch)
- Runtime: Interactive features must function without network access after initial page load
- Progressive: Core marketing content must be readable without JavaScript
