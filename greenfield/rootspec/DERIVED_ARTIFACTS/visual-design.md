# Visual Design

Derived from the RootSpec specification. Regenerated on each `/rs-spec` run.

---

## 1. Design Principles

> Source: 01.PHILOSOPHY.md — design pillars

### From "Vindicated Clarity"

The visitor should feel recognized, not marketed to. Visual approach:
- **Sharp, direct typography** — headlines that cut through, not whisper. Clear hierarchy between heading, subheading, and body.
- **High-contrast text** — readability is paramount. No light-gray-on-white body text.
- **Focused sections** — each section makes one point. No visual clutter competing for attention.
- **Real content** — no stock photos, no abstract illustrations. Code examples, spec excerpts, real pain points.

### From "Empowered Confidence"

The visitor should feel the methodology is within reach. Visual approach:
- **Interactive elements are inviting** — clear affordances, not hidden interactions. Buttons look like buttons.
- **Progressive disclosure** — complex ideas revealed in stages, not all at once. The hierarchy explorer expands; the wizard has steps.
- **Generous whitespace** — room to breathe. The page doesn't feel cramped or overwhelming.
- **Clear calls to action** — "Get Started" not "Learn More About Our Solution."

### From "Honest Credibility"

The visitor should trust through proof, not polish. Visual approach:
- **Meta banner is prominent, not apologetic** — visually distinct, positioned early. Not a footnote.
- **Code-adjacent aesthetic** — monospace accents, spec-like formatting in the explorer. The design evokes the tools developers already use.
- **No stock imagery or gratuitous illustration** — if there's a visual, it's functional (diagrams, code, spec structure).
- **Minimal decoration** — borders and separators are structural, not ornamental.

## 2. Component Patterns

> Source: 03.INTERACTIONS.md — interaction patterns and feedback

**Section containers:** Full-width backgrounds with content constrained to max width. Alternating subtle background tones to distinguish sections. Entry animation on scroll (fade + slight upward slide).

**Interactive cards:** Used by hierarchy explorer (level cards) and spec wizard (template cards, pillar chips). Cards have:
- Clear boundary (border or background)
- Hover state (subtle elevation or color shift)
- Active/selected state (accent border or fill)
- Focus ring (visible, high-contrast)

**Step indicator:** Wizard uses a horizontal step indicator showing progress (step dots or numbers with labels). Current step is highlighted; completed steps are marked.

**Toggle controls:** Theme toggle and comparison toggle share a pattern — a segmented control or icon button with clear state indication.

**Code/spec blocks:** Monospace font, subtle background, syntax-like highlighting for spec content. Used in the hierarchy explorer's expanded content and the wizard's result card.

## 3. Layout Approach

> Source: 03.INTERACTIONS.md — core journey, 04.SYSTEMS/LAYOUT_SYSTEM.md

**Single-page vertical scroll.** The page is a narrative — each section flows into the next. No multi-page navigation.

**Section ordering** (as defined in L4):
1. Header (sticky, minimal)
2. Hero (full viewport height or near it)
3. Meta Banner (visually distinct — different background, possibly an accent color)
4. The Problem
5. How It Works
6. Hierarchy Explorer
7. Spec Wizard
8. Before/After Comparison
9. Open Source CTA
10. Footer

**Information hierarchy:**
- Hero gets the most visual weight (largest text, most whitespace)
- Interactive sections get visual emphasis (distinct backgrounds, more vertical space)
- Content sections are clean and scannable (short paragraphs, bulleted lists)
- CTA is clear but not pushy (one primary button, not three)

## 4. Color & Typography Direction

> Source: 01.PHILOSOPHY.md — design pillars and tone

**Color direction:**
- **Developer-tool palette** — dark backgrounds in dark mode, crisp whites in light mode. Not playful, not corporate.
- **Accent color** — a single strong accent for CTAs, links, and interactive highlights. Something that reads as "technical confidence" — deep blue, electric teal, or sharp green.
- **Muted supporting tones** — grays and near-neutrals for borders, secondary text, code backgrounds.
- **No gradients or color explosions** — the design earns attention through clarity, not chromatic noise.

**Typography direction:**
- **System font stack or a clean sans-serif** — no decorative fonts. The content does the work.
- **Monospace accent** — for code, spec excerpts, version badge, and the wizard result card. Reinforces the developer-tool identity.
- **Strong heading hierarchy** — large, bold headings. Clear size steps between h1, h2, h3.
- **Comfortable body size** — at least 16px base. Long-form sections should be effortless to read.

## 5. Responsive Strategy

> Source: 03.INTERACTIONS.md — edge cases, 04.SYSTEMS/LAYOUT_SYSTEM.md — breakpoints

**Mobile-first approach.** Base styles are mobile; breakpoints add complexity for larger screens.

**Small screens (< 640px):**
- Single column, full-width sections
- Hierarchy explorer: vertical accordion (levels stack)
- Spec wizard: full-width steps, stacked vertically
- Before/after: stacked panels with toggle buttons (not side-by-side)
- Header: hamburger menu or simplified nav
- Hero: shorter, tighter text

**Medium screens (640px–1024px):**
- Two-column layouts where appropriate
- Hierarchy explorer: can show partial reference lines
- Wizard: slightly wider form inputs
- Before/after: side-by-side possible

**Large screens (> 1024px):**
- Full layout with max-width content container
- Hierarchy explorer: full tree visualization with reference lines
- Before/after: side-by-side with draggable divider
- Side navigation dots (optional)

**Touch considerations:**
- All interactive targets at least 44×44px
- No hover-dependent functionality (hover enhances, doesn't gate)
- Swipe-friendly wizard steps on mobile
