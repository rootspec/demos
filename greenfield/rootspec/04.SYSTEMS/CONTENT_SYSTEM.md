# Level 4: Content System

## Responsibility

Owns all static and template content for the site. This includes page copy, section text, the meta banner, version badge data, GitHub links, and the structured templates used by the Spec Wizard and Hierarchy Explorer.

## Data Ownership

### Version Badge
- Source: `.rootspec.json` → `version` field
- Read at build time (Astro static generation)
- Rendered into: hero section and/or header
- Format: `v{version}` (e.g., `v7.3.4`)

### Meta Banner
- Text: "This site was generated from a ~100-line product description using the RootSpec pipeline — no manual code, no design mockups. The spec, the code, and the tests were all produced by running four commands."
- Link 1: View the spec → `https://github.com/rootspec/demos/tree/main/greenfield/rootspec` (absolute GitHub URL)
- Link 2: View the seed → `https://github.com/rootspec/demos/tree/main/greenfield/SEED.md` (absolute GitHub URL)
- Visibility: Always visible; not dismissible

### GitHub CTA Links
- Framework repo: `https://github.com/rootspec/rootspec`
- Demos repo: `https://github.com/rootspec/demos/tree/main/greenfield`

### Hierarchy Explorer Content
Each of the five levels has:
- Level number and name
- Short description (1-2 sentences)
- Key question answered
- Example excerpt (real content from the framework, not lorem ipsum)
- Allowed references (displayed as a list or visual indicator)

### Spec Wizard Templates
**Mission templates** (Step 1):
- "Transform how [domain] works by prioritizing [value] over [traditional approach]."
- "[Product] exists because [pain point] costs [audience] [consequence]."
- "We build [product] so that [user] can [goal] without [obstacle]."

**Design pillar suggestions** (Step 2, pick 3-5):
- Clarity, Reliability, Speed, Delight, Control, Trust, Simplicity, Power, Consistency, Transparency, Safety, Creativity

**Interaction description** (Step 3):
- Free text; placeholder: "Describe what happens when a user [core action]..."

### Before/After Comparison Content
Two panels with real examples (not lorem ipsum):

**Without RootSpec panel:**
- Vague requirements doc fragment (e.g., "Users should be able to manage their profile")
- Ambiguous user story (no acceptance criteria, no system reference)
- Decision buried in a comment thread

**With RootSpec panel:**
- L2 truth statement with explicit trade-off
- L5 user story with given/when/then acceptance criteria
- Feature traced from L1 design pillar through L3 interaction to L5 story

### Footer Attribution
- Built by: Claude (claude-sonnet-4-6), Anthropic
- Build date: rendered at build time

## Interfaces

- Exposes version string to LAYOUT_SYSTEM (hero, header)
- Exposes banner content + links to LAYOUT_SYSTEM (meta banner)
- Exposes wizard templates to INTERACTIVE_SYSTEM
- Exposes explorer level data to INTERACTIVE_SYSTEM
- Exposes comparison copy to INTERACTIVE_SYSTEM

## Constraints

- All GitHub links must be absolute URLs (relative links break the static prerenderer)
- Build-time data (version) must not be fetched at runtime
- No lorem ipsum — all example content must be real and representative
