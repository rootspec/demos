# Level 4: Systems Overview

References: [L1: Foundational Philosophy], [L2: Stable Truths], [L3: Interaction Architecture]

## System Map

| System | Responsibility | Owned Data |
|---|---|---|
| CONTENT_SYSTEM | Static page sections and copy | Section text, problem statements, feature descriptions |
| INTERACTIVE_SYSTEM | Client-side interactive components | Wizard state, explorer state, comparison toggle state |
| LAYOUT_SYSTEM | Page structure, navigation, theming | Theme preference, scroll state, viewport breakpoints |
| PRESENTATION_SYSTEM | Visual design tokens, animation | Design tokens, motion parameters |
| THEME_SYSTEM | Dark/light mode detection and persistence | System preference, user override, local storage state |

## System Interactions

| From | To | Interaction |
|---|---|---|
| LAYOUT_SYSTEM | THEME_SYSTEM | Requests current theme on mount; receives updates on toggle |
| LAYOUT_SYSTEM | CONTENT_SYSTEM | Renders section components within page regions |
| LAYOUT_SYSTEM | INTERACTIVE_SYSTEM | Embeds interactive components in designated sections |
| INTERACTIVE_SYSTEM | PRESENTATION_SYSTEM | Reads animation timing and transition parameters |
| THEME_SYSTEM | PRESENTATION_SYSTEM | Switches active token set (dark or light) |
| CONTENT_SYSTEM | PRESENTATION_SYSTEM | Consumes typography and spacing tokens for rendering |

## Data Flow

```
User Browser
  └── LAYOUT_SYSTEM (page shell, navigation, regions)
        ├── THEME_SYSTEM (reads system preference, persists toggle)
        │     └── PRESENTATION_SYSTEM (applies token set)
        ├── CONTENT_SYSTEM (static sections: hero, problem, how-it-works, CTA)
        │     └── PRESENTATION_SYSTEM (typography, spacing)
        └── INTERACTIVE_SYSTEM (hierarchy explorer, spec wizard, comparison)
              └── PRESENTATION_SYSTEM (animation, motion)
```

## Key Boundaries

- **No cross-system state sharing at runtime** — each system manages its own state; communication is via props or events
- **INTERACTIVE_SYSTEM is entirely client-side** — no server calls, no external API dependencies
- **CONTENT_SYSTEM is static** — content is authored at build time, not fetched at runtime
- **THEME_SYSTEM is authoritative for theme state** — no other system decides or stores the current theme
- **PRESENTATION_SYSTEM is read-only at runtime** — tokens are defined at build/design time, not mutated by user actions
