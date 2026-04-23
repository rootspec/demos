# Level 4: Content System

## Responsibility

Owns all static and structured content displayed on the page. Defines the canonical text, hierarchy level definitions, wizard templates, and comparison panel content. Content is authored in component or data files and rendered at build time.

## Boundaries

- **Owns:** Section copy, hierarchy level descriptors, wizard step templates (mission options, pillar suggestions, interaction prompts), before/after comparison content, footer attribution text
- **Does not own:** Theme state, layout decisions, interactive state, build-time injected values (version, URLs)
- **Does not compute:** Anything at runtime — all content is static after build

## Data Structures

### Section Content

Each section on the page has a canonical content entry:

```
section:
  id: string (e.g., "hero", "problem", "how-it-works")
  heading: string
  subheading: string (optional)
  body: rich text / HTML (optional)
  cta: { label: string, href: string } (optional)
```

### Hierarchy Level Definitions

Five entries, one per RootSpec level:

```
hierarchy_level:
  id: integer (1–5)
  label: string (e.g., "Philosophy")
  icon: string (emoji or SVG reference)
  tagline: string (one sentence)
  question: string (the key question this level answers)
  example_content: string (multi-line, rendered when level is expanded)
  can_reference: integer[] (ids of levels this level may reference; empty for L1)
```

### Wizard Templates

```
wizard_step:
  step: integer (1–4)
  prompt: string
  type: "free_text" | "single_select" | "multi_select"

mission_templates: string[] (pre-written options for step 2)
pillar_suggestions: string[] (chip labels for step 3)
```

### Comparison Panels

```
comparison_panel:
  id: "without_spec" | "with_rootspec"
  label: string
  content_blocks: {
    type: "heading" | "body" | "list" | "code" | "label"
    text: string
  }[]
```

## State

Content System has no runtime state. All data is constant after build time. The PRESENTATION_SYSTEM injects the version string into the hero/header content slot at build time.

## Rules

- All GitHub URLs in content must be absolute (e.g., `https://github.com/rootspec/demos/tree/main/greenfield/...`)
- Footer attribution must include the AI builder's name and the build date
- Hierarchy level `example_content` must use real, meaningful examples — not lorem ipsum
- Comparison panel content must use realistic, representative examples — not placeholder text
- Wizard pillar suggestions must be drawn from actual RootSpec design pillar vocabulary

## Interactions with Other Systems

- **PRESENTATION_SYSTEM** → **CONTENT_SYSTEM**: Injects version string at build time into hero and header content slots
- **INTERACTIVE_SYSTEM** reads hierarchy level definitions and wizard templates from CONTENT_SYSTEM at initialization
