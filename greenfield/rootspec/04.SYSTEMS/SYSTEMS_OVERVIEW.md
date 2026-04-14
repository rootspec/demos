# Level 4: Systems Overview

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md

---

## System Map

The RootSpec marketing site is composed of six systems. All are client-side; there is no backend.

| System                  | Responsibility                                                    | File                          |
|-------------------------|-------------------------------------------------------------------|-------------------------------|
| CONTENT_SYSTEM          | Static page content, section layout, copy, and metadata           | CONTENT_SYSTEM.md             |
| THEME_SYSTEM            | Dark/light mode detection, toggle, and persistence                | THEME_SYSTEM.md               |
| INTERACTIVE_SYSTEM      | Hierarchy Explorer, Spec Wizard, and Before/After Comparison      | INTERACTIVE_SYSTEM.md         |
| LAYOUT_SYSTEM           | Responsive layout, section structure, navigation anchors          | LAYOUT_SYSTEM.md              |
| FRAMEWORK_SYSTEM        | Version badge sourcing, meta-banner links, spec file references   | FRAMEWORK_SYSTEM.md           |

---

## System Interactions

| From                | To                  | Interaction                                                                 |
|---------------------|---------------------|-----------------------------------------------------------------------------|
| FRAMEWORK_SYSTEM    | CONTENT_SYSTEM      | Provides version string and GitHub URLs for injection into static content    |
| THEME_SYSTEM        | LAYOUT_SYSTEM       | Provides active theme class; LAYOUT_SYSTEM applies it to root element        |
| INTERACTIVE_SYSTEM  | LAYOUT_SYSTEM       | Interactive components are placed within LAYOUT_SYSTEM section slots         |
| CONTENT_SYSTEM      | LAYOUT_SYSTEM       | Content is rendered inside layout section containers                        |
| THEME_SYSTEM        | INTERACTIVE_SYSTEM  | Interactive components respond to active theme for consistent styling        |

---

## Data Flow

```
Build time:
  .rootspec.json ──► FRAMEWORK_SYSTEM ──► version string ──► CONTENT_SYSTEM (hero, header)
  GitHub URLs (hardcoded in FRAMEWORK_SYSTEM) ──► CONTENT_SYSTEM (meta-banner)

Runtime:
  System preference API ──► THEME_SYSTEM ──► root CSS class ──► all components
  localStorage ──────────► THEME_SYSTEM ──► overrides system preference on return visits
  User input ────────────► INTERACTIVE_SYSTEM (wizard, explorer) ──► local component state (no persistence)
```

---

## Boundaries

- No system makes external API calls at runtime
- No system shares mutable global state (each interactive component is isolated)
- FRAMEWORK_SYSTEM reads `.rootspec.json` at build time only — not at runtime
- THEME_SYSTEM is the only system that reads/writes localStorage
- All GitHub URLs are owned by FRAMEWORK_SYSTEM; other systems import them, never hardcode them

---

## Technology Stack

- **Framework:** Astro (static site generation with component islands)
- **UI components:** React (for interactive islands: Hierarchy Explorer, Spec Wizard, Comparison toggle)
- **Styling:** Tailwind CSS with dark mode class strategy
- **Language:** TypeScript
- **Hosting:** Static files (no server)
