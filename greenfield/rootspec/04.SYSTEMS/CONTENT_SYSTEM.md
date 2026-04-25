# Level 4: Content System

References: [01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md]

## Responsibility

The Content System owns all static prose, structured copy, and section organization for the RootSpec marketing site. It is the primary system for the "Reader" visitor mode.

This system does NOT own:
- Interactive components (owned by HIERARCHY_EXPLORER and SPEC_WIZARD)
- Page layout or navigation chrome (owned by LAYOUT_SYSTEM)
- Visual tokens (owned by THEME_SYSTEM)

## Sections and Content

### Meta Banner

**Position:** Persistent, above all other content, visible before scrolling

**Content:**
- Explains this site was generated from a ~[line count]-line product description using the RootSpec pipeline
- States: no manual code, no design mockups — spec, code, and tests produced by four commands
- Links to SEED.md in the GitHub repo (absolute URL)
- Links to spec files in the GitHub repo (absolute URL)
- Honest framing: rough edges are the result of minimal human guidance, not carelessness

**Constraints:**
- Must appear above the fold on all viewports
- Links must be absolute GitHub URLs (relative paths break the static build's prerenderer)
- Non-dismissable — visitors must see it

### Hero Section

**Content:**
- RootSpec version badge (read from `.rootspec.json` at build time)
- Tagline (short, memorable — positions the product)
- One-sentence explanation (what RootSpec does and why it exists)
- Primary CTA to the "Spec Your Idea" wizard or the GitHub repo

**Constraints:**
- Immediate visual clarity — visitor should understand the product within seconds
- No decorative imagery — typography is the primary design element

### Problem Section

**Content:**
- Why existing approaches fail, organized around recognizable pain points:
  - Spec drift (specs diverge from code; by launch they describe a different product)
  - Philosophy-implementation gap (the "why" exists in founders' heads; teams work from tickets)
  - Unreliable AI output without validation (LLMs satisfy stated instructions, violate unstated intent)
  - Documents nobody reads (PRDs and Google Docs that accumulate and go stale)
- Each pain point resonates with the target audience's lived experience

**Constraints:**
- Real content, not abstractions — specific descriptions of recognizable problems
- No dismissive tone toward the approaches being critiqued — empathy first

### How It Works Section

**Content:**
- Visual walkthrough of the four skills:
  1. `/rs-init` — Initialize the RootSpec directory and scaffold
  2. `/rs-spec` — Interview-driven specification creation and validation
  3. `/rs-impl` — AI-driven implementation from validated user stories
  4. `/rs-validate` — Continuous validation of spec against implementation
- For each skill: name (monospace), brief description, before/after or input/output framing

**Constraints:**
- Skill names must use monospace typography
- Flow must be clear — the four skills form a pipeline, not a menu

### Author's Notes Section

**Content:**
- Heading: "Why I built RootSpec" or "From the author"
- Full verbatim text of the Author's Notes from the SEED.md, reproduced without modification:
  - Every paragraph break preserved
  - Every inline emphasis preserved exactly as written
  - No summarizing, paraphrasing, condensing, reordering, or stylistic rewriting
  - Treat the Author's Notes as a literal string to embed, not guidance to interpret
- Author's voice speaks directly to visitors; site's job is to carry that voice unaltered

**Constraints:**
- This section is the author speaking directly — editorial voice, not marketing copy
- Long-form prose — the section should breathe with generous whitespace
- Highest-fidelity typography: this is the primary showcase for the serif typeface

### Before/After Comparison Section

**Content:**
- **Without RootSpec panel:** Vague requirements document, ambiguous user stories with no traceability, decisions that can't be traced to rationale — real content, not lorem ipsum
- **With RootSpec panel:** Structured five-level hierarchy, testable user stories, features that trace to design pillars — actual RootSpec output demonstrating the methodology
- Toggle or slider control to switch between panels

**Constraints:**
- Both panels must contain real, substantive content
- Comparison must be honest — no cherry-picking obvious strawmen vs. ideal RootSpec output

### Interactive Sections

Content System provides the surrounding prose context and section introductions for:
- Hierarchy Explorer (see HIERARCHY_EXPLORER.md)
- Spec Your Idea Wizard (see SPEC_WIZARD.md)

### Open Source CTA Section

**Content:**
- Link to the framework GitHub repo: `https://github.com/rootspec/rootspec`
- Getting started instructions (brief — enough to take the first action)
- Community links if applicable
- Frames as the primary conversion target: "This is how you start"

**Constraints:**
- Must function as the main conversion target alongside the Spec Wizard
- GitHub URL must be absolute

### Footer

**Content:**
- Site builder attribution: "Built by Claude (Anthropic)" and build date
- Links to the GitHub repo
- Minimal — no distracting secondary navigation

**Constraints:**
- Build date should reflect the actual date of site generation
- Attribution must identify the site builder by name

## Content Hierarchy

Content sections render in this order top to bottom:

1. Meta Banner (pinned, always above scroll)
2. Hero Section
3. Problem Section
4. How It Works Section
5. Hierarchy Explorer (interactive island)
6. Before/After Comparison
7. Spec Your Idea Wizard (interactive island)
8. Author's Notes
9. Open Source CTA
10. Footer

## Data Owned by This System

- All static prose strings
- Section headings and subheadings
- GitHub repository URLs (as constants)
- Version string (read from `.rootspec.json` at build time)
- Build date (resolved at build time)

## State

Content System is stateless — all content is static. No runtime state management required.
