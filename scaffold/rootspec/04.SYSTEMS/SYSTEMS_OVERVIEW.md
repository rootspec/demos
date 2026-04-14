# Level 4: Systems Overview

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md

---

## System Map

RootFeed is composed of five major systems. All data flows from static JSON at build time. There is no server or database.

```
DATA_SYSTEM
    ↓ loads at build time
FEED_SYSTEM  ←→  PROFILE_SYSTEM  ←→  DISCOVERY_SYSTEM
    ↓                  ↓                    ↓
VIEW_SYSTEM (renders all routes, applies THEME_SYSTEM)
```

| System | File | Responsibility |
|--------|------|----------------|
| DATA_SYSTEM | DATA_SYSTEM.md | Static JSON loading, data shape, mock content |
| FEED_SYSTEM | FEED_SYSTEM.md | Home feed, post composer, like/bookmark state |
| PROFILE_SYSTEM | PROFILE_SYSTEM.md | User profiles, follow/unfollow state |
| DISCOVERY_SYSTEM | DISCOVERY_SYSTEM.md | Explore page, tag filtering, search |
| VIEW_SYSTEM | VIEW_SYSTEM.md | Layout, navigation, meta banner, theme toggle |
| THEME_SYSTEM | THEME_SYSTEM.md | Dark/light mode, system preference detection |

---

## System Interactions

| Source System | Target System | Data / Event |
|---------------|--------------|--------------|
| DATA_SYSTEM | FEED_SYSTEM | posts[], users[] |
| DATA_SYSTEM | PROFILE_SYSTEM | users[], posts[] |
| DATA_SYSTEM | DISCOVERY_SYSTEM | tags[], users[], posts[] |
| FEED_SYSTEM | VIEW_SYSTEM | rendered post cards |
| PROFILE_SYSTEM | VIEW_SYSTEM | rendered profile, follow button state |
| DISCOVERY_SYSTEM | VIEW_SYSTEM | rendered tag list, user suggestions, filtered posts |
| VIEW_SYSTEM | THEME_SYSTEM | theme toggle event |
| THEME_SYSTEM | VIEW_SYSTEM | current theme class applied to root element |

---

## Data Flow

1. **Build time:** SvelteKit `+page.ts` loaders import JSON from `src/lib/data/` and pass data to pages as props
2. **Runtime (client):** Component state manages interaction state (likes, follows, composed posts, active tag, search query, theme)
3. **No network calls at runtime** — all data is embedded in the static build

---

## Boundaries

- **DATA_SYSTEM** owns the shape and content of mock data; other systems consume it read-only
- **FEED_SYSTEM** owns post engagement state (likes, bookmarks, composed posts) for the home feed
- **PROFILE_SYSTEM** owns follow state per user
- **DISCOVERY_SYSTEM** owns tag filter state and search query state
- **VIEW_SYSTEM** owns layout structure, navigation, and meta banner
- **THEME_SYSTEM** owns theme preference — reads from system media query, writes to localStorage and document class

---

## Shared Entities

These entities are defined in DATA_SYSTEM and referenced by all other systems:

- **Post** — id, authorId, content, likeCount, repostCount, parentId (nullable), tags[], createdAt
- **User** — id, handle, displayName, bio, avatar, followerCount, followingCount
- **Tag** — name, postCount
