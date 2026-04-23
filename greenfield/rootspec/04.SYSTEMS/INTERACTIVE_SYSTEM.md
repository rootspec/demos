# Level 4: Interactive System

## Responsibility

Owns all client-side interactive logic: the hierarchy explorer, the spec wizard, and the comparison view. Manages the state for each component and exposes that state to PRESENTATION_SYSTEM for rendering. No network calls. No server state.

## Boundaries

- Owns: interactive component state, state transitions, client-side logic
- Does not own: rendering (PRESENTATION_SYSTEM), content/copy (CONTENT_SYSTEM), theme (THEME_SYSTEM)
- All data is either static (from CONTENT_SYSTEM) or derived from user input
- No persistence beyond the current page session (wizard state is ephemeral)

## Components

### Hierarchy Explorer

**State:**
- `expandedLevel`: null | 1 | 2 | 3 | 4 | 5 — which level is currently expanded
- `hoveredLevel`: null | 1 | 2 | 3 | 4 | 5 — which level the pointer is over

**State transitions:**
- Click/tap level card → toggle `expandedLevel` (expand if collapsed, collapse if expanded)
- Hover level card → set `hoveredLevel`; highlight allowed upward references
- Hover end → clear `hoveredLevel`
- Keyboard: ArrowDown/ArrowUp navigate levels; Enter/Space toggle expansion; Tab moves through interactive elements

**Reference highlighting rules:**
- When L2 is hovered: highlight L1 (it can reference L1)
- When L3 is hovered: highlight L1, L2
- When L4 is hovered: highlight L1, L2, L3, and sibling L4 entries
- When L5 is hovered: highlight all levels
- When L1 is hovered: no levels highlighted (references external only)

**Content rendered when expanded:**
Each level shows: purpose, key contents, reference rules, example content snippet. All content sourced from CONTENT_SYSTEM.

### Spec Wizard

**State:**
- `currentStep`: 1 | 2 | 3 | 'result'
- `productIdea`: string — user's one-line product idea
- `selectedMission`: string — chosen or typed mission statement
- `selectedPillars`: string[] — 3-5 selected design pillar names
- `keyInteraction`: string — user's free-text description of one interaction

**State transitions:**
- Step 1: User fills in product idea, selects or types mission → `Next` advances to step 2
- Step 2: User selects 3-5 design pillars → `Next` advances to step 3 (validation: must select at least 3)
- Step 3: User describes key interaction → `Generate` transitions to `result`
- Result: Skeleton spec rendered from state; `Start Over` resets all state to step 1
- `Back` button on steps 2 and 3 navigates to previous step without clearing state
- Keyboard: Tab/Shift-Tab navigate fields; Enter submits current step; Escape does not clear state

**Skeleton spec generation:**
Produces a structured text output (markdown or formatted block) showing:
- L1: Mission (from `selectedMission`), Design Pillars (from `selectedPillars` rendered as pillar stubs)
- L2: One trade-off stub derived from the product idea
- L3: Key interaction formatted as a basic interaction loop (Given/When/Then narrative)

No AI involved — all generation is template substitution using content from CONTENT_SYSTEM.

**Validation rules:**
- Step 1: `productIdea` must be non-empty; `selectedMission` must be non-empty
- Step 2: `selectedPillars` length must be >= 3 and <= 5
- Step 3: `keyInteraction` must be non-empty

### Comparison View

**State:**
- `activePanel`: 'without' | 'with' — which panel is shown on mobile (desktop shows both)
- `viewport`: 'mobile' | 'desktop' — derived from viewport width at render time

**State transitions:**
- Mobile: toggle button switches `activePanel` between 'without' and 'with'
- Desktop: both panels shown simultaneously; toggle not needed
- Window resize crossing breakpoint: `viewport` updates; layout adapts

**Content:**
Both panels display real content sourced from CONTENT_SYSTEM. No lorem ipsum.

## Cross-Component Rules

- All components are independent; no shared state between explorer, wizard, and comparison view
- All components work without any prior user interaction (clean initial state renders correctly)
- All components degrade gracefully if JavaScript fails to load (static fallback from PRESENTATION_SYSTEM)
- Touch events are handled explicitly; pointer-only interactions have touch equivalents

## Data Dependencies

- CONTENT_SYSTEM provides: hierarchy level definitions, wizard template options, comparison panel content
- PRESENTATION_SYSTEM consumes: component state to render current UI
- No dependency on THEME_SYSTEM or LAYOUT_SYSTEM
