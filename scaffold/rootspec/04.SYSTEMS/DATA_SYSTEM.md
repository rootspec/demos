# DATA_SYSTEM

**References:** L1 (Philosophy), L2 (Truths), L3 (Interactions)

---

## Responsibility

DATA_SYSTEM is the single source of truth for all mock data in RootFeed. It owns the JSON files that define users, posts, and tags, and it owns the TypeScript types that describe those shapes. All other systems consume data from DATA_SYSTEM; none of them mutate it.

This separation ensures that mock data is legible as an artifact — a developer can read `users.json`, `posts.json`, and `tags.json` and understand the complete universe of the product without reading any component code.

---

## Data Owned

### Users (`src/lib/data/users.json`)

- `id` — unique identifier (e.g., `u1`)
- `handle` — URL-safe handle (e.g., `alice.dev`)
- `displayName` — human-readable name
- `bio` — short self-description
- `avatar` — placeholder image URL (DiceBear API)
- `followerCount` — baseline follower count (mutable via INTERACTION_SYSTEM)
- `followingCount` — baseline following count

**Volume:** 8 users

### Posts (`src/lib/data/posts.json`)

- `id` — unique identifier (e.g., `p1`)
- `authorId` — references a user `id`
- `content` — post text
- `createdAt` — ISO 8601 timestamp
- `likeCount` — baseline like count (mutable via INTERACTION_SYSTEM)
- `repostCount` — baseline repost count (read-only)
- `parentId` — `null` for root posts; references another post `id` for replies
- `tags` — array of tag name strings

**Volume:** 30 posts

### Tags (`src/lib/data/tags.json`)

- `name` — tag identifier (e.g., `webdev`)
- `postCount` — number of posts with this tag

**Volume:** 10–15 tags

---

## Boundaries

**DATA_SYSTEM owns:**
- JSON files in `src/lib/data/`
- TypeScript type definitions in `src/lib/types.ts`
- SvelteKit `+page.ts` load functions (data loading at build time)

**DATA_SYSTEM does NOT own:**
- Mutable state (likes, follows, composed posts) — owned by INTERACTION_SYSTEM
- Rendering — owned by VIEW_SYSTEM and route components
- Tag filtering logic — owned by DISCOVERY_SYSTEM
- Search filtering logic — owned by DISCOVERY_SYSTEM

---

## Interactions with Other Systems

| System | How it uses DATA_SYSTEM |
|--------|------------------------|
| FEED_SYSTEM | Receives all posts and users via `+page.ts` load |
| PROFILE_SYSTEM | Receives a single user and their posts via `+page.ts` load |
| DISCOVERY_SYSTEM | Receives all tags, users, and posts via `+page.ts` load |
| VIEW_SYSTEM | Uses prerendered route data from load functions |

---

## Prerender Contract

Because the site uses `@sveltejs/adapter-static`, all dynamic routes must be prerendered from known data. DATA_SYSTEM's load functions must export `entries()` functions that enumerate every valid handle and post ID from the JSON files. This enables SvelteKit to generate one static page per known route at build time.
