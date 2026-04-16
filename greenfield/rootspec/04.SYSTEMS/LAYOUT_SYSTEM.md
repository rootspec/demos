# Level 4: Layout System

References: [L1: Foundational Philosophy], [L2: Stable Truths], [L3: Interaction Architecture], [L4: SYSTEMS_OVERVIEW]

## Responsibility

Owns the page shell, section ordering, navigation structure, and viewport-responsive layout rules. Determines where each section and component is placed, how they are ordered, and how the layout adapts across breakpoints.

## Page Structure

The page is a single scrollable document with the following top-to-bottom section order:

1. **Header** — Logo/wordmark, theme toggle, navigation anchors
2. **Meta Banner** — Always-visible RootSpec demo disclosure (CONTENT_SYSTEM content)
3. **Hero** — Tagline, version badge, primary CTA (CONTENT_SYSTEM content)
4. **Problem Section** — Pain points narrative (CONTENT_SYSTEM content)
5. **How It Works** — Four-skill walkthrough (CONTENT_SYSTEM content)
6. **Hierarchy Explorer** — Interactive five-level visualization (INTERACTIVE_SYSTEM component)
7. **Spec Wizard** — Mini spec-your-idea wizard (INTERACTIVE_SYSTEM component)
8. **Before/After Comparison** — Side-by-side contrast (INTERACTIVE_SYSTEM component)
9. **Open Source CTA** — GitHub link and getting started (CONTENT_SYSTEM content)
10. **Footer** — Attribution and build metadata (CONTENT_SYSTEM content)

## Navigation

- Header contains anchor links to primary sections (smooth scroll)
- On mobile, navigation collapses or reduces to prevent overflow
- The site deploys at subpath `/demos/greenfield/` — all internal links and asset paths must be relative to this base, not the domain root

## Responsive Breakpoints

- **Mobile (narrow):** Single column, stacked layout; interactive components in mobile-adapted form
- **Tablet (medium):** Two-column grid where appropriate; side-by-side content where space allows
- **Desktop (wide):** Full layout with diagrams, side-by-side panels, and expanded interactive components

## Deployment Context

- **Base path:** `/demos/greenfield/` (GitHub Pages subpath)
- **Asset URLs:** All CSS, JS, and image references must resolve relative to the base path
- **Internal links:** Must not assume domain root; must use framework base URL configuration
- **Static build:** No server-side rendering at runtime; page is a static HTML artifact with client-side hydration

## Boundaries

- LAYOUT_SYSTEM does not own section copy or interactive logic — it only positions and contains them
- Section order is fixed by this spec; no runtime reordering
- Scroll behavior is smooth for anchor navigation, native for general scrolling
- LAYOUT_SYSTEM reads theme state from THEME_SYSTEM and applies it to the page root element (enabling CSS variable cascading)
