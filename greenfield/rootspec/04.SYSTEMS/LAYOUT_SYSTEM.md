# Level 4: Layout System

**Product:** RootSpec Marketing Site
**Version:** 1.0.0
**Status:** Active

---

## Responsibility

The Layout System defines the structural rules for how content is arranged on the page — column widths, section spacing, responsive breakpoints, and typographic scale. It does not own content, but it determines how all content-carrying components are sized and positioned.

---

## System Boundaries

**Owns:**
- Column grid and maximum content width
- Section vertical rhythm (spacing between sections)
- Responsive breakpoint rules
- Typographic scale (font sizes, line heights, font families)
- Horizontal margins and reading line length

**Does not own:**
- Color and appearance (owned by THEME_SYSTEM)
- Page content (owned by CONTENT_SYSTEM)
- Interactive component internal layout (owned by each interactive system)

---

## Column Model

The page uses a single-column layout with a constrained content width for prose sections. The layout is editorial: generous margins, long line lengths acceptable for prose reading.

| Region | Width Rule |
|--------|-----------|
| Prose content (body text, headers) | Maximum readable line length constraint |
| Wide content (comparison panels, hero) | Full content column width |
| Full-bleed sections | Edge-to-edge with internal padding |

Horizontal padding is consistent — the layout must not allow content to touch viewport edges at any breakpoint.

---

## Typographic Scale

The typographic system is the primary design element (per L1 Design Pillar: Aesthetic Integrity).

| Role | Family | Usage |
|------|--------|-------|
| Body copy | Serif (e.g., Source Serif 4, Newsreader, or system serif fallback) | Long-form prose sections including Problem, Author's Notes, CTA |
| UI / Labels | Sans-serif (e.g., Inter, IBM Plex Sans, or system sans) | Navigation, buttons, section labels, metadata, wizard UI |
| Code / Commands | Monospace (e.g., JetBrains Mono, IBM Plex Mono, or system monospace) | Skill names (/rs-init, etc.), code examples, version badge |

Font sizes follow a modular scale with [base font size] for body copy. Headings scale upward; captions and metadata scale downward. Line height for prose is generous — [comfortable line height] — to support easy reading at long line lengths.

---

## Responsive Strategy

The layout is mobile-first. Breakpoints are defined for three tiers:

| Tier | Description | Behavior Changes |
|------|-------------|-----------------|
| Narrow (mobile) | Phones and small tablets | Single column, comparison panels switch to toggle |
| Medium (tablet) | Wider tablets | Content width expands; some grid adjustments |
| Wide (desktop) | Laptops and monitors | Full two-column comparison panels; maximum prose width enforced |

Interactive components (HIERARCHY_EXPLORER, SPEC_WIZARD) must adjust their layout at narrow breakpoints — touch targets must remain adequate, text must remain legible.

---

## Spacing System

Spacing follows a consistent scale. Section-to-section spacing is generous to support breathing room (per L2 Truth: Complexity lives in content, not chrome). Internal section spacing (header to body) is tighter.

Spacing values are [base spacing unit] multiples. Large sections get [large section spacing]; component internal spacing gets [small component spacing].

---

## Constraints

- No layout shifts after page load — font loading must not cause reflow (use `font-display: swap` or self-hosted fonts)
- The meta banner must be the first visible full-width element — it cannot be positioned below any content
- Section order in the DOM must match the reading order defined in CONTENT_SYSTEM (meta banner first, hero second, etc.)
- The layout must not use horizontal scroll at any standard viewport width

---

## Interactions with Other Systems

- **CONTENT_SYSTEM:** All content sections are placed within the layout's column structure
- **THEME_SYSTEM:** Provides color tokens; layout consumes spacing and typography tokens only
- **HIERARCHY_EXPLORER, SPEC_WIZARD, COMPARISON_SYSTEM:** Islands are placed at designated mount points within the layout column; their internal layout is self-contained
