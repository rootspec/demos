# Level 4: Interactive System

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md

---

## Responsibility

Owns the three interactive components: Hierarchy Explorer, Spec Wizard, and Before/After Comparison. Each component is a self-contained React island with local state only — no shared state between components.

---

## Component: Hierarchy Explorer

### Purpose

Makes the five-level RootSpec hierarchy tangible by letting visitors click into each level and see its content and reference rules.

### Data Model

```
levels: [
  {
    id: 'L1',
    name: 'Foundational Philosophy',
    icon: '📘',
    tagline: 'WHY & WHAT EXPERIENCE',
    description: string,
    exampleContent: string,
    canReference: []  // no references (external only)
  },
  {
    id: 'L2',
    name: 'Stable Truths',
    icon: '⚙️',
    tagline: 'WHAT Strategy',
    description: string,
    exampleContent: string,
    canReference: ['L1']
  },
  // ... L3, L4, L5
]
```

All level data is hardcoded in the component — no API calls.

### State

| State Key       | Type   | Values         |
|-----------------|--------|----------------|
| activeLevelId   | string | null, L1–L5    |

### Behavior

- Default state: no level expanded (`activeLevelId = null`)
- Click/Enter on a level: sets `activeLevelId` to that level; if already active, collapses to null
- When a level is active: expands to show description, example content, and reference annotations
- Reference arrows: SVG lines or CSS-based indicators showing "this level references ↑" — flow is always upward only
- On hover/focus: highlight the levels this level can reference (dim others)
- Keyboard: Tab order follows visual top-to-bottom order; Enter/Space toggles expansion

### Responsive Behavior

- Desktop: Levels displayed side-by-side or as a vertical stack with expansion inline
- Mobile: Vertical stack only; arrows simplify to text label ("References: L1, L2")

---

## Component: Spec Wizard

### Purpose

Lets visitors experience the RootSpec intake process by walking through three structured steps with their own product idea, producing a skeleton spec skeleton.

### State

| State Key     | Type       | Values                              |
|---------------|------------|-------------------------------------|
| step          | integer    | 1, 2, 3, or 'output'                |
| productIdea   | string     | Free text (Step 1)                  |
| mission       | string     | Free text or selected template      |
| pillars       | string[]   | 1–5 selected or entered strings     |
| keyInteraction| string     | Free text (Step 3)                  |

### Step 1 — Mission

- Free-text input: "What's your product idea?"
- Template chips: 3–5 clickable mission starters (e.g., "Help developers...", "Enable teams to...", "Simplify the process of...")
- Clicking a chip populates the input (user can edit)
- "Next →" enabled when input is non-empty

### Step 2 — Design Pillars

- Prompt: "What should users feel when using it?"
- Suggestion chips: ~10 pre-written design pillar starters (e.g., "In control", "Confident", "Focused", "Delighted")
- User can click chips to select (highlighted state) or type their own
- "Next →" enabled when at least 1 pillar selected or entered
- Selected count shown: "X selected (3–5 recommended)"

### Step 3 — Key Interaction

- Free-text input: "Describe one core thing users do in your product"
- "Generate Spec →" button enabled when input is non-empty

### Output

A formatted spec skeleton displayed as a code block or spec-styled card:

```
## Mission
[mission text from Step 1]

## Design Pillars
- [pillar 1]
- [pillar 2]
...

## Key Interaction
[interaction text from Step 3]

→ This maps to Levels 1–3 in a RootSpec hierarchy.
```

Accompanied by a brief explanation of what levels this covers and what L4–L5 would contain.

"Start over" button resets all state to Step 1.

### Navigation Rules

- Back button always enabled (except on Step 1)
- Back preserves all previously entered values
- No data is persisted to storage; clearing the page clears all state

---

## Component: Before/After Comparison

### Purpose

Shows the concrete difference between unstructured requirements and a RootSpec-structured spec for the same product.

### Data Model

Both panels contain real content (not placeholder):

**Without RootSpec panel:**
- A realistic example of a vague requirements doc: "Users should be able to manage tasks. Tasks should be fast. We'll add analytics later."
- Ambiguous story: "As a user, I want to manage my tasks so that I can be productive."
- No traceability, no design rationale

**With RootSpec panel:**
- Mission statement
- One design pillar with user perspective
- One testable story with acceptance criteria referencing the pillar
- Decision trace: "This feature exists because of [pillar name]"

### State

| State Key   | Type   | Values            |
|-------------|--------|-------------------|
| activePanel | string | 'without', 'with' |
| sliderPct   | number | 0.0–1.0           |

### Behavior

- Default: toggle shows "Without RootSpec" panel active
- Toggle click: switches `activePanel`, crossfade animation
- Desktop: drag slider option available; slider position maps to continuous reveal between panels
- Mobile: toggle only (no drag slider)

### Keyboard

- Toggle button is focusable; Enter/Space switches panels
- Slider (desktop): arrow keys move slider position by increments

---

## Shared Rules for All Components

- No external API calls — all data is hardcoded or derived from user input
- No shared state between components — each is an isolated island
- All interactive elements are keyboard accessible
- Each component renders a readable fallback if JavaScript fails (static HTML approximation)
- Components respect the active theme from THEME_SYSTEM (via Tailwind dark: variants)
