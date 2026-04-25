# Level 4: Systems Overview

## System Map

| System | Responsibility | Primary Data |
|--------|---------------|-------------|
| CONTENT_SYSTEM | Static prose content for all sections | Markdown/HTML fragments, version string |
| THEME_SYSTEM | Light/dark mode state and persistence | Theme preference (localStorage) |
| INTERACTIVE_SYSTEM | Hierarchy Explorer and Spec Wizard components | Explorer state, wizard step/answers |
| LAYOUT_SYSTEM | Page structure, navigation, base path routing | Route config, section anchors |
| PRESENTATION_SYSTEM | Typography, spacing tokens, visual design | CSS custom properties, font loading |

## System Interactions

| From | To | Interaction |
|------|----|------------|
| LAYOUT_SYSTEM | CONTENT_SYSTEM | Renders section content in the correct slot |
| LAYOUT_SYSTEM | THEME_SYSTEM | Provides toggle control in header |
| LAYOUT_SYSTEM | PRESENTATION_SYSTEM | Applies visual tokens to the page shell |
| THEME_SYSTEM | PRESENTATION_SYSTEM | Switches active CSS custom property set (light/dark) |
| INTERACTIVE_SYSTEM | CONTENT_SYSTEM | Reads hierarchy level descriptions to populate Explorer |
| INTERACTIVE_SYSTEM | PRESENTATION_SYSTEM | Uses shared tokens for interactive element styling |
| CONTENT_SYSTEM | LAYOUT_SYSTEM | Provides section order and anchor IDs |

## Data Flow

```
.rootspec.json
    └─→ CONTENT_SYSTEM (version string at build time)
            └─→ LAYOUT_SYSTEM (renders version badge in hero/header)

User preference (localStorage / prefers-color-scheme)
    └─→ THEME_SYSTEM
            └─→ PRESENTATION_SYSTEM (applies :root CSS vars)

User interactions (click, keyboard, touch)
    └─→ INTERACTIVE_SYSTEM (state machine per component)
            └─→ PRESENTATION_SYSTEM (reflects state visually)
```

## Key Boundaries

- **CONTENT_SYSTEM** owns all prose copy. No other system edits content strings.
- **THEME_SYSTEM** is the single source of truth for current theme. No component manages its own dark/light state independently.
- **INTERACTIVE_SYSTEM** is purely client-side. It makes no network requests. It owns no persistent state beyond the current session.
- **LAYOUT_SYSTEM** owns the base path configuration. All internal links and asset references are resolved through it.
- **PRESENTATION_SYSTEM** owns all visual tokens. No system uses raw color or spacing values — only token references.
