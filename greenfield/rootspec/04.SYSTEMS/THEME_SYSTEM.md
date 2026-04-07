# Theme System

## Purpose
Manages visual presentation that supports **Accessible Sophistication** and ensures the site feels approachable while demonstrating technical competence.

## Responsibilities
- Dark/light theme state management and transitions
- System preference detection and manual overrides
- Accessibility preference coordination
- CSS custom property management and updates

## State Management

### Theme State
```
themeState: {
  current: 'light' | 'dark' | 'system'
  resolved: 'light' | 'dark'
  userOverride: boolean
  systemPreference: 'light' | 'dark'
  transitionEnabled: boolean
}
```

### Accessibility State
```
accessibilityState: {
  reducedMotion: boolean
  highContrast: boolean
  forceFocus: boolean
  screenReaderActive: boolean
}
```

### Visual State
```
visualState: {
  version: string
  colorScheme: object
  breakpoints: object
  spacing: object
  typography: object
}
```

## External Interfaces

### Browser API Integration
- **Input**: System preference media queries, user interaction events
- **Output**: Theme state changes, preference persistence
- **Contract**: Standard CSS media query support, localStorage availability

### Interactive System Integration  
- **Input**: Theme change requests from toggle component
- **Output**: Updated CSS custom properties, transition coordination
- **Contract**: Smooth transitions without content reflow

### Layout System Integration
- **Input**: Responsive breakpoint requirements
- **Output**: Coordinated media query states, visual hierarchy updates
- **Contract**: Consistent breakpoint definitions, visual spacing coordination

## Implementation Patterns

### System Preference Detection
Theme initializes based on user's system settings:
- `prefers-color-scheme` media query detection
- Fallback to light theme for unsupported browsers
- No flash of incorrect theme on page load

### Manual Override Support
User toggle overrides system preferences:
- Toggle component provides immediate visual feedback
- State persisted in localStorage with expiration
- System preference changes respected when no override active

### Smooth Transitions
Theme changes animated without layout disruption:
- CSS custom properties enable performant color transitions
- Motion respects `prefers-reduced-motion` accessibility preference
- Interactive elements maintain focus states during transitions

## Data Dependencies

### Color Schemes
- **Source**: Design system configuration, framework defaults
- **Usage**: CSS custom property values, component styling
- **Update Trigger**: Theme changes, system preference changes

### Version Badge Styling
- **Source**: Content System version information
- **Usage**: Badge component visual treatment, positioning
- **Update Trigger**: Version updates, theme changes

### Accessibility Preferences
- **Source**: Browser media queries, user settings
- **Usage**: Animation behavior, focus styles, contrast levels
- **Update Trigger**: System setting changes, manual accessibility overrides

## CSS Architecture

### Custom Properties
Theme system manages centralized CSS variables:
```css
:root {
  --color-background: light-dark(#ffffff, #1a1a1a);
  --color-text: light-dark(#333333, #f0f0f0);
  --color-accent: light-dark(#0066cc, #4da6ff);
  --spacing-unit: 1rem;
  --transition-duration: 0.2s;
}
```

### Theme-Aware Components
Components reference theme variables consistently:
- All colors through custom properties
- No hardcoded color values in component styles
- Spacing and typography scale with theme variables

### Accessibility Integration
Theme system coordinates with accessibility features:
- High contrast mode adjustments
- Reduced motion preference handling
- Focus indicator visibility in both themes

## Error Handling

### Browser Support Fallbacks
- **Scenario**: Browser doesn't support CSS custom properties
- **Response**: Fallback styles with default light theme
- **Recovery**: Progressive enhancement with feature detection

### Storage Failures
- **Scenario**: localStorage unavailable or quota exceeded
- **Response**: Session-only theme persistence, system preference fallback
- **Recovery**: Clear error indication, graceful degradation to defaults

### System Preference Changes
- **Scenario**: User changes system theme while site is open
- **Response**: Automatic theme update unless user override active
- **Recovery**: Smooth transition with current state preservation

## Performance Considerations

### Initialization Speed
- CSS loads with initial theme to prevent flash
- System preference detection synchronous during page load
- Minimal JavaScript required for basic theme functionality

### Transition Performance
- CSS custom properties enable GPU-accelerated transitions
- Animation frame scheduling for complex theme changes
- Reduced motion mode disables non-essential animations

### Storage Efficiency
- Minimal localStorage usage with efficient serialization
- Theme preference cleanup on extended absence
- Graceful handling of storage limitations

## Visual Consistency

### Brand Alignment
Theme choices support RootSpec methodology demonstration:
- Professional appearance builds credibility
- Consistent visual hierarchy guides attention
- Accessible color contrast ratios meet WCAG standards

### Component Harmony
All interactive elements respect theme coordination:
- Hover states consistent across light and dark modes
- Focus indicators visible in both themes
- Loading states and transitions themed appropriately

### Framework Integration
Theme system works seamlessly with Astro:
- Build-time CSS optimization
- Component-scoped styles with global theme coordination
- Static site generation with theme preference detection