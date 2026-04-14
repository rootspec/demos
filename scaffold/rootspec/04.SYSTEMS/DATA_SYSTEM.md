# Data System

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md

---

## Responsibility

The Data System owns all static seed content for RootFeed. It provides the raw material — users, posts, and tags — that all other systems consume. It is read-only at runtime. No system writes back to the Data System.

## Boundaries

- **Owns:** `src/lib/data/users.json`, `src/lib/data/posts.json`, `src/lib/data/tags.json`
- **Does not own:** Any runtime state, any user-generated content (that belongs to FEED SYSTEM)
- **Does not call:** Any external APIs or network resources

## Data Ownership

### users.json
Each user record contains:
- `id` — unique user identifier (e.g., `u1`)
- `handle` — URL-safe handle used in routes (e.g., `alice.dev`)
- `displayName` — rendered name shown in UI
- `bio` — short bio shown on profile page
- `avatar` — URL to placeholder avatar image (DiceBear API)
- `followerCount` — static count (not live-updated by PROFILE SYSTEM)
- `followingCount` — static count

[small user count] users total. Content is realistic — tech personas with real-sounding bios and handles.

### posts.json
Each post record contains:
- `id` — unique post identifier
- `authorId` — reference to a user `id` in users.json
- `content` — text content of the post
- `createdAt` — ISO 8601 timestamp
- `likeCount` — static baseline count (FEED SYSTEM increments it when liked by visitor)
- `repostCount` — static count
- `parentId` — if set, this post is a reply to the referenced post ID; null for top-level posts
- `tags` — array of tag name strings

[small post count] posts total. Mix of top-level posts and replies to create threaded conversations. Content must read like real tech discussion.

### tags.json
Each tag record contains:
- `name` — tag name without `#` prefix
- `postCount` — count of posts with this tag

[small tag count] tags total. Tags are pre-computed counts; not calculated dynamically.

## Interactions with Other Systems

| System | How it uses Data System |
|---|---|
| FEED SYSTEM | `+page.ts` loads posts.json via SvelteKit `load()`; merged with FEED SYSTEM's `userPosts` |
| PROFILE SYSTEM | Profile route `load()` reads users.json to find the user by handle |
| DISCOVERY SYSTEM | Explore `load()` reads tags.json (sorted by postCount) and users.json |
| VIEW SYSTEM | Route components receive data as props from `load()` return values |

## Constraints

- Data is bundled at build time by Vite's static import resolution
- All content must be realistic — no lorem ipsum
- The "current user" (for the composer) is always `u1` (alice.dev) — this ID is used by FEED SYSTEM when creating new posts
