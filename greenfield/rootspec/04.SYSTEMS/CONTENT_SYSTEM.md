# Level 4: Content System

References: [L1: Foundational Philosophy], [L2: Stable Truths], [L3: Interaction Architecture], [L4: SYSTEMS_OVERVIEW]

## Responsibility

Owns all static page copy and section structure. Defines what the site says and how each argument section is organized. Content is authored at build time and rendered as static HTML — no runtime fetching.

## Sections Owned

### Meta Banner
- **Purpose:** Communicates that the site is a RootSpec demo built from a seed description
- **Content:** Descriptive text explaining the build process; links to SEED.md and spec files on GitHub (absolute URLs)
- **Constraint:** Must be honest about rough edges resulting from minimal guidance; links must be absolute GitHub URLs to survive static build prerendering

### Hero Section
- **Purpose:** Immediate value proposition clarity
- **Content:** Tagline, one-sentence explanation, RootSpec version badge (read from `.rootspec.json` at build time)
- **Version display:** Framework version is a key credibility signal for this demo

### Problem Section
- **Purpose:** Resonance with developer pain
- **Content:** Named pain points — spec drift, philosophy-implementation gap, unreliable AI output, unread Google Doc specs

### How It Works Section
- **Purpose:** Mental model for the four-skill workflow
- **Content:** Walkthrough of `/rs-init`, `/rs-spec`, `/rs-impl`, `/rs-validate` with before/after framing

### Open Source CTA Section
- **Purpose:** Convert interested visitors to engaged community members
- **Content:** Link to framework GitHub repo, getting started instructions summary, community invitation

### Footer
- **Purpose:** Attribution and build metadata
- **Content:** Builder identity (Claude / AI-generated), build date, framework version

## Data Ownership

- Section copy (authored at build time, not editable at runtime)
- External link URLs (GitHub repo, SEED.md, spec files)
- Version string (read from `.rootspec.json` `version` field at build time)
- Build date (injected at build time)

## Boundaries

- CONTENT_SYSTEM does not manage interactive state — it renders static markup only
- External links are absolute GitHub URLs; relative paths are prohibited (they break static prerendering)
- Version display falls back gracefully if `.rootspec.json` is missing or unparseable
- Copy is not fetched from a CMS or API — it is part of the build artifact
