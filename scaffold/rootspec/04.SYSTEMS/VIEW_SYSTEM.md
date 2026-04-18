# VIEW_SYSTEM

**References:** L1 (Philosophy), L2 (Truths), L3 (Interactions), L4 sibling: THEME_SYSTEM

---

## Responsibility

VIEW_SYSTEM owns the layout shell — the elements that appear on every page: the meta banner, the navigation bar, and the main content wrapper. It applies the current theme class from THEME_SYSTEM and provides the consistent visual container within which all route-specific content is rendered.

---

## State Owned

VIEW_SYSTEM owns no application state. It reads:
- Current theme from THEME_SYSTEM (to apply CSS class)
- Navigation active state (derived from current route)

---

## Behavior

### Meta Banner

A persistent strip above the navigation, visible on every page. Contains:
- Short description: "RootFeed started as a bare SvelteKit scaffold — 5 empty routes and some JSON files. RootSpec defined the spec and implemented the full experience with minimal human guidance."
- Link: "View the scaffold commit →" (absolute GitHub URL)
- Link: "View the spec →" (absolute GitHub URL to `scaffold/rootspec/`)
- Link: "View the seed →" (absolute GitHub URL to `scaffold/SEED.md`)
- Styled distinctly from post content — e.g., a subdued background band

### Navigation Bar

Contains:
- "RootFeed" brand link (navigates to `/`)
- RootSpec version badge (e.g., "v7.3.5") — displayed prominently
- Nav links: Home (`/`), Explore (`/explore`), Search (`/search`)
- Theme toggle button (dark/light)
- Active nav link is visually highlighted

### Footer

Appears on every page, below main content. Contains:
- "RootFeed — A RootSpec scaffold demo"
- RootSpec version
- Build date (injected at build time or hardcoded)
- Link to `rootspec/rootspec` GitHub repo
- Attribution: "Built with RootSpec"

### Main Content Wrapper

- Centered, max-width container (consistent with current `max-w-2xl` convention)
- Provides consistent padding/spacing for all route content

---

## Base Path Configuration

All internal links and asset references must use the SvelteKit `base` path (`/demos/scaffold`). The SvelteKit config must set `paths.base` to `/demos/scaffold`. All `href` attributes in the layout that reference internal routes must use the `$app/paths` `base` helper to be compatible with the static adapter subpath deployment.

---

## Boundaries

**VIEW_SYSTEM owns:**
- `src/routes/+layout.svelte`
- `src/routes/+layout.ts` (if needed for base path setup)
- Meta banner component
- Footer component
- Navigation component
- Theme class application on `<html>` element

**VIEW_SYSTEM does NOT own:**
- Route-specific content — owned by each route's page component
- Theme state — owned by THEME_SYSTEM
- Post data, user data — owned by DATA_SYSTEM

---

## Interactions with Other Systems

| System | Interaction |
|--------|-------------|
| THEME_SYSTEM | Reads current theme; applies CSS class to layout root |
| All route systems | Provides the outer shell they render within |
