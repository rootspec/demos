# Level 4: Interactive System

## Responsibility

Owns the runtime state and behavior of the two interactive components: the Hierarchy Explorer and the Spec Wizard. Reads content definitions from CONTENT_SYSTEM at initialization; all subsequent state is component-local and session-only.

## Boundaries

- **Owns:** Explorer active-level state, wizard current-step state, wizard collected answers, wizard output rendering
- **Does not own:** Content definitions (owned by CONTENT_SYSTEM), theme tokens (owned by THEME_SYSTEM), layout decisions (owned by LAYOUT_SYSTEM)
- **Does not persist:** Any user input — wizard answers are discarded on navigation or page refresh
- **Does not call:** Any external APIs or services

## Subsystems

### Hierarchy Explorer

**State:**

```
explorer_state:
  active_level: integer | null (1–5, or null if none expanded)
  hovered_level: integer | null (used to show reference highlights)
```

**Rules:**

- Only one level may be expanded at a time. Clicking an already-expanded level collapses it.
- Hovering (or focusing) a level highlights all levels it is permitted to reference (levels with lower IDs). Reference lines or highlights flow upward only.
- Keyboard navigation: Tab cycles through levels; Enter/Space toggles expansion; Escape collapses the current level.
- On mobile, hover effects are replaced by active (expanded) state — the reference highlight is shown when a level is expanded.
- If JS is unavailable, all five levels render as readable static content (progressive enhancement).

**State Transitions:**

```
click level N:
  if active_level == N → active_level = null
  else → active_level = N

hover/focus level N:
  hovered_level = N

blur/mouseleave:
  hovered_level = null
```

### Spec Wizard

**State:**

```
wizard_state:
  step: integer (1–4; step 4 is the output screen)
  answers:
    idea: string (step 1: one-line product idea)
    mission: string (step 2: selected or written mission)
    pillars: string[] (step 3: 3–5 selected or written design pillars)
    interaction: string (step 4 input: describe one key interaction)
  completed: boolean
```

**Rules:**

- Step 1 requires a non-empty idea string before Next is enabled.
- Step 2 requires a mission string (selected template or free text) before Next is enabled.
- Step 3 requires exactly [min_pillars] to [max_pillars] pillars selected or written before Next is enabled.
- Step 4 (interaction description) is required before generating output.
- Back button is always available from steps 2–4; returns to the previous step with previous answers preserved.
- Output screen (after step 4) renders a skeleton spec showing L1–L3 structure populated with the user's answers. No Next button; a "Start over" or "Try again" action resets to step 1.
- All answers are session-only; no localStorage, no network call, no persistence.

**Output Format:**

The wizard output renders a skeleton spec document showing:
- L1: Mission (from step 2) and Design Pillars (from step 3)
- L2: A note that truths would be derived from these foundations
- L3: The key interaction described in step 4, framed as an interaction pattern

The output is formatted to look like a real (abbreviated) RootSpec document — demonstrating the methodology's structure, not just producing a block of text.

**Validation Rules:**

- Idea: max [idea_max_chars] characters; whitespace-only is invalid
- Mission: max [mission_max_chars] characters
- Pillars: minimum [min_pillars], maximum [max_pillars]; each pillar max [pillar_max_chars] characters
- Interaction description: max [interaction_max_chars] characters; whitespace-only is invalid

## Interactions with Other Systems

- **CONTENT_SYSTEM** → **INTERACTIVE_SYSTEM**: Provides hierarchy level definitions (for explorer) and wizard template data (mission options, pillar suggestions) at initialization
- **LAYOUT_SYSTEM** → **INTERACTIVE_SYSTEM**: Provides mobile/desktop viewport context so interactive components can adapt their layout (e.g., tap vs. hover for explorer reference highlights)
