# **L4: Systems Overview**

## System Map

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  THEME_SYSTEM   │────│  LAYOUT_SYSTEM   │────│ CONTENT_SYSTEM  │
│  (visual state) │    │  (structure)     │    │ (static info)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌──────────────────┐            │
         └──────────────│ INTERACTIVE_SYS  │────────────┘
                        │ (dynamic features)│
                        └──────────────────┘
                                 │
                        ┌──────────────────┐
                        │ACCESSIBILITY_SYS │
                        │ (inclusive UX)   │
                        └──────────────────┘
```

## System Interactions

| System | Provides To | Receives From | Interaction Type |
|--------|-------------|---------------|------------------|
| **THEME_SYSTEM** | Layout (color schemes), Interactive (component styling), Content (syntax highlighting) | Layout (theme toggle placement), Interactive (user theme selection) | State Management |
| **LAYOUT_SYSTEM** | All systems (positioning, spacing, responsive breakpoints) | Theme (visual properties), Content (section requirements) | Structural Framework |
| **CONTENT_SYSTEM** | Layout (section content), Interactive (examples, copy), Accessibility (semantic structure) | Theme (presentation context), Interactive (dynamic content updates) | Data Provider |
| **INTERACTIVE_SYSTEM** | Layout (dynamic components), Content (user-generated examples), Theme (state changes) | Layout (container constraints), Content (template data), Accessibility (interaction requirements) | Behavior Engine |
| **ACCESSIBILITY_SYSTEM** | All systems (inclusive interaction patterns) | Interactive (focus management), Layout (semantic structure), Content (alt text requirements) | Cross-Cutting Compliance |

## Data Flow

### Theme State Flow
```
System Preference Detection → Theme Initialization → Component Styling → User Override → Persistence
```

### Content Rendering Flow
```
Static Content Load → Theme Application → Layout Positioning → Interactive Enhancement → Accessibility Validation
```

### Interactive Feature Flow
```
User Input → Validation → State Update → Content Generation → Visual Feedback → Accessibility Announcement
```

### Navigation Flow
```
Route Change → Layout Update → Content Load → Theme Application → Interactive Initialization → Focus Management
```

## Core Data Structures

### Theme Configuration
- `currentTheme: 'light' | 'dark' | 'system'`
- `colorScheme: ThemeColors`
- `userPreference: boolean`

### Layout State
- `currentSection: SectionId`
- `navigationExpanded: boolean`
- `scrollPosition: number`
- `viewportSize: ViewportBreakpoint`

### Interactive State
- `hierarchyExplorerState: { expandedLevels: Level[], selectedLevel: Level | null }`
- `wizardState: { currentStep: number, userInput: WizardInput, generatedSpec: SpecSkeleton }`
- `comparisonSliderPosition: number`

### Content Model
- `staticSections: Section[]`
- `interactiveExamples: Example[]`
- `codeBlocks: CodeBlock[]`
- `specificationVersion: string`

### Accessibility Context
- `focusManager: FocusState`
- `announcements: AnnouncementQueue`
- `keyboardNavigation: NavigationMap`
- `motionPreferences: MotionSettings`

## System Boundaries

### Internal Boundaries
- **Theme System** manages only visual presentation state
- **Layout System** handles only structural positioning and responsive behavior
- **Content System** owns only static information and copy
- **Interactive System** manages only dynamic user-driven features
- **Accessibility System** enforces only inclusive design patterns

### External Boundaries
- **File System** → Content System (markdown files, images)
- **Browser APIs** → Theme System (media queries), Interactive System (localStorage), Accessibility System (assistive technologies)
- **Build System** → Layout System (component compilation), Content System (static asset processing)
- **GitHub API** → Content System (spec file links, version information)

## Cross-System Dependencies

### Shared Dependencies
- **Component Library** used by Layout, Interactive, and Accessibility systems
- **State Management** coordinated between Theme and Interactive systems
- **Routing** managed by Layout system, consumed by Content and Interactive systems
- **Animation Framework** provided by Theme system, used by Layout and Interactive systems

### Integration Points
- **Theme Switching** requires coordination between Theme (state), Layout (toggle placement), Interactive (feature styling)
- **Mobile Navigation** requires coordination between Layout (responsive structure), Interactive (menu behavior), Accessibility (focus management)
- **Dynamic Content** requires coordination between Content (templates), Interactive (user input), Theme (styling)

## Calculated Values

### Responsive Breakpoints
- `isMobile: viewport.width < 768`
- `isTablet: 768 <= viewport.width < 1024`
- `isDesktop: viewport.width >= 1024`

### Theme-Derived Colors
- `accentColor: calculateAccent(baseTheme, userPreference)`
- `contrastRatio: calculateContrast(foreground, background)`
- `focusIndicator: generateFocusRing(accentColor, contrastRatio)`

### Interactive State Derivations
- `wizardProgress: currentStep / totalSteps * 100`
- `hierarchyConnections: calculateAllowedReferences(selectedLevel)`
- `comparisonContent: interpolateContent(sliderPosition, beforeContent, afterContent)`

### Accessibility Calculations
- `tabIndex: calculateTabOrder(elementPosition, containerState)`
- `ariaLabel: generateLabel(elementPurpose, currentContext)`
- `motionSafety: respectsUserPreferences(animationType, userSettings)`