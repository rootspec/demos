# VIEW_SYSTEM

**Responsibility:** Shared layout, persistent meta-banner, navigation bar, footer, and RootSpec version display. The "chrome" that wraps every page.

**Depends on:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, THEME_SYSTEM

---

## Files Owned

| File | Purpose |
|---|---|
| `src/routes/+layout.svelte` | Root layout — wraps all pages with nav, meta-banner, footer, theme wrapper |
| `src/app.css` | Global styles, Tailwind imports, dark mode base styles |

---

## Responsibilities

### Meta-Banner
- Persistent at top of every page; not dismissible
- Content: "RootFeed started as a bare SvelteKit scaffold — 5 empty routes and some JSON files. RootSpec defined the spec and implemented the full experience. [View the scaffold commit →] [View the spec →] [View the seed →]"
- All three links are absolute GitHub URLs pointing to `https://github.com/rootspec/demos/tree/main/scaffold`
- Visually distinct from nav (different background color)

### Navigation Bar
- Always visible; fixed or sticky at top
- Contains: RootFeed logo/wordmark (links to `/`), nav links (Home, Explore, Search), RootSpec version badge (v7.2.7), theme toggle button
- RootSpec version is a non-link badge, prominently visible

### Footer
- Appears at bottom of every page
- Contains: "Built with RootSpec v7.2.7", build date, "Built by Claude / Anthropic", link to https://github.com/rootspec/rootspec
- Visually subdued (muted text color)

### Theme Wrapper
- Applies `dark` class to root element based on THEME_SYSTEM state
- All dark mode styles flow from this single class via Tailwind `dark:` variants

---

## Boundaries

- Does NOT own page content — that belongs to FEED_SYSTEM, PROFILE_SYSTEM, DISCOVERY_SYSTEM.
- Does NOT manage interactive state beyond theme toggle (which delegates to THEME_SYSTEM).
- Does NOT render post cards or user cards — those are owned by their respective systems.

---

## Interactions with Other Systems

| System | Interaction |
|---|---|
| THEME_SYSTEM | Reads active theme; renders theme toggle button; applies theme class to `<html>` |
| All page systems | Wraps all routes via SvelteKit layout slot (`{@render children()}`) |
