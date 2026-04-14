# Level 4: Content System
<!-- L4: HOW it's built — References L1-3 + Sibling L4 + External only -->

## Responsibility

The Content System owns all static copy, section structure, and page content. It defines what is said and where — not how it looks or how it behaves interactively.

---

## Sections and Content

### Meta Banner
- Persistent visibility at top of page or immediately below hero
- Copy: explains the site is a RootSpec demo built from a [~100-line] seed, no manual code, no mockups
- Links to SEED.md and spec files in the GitHub repo at `https://github.com/rootspec/demos/tree/main/greenfield`
- Tone: honest and direct — names what the visitor is looking at and why rough edges exist

### Hero
- Tagline: short, punchy, communicates "spec methodology" at a glance
- One-sentence explanation of what RootSpec is
- Version badge: reads from `.rootspec.json` at build time; displays `v{version}`
- Primary CTA: link to GitHub repo

### Problem Section
- Named, specific pain points — not generic industry speak
- Four core problems: spec drift, philosophy-implementation gap, unreliable AI output, specs nobody reads
- Tone: recognition, not lecture — the reader has felt these problems

### How It Works
- Four-skill workflow: `/rs-init` → `/rs-spec` → `/rs-impl` → `/rs-validate`
- Each skill: name, one-line description, what it produces
- Visual or structural walkthrough — before/after or step progression

### Hierarchy Explorer Section
- Introduction text explaining the five levels
- Hosts the INTERACTIVE_SYSTEM hierarchy explorer component
- Static fallback content if JS is unavailable

### Spec Wizard Section
- Introduction text inviting visitors to apply the methodology
- Hosts the INTERACTIVE_SYSTEM wizard component
- Note that output is templates, not AI — sets expectation correctly

### Before/After Comparison Section
- Introduction text framing the comparison
- "Without spec" panel: vague requirements, ambiguous stories, untraceable decisions
- "With RootSpec" panel: structured hierarchy, testable stories, traced decisions
- Real content in both panels — specific examples, not placeholder text

### Open Source CTA
- Links to `https://github.com/rootspec/rootspec`
- Getting-started framing: one command to start
- Community framing if applicable

### Footer
- Built-by attribution: identifies the builder (Claude / AI assistant) and build date
- Framework version
- Links back to GitHub repos

---

## Content Constraints

- No lorem ipsum anywhere on the page
- No "coming soon" or placeholder content visible to visitors
- All links must resolve: SEED.md, spec files, GitHub repos
- Version badge reads from `.rootspec.json` — not hardcoded
- Meta banner is visible above the fold on all common screen sizes

---

## Interactions with Other Systems

- Provides section structure to LAYOUT_SYSTEM (slot boundaries, section order)
- Provides initial data to INTERACTIVE_SYSTEM (wizard templates, explorer level content)
- Does not own visual design or layout tokens — those belong to PRESENTATION_SYSTEM and LAYOUT_SYSTEM
