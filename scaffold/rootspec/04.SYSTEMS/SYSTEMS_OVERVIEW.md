# Level 4: Systems Overview

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md

---

## System Map

| System | Responsibility | Primary Route(s) |
|--------|---------------|-----------------|
| **FEED_SYSTEM** | Post timeline, pagination, post composer | `/` |
| **PROFILE_SYSTEM** | User data, follow state | `/profile/[handle]` |
| **DISCOVERY_SYSTEM** | Search, explore, tag filtering | `/search`, `/explore` |
| **DATA_SYSTEM** | Mock data loading, shared entity types | All routes |
| **VIEW_SYSTEM** | Layout, navigation, meta banner, theme, post components | All routes |

---

## System Interactions

| From | To | What Flows |
|------|----|-----------|
| DATA_SYSTEM | FEED_SYSTEM | Posts array, users map |
| DATA_SYSTEM | PROFILE_SYSTEM | User record, filtered posts |
| DATA_SYSTEM | DISCOVERY_SYSTEM | All posts, all users, tags |
| DATA_SYSTEM | VIEW_SYSTEM | Users map (for avatar/handle lookups) |
| FEED_SYSTEM | VIEW_SYSTEM | Post cards rendered by shared components |
| PROFILE_SYSTEM | VIEW_SYSTEM | Profile header, post list |
| DISCOVERY_SYSTEM | VIEW_SYSTEM | Tag chips, user cards, filtered post list |
| VIEW_SYSTEM | FEED_SYSTEM | Like/bookmark toggle events |
| VIEW_SYSTEM | PROFILE_SYSTEM | Follow/unfollow toggle events |

---

## Data Flow

```
JSON files (src/lib/data/)
        ↓
  DATA_SYSTEM (load + type)
        ↓
  ┌─────┼─────┬──────────┐
  ↓     ↓     ↓          ↓
FEED  PROFILE  DISCOVERY  VIEW
SYSTEM SYSTEM   SYSTEM    SYSTEM
  ↓     ↓          ↓       ↓
        └──────────────────┘
              ↓
         Rendered UI
              ↓
    User interaction events
              ↓
    Client-side store updates
              ↓
    Reactive UI re-render
```

---

## Shared State

Client-side stores (Svelte stores) hold mutable interaction state. These are the only things that change after initial load:

| Store | Owner | Contents |
|-------|-------|---------|
| `likedPostIds` | FEED_SYSTEM | Set of post IDs the user has liked |
| `bookmarkedPostIds` | FEED_SYSTEM | Set of post IDs the user has bookmarked |
| `followedUserIds` | PROFILE_SYSTEM | Set of user IDs the user is following |
| `composedPosts` | FEED_SYSTEM | Array of posts created in this session |
| `theme` | VIEW_SYSTEM | `'light'` or `'dark'` |

---

## System Files

- [DATA_SYSTEM.md](DATA_SYSTEM.md) — Entity types, JSON loading, data contracts
- [FEED_SYSTEM.md](FEED_SYSTEM.md) — Post timeline, pagination, composer, like/bookmark
- [PROFILE_SYSTEM.md](PROFILE_SYSTEM.md) — User profiles, follow/unfollow
- [DISCOVERY_SYSTEM.md](DISCOVERY_SYSTEM.md) — Search, explore, tag filtering
- [VIEW_SYSTEM.md](VIEW_SYSTEM.md) — Layout, navigation, meta banner, theme, shared components
