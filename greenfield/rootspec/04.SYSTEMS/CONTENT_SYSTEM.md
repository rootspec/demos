# Level 4: Content System
# RootSpec Marketing Site

## Responsibility

The Content System owns all user-facing text, real examples, and static page content. It is the single source of truth for:
- All section copy (meta banner, hero, problem, how-it-works, CTA, footer)
- The five hierarchy level descriptions and example content shown in the explorer
- The before/after panel content (real spec artifacts and vague doc artifacts)
- The wizard template text (mission templates, design pillar suggestions, output skeleton)
- All data-test selectors on content elements (for test traceability)

## What It Does NOT Own

- Visual styling (owned by LAYOUT_SYSTEM and THEME_SYSTEM)
- Interactive state (owned by INTERACTIVE_SYSTEM)
- Version string (injected by FRAMEWORK_INTEGRATION at build time)

## Content Entities

### Page Sections
Each section is a named content unit:

| Section ID | Content Type | Notes |
|------------|-------------|-------|
| `meta-banner` | Static prose + 2 links | Links to SEED.md and spec files on GitHub |
| `hero` | Tagline + 1-sentence description + version badge | Version injected at build time |
| `problem` | 4-5 problem descriptions with headers | Real pain points, no placeholder |
| `how-it-works` | 4-skill walkthrough (init, spec, impl, validate) | Each skill has name + description |
| `hierarchy-explorer` | 5 level definitions with example content | Consumed by INTERACTIVE_SYSTEM |
| `wizard` | Step labels, template options, pillar suggestions, output skeleton template | Consumed by INTERACTIVE_SYSTEM |
| `before-after` | Two panels: "without spec" doc, "with RootSpec" doc | Both panels contain real, distinct content |
| `open-source-cta` | GitHub link + getting started text | External link to repo |
| `footer` | Builder attribution + build date | Built by [name], [date] |

### Hierarchy Level Definitions
Five content objects, one per RootSpec level:

| Level | ID | Fields |
|-------|----|--------|
| L1 | `philosophy` | Name, description, example content, reference rules summary |
| L2 | `truths` | Name, description, example content, reference rules summary |
| L3 | `interactions` | Name, description, example content, reference rules summary |
| L4 | `systems` | Name, description, example content, reference rules summary |
| L5 | `implementation` | Name, description, example content, reference rules summary |

### Wizard Content Templates
- **Mission templates** (3-4 options): short declarative sentences with a blank to fill
- **Design pillar suggestions** (8-10 options): short emotional phrases users can select
- **Output skeleton template**: a string template that maps user inputs into formatted L1-L3 skeleton
  - Template uses user's mission, selected pillars, and described interaction
  - Output is formatted spec-like text, not a real file — purely illustrative

### Before/After Panel Content
- **Without spec panel**: Contains a realistic vague requirements document — prose, ambiguous user stories, decisions buried in bullet points, no traceability
- **With RootSpec panel**: Contains a real (simplified) RootSpec L1+L5 excerpt with design pillars, user stories, and acceptance criteria

## Content Rules

- All section content is authored in the source, not fetched at runtime
- No lorem ipsum anywhere in the final product
- Links to GitHub spec files and SEED.md must be accurate (not placeholder URLs)
- The footer attribution must include the builder's name and the actual build date
- Content strings that contain technical terms (e.g., command names like `/rs-spec`) are rendered with code formatting

## Data-Test Attribute Convention

Every content element that is tested must have a `data-test` attribute matching the pattern:
`[section-id]-[element-type]`

Examples:
- `[data-test=meta-banner-text]`
- `[data-test=hero-tagline]`
- `[data-test=version-badge]`
- `[data-test=hierarchy-explorer-level]`
- `[data-test=wizard-output]`
- `[data-test=before-after-toggle]`
