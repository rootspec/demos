# VIEW_SYSTEM

**Level:** 4 — Systems
**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md

---

## Responsibility

VIEW_SYSTEM owns the application shell: global layout, navigation, the meta banner, the theme toggle, and the base path configuration for GitHub Pages deployment. It is the structural layer that wraps all route-level content.

---

## Application Shell

The shell is implemented in `+layout.svelte` and wraps all pages. It contains:

1. **Meta Banner** — Persistent, non-dismissable, appears at the very top
2. **Navigation Bar** — Primary route links and branding
3. **Main Content Area** — Where route-specific content renders
4. **Footer** — Attribution and metadata

---

## Meta Banner

The meta banner is a fixed element that appears above the nav on every page. It contains:

- A brief description: something like "RootFeed started as a bare SvelteKit scaffold — 5 empty routes and some JSON files. RootSpec defined the spec and implemented the full experience with minimal human guidance."
- Link: `[View the scaffold commit →]` — links to the scaffold commit on GitHub
- Link: `[View the spec →]` — links to the spec directory on GitHub
- Link: `[View the seed →]` — links to SEED.md on GitHub

All links are absolute URLs pointing to `https://github.com/rootspec/demos/tree/main/scaffold`. Relative links are not used — they break the static prerenderer when served from a subpath.

The banner is not interactive beyond the links. It cannot be dismissed.

---

## Navigation Bar

The nav bar contains:
- **Brand:** "RootFeed" wordmark (links to `/`)
- **RootSpec version badge:** "v7.3.6" displayed as a small label near the brand
- **Nav links:** Home, Explore, Search (profile is not in primary nav — reached by clicking handles)
- **Theme toggle:** Sun/moon icon button that switches between light and dark mode

---

## Theme System

### State

| State Key      | Type              | Initial Value                          | Mutation                          |
|----------------|-------------------|----------------------------------------|-----------------------------------|
| colorScheme    | "light" or "dark" | Derived from OS `prefers-color-scheme` | Set on toggle button click        |

### Rules

- On load, read `window.matchMedia('(prefers-color-scheme: dark)')` to initialize the theme
- Apply theme by toggling a class or attribute on the `<html>` or `<body>` element
- Tailwind CSS `dark:` variant classes handle the visual differences
- Theme preference is held in reactive component state (not localStorage)
- Toggle button icon: sun icon when dark mode is active (click to go light); moon icon when light mode is active (click to go dark)

---

## Footer

The footer appears at the bottom of every page and contains:
- RootSpec version (e.g., "RootSpec v7.3.6")
- Build date (injected at build time or hardcoded)
- Builder identity (e.g., "Built by Claude")
- Link to the rootspec/rootspec repository on GitHub

---

## Base Path Configuration

RootFeed is deployed to GitHub Pages at `/demos/scaffold/`. The SvelteKit adapter-static config sets `base: '/demos/scaffold'` so all asset URLs and internal links resolve correctly from the subpath. This configuration is set in `svelte.config.js`.

All internal `href` values use SvelteKit's `base` import to prefix links: `{base}/profile/handle`, `{base}/post/id`, etc.

---

## Routing

| Route                   | SvelteKit File                          |
|-------------------------|-----------------------------------------|
| `/`                     | `src/routes/+page.svelte`               |
| `/explore`              | `src/routes/explore/+page.svelte`       |
| `/search`               | `src/routes/search/+page.svelte`        |
| `/profile/[handle]`     | `src/routes/profile/[handle]/+page.svelte` |
| `/post/[id]`            | `src/routes/post/[id]/+page.svelte`     |

Dynamic routes use `entries()` in their `+page.ts` to enumerate all known handles and post IDs at build time, ensuring prerendering covers every valid route.

---

## Interactions with Other Systems

| System              | Relationship                                                     |
|---------------------|------------------------------------------------------------------|
| FEED_SYSTEM         | Renders feed content in the main content slot                    |
| PROFILE_SYSTEM      | Renders profile content in the main content slot                 |
| DISCOVERY_SYSTEM    | Renders search and explore content in the main content slot      |
| DATA_SYSTEM         | No direct interaction; data flows via route loaders              |
