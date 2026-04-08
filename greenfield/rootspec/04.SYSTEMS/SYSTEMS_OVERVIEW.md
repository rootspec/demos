# Systems Overview

## System Map

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   THEME_SYSTEM  │    │ CONTENT_SYSTEM  │    │INTERACTIVE_SYSTEM│
│                 │    │                 │    │                 │
│ • Theme state   │    │ • Static content│    │ • Hierarchy UI  │
│ • Preferences   │◄──►│ • Meta banner   │◄──►│ • Wizard flow   │
│ • System detect │    │ • Sections      │    │ • Comparisons   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  │
                     ┌─────────────────┐
                     │ LAYOUT_SYSTEM   │
                     │                 │
                     │ • Page structure│
                     │ • Navigation    │
                     │ • Responsiveness│
                     └─────────────────┘
```

## System Interactions

| Source System | Target System | Interaction Type | Purpose |
|---------------|---------------|------------------|---------|
| THEME_SYSTEM | LAYOUT_SYSTEM | State sharing | Apply theme preferences to layout components |
| CONTENT_SYSTEM | LAYOUT_SYSTEM | Data flow | Provide section content for page structure |
| INTERACTIVE_SYSTEM | LAYOUT_SYSTEM | Component embedding | Mount interactive features within page layout |
| INTERACTIVE_SYSTEM | THEME_SYSTEM | Preference updating | Allow manual theme toggle from UI controls |
| LAYOUT_SYSTEM | CONTENT_SYSTEM | Context provision | Provide responsive context for content adaptation |

## Data Flow

### Theme Preferences
```
Browser System Preference → THEME_SYSTEM → Layout Components → Visual Rendering
                               ↑
User Manual Toggle ────────────┘
```

### Content Rendering
```
Static Content Sources → CONTENT_SYSTEM → Section Data → LAYOUT_SYSTEM → Rendered Pages
```

### Interactive Features
```
User Input → INTERACTIVE_SYSTEM → State Management → UI Updates → LAYOUT_SYSTEM → Visual Feedback
```

### Navigation & Routing
```
User Navigation → LAYOUT_SYSTEM → Route Handling → Content Requests → CONTENT_SYSTEM → Page Updates
```

## Calculated Values

### Theme-Dependent Properties
- **Dark/light color tokens**: Computed from base theme and current preference state
- **Responsive breakpoints**: Calculated based on content requirements and layout constraints
- **Animation timings**: Derived from accessibility preferences and system capabilities

### Interactive State
- **Wizard progress**: Computed from completed steps and validation state
- **Hierarchy expansion**: Calculated based on user selections and reference relationships
- **Comparison visibility**: Derived from toggle state and content availability

### Layout Adaptations
- **Content scaling**: Calculated from viewport dimensions and readability requirements
- **Navigation state**: Computed from scroll position and section visibility
- **Component positioning**: Derived from content length and interaction requirements

## Cross-System Dependencies

### THEME_SYSTEM Dependencies
- **Browser APIs**: For system preference detection and storage
- **CSS Custom Properties**: For dynamic color value application
- **Local Storage**: For preference persistence across sessions

### CONTENT_SYSTEM Dependencies
- **Markdown Processing**: For content transformation and rendering
- **Asset Management**: For image optimization and delivery
- **Meta Information**: For SEO and social sharing preparation

### INTERACTIVE_SYSTEM Dependencies  
- **Event Handling**: For user interaction capture and processing
- **State Management**: For wizard progress and hierarchy state
- **Validation Logic**: For user input processing and feedback

### LAYOUT_SYSTEM Dependencies
- **Responsive Framework**: For breakpoint management and adaptation
- **Component Library**: For consistent UI element rendering
- **Accessibility APIs**: For keyboard navigation and screen reader support