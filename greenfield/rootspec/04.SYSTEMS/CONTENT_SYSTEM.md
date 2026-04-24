# Level 4: Content System

**Product:** RootSpec Marketing Site
**Version:** 1.0.0
**Status:** Active

---

## Responsibility

The Content System owns the static structure and prose content of the entire page. It is responsible for rendering the page shell (header, footer, section layout), embedding the three interactive islands at the correct positions in the document flow, displaying the RootSpec version badge, and presenting the Author's Notes verbatim.

This system has no runtime state. It is rendered at build time by Astro and delivered as static HTML.

---

## System Boundaries

**Owns:**
- Page layout and overall document structure
- All static text content (meta banner copy, hero tagline, problem section, how-it-works section, CTA section)
- Author's Notes section (verbatim text, no processing)
- Navigation header and footer
- Version badge (reads `.rootspec.json` at build time)
- Astro component tree

**Does not own:**
- Interactive state (delegated to island systems)
- Theme tokens (owned by THEME_SYSTEM, consumed via CSS variables)
- Wizard templates or hierarchy data (owned by SPEC_WIZARD and HIERARCHY_EXPLORER respectively)

---

## Page Section Inventory

Sections in document order:

| Section | Content Responsibility | Notes |
|---------|----------------------|-------|
| Header | Navigation, version badge, theme toggle affordance | Version read from `.rootspec.json` at build time |
| Meta Banner | Honest description of the demo; links to seed and spec files on GitHub | Must appear above fold, before all marketing content |
| Hero | Product name, tagline, one-sentence explanation, version badge | Second appearance of version badge |
| Problem | Four to five pain points: spec drift, philosophy gap, AI unreliability, unread docs | No interaction |
| How It Works | Four-skill walkthrough (init → spec → impl → validate) with descriptions | May include the SVG diagram |
| Hierarchy Explorer | Section header + embedded HIERARCHY_EXPLORER island | |
| Spec Wizard | Section header + embedded SPEC_WIZARD island | Must include framing that wizard is template-based |
| Before/After | Section header + embedded COMPARISON_SYSTEM | |
| Author's Notes | Section header + verbatim Author's Notes text | Verbatim, no editing |
| Open Source CTA | Link to framework GitHub repo, getting started direction | Primary conversion target |
| Footer | Site builder attribution with date; RootSpec version | |

---

## Data Ownership

| Data | Source | How Used |
|------|--------|----------|
| `version` | `.rootspec.json` (build time) | Displayed in header version badge and hero section |
| Seed file URL | Hardcoded absolute GitHub URL | Meta banner link |
| Spec files URL | Hardcoded absolute GitHub URL | Meta banner link |
| Framework repo URL | Hardcoded absolute GitHub URL | Open Source CTA |
| Author's Notes text | SEED.md verbatim content | Embedded as static HTML in Author's Notes section |
| Build date | Static string set at time of generation | Footer attribution |

---

## Constraints

- All internal links must use the `/demos/greenfield/` base path prefix (configured in Astro)
- All external links must be absolute URLs (no relative paths to GitHub files)
- The Author's Notes section must render the text as provided in the SEED.md — no summarization, no reordering, no stylistic editing
- The meta banner must appear in the DOM before any interactive or marketing section
- The version badge value is never hardcoded; it is always derived from `.rootspec.json` at build time

---

## SVG Diagram

The Content System is responsible for including a diagram of the RootSpec methodology — specifically a visualization of the spec acting as a validation gate around the development cycle, allowing only valid solutions to pass through. The diagram is an SVG, either inline in the HTML or embedded as a component. It must:

- Depict the spec surrounding the development cycle
- Show valid solutions passing through the spec gate and invalid solutions being stopped
- Use clear linework and intentional spacing (not a generic tech-blog illustration)
- Render correctly in both light and dark mode (using CSS custom properties for fill and stroke colors)
- Have appropriate alt text for accessibility

---

## Interactions with Other Systems

- **THEME_SYSTEM:** Provides CSS custom properties that the Content System's components consume for colors and background
- **HIERARCHY_EXPLORER, SPEC_WIZARD, COMPARISON_SYSTEM:** Embedded as Astro client islands; the Content System provides their mounting point and surrounding section context but passes no data to them at runtime
