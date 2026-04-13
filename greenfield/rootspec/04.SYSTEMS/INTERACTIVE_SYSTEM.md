# Level 4: Interactive System

*References: 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md, LAYOUT_SYSTEM.md, THEME_SYSTEM.md*

## Responsibility

Manages all client-side interactive components: the Hierarchy Explorer, the Spec Wizard, and the Before/After Comparison. All components are stateful React components hydrated client-side into the Astro layout. No external API calls; all state is ephemeral (session-only) except theme.

## Boundaries

- **Owns:** Interactive component state, interaction logic, wizard templates, hierarchy data
- **Does not own:** Page layout/structure (LAYOUT_SYSTEM), static copy (CONTENT_SYSTEM), theme state (THEME_SYSTEM)
- **Consumes:** Theme class from THEME_SYSTEM to style components; breakpoint context from LAYOUT_SYSTEM

## Components

### HierarchyExplorer

**Purpose:** Visualize the five-level RootSpec hierarchy with upward-only reference arrows. Make the core concept tangible through exploration.

**State:**
| Property | Type | Values |
|----------|------|--------|
| `activeLevel` | number or null | 1-5 or null (none expanded) |
| `hoveredLevel` | number or null | 1-5 or null |

**Data model:**
Each level has: `id` (1-5), `name` (string), `icon` (emoji), `purpose` (string), `exampleContent` (markdown string), `canReference` (array of level ids)

**Behaviors:**
- Click a level panel: sets `activeLevel` to that level (collapse if already active)
- Hover a level panel: sets `hoveredLevel`; highlights allowed reference levels
- Reference arrows: visual connectors showing which levels each can reference (upward only)
- Keyboard: `Tab` to focus levels, `Enter`/`Space` to expand/collapse, `Escape` to collapse active
- All panels have `aria-expanded` state

**Layout:**
- Desktop: horizontal row or vertical list with connecting lines
- Mobile: stacked vertically; arrows simplified to directional indicators

**RootSpec Methodology diagram:**
- SVG illustration depicting spec as a surrounding validation gate on the development cycle
- Valid solutions pass through; invalid ones are identified and redirected
- Can be embedded within or adjacent to this component

### SpecWizard

**Purpose:** Let visitors apply the RootSpec methodology to their own product idea, generating a skeleton L1-L3 spec from their inputs.

**State:**
| Property | Type | Description |
|----------|------|-------------|
| `step` | 1-3 or `output` | Current wizard step |
| `productIdea` | string | One-line product description |
| `mission` | string | Selected or custom mission |
| `pillars` | string[] | 3-5 selected design pillars |
| `keyInteraction` | string | One key user interaction |

**Step 1 — Product Idea:**
- Input: text field for one-line product description
- Validation: non-empty to proceed (empty allowed — fills with placeholder)

**Step 2 — Mission + Design Pillars:**
- Mission: radio selection from [N] templates + "write my own" option; templates cover: productivity tool, developer tool, consumer app, B2B SaaS, creative tool
- Design Pillars: grid of [N] suggested pillars; visitor selects 3-5; custom entry available
- Pillars are emotional phrases, not features (examples: "Empowered Action", "Calm Clarity", "Trustworthy Precision")

**Step 3 — Key Interaction:**
- Textarea: describe one core user interaction in plain text

**Output Screen:**
- Renders skeleton spec showing L1 (Mission + selected Pillars), L2 (implied trade-off from pillars), L3 (the described interaction formatted as a flow)
- Labeled clearly: "This is a skeleton — a starting point, not a complete spec"
- Copy-to-clipboard button for the generated output

**Navigation:**
- Back button always available (Step 2 → Step 1; Step 3 → Step 2; Output → Step 3)
- Progress indicator showing current step number and total steps
- No step is required; empty inputs produce placeholder values in output

**Keyboard:** All controls keyboard-accessible; Tab/Enter navigation; no mouse required

### BeforeAfterComparison

**Purpose:** Show concrete before/after of a fictional "TaskManager" product — once with a vague spec, once with a RootSpec-structured spec.

**State:**
| Property | Type | Values |
|----------|------|--------|
| `view` | enum | `split` (desktop), `without` (mobile toggle), `with` (mobile toggle) |

**Without-spec panel content:**
- Title: "Without RootSpec"
- Contents: vague prose requirements ("The app should be fast and users should like it"), ambiguous user stories ("As a user, I want to manage my tasks"), no traceability, no hierarchy

**With-spec panel content:**
- Title: "With RootSpec"
- Contents: L1 mission + two design pillars, L3 core interaction loop, L5 example user story with pillar reference and testable acceptance criteria
- Demonstrates traceability from mission → pillars → interaction → testable story

**Desktop layout:** Side-by-side panels with visual divider; or slider to reveal
**Mobile layout:** Toggle button switches between panels; current panel label visible

**Accessibility:** Toggle button labeled with current view; panel content readable by screen reader

## Shared Concerns

### Performance
- Interactive components use client-side hydration (islands architecture if Astro)
- Components must not block initial page render
- State is in-memory only; no localStorage except THEME_SYSTEM's preference

### Error Handling
- No network calls to fail
- Empty/invalid user input: gracefully fill with placeholder text, never show an error state in wizard
- Component mounting failure: static fallback message displayed (LAYOUT_SYSTEM provides slot)

### Accessibility
- All interactive elements have descriptive `aria-label` or visible labels
- Focus management: when a wizard step changes, focus moves to the new step heading
- Color contrast meets WCAG AA in both light and dark themes
- No interactions require precise mouse positioning (no drag-only interactions)
