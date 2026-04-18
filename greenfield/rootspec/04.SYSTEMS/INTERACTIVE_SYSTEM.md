# Level 4: Interactive System
# RootSpec Marketing Site

---

## Responsibility

The Interactive System owns the three interactive sections of the site: the Hierarchy Explorer, the Spec Wizard, and the Before/After Comparison. It manages all in-session state for these features and renders outputs from user input combined with Content System templates.

---

## Boundaries

**Owns:**
- Hierarchy Explorer: active level state, expand/collapse logic, reference highlight logic
- Spec Wizard: step state, collected user inputs, output skeleton generation
- Before/After Comparison: active panel state, toggle logic

**Does not own:**
- Content data (level descriptions, wizard templates) — provided by Content System
- Visual transitions and animations — delegated to Presentation System
- Layout breakpoints that determine interaction variants — queried from Layout System
- Any external API calls

---

## Subsystem: Hierarchy Explorer

### State
- `active_level`: `null` | `1` | `2` | `3` | `4` | `5`
- `hovered_level`: `null` | `1` | `2` | `3` | `4` | `5`

### Behavior
- Clicking a level sets it as `active_level` and collapses any previously active level
- Clicking the active level again collapses it (toggles)
- Hovering a level sets `hovered_level`, which triggers reference highlighting in the UI
- Reference arrows between levels are drawn based on the reference matrix in the Content System's level descriptions
- Arrows always flow upward (lower levels reference higher levels, never the reverse)

### Keyboard Navigation
- `ArrowUp` / `ArrowDown` move focus between level cards
- `Enter` / `Space` expand or collapse the focused level
- `Escape` collapses any open level

### Mobile Variant
- On narrow viewports, the explorer renders as a vertically stacked list
- Reference arrows are replaced by parenthetical labels (e.g., "References L1–L2")
- Tap targets meet minimum size standards

---

## Subsystem: Spec Wizard

### State
- `current_step`: `1` | `2` | `3` | `complete`
- `step_1_input`: user-entered product idea (string)
- `step_1_mission`: selected or written mission statement (string)
- `step_2_pillars`: array of selected design pillars (min [N], max [M])
- `step_3_interaction`: user-entered interaction description (string)
- `output`: generated spec skeleton (derived from collected inputs + templates)

### Steps

**Step 1: Product Mission**
- User enters a one-line product idea
- User selects a mission template or writes their own
- Validation: idea field must not be empty; mission must be selected or entered

**Step 2: Design Pillars**
- User selects [3–5] design pillar suggestions from the Content System's list
- Or: user writes their own pillar
- Validation: minimum [3] pillars selected before advancing

**Step 3: Key Interaction**
- User describes one core user interaction in free text
- Validation: field must not be empty

**Completion: Output**
- The system combines inputs with templates to generate a skeleton spec covering L1 (mission, pillars) and L3 (interaction pattern)
- Output is formatted to resemble real RootSpec file content (markdown-like structure)
- Output is rendered inline below the wizard steps

### Rules
- Validation failures show inline feedback, not modal dialogs
- Advancing without completing a required field does nothing — the step does not advance
- Users can navigate backward through steps freely
- Wizard state resets on page reload (no persistence)
- No AI or API call — all output is generated from static templates and string interpolation

### Keyboard Support
- Tab navigates through inputs and controls
- Enter advances to next step
- Escape resets the wizard

---

## Subsystem: Before/After Comparison

### State
- `active_panel`: `without_spec` | `with_rootspec`

### Behavior
- On desktop: side-by-side panels with a slider or tab/button toggle
- On mobile: stacked panels with a tab toggle
- Switching panels brings the active panel into focus; the inactive panel dims
- Content is fully static — all text comes from the Content System

### Rules
- The default active panel is `without_spec` (shows the problem state first)
- No user input is required beyond the toggle interaction
