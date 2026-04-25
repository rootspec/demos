# Level 4: Spec Wizard System

References: [01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md]

## Responsibility

The Spec Wizard guides a visitor through a three-step process of describing a product idea and produces a skeleton RootSpec (L1-L3) as output. Its purpose is to make the methodology approachable and tangible — a visitor who completes the wizard should understand what RootSpec output looks like using their own words.

This system is entirely client-side. No AI calls, no backend, no data persistence. Output is generated from structured templates populated with the visitor's input.

This system does NOT own:
- Page layout or surrounding prose (owned by LAYOUT_SYSTEM and CONTENT_SYSTEM)
- Visual tokens (owned by THEME_SYSTEM)

## Data Model

### Wizard Input

| Field | Step | Type | Constraints |
|-------|------|------|-------------|
| product_idea | 1 | String | Required; [minimum length] |
| mission_selection | 1 | Enum or String | Chosen from templates or custom input |
| design_pillars | 2 | Array of Strings | Minimum [pillar min count]; maximum [pillar max count]; from suggestions or custom |
| key_interaction | 3 | String | Required; [minimum length] |

### Template Library

**Mission templates** — pre-written starting points the visitor can select or adapt:
- "To give [audience] the ability to [capability] without [current friction]"
- "To make [domain] accessible to people who [currently excluded group]"
- "To replace [current painful process] with something that [desired outcome]"
- Custom option: free text entry

**Design Pillar suggestions** — a set of [pillar suggestion count] emotional phrases the visitor can choose from or supplement with custom entries. Examples:
- "Effortless Clarity" — knowing the right thing without searching
- "Calm Control" — in charge without feeling overwhelmed
- "Earned Confidence" — trust built through demonstrated results
- "Delightful Discovery" — finding value you didn't know to look for
- Custom option: free text entry per pillar

### Skeleton Spec Output

The output is a formatted text block showing how visitor inputs map to L1-L3:

**L1: Philosophy (from visitor's mission and pillars)**
- Mission statement: derived from `mission_selection` + `product_idea`
- Design Pillars: each selected `design_pillar` rendered as a pillar entry
- Each pillar labeled with its level: "L1: Design Pillar"

**L2: Truths (generated from pillar choices using templates)**
- One or two stable truths derived from the selected pillars
- Each labeled: "L2: Stable Truth"

**L3: Interactions (derived from `key_interaction`)**
- One core interaction flow derived from the visitor's `key_interaction` text
- Labeled: "L3: Interaction Flow"

Each section of the output is visually labeled with its level.

## Step Rules

### Step 1 — Mission

- Required: at least one of `product_idea` or `mission_selection` must have content
- "Next" button is disabled until minimum input is satisfied
- Inline validation message appears if visitor attempts to advance without input

### Step 2 — Design Pillars

- Required: at least [pillar min count] pillars selected or entered
- "Next" button is disabled until minimum is met
- Custom pillar input is validated for [minimum length] before being added to selection
- Maximum [pillar max count] pillars — additional pillar selections replace the oldest if max is reached (or disable additional selection)

### Step 3 — Key Interaction

- Required: `key_interaction` must meet [minimum length]
- "Generate Spec" button is disabled until minimum is met

### Output Step

- Appears after "Generate Spec" is activated
- Output is displayed inline (not a modal, not a new page)
- Visitor can copy the output (copy-to-clipboard button)
- "Start Over" returns to Step 1 and clears all input

## Navigation

- Step indicator shows current step position (e.g., "Step N of [total steps]") — always visible
- "Back" button available on Steps 2, 3, and Output — returns to previous step without clearing input
- "Start Over" available on Output step — clears all input and returns to Step 1

## State Managed

| State | Type | Persistence |
|-------|------|-------------|
| current_step | Enum: 1, 2, 3, output | Session-ephemeral |
| product_idea | String | Session-ephemeral |
| mission_selection | String | Session-ephemeral |
| design_pillars | Array of Strings | Session-ephemeral |
| key_interaction | String | Session-ephemeral |
| generated_output | String | Session-ephemeral |

State is local to the component instance. Not shared with other systems. Cleared on page refresh.

## Rules

- No data is transmitted to any server — all template filling occurs in the browser
- No AI calls — output is deterministic, based on templates and visitor input
- Output reflects visitor's actual words — not rephrased, not summarized
- Validation is non-blocking — it prevents advancing, but never deletes input or shows alarming messages

## Interfaces

### Consumed from Other Systems

- THEME_SYSTEM: form input tokens, button tokens, surface tokens

### Exposes to LAYOUT_SYSTEM

- A self-contained island component mounted in a page section
- Manages its own state; no external state store required
