# Level 4: Systems Overview

**Product:** RootSpec Marketing Site
**Version:** 1.0.0
**Last Updated:** 2026-04-12

---

## System Map

The RootSpec Marketing Site is composed of five systems. All systems are client-side; there is no backend.

| System | Responsibility | Primary Section(s) |
|--------|---------------|-------------------|
| **CONTENT_SYSTEM** | Static page sections, copy, and structure | Hero, Problem, How It Works, CTA, Footer |
| **THEME_SYSTEM** | Dark/light mode preference, CSS tokens, system preference detection | Site-wide |
| **INTERACTIVE_SYSTEM** | Hierarchy Explorer, Spec Wizard, Before/After Comparison | Interactive sections |
| **LAYOUT_SYSTEM** | Responsive layout, navigation, meta banner, version badge | Site-wide |
| **FRAMEWORK_SYSTEM** | Build pipeline, static generation, deployment, asset serving | Infrastructure |

---

## System Interactions

| From | To | Interaction |
|------|----|----|
| LAYOUT_SYSTEM | CONTENT_SYSTEM | Layout wraps content sections; version badge reads from build-time config |
| LAYOUT_SYSTEM | THEME_SYSTEM | Header contains theme toggle; layout applies theme class to root element |
| THEME_SYSTEM | CONTENT_SYSTEM | Theme tokens applied to all content elements via CSS custom properties |
| THEME_SYSTEM | INTERACTIVE_SYSTEM | Interactive sections consume theme tokens; no direct coupling |
| INTERACTIVE_SYSTEM | CONTENT_SYSTEM | Wizard output displays as formatted spec content in the interactive section |
| FRAMEWORK_SYSTEM | LAYOUT_SYSTEM | Framework renders layout at build time; provides routing and asset pipeline |
| FRAMEWORK_SYSTEM | CONTENT_SYSTEM | Framework reads `.rootspec.json` version at build time; passes to content |

---

## Data Flow

```
Build time:
  .rootspec.json → FRAMEWORK_SYSTEM → version string → LAYOUT_SYSTEM (version badge)

Runtime (client):
  System preference (prefers-color-scheme) → THEME_SYSTEM → CSS custom properties → all systems
  User toggle click → THEME_SYSTEM → localStorage → persisted preference

Runtime (wizard):
  User text input → INTERACTIVE_SYSTEM → template engine → skeleton spec output
  User pillar selections → INTERACTIVE_SYSTEM → skeleton spec output

Runtime (explorer):
  User click/keyboard → INTERACTIVE_SYSTEM → expanded level state → DOM update

Runtime (before/after):
  User slider/toggle → INTERACTIVE_SYSTEM → visible panel state → DOM update
```

---

## Boundaries

- **CONTENT_SYSTEM** owns all marketing copy and static section structure. It does not manage state.
- **THEME_SYSTEM** owns the single source of truth for the active theme. All other systems read from CSS custom properties — they do not check localStorage directly.
- **INTERACTIVE_SYSTEM** owns all client-side state for interactive sections. It does not modify global layout or theme.
- **LAYOUT_SYSTEM** owns the wrapper structure: header, footer, navigation, meta banner. It does not own section content.
- **FRAMEWORK_SYSTEM** owns the build pipeline and static generation configuration. It is the only system with access to build-time environment and config files.

---

## Key Shared Concerns

- **Accessibility:** All systems must produce accessible output. ARIA attributes, keyboard focus management, and screen reader labels are the responsibility of the system that renders the relevant element.
- **Responsive behavior:** LAYOUT_SYSTEM defines breakpoints as CSS custom properties. All other systems inherit responsive behavior through the shared layout grid and token system.
- **No external dependencies at runtime:** No system may make HTTP requests at runtime. All data is either build-time static or derived from user input via client-side templates.
