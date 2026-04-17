# Interactive System

**References:** `01.PHILOSOPHY.md`, `02.TRUTHS.md`, `03.INTERACTIONS.md`, `SYSTEMS_OVERVIEW.md`, `CONTENT_SYSTEM.md`, `THEME_SYSTEM.md`

---

## Responsibility

Manages all client-side interactive components: the Hierarchy Explorer, the Spec Wizard, and the Before/After Comparison. This system owns interactive state and user-driven transformations. It does not manage theme or layout — only user interaction logic.

---

## Components

### Hierarchy Explorer

**Purpose:** Let visitors experience the five-level structure by interacting with it.

**State:**
| Property | Type | Initial Value |
|----------|------|---------------|
| `expandedLevel` | enum: null \| 1 \| 2 \| 3 \| 4 \| 5 | null |
| `hoveredLevel` | enum: null \| 1 \| 2 \| 3 \| 4 \| 5 | null |

**Level Data (from CONTENT_SYSTEM):**
- Level name and icon
- Brief description
- Example content (condensed)
- Allowed references (which levels it can reference)

**State Transitions:**
```
User clicks/taps level card:
  expandedLevel = that level (toggle: if already expanded → null)

User hovers/focuses level card:
  hoveredLevel = that level

User leaves hover/blur:
  hoveredLevel = null
```

**Reference Visualization:**
- When a level is hovered/focused, levels it CAN reference are highlighted
- Levels it CANNOT reference are visually de-emphasized
- Arrows or lines between levels indicate allowed reference directions (upward only)

**Accessibility:**
- Each level card is focusable (`tabindex=0` or button element)
- Enter or Space expands/collapses
- Arrow keys navigate between levels
- Expanded content is announced to screen readers
- Focus does not trap; visitor can tab out

---

### Spec Wizard

**Purpose:** Let visitors apply the methodology to their own idea and produce a skeleton spec.

**State:**
| Property | Type | Initial Value |
|----------|------|---------------|
| `currentStep` | enum: 1 \| 2 \| 3 \| output | 1 |
| `productIdea` | string | "" |
| `selectedMission` | string | "" |
| `selectedPillars` | string[] | [] |
| `keyInteraction` | string | "" |

**Step Structure:**
```
Step 1: Product Idea
  - Text input: "Describe your product idea in one line"
  - Forward navigation requires non-empty input

Step 2: Mission
  - Display [N] mission templates (from CONTENT_SYSTEM)
  - Visitor selects one OR writes their own (free text fallback)
  - Forward navigation requires selection or non-empty custom text

Step 3: Design Pillars
  - Display [M] pillar suggestions (from CONTENT_SYSTEM)
  - Visitor selects 3-5 OR writes custom pillars
  - Forward navigation requires 3-5 selections

Output Panel:
  - Shows skeleton spec with visitor's input mapped to L1-L3 structure
  - Displays as formatted text/code block
  - No submission — output is client-side only
  - "Start over" resets state to Step 1
```

**Template Engine:**
- Assembles skeleton spec from static templates + visitor inputs
- No AI, no external API — pure string interpolation
- Output format mirrors actual RootSpec L1-L3 structure

**Accessibility:**
- Step navigation via keyboard (Next/Back buttons are standard buttons)
- Template selections via keyboard (radio or checkbox inputs)
- Output panel is readable by screen readers
- Error states (insufficient pillars, empty input) announced inline

---

### Before/After Comparison

**Purpose:** Show real contrast between unstructured and RootSpec-structured approaches.

**State:**
| Property | Type | Initial Value |
|----------|------|---------------|
| `activeView` | enum: before \| after | before |

**Content (from CONTENT_SYSTEM):**
- "Before" panel: excerpt from a realistic vague requirements doc with ambiguous stories
- "After" panel: same product idea expressed as RootSpec hierarchy with testable stories and design pillar traces

**Toggle Mechanism:**
- Toggle button or labeled tab: "Without RootSpec" / "With RootSpec"
- OR slider mechanism if visual comparison is appropriate
- Keyboard accessible: toggle via keyboard, labeled for screen readers

**State Transitions:**
```
User clicks "Without RootSpec" / toggles to before:
  activeView = before

User clicks "With RootSpec" / toggles to after:
  activeView = after
```

---

## Rules

- No external API calls from any interactive component
- Spec Wizard uses templates only — no generation
- Wizard output must clearly label which part of output corresponds to which spec level
- All interactive state is ephemeral (in-memory) — no persistence except theme (owned by THEME_SYSTEM)
- Touch targets must be [minimum accessible size] for mobile usability

---

## Interactions with Other Systems

- Reads level content from CONTENT_SYSTEM (for Hierarchy Explorer)
- Reads templates from CONTENT_SYSTEM (for Spec Wizard)
- Reads panel content from CONTENT_SYSTEM (for Before/After)
- Reads `currentMode` from THEME_SYSTEM (for dark/light visual rendering)
- Emits animation triggers to PRESENTATION_SYSTEM (expand/collapse transitions)
- Receives viewport signals from LAYOUT_SYSTEM (to adapt touch vs. hover behavior)
