# Systems Overview (L4)

*References: [[01.PHILOSOPHY]] [[02.TRUTHS]] [[03.INTERACTIONS]]*

## System Map

**CONTENT_SYSTEM**: Static content rendering, meta-banner management, version display, external link generation  
**INTERACTIVE_SYSTEM**: Hierarchy explorer, spec wizard, before/after comparison, client-side state management  
**THEME_SYSTEM**: Dark/light mode detection and switching, visual styling coordination  
**LAYOUT_SYSTEM**: Responsive design breakpoints, scroll behavior, navigation anchors  
**ACCESSIBILITY_SYSTEM**: Keyboard navigation, screen reader support, focus management, motion preferences  

## System Interactions

| System | Depends On | Provides To | Key Interface |
|--------|------------|-------------|---------------|
| CONTENT_SYSTEM | - | LAYOUT_SYSTEM, THEME_SYSTEM | Static HTML, structured data |
| INTERACTIVE_SYSTEM | ACCESSIBILITY_SYSTEM, THEME_SYSTEM | CONTENT_SYSTEM | Component state, user events |
| THEME_SYSTEM | ACCESSIBILITY_SYSTEM | CONTENT_SYSTEM, INTERACTIVE_SYSTEM, LAYOUT_SYSTEM | CSS custom properties, preference detection |
| LAYOUT_SYSTEM | THEME_SYSTEM | CONTENT_SYSTEM, INTERACTIVE_SYSTEM | Responsive containers, scroll coordination |
| ACCESSIBILITY_SYSTEM | - | INTERACTIVE_SYSTEM, THEME_SYSTEM, LAYOUT_SYSTEM | Focus management, ARIA patterns |

## Data Flows

### Theme Preference Flow
1. **ACCESSIBILITY_SYSTEM** detects system preference or reads stored setting
2. **THEME_SYSTEM** receives preference and applies corresponding CSS custom properties
3. **CONTENT_SYSTEM** and **INTERACTIVE_SYSTEM** inherit theme values through CSS cascade
4. **LAYOUT_SYSTEM** adjusts spacing and contrast based on theme

### Interactive State Flow
1. **INTERACTIVE_SYSTEM** manages component state (explorer expansion, wizard progress, comparison toggle)
2. **ACCESSIBILITY_SYSTEM** tracks focus management and keyboard interactions
3. **LAYOUT_SYSTEM** coordinates scroll behavior and responsive adjustments
4. **CONTENT_SYSTEM** receives state updates for dynamic content rendering

### Content Rendering Flow
1. **CONTENT_SYSTEM** generates static HTML from Astro components and markdown
2. **LAYOUT_SYSTEM** applies responsive container and typography styles
3. **THEME_SYSTEM** provides color, spacing, and visual tokens
4. **INTERACTIVE_SYSTEM** enhances with client-side behavior where needed
5. **ACCESSIBILITY_SYSTEM** ensures proper semantic structure and navigation

## Boundaries

**Build-time vs Runtime**: Static content generation (CONTENT_SYSTEM, LAYOUT_SYSTEM, THEME_SYSTEM base) happens at build. Interactive enhancements (INTERACTIVE_SYSTEM, ACCESSIBILITY_SYSTEM, THEME_SYSTEM preferences) happen at runtime.

**Server vs Client**: All systems run client-side. No server dependencies, API calls, or database persistence. State management is ephemeral (session-only) or uses localStorage for theme preferences.

**Framework vs Custom**: Astro framework handles CONTENT_SYSTEM base. Custom TypeScript/JavaScript manages INTERACTIVE_SYSTEM. CSS handles THEME_SYSTEM and LAYOUT_SYSTEM. Web standards (ARIA, focus management) drive ACCESSIBILITY_SYSTEM.

## System Dependencies

**External**: 
- Astro framework for static site generation
- TypeScript for interactive component logic
- CSS custom properties for theme coordination
- Web standards (ARIA, CSS Grid, Intersection Observer) for core functionality

**Internal**:
- ACCESSIBILITY_SYSTEM provides foundation for all user-facing systems
- THEME_SYSTEM coordinates visual consistency across all systems
- CONTENT_SYSTEM serves as primary data source for display systems
- LAYOUT_SYSTEM provides responsive foundation for all visual systems
- INTERACTIVE_SYSTEM enhances but never replaces core functionality