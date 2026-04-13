# Level 4: Content System

**System:** CONTENT_SYSTEM
**Last Updated:** 2026-04-12

---

## Responsibility

The Content System owns all static marketing copy and page section structure. It defines what is said on each section of the page — the words, the examples, the real before/after content, and the call-to-action messaging. It does not manage any client-side state.

---

## Boundaries

- **Owns:** Section copy, section structure, before/after panel content, CTA links, footer attribution
- **Does not own:** Theme tokens, layout wrappers, interactive behavior, build pipeline
- **Reads from:** FRAMEWORK_SYSTEM (version string at build time, for the version badge in the hero)
- **Read by:** LAYOUT_SYSTEM (wraps sections), THEME_SYSTEM (applies tokens to content elements)

---

## Sections

### Meta Banner
A persistent banner visible above or immediately below the hero. Contains:
- Explicit statement that this site is a RootSpec demo
- What was used to generate it (a sparse product description)
- Honest acknowledgment that rough edges reflect minimal human guidance
- Link to SEED.md in GitHub repo
- Link to the spec files in the GitHub repo

The banner must not be dismissible. It is structural, not promotional.

### Hero
- Tagline: short, memorable, expresses the core value proposition
- One-sentence explanation of what RootSpec is
- Version badge (reads from build-time version string provided by FRAMEWORK_SYSTEM)
- Primary CTA linking to the getting started section or GitHub

### The Problem
Content explains why existing approaches fail:
- Spec drift and the Google Doc nobody reads
- Philosophy-implementation gap in AI-assisted development
- Unvalidatable requirements
- The gap between knowing what to build and being able to prove it was built correctly

Uses concrete language — names the failure modes rather than vague "pain points."

### How It Works
Visual walkthrough of the four RootSpec skills in sequence:
- `/rs-init` — initializes the framework in a project
- `/rs-spec` — interview-driven spec creation across five levels
- `/rs-impl` — implements each user story against the spec
- `/rs-validate` — validates implementation against the spec

Each skill has a short description and one concrete example of what it does. The section frames this as "before you had these commands" vs. "after."

### Open Source CTA
- Link to GitHub repository
- Getting started instructions (the four commands a developer runs to begin)
- Community links (if applicable)
- Direct, not promotional — assumes the visitor is ready to start

### Footer
- Attribution: name of the builder (the AI agent that generated the site)
- Build date
- Link to RootSpec GitHub repository
- Current RootSpec version

---

## Before/After Comparison Content

The before/after comparison must use real content. Both panels contain actual specification artifacts:

**Without RootSpec panel:**
- Vague requirements excerpt: a poorly-structured user story with ambiguous acceptance criteria
- A feature request that can't be traced to a business goal
- A spec document that has diverged from the implemented behavior
- An untestable "the system should be fast" requirement

**With RootSpec panel:**
- The same feature expressed as a five-level hierarchy excerpt
- A user story with testable acceptance criteria
- A design pillar referenced by the feature
- A validation gate showing the feature traces back to a specific L1 principle

---

## Data Attributes

All interactive content targets require `data-test` attributes for Cypress test compatibility. Content sections that are asserted in user stories must have stable, semantic `data-test` selectors.

Key selectors (to be established during implementation):
- `[data-test=hero-tagline]` — hero headline
- `[data-test=meta-banner]` — meta banner container
- `[data-test=version-badge]` — displayed version string
- `[data-test=before-panel]` — before/after "without" panel
- `[data-test=after-panel]` — before/after "with RootSpec" panel
- `[data-test=cta-github]` — primary GitHub link
