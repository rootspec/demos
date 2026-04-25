# Level 4: Interactive System

## Responsibility

Manages all client-side interactive components: the Hierarchy Explorer and the Spec Wizard. Both components are stateful, keyboard-accessible, touch-friendly, and operate without network requests.

## Components

### Hierarchy Explorer

**Purpose:** Visualizes the five RootSpec levels, their purposes, and their reference rules. Users can expand levels to see example content and see reference arrows that flow upward only.

**State:**
- `expandedLevel`: Which level is currently expanded (null | 1 | 2 | 3 | 4 | 5)
- `hoveredLevel`: Which level the cursor/focus is on (null | 1 | 2 | 3 | 4 | 5)
- `mode`: Inferred from context (`visual` for desktop, `stacked` for mobile)

**Behavior rules:**
- Only one level can be expanded at a time; expanding a new level collapses the previous
- Clicking the expanded level collapses it
- Keyboard: Tab to navigate between levels; Enter or Space to expand/collapse; Escape to collapse all
- Hovering/focusing a level highlights the levels it can reference (upward arrows only)
- Reference arrows animate on hover/focus; no animation on expand/collapse (mechanical, not playful)
- If JavaScript is unavailable, all five levels are shown in expanded state (readable without interaction)

**Data consumed from CONTENT_SYSTEM:**
- Level name, purpose sentence, example content (short prose), reference rules (list of allowed levels)

### Spec Wizard

**Purpose:** A four-step mini-wizard where visitors enter a product idea and walk through mission, design pillars, and a key interaction to receive a skeleton spec output.

**State:**
- `currentStep`: 1 | 2 | 3 | 4 | `output`
- `answers`: Map of step → answer value
  - Step 1: `productIdea` (string, required)
  - Step 2: `mission` (string — selected template or free text)
  - Step 3: `pillars` (array of strings, 3-5 required)
  - Step 4: `keyInteraction` (string, required)
- `validationError`: Error message for current step if validation fails

**Step content:**
- Step 1: Text input for one-line product idea
- Step 2: Mission selector — [N] template options + "write your own" free text option
- Step 3: Pillar picker — list of [N] suggestions; visitor selects 3-5; free text entry allowed
- Step 4: Text area for one key interaction description
- Output: Skeleton spec rendering L1 (mission + pillars), L2 (one suggested truth), L3 (the key interaction pattern)

**Behavior rules:**
- Advancing past a step requires its required field(s) to be non-empty
- On validation failure, display an inline error message; do not advance
- Progress indicator shows "Step N of 4" above the current step
- Completed steps are summarized above the current step (read-only summary)
- Output appears immediately on step 4 completion — no loading state
- Wizard state is session-only; refreshing resets to Step 1
- No network requests at any step
- Keyboard: Tab through fields; Enter to advance; Escape to go back (where possible)

## Key Rules

- **No external calls.** Both components are pure client-side. No fetch, no analytics, no tracking within the components.
- **Graceful degradation.** If JavaScript fails to load, Explorer shows all levels expanded; Wizard shows a static message explaining the feature requires JavaScript.
- **Mechanical feel.** Transitions are functional (expand/collapse in [short duration]) not decorative. No spring physics, no parallax.
- **Accessible.** Both components have correct ARIA roles, labels, and live regions. Focus management is correct for expand/collapse interactions.

## Interactions with Other Systems

- Reads hierarchy level descriptions from CONTENT_SYSTEM
- Uses visual tokens from PRESENTATION_SYSTEM for all styling
- No interaction with THEME_SYSTEM (theme is applied globally via CSS variables; components inherit automatically)
