# Level 4: Systems Overview

## System Map

| System              | Responsibility                                                        | Owns                               |
|---------------------|-----------------------------------------------------------------------|------------------------------------|
| CONTENT_SYSTEM      | Static page content, section text, and meta information               | Copy, version badge, banner links  |
| THEME_SYSTEM        | Dark/light mode preference detection, persistence, and transition     | Theme state, CSS custom properties |
| LAYOUT_SYSTEM       | Page structure, section ordering, responsive grid, scroll behavior    | DOM structure, breakpoints         |
| INTERACTIVE_SYSTEM  | Hierarchy Explorer, Spec Wizard, and Before/After Comparison state    | Component state, user inputs       |
| PRESENTATION_SYSTEM | Animations, transitions, visual feedback, and accessibility           | Motion, reduced-motion handling    |

## System Interactions

| From                | To                   | Data / Signal                                    |
|---------------------|----------------------|--------------------------------------------------|
| CONTENT_SYSTEM      | LAYOUT_SYSTEM        | Section order, banner visibility                 |
| CONTENT_SYSTEM      | INTERACTIVE_SYSTEM   | Wizard templates, explorer content, comparison copy |
| THEME_SYSTEM        | LAYOUT_SYSTEM        | Active theme class applied to root element       |
| THEME_SYSTEM        | PRESENTATION_SYSTEM  | Transition duration for theme switch             |
| LAYOUT_SYSTEM       | PRESENTATION_SYSTEM  | Scroll position triggers animation entry points  |
| INTERACTIVE_SYSTEM  | PRESENTATION_SYSTEM  | State changes trigger visual feedback            |
| INTERACTIVE_SYSTEM  | CONTENT_SYSTEM       | Wizard output renders from template content      |

## Data Flow

```
Build Time:
  .rootspec.json → CONTENT_SYSTEM → version badge rendered into page

Runtime:
  System preference → THEME_SYSTEM → CSS class on <html>
  localStorage → THEME_SYSTEM → override preference

  Scroll → LAYOUT_SYSTEM → entry triggers → PRESENTATION_SYSTEM → animate sections

  User input → INTERACTIVE_SYSTEM → wizard state → CONTENT_SYSTEM templates
            → output skeleton rendered to DOM

  User click (explorer) → INTERACTIVE_SYSTEM → expanded levels
            → PRESENTATION_SYSTEM → animate expansion
```

## Boundaries

- No system makes external HTTP requests
- No system persists state beyond localStorage (theme preference only)
- INTERACTIVE_SYSTEM state is session-scoped (resets on page reload except theme)
- CONTENT_SYSTEM data is build-time only; no runtime fetching
