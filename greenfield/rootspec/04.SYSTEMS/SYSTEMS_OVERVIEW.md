# Level 4: Systems Overview

**Product:** RootSpec Marketing Site
**Level:** L4 — HOW It's Built (System Map)
**References:** L1-3 + Sibling L4 + External

---

## System Map

| System | Responsibility | Primary Output |
|--------|---------------|----------------|
| CONTENT_SYSTEM | Static marketing copy, section structure, the meta banner | Rendered HTML sections |
| THEME_SYSTEM | Dark/light mode detection, manual toggle, persistence | CSS variables, body class |
| INTERACTIVE_SYSTEM | Hierarchy Explorer, Spec Wizard, Before/After Comparison | React island components |
| LAYOUT_SYSTEM | Page structure, responsive behavior, section ordering | Astro layout and page wrapper |
| FRAMEWORK_SYSTEM | Build-time version reading, GitHub link generation | Injected version string |

---

## System Interactions

| From | To | Interaction |
|------|----|-------------|
| LAYOUT_SYSTEM | CONTENT_SYSTEM | Renders content sections in defined order |
| LAYOUT_SYSTEM | INTERACTIVE_SYSTEM | Mounts React islands at designated positions |
| LAYOUT_SYSTEM | THEME_SYSTEM | Applies theme class at root; toggle button rendered in header |
| FRAMEWORK_SYSTEM | CONTENT_SYSTEM | Provides version string to hero and header at build time |
| FRAMEWORK_SYSTEM | CONTENT_SYSTEM | Provides GitHub repo URLs to meta banner and CTA |
| THEME_SYSTEM | INTERACTIVE_SYSTEM | Interactive components respect inherited CSS variables |

---

## Data Flow

```
Build time:
  .rootspec.json → FRAMEWORK_SYSTEM → version string → CONTENT_SYSTEM (hero, header)

Runtime (page load):
  prefers-color-scheme → THEME_SYSTEM → body class → CSS variables
  localStorage → THEME_SYSTEM → persisted preference overrides system

Runtime (user interaction):
  User action → INTERACTIVE_SYSTEM → component state → rendered output
  Theme toggle → THEME_SYSTEM → body class update → localStorage write
```

---

## Boundaries

- **FRAMEWORK_SYSTEM** operates only at build time. It has no runtime behavior.
- **THEME_SYSTEM** operates only in the browser. The server renders with a neutral/default state; hydration applies the correct theme without flash.
- **INTERACTIVE_SYSTEM** is entirely client-side. No server rendering of dynamic interaction states.
- **CONTENT_SYSTEM** is static — no runtime data fetching, no CMS.
- **LAYOUT_SYSTEM** is the Astro shell; it coordinates all other systems but owns no business logic.

---

## Technology Anchors

- Astro (static site generator, island architecture)
- React (interactive island components)
- Tailwind CSS (styling via utility classes)
- `localStorage` (theme preference persistence)
- `.rootspec.json` (build-time version source)
