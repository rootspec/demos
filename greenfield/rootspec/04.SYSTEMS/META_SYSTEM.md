# Level 4: Meta System

## Responsibility

Owns the meta-layer of the site: the banner that explains the site is itself a RootSpec demo, all external GitHub links, and the build provenance information. This system exists because the site's most important message is about itself.

## Boundaries

**Owns:**
- Meta banner content and all external links within it
- GitHub repo URLs (canonical source for all external links site-wide)
- Build provenance data (what version of RootSpec was used, that no manual code was written)
- All external links to GitHub repos, spec files, and SEED.md

**Does not own:**
- Banner visual styling and positioning (LAYOUT_SYSTEM places it; THEME_SYSTEM styles it)
- Site-wide navigation (LAYOUT_SYSTEM)
- Version number display (PRESENTATION_SYSTEM reads from `.rootspec.json`)

## Data Ownership

### External URLs (canonical, absolute)

All URLs are absolute — relative links break the static build's prerenderer.

- **Demos repo root:** `https://github.com/rootspec/demos/tree/main/greenfield`
- **SEED.md:** `https://github.com/rootspec/demos/tree/main/greenfield/SEED.md`
- **Spec directory:** `https://github.com/rootspec/demos/tree/main/greenfield/rootspec`
- **Framework repo:** `https://github.com/rootspec/rootspec`

### Meta Banner Content

The banner communicates three things:
1. This site is a RootSpec demo — generated from a sparse product description
2. The process: a ~100-line product description → five commands → spec + code + tests
3. Invitations to inspect the evidence: links to SEED.md and the spec files

**Banner text structure:**
- Opening claim: "This site was generated from a ~100-line product description using the RootSpec pipeline — no manual code, no design mockups."
- Process evidence: "The spec, the code, and the tests were all produced by running five commands."
- Links: "View the spec →" and "View the seed →"
- Honesty note: rough edges are the result of minimal human guidance, not carelessness

**Tone:** Honest and direct. Not apologetic, not boastful. The banner is the most important element on the page — visitors who miss it will misread the entire site.

### Build Provenance

- The site was built by an AI model (Claude) from the SEED.md specification
- No manual code was written beyond the spec itself
- Rough edges, where present, are honest evidence of what minimal guidance produces
- This information is surfaced in the meta banner and reinforced in the footer

## State Management

META_SYSTEM is stateless. All URLs and banner content are static. No runtime data fetching.

## Interactions with Other Systems

| System | Interaction |
|--------|-------------|
| LAYOUT_SYSTEM | Provides the banner content; LAYOUT_SYSTEM renders it in the fixed top slot |
| THEME_SYSTEM | Banner styled using THEME_SYSTEM tokens — it is visually distinct (different background or border) but uses the same palette |
| PRESENTATION_SYSTEM | Version badge (in hero) complements the meta banner but is owned by PRESENTATION_SYSTEM |

## Rules

- All GitHub links must use absolute URLs — relative links will break the static build's prerenderer
- The meta banner must appear above all other content, visible without scrolling on any viewport
- The banner must be honest about rough edges — it must not claim the site is polished when it isn't
- Links in the banner open in a new tab with `rel="noopener noreferrer"`
- The "Open Source CTA" section links to the framework repo (`https://github.com/rootspec/rootspec`) as the primary conversion target
- The footer identifies the builder (Claude, model name) and the date the site was built
