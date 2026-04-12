# L4: Systems Overview

## System Map

| System | Responsibility | Data Owned |
|--------|---------------|------------|
| **CONTENT_SYSTEM** | Static page content, section rendering, meta banner | Markdown/structured copy, section order |
| **THEME_SYSTEM** | Dark/light mode state, system preference detection, persistence | Theme preference (localStorage) |
| **INTERACTIVE_SYSTEM** | Hierarchy Explorer, Spec Wizard, Before/After Comparison | Wizard state, explorer expanded state, comparison mode |
| **LAYOUT_SYSTEM** | Responsive layout, navigation, scroll behavior, version badge | None (presentational only) |
| **FRAMEWORK_INTEGRATION** | Build pipeline, static generation, asset bundling | Version from `.rootspec.json` |

## System Interactions

| From | To | Interaction |
|------|----|-------------|
| FRAMEWORK_INTEGRATION | CONTENT_SYSTEM | Injects RootSpec version at build time |
| FRAMEWORK_INTEGRATION | LAYOUT_SYSTEM | Provides version string for version badge |
| THEME_SYSTEM | LAYOUT_SYSTEM | Exposes active theme class/attribute to root element |
| THEME_SYSTEM | INTERACTIVE_SYSTEM | Active theme affects interactive component styling |
| INTERACTIVE_SYSTEM | LAYOUT_SYSTEM | Wizard output and explorer expansion trigger layout reflows |
| CONTENT_SYSTEM | LAYOUT_SYSTEM | Section content determines scroll regions |

## Data Flow

```
.rootspec.json
    └─► FRAMEWORK_INTEGRATION (reads version at build)
            ├─► CONTENT_SYSTEM (version in meta banner copy)
            └─► LAYOUT_SYSTEM (version badge value)

User OS preference
    └─► THEME_SYSTEM (initial theme on first visit)
            └─► localStorage (persist choice)
                    └─► THEME_SYSTEM (restore on revisit)

User interaction (click/keypress)
    └─► INTERACTIVE_SYSTEM
            ├─► Hierarchy Explorer state (which level expanded)
            ├─► Wizard state (step, form values, output)
            └─► Before/After mode (toggle/slider position)
```

## Boundaries

- **No system makes external network requests** — all data is local, static, or derived from build-time injection.
- **INTERACTIVE_SYSTEM** owns all mutable runtime state; other systems are effectively stateless at runtime.
- **THEME_SYSTEM** is the sole writer to localStorage.
- **FRAMEWORK_INTEGRATION** produces artifacts at build time only — it has no runtime presence.
