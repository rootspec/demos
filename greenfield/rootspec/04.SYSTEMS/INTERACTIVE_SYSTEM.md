# Level 4: Interactive System

## Responsibility

Manages the state and logic for all three interactive components: Hierarchy Explorer, Spec Wizard, and Before/After Comparison. Coordinates with CONTENT_SYSTEM for template data and PRESENTATION_SYSTEM for visual feedback.

## Components

### Hierarchy Explorer

**State:**
- `expandedLevel`: number | null — which level (1-5) is currently expanded
- `hoveredLevel`: number | null — which level is hovered (for reference highlighting)

**Rules:**
- Only one level can be expanded at a time
- Clicking the expanded level collapses it (toggle)
- Hovering a level highlights its allowed references (levels it can reference)
- Reference arrows point upward only — L5 can reference L1-L4; L1 can reference nothing internal

**Data consumed from CONTENT_SYSTEM:**
- Level name, description, key question, example content, allowed references list

**Keyboard behavior:**
- Arrow keys move focus between levels
- Enter/Space toggle the focused level's expanded state
- Escape collapses any expanded level

### Spec Wizard

**State:**
- `currentStep`: 1 | 2 | 3
- `missionText`: string (step 1 — free text or selected template)
- `selectedPillars`: string[] (step 2 — 3-5 items from suggestion list)
- `interactionText`: string (step 3 — free text)
- `isComplete`: boolean — true when all three steps have non-empty values

**Rules:**
- Step 2 enforces minimum [N] and maximum [N] pillar selections
- Output renders when `isComplete === true`
- Output maps: missionText → L1 Mission, selectedPillars → L1 Design Pillars, interactionText → L3 Interaction Pattern
- Output is read-only; user cannot edit the generated skeleton directly
- State is session-only (no persistence on page reload)

**Data consumed from CONTENT_SYSTEM:**
- Mission templates (Step 1 suggestions)
- Pillar suggestion list (Step 2)
- Placeholder text (Step 3)

**Keyboard behavior:**
- Tab navigates between form elements
- Enter advances to next step when current step is valid
- Shift+Tab moves backward through steps

### Before/After Comparison

**State:**
- `activePanel`: "without" | "with" — which panel is shown (mobile only)
- On desktop: both panels visible side-by-side (no toggle state needed)

**Rules:**
- Mobile: toggle button switches between panels with transition
- Desktop: both panels always visible
- Active panel determined by viewport width at render time and on resize

**Data consumed from CONTENT_SYSTEM:**
- Without-spec panel content (vague requirements, ambiguous story, buried decision)
- With-spec panel content (L2 truth, L5 story with ACs, traced feature)

**Keyboard behavior:**
- Toggle button (mobile) is focusable; Space/Enter activates

## Interfaces

- **Consumes from CONTENT_SYSTEM:** Wizard templates, explorer level data, comparison copy
- **Consumes from LAYOUT_SYSTEM:** Container dimensions for responsive panel decisions
- **Provides to PRESENTATION_SYSTEM:** State change events for animation triggers

## Constraints

- No external API calls — all content comes from CONTENT_SYSTEM templates
- No server-side state — wizard output is purely client-side template rendering
- Session-only state (except theme, which belongs to THEME_SYSTEM)
- All interactive elements must have accessible labels and keyboard support
