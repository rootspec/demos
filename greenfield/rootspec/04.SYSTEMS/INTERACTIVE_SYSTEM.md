# Level 4: Interactive Systems

**Product:** RootSpec Marketing Site
**Version:** 1.0.0
**Status:** Active

---

## Overview

This document covers the three interactive client-side islands: the Hierarchy Explorer, the Spec Wizard, and the Before/After Comparison. All three are React components mounted as Astro islands with `client:load` or `client:visible` directive. All three run entirely client-side; no server communication occurs.

---

## HIERARCHY_EXPLORER

### Responsibility

Provide an interactive visualization of the RootSpec five-level hierarchy. Visitors click a level to expand it and see example content. Visual indicators show which levels each level can reference. The explorer makes the core concept of the methodology tangible without requiring the visitor to read the full specification.

### Data Ownership

| Data | Description |
|------|-------------|
| Level definitions | Static array of 5 levels (L1–L5), each with: name, icon, tagline, example content, allowed references list |
| Explorer state | Which levels are currently expanded (array of level IDs) |

The level definitions are hardcoded in the component — they do not come from the spec files at build time and are not user-configurable.

### State

- `expandedLevels: Set<number>` — which levels the visitor has expanded. Starts empty (all collapsed) or with L1 expanded as a hint.
- No persistence — state resets on page reload.

### Interaction Rules

- Clicking an unexpanded level expands it; clicking an expanded level collapses it
- When a level is focused or hovered, levels it can reference are visually highlighted (e.g., dimmed or accented border)
- Reference arrows or indicators flow upward only — L5 can point to L1-L4; L1 has no outgoing references
- Keyboard: Tab moves focus between levels; Enter/Space expands or collapses the focused level

### Reference Visualization Rules

| Level | Can Reference |
|-------|--------------|
| L1 (Philosophy) | External only — no other levels highlighted |
| L2 (Truths) | L1 |
| L3 (Interactions) | L1, L2 |
| L4 (Systems) | L1, L2, L3, sibling L4 |
| L5 (Implementation) | L1, L2, L3, L4 |

### Constraints

- Must work on touch devices — tap targets [sufficient tap target size] minimum
- Must be keyboard navigable
- Reference indicators must be legible at small viewport widths; may simplify to text-only on narrow breakpoints
- Animations are quick and functional ([brief transition duration]); no spring physics, no parallax

---

## SPEC_WIZARD

### Responsibility

A three-step guided experience that accepts a one-line product idea from the visitor and walks them through selecting a mission, design pillars, and a key interaction. The output is a skeleton spec showing how their input maps to L1, L2, and L3 in RootSpec format.

### Data Ownership

| Data | Description |
|------|-------------|
| Mission templates | Static list of mission statement templates (selectable or free-text) |
| Pillar suggestions | Static list of [min pillar options count] or more design pillar suggestions |
| Step state | Current step (1, 2, or 3), plus the visitor's selections/text at each step |
| Output | Derived from step state at completion; not stored independently |

### Wizard Steps

**Step 1 — Mission**
- Input: Product idea (text field, required)
- Selection: Mission statement — pick from templates or write custom
- Templates include varied options (transformation-focused, access-focused, quality-focused, etc.)
- Advance when product idea + mission are both filled

**Step 2 — Design Pillars**
- Selection: Choose [min pillars count] to [max pillars count] design pillars from suggestions
- Each suggestion is a short emotional phrase (e.g., "Effortless Relief", "Earned Confidence")
- Custom pillar input available for users who want to define their own
- Advance when [min pillars count] or more pillars are selected

**Step 3 — Key Interaction**
- Input: Describe one key interaction — what triggers it, what happens, what the user feels
- Free text, no template required
- Advance to output when field is filled

**Output**
- Rendered skeleton spec showing:
  - L1 section: Mission (visitor's text) + Design Pillars (visitor's selections)
  - L2 section: One derived truth (template-generated from mission phrasing)
  - L3 section: One interaction pattern (formatted from Step 3 input)
- Output uses RootSpec document format with level labels and section headers
- Output is rendered in the page; no download, no copy-to-clipboard required (optional nice-to-have)

### State

- `currentStep: 1 | 2 | 3 | 'output'`
- `productIdea: string`
- `missionChoice: string` (template selection or custom text)
- `selectedPillars: string[]`
- `keyInteraction: string`

State is in-memory only. Navigating away or reloading loses progress.

### Constraints

- Advance buttons are disabled until required inputs are filled
- Previous step navigation is available at any step
- The output section must clearly label all three levels (L1, L2, L3)
- No AI API calls — all output is template-based
- The section framing (outside the wizard component) must indicate that output is template-based, not AI-generated

---

## COMPARISON_SYSTEM

### Responsibility

Present a side-by-side or toggled view comparing a feature described without a spec ("Without RootSpec") versus the same feature described with the RootSpec methodology ("With RootSpec").

### Data Ownership

| Data | Description |
|------|-------------|
| Without-spec panel content | Static: vague requirements doc, ambiguous user story, untraceable decisions |
| With-spec panel content | Static: structured hierarchy entry, testable story with acceptance criteria, feature tracing to a design pillar |
| Toggle state | `activePanel: 'without' | 'with'` — only relevant on narrow viewports where panels stack |

### Panel Content

Both panels use the same fictional feature (e.g., "User Notifications") to make the contrast meaningful. Content is real and specific — not lorem ipsum. The "without" panel shows plausible developer-domain entropy; the "with" panel shows the corresponding RootSpec artifacts.

### Layout Rules

- Wide viewports: Both panels visible side by side
- Narrow viewports: Toggle or tab interface to switch between panels; toggle state persists in session (does not persist across reloads)

### Constraints

- Panel content is static — no dynamic generation
- The feature chosen for comparison must be plausible and relatable to the target audience (developers who've experienced scope drift)
- No animation required; panels are static content containers
