# Level 4: Systems Overview

**Version:** 7.3.2
**Status:** Draft

---

## System Map

| System | Responsibility | Key Data Owned |
|--------|---------------|----------------|
| [CONTENT_SYSTEM](CONTENT_SYSTEM.md) | Static page sections, copy, meta-banner, CTA | Section text, version badge, GitHub URLs |
| [THEME_SYSTEM](THEME_SYSTEM.md) | Dark/light mode detection and toggle | Theme preference state |
| [INTERACTIVE_SYSTEM](INTERACTIVE_SYSTEM.md) | Hierarchy Explorer, Spec Wizard, Before/After Comparison | Wizard step state, selected pillars, comparison toggle state |
| [LAYOUT_SYSTEM](LAYOUT_SYSTEM.md) | Responsive layout, scroll behavior, section transitions | Viewport state, scroll position |
| [PRESENTATION_SYSTEM](PRESENTATION_SYSTEM.md) | Animation, accessibility, keyboard navigation | Focus state, animation state |

## System Interactions

| From | To | Interaction |
|------|----|-------------|
| THEME_SYSTEM | CONTENT_SYSTEM | Applies theme class to root; all content styles respond |
| THEME_SYSTEM | INTERACTIVE_SYSTEM | Interactive components inherit theme |
| LAYOUT_SYSTEM | CONTENT_SYSTEM | Sections rendered within layout shell |
| LAYOUT_SYSTEM | INTERACTIVE_SYSTEM | Interactive components adapt to viewport size |
| PRESENTATION_SYSTEM | INTERACTIVE_SYSTEM | Animations triggered by interaction state changes |
| PRESENTATION_SYSTEM | LAYOUT_SYSTEM | Scroll-triggered animations on section entry |
| CONTENT_SYSTEM | INTERACTIVE_SYSTEM | Wizard output is presented as spec content |

## Data Flow

```
User Input / System Preference
        │
        ▼
  THEME_SYSTEM ──────────────────────────────────────────┐
        │                                                  │
        ▼                                                  ▼
  LAYOUT_SYSTEM                                    (theme applied)
        │
        ▼
  CONTENT_SYSTEM ◄──── .rootspec.json (version at build time)
        │
        ▼
  INTERACTIVE_SYSTEM ◄──── User Interaction Events
        │
        ▼
  PRESENTATION_SYSTEM (animates, enforces accessibility)
```

## Boundary Rules

- No system makes external API calls at runtime
- CONTENT_SYSTEM reads `.rootspec.json` at build/render time only — not at runtime
- INTERACTIVE_SYSTEM state is ephemeral (session-only, not persisted)
- THEME_SYSTEM preference is the only state that persists (via localStorage or CSS media query)
- All systems share the same DOM; no iframes or shadow DOM boundaries
