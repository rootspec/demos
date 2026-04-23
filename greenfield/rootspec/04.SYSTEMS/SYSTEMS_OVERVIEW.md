# Level 4: Systems Overview

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md
**Purpose:** How the site is built — system boundaries, responsibilities, and interactions

---

## System Map

| System | Responsibility | Primary Output |
|--------|---------------|----------------|
| [CONTENT_SYSTEM](CONTENT_SYSTEM.md) | Site sections, copy, and static content delivery | Rendered HTML sections |
| [THEME_SYSTEM](THEME_SYSTEM.md) | Light/dark theme, typography tokens, color palette | CSS custom properties, theme state |
| [INTERACTIVE_SYSTEM](INTERACTIVE_SYSTEM.md) | Hierarchy explorer and spec wizard logic | Interactive component state |
| [LAYOUT_SYSTEM](LAYOUT_SYSTEM.md) | Responsive layout, navigation, header, footer | Page structure and responsive breakpoints |
| [PRESENTATION_SYSTEM](PRESENTATION_SYSTEM.md) | Before/after comparison, version badge, meta-banner | Rendered UI elements |

---

## System Interactions

| From | To | Interaction |
|------|----|-------------|
| THEME_SYSTEM | All systems | Provides CSS custom properties consumed by all rendered components |
| LAYOUT_SYSTEM | CONTENT_SYSTEM | Wraps content sections in layout containers |
| LAYOUT_SYSTEM | INTERACTIVE_SYSTEM | Hosts interactive components within section slots |
| PRESENTATION_SYSTEM | CONTENT_SYSTEM | Reads version from `.rootspec.json` for version badge display |
| INTERACTIVE_SYSTEM | THEME_SYSTEM | Interactive components respect current theme tokens |
| LAYOUT_SYSTEM | THEME_SYSTEM | Navigation header hosts theme toggle control |

---

## Data Flow

```
Build time:
  .rootspec.json → version field → PRESENTATION_SYSTEM (version badge, meta-banner)
  SEED.md / spec files → GitHub URLs → PRESENTATION_SYSTEM (meta-banner links)

Runtime (client):
  User system preference → THEME_SYSTEM → initial theme state
  LocalStorage → THEME_SYSTEM → persisted theme preference
  User input (wizard steps) → INTERACTIVE_SYSTEM → skeleton spec output
  User clicks (explorer) → INTERACTIVE_SYSTEM → expanded level state
  User toggle (theme) → THEME_SYSTEM → page re-theme
```

---

## Architectural Constraints

- All systems produce static, pre-rendered output. No server-side API calls at runtime.
- Interactive systems (wizard, explorer) run entirely in the browser. No data leaves the client.
- The THEME_SYSTEM is the single source of truth for all visual tokens — no hardcoded colors or fonts in components.
- The PRESENTATION_SYSTEM reads the version once at build time and embeds it statically.
- No external CDN dependencies for fonts or icons — all assets must be bundled or system fonts.
