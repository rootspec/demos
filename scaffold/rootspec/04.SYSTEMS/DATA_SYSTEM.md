# DATA_SYSTEM

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md

---

## Responsibility

Owns all raw data: the three JSON files that serve as the mock database, the TypeScript types that describe their shape, and the SvelteKit load functions that make data available to routes. No business logic lives here — only data access and type enforcement.

---

## Entities

### User
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (e.g., `u1`) |
| `handle` | string | URL-safe username (e.g., `alice.dev`) |
| `displayName` | string | Human-readable name |
| `bio` | string | Short profile description |
| `avatar` | string | URL to avatar image (DiceBear placeholder) |
| `followerCount` | number | Starting follower count (static; follow actions adjust via store) |
| `followingCount` | number | Starting following count (static) |

### Post
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (e.g., `p1`) |
| `authorId` | string | Reference to User.id |
| `content` | string | Post text content |
| `createdAt` | string | ISO 8601 timestamp |
| `likeCount` | number | Starting like count (static; like actions adjust via store) |
| `repostCount` | number | Starting repost count (static) |
| `parentId` | string or null | If set, this post is a reply to the referenced post |
| `tags` | string[] | Array of tag names associated with this post |

### Tag
| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Tag identifier (no `#` prefix) |
| `postCount` | number | Number of posts using this tag |

---

## Data Sources

- `src/lib/data/users.json` — 8 users
- `src/lib/data/posts.json` — 30 posts (including threaded replies)
- `src/lib/data/tags.json` — 15 tags

Data is loaded at build time (static adapter) and bundled. No runtime network requests.

---

## Load Functions

Each route has a `+page.ts` (or `+layout.ts`) load function that imports from JSON and returns typed data. Load functions are the boundary between raw JSON and the route's `data` prop.

- `+layout.ts` — Loads all users; makes them available to all routes for handle/avatar lookups
- `+page.ts` (home) — Returns all posts sorted by `createdAt` descending
- `+page.ts` (post detail) — Returns single post, its parent (if any), and its replies
- `+page.ts` (profile) — Returns user by handle, and all posts by that user
- `+page.ts` (search) — Returns all posts and all users (filtering happens client-side)
- `+page.ts` (explore) — Returns tags, all users, and top posts by like count

---

## Rules

- All data is read-only at the JSON level. Mutations (like, follow, new post) happen in client-side stores and are never written back to JSON.
- Post threading is one level deep: a reply can reference a parent post, but a reply to a reply renders as a reply to the top-level post. Deep nesting is not supported.
- Author resolution (looking up a User by `authorId`) happens in components, not load functions. Load functions pass raw data; components join.

---

## Interactions with Other Systems

- **FEED_SYSTEM** reads posts and users from load function output
- **PROFILE_SYSTEM** reads user record and user's posts from load function output
- **DISCOVERY_SYSTEM** reads tags, users, and posts from load function output
- **VIEW_SYSTEM** reads users map for avatar/handle display in shared post components
