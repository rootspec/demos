# Level 4: Interactive System
<!-- L4: HOW it's built — References L1-3 + Sibling L4 + External only -->

## Responsibility

The Interactive System owns all client-side interactive components: the hierarchy explorer, the spec wizard, and the before/after comparison toggle. It manages UI state for these components and handles all user interaction events.

---

## Components

### Hierarchy Explorer

**State owned:**
- `activeLevel` — which level (if any) is currently expanded
- `hoveredLevel` — which level (if any) is currently hovered
- `connectionHighlights` — which reference arrows are currently highlighted

**Behavior:**
- Clicking a level toggles its expanded state
- Hovering a level highlights its allowed reference connections (upward arrows only)
- Only one level may be expanded at a time
- Keyboard: Arrow keys move focus between levels; Enter/Space toggle expansion; Escape collapses

**Content source:** Level names, descriptions, and example content provided by CONTENT_SYSTEM

**Visual output:** Expanded content panels, arrow highlights — rendered using PRESENTATION_SYSTEM tokens

**Accessibility:**
- ARIA role="tree" on the explorer container
- ARIA role="treeitem" on each level
- ARIA expanded/collapsed state communicated
- Focus visible on all interactive elements

**Degradation:** If JavaScript unavailable, render all levels as static collapsed summaries

---

### Spec Wizard

**State owned:**
- `step` — current step (1-4)
- `productIdea` — free text, step 1
- `missionSelection` — selected or written mission, step 2
- `selectedPillars` — array of [min-to-max] pillar selections, step 3
- `keyInteraction` — free text, step 4
- `outputVisible` — whether output skeleton is shown

**Behavior:**
- Step 1: Text input for product idea; advancing to step 2 requires non-empty input
- Step 2: Radio or button selection from mission templates, with optional free-text override
- Step 3: Multi-select of [min-to-max] design pillars from suggestions; custom entry allowed
- Step 4: Text input for key interaction
- Output: Generated inline below the form when step 4 is complete; maps inputs to L1-L3 structure
- No data sent externally; all processing is client-side template substitution

**Templates:** Provided by CONTENT_SYSTEM — wizard does not own the copy, only the state

**Keyboard:** Tab between inputs; Enter to advance; Back button navigable via keyboard

**Touch:** Large tap targets ([wcag-minimum-size] minimum); scroll to output on generation

**Degradation:** If JavaScript unavailable, show static description of the wizard with link to GitHub

---

### Before/After Comparison

**State owned:**
- `activeView` — "before" or "after"

**Behavior:**
- Toggle button switches between "Without spec" and "With RootSpec" views
- Both views contain real content (provided by CONTENT_SYSTEM)
- Transition is smooth (PRESENTATION_SYSTEM animation)
- On mobile: stacked view with toggle still functional

**Keyboard:** Toggle button is keyboard-focusable; Enter/Space switches view

**Degradation:** Both views rendered stacked if JavaScript unavailable, labeled clearly

---

## Interactions with Other Systems

- Reads initial data from CONTENT_SYSTEM (wizard templates, explorer content)
- Triggers visual changes via class mutations consumed by PRESENTATION_SYSTEM
- Sends theme toggle action to THEME_SYSTEM
- Uses LAYOUT_SYSTEM grid for component placement
- Does not own copy, colors, or layout tokens
