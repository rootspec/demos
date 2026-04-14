# Level 4: Systems Overview

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md

---

## System Map

RootFeed is organized into six systems. All systems are client-side only. No backend, no external APIs, no authentication.

```
┌─────────────────────────────────────────────────────────────┐
│                        DATA SYSTEM                           │
│  Static JSON files — posts, users, tags (read-only)          │
└──────────────────────┬──────────────────────────────────────┘
                       │ provides seed data to
          ┌────────────┼────────────────────┐
          ▼            ▼                    ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────────┐
│  FEED SYSTEM │  │PROFILE SYSTEM│  │ DISCOVERY SYSTEM │
│  Posts +     │  │ Users +      │  │ Tags + Explore + │
│  Composer +  │  │ Follow state │  │ Search           │
│  Like/Book-  │  │              │  │                  │
│  mark state  │  │              │  │                  │
└──────┬───────┘  └──────┬───────┘  └────────┬─────────┘
       │                 │                    │
       └─────────────────┴────────────────────┘
                         │ consumed by
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
┌──────────────────────────────────────────────────────────────┐
│                       VIEW SYSTEM                             │
│   SvelteKit routes + shared components (PostCard, Composer,  │
│   MetaBanner) — reads state, renders UI, fires interactions  │
└──────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────┐
│                      THEME SYSTEM                             │
│   Light/dark toggle — localStorage persistence               │
└──────────────────────────────────────────────────────────────┘
```

## Systems

| System | File(s) | Responsibility |
|---|---|---|
| DATA SYSTEM | `src/lib/data/*.json` | Owns raw seed data (posts, users, tags). Read-only. |
| FEED SYSTEM | `src/lib/stores/feed.svelte.ts` | Owns liked/bookmarked state, user-composed posts, feed pagination |
| PROFILE SYSTEM | `src/lib/stores/profile.svelte.ts` | Owns follow/unfollow state per user ID |
| DISCOVERY SYSTEM | `src/routes/explore/+page.ts`, `src/routes/search/+page.svelte` | Owns tag-based filtering and keyword search logic |
| VIEW SYSTEM | `src/routes/**`, `src/lib/components/**` | Owns route rendering, shared UI components, navigation |
| THEME SYSTEM | `src/lib/stores/theme.svelte.ts` | Owns light/dark preference, localStorage persistence, CSS class application |

## System Interactions

| Source | Target | Interaction |
|---|---|---|
| DATA SYSTEM | FEED SYSTEM | Posts JSON loaded by SvelteKit `load()` function; passed to FEED SYSTEM as initial data |
| DATA SYSTEM | PROFILE SYSTEM | Users JSON loaded by route `load()` functions; PROFILE SYSTEM reads user IDs for follow state |
| DATA SYSTEM | DISCOVERY SYSTEM | Tags + Posts + Users JSON loaded by Explore/Search `load()` functions |
| FEED SYSTEM | VIEW SYSTEM | Feed state (liked, bookmarked, userPosts) read in `+page.svelte` components |
| PROFILE SYSTEM | VIEW SYSTEM | Follow state read in profile page and explore page |
| DISCOVERY SYSTEM | VIEW SYSTEM | Tag filter state, search results derived in page components |
| THEME SYSTEM | VIEW SYSTEM | `theme.current` value applied as `dark` class on `document.documentElement` |

## Data Flow

```
Static JSON (DATA)
  → SvelteKit load() → route data prop
  → Page component reads data + store state
  → User interaction → store mutation (FEED/PROFILE/THEME)
  → Svelte reactivity → UI update (VIEW)
```

No data ever flows back to DATA SYSTEM. DATA SYSTEM is immutable at runtime.
