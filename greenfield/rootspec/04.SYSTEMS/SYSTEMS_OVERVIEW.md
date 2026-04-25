# Level 4: Systems Overview

References: [01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md]

## System Map

The RootSpec marketing site is composed of five primary systems. All systems are client-side only — no backend, no authentication, no external API calls.

| System | Responsibility | Primary User |
|--------|---------------|-------------|
| [CONTENT_SYSTEM](CONTENT_SYSTEM.md) | Static page content, prose, and structured copy | Reader visitor |
| [THEME_SYSTEM](THEME_SYSTEM.md) | Light/dark mode, typography, color palette, visual tokens | All visitors |
| [HIERARCHY_EXPLORER](HIERARCHY_EXPLORER.md) | Interactive visualization of the five-level RootSpec hierarchy | Explorer visitor |
| [SPEC_WIZARD](SPEC_WIZARD.md) | Multi-step wizard for generating a skeleton spec from visitor input | Explorer visitor |
| [LAYOUT_SYSTEM](LAYOUT_SYSTEM.md) | Page structure, navigation, meta banner, responsive grid, header/footer | All visitors |

## System Interactions

| From | To | Interaction |
|------|----|-------------|
| LAYOUT_SYSTEM | THEME_SYSTEM | Reads current theme state to apply theme class to root element |
| LAYOUT_SYSTEM | CONTENT_SYSTEM | Provides structural containers into which content is rendered |
| THEME_SYSTEM | All systems | Provides CSS custom properties (color tokens) consumed by all components |
| HIERARCHY_EXPLORER | THEME_SYSTEM | Uses accent color tokens for hover and focus states |
| SPEC_WIZARD | THEME_SYSTEM | Uses form element tokens for input and button styles |
| CONTENT_SYSTEM | LAYOUT_SYSTEM | Content renders within layout section boundaries |

## Data Flow

```
User Input
    │
    ▼
SPEC_WIZARD ──── generates ──── Skeleton Spec Output (ephemeral, in-memory)

HIERARCHY_EXPLORER ──── reads ──── Static Level Definitions (bundled at build)

THEME_SYSTEM ──── reads ──── System Preference API (browser)
             ──── writes ─── Session State (in-memory toggle override)
             ──── exposes ── CSS Custom Properties (consumed by all)

CONTENT_SYSTEM ──── reads ──── Build-time data (.rootspec.json version field)
               ──── renders ── Static HTML (no dynamic data)

LAYOUT_SYSTEM ──── reads ──── THEME_SYSTEM (for root class)
              ──── renders ── Page shell, navigation, meta banner
```

## Shared Boundaries

- **No persistent storage:** No localStorage, no cookies, no database — all state is session-ephemeral or stateless
- **No external network calls:** All content is bundled at build time; no fetch calls at runtime
- **No authentication:** All content is public; no user identity
- **Framework:** Astro with selective client-side hydration for interactive islands (HIERARCHY_EXPLORER and SPEC_WIZARD)
- **Styling:** Tailwind CSS for utility classes, CSS custom properties for theme tokens

## Build-time Data

The following values are resolved at build time (not runtime):
- RootSpec version — read from `.rootspec.json` → displayed in hero and header
- GitHub repository URLs — hardcoded as absolute paths to `https://github.com/rootspec/demos/tree/main/greenfield`
- Base path — `/demos/greenfield/` — applied uniformly in dev, preview, and production
