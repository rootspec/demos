# Level 4: Interactive System

References: [L1: Foundational Philosophy], [L2: Stable Truths], [L3: Interaction Architecture], [L4: SYSTEMS_OVERVIEW]

## Responsibility

Owns all client-side interactive components. Manages the internal state of the Hierarchy Explorer, Spec Wizard, and Before/After Comparison. All interactivity is client-side only — no API calls, no server round-trips.

## Components Owned

### Hierarchy Explorer
**State:** Which level is currently selected (or none); hover state for reference highlighting

**Behavior:**
- Five level cards displayed visually (L1 through L5)
- Clicking a card expands it to show example content for that level
- Visual arrows indicate reference direction — upward only (dependency inversion)
- Hovering a level highlights its allowed reference paths
- Keyboard navigable: arrow keys move focus between levels, Enter/Space expands

**Responsive adaptation:**
- Wide viewport: horizontal/diagram layout with visible arrows
- Narrow viewport: vertical accordion — one level expanded at a time, arrows hidden

**Reset:** Clicking an already-selected card collapses it (no selection state)

### Spec Wizard
**State:** Current step (1–3), user inputs per step, completion status, output visibility

**Step data owned:**
- Step 1: product idea text, selected or custom mission statement
- Step 2: selected design pillars (from curated list) or custom entries
- Step 3: key interaction description (free text)

**Behavior:**
- Step indicator shows position and completion
- Advancing requires valid input (non-empty mission; at least [minimum pillars] pillar selected)
- Invalid advance attempt shows inline validation message, does not navigate
- On completion, outputs a skeleton spec fragment mapping inputs to L1-L3
- Output animates into view
- Reset button clears all state and returns to Step 1

**Output format:** Spec fragment displayed as formatted code block, structured like an actual RootSpec file

### Before/After Comparison
**State:** Active panel (Before or After) on mobile; always-visible on desktop

**Content:** Real copy contrasting vague traditional spec with structured RootSpec spec for the same example product

**Behavior:**
- Desktop: two panels side by side, separated by a labeled divider
- Mobile: tab toggle — only one panel visible at a time
- Visual differentiation between panels (distinct styling to make contrast clear)

## Data Ownership

- Explorer: selected level ID, hover state
- Wizard: step index, per-step user inputs, validation errors, output visibility
- Comparison: active panel (mobile only)
- Curated pillar list (static, defined at build time — not fetched)
- Wizard template strings (static, defined at build time)

## Boundaries

- No external API calls — all data and logic is bundled at build time
- No shared state with CONTENT_SYSTEM or LAYOUT_SYSTEM — components receive props only
- Theme tokens consumed from PRESENTATION_SYSTEM; INTERACTIVE_SYSTEM does not manage color or typography
- Wizard output is a display-only formatted string — it is not saveable, shareable, or submitted anywhere
- Local storage is not used by INTERACTIVE_SYSTEM (only THEME_SYSTEM uses local storage)
