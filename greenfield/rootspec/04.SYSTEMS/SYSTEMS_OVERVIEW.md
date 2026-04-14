# Level 4: Systems Overview

> References: 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md

## System Map

The marketing site is composed of five primary systems. All systems are static-first with progressive enhancement; no server-side state.

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION_SYSTEM                       │
│  (Layout, Theme, Navigation, Section rendering)             │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  CONTENT_SYSTEM  │  │INTERACTIVE_SYSTEM│                │
│  │  (Static copy,   │  │(Hierarchy, Wizard│                │
│  │   meta banner,   │  │ Before/After,    │                │
│  │   version badge) │  │ Comparison)      │                │
│  └──────────────────┘  └──────────────────┘                │
│                                                             │
│  ┌──────────────────────────────────────────────┐          │
│  │            THEME_SYSTEM                       │          │
│  │  (Dark/light, tokens, animation timing)       │          │
│  └──────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

## Systems

| System | Responsibility | Primary File(s) |
|--------|---------------|-----------------|
| [PRESENTATION_SYSTEM](PRESENTATION_SYSTEM.md) | Layout, page structure, responsive grid, section orchestration | Layout.astro, index.astro |
| [CONTENT_SYSTEM](CONTENT_SYSTEM.md) | Static text content, meta banner, version badge, external links | Content components, version reading |
| [INTERACTIVE_SYSTEM](INTERACTIVE_SYSTEM.md) | Hierarchy Explorer, Spec Wizard, Before/After comparison | React/TSX components |
| [THEME_SYSTEM](THEME_SYSTEM.md) | Dark/light mode, design tokens, animation parameters | global.css, theme provider |
| [LAYOUT_SYSTEM](LAYOUT_SYSTEM.md) | Responsive breakpoints, spacing scale, typography scale | Tailwind config, CSS variables |

## System Interactions

| Interaction | From | To | Data/Signal |
|-------------|------|----|-------------|
| Theme application | THEME_SYSTEM | PRESENTATION_SYSTEM | CSS class toggle (dark/light) |
| Content rendering | CONTENT_SYSTEM | PRESENTATION_SYSTEM | Static HTML/Astro components |
| Interactive mounting | INTERACTIVE_SYSTEM | PRESENTATION_SYSTEM | Client-side hydration |
| Token consumption | LAYOUT_SYSTEM | PRESENTATION_SYSTEM, CONTENT_SYSTEM, INTERACTIVE_SYSTEM | CSS custom properties |
| Theme state | THEME_SYSTEM | INTERACTIVE_SYSTEM | CSS class (interactive components respond) |

## Data Flow

All data flows are one-directional and client-side:

1. **Build time:** Version number read from `.rootspec.json` → injected into CONTENT_SYSTEM
2. **Load time:** `prefers-color-scheme` → THEME_SYSTEM initializes → CSS class applied to `<html>`
3. **Interaction time:** User action → INTERACTIVE_SYSTEM state update → DOM re-render (client-side only)
4. **No persistence:** Wizard output, theme preference (session only), no server writes

## Boundaries

- No system makes network requests at runtime
- No system shares mutable state across components (each interactive component is self-contained)
- THEME_SYSTEM is the only system that touches the root `<html>` element
- CONTENT_SYSTEM owns all external link URLs — INTERACTIVE_SYSTEM does not hardcode URLs
