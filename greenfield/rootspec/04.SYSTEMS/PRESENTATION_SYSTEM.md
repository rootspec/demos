# Level 4: Presentation System

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md
**Part of:** SYSTEMS_OVERVIEW.md

---

## Responsibility

The Presentation System owns the specialized display components that bridge content and visual presentation: the version badge, the meta-banner, the before/after comparison, and the RootSpec methodology diagram. It reads build-time data (version from `.rootspec.json`) and renders it into the page.

---

## Component 1: Version Badge

Displays the current RootSpec version prominently. Read from `.rootspec.json` at build time (the `version` field).

**Display:** Text formatted as `v[version number]`, rendered in monospace type.
**Placement:** In the hero section and/or the site header.
**Data source:** `.rootspec.json` → `version` field, injected at build time.
**Fallback:** If version cannot be read, display nothing (no placeholder text).

---

## Component 2: Meta Banner

The most critical element on the page. Frames the entire site as a RootSpec demo.

**Content:**
- Statement: this site was generated from a ~100-line product description using the RootSpec pipeline
- Clarification: no manual code, no design mockups; spec, code, and tests were produced by running four commands
- Link 1: "View the spec →" — absolute URL to `https://github.com/rootspec/demos/tree/main/greenfield/rootspec`
- Link 2: "View the seed →" — absolute URL to `https://github.com/rootspec/demos/tree/main/greenfield` (or direct SEED.md path)
- Honest framing: rough edges are the result of minimal human guidance, not carelessness

**Placement rules:**
- Above the fold
- Before the hero section
- Always visible (not collapsible or dismissible)

**Visual treatment:**
- Visually distinct from the hero — a banner/notice bar, not a content section
- Must not be subtle or easy to miss
- Links are the only interactive elements in the banner

---

## Component 3: Before/After Comparison

Side-by-side (or toggle-based on mobile) comparison of:
- **Without spec:** vague requirements doc, ambiguous stories, untraceable decisions
- **With RootSpec:** structured hierarchy, testable stories, every feature traces to a design pillar

**Content rules:**
- Both panels contain real content — no lorem ipsum
- "Without spec" panel shows realistic artifacts that developers recognize as inadequate
- "With RootSpec" panel shows the same artifacts structured according to RootSpec methodology

**Interaction:**
- Desktop: side-by-side panels, or a slider that transitions between views
- Mobile: toggle button switches between views
- Active panel is visually distinct (the inactive panel is slightly de-emphasized)

**State:**
```
active_panel: "without" | "with"  (default: "without" — show the problem first)
```

---

## Component 4: RootSpec Methodology Diagram

An SVG diagram depicting the core RootSpec concept: a spec surrounding the development cycle, with only valid solutions passing through.

**Design requirements:**
- Hand-feeling: clear linework, intentional spacing, no clip-art icons
- Not a Visio export or generic tech-blog illustration
- Shows: spec as a containing frame, development cycle inside, validation gate allowing only spec-conformant output through
- Monochrome or two-color maximum — respects the restrained palette
- Responsive: scales with its container

**Format:** Inline SVG (not an external image file) to avoid load dependencies and enable theme-aware coloring.

**Theme-awareness:** SVG strokes and fills use CSS custom properties from THEME_SYSTEM so they adapt to light/dark mode.

---

## Data Ownership

| Data | Source | Build-time or Runtime |
|------|--------|-----------------------|
| RootSpec version | `.rootspec.json` → `version` | Build-time injection |
| GitHub spec URL | Hardcoded absolute URL | Build-time |
| GitHub seed URL | Hardcoded absolute URL | Build-time |
| Comparison panel content | CONTENT_SYSTEM | Static |
| Diagram SVG | PRESENTATION_SYSTEM | Static |

---

## Boundaries

- The Presentation System does NOT own page layout or section structure — that belongs to LAYOUT_SYSTEM
- The Presentation System does NOT own typography or color tokens — those belong to THEME_SYSTEM
- The Presentation System does NOT own the wizard or explorer interactive logic — those belong to INTERACTIVE_SYSTEM
- Version reading and banner link generation happen at build time, not runtime
