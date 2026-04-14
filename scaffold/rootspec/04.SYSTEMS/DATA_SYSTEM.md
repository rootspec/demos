# Level 4: Data System

**References:** L1 Philosophy, L2 Truths, L3 Interactions, SYSTEMS_OVERVIEW.md

---

## Responsibility

Owns all static mock content for the application. Provides typed, structured data to route loaders. Never makes network requests. All data is baked into the static build.

---

## Data Ownership

### users.json
Array of [N] User records. Each user has:
- `id` (string, unique) — internal reference key
- `handle` (string, unique) — URL-safe username, used in profile routes
- `displayName` (string) — human-readable name
- `bio` (string) — short profile description
- `avatar` (string) — placeholder image URL
- `followerCount` (integer) — initial follower count (client-side follow toggling does not mutate this directly; see PROFILE_SYSTEM)
- `followingCount` (integer) — initial following count

### posts.json
Array of [N] Post records. Each post has:
- `id` (string, unique) — used in post detail routes
- `authorId` (string) — references a User.id
- `content` (string) — post text body
- `createdAt` (ISO 8601 timestamp) — used for display
- `likeCount` (integer) — initial like count
- `repostCount` (integer) — initial repost count
- `parentId` (string | null) — if set, this post is a reply to the referenced post
- `tags` (string[]) — tag names without `#` prefix

### tags.json
Array of Tag records. Each tag has:
- `name` (string) — tag name without `#` prefix
- `postCount` (integer) — number of posts using this tag

---

## Content Guidelines

- [N] users total (8–10), with realistic tech community handles and display names
- [N] posts total (30–40), covering: standalone thoughts, replies to other posts, threaded conversations
- [N] tags total (10–15), covering common tech topics
- Content tone: casual tech discussion — opinions about frameworks, tools, dev culture, occasional humor
- No lorem ipsum. Posts should read like something a developer might actually write.

---

## Data Loading Pattern

Each SvelteKit route loader (`+page.ts`) imports directly from the JSON files:

```
import users from '$lib/data/users.json';
import posts from '$lib/data/posts.json';
```

Loaders filter, sort, and pass data to the page component as a `data` prop. No async fetching — imports are resolved at build time.

---

## Boundaries

- **Reads from:** JSON files in `src/lib/data/`
- **Provides to:** FEED_SYSTEM, PROFILE_SYSTEM, DISCOVERY_SYSTEM, VIEW_SYSTEM (via route loaders)
- **Does not:** mutate data, fetch from external sources, or own any client-side state
- **Immutable at runtime:** Data does not change after build. Only Svelte stores layer mutable state on top.
