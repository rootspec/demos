# VIEW_SYSTEM

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md, THEME_SYSTEM.md

---

## Responsibility

Owns the global layout, navigation, meta banner, and footer. Wraps all pages with consistent chrome that surfaces the RootSpec identity on every route.

---

## Layout Structure

```
+layout.svelte
├── Meta Banner (persistent, top of page)
├── Nav Bar
│   ├── RootFeed logo/wordmark + RootSpec version badge
│   ├── Navigation links: Home | Explore | Search
│   └── Theme toggle button
├── <slot> (page content)
└── Footer
    ├── RootSpec version
    ├── Build date
    ├── Builder identity ("Built with RootSpec")
    └── Link to rootspec/rootspec repo
```

---

## Meta Banner

The meta banner is always visible at the top of every page. It is the primary transparency surface.

**Content:**
> "RootFeed started as a bare SvelteKit scaffold — 5 empty routes and some JSON files. RootSpec defined the spec and implemented the full experience with minimal human guidance."

**Links (three affordances):**
- "View the scaffold commit →" — links to GitHub commit SHA
- "View the spec →" — links to `rootspec/` directory in repo
- "View the seed →" — links to `SEED.md` in repo

**Style:** Distinct background (accent color) to differentiate from the main nav. Not dismissible.

---

## Navigation Bar

- **Logo:** "RootFeed" wordmark, links to `/`
- **Version badge:** RootSpec version (e.g., "v7.2.7") displayed visibly — small badge or label near logo
- **Links:** Home (`/`), Explore (`/explore`), Search (`/search`)
- **Theme toggle:** Sun/Moon icon button — triggers THEME_SYSTEM

---

## Footer

- RootSpec version string
- Build timestamp (injected at build time via Vite env or static string)
- "Built with RootSpec" text with link to rootspec/rootspec GitHub repo
- Brief tagline: "A scaffold demo — not a real social network"

---

## Base Path

The site is deployed to `/demos/scaffold/`. SvelteKit's `base` config must be set so all internal links and asset URLs resolve correctly under this subpath.

---

## Interactions with Other Systems

- Receives theme class from THEME_SYSTEM and applies to root element
- Provides navigation links that route to FEED_SYSTEM, PROFILE_SYSTEM, and DISCOVERY_SYSTEM pages
- Does not manage data or interaction state — purely presentational layout

---

## Rendered Elements (Key)

- Meta banner with text and three external/internal links
- Nav bar with logo, version badge, nav links, and theme toggle
- Page content slot
- Footer with attribution
