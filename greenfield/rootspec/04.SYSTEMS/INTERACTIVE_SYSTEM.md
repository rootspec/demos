# Level 4: Interactive System

## Responsibility

All interactive features: hierarchy explorer, spec wizard, and before/after comparison. Owns user interaction state, input handling, and dynamic output rendering.

## Hierarchy Explorer

### State

```
explorer_state:
  expanded_level: null | 1 | 2 | 3 | 4 | 5
  hovered_level: null | 1 | 2 | 3 | 4 | 5
  highlighted_references: [level_numbers]
```

### Entities

Each level has:
- id (1-5)
- icon (emoji)
- title (string)
- subtitle (string — the "WHY", "WHAT", "HOW", etc.)
- example_content (markdown string — shown when expanded)
- allowed_references (array of level ids that this level can reference)

### Behavior

- Click a level → toggles expansion. If another level is expanded, collapse it first.
- Hover a level → highlight the levels it can reference (arrows/lines illuminate upward)
- Reference visualization: lines or arrows between levels, flowing upward only. When a level is hovered, its reference lines highlight; all others dim.
- Only one level expanded at a time.

### Data

Level content is hardcoded (not fetched). The five levels and their example content are defined as a static data structure.

### Fallback

If JavaScript fails to initialize, all five levels render in a static expanded state with text descriptions of reference rules.

## Spec Wizard

### State

```
wizard_state:
  current_step: 1 | 2 | 3 | "result"
  mission: string (user input)
  selected_template: string | null
  pillars: [string] (3-5 selected or custom)
  interaction: {
    who: string
    trigger: string
    feedback: string
  }
```

### Step 1: Mission

- Text input field for product idea
- [template-count] template suggestions displayed as clickable cards
- Selecting a template pre-fills the text input
- "Next" button enabled when input is non-empty

### Step 2: Design Pillars

- Display [pillar-suggestion-count] suggested emotional pillars as selectable chips
- Suggestions may adapt based on mission input (simple keyword matching, not AI)
- User can select 3-5 pillars
- User can type custom pillars
- "Next" enabled when 3-5 pillars selected

### Step 3: Key Interaction

- Three text inputs: Who (user role), Trigger (what starts it), Feedback (what the user gets)
- Optional: pre-fill suggestions based on mission
- "Generate" button enabled when all three fields are non-empty

### Result

- Display a skeleton spec card showing:
  - L1 section: Mission statement + selected pillars
  - L2 section: Inferred truth (template-based)
  - L3 section: Interaction loop from the three inputs
- Card is styled to look like a spec document
- "Start over" button resets wizard state

### Fallback

If JavaScript fails, show a pre-filled example spec card with all three steps visible as static content.

## Before/After Comparison

### State

```
comparison_state:
  active_view: "without" | "with"
```

### Panels

**Without spec panel:**
- Vague requirements document excerpt (real content, not lorem ipsum)
- Ambiguous user story example
- Decision with no traceable rationale

**With RootSpec panel:**
- Same requirements, structured into the five-level hierarchy
- Testable user story with acceptance criteria
- Decision traced to a design pillar

### Behavior

- Toggle or slider switches between the two views
- On desktop: side-by-side with a draggable divider, or toggle buttons
- On mobile: stacked panels with toggle buttons
- Transition between states is smooth (crossfade or slide)

### Fallback

If JavaScript fails, both panels render side-by-side statically.

## Shared Interactive Conventions

- All interactive elements use `data-test` attributes
- All state is ephemeral — no persistence between page loads
- Animations respect `prefers-reduced-motion`
- Focus management: interactive elements are focusable and keyboard-operable
- ARIA: `role`, `aria-expanded`, `aria-selected`, `aria-label` on all interactive elements
