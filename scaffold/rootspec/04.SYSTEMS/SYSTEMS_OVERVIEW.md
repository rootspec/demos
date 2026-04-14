# Level 4: Systems Overview

**RootFeed — System Map**

---

## System Inventory

| System | File | Responsibility |
|--------|------|----------------|
| FEED_SYSTEM | FEED_SYSTEM.md | Home timeline, post list, pagination, post composition |
| PROFILE_SYSTEM | PROFILE_SYSTEM.md | User profiles, follow/unfollow state, user data |
| THREAD_SYSTEM | THREAD_SYSTEM.md | Single post detail, parent/reply chain construction |
| DISCOVERY_SYSTEM | DISCOVERY_SYSTEM.md | Explore page, trending tags, tag filtering, suggested users |
| SEARCH_SYSTEM | SEARCH_SYSTEM.md | Real-time search across post content |
| META_SYSTEM | META_SYSTEM.md | Navigation, meta banner, footer, theme, RootSpec version display |

---

## System Interaction Map

```
                    ┌─────────────────┐
                    │   META_SYSTEM   │
                    │ (nav, banner,   │
                    │  footer, theme) │
                    └────────┬────────┘
                             │ wraps all pages
              ┌──────────────┼──────────────────┐
              │              │                  │
      ┌───────▼──────┐ ┌─────▼──────┐  ┌───────▼──────┐
      │  FEED_SYSTEM │ │  DISCOVERY │  │ SEARCH_SYSTEM│
      │  (/ route)   │ │  _SYSTEM   │  │(/search route│
      └──────┬───────┘ │(/explore)  │  └──────────────┘
             │         └─────┬──────┘
             │               │
      ┌──────▼───────┐ ┌─────▼──────────┐
      │THREAD_SYSTEM │ │ PROFILE_SYSTEM │
      │(/post/[id])  │ │(/profile/[hndl]│
      └──────────────┘ └────────────────┘
```

---

## Shared Data Sources

All systems read from static JSON data files. No system writes to these files — all mutations are in-memory client-side state.

| Data File | Contents | Consumed By |
|-----------|----------|-------------|
| `users.json` | User entities (id, handle, displayName, bio, avatar, followerCount, followingCount) | FEED_SYSTEM, PROFILE_SYSTEM, THREAD_SYSTEM, DISCOVERY_SYSTEM, SEARCH_SYSTEM |
| `posts.json` | Post entities (id, authorId, content, createdAt, likeCount, repostCount, parentId, tags) | FEED_SYSTEM, THREAD_SYSTEM, DISCOVERY_SYSTEM, SEARCH_SYSTEM |
| `tags.json` | Tag entities (name, postCount) | DISCOVERY_SYSTEM |

---

## Shared State (Cross-System)

| State Store | Owner | Shared With |
|-------------|-------|-------------|
| `feed` (FeedState) | FEED_SYSTEM | THREAD_SYSTEM (read likedIds) |
| `profile` (ProfileState) | PROFILE_SYSTEM | DISCOVERY_SYSTEM (follow toggle in explore) |
| `theme` | META_SYSTEM | All systems (CSS class on `<html>`) |

---

## Data Flow

```
Static JSON files (read-only)
       │
       ▼
SvelteKit load() functions (per-route data loading)
       │
       ▼
Svelte $props / $state (reactive component data)
       │
       ├──► User interactions trigger state mutations
       │    (toggleLike, toggleBookmark, toggleFollow, addPost)
       │
       └──► UI re-renders reactively
```

---

## System Boundaries

- **FEED_SYSTEM** owns the home feed list and post composition
- **PROFILE_SYSTEM** owns the follow/unfollow state and user profile display
- **THREAD_SYSTEM** owns the parent-reply chain construction and single post view
- **DISCOVERY_SYSTEM** owns tag filtering and the explore user list
- **SEARCH_SYSTEM** owns real-time content filtering
- **META_SYSTEM** owns persistent UI chrome: nav, banner, footer, theme

No system directly modifies another system's state. Cross-system state sharing happens through Svelte stores (`feed`, `profile`, `theme`) that are module-level singletons.
