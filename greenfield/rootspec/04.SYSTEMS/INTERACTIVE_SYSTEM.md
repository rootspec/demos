# Interactive System

**Version:** 7.3.2
**Status:** Draft

---

## Responsibility

Owns all interactive features on the page: the Hierarchy Explorer visualization, the Spec Your Idea Wizard, and the Before/After Comparison toggle. All state is client-side and ephemeral (not persisted between sessions). No external API calls.

## Boundaries

- **Owns:** Wizard step state, selected pillars, wizard output text, hierarchy level expansion state, comparison toggle state
- **Does not own:** Theme (THEME_SYSTEM), layout grid (LAYOUT_SYSTEM), animations (PRESENTATION_SYSTEM)
- **Does not call:** External APIs

## Subsystems

### Hierarchy Explorer

A visual, interactive representation of the five RootSpec levels.

**Data owned:**
| Data | Type | Default |
|------|------|---------|
| Active level | enum (L1–L5) or null | null |
| Hovered level | enum (L1–L5) or null | null |

**Behavior:**
- Each level is a card: title, icon, one-sentence role description
- Clicking a card expands it to show example content for that level
- Reference arrows connect levels; when a level is active, arrows to its allowed references highlight
- Levels that the active level cannot reference dim (visual de-emphasis)
- Only one level is expanded at a time; activating another collapses the previous

**Reference map (derived from L1-L4 hierarchy rules):**
- L1: no inbound references; no arrows from above
- L2: can reference L1
- L3: can reference L1, L2
- L4: can reference L1, L2, L3, sibling L4
- L5: can reference all levels

### Spec Your Idea Wizard

A three-step guided wizard that produces a skeleton spec fragment (L1-L3) from user input.

**Data owned:**
| Data | Type | Default |
|------|------|---------|
| Current step | integer (1–3) | 1 |
| Product idea | string | "" |
| Selected mission template | string or "custom" | null |
| Custom mission text | string | "" |
| Selected design pillars | string[] | [] |
| Key interaction text | string | "" |
| Output spec | string | null |

**Steps:**
1. Enter product idea (text input, required)
2. Select or write mission (radio: choose from [small count] templates, or write custom text)
3. Select design pillars from suggestions (multi-select, minimum [small count], maximum [moderate count]) and describe one key interaction (text input, required)

**Output generation:**
- Fully client-side template assembly
- Output is a markdown-formatted spec skeleton showing L1 (mission + pillars), L2 (implied trade-off), L3 (key interaction pattern) based on user inputs
- Output is displayed in a read-only panel; user can copy it

**Validation:**
- Step 1: product idea must be non-empty to advance
- Step 3: at least [minimum pillar count] pillars must be selected and key interaction must be non-empty to generate output

### Before/After Comparison

A toggle showing two states of the same product scenario: "without spec" and "with RootSpec".

**Data owned:**
| Data | Type | Default |
|------|------|---------|
| Active panel | enum ("before", "after") | "before" |

**Content:**
- Both panels contain real, non-placeholder content
- "Without spec": vague requirements doc, ambiguous stories, untraceable decisions
- "With RootSpec": structured hierarchy excerpt, testable stories, decision traceability note
- On mobile: single panel with toggle button; on desktop: side-by-side or slider

## Rules

- All state is ephemeral; refreshing the page resets all interactive components
- No data is sent anywhere; all processing is local
- Wizard output must be deterministic for the same inputs (no randomness)
- Interactive components must render meaningful static content if JavaScript is unavailable

## Interactions with Other Systems

- **LAYOUT_SYSTEM:** Receives viewport size; adapts layout of hierarchy explorer (stack vs. grid) and comparison (single vs. side-by-side)
- **PRESENTATION_SYSTEM:** Triggers animations on state change (expand, step transition, panel switch); does not own animation logic
- **CONTENT_SYSTEM:** Wizard output text is owned by INTERACTIVE_SYSTEM, not CONTENT_SYSTEM
- **THEME_SYSTEM:** Inherits theme via CSS class on root; no JavaScript wiring needed
