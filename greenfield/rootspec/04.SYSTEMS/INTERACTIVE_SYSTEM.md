# INTERACTIVE_SYSTEM

*References: [[01.PHILOSOPHY]] [[02.TRUTHS]] [[03.INTERACTIONS]] [[SYSTEMS_OVERVIEW]]*

## Responsibility

Manages all client-side interactive behavior including hierarchy explorer, spec wizard, before/after comparison, and dynamic state management. Enhances static content with user-driven functionality.

## Boundaries

**Owns**:
- Hierarchy explorer component state (level expansion, reference highlighting)
- Spec wizard progression and form validation
- Before/after comparison toggle mechanism
- Client-side routing and scroll coordination
- Dynamic content updates and template rendering

**Does Not Own**:
- Static content generation (CONTENT_SYSTEM)
- Visual styling and themes (THEME_SYSTEM)
- Accessibility implementation (ACCESSIBILITY_SYSTEM)
- Responsive layout behavior (LAYOUT_SYSTEM)

## Data Ownership

**Component State**: Explorer expanded levels, wizard current step and input values, comparison panel visibility
**User Input**: Wizard form data (product idea, selected mission, design pillars, key interaction)
**Template Processing**: Dynamic generation of skeleton spec output from user input
**Interaction History**: Session-based tracking of user engagement for analytics (no persistence)

## Interactions with Other Systems

**← CONTENT_SYSTEM**: Receives structured templates for wizard, hierarchy examples for explorer, comparison panel content
**← ACCESSIBILITY_SYSTEM**: Receives focus management events, keyboard interaction handlers, ARIA state updates
**← THEME_SYSTEM**: Inherits visual tokens through CSS custom properties, responds to theme change events
**→ CONTENT_SYSTEM**: Sends dynamic content updates for wizard output display, requests template data for rendering

## Implementation Patterns

**Component Lifecycle**: TypeScript classes for each interactive component with init, update, destroy methods
**State Management**: Centralized store pattern for component communication, event-driven updates
**Event Handling**: Delegated event listeners for performance, custom events for component communication
**Template Engine**: Client-side mustache-style templating for dynamic content generation
**Progressive Enhancement**: Core functionality works without JavaScript, enhanced experience requires scripting
**Error Boundaries**: Graceful degradation when interactive features fail, fallback to static content

## Component Interfaces

**HierarchyExplorer**: `expand(level)`, `collapse(level)`, `highlightReferences(level)`, `reset()`
**SpecWizard**: `nextStep()`, `previousStep()`, `validateInput()`, `generateOutput()`, `resetWizard()`
**ComparisonToggle**: `showWithoutSpec()`, `showWithSpec()`, `toggleState()`, `syncContent()`