# System: Interactive System

> References: L1 (01.PHILOSOPHY.md), L2 (02.TRUTHS.md), L3 (03.INTERACTIONS.md)
> Interacts with: THEME_SYSTEM (CSS inheritance), LAYOUT_SYSTEM (section wrapper)

## Responsibility

Owns the three interactive widgets: Hierarchy Explorer, Spec Wizard, and Before/After Comparison. All are React islands rendered client-side. All state is ephemeral — nothing persists between sessions.

## Components

### Hierarchy Explorer (`HierarchyExplorer.tsx`)

- **Data:** Five level definitions (name, description, example content, allowed references) — hardcoded
- **State:** `activeLevel: number | null` — which level is expanded
- **Interactions:** Click/Enter to expand; hover to highlight reference arrows; keyboard navigable
- **Output:** None — purely presentational

### Spec Wizard (`SpecWizard.tsx`)

- **Data:** Mission templates, design pillar suggestions — hardcoded arrays
- **State:** `step: 1|2|3`, `mission: string`, `pillars: string[]`, `interaction: string`
- **Interactions:** Step navigation, template selection, free-text input, pillar multi-select
- **Output:** Rendered skeleton spec string (L1–L3 mapping) — displayed in-component, copyable
- **Validation:** Step 1 requires non-empty mission; Step 2 requires 3–5 pillars selected

### Before/After Comparison (`ComparisonSection.tsx`)

- **Data:** "Without RootSpec" and "With RootSpec" panel content — hardcoded
- **State:** `position: number` (slider 0–100, desktop) or `activePanel: 'before'|'after'` (mobile)
- **Interactions:** Drag handle (desktop), toggle button (mobile)
- **Output:** None — purely presentational

## Boundaries

- Does NOT call any external APIs
- Does NOT read from or write to localStorage (THEME_SYSTEM owns that)
- Does NOT own page layout (LAYOUT_SYSTEM wraps each interactive section)
- Each widget is a self-contained React component with no shared state between them

## Accessibility

- Explorer nodes: `role="button"`, `aria-expanded`, `tabIndex={0}`
- Wizard steps: `aria-live="polite"` region for step announcements; focus moves to new step heading on advance
- Comparison: panels have `aria-label`; toggle has `aria-pressed`
