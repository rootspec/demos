# Level 4: Layout System
# RootSpec Marketing Site

---

## Responsibility

The Layout System owns the structural organization of the page: the section order, the header, the footer, the responsive grid, and the viewport breakpoints that determine how each section is rendered.

---

## Boundaries

**Owns:**
- Page section order and hierarchy
- Header structure (logo, version badge, theme toggle, navigation links)
- Footer structure (attribution, build date, links)
- Responsive breakpoints and their associated layout rules
- Scroll observation (which sections are currently visible)
- Subpath base URL configuration for GitHub Pages deployment

**Does not own:**
- Content within sections (→ Content System)
- Theme colors or visual style (→ Theme System)
- Animation and transitions (→ Presentation System)
- Interactive behavior within sections (→ Interactive System)

---

## Page Structure

### Sections (in order)
1. **Header** — Persistent; contains logo/wordmark, version badge, theme toggle, anchor nav
2. **Meta Banner** — Full-width informational strip below header; always visible
3. **Hero** — Tagline, one-sentence explanation, primary CTA
4. **Problem Section** — Why existing approaches fail
5. **How It Works** — Four-skill walkthrough (init → spec → impl → validate)
6. **Hierarchy Explorer** — Interactive section
7. **Spec Wizard** — Interactive section
8. **Before/After Comparison** — Interactive section
9. **CTA Section** — GitHub link, getting started prompt
10. **Footer** — Attribution, build date, links

---

## Breakpoints

| Name | Condition | Layout Behavior |
|------|-----------|-----------------|
| Mobile | Narrower than [tablet threshold] | Single column; stacked interactive variants |
| Tablet | Between [tablet threshold] and [desktop threshold] | Two-column where applicable; hybrid interactive variants |
| Desktop | Wider than [desktop threshold] | Full layouts; side-by-side comparison; expanded explorer |

---

## Header Behavior

- Sticky — stays at top of viewport as user scrolls
- Contains: site logo/wordmark, RootSpec version badge, theme toggle button
- On mobile: version badge and nav links may collapse or hide to preserve space

---

## Subpath Deployment

The site is deployed at `/demos/greenfield/`. The build configuration must set the base path so that:
- All asset references (CSS, JS, images) use the subpath
- All internal anchor links resolve correctly relative to the subpath
- The site root (`/`) redirects to or is separate from this deployment path

---

## Rules

- Section order is fixed — no dynamic reordering
- All sections render on a single scrollable page (no client-side routing)
- External links (GitHub, docs) open in new browser tabs
- Header is always visible — no hide-on-scroll behavior that would remove access to the theme toggle
- The meta banner is never dismissible — it is a permanent part of the page
