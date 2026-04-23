# Level 4: Systems Overview

## System Map

| System | Responsibility | Key Data |
|--------|---------------|----------|
| PRESENTATION_SYSTEM | Page layout, typography, theme, responsive behavior | Theme state, viewport |
| CONTENT_SYSTEM | Static content, copy, version data, GitHub links | Version, section content |
| INTERACTIVE_SYSTEM | Hierarchy explorer, spec wizard, comparison view | Explorer state, wizard state |
| LAYOUT_SYSTEM | Section structure, navigation, meta-banner | Scroll position, active section |
| THEME_SYSTEM | Light/dark mode, color tokens, preference persistence | Theme preference |

## System Interactions

| From | To | Interaction |
|------|----|-------------|
| THEME_SYSTEM | PRESENTATION_SYSTEM | Provides active theme tokens; PRESENTATION_SYSTEM applies them to all components |
| CONTENT_SYSTEM | LAYOUT_SYSTEM | Supplies version badge, meta-banner text, and GitHub URLs |
| CONTENT_SYSTEM | INTERACTIVE_SYSTEM | Supplies wizard templates, hierarchy level definitions |
| LAYOUT_SYSTEM | PRESENTATION_SYSTEM | Provides section structure; PRESENTATION_SYSTEM renders sections |
| INTERACTIVE_SYSTEM | PRESENTATION_SYSTEM | Provides interactive component state; PRESENTATION_SYSTEM renders current state |

## Data Flow

```
Build Time:
  .rootspec.json → CONTENT_SYSTEM (version, status)
  GitHub URLs (hardcoded) → CONTENT_SYSTEM (meta-banner links)

Runtime:
  localStorage → THEME_SYSTEM (persisted preference)
  prefers-color-scheme → THEME_SYSTEM (system default)
  THEME_SYSTEM → PRESENTATION_SYSTEM (active CSS class / data attribute)

User Interaction:
  User click/tap → INTERACTIVE_SYSTEM (state update)
  INTERACTIVE_SYSTEM → PRESENTATION_SYSTEM (re-render affected component)
  Theme toggle → THEME_SYSTEM → PRESENTATION_SYSTEM
```

## Boundaries

- No system makes external network requests at runtime
- INTERACTIVE_SYSTEM contains all client-side JS logic; PRESENTATION_SYSTEM is primarily declarative
- CONTENT_SYSTEM owns all copy and data; no other system hardcodes content strings
- THEME_SYSTEM owns the single source of truth for active theme; no other system writes to localStorage directly
