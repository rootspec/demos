# Level 4: Content System

> References: 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md

## Responsibility

Owns all static text, copy, external link URLs, and the version badge. Reads the RootSpec version from `.rootspec.json` at build time and injects it where needed. Manages the meta banner that contextualizes this site as a RootSpec demo.

## Boundaries

- **Owns:** All visible static text, headline copy, section descriptions, link URLs, version number, footer attribution
- **Does not own:** Layout structure (PRESENTATION_SYSTEM), interactive state (INTERACTIVE_SYSTEM), visual tokens (THEME_SYSTEM), spacing (LAYOUT_SYSTEM)

## Data Owned

### Version Badge
- `version: string` — Read from `.rootspec.json` at build time (field: `version`)
- Displayed in: header, hero section
- Format: `v{version}` (e.g., `v7.2.4`)

### External Links
All external URLs are centralized in CONTENT_SYSTEM, not scattered across interactive components:

| Link | URL | Opens |
|------|-----|-------|
| View the spec | https://github.com/rootspec/demos/tree/main/greenfield/rootspec | New tab |
| View the seed | https://github.com/rootspec/demos/tree/main/greenfield/SEED.md | New tab |
| RootSpec GitHub | https://github.com/rootspec/rootspec | New tab |
| Demos repo | https://github.com/rootspec/demos/tree/main/greenfield | New tab |

### Footer Attribution
- Builder: Claude (Anthropic)
- Build date: injected at build time (ISO date format, displayed as human-readable)

## Meta Banner

The meta banner is a persistent element at the top of the page (or immediately below the hero) that:
- Explains this site is itself a RootSpec demo
- States that it was generated from a ~100-line product description using four commands
- Links to the spec files and seed in the GitHub repo
- Is honest about rough edges being a result of minimal human guidance

**Content (canonical):**
> This site was generated from a ~100-line product description using the RootSpec pipeline — no manual code, no design mockups. The spec, the code, and the tests were all produced by running four commands. [View the spec →] [View the seed →]

The meta banner should never be hidden, collapsed, or deprioritized. It is essential context for the site's credibility.

## Sections: Content Responsibilities

| Section | Content Type |
|---------|-------------|
| Hero | Tagline, one-sentence explanation, primary CTA text |
| Problem | Four pain point descriptions with headlines |
| How It Works | Four-step workflow: step names, descriptions, command labels |
| Hierarchy Explorer | Level names, icons, purpose descriptions, example content for each of 5 levels |
| Spec Wizard | Step labels, template mission options, design pillar suggestions |
| Before/After | Both panel contents — "without spec" doc and "with RootSpec" doc |
| CTA | Headline, description, button text |
| Footer | Attribution text, build date |

## Rules

- No lorem ipsum at any level — all content is real and representative
- External URLs are defined here; components receive them as props
- Version number is fetched at build time; there is no runtime version fetch
- The meta banner content is never paraphrased — the canonical copy above must be used verbatim or improved, never diluted
