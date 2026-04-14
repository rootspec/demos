# Level 4: Interactive System

> References: 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md

## Responsibility

Owns the three interactive features: Hierarchy Explorer, Spec Wizard, and Before/After Comparison. Each feature is a self-contained client-side component. No shared mutable state between features. No server calls.

## Boundaries

- **Owns:** Component state, interaction logic, local event handlers for the three interactive features
- **Does not own:** Page layout (PRESENTATION_SYSTEM), content copy (CONTENT_SYSTEM), design tokens (THEME_SYSTEM), grid/spacing (LAYOUT_SYSTEM)
- **Receives:** Content data as props from CONTENT_SYSTEM; CSS tokens from THEME_SYSTEM

## Components

### HierarchyExplorer

**State:**
- `expandedLevel: number | null` — Which level is currently expanded (null = none)
- `hoveredLevel: number | null` — Which level is currently hovered

**Data (received as props):**
- Array of 5 level objects: `{ id, name, icon, purpose, exampleContent, canReference: number[] }`

**Behavior:**
- Click a level: toggles `expandedLevel` (clicking open level collapses it)
- Hover a level: sets `hoveredLevel`; levels NOT in the hovered level's `canReference` array are visually dimmed
- Arrow/connection rendering: drawn from each level downward to show allowed references (arrows point up, meaning "L4 references L3" is shown as an arrow from L4 to L3)
- Keyboard: Tab between level cards, Enter/Space to toggle expand, Escape to collapse all

**Accessibility:**
- Each level card: `role="button"`, `aria-expanded`, `aria-label`
- Reference arrows: decorative, `aria-hidden="true"`

### SpecWizard

**State:**
- `currentStep: 1 | 2 | 3` — Active step
- `productIdea: string` — Free text from step 1
- `selectedMission: string` — From step 2 (template or custom)
- `selectedPillars: string[]` — Min 3, max 5 from step 3
- `output: SpecOutput | null` — Generated after step 3

**Data (received as props):**
- Mission templates: array of `{ id, text }` (4 options)
- Pillar suggestions: array of `{ id, label }` ([N] options)

**Behavior:**
- Step 1: Text input required before Next is enabled
- Step 2: One mission selection required (template or free text) before Next is enabled
- Step 3: ≥3 pillar selections required before output generates
- Output: Skeleton L1–L3 spec using user's inputs; formatted as code block; copyable to clipboard
- "Start Over" resets all state to step 1

**Output format:**
```
## Mission
{selectedMission}

## Design Pillars
{selectedPillars mapped to pillar format}

## Key Interaction
One core loop derived from productIdea
```

**Keyboard:** Tab through options, Space to select/deselect, Enter on Next/Back/Start Over

### BeforeAfterComparison

**State:**
- `activePanel: 'before' | 'after'` — Which panel is emphasized on mobile

**Data (received as props):**
- `beforeContent: PanelContent` — "Without spec" document
- `afterContent: PanelContent` — "With RootSpec" document

**Behavior:**
- Desktop: Both panels visible side-by-side with equal weight
- Mobile: Toggle button switches which panel is in focus (other stacks below or collapses)
- Content is real examples — a vague requirements doc vs. a RootSpec-structured equivalent

## State Isolation

Each component manages its own state. There is no shared store across components. The Wizard does not know the Hierarchy Explorer's state. Theme state flows in from THEME_SYSTEM via CSS, not JavaScript.

## Progressive Enhancement

If JavaScript fails or is disabled:
- HierarchyExplorer: Renders all levels expanded in a static list
- SpecWizard: Replaced by a static description of the wizard's purpose
- BeforeAfterComparison: Both panels visible in stacked layout

No interactive feature is critical to understanding the site's content. All core information is accessible without JavaScript.
