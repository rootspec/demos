# Level 4: Content System

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md
**Part of:** SYSTEMS_OVERVIEW.md

---

## Responsibility

The Content System owns all static text, copy, and section content on the site. It defines what each section says, how the copy is structured, and what links are present. It does not own visual presentation (THEME_SYSTEM) or interactive behavior (INTERACTIVE_SYSTEM).

---

## Sections and Content Ownership

### Meta Banner
- Content: explanation that this site is a RootSpec demo built from a ~100-line seed
- Links: absolute GitHub URLs to SEED.md and rootspec spec files at `https://github.com/rootspec/demos/tree/main/greenfield`
- Key message: "This site was generated from a product description using the RootSpec pipeline — no manual code, no design mockups."
- Honest framing: rough edges are the result of minimal human guidance, not carelessness
- Placement: above the fold, before all other content

### Hero Section
- Content: primary tagline, one-sentence explanation of RootSpec
- Contains: version badge (from PRESENTATION_SYSTEM), primary headline, subheading
- Key messages: what RootSpec is, why it exists at a glance
- No interactive elements in this section

### Problem Section
- Content: why existing approaches fail
- Topics to cover:
  - Spec drift — requirements documents that don't match what gets built
  - Philosophy-implementation gap — decisions get made without tracing to intent
  - Unreliable AI output — AI has knowledge but not wisdom; without validation, generation drifts
  - "The Google Doc nobody reads" — specs as artifacts rather than living constraints
- The author's essay content (from SEED.md) provides the authoritative voice for this section

### How It Works Section
- Content: visual walkthrough of the four RootSpec skills
- Skills: `/rs-init`, `/rs-spec`, `/rs-impl`, `/rs-validate`
- Format: sequential steps with clear before/after framing
- Each skill gets: name (monospace), one-line description, role in the workflow

### Open Source CTA Section
- Content: link to framework GitHub repo (`https://github.com/rootspec/rootspec`)
- Contains: getting started instructions, link to npm package, community/contribution invitation
- This is the page's primary conversion target alongside the wizard
- Tone: direct invitation, not promotional

### Footer
- Content: attribution to Claude (site builder), build date, framework version
- Build date: the date the site was generated (embedded at build time)
- No interactive elements

---

## Content Rules

- All body copy uses the voice from SEED.md author's notes: "confident but not preachy, technical but accessible"
- No statistics, testimonials, or social proof fabricated without evidence
- No lorem ipsum — all content is real
- Skill names (`/rs-init`, `/rs-spec`, `/rs-impl`, `/rs-validate`) are always rendered in monospace
- GitHub links are absolute URLs — relative paths will break the static build's prerenderer

---

## Data Ownership

| Data | Owner | Source |
|------|-------|--------|
| Site copy | Content System | Authored from SEED.md |
| GitHub URLs | Content System | Hardcoded absolute URLs |
| Version number | Presentation System | Read from `.rootspec.json` at build time |
| Build date | Content System | Injected at build time |
| Skill names | Content System | Defined in SEED.md |

---

## Boundaries

- The Content System does NOT own visual tokens (colors, typography sizes) — those belong to THEME_SYSTEM
- The Content System does NOT own interactive wizard content or explorer level descriptions — those belong to INTERACTIVE_SYSTEM
- The Content System does NOT own layout structure (columns, spacing) — that belongs to LAYOUT_SYSTEM
