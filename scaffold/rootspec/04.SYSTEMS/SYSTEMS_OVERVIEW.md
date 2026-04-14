# Level 4: Systems Overview

**Product:** RootFeed
**References:** L1 Philosophy, L2 Truths, L3 Interactions

---

## System Map

| System           | File                    | Responsibility                                      |
|-----------------|-------------------------|-----------------------------------------------------|
| DATA_SYSTEM      | DATA_SYSTEM.md          | Mock data loading, types, and static content supply |
| FEED_SYSTEM      | FEED_SYSTEM.md          | Home feed display, pagination, post composition     |
| PROFILE_SYSTEM   | PROFILE_SYSTEM.md       | User profile display, follow/unfollow state         |
| DISCOVERY_SYSTEM | DISCOVERY_SYSTEM.md     | Explore page, tag filtering, suggested users        |
| THEME_SYSTEM     | THEME_SYSTEM.md         | Dark/light theme detection, toggle, persistence     |
| VIEW_SYSTEM      | VIEW_SYSTEM.md          | Layout, navigation, meta banner, routing            |

---

## System Interactions

| From             | To               | Data / Event                                          |
|-----------------|------------------|-------------------------------------------------------|
| DATA_SYSTEM      | FEED_SYSTEM      | posts[], users[] loaded at build time via +page.ts    |
| DATA_SYSTEM      | PROFILE_SYSTEM   | user, posts[] for a specific handle                   |
| DATA_SYSTEM      | DISCOVERY_SYSTEM | tags[], users[], posts[] for explore page             |
| DATA_SYSTEM      | VIEW_SYSTEM      | posts[], users[] for search route                     |
| FEED_SYSTEM      | VIEW_SYSTEM      | Composed posts injected into feed display             |
| PROFILE_SYSTEM   | VIEW_SYSTEM      | Follow state reflected in profile UI                  |
| THEME_SYSTEM     | VIEW_SYSTEM      | Current theme class applied to `<html>` root          |
| VIEW_SYSTEM      | All systems      | Routes trigger data loading; layout wraps all views   |

---

## Data Flow

```
JSON files (src/lib/data/)
  └─► +page.ts loaders (route-level)
        └─► +page.svelte (route components)
              ├─► Svelte stores (FeedState, ProfileState)
              │     └─► Reactive UI updates
              └─► THEME_SYSTEM (localStorage + CSS class)
```

All data flows downward from static JSON. No data flows upward to the server. Stores are the only mutable state, and they are in-memory only (except theme preference).

---

## Shared Data Types

Defined in `src/lib/types.ts`:

- **User** — `id`, `handle`, `displayName`, `bio`, `avatar`, `followerCount`, `followingCount`
- **Post** — `id`, `authorId`, `content`, `createdAt`, `likeCount`, `repostCount`, `parentId`, `tags`
- **Tag** — `name`, `postCount`
