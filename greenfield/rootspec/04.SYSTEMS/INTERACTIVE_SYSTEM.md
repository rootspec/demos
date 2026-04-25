# Level 4: Interactive System

## Responsibility

Owns all client-side interactive components: the Hierarchy Explorer visualization, the Spec Your Idea Wizard, and the Before/After Comparison. These components are the primary demonstrations of the RootSpec methodology in action.

## Boundaries

**Owns:**
- Hierarchy Explorer component state and behavior
- Spec Your Idea Wizard state machine and output generation
- Before/After Comparison toggle state
- Keyboard navigation implementation for all three components
- Client-side only — no external API calls, no server state

**Does not own:**
- Theme tokens (THEME_SYSTEM)
- Layout containers (LAYOUT_SYSTEM)
- Static content outside interactive components (CONTENT_SYSTEM)

## Data Ownership

### Hierarchy Explorer State

- `expandedLevel`: `null` | `1` | `2` | `3` | `4` | `5` — which level is currently expanded (accordion: one at a time)
- `hoveredLevel`: `null` | level number — which level is currently hovered (for highlighting allowed references)
- Five level definitions: label, description, example content, allowed reference levels
- Reference arrows: computed from `hoveredLevel` — highlights only upward-flowing connections

### Spec Wizard State

- `currentStep`: `0` | `1` | `2` | `3` (0 = idea input, 1 = mission, 2 = pillars, 3 = output)
- `productIdea`: string — user's one-line product description
- `selectedMission`: string — chosen or written mission statement
- `selectedPillars`: string[] — [three to five] selected design pillar labels
- `keyInteraction`: string — user's description of one core interaction
- `outputSpec`: object — skeleton spec generated from the above inputs

### Before/After Comparison State

- `activePanel`: `without` | `with` — which panel is currently visible
- Content for both panels is static — determined at build time, not user-generated

## Component Behaviors

### Hierarchy Explorer

- Five levels displayed as expandable nodes
- Click (or Enter/Space) on a level: toggles it open; collapses any previously open level
- Hover on a level: highlights that level and dims levels it cannot reference; arrows show allowed reference directions (upward only)
- Keyboard: Tab moves between levels, Enter/Space expands/collapses, Escape collapses all
- Each expanded level shows: level name, purpose, example content relevant to the RootSpec methodology itself
- Visual connections between levels use SVG arrows or CSS borders; arrows flow upward only

### Spec Wizard

- Linear step flow: idea → mission → pillars → interaction → output
- Step 0: Single text input for product idea; placeholder shows an example
- Step 1: Mission templates as selectable cards + free-text write-your-own option
- Step 2: Pillar suggestions as selectable chips; user must pick [three to five]; write-your-own option available
- Step 3: Text area for one key interaction description
- Output: Skeleton spec rendered as structured text showing L1 (mission + pillars) and L3 (interaction); copy button
- Back navigation: user can return to any previous step to revise
- No AI calls — output is generated from templates with user inputs interpolated

### Before/After Comparison

- Two panels: "Without RootSpec" and "With RootSpec"
- Default state: both panels visible side-by-side on desktop; toggle on mobile
- "Without" panel: realistic vague requirements doc — ambiguous user stories, no traceability
- "With" panel: same product concept as a structured RootSpec hierarchy with traceable decisions
- Content is real and substantive — not lorem ipsum
- Toggle switches between panels (mobile) or highlights one panel (desktop)

## State Transitions

### Explorer
```
All collapsed → user clicks Level N → Level N expands
Level N expanded → user clicks Level N → all collapsed
Level N expanded → user clicks Level M → Level N collapses, Level M expands
Any state → user hovers Level N → reference highlight activates
```

### Wizard
```
Step 0 (empty) → user types idea → Step 0 (filled)
Step 0 (filled) → user clicks Next → Step 1
Step 1 → user selects mission → Step 1 (selection made)
Step 1 → user clicks Next → Step 2
Step 2 → user selects [three to five] pillars → Step 2 (selection made)
Step 2 → user clicks Next → Step 3
Step 3 → user describes interaction → Step 3 (filled)
Step 3 → user clicks Generate → Output displayed
Any step → user clicks Back → previous step (state preserved)
```

## Interactions with Other Systems

| System | Interaction |
|--------|-------------|
| THEME_SYSTEM | All interactive components consume theme color tokens; focus states use accent color |
| LAYOUT_SYSTEM | LAYOUT_SYSTEM provides viewport context; wizard and explorer adapt for mobile (single-column, larger tap targets) |
| CONTENT_SYSTEM | Interactive components are embedded within content sections; they do not own surrounding prose |

## Rules

- No external API calls — all interactivity is client-side
- All three components must be keyboard-accessible
- Interactive components must be usable with thumb-only interaction on mobile viewports
- Wizard output must be copyable (copy button on output panel)
- Hierarchy Explorer arrows must flow upward only — never downward — to reinforce the reference hierarchy
- Wizard pillar selection must enforce the [three to five] range — fewer than [three] should block proceeding, more than [five] should be prevented
- Before/After content must be substantive — real examples of the contrast, not placeholder text
