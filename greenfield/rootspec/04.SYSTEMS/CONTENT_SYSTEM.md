# Content System

**References:** `01.PHILOSOPHY.md`, `02.TRUTHS.md`, `03.INTERACTIONS.md`, `SYSTEMS_OVERVIEW.md`

---

## Responsibility

Manages all static page content: copy, section structure, version badge data, and GitHub link targets. This system owns what the page says, not how it looks or behaves.

---

## Content Sections

| Section | Purpose | Key Data |
|---------|---------|---------|
| Meta Banner | Honest disclosure of how the site was built | Build method description, GitHub links (absolute URLs) |
| Hero | Immediate clarity on what RootSpec is | Tagline, one-sentence explanation, version badge |
| Problem | Validate visitor pain | Four problem statements with specifics |
| How It Works | Four-skill walkthrough | init/spec/impl/validate with descriptions |
| Methodology Diagram | Visual proof of concept | SVG diagram of spec as development filter |
| Hierarchy Explorer | Interactive level content | Example content for each of the five levels |
| Spec Wizard | Template library for wizard | Mission templates, pillar suggestions |
| Before/After Comparison | Real content for both panels | "Without RootSpec" doc, "With RootSpec" structure |
| Open Source CTA | Path to action | GitHub repo URL, getting-started language |
| Footer | Attribution and date | Builder name, build date |

---

## Data Ownership

### Version Badge

- Source: `.rootspec.json` field `version`
- Read at: build time (static rendering)
- Fallback: display "unknown" if file unavailable
- Location: Hero section and/or site header

### GitHub Links (Meta Banner)

- Seed link: `https://github.com/rootspec/demos/tree/main/greenfield` (or direct file URL for SEED.md)
- Spec link: same base URL pointing to `rootspec/` directory
- These must be **absolute URLs** — relative links break static prerenderer
- Critical: visitors must understand rough edges are from minimal guidance, not carelessness

### Methodology Diagram

- Rendered as SVG (no external image hosting)
- Concept: spec surrounds the development cycle; only valid solutions pass through
- Must work in both dark and light mode (SVG colors adapt to theme)

### Spec Wizard Templates

| Template Type | Content |
|--------------|---------|
| Mission templates | 4-6 starter missions covering common product categories |
| Design pillar suggestions | 8-12 emotional pillar phrases visitors can select from |
| Output skeleton | L1-L3 structure with visitor's inputs mapped to correct levels |

---

## Rules

- All copy uses developer voice: direct, honest, no buzzwords (per L1 inviolable principles)
- Problem section must name specific, recognizable pain points — not abstract complaints
- Before/After panels contain real, readable content — no lorem ipsum
- Footer must identify the site builder by name and include the build date
- The meta banner must acknowledge limitations honestly, not minimize them

---

## State

This system is largely stateless at runtime — content is rendered at build time. The exception is the Spec Wizard template library, which is a static data structure loaded client-side.

---

## Interactions with Other Systems

- Provides version string to LAYOUT_SYSTEM for badge display
- Provides section copy to LAYOUT_SYSTEM for page rendering
- Provides Hierarchy Explorer level content to INTERACTIVE_SYSTEM
- Provides Spec Wizard templates to INTERACTIVE_SYSTEM
- Provides Before/After panel content to INTERACTIVE_SYSTEM
