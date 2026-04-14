# Level 4: Interactive System

**System:** INTERACTIVE_SYSTEM
**References:** L1-3, Sibling L4, External

---

## Responsibility

Owns the three interactive features that demonstrate the RootSpec methodology: the Hierarchy Explorer, the Spec Wizard, and the Before/After Comparison. All components are React islands (client-side only). No server state, no API calls.

---

## Components

### Hierarchy Explorer

**Purpose:** Make the five-level spec hierarchy tangible through direct interaction
**Data owned:** Five level definitions (name, description, example content, allowed reference targets)

**Behavior:**
- Renders all five levels simultaneously in a visual layout
- Each level is expandable — click or keyboard Enter/Space to toggle
- When a level is active, it shows its example content and highlights the levels it can reference
- Reference highlights: upward arrows or connectors indicate the dependency direction
- Only one level expanded at a time (or multiple — designer's choice based on readability)
- Collapses on Escape key
- Static fallback: all levels visible without expand/collapse when JS unavailable

**State:**
- `activeLevel`: which level is currently expanded (null if none)
- `hoveredLevel`: which level the cursor/focus is on (for reference highlighting)

---

### Spec Wizard

**Purpose:** Let visitors sketch a minimal spec for their own product idea, experiencing the methodology firsthand
**Data owned:** Step definitions, pillar suggestion list, output templates

**Behavior:**
- Three-step linear flow
- Step 1: Free-text product idea input
- Step 2: Pillar selection (checkboxes or toggle buttons from a suggestion list; option to write custom)
- Step 3: Free-text key interaction input
- Each step validates non-empty before advancing
- On completion, renders a skeleton spec preview labeled by level (L1: mission, L1: pillars, L3: interaction)
- Back button returns to previous step with inputs preserved

**State:**
- `currentStep`: 1, 2, or 3, or `complete`
- `productIdea`: string
- `selectedPillars`: array of strings
- `keyInteraction`: string
- `validationError`: string or null

**Constraints:**
- All output is template-generated; no AI or API involvement
- No persistence — state resets on page refresh
- Output is labeled "Skeleton Spec — not a complete RootSpec" to set expectations

---

### Before/After Comparison

**Purpose:** Show concretely what RootSpec adds to a development workflow
**Data owned:** "Without" panel content, "With RootSpec" panel content

**Behavior (desktop):** Side-by-side panels, optionally with a drag-handle slider
**Behavior (mobile):** Toggle switch between "Without" and "With" views
**Content:** Real methodology examples — a vague requirements fragment vs. its structured equivalent with spec level label, acceptance criterion, and pillar reference

**State:**
- `activePanel`: `without` | `with` (mobile toggle state)
- `sliderPosition`: [0–100] percentage (desktop slider, if implemented)

---

## Shared Constraints

- No external API calls — all data is static or derived from user input
- No data persistence across page loads
- All components respect inherited CSS variables from THEME_SYSTEM
- All components are keyboard accessible per L3 interaction specs
- All components are touch-friendly (minimum target size, no hover-only states)

---

## Boundaries

- Does not own page layout or component mounting positions (LAYOUT_SYSTEM owns that)
- Does not own theme state (THEME_SYSTEM owns that)
- Does not own static copy outside the interactive components

---

## Interactions with Other Systems

| System | Nature |
|--------|--------|
| LAYOUT_SYSTEM | Mounts React islands at designated section slots |
| THEME_SYSTEM | Inherits CSS variables via class on root element |
| CONTENT_SYSTEM | Interactive sections positioned between static content sections |
