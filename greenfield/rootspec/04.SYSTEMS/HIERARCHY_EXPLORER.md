# Level 4: Hierarchy Explorer System

References: [01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md]

## Responsibility

The Hierarchy Explorer is an interactive visualization of the five RootSpec levels. Its purpose is to make the core concept of RootSpec tangible without requiring the visitor to read documentation. A visitor who interacts with this component should understand the hierarchy, the reference rules, and what each level contains.

This system does NOT own:
- Page layout or surrounding prose (owned by LAYOUT_SYSTEM and CONTENT_SYSTEM)
- Visual tokens (owned by THEME_SYSTEM)
- Wizard-style guided input (owned by SPEC_WIZARD)

## Data Model

### Level Definition

Each level has:
- `id` — canonical identifier (L1–L5)
- `name` — display name (e.g., "Foundational Philosophy")
- `icon` — visual identifier (emoji or SVG icon)
- `tagline` — one-sentence description of the level's purpose
- `key_question` — the question this level answers (e.g., "Why does this product exist?")
- `example_content` — sample spec content demonstrating what belongs at this level (real RootSpec excerpt, not lorem ipsum)
- `can_reference` — list of level IDs this level is allowed to reference (e.g., L2 can reference ["L1", "external"])

### Reference Rules (encoded in data)

| Level | Can Reference |
|-------|--------------|
| L1 | External only |
| L2 | L1 + External |
| L3 | L1, L2 + External |
| L4 | L1, L2, L3 + Sibling L4 + External |
| L5 | L1, L2, L3, L4 + External |

## Component States

### Level States

Each level can be in one of three states:
- **Collapsed** — default; shows icon, name, tagline
- **Expanded** — shows full example content; only one level expanded at a time
- **Highlighted** — hover/focus state; shows which reference arrows connect to this level

### Global States

- **Idle** — no level is expanded; invitation to click is visible
- **Level selected** — one level is expanded; reference arrows visible for that level
- **Hover/focus** — a level is hovered or focused but not yet expanded

## Rules

- Only one level can be expanded at a time; expanding a new level collapses the previously expanded one
- Hovering (or focusing) a level highlights its allowed upstream reference levels
- Reference arrows flow upward only — L1 has no references shown; L5 shows connections to all others
- On mobile, reference arrows are replaced with text indicators ("Can reference: L1, L2, L3")
- Collapsed levels remain interactive — they can be focused, hovered, and expanded

## Interactions

### Mouse

- Click collapsed level → expand it; collapse any previously expanded level
- Click expanded level → collapse it (back to idle)
- Hover any level → highlight it and its allowed references; show reference connections

### Keyboard

- Tab → moves focus through levels in L1→L5 order
- Enter or Space → expand focused level (or collapse if already expanded)
- Escape → collapse currently expanded level; return focus to that level trigger

### Touch

- Tap collapsed level → expand it
- Tap expanded level → collapse it
- No hover states on touch; reference connections shown inline or as text

## Diagram and Visual Connections

The component should include a simple SVG diagram depicting the hierarchy — not a flowchart, not a generic tech illustration. The diagram should:
- Show the five levels as a vertical or tree structure
- Use clear linework and intentional spacing
- Arrow direction: upward only (implementation references philosophy, not vice versa)
- On hover of a level, arrows from that level to its references are highlighted in accent color
- Diagram must feel considered — not a Visio export or clip-art icon set

Alternatively: if the SVG diagram cannot meet the aesthetic bar described above, replace with text-based reference indicators inside the expanded level view.

## Example Content Requirements

Each level's `example_content` must:
- Be actual RootSpec output — not invented examples
- Demonstrate what real spec content looks like at that level
- Be concise enough to read quickly (not a full spec file)
- Use the real methodology's terminology and format

## Interfaces

### Consumed from Other Systems

- THEME_SYSTEM: accent color token for reference highlight state, text color tokens, border tokens

### Exposes to LAYOUT_SYSTEM

- A self-contained island component that can be mounted in a page section
- Component manages its own state; no external state management required

## State Managed

| State | Type | Persistence |
|-------|------|-------------|
| expanded_level | Enum: L1–L5 | null | Session-ephemeral |
| hovered_level | Enum: L1–L5 | null | Transient (cleared on mouse leave / blur) |

State is local to the component instance. No cross-system state sharing required.
