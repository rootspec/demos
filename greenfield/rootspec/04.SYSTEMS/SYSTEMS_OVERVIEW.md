# Level 4: Systems Overview
<!-- L4: HOW it's built — References L1-3 + Sibling L4 + External only -->

## System Map

| System              | Responsibility                                              | Primary Data Owned                    |
|---------------------|-------------------------------------------------------------|---------------------------------------|
| CONTENT_SYSTEM      | Static page content, copy, and structure                    | Sections, headings, paragraphs, links |
| INTERACTIVE_SYSTEM  | Client-side interactive components                          | UI state for explorer, wizard, toggle |
| LAYOUT_SYSTEM       | Page structure, responsive grid, navigation                  | Layout tokens, breakpoints, z-layers  |
| PRESENTATION_SYSTEM | Visual design tokens, theme, animation                      | Colors, typography, motion values     |
| THEME_SYSTEM        | Dark/light mode detection, persistence, switching           | Theme preference, system detection    |

---

## System Interactions

| Source              | Target              | What crosses the boundary                                  |
|---------------------|---------------------|------------------------------------------------------------|
| CONTENT_SYSTEM      | LAYOUT_SYSTEM       | Section structure and content slots                        |
| CONTENT_SYSTEM      | INTERACTIVE_SYSTEM  | Initial data for wizard templates and explorer content     |
| INTERACTIVE_SYSTEM  | PRESENTATION_SYSTEM | Dynamic class changes, animation triggers                  |
| INTERACTIVE_SYSTEM  | THEME_SYSTEM        | Theme toggle user action                                   |
| LAYOUT_SYSTEM       | PRESENTATION_SYSTEM | Spacing and grid tokens consumed by visual rules           |
| THEME_SYSTEM        | PRESENTATION_SYSTEM | Active theme class applied to root element                 |

---

## Data Flow

```
User action
    ↓
INTERACTIVE_SYSTEM (handles interaction, updates UI state)
    ↓
PRESENTATION_SYSTEM (applies visual changes via class/token changes)
    ↑
THEME_SYSTEM (provides active theme context)
    ↑
CONTENT_SYSTEM (provides static content to all systems)
    ↑
LAYOUT_SYSTEM (provides structural context for all rendering)
```

---

## Deployment Context

The site is a static build deployed to GitHub Pages at `/demos/greenfield/`. All systems must operate correctly under this subpath. No server-side rendering. No API calls. All interactivity is client-side JavaScript.

The build reads `.rootspec.json` at build time to extract the framework version for the version badge. This is the only build-time data read from outside the source directory.
