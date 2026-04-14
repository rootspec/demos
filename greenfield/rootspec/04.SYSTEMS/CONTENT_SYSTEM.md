# Level 4: Content System

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md

---

## Responsibility

Owns all static page content: copy, section ordering, headings, body text, and call-to-action labels. This system defines what the page says, not how it is structured or styled.

---

## Sections and Content Ownership

### Meta Banner

A persistent banner displayed at the top of the page (above or immediately below the hero). Contains:
- Statement that the site is a RootSpec demo built from a sparse seed
- Reference to the number of commands used (four)
- Links provided by FRAMEWORK_SYSTEM: "View the spec →" and "View the seed →"
- Honest framing: rough edges are a result of minimal human guidance, not carelessness

The copy must be direct and unambiguous. The banner is never dismissible — it is always visible.

### Hero

- **Tagline:** Short (one line), conceptually precise statement of what RootSpec is
- **Subheading:** One sentence that explains the core value proposition
- **Version badge:** Sourced from FRAMEWORK_SYSTEM — displays current RootSpec version
- **Primary CTA:** Link to GitHub repository (provided by FRAMEWORK_SYSTEM)

No hero image is required. If visual decoration is used, it must not distract from the tagline.

### Problem Section

Explains why existing approaches fail. Content covers:
- Spec drift (documentation written once, never maintained)
- Philosophy-implementation gap (implementation decisions reshape intent)
- Unreliable AI output without a validation layer
- "Google Doc specs" that nobody reads after kickoff

Each point is a short paragraph or heading+description — scannable, not dense. No bullet-point walls.

### How It Works

Visual walkthrough of the four RootSpec skills in order:
1. `/rs-init` — Initialize the framework in a project
2. `/rs-spec` — Interview-driven spec creation across five levels
3. `/rs-impl` — Implementation driven by the spec
4. `/rs-validate` — Validation that implementation matches spec intent

For each skill, the content includes: the command name, what it does, and what it produces. A simple diagram or icon set accompanies the walkthrough.

### Hierarchy Explorer Section

Section header and introduction text. The interactive component (owned by INTERACTIVE_SYSTEM) is embedded here. Intro copy explains the five-level hierarchy concept in 2–3 sentences before the explorer renders.

### Spec Wizard Section

Section header and brief instruction text ("Enter a one-line product idea to see how it maps to a spec"). The interactive Spec Wizard (owned by INTERACTIVE_SYSTEM) is embedded here.

### Before/After Comparison Section

Section header and framing text. The interactive comparison component (owned by INTERACTIVE_SYSTEM) is embedded here.

Content for both panels is real, not placeholder:
- **Without RootSpec panel:** Example of a vague requirements doc with ambiguous stories and no traceability
- **With RootSpec panel:** Same product expressed as a RootSpec excerpt — mission, design pillars, testable story

### Open Source CTA

- Heading: Clear invitation to explore or contribute
- Body: 2–3 sentences describing what the GitHub repository contains
- CTA button: Links to framework GitHub repo (provided by FRAMEWORK_SYSTEM)
- Optional: Links to "getting started" instructions or community resources

### Footer

- Attribution: Identifies the builder (AI agent) and the date the site was built (2026-04-14)
- Links: GitHub repository link (provided by FRAMEWORK_SYSTEM)
- RootSpec version (sourced from FRAMEWORK_SYSTEM)

---

## Data Owned

- All copy strings for each section
- Section order (top to bottom)
- CTA labels and surrounding text
- Panel content for the before/after comparison (both panels)

---

## Interfaces

- **Imports from FRAMEWORK_SYSTEM:** Version string, GitHub URLs for spec, seed, and framework repo
- **Exports to LAYOUT_SYSTEM:** Rendered content for each named section slot

---

## Rules

- No section may contain lorem ipsum or placeholder text
- All GitHub URLs come from FRAMEWORK_SYSTEM — never hardcoded in content files
- The meta-banner copy must not minimize or obscure the demo/prototype nature of the site
- Hero tagline and subheading must be reviewable by a non-technical reader and still make sense
