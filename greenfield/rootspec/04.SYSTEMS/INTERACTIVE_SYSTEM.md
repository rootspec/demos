# Level 4: Interactive System

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md
**Part of:** SYSTEMS_OVERVIEW.md

---

## Responsibility

The Interactive System owns the client-side logic for the two interactive features: the Hierarchy Explorer and the Spec Wizard. It manages all interactive state, user input processing, and output generation. It does not own visual tokens (THEME_SYSTEM) or layout (LAYOUT_SYSTEM).

---

## Subsystem 1: Hierarchy Explorer

### Purpose
Make the five RootSpec levels tangible and explorable. Visitors click a level to see its role, allowed references, and example content. Visual arrows show that references flow upward only.

### Data Model

**Level entity:**
```
id: L1 | L2 | L3 | L4 | L5
name: string
icon: string
purpose: string
key_question: string
example_content: string (markdown snippet)
can_reference: Level[] (always a subset of levels with lower numbers)
state: collapsed | expanded
```

**Explorer state:**
```
expanded_levels: Level[]  (zero or more levels can be expanded simultaneously)
hovered_level: Level | null
```

### State Transitions

- Default state: all levels collapsed, displaying name and icon only
- On click: level toggles between expanded/collapsed
- On hover: level and its allowed references are visually highlighted; non-referenced levels are de-emphasized
- On keyboard (Enter/Space on focused level): same as click
- On keyboard (Escape): collapse the currently focused level

### Reference Visualization

Visual connectors show which levels each level can reference. Arrows flow upward only (lower levels reference higher ones, never the reverse). When a level is hovered, its reference arrows become visually prominent; others fade.

### Rules
- All five levels are always visible (collapsed or expanded)
- A level may be expanded independently of others
- The reference arrow visualization is always present, not just on hover — hover emphasizes
- Content inside expanded levels is example content from the framework, not the user's spec

---

## Subsystem 2: Spec Wizard

### Purpose
Let visitors apply the methodology to their own product idea. Three guided steps produce a skeleton spec showing how their input maps to L1-L3. Client-side only. No data transmitted or persisted.

### Data Model

**Wizard state:**
```
current_step: 1 | 2 | 3 | "output"
step1_input: string (product idea, one line)
step2_selection: string (mission — chosen from templates or written custom)
step3_selections: string[] (design pillars — [minimum pillars] to [maximum pillars] selected)
output: SkeletonSpec | null
```

**Mission templates:**
A fixed list of [several] mission statement templates covering common product types (productivity, communication, knowledge, developer tools, etc.). Each template has placeholder text the user can accept or customize.

**Pillar suggestions:**
A fixed list of [many] design pillar suggestions organized by emotional category (empowerment, clarity, trust, delight, focus, etc.). Visitors select [minimum pillars] to [maximum pillars].

**SkeletonSpec:**
```
product_idea: string
mission: string
design_pillars: string[]
l1_preview: string (formatted L1 Philosophy fragment)
l2_preview: string (formatted L2 Truths fragment — derived from mission)
l3_preview: string (formatted L3 Interactions fragment — derived from pillars)
```

### Step Flow

**Step 1 — Product Idea:**
- Single text input, one line
- Validation: non-empty, non-whitespace-only
- Cannot advance with empty input

**Step 2 — Mission:**
- Display [several] mission templates as selectable options
- "Write my own" option reveals freeform input
- Exactly one selection required to advance
- Selected template pre-fills with the user's product idea interpolated

**Step 3 — Design Pillars:**
- Display [many] pillar suggestions as multi-select chips
- Must select between [minimum] and [maximum] pillars
- Below minimum: soft warning message, Next is enabled after minimum is reached
- Above maximum: selection is blocked; message explains the limit

**Output:**
- Rendered skeleton spec with L1-L3 sections populated from the wizard's inputs
- Format mirrors the structure of a real RootSpec L1-L3 spec
- Display only — no copy button, no export, no save

### Navigation Rules
- Back navigation restores previous step's values
- Progress indicator shows current step (1, 2, 3)
- Previous step summary (collapsed) appears above current step after step 1

### Rules
- No data leaves the client
- Output is deterministic — same inputs produce same output
- Wizard is reset on page reload (no persistence)
- All wizard interactions are keyboard-accessible
- Touch targets are [adequately sized] for mobile use

---

## Boundaries

- The Interactive System does NOT own visual tokens — consumes from THEME_SYSTEM
- The Interactive System does NOT own layout — rendered within containers from LAYOUT_SYSTEM
- The Interactive System does NOT own the before/after comparison toggle — that belongs to PRESENTATION_SYSTEM
- All wizard content (templates, suggestions) is defined in this system, not in CONTENT_SYSTEM
