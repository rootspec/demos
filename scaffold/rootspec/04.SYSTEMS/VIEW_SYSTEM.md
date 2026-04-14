# VIEW_SYSTEM

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, DATA_SYSTEM.md

---

## Responsibility

Owns all shared visual structure: the persistent layout shell (nav + meta banner + footer), the theme system, and reusable components used across routes (PostCard, UserCard, TagChip). VIEW_SYSTEM is the presentation layer; it renders data provided by other systems and emits interaction events back to them.

---

## Layout Shell

### Navigation Bar
- Persistent across all routes
- Contains: RootFeed logo (links to `/`), nav links (Home, Explore, Search), compose button, theme toggle
- RootSpec version badge (e.g., `v7.2.5`) displayed in the nav, right-aligned

### Meta Banner
- Appears below the nav bar, above main content, on every page
- Non-dismissible (no close button)
- Content: explanation of demo context + three links:
  - "View the scaffold commit →" (GitHub link)
  - "View the spec →" (links to rootspec/ directory in repo)
  - "View the seed →" (links to SEED.md in repo)
- Visual style: distinct from content (e.g., subtle tinted background) but not intrusive

### Main Content Area
- Centered column, max-width [content_max_width]
- Horizontal padding on small screens

### Footer
- Appears at bottom of every page
- Contents:
  - "RootFeed — A RootSpec scaffold demo"
  - RootSpec version: `v7.2.5`
  - Build date (injected at build time)
  - Builder identity: "Built by Claude (claude-sonnet-4-6)"
  - Link to rootspec/rootspec repository

---

## Theme System

### State
- `theme` store: `'light'` or `'dark'`
- Initialized from localStorage, falls back to `prefers-color-scheme` media query
- Manual toggle writes to localStorage

### Application
- Theme class applied to the root `<html>` or `<body>` element
- Tailwind dark mode via `class` strategy (not `media`)
- All components use `dark:` variants for dark mode styles

### Toggle Component
- Icon button in the nav bar
- Shows sun icon in dark mode (switch to light), moon icon in light mode (switch to dark)

---

## Shared Components

### PostCard
Used in: home feed, post detail (parent/reply display), profile, explore, search results.

Props:
- `post` — Post entity
- `author` — User entity
- `liked` — boolean (from FEED_SYSTEM store)
- `bookmarked` — boolean (from FEED_SYSTEM store)

Emits:
- `like` — toggled
- `bookmark` — toggled

Renders:
- Author avatar → profile link
- Author display name → profile link
- Author handle → profile link
- Relative timestamp
- Post content
- Reply indicator ("Replying to @handle") if post has a parentId
- Like button + count
- Bookmark button
- Reply count (static)

### UserCard
Used in: explore page suggested users section.

Props:
- `user` — User entity
- `following` — boolean (from PROFILE_SYSTEM store)

Emits:
- `follow` — toggled

Renders:
- Avatar → profile link
- Display name → profile link
- Handle
- Bio
- Follow/Unfollow button

### TagChip
Used in: explore trending tags, search tag filter.

Props:
- `tag` — Tag entity
- `active` — boolean

Emits:
- `click`

Renders:
- `#tagname` with post count
- Active/inactive visual state

---

## Rules

- VIEW_SYSTEM owns presentation; it never mutates data stores directly — it emits events
- The meta banner must be present on every page; removing it violates the "Transparent by Construction" pillar
- The footer must always show the RootSpec version
- Theme is applied at the root level; individual components should not override it
- Relative timestamps use a simple human-readable format (e.g., "2h ago", "3d ago") computed from `createdAt`

---

## Interactions with Other Systems

- Receives post/user data from FEED_SYSTEM, PROFILE_SYSTEM, DISCOVERY_SYSTEM to render
- Emits like/bookmark events → FEED_SYSTEM stores
- Emits follow/unfollow events → PROFILE_SYSTEM store
- Reads theme store state to apply dark/light class
