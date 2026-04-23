# Level 4: Content System

## Responsibility

Owns all static content: copy, data, and external URLs. Provides the version number (read from `.rootspec.json` at build time), meta-banner text and links, section content, wizard templates, and hierarchy level definitions. No other system hardcodes content strings or data.

## Boundaries

- Owns: all page copy, hierarchy level definitions, wizard option templates, GitHub URLs, version data
- Does not own: rendering (PRESENTATION_SYSTEM), interaction state (INTERACTIVE_SYSTEM), theme (THEME_SYSTEM)
- All GitHub URLs are absolute (not relative) — relative URLs break the static prerenderer
- Version is read from `.rootspec.json` at build time; never hardcoded

## Data Entities

### Version Data
- **source:** `.rootspec.json`, `version` field
- **consumed by:** Version badge (hero/header), meta-banner
- **type:** semver string (e.g., "7.3.7")

### Meta-Banner Content
- **text:** A single paragraph explaining the site was generated from a ~100-line product description using four commands with no manual code or design mockups
- **links:**
  - Spec files → absolute GitHub URL to `greenfield/rootspec/` directory
  - Seed file → absolute GitHub URL to `greenfield/SEED.md`
- **constraint:** Both URLs must be absolute GitHub URLs pointing to `https://github.com/rootspec/demos/tree/main/greenfield`

### Hierarchy Level Definitions
Five entries, one per level:

| Level | Number | Name | Icon | Short Description | Example Content |
|-------|--------|------|------|-------------------|-----------------|
| L1 | 1 | Philosophy | — | WHY and WHAT EXPERIENCE — mission, design pillars, inviolable principles | Mission statement, pillar list |
| L2 | 2 | Truths | — | WHAT strategy — trade-offs, commitments, success criteria | Trade-off statements, constraints |
| L3 | 3 | Interactions | — | HOW users and product interact — flows, patterns, feedback | User journey, interaction loop |
| L4 | 4 | Systems | — | HOW it's built — architecture, boundaries, data | System map, data entities |
| L5 | 5 | Implementation | — | Testable user stories and tuning parameters | YAML user story, fine-tuning block |

Each entry includes: which levels it can reference (upward only), example content snippet, and a description of its purpose appropriate for display in the hierarchy explorer.

### Wizard Templates

**Mission templates (Step 1):**
- "Help [audience] achieve [outcome] without [pain]"
- "Make [domain] accessible to people who [struggle with existing solutions]"
- "Replace [current approach] with something that [key improvement]"
- Free text option

**Design pillar suggestions (Step 2):**
A curated list of [N] emotional/experiential phrases for users to select 3-5 from:
- Empowered Action
- Calm Focus
- Confident Progress
- Sustainable Engagement
- Delightful Discovery
- Trusted Reliability
- Effortless Clarity
- Collaborative Flow
- (Free text option)

**Interaction prompt (Step 3):**
Free text with placeholder: "Describe one key thing a user does in your product (e.g., creates a task, submits a report, books a slot)"

### Comparison Panel Content

**Without RootSpec panel:**
- Vague requirements doc: bullet points without context or rationale
- Ambiguous user stories: "User can manage their stuff" without acceptance criteria
- Untraceable decisions: features with no clear origin or owner
- (Real content — not lorem ipsum)

**With RootSpec panel:**
- Structured hierarchy: each section labeled L1-L5
- Testable stories: YAML with Given/When/Then acceptance criteria
- Every feature traces to a design pillar by name
- (Real content — not lorem ipsum)

### Section Copy

| Section | Key Message |
|---------|------------|
| Hero | Tagline: "Philosophy guides implementation. Never vice versa." One-sentence explanation of what RootSpec is. |
| Problem | Why spec drift happens; why TDD/BDD didn't stick; why AI accelerates drift without validation |
| How It Works | Four skills: `/rs-init`, `/rs-spec`, `/rs-impl`, `/rs-validate` — what each does |
| Hierarchy Explorer | Intro: "The five levels form a strict hierarchy. Each level can only reference levels above it." |
| Spec Wizard | Intro: "Enter a one-line product idea. We'll build a skeleton spec from it in three steps." |
| Comparison | Intro: "Here is the same product described two ways." |
| CTA | Primary: link to GitHub repo. Secondary: npm install command. |
| Footer | Site built by Claude (Anthropic), date of build. |

### Footer Attribution
- Builder: Claude (Anthropic)
- Date: ISO 8601 build date, injected at build time

## Rules

- All external URLs are validated at build time (link checker or equivalent)
- The GitHub repo URL `https://github.com/rootspec/demos/tree/main/greenfield` is the canonical base for all meta-banner links
- Version data falls back to a safe display value if `.rootspec.json` is unreadable at build time
- No content string is duplicated across sections — each lives in one place
