# Level 4: Interactive System
# RootSpec Marketing Site

## Responsibility

The Interactive System owns all client-side stateful UI components. It manages component state, handles user input, and renders dynamic output using static content from CONTENT_SYSTEM. It has no backend, makes no API calls, and persists no data beyond the current session (except THEME_SYSTEM's localStorage key, which is out of scope here).

## Components

### 1. Hierarchy Explorer

**Purpose:** Let visitors experience the five-level RootSpec hierarchy interactively — clicking levels to expand them and seeing reference directionality visualized.

**State:**
- `expandedLevel`: enum `null | 'L1' | 'L2' | 'L3' | 'L4' | 'L5'` — which level is currently expanded
- `hoveredLevel`: enum `null | 'L1' | 'L2' | 'L3' | 'L4' | 'L5'` — which level is being hovered (desktop only)

**Behavior:**
- Clicking a level expands it and collapses any previously expanded level (single-expand accordion)
- Hovering a level highlights the reference arrows relevant to that level (which it can reference; which it cannot)
- Reference arrows are SVG elements; they animate on hover/focus to indicate directionality (upward only)
- Keyboard: Tab moves between levels; Enter/Space expands/collapses focused level; arrows are decorative only (not separately focusable)
- On mobile: hover state does not apply; tap expands; reference directionality shown in expanded content text

**State transitions:**
- `expandedLevel = null` → click Level N → `expandedLevel = 'LN'`
- `expandedLevel = 'LN'` → click Level N → `expandedLevel = null` (toggle off)
- `expandedLevel = 'LN'` → click Level M → `expandedLevel = 'LM'`

**Content source:** CONTENT_SYSTEM — level names, descriptions, and example content

### 2. Spec Your Idea Wizard

**Purpose:** Guide a visitor through a structured 4-step process to produce a skeleton spec skeleton, making the methodology feel approachable.

**State:**
```
currentStep: integer (1–4)
inputs:
  productIdea: string
  missionChoice: enum (template_A | template_B | template_C | custom)
  missionCustomText: string (if missionChoice = custom)
  selectedPillars: array of string (3–5 items)
  keyInteraction: string
output:
  skeletonSpec: string (generated from inputs + templates)
```

**Step rules:**
- Step 1: `productIdea` must be non-empty to advance
- Step 2: `missionChoice` must be selected (or `missionCustomText` non-empty if custom) to advance
- Step 3: `selectedPillars` must have between [minimum pillars] and [maximum pillars] items to advance
- Step 4: `keyInteraction` must be non-empty to generate output
- Output is rendered after Step 4 completion; not visible before

**Back navigation:** permitted at any step; prior inputs preserved in state

**Output generation rule:** Apply `skeletonTemplate` from CONTENT_SYSTEM, substituting:
- `{productIdea}` → Step 1 input
- `{mission}` → resolved mission text (template text or custom text)
- `{pillars}` → selected pillar names as list
- `{interaction}` → Step 4 input

**Copyable output:** Output panel provides a copy-to-clipboard control. No toast or confirmation — the control itself shows a "Copied!" label for [short duration] then resets.

**Reset:** Wizard resets to Step 1 with empty state on page reload. No persistence.

**Failure modes:**
- Advancing with missing required input: "Next" button disabled; error state on unfilled field
- More than [maximum pillars] pillars selected: additional selections are rejected (checkbox becomes inactive)
- Clipboard API unavailable: copy button hidden; output text is still selectable manually

### 3. Before/After Comparison

**Purpose:** Show side-by-side (desktop) or toggled (mobile) real content comparing a vague spec doc to a RootSpec-structured doc.

**State:**
- `activePanel`: enum `'before' | 'after'` — used on mobile toggle; ignored on desktop (both visible)
- `layout`: enum `'side-by-side' | 'toggle'` — derived from viewport; mobile = toggle, desktop = side-by-side

**Behavior (desktop):** Both panels always visible; no toggle; no state change needed
**Behavior (mobile):** One panel visible at a time; toggle button switches between them

**Keyboard (mobile):** Toggle button operable via Enter/Space; focus does not trap

**Content source:** CONTENT_SYSTEM — panel text is real spec artifacts, not placeholder content

## Interactions With Other Systems

| System | Interaction |
|--------|-------------|
| CONTENT_SYSTEM | Reads level descriptions, wizard templates, panel content; never writes |
| LAYOUT_SYSTEM | Receives viewport breakpoint context to determine mobile vs. desktop layout |
| THEME_SYSTEM | Components inherit theme from root attribute; no component-level theme override |

## Rules

- No external API calls from any component
- No persistence beyond current page session (wizard state is ephemeral)
- All interactive components must have visible focus indicators at all times
- All state changes must produce immediate visual feedback — no loading states for client-side operations
- Components must function correctly with JavaScript enabled; graceful static fallback required when JavaScript is disabled (see L3)
