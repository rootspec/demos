# Level 4: View System

**References:** L1 Philosophy, L2 Truths, L3 Interactions, SYSTEMS_OVERVIEW.md, THEME_SYSTEM.md

---

## Responsibility

Owns the application shell: layout, navigation, meta banner, theme toggle button, and footer. Provides the consistent frame within which all route-level views render. Also owns the PostCard component shared across feed and profile views.

---

## Layout Structure

```
+layout.svelte
  ├── MetaBanner (top of page, always visible)
  ├── <nav> (logo, nav links, theme toggle)
  ├── <main> (route content rendered here)
  └── <footer> (attribution, version, links)
```

---

## MetaBanner Component

Persistent banner on every page. Content:

> "RootFeed started as a bare SvelteKit scaffold — 5 empty routes and some JSON files. RootSpec defined the spec and implemented the full experience with minimal human guidance. [View the scaffold commit →] [View the spec →] [View the seed →]"

Links:
- **Scaffold commit** → GitHub commit URL for the scaffold baseline
- **Spec** → Link to the `rootspec/` directory in the GitHub repo
- **Seed** → Link to `SEED.md` in the GitHub repo

---

## Navigation

Navigation bar contains:
- **Logo / Brand** — "RootFeed" text link to `/`
- **RootSpec version badge** — displays "v7.2.6" (or current version) prominently
- **Nav links:** Home (`/`), Explore (`/explore`), Search (`/search`)
- **Theme toggle button** — sun/moon icon, toggles THEME_SYSTEM

---

## Footer

Contains:
- RootSpec version (e.g., "Powered by RootSpec v7.2.6")
- Build date
- Builder identity ("Built by Claude")
- Link to rootspec/rootspec GitHub repo
- Statement: "This is a demo, not a real social network."

---

## PostCard Component

Shared component used on home feed and profile pages. Props:
- `post: Post`
- `author: User`
- `liked: boolean`
- `bookmarked: boolean`
- `onLike: () => void`
- `onBookmark: () => void`

Displays:
- Author avatar (img with alt)
- Author display name (linked to `/profile/[handle]`)
- Author handle
- Post content (linked to `/post/[id]`)
- Formatted timestamp
- Like button (toggles, shows count)
- Bookmark button (toggles, no count displayed)
- Repost count (display only, no interaction)

---

## Base Path

All internal links and asset paths are configured relative to the GitHub Pages base path `/demos/scaffold/`. SvelteKit's `base` from `$app/paths` is used in hrefs where needed.

---

## Boundaries

- **Reads from:** THEME_SYSTEM (current theme), all other systems (via slot/children rendering)
- **Provides:** Consistent layout frame and shared components to all routes
- **Does not:** own data state, manage interactions beyond theme and navigation
