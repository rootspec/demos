# Level 4: Systems Overview

**References:** L1 (Philosophy), L2 (Truths), L3 (Interactions)

---

## System Map

RootFeed is composed of five systems. Each system owns a distinct concern; no two systems own the same data or state.

```
┌─────────────────────────────────────────────────────────────┐
│                        VIEW SYSTEM                          │
│  (Routes, layout, nav, banner, theme application)           │
└──────────────────────┬──────────────────────────────────────┘
                       │ reads
     ┌─────────────────┼─────────────────────┐
     ▼                 ▼                     ▼
┌──────────┐   ┌──────────────┐   ┌────────────────────┐
│   DATA   │   │  INTERACTION │   │   DISCOVERY        │
│  SYSTEM  │   │    SYSTEM    │   │   SYSTEM           │
│          │   │              │   │                    │
│ JSON →   │   │ Svelte stores│   │ Tag filtering,     │
│ typed    │   │ likes, follows│  │ explore surface    │
│ objects  │   │ bookmarks,   │   │                    │
└──────────┘   │ composer     │   └────────────────────┘
               └──────────────┘
                       │
                       ▼
              ┌──────────────────┐
              │   THEME SYSTEM   │
              │                  │
              │ dark/light mode, │
              │ localStorage,    │
              │ system pref      │
              └──────────────────┘
```

---

## Systems

| System | File | Primary Responsibility |
|--------|------|------------------------|
| DATA_SYSTEM | `DATA_SYSTEM.md` | Owns all mock data loading and typed shapes |
| FEED_SYSTEM | `FEED_SYSTEM.md` | Manages timeline display, pagination, post composer |
| PROFILE_SYSTEM | `PROFILE_SYSTEM.md` | User profile pages, follow state, user posts |
| DISCOVERY_SYSTEM | `DISCOVERY_SYSTEM.md` | Explore page, tag filtering, search functionality |
| VIEW_SYSTEM | `VIEW_SYSTEM.md` | Layout, navigation, meta banner, route rendering |
| THEME_SYSTEM | `THEME_SYSTEM.md` | Dark/light mode, system preference, persistence |

---

## Interactions Between Systems

| From | To | Data / Signal |
|------|----|---------------|
| DATA_SYSTEM | FEED_SYSTEM | Post objects, User objects |
| DATA_SYSTEM | PROFILE_SYSTEM | User object, User's posts |
| DATA_SYSTEM | DISCOVERY_SYSTEM | Tags, Users, Posts (for explore/search) |
| DATA_SYSTEM | VIEW_SYSTEM | Route prerender data |
| INTERACTION_SYSTEM | FEED_SYSTEM | Like/bookmark toggles, composed posts |
| INTERACTION_SYSTEM | PROFILE_SYSTEM | Follow/unfollow state |
| INTERACTION_SYSTEM | DISCOVERY_SYSTEM | Follow state on explore page |
| THEME_SYSTEM | VIEW_SYSTEM | Current theme class applied to root element |

> Note: FEED_SYSTEM, PROFILE_SYSTEM, and DISCOVERY_SYSTEM all depend on DATA_SYSTEM for initial data and INTERACTION_SYSTEM for mutable state. INTERACTION_SYSTEM does not depend on any other system — it owns state and exposes it.

---

## Data Flow Summary

1. **At build time:** SvelteKit `+page.ts` loaders read JSON from `DATA_SYSTEM` and pass typed props to page components
2. **At runtime:** Page components subscribe to `INTERACTION_SYSTEM` stores for mutable state (likes, follows, composer posts)
3. **On user action:** INTERACTION_SYSTEM store is updated; derived reactive values in page components update automatically
4. **Theme:** THEME_SYSTEM reads `localStorage` and `prefers-color-scheme` on mount; applies class to `<html>` element; VIEW_SYSTEM's layout consumes this class
