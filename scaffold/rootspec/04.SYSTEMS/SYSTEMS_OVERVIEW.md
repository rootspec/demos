# Level 4: Systems Overview

**Depends on:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md
**Last Updated:** 2026-04-14

---

## System Map

| System | File | Responsibility |
|---|---|---|
| DATA_SYSTEM | DATA_SYSTEM.md | Static JSON loading, mock data access, prerender entry generation |
| FEED_SYSTEM | FEED_SYSTEM.md | Home feed rendering, pagination, post composer, like/bookmark state |
| PROFILE_SYSTEM | PROFILE_SYSTEM.md | User profile rendering, follow/unfollow state |
| DISCOVERY_SYSTEM | DISCOVERY_SYSTEM.md | Explore page (trending tags, people), tag filtering, search |
| THEME_SYSTEM | THEME_SYSTEM.md | Dark/light mode, system preference detection, localStorage persistence |
| VIEW_SYSTEM | VIEW_SYSTEM.md | Layout, meta-banner, nav, footer, RootSpec version display |

---

## System Interactions

| From | To | What crosses the boundary |
|---|---|---|
| DATA_SYSTEM | FEED_SYSTEM | Posts array + users map for home feed |
| DATA_SYSTEM | PROFILE_SYSTEM | User object + filtered posts for profile |
| DATA_SYSTEM | DISCOVERY_SYSTEM | Tags array, users array, posts array |
| DATA_SYSTEM | FEED_SYSTEM | Post detail + replies for thread view |
| FEED_SYSTEM | VIEW_SYSTEM | Rendered post cards (client-side state remains in FEED_SYSTEM) |
| PROFILE_SYSTEM | VIEW_SYSTEM | Rendered profile header and post list |
| DISCOVERY_SYSTEM | VIEW_SYSTEM | Rendered tag chips, user cards, filtered post list |
| THEME_SYSTEM | VIEW_SYSTEM | Active theme class/attribute applied to root element |

---

## Data Flow

```
src/lib/data/*.json
        │
        ▼
  DATA_SYSTEM
  (SvelteKit +page.ts loaders)
        │
   ┌────┴──────────┬──────────────┬─────────────┐
   ▼               ▼              ▼             ▼
FEED_SYSTEM  PROFILE_SYSTEM  DISCOVERY_   (thread view
(/ route)    (/profile/      SYSTEM       in FEED_SYSTEM)
              [handle])      (/explore,
                              /search)
        │               │              │
        └───────────────┴──────────────┘
                        │
                   VIEW_SYSTEM
               (layout, banner, nav,
                footer, theme wrapper)
                        │
                  THEME_SYSTEM
               (theme class on <html>)
```

---

## Prerendering Strategy

All dynamic routes (`/post/[id]`, `/profile/[handle]`) export `entries()` functions that return all known IDs/handles from mock data. SvelteKit prerender generates one static HTML file per entry. Unknown parameters produce no page — acceptable per spec.

---

## State Management

All interactive state is client-side only (Svelte 5 `$state` runes). No shared store needed — each page/component owns its own state:

- Feed page: `likedPosts: Set<string>`, `bookmarkedPosts: Set<string>`, `visibleCount: number`, `composerOpen: boolean`, `composerText: string`
- Profile page: `isFollowing: boolean`
- Explore page: `activeTag: string | null`
- Theme: `theme: 'light' | 'dark'` in layout, persisted to localStorage
