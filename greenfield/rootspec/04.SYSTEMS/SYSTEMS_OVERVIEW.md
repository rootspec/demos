# Level 4: Systems Overview

## System Map

The marketing site is composed of five systems. Each owns a distinct concern.

```
┌─────────────────────────────────────────────────┐
│                 LAYOUT_SYSTEM                    │
│  (page structure, navigation, scroll, theme)     │
│                                                  │
│  ┌──────────────┐  ┌──────────────────────────┐ │
│  │ CONTENT      │  │ INTERACTIVE              │ │
│  │ SYSTEM       │  │ SYSTEM                   │ │
│  │              │  │                          │ │
│  │ hero, problem│  │ hierarchy explorer,      │ │
│  │ how-it-works │  │ spec wizard,             │ │
│  │ CTA, meta    │  │ before/after comparison  │ │
│  │ banner       │  │                          │ │
│  └──────────────┘  └──────────────────────────┘ │
│                                                  │
│  ┌──────────────┐  ┌──────────────────────────┐ │
│  │ THEME        │  │ ACCESSIBILITY            │ │
│  │ SYSTEM       │  │ SYSTEM                   │ │
│  │              │  │                          │ │
│  │ dark/light,  │  │ keyboard nav, ARIA,      │ │
│  │ preferences  │  │ focus management,        │ │
│  │              │  │ reduced motion           │ │
│  └──────────────┘  └──────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

## System Interactions

| From | To | Interaction |
|------|----|-------------|
| LAYOUT_SYSTEM | CONTENT_SYSTEM | Provides section containers and scroll position |
| LAYOUT_SYSTEM | INTERACTIVE_SYSTEM | Provides section containers; reports viewport visibility |
| LAYOUT_SYSTEM | THEME_SYSTEM | Applies theme class to root element |
| THEME_SYSTEM | LAYOUT_SYSTEM | Provides current theme for CSS variable resolution |
| THEME_SYSTEM | INTERACTIVE_SYSTEM | Provides color tokens for interactive elements |
| ACCESSIBILITY_SYSTEM | INTERACTIVE_SYSTEM | Manages focus, announces state changes |
| ACCESSIBILITY_SYSTEM | LAYOUT_SYSTEM | Provides reduced-motion preference |

## Shared Conventions

- **Data attributes:** All interactive elements use `data-test` attributes for testability
- **CSS variables:** All colors, spacing, and typography use CSS custom properties managed by the theme system
- **State management:** Client-side only. No persistence between sessions except theme preference (localStorage)
- **Versioning:** RootSpec version stored as a single constant, referenced by the content system
