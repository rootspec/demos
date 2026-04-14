# DATA_SYSTEM

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md

---

## Responsibility

Owns all mock data: its shape, content, and loading mechanism. Provides the single source of truth for posts, users, and tags that all other systems consume at build time.

---

## Data Sources

All data lives in `src/lib/data/` as JSON files:

- `users.json` — [N] users (8–10)
- `posts.json` — [N] posts (30–40)
- `tags.json` — [N] tags (10–15)

---

## Entity Schemas

### User

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (e.g., "u1") |
| handle | string | URL-safe handle (e.g., "alice.dev") |
| displayName | string | Human-readable name |
| bio | string | Short biography |
| avatar | string | URL to avatar image (DiceBear placeholder) |
| followerCount | number | Follower count at seed time |
| followingCount | number | Following count at seed time |

### Post

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (e.g., "p1") |
| authorId | string | References User.id |
| content | string | Post text content |
| likeCount | number | Like count at seed time |
| repostCount | number | Repost count at seed time |
| parentId | string or null | References parent Post.id for replies; null for top-level |
| tags | string[] | Tag names (without #) |
| createdAt | string | ISO 8601 timestamp |

### Tag

| Field | Type | Description |
|-------|------|-------------|
| name | string | Tag name without # (e.g., "webdev") |
| postCount | number | Number of posts with this tag |

---

## Loading Mechanism

SvelteKit `+page.ts` files import JSON directly:

```ts
import users from '$lib/data/users.json';
import posts from '$lib/data/posts.json';
import tags from '$lib/data/tags.json';
```

Data is passed to pages as `data` props. No async fetching at runtime.

---

## Content Guidelines

- Users should have distinct voices and realistic developer/tech personas
- Posts should feel like real tech community discussions: opinions, humor, replies, threads
- Threads are formed by `parentId` references — replies chain to top-level posts
- Tags should appear naturally in post content (not forced)
- Timestamps should span a plausible recent window (e.g., last 2 weeks)
- Avatar URLs use DiceBear `avataaars` style with the handle as seed

---

## Boundaries

- DATA_SYSTEM is read-only at runtime — no system writes back to JSON files
- Interaction state (like counts modified by user, follow state) is owned by FEED_SYSTEM and PROFILE_SYSTEM respectively — they use the seed values as initial state
- DATA_SYSTEM does not validate referential integrity at runtime; mock data must be consistent at authoring time
