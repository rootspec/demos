# Content System

**Version:** 7.3.2
**Status:** Draft

---

## Responsibility

Owns and renders all static content on the marketing site: the meta-banner, hero section, problem section, methodology walkthrough, open-source CTA, and footer. Also reads the RootSpec version from `.rootspec.json` at build time to display the version badge.

## Boundaries

- **Owns:** Section copy, GitHub URLs, version badge, footer attribution
- **Does not own:** Theme state (THEME_SYSTEM), layout structure (LAYOUT_SYSTEM), interactive component state (INTERACTIVE_SYSTEM)
- **Does not call:** External APIs at runtime
- **Reads at build time:** `.rootspec.json` → `version` field for the version badge

## Data Owned

| Data | Source | Mutability |
|------|--------|------------|
| Section copy | Hardcoded in source | Static |
| RootSpec version | `.rootspec.json` at build time | Build-time only |
| GitHub URLs (SEED.md, spec files) | Hardcoded absolute URLs | Static |
| GitHub URL (rootspec/rootspec) | Hardcoded absolute URL | Static |
| Footer attribution (builder name, build date) | Hardcoded at build time | Static |
| Meta-banner text | Hardcoded | Static |

## Sections

### Meta Banner
Persistent banner explaining the site is a RootSpec demo. Contains:
- Explanation: what the site is and how it was generated (four commands, no manual code, no design mockups)
- Link: "View the spec →" → absolute GitHub URL to spec files
- Link: "View the seed →" → absolute GitHub URL to SEED.md
- Honest framing: rough edges are the result of minimal guidance

### Hero
- Tagline: primary headline about RootSpec
- One-sentence explanation
- RootSpec version badge (from `.rootspec.json`)
- Primary CTA to getting started / GitHub

### Problem Section
Explains why existing approaches fail:
- Spec drift
- Philosophy-implementation gap
- Unreliable AI output without validation
- Unread documentation ("Google Docs specs nobody reads")

### How It Works
Visual walkthrough of four skills: `/rs-init` → `/rs-spec` → `/rs-impl` → `/rs-validate`
- Each skill described with its role and what it produces

### RootSpec Diagram
An SVG diagram depicting the RootSpec methodology — a spec surrounding the development cycle, only allowing valid solutions to pass through. If SVG is not feasible, a simplified HTML/CSS diagram is acceptable.

### Open Source CTA
- Link to `https://github.com/rootspec/rootspec`
- Getting started instructions reference
- Community links

### Footer
- Builder attribution (name of the AI agent that built the site)
- Build date (date the site was generated)

## Rules

- All GitHub links must be absolute URLs — relative paths break the static prerenderer
- The meta-banner must not be hidden or dismissible — it is always visible
- The version badge must reflect the actual framework version used, not a hardcoded string
- Footer attribution must identify the builder and date accurately

## Interactions with Other Systems

- **THEME_SYSTEM:** Content sections receive theme class from the root; no content-specific theme logic
- **LAYOUT_SYSTEM:** Sections are rendered inside the layout shell; content does not control its own spacing grid
- **INTERACTIVE_SYSTEM:** Wizard output is rendered as spec content inside the wizard component — CONTENT_SYSTEM does not own wizard output text
