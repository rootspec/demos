# Level 4: Content System

## Responsibility

Owns all static text and structured content rendered on the page. This includes section prose, the Author's Notes verbatim text, the hierarchy level descriptions used by the Interactive System, comparison panel content, and the RootSpec version string.

## Data Ownership

- **Section content:** Prose for each page section (Meta Banner, Hero, Problem, How It Works, Author's Notes, CTA)
- **Version string:** Read from `.rootspec.json` at build time (the `version` field); exposed as a build-time constant
- **Hierarchy level descriptions:** Structured data for each of the five levels (name, purpose, example content, reference rules) — consumed by INTERACTIVE_SYSTEM
- **Comparison panel content:** Two sets of content (without RootSpec / with RootSpec) for the Before/After section
- **External links:** GitHub URLs for the spec, seed, and framework repo — these are absolute URLs (not relative paths)

## Key Rules

- **Author's Notes are immutable.** The text in the Author's Notes section is reproduced verbatim from the SEED.md. No paraphrasing, no condensing, no reordering. The content system holds this text as a literal string.
- **Version is not hardcoded.** The version string is read from `.rootspec.json` at build time. If the file is unavailable, the build should fail loudly rather than silently display a stale version.
- **External links are absolute.** All links to GitHub (spec files, seed, repo) are absolute URLs pointing to `https://github.com/rootspec/demos/tree/main/greenfield`. Relative paths break the static prerenderer under the base path.
- **No lorem ipsum.** All comparison panel content must be real — a realistic vague requirements document vs. a realistic structured hierarchy excerpt.

## Interactions with Other Systems

- Provides section content to LAYOUT_SYSTEM for rendering
- Provides hierarchy level data to INTERACTIVE_SYSTEM for the Explorer component
- Provides version string to LAYOUT_SYSTEM for display in hero/header
- Provides external link URLs to LAYOUT_SYSTEM for the meta-banner and CTA

## State

Content System is stateless. All content is static at build time. No runtime fetching.
