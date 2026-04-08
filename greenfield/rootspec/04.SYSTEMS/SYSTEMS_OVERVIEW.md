# L4: Systems Overview

## System Map

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   CONTENT       │    │   INTERACTIVE    │    │     THEME       │
│   SYSTEM        │────│     SYSTEM       │────│    SYSTEM       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────────────┐
                    │    LAYOUT SYSTEM        │
                    └─────────────────────────┘
                                 │
                    ┌─────────────────────────┐  
                    │  FRAMEWORK INTEGRATION  │
                    └─────────────────────────┘
```

## System Interactions

| From System | To System | Interaction Type | Data Flow |
|-------------|-----------|------------------|-----------|
| Content | Interactive | Event triggers | Section visibility, wizard data |
| Content | Theme | Style application | Content styling, readability |
| Interactive | Content | State updates | Wizard output, explorer selections |
| Interactive | Theme | Visual feedback | Animation states, focus indicators |
| Theme | Layout | Responsive styling | Breakpoint adjustments, contrast |
| Layout | Framework | Component structure | Page templates, routing |
| Framework | Content | Static generation | Build-time content processing |
| Framework | Interactive | Client hydration | JavaScript enhancement |

## Data Flow

### Content Flow
Static Markdown/YAML → Astro processing → HTML generation → Client rendering → User consumption

### Interaction Flow  
User input → JavaScript handlers → Local state management → Visual feedback → Content updates

### Theme Flow
System preference detection → Local storage → CSS custom properties → Component styling → User experience

### Layout Flow
Viewport detection → Responsive breakpoints → Component adaptation → Accessibility enhancements → Rendered interface

## Calculated Values

### Content Metrics
- Reading time estimation based on word count
- Section progress tracking for long-form content
- Hierarchy depth calculation for visual organization

### Interactive Metrics  
- Wizard completion percentage
- Explorer engagement time
- Before/after toggle frequency

### Theme Metrics
- Contrast ratio calculations for accessibility
- Animation duration based on user motion preferences  
- Color scheme derivation from base palette

### Layout Metrics
- Responsive breakpoint determination
- Touch target size validation
- Keyboard navigation order calculation

## External Dependencies

- **Astro Framework:** Static site generation, component hydration, build optimization
- **System APIs:** Prefers-color-scheme detection, local storage access
- **Web Standards:** CSS Grid/Flexbox, Intersection Observer, Custom Properties
- **Accessibility APIs:** Screen reader compatibility, keyboard event handling