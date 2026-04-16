# Level 4: Systems Overview

> References: L1 (01.PHILOSOPHY.md), L2 (02.TRUTHS.md), L3 (03.INTERACTIONS.md)

## System Map

| System | Responsibility | Technology |
|--------|---------------|------------|
| CONTENT_SYSTEM | Static page content, sections, copy | Astro components |
| THEME_SYSTEM | Dark/light mode, system preference, toggle | CSS custom properties + localStorage |
| INTERACTIVE_SYSTEM | Hierarchy Explorer, Spec Wizard, Before/After | React islands (client-side) |
| LAYOUT_SYSTEM | Responsive grid, navigation, base structure | Astro Layout + Tailwind CSS |
| PRESENTATION_SYSTEM | Animations, transitions, visual polish | CSS animations + Tailwind |

## System Interactions

| From | To | Data / Trigger |
|------|----|----------------|
| THEME_SYSTEM | CONTENT_SYSTEM | CSS class on `<html>` (`dark` / `light`) |
| THEME_SYSTEM | INTERACTIVE_SYSTEM | CSS variables inherited by React components |
| LAYOUT_SYSTEM | CONTENT_SYSTEM | Slot-based composition; Layout wraps all pages |
| INTERACTIVE_SYSTEM | CONTENT_SYSTEM | None — React islands are self-contained |
| PRESENTATION_SYSTEM | CONTENT_SYSTEM | CSS classes applied to section wrappers |
| PRESENTATION_SYSTEM | INTERACTIVE_SYSTEM | Shared animation tokens via CSS variables |

## Data Flow

```
Build time:
  .rootspec.json → version string → CONTENT_SYSTEM (Header, Hero version badge)
  SEED.md links → absolute GitHub URLs → CONTENT_SYSTEM (Meta Banner)

Runtime (client-side only):
  localStorage → THEME_SYSTEM → CSS class on <html>
  User input → INTERACTIVE_SYSTEM (Wizard) → rendered skeleton spec (ephemeral)
  User interaction → INTERACTIVE_SYSTEM (Explorer) → local component state (ephemeral)
  Drag/toggle → INTERACTIVE_SYSTEM (Comparison) → local component state (ephemeral)
```

## No External Data Sources

All runtime data is either:
- Injected at build time (version, URLs)
- Generated from user interaction (Wizard output)
- Static (comparison panel content, hierarchy level descriptions)

No API calls. No CDN-loaded fonts or scripts (or explicitly self-hosted).
