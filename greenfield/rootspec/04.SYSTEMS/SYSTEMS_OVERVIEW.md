# Level 4: Systems Overview
# RootSpec Marketing Site

## System Map

| System | Responsibility | Primary Data |
|--------|----------------|-------------|
| **CONTENT_SYSTEM** | Static page content, section text, real examples | Markdown/HTML content, SEED reference |
| **THEME_SYSTEM** | Dark/light mode detection, toggle, persistence | `prefers-color-scheme`, `localStorage` preference |
| **INTERACTIVE_SYSTEM** | Hierarchy explorer, spec wizard, before/after toggle | Wizard state, explorer expansion state |
| **LAYOUT_SYSTEM** | Page structure, sticky nav, scroll behavior, responsive breakpoints | Viewport dimensions, scroll position |
| **FRAMEWORK_INTEGRATION** | Build-time config injection (version badge), static site output | `.rootspec.json`, build environment |

## System Interaction Table

| From | To | Interaction |
|------|----|-------------|
| FRAMEWORK_INTEGRATION | CONTENT_SYSTEM | Provides version string at build time for version badge |
| THEME_SYSTEM | LAYOUT_SYSTEM | Applies theme class/attribute to root element; all layout tokens respond |
| LAYOUT_SYSTEM | INTERACTIVE_SYSTEM | Provides viewport breakpoint context; determines mobile vs. desktop layout for components |
| INTERACTIVE_SYSTEM | CONTENT_SYSTEM | Reads static content templates for wizard output and hierarchy level descriptions |
| LAYOUT_SYSTEM | CONTENT_SYSTEM | Renders content sections in scroll order; activates section animations on first viewport entry |

## Data Flow

```
Build time:
  .rootspec.json → FRAMEWORK_INTEGRATION → version string → CONTENT_SYSTEM (version badge)

Page load:
  OS preference → THEME_SYSTEM → root attribute → all styled elements

User scroll:
  Scroll position → LAYOUT_SYSTEM → section visibility → animation trigger → CONTENT_SYSTEM

User interacts with wizard:
  Input → INTERACTIVE_SYSTEM → state update → output render → CONTENT_SYSTEM (template)

User toggles theme:
  Click → THEME_SYSTEM → localStorage write → root attribute update → all styled elements

User toggles before/after:
  Click → INTERACTIVE_SYSTEM → panel state update → CONTENT_SYSTEM (real panel content)
```

## Shared Boundaries

- **No system makes external API calls** — all data is local or build-time injected
- **No system writes to a backend** — THEME_SYSTEM writes only to `localStorage`
- **INTERACTIVE_SYSTEM never owns content** — content strings live in CONTENT_SYSTEM; INTERACTIVE_SYSTEM reads and renders them
- **FRAMEWORK_INTEGRATION is build-only** — it has no runtime presence except the injected version value
- **All systems respect THEME_SYSTEM state** — theme is the only global runtime state that crosses all system boundaries
