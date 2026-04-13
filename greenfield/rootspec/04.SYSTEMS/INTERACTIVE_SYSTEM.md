# Level 4: Interactive System

**System:** INTERACTIVE_SYSTEM
**Last Updated:** 2026-04-12

---

## Responsibility

The Interactive System owns all client-side state and behavior for the three interactive sections: the Hierarchy Explorer, the "Spec Your Idea" Wizard, and the Before/After Comparison. It renders these sections, manages their internal state, and handles user input. It does not make network requests.

---

## Boundaries

- **Owns:** Hierarchy Explorer state, Wizard state and template engine, Before/After comparison state
- **Does not own:** Theme tokens, layout wrapper, content copy outside interactive sections
- **Reads from:** THEME_SYSTEM (via CSS custom properties only — no direct coupling)
- **Provides to:** CONTENT_SYSTEM (wizard output is displayed as formatted spec content)

---

## Sub-System: Hierarchy Explorer

### State
- `activeLevel`: which of the five levels is currently expanded (nullable; none expanded by default or first level on load)
- `hoveredLevel`: which level is currently hovered/focused (for highlighting reference connections)

### Data Model: Level Entry

| Field | Type | Description |
|-------|------|-------------|
| `id` | enum: L1–L5 | Level identifier |
| `name` | string | Level name (e.g., "Foundational Philosophy") |
| `icon` | string | Visual icon or emoji |
| `purpose` | string | One-line description of what this level defines |
| `exampleContent` | string | Illustrative example from the RootSpec Marketing Site itself |
| `canReference` | enum[] | Which levels this level can reference |
| `referencedBy` | enum[] | Which levels reference this one (derived) |

### Behavior Rules
- Clicking a level that is collapsed: expands it, collapses any previously expanded level
- Clicking a level that is expanded: collapses it
- Hovering/focusing a level: highlights that level and all levels it can reference (dimming the others)
- Arrow keys (Up/Down): move focus between levels
- Enter/Space: expand/collapse focused level
- All five levels are always visible; only one is expanded at a time

### No-JS Fallback
All five levels are rendered in an expanded static accordion layout. Reference connections are described in text rather than visual arrows.

---

## Sub-System: Spec Your Idea Wizard

### State
- `step`: current step (idea input → mission → pillars → interaction → output)
- `productIdea`: user-entered one-line product idea
- `selectedMission`: chosen mission template (or custom text)
- `selectedPillars`: array of chosen design pillars ([min pillars] to [max pillars] required)
- `interactionDescription`: user-entered description of one key interaction
- `outputSpec`: generated skeleton spec (computed from inputs)

### Data Model: Template

**Mission Templates** (user selects one or writes their own):
Each template is a short mission statement with a slot for the product idea:
- "[Product] must exist because [users] are underserved by [existing approach]."
- "[Product] transforms how [users] do [activity] by prioritizing [value] over [tradition]."
- "[Product] exists to give [users] [capability] they couldn't have without it."

**Pillar Suggestions** (user picks 3-5, can add one custom):
A curated list of [min pillar count] to [max pillar count] design pillar concepts:
- Effortless Relief
- Empowered Action
- Calm Clarity
- Earned Trust
- Delightful Surprise
- Confident Progress
- Transparent Control
- Focused Flow
- (Plus space to write one custom pillar)

**Interaction Prompt:**
Free text field. Placeholder: "Describe one key interaction — what does the user do and what happens?"

### Template Engine Rules
- Wizard output is a markdown-formatted skeleton spec
- L1 section uses the product idea + selected mission + selected pillars
- L2 section is a placeholder stub with one example trade-off derived from pillar choices
- L3 section uses the interaction description to generate a basic trigger/action/feedback loop
- All numeric values in the output use placeholders (e.g., `[duration]`, `[count]`)
- The engine runs synchronously, client-side only

### Validation Rules
- Step 0 (idea): product idea must be non-empty (trim whitespace) before proceeding
- Step 2 (pillars): at least [min pillars] must be selected before proceeding
- Step 4 (output): output is always shown; it is never empty

### Accessibility
- Each step has a visible step indicator (e.g., "Step [n] of [total]")
- Focus moves to the first interactive element of the new step on advance
- Output is announced to screen readers on reveal
- Keyboard: Enter advances steps; Escape does not close the wizard

### No-JS Fallback
The wizard section describes the three steps as a static illustration. A link to the RootSpec GitHub repo replaces the interactive output.

---

## Sub-System: Before/After Comparison

### State
- `activeView`: `before` or `after` (default: `before` on mobile, `side-by-side` on wider viewport)
- `sliderPosition`: fraction [left, right] of the divider on desktop (default: center)

### Behavior Rules
- **Desktop (wider viewport):** Two panels displayed side-by-side with a draggable divider slider
- **Mobile (narrower viewport):** Toggle button switches between single-panel views
- Dragging the slider updates the proportional width of each panel in real time
- The "before" panel contains content from CONTENT_SYSTEM (without-spec artifacts)
- The "after" panel contains content from CONTENT_SYSTEM (with-RootSpec artifacts)
- Labels ("Without RootSpec" / "With RootSpec") are always visible regardless of slider position

### Accessibility
- Toggle button (mobile) has `aria-pressed` reflecting current state
- Slider (desktop) uses `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Arrow keys move the slider by [increment step]

### No-JS Fallback
Both panels are displayed stacked vertically. No slider or toggle is present.
