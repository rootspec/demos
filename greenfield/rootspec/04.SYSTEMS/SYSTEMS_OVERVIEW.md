# L4 — SYSTEMS OVERVIEW
*HOW it's built*

## System Architecture

### Content System
**Owns:** Static page content, marketing copy, section text, meta descriptions  
**State:** Page structure, text content, version references  
**Boundaries:** Provides content to Layout System, receives no input from other systems  
**Dependencies:** External content from SEED.md specifications

### Theme System  
**Owns:** Color schemes, typography, spacing tokens, dark/light mode state  
**State:** Current theme preference (light/dark/system), CSS custom properties  
**Boundaries:** Provides styling to all UI components, persists preference to browser storage  
**Dependencies:** System preference detection, user choice persistence

### Interactive System
**Owns:** Hierarchy explorer, spec wizard, before/after comparison, theme toggle  
**State:** Wizard progress, expanded hierarchy levels, comparison slider position  
**Boundaries:** Receives user events, manages component state, triggers visual feedback  
**Dependencies:** Data System for content, Theme System for styling

### Data System
**Owns:** Hierarchy examples, wizard templates, comparison content, configuration values  
**State:** Static data structures, template definitions, validation rules  
**Boundaries:** Provides structured data to Interactive System, no external dependencies  
**Dependencies:** Build-time data loading from TypeScript modules

### Layout System
**Owns:** Page structure, responsive breakpoints, component positioning, navigation  
**State:** Viewport dimensions, scroll position, section visibility  
**Boundaries:** Orchestrates other systems, manages page flow and responsive behavior  
**Dependencies:** Content System for structure, Theme System for responsive styling

## System Boundaries

```
External Sources → Data System ← Interactive System → Layout System → Content System
                      ↓              ↑                    ↓
                 Theme System ←────────────────────────────────────┘
```

**Data Flow Rules:**
- Content System only outputs, never receives internal state
- Theme System responds to user input but maintains independence  
- Interactive System coordinates with Data System but doesn't modify base content
- Layout System orchestrates but doesn't own content or interaction logic
- No circular dependencies between systems

## Calculated Values

**Theme Resolution:** `user_preference || system_preference || 'light'`  
**Wizard Completion:** `completed_steps.length / total_steps.length`  
**Hierarchy Validation:** `referenced_levels.every(level => level < current_level)`  
**Responsive State:** `viewport_width >= breakpoint ? 'desktop' : 'mobile'`

## External Interfaces

**Browser APIs:** `localStorage` for theme preference, `matchMedia` for system theme detection  
**Build System:** Astro static generation, TypeScript compilation, Tailwind CSS processing  
**Version Source:** `package.json` for current framework version display