# Level 4: Systems Overview

**Product:** RootFeed
**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md

---

## System Map

RootFeed is organized into five systems. All systems operate entirely client-side. No system communicates with a server or external API at runtime.

| System         | File                   | Responsibility                                          |
|----------------|------------------------|---------------------------------------------------------|
| DATA_SYSTEM    | DATA_SYSTEM.md         | Mock data loading, shape, and in-memory access          |
| FEED_SYSTEM    | FEED_SYSTEM.md         | Timeline display, pagination, post composition          |
| PROFILE_SYSTEM | PROFILE_SYSTEM.md      | User profile display and follow/unfollow state          |
| DISCOVERY_SYSTEM | DISCOVERY_SYSTEM.md  | Search filtering and explore surface (tags, users, posts) |
| VIEW_SYSTEM    | VIEW_SYSTEM.md         | Layout, navigation, meta banner, theme, and routing     |

---

## System Interactions

| From              | To                 | Data / Event                                          |
|-------------------|--------------------|-------------------------------------------------------|
| DATA_SYSTEM       | FEED_SYSTEM        | Posts array, users lookup                             |
| DATA_SYSTEM       | PROFILE_SYSTEM     | User record, user's posts array                       |
| DATA_SYSTEM       | DISCOVERY_SYSTEM   | All posts, all users, all tags                        |
| FEED_SYSTEM       | VIEW_SYSTEM        | Rendered post list, engagement state, composer state  |
| PROFILE_SYSTEM    | VIEW_SYSTEM        | Rendered profile, follow state                        |
| DISCOVERY_SYSTEM  | VIEW_SYSTEM        | Search results, tag filter state, trending content    |
| VIEW_SYSTEM       | FEED_SYSTEM        | User actions: like, bookmark, compose, load more      |
| VIEW_SYSTEM       | PROFILE_SYSTEM     | User action: follow/unfollow                          |
| VIEW_SYSTEM       | DISCOVERY_SYSTEM   | User actions: search query, tag selection             |

---

## Data Flow

```
JSON Files (src/lib/data/)
        │
        ▼
  DATA_SYSTEM
  (load + expose at build time via SvelteKit +page.ts loaders)
        │
        ├──────────────────────────────────────┐
        ▼                                      ▼
  FEED_SYSTEM                         PROFILE_SYSTEM
  (posts, users)                      (user, posts)
        │                                      │
        ▼                                      ▼
  VIEW_SYSTEM ◄──── DISCOVERY_SYSTEM ◄── (tags, users, posts)
  (layout, nav, theme, banner)
```

State mutations (likes, follows, bookmarks, composed posts) are held in Svelte reactive stores. They are initialized from mock data and mutated by user interactions. They do not flow back to DATA_SYSTEM — the JSON files are read-only.

---

## State Ownership

| State                   | Owner              | Persistence        |
|-------------------------|--------------------|--------------------|
| Posts list              | DATA_SYSTEM        | Build-time (JSON)  |
| Users list              | DATA_SYSTEM        | Build-time (JSON)  |
| Tags list               | DATA_SYSTEM        | Build-time (JSON)  |
| Like state per post     | FEED_SYSTEM        | Session only       |
| Bookmark state per post | FEED_SYSTEM        | Session only       |
| Composed posts          | FEED_SYSTEM        | Session only       |
| Visible post count      | FEED_SYSTEM        | Session only       |
| Follow state per user   | PROFILE_SYSTEM     | Session only       |
| Search query            | DISCOVERY_SYSTEM   | Component-local    |
| Active tag filter       | DISCOVERY_SYSTEM   | Component-local    |
| Theme preference        | VIEW_SYSTEM        | Session only       |

---

## Shared Conventions

- All data types are defined in `src/lib/types.ts`
- Systems communicate through SvelteKit `load()` functions and Svelte stores
- No system introduces async runtime fetching — all data is resolved at build or page-load time
- Engagement counts (like, repost) displayed in the UI are derived from mock data plus session mutations; they are not recalculated from scratch on each render
