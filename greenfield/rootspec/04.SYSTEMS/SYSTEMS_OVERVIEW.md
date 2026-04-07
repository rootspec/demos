# Level 4: Systems Overview

## System Architecture

This marketing site implements **Declarative Clarity** and **Accessible Sophistication** through five major subsystems that work together to demonstrate RootSpec methodology.

## Major Subsystems

### Content System
**Responsibility**: Static content delivery and information architecture
**State Management**: Page content, section data, version information
**External Dependencies**: Astro static site generation, markdown processing
**References**: L1 Mission, L2 Transparency Trade-off, L3 Discovery Journey

### Interactive System  
**Responsibility**: Dynamic user experiences and educational demonstrations
**State Management**: Component states, user inputs, wizard progress, explorer navigation
**External Dependencies**: Client-side JavaScript, local storage for preferences
**References**: L1 Human-AI Collaboration pillar, L3 Hierarchy Explorer pattern, L3 Spec Wizard flow

### Theme System
**Responsibility**: Visual presentation and accessibility features
**State Management**: Theme preferences, responsive breakpoints, accessibility states
**External Dependencies**: CSS variables, system preference detection, local storage
**References**: L1 Accessible Sophistication pillar, L2 Technical Constraints, L3 Theme Management pattern

### Layout System
**Responsibility**: Responsive structure and navigation organization  
**State Management**: Viewport dimensions, navigation state, section visibility
**External Dependencies**: CSS Grid/Flexbox, intersection observers, media queries
**References**: L2 Developer-Focused trade-off, L3 Navigation Flow, L3 Mobile responsiveness

### Validation System
**Responsibility**: Input validation and error handling for interactive components
**State Management**: Validation states, error messages, user feedback
**External Dependencies**: Client-side validation functions, sanitization utilities
**References**: L1 Validation-Driven Trust pillar, L3 Error States, L3 Feedback Mechanisms

## System Boundaries

### Content ↔ Interactive
- Content System provides static templates and data structures
- Interactive System consumes content for wizard templates and explorer examples
- **Interface**: Structured data objects and template definitions

### Interactive ↔ Theme  
- Interactive components adapt visual states based on theme selection
- Theme System provides CSS variables consumed by interactive elements
- **Interface**: CSS custom properties and theme state events

### Interactive ↔ Validation
- Interactive components trigger validation on user actions  
- Validation System returns state and feedback consumed by interactive UI
- **Interface**: Validation result objects and error state management

### Layout ↔ Theme
- Layout System responds to theme-driven breakpoint changes
- Theme System manages responsive behavior consumed by layout components
- **Interface**: Media query coordination and responsive state sharing

### All Systems ↔ Content
- Content System acts as central configuration provider
- All dynamic systems reference content structure for consistent behavior
- **Interface**: Centralized configuration objects and content schemas

## Cross-System Data

### User Preferences
- **Owner**: Theme System (primary)
- **Consumers**: Interactive System (component states), Layout System (navigation preferences)
- **Storage**: Browser local storage with fallback defaults

### Navigation State
- **Owner**: Layout System (primary)  
- **Consumers**: Content System (active section), Interactive System (context awareness)
- **Storage**: Component state with URL synchronization

### Version Information
- **Owner**: Content System (primary)
- **Consumers**: Interactive System (wizard templates), Theme System (version badge styling)
- **Storage**: Build-time constants and configuration files

## External System Integration

### Build System (Astro)
- **Role**: Static site generation and asset optimization
- **Interface**: File-based routing, component compilation, asset bundling
- **Dependencies**: Content System structure, Theme System assets

### Browser APIs
- **Role**: Runtime environment and user interaction capture
- **Interface**: DOM manipulation, event handling, storage APIs
- **Dependencies**: Interactive System events, Theme System preferences

### Version Control (Git)
- **Role**: Source attribution and transparency demonstration  
- **Interface**: Commit metadata, file history, repository references
- **Dependencies**: Content System attribution, meta-banner links

## Performance Considerations

### Content System
- Static generation eliminates server dependencies
- Markdown processing happens at build time
- Asset optimization through Astro compilation

### Interactive System
- Client-side only execution prevents server round trips
- Component state isolation prevents unnecessary re-renders
- Progressive enhancement ensures core functionality without JavaScript

### Theme System
- CSS custom properties enable performant theme switching
- System preference detection avoids flash of incorrect theme
- Reduced motion preferences respected for accessibility

### Layout System
- CSS Grid and Flexbox provide efficient responsive behavior
- Intersection observers optimize scroll-based animations
- Mobile-first responsive design reduces unnecessary CSS

### Validation System
- Client-side validation prevents network delays
- Input sanitization happens immediately on user interaction
- Error state management isolated to affected components only