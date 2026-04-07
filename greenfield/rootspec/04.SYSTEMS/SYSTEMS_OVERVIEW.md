# L4 — Systems Overview

## System Map

**CONTENT_SYSTEM** — Manages static content, configuration, and meta information. Owns site copy, links, version numbers, and structured data for interactive features.

**INTERACTIVE_SYSTEM** — Handles dynamic user interactions including hierarchy explorer, spec wizard, and before/after comparison slider. Manages client-side state and user input processing.

**THEME_SYSTEM** — Controls visual presentation and user theme preferences. Manages dark/light mode detection, theme switching, and preference persistence.

**LAYOUT_SYSTEM** — Manages responsive design, page structure, and navigation. Handles section organization, mobile adaptations, and scroll behavior.

**ACCESSIBILITY_SYSTEM** — Ensures universal access through keyboard navigation, screen readers, and WCAG compliance. Manages focus states, ARIA labels, and semantic structure.

## System Interactions

| System | Interacts With | Interaction Type | Purpose |
|--------|---------------|------------------|---------|
| CONTENT_SYSTEM | INTERACTIVE_SYSTEM | Data provision | Supplies structured data for hierarchy explorer and wizard templates |
| CONTENT_SYSTEM | LAYOUT_SYSTEM | Content delivery | Provides section content and navigation structure |
| THEME_SYSTEM | LAYOUT_SYSTEM | Style coordination | Applies theme values to layout components and sections |
| THEME_SYSTEM | INTERACTIVE_SYSTEM | State synchronization | Ensures interactive elements respect current theme |
| ACCESSIBILITY_SYSTEM | INTERACTIVE_SYSTEM | Behavioral enhancement | Adds keyboard navigation and ARIA support to dynamic features |
| ACCESSIBILITY_SYSTEM | LAYOUT_SYSTEM | Semantic structure | Ensures proper heading hierarchy and landmark navigation |
| ACCESSIBILITY_SYSTEM | THEME_SYSTEM | Preference respect | Respects reduced motion and high contrast preferences |
| LAYOUT_SYSTEM | INTERACTIVE_SYSTEM | Event coordination | Manages scroll events and section focus for interactive features |

## Data Flow

**Page Load Flow:**
1. CONTENT_SYSTEM loads configuration and static content
2. THEME_SYSTEM detects user preference and applies initial theme  
3. LAYOUT_SYSTEM organizes page structure and responsive breakpoints
4. ACCESSIBILITY_SYSTEM applies semantic structure and focus management
5. INTERACTIVE_SYSTEM initializes dynamic features with content data

**User Interaction Flow:**  
1. ACCESSIBILITY_SYSTEM captures and normalizes user input (mouse, keyboard, touch)
2. INTERACTIVE_SYSTEM processes input and updates component state
3. THEME_SYSTEM applies current theme to any new interface elements  
4. LAYOUT_SYSTEM handles responsive adaptations for state changes
5. ACCESSIBILITY_SYSTEM announces changes to assistive technologies

**Theme Change Flow:**
1. User triggers theme change via toggle or system preference change
2. THEME_SYSTEM updates global theme state and persists preference
3. LAYOUT_SYSTEM applies theme-specific styles across all sections
4. INTERACTIVE_SYSTEM updates theme-sensitive interactive elements
5. ACCESSIBILITY_SYSTEM ensures theme change doesn't break focus or navigation

## State Management

**Content State:** Immutable after initial load. Configuration values cached for performance.

**Theme State:** Persisted in localStorage. Synchronized across browser tabs. Falls back to system preference.

**Interactive State:** Component-local state for user interactions. No persistence required between sessions.

**Layout State:** Responsive breakpoint state derived from viewport. Section visibility tracked for navigation.

**Accessibility State:** Focus management state. Assistive technology announcement queue.

## External Boundaries  

**Static Asset Boundary:** Images, fonts, and icons served from static directory. No CDN dependencies.

**Browser API Boundary:** Uses standard Web APIs only (localStorage, matchMedia, IntersectionObserver). No polyfills required.

**GitHub Integration Boundary:** External links to repository, seed file, and spec files. Read-only access, no API calls.

**Framework Boundary:** Built on Astro static site generator. Client-side JavaScript minimized and progressively enhanced.