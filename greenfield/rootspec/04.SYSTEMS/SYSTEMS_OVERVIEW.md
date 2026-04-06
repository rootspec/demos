# Systems Overview

## System Architecture

This marketing site consists of five core systems that work together to deliver the **METHODICAL_CONFIDENCE** and **IMMEDIATE_CLARITY** design pillars through static generation and client-side interactivity.

## Content System

**OWNS:** Static marketing copy, educational content, meta information about RootSpec methodology
**MANAGES:** Section content, framework version display, attribution footer, meta banner messaging
**BOUNDARIES:** 
- IN: Markdown content files, version configuration, attribution data
- OUT: Rendered HTML with proper semantic structure
**DATA FLOW:** Content → Astro rendering → Static HTML with embedded metadata
**CALCULATIONS:** Framework version interpolation from package configuration, build timestamp generation

*References: IMMEDIATE_CLARITY (clear content structure), AUTHENTIC_TRANSPARENCY (honest messaging)*

## Interactive System  

**OWNS:** Client-side user interactions, dynamic UI state, input validation
**MANAGES:** Hierarchy explorer state, spec wizard flow, theme toggle preference, before/after comparison view
**BOUNDARIES:**
- IN: User inputs (clicks, keyboard, form data), browser preferences
- OUT: Updated DOM state, localStorage persistence, component state changes
**DATA FLOW:** User action → State update → DOM manipulation → Visual feedback
**CALCULATIONS:** Wizard output generation from templates, state transitions, accessibility focus management

*References: TANGIBLE_DEMONSTRATION (interactive learning), ACTIONABLE_NEXT_STEPS (wizard guidance)*

## Theme System

**OWNS:** Visual design tokens, color schemes, responsive layouts, motion design
**MANAGES:** Light/dark theme state, responsive breakpoints, animation timing, accessibility preferences  
**BOUNDARIES:**
- IN: System preferences, user theme choice, viewport dimensions
- OUT: CSS custom properties, animation states, responsive layout adjustments
**DATA FLOW:** Preference detection → Theme application → CSS variable updates → Visual rendering
**CALCULATIONS:** Contrast ratios for accessibility, responsive scaling factors, animation easing curves

*References: All design pillars through visual execution*

## Layout System

**OWNS:** Page structure, section organization, navigation hierarchy, responsive grid
**MANAGES:** Component placement, scroll behavior, section transitions, mobile optimization
**BOUNDARIES:**
- IN: Content structure, viewport constraints, navigation state
- OUT: Positioned elements, scroll triggers, responsive layouts
**DATA FLOW:** Content structure → Layout calculation → Responsive positioning → Rendered page
**CALCULATIONS:** Grid sizing for hierarchy explorer, mobile touch target sizing, scroll position tracking

*References: IMMEDIATE_CLARITY (clear structure), mobile-first design trade-off*

## Accessibility System

**OWNS:** Keyboard navigation, screen reader support, semantic HTML, focus management
**MANAGES:** ARIA attributes, focus indicators, skip links, alternative text, keyboard event handling
**BOUNDARIES:**
- IN: User keyboard/assistive technology inputs, content semantics
- OUT: Accessible DOM structure, focus updates, screen reader announcements
**DATA FLOW:** Input event → Accessibility handler → DOM update → Assistive technology feedback
**CALCULATIONS:** Focus trap boundaries, logical tab order, ARIA state synchronization

*References: Inviolable principle of accessibility first, keyboard accessibility trade-off*

## System Interactions

### Content ↔ Interactive
Content System provides structured data that Interactive System uses for wizard templates and hierarchy examples. Interactive System generates spec outputs that reference Content System's methodology structure.

### Interactive ↔ Theme
Interactive System state changes trigger Theme System visual updates (hover states, active states). Theme System provides motion timing that Interactive System uses for state transitions.

### Interactive ↔ Accessibility
All Interactive System state changes notify Accessibility System for proper ARIA updates and focus management. Accessibility System keyboard handlers trigger Interactive System state changes.

### Layout ↔ Theme
Layout System responsive calculations use Theme System breakpoint definitions. Theme System applies Layout System grid calculations for component positioning.

### Layout ↔ Accessibility
Layout System ensures minimum touch target sizes for Accessibility System requirements. Accessibility System focus indicators use Layout System spacing calculations.

## External Dependencies

### Browser APIs
- **LocalStorage:** Theme preference persistence, wizard state saving
- **MediaQuery:** System theme preference detection, responsive breakpoint matching  
- **IntersectionObserver:** Scroll-triggered animations, lazy loading
- **Focus Management:** Keyboard navigation, accessibility support

### Static Build (Astro)
- **File System:** Content file reading, asset optimization
- **Markdown Processing:** Content transformation, metadata extraction
- **Asset Pipeline:** CSS/JS bundling, image optimization

## Data Boundaries

**No server-side data:** All dynamic content generated client-side from templates and user input
**No external APIs:** All functionality works offline after initial page load
**No user tracking:** No analytics, cookies, or personal data collection beyond theme preference
**No dynamic routes:** All content statically generated at build time

## Performance Characteristics

**Static Generation:** All content pre-rendered for immediate delivery
**Progressive Enhancement:** Interactive features enhance static foundation
**Minimal JavaScript:** Only essential interactivity, no framework overhead beyond Astro islands
**Optimized Assets:** Image optimization, CSS/JS minification, strategic loading priorities