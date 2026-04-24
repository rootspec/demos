# Level 4: Systems Overview

**Product:** RootSpec Marketing Site
**Version:** 1.0.0
**Status:** Active

---

## System Map

The site is a static Astro application composed of five systems. The Content System is the primary system — it owns the page copy and the Author's Notes verbatim text. The three interactive systems (Hierarchy Explorer, Spec Wizard, Before/After Comparison) are client-side React islands embedded within the static page. The Theme System manages visual mode across all surfaces.

```
┌─────────────────────────────────────────────────────────┐
│                    CONTENT SYSTEM                       │
│  (static sections: meta banner, hero, problem, how-     │
│   it-works, author's notes, CTA, footer)                │
├──────────────────┬────────────────────┬─────────────────┤
│  HIERARCHY       │   SPEC WIZARD      │  COMPARISON     │
│  EXPLORER        │   SYSTEM           │  SYSTEM         │
│  (interactive    │   (interactive     │  (interactive   │
│   island)        │   island)          │  island)        │
├──────────────────┴────────────────────┴─────────────────┤
│                    THEME SYSTEM                         │
│  (system preference detection, toggle, localStorage)    │
└─────────────────────────────────────────────────────────┘
```

---

## Systems Table

| System | Responsibility | Technology | Owns |
|--------|---------------|------------|------|
| CONTENT_SYSTEM | Static page structure, all prose content, version display | Astro components, Tailwind CSS | Page markup, Meta banner, Hero, Footer |
| HIERARCHY_EXPLORER | Interactive five-level visualization | React island | Explorer state, level data, reference rules |
| SPEC_WIZARD | Three-step wizard, template-based spec output | React island | Wizard state, templates, output rendering |
| COMPARISON_SYSTEM | Before/after panel presentation | React island or Astro component | Panel content, toggle state |
| THEME_SYSTEM | Dark/light mode detection, toggle, persistence | Inline script + CSS variables | Theme token values, user preference |

---

## System Interactions

| From | To | Interaction |
|------|----|-------------|
| CONTENT_SYSTEM | HIERARCHY_EXPLORER | Embeds the explorer as an Astro island; passes no runtime data |
| CONTENT_SYSTEM | SPEC_WIZARD | Embeds the wizard as an Astro island; passes no runtime data |
| CONTENT_SYSTEM | COMPARISON_SYSTEM | Embeds the comparison as an island or static component |
| THEME_SYSTEM | CONTENT_SYSTEM | CSS custom properties applied to `:root`; all content inherits |
| THEME_SYSTEM | HIERARCHY_EXPLORER | Theme tokens inherited via CSS; no JS prop passing required |
| THEME_SYSTEM | SPEC_WIZARD | Theme tokens inherited via CSS; no JS prop passing required |
| THEME_SYSTEM | COMPARISON_SYSTEM | Theme tokens inherited via CSS; no JS prop passing required |
| CONTENT_SYSTEM | `.rootspec.json` | Reads `version` field at build time for display in hero and header |

---

## Data Flow

```
Build time:
  .rootspec.json ──version──▶ CONTENT_SYSTEM (embedded in HTML)

Runtime:
  localStorage ──theme pref──▶ THEME_SYSTEM ──CSS vars──▶ all components
  Visitor input ─────────────▶ SPEC_WIZARD (in-memory only, never persisted)
  Click events ──────────────▶ HIERARCHY_EXPLORER (in-memory state)
  Toggle events ─────────────▶ COMPARISON_SYSTEM (in-session state)
  Toggle click ──────────────▶ THEME_SYSTEM ──▶ localStorage
```

No external API calls exist in this data flow. All runtime data is either derived from visitor input or read from localStorage.
