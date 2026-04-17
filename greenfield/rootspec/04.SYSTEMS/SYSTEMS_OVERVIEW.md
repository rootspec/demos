# Level 4: Systems Overview

**References:** `01.PHILOSOPHY.md`, `02.TRUTHS.md`, `03.INTERACTIONS.md`

---

## System Map

| System | Responsibility | Primary Consumers |
|--------|---------------|-------------------|
| [CONTENT_SYSTEM](CONTENT_SYSTEM.md) | Static page content, copy, section structure | All page sections |
| [THEME_SYSTEM](THEME_SYSTEM.md) | Dark/light mode detection, manual toggle, persistence | All visual elements |
| [INTERACTIVE_SYSTEM](INTERACTIVE_SYSTEM.md) | Hierarchy Explorer, Spec Wizard, Before/After Comparison | Interactive sections |
| [LAYOUT_SYSTEM](LAYOUT_SYSTEM.md) | Responsive layout, navigation, meta banner, page structure | Top-level page structure |
| [PRESENTATION_SYSTEM](PRESENTATION_SYSTEM.md) | Animations, transitions, visual polish, reduced-motion support | All animated elements |

---

## System Interactions

| From | To | Data / Signal |
|------|----|---------------|
| THEME_SYSTEM | All visual elements | Current theme mode (dark/light) |
| CONTENT_SYSTEM | LAYOUT_SYSTEM | Section content, copy blocks |
| INTERACTIVE_SYSTEM | PRESENTATION_SYSTEM | Animation trigger events |
| LAYOUT_SYSTEM | INTERACTIVE_SYSTEM | Viewport size, breakpoint signals |
| THEME_SYSTEM | INTERACTIVE_SYSTEM | Theme state for interactive component rendering |

---

## Data Flow

```
Build time:
  .rootspec.json → CONTENT_SYSTEM → version badge in LAYOUT_SYSTEM

Runtime (client-side only):
  System preference → THEME_SYSTEM → visual state
  User toggle → THEME_SYSTEM → localStorage → visual state

  User scroll → PRESENTATION_SYSTEM → section fade-in
  User click/tap → INTERACTIVE_SYSTEM → expanded state → PRESENTATION_SYSTEM → animation

  Spec Wizard input → INTERACTIVE_SYSTEM → template engine → skeleton spec output
```

---

## Key Boundaries

- **No runtime external calls** — all data is either build-time static or user-generated client-side
- **No shared mutable state across systems** — each system owns its own state
- **THEME_SYSTEM is the single source of truth for visual mode** — no system inlines dark/light styles without reading from THEME_SYSTEM
- **INTERACTIVE_SYSTEM uses structured templates only** — no AI, no external API, no server

---

## Technology Context

- Static site framework (Astro or similar) for build-time rendering
- React or similar component library for interactive client-side sections
- Tailwind CSS or similar utility framework for styling
- No backend, no database, no authentication
- Deployed at subpath `/demos/greenfield/` — all asset paths must account for base path
