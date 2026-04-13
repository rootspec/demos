# Level 4: Content System

*References: 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md*

## Responsibility

Owns all static marketing content on the site: copy, section structure, messaging hierarchy, version data, and external links. The content system defines WHAT is said on every section of the page.

## Boundaries

- **Owns:** Page copy, section content, meta-banner text, CTA links, footer attribution
- **Does not own:** Layout or styling decisions (LAYOUT_SYSTEM), interactive state (INTERACTIVE_SYSTEM)
- **Read-only data:** Reads `.rootspec.json` at build time to extract `version` field for the version badge

## Page Sections

### Meta Banner
- Persistent banner visible above or immediately below the hero
- Message: Explains this site was generated from a ~100-line product description via the RootSpec pipeline
- Must be honest about what automated output looks like — rough edges are evidence, not failures
- Links: `[View the spec →]` pointing to `https://github.com/rootspec/demos/tree/main/greenfield/rootspec` and `[View the seed →]` pointing to `https://github.com/rootspec/demos/tree/main/greenfield/SEED.md`
- Tone: Direct and contextualizing, not apologetic

### Hero Section
- Primary headline: communicates the core value proposition of RootSpec in one line
- Subheadline: one sentence expanding on what RootSpec is
- Version badge: displays current version read from `.rootspec.json`
- Primary CTA: link to GitHub repo (`https://github.com/rootspec/rootspec`)

### Problem Section
- Four specific pain points developers recognize:
  1. Spec drift — docs that nobody keeps in sync
  2. Philosophy-implementation gap — foundational decisions get lost
  3. Unreliable AI output — no validation layer means confident wrong answers
  4. Google Docs graveyard — specs with no executable weight
- Tone: Resonant, not accusatory. "You know this problem" not "here's what you're doing wrong"

### How It Works Section
- Visual walkthrough of four skills: `/rs-init` → `/rs-spec` → `/rs-impl` → `/rs-validate`
- Each skill gets: name, one-line description, what it produces
- Before/after framing: before using RootSpec vs. after

### Hierarchy Explorer Section
- Section heading and introductory sentence explaining the five-level hierarchy
- Interactive component (INTERACTIVE_SYSTEM handles behavior)
- Example content for each level derived from the RootSpec methodology itself

### Spec Wizard Section
- Section heading: positions wizard as "try the methodology on your own idea"
- Introductory text setting expectations: this generates a skeleton spec, not a complete one
- Interactive component (INTERACTIVE_SYSTEM handles behavior)
- Wizard template options for missions and design pillars (content-owned, behavior-owned by INTERACTIVE_SYSTEM)

### Before/After Comparison Section
- Section heading
- Content for both panels uses a fictional "TaskManager" product for concrete familiarity
- **Without-spec panel:** Vague requirements — prose descriptions, ambiguous stories ("the app should be fast"), no traceability
- **With-spec panel:** Structured L1-L5 hierarchy — mission statement, design pillars, testable stories with pillar references

### CTA Section
- Heading: directs to open source repo
- Link: `https://github.com/rootspec/rootspec`
- Supporting copy: getting started instructions, community context

### Footer
- Attribution: identifies the site builder (Claude, Anthropic's AI assistant) and the build date
- Framework version acknowledgment

## Version Data

- Source: `.rootspec.json` → `version` field
- Read at: build time
- Displayed in: hero section and/or site header
- Format: `v[version]` (e.g., `v7.2.1`)
- Fallback: if `.rootspec.json` is missing or unparseable, display `v?.?.?`

## External Links

| Destination | URL | Used In |
|-------------|-----|---------|
| RootSpec GitHub repo | `https://github.com/rootspec/rootspec` | Hero CTA, CTA section |
| Demos repo (greenfield) | `https://github.com/rootspec/demos/tree/main/greenfield` | Meta banner |
| Spec files | `https://github.com/rootspec/demos/tree/main/greenfield/rootspec` | Meta banner |
| SEED.md | `https://github.com/rootspec/demos/tree/main/greenfield/SEED.md` | Meta banner |

## Content Tone Rules

- Confident but not preachy
- Technical but accessible
- No buzzwords or corporate language
- Show concrete examples over abstract descriptions
- Audience: developers and technical leads who've been burned by scope drift
