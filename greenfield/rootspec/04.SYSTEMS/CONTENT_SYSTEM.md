# Level 4: Content System

## Responsibility

Owns all static textual content on the site: section text, the author's notes, section ordering, and the structural markup that makes content readable and navigable.

## Boundaries

**Owns:**
- All prose content for each section (problem, how it works, methodology explanation)
- Author's notes text — verbatim, unmodified, in full
- Section IDs and anchor targets used by navigation
- Heading hierarchy (H1, H2, H3 nesting)

**Does not own:**
- Visual styling (THEME_SYSTEM)
- Layout containers and grid (LAYOUT_SYSTEM)
- Interactive component behavior (INTERACTIVE_SYSTEM)
- GitHub links and external URLs (META_SYSTEM)
- Version number or diagram (PRESENTATION_SYSTEM)

## Data Ownership

### Section Structure

Each section has:
- `id` — anchor target (`#the-problem`, `#how-it-works`, `#why-i-built-rootspec`, etc.)
- `heading` — visible heading text (used verbatim in navigation for the author's notes section)
- `content` — the section's prose or embedded component
- `order` — render position in the page flow

### Author's Notes

The author's notes text is treated as a literal string — not as guidance, not as content to paraphrase. It is stored and rendered as-is. The heading for this section is "Why I Built RootSpec" and this exact string is used in the navigation label. Any summarization or paraphrasing is a violation of the system boundary.

### Section Order

1. Meta banner (META_SYSTEM-owned, rendered first)
2. Header / Navigation (LAYOUT_SYSTEM-owned)
3. Hero (version badge from PRESENTATION_SYSTEM embedded here)
4. The Problem
5. How It Works (methodology diagram from PRESENTATION_SYSTEM embedded here)
6. Hierarchy Explorer (INTERACTIVE_SYSTEM)
7. Spec Your Idea Wizard (INTERACTIVE_SYSTEM)
8. Before/After Comparison (INTERACTIVE_SYSTEM)
9. Why I Built RootSpec (Author's Notes — verbatim)
10. Open Source CTA
11. Footer (attribution)

## State Management

CONTENT_SYSTEM is stateless. All content is static — determined at build time, not at runtime. No content changes in response to user interaction. Interactive components (INTERACTIVE_SYSTEM) may be embedded within content sections but manage their own state independently.

## Interactions with Other Systems

| System | Interaction |
|--------|-------------|
| LAYOUT_SYSTEM | Content sections are wrapped in layout containers provided by LAYOUT_SYSTEM |
| THEME_SYSTEM | Typography and text color tokens from THEME_SYSTEM apply to all content |
| PRESENTATION_SYSTEM | Version badge and methodology diagram are embedded at specific content positions |
| META_SYSTEM | External link URLs (GitHub) are provided by META_SYSTEM; CONTENT_SYSTEM renders them but does not construct them |

## Rules

- The Author's Notes section text must be reproduced verbatim — every word, paragraph break, and emphasis preserved
- Section heading "Why I Built RootSpec" must appear identically in both the section H2 and the navigation link
- All sections must have an `id` attribute enabling direct anchor navigation
- Heading hierarchy must be semantic (one H1 per page, sections use H2, subsections use H3)
