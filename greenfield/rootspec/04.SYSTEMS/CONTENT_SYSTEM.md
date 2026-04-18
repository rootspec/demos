# Level 4: Content System
# RootSpec Marketing Site

---

## Responsibility

The Content System owns all static text, structured copy, and metadata displayed on the page. It is the single source of truth for:

- Section headings, body copy, and labels
- Navigation link text
- Meta banner content (including GitHub URLs to SEED.md and spec files)
- Version badge (read from `.rootspec.json` at build time)
- Hierarchy Explorer level descriptions and example content
- Spec Wizard templates (mission templates, design pillar suggestions, interaction prompts)
- Before/After Comparison panel content
- Footer attribution text and build date
- Open Graph and HTML meta tags

---

## Boundaries

**Owns:**
- All human-readable strings rendered in the UI
- Structured template data used by the Interactive System

**Does not own:**
- Visual presentation of content (→ Layout System, Presentation System)
- Theme state (→ Theme System)
- User input or wizard state (→ Interactive System)

---

## Data Structures

### Section Content Block
Each page section has an associated content block:
- `id` — Unique section identifier (e.g., `hero`, `problem`, `how-it-works`)
- `heading` — Primary heading text
- `subheading` — Optional secondary heading
- `body` — Body copy (may be markdown or structured HTML)
- `cta` — Optional call-to-action label and link

### Hierarchy Level Description
For each of the five RootSpec levels:
- `level` — Level number (1–5)
- `name` — Level name (e.g., "Philosophy")
- `icon` — Level icon or emoji
- `tagline` — One-sentence description of the level's purpose
- `example` — Example content showing what this level looks like in practice
- `references` — Which levels this level can reference (used to render reference arrows)

### Wizard Template Data
For the Spec Wizard:
- `mission_templates` — [N] pre-written mission statement templates
- `pillar_suggestions` — [M] design pillar options users can select from
- `interaction_prompts` — Placeholder prompts for the interaction step

### Comparison Panel Content
- `without_spec` — Structured content representing a vague, unspecified requirements doc
- `with_rootspec` — The same subject structured as a RootSpec hierarchy

---

## Rules

- Version is read from `.rootspec.json` at build time; it is never hardcoded in content
- GitHub URLs in the meta banner must be absolute URLs targeting the `main` branch of `https://github.com/rootspec/demos`
- Footer attribution must include the builder's identity and the build date
- All content is authored in source files — no content is fetched at runtime
- Wizard template data is sufficient to generate meaningful output for any product idea; templates must cover enough variety to feel responsive to the user's input
