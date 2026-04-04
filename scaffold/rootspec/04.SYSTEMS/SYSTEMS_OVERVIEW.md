# Level 4: Systems Overview

RootFeed has five systems. All operate client-side with mock data — no backend.

| System | Responsibility | Owns |
|--------|---------------|------|
| FEED_SYSTEM | Post display, ordering, pagination, composition | Post rendering, feed state, composer |
| PROFILE_SYSTEM | User profiles, follow relationships | User data, follow state |
| THREAD_SYSTEM | Post threading — parent/reply relationships | Thread assembly, navigation |
| DISCOVERY_SYSTEM | Search, tag filtering, explore surface | Search index, tag aggregation, trending |
| META_SYSTEM | Demo framing, attribution, transparency | Banner content, spec links, theme |

## System Interactions

```
FEED_SYSTEM ←→ PROFILE_SYSTEM    (author resolution)
FEED_SYSTEM ←→ THREAD_SYSTEM     (post data, like/bookmark state)
DISCOVERY_SYSTEM → FEED_SYSTEM    (reads post data)
DISCOVERY_SYSTEM → PROFILE_SYSTEM (reads user data)
META_SYSTEM       (independent — no system dependencies)
```

All systems read from a shared mock data layer (JSON files loaded at build time). Client-side state is owned by individual systems and not shared — each system manages its own reactive state.
