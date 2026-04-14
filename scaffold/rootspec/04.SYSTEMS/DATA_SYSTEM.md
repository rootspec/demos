# DATA_SYSTEM

**Responsibility:** Loading and providing mock data to all other systems. Owns the JSON source files and the SvelteKit `+page.ts` loaders that read them.

**Depends on:** 01.PHILOSOPHY.md, 02.TRUTHS.md

---

## Data Owned

| File | Shape | Description |
|---|---|---|
| `src/lib/data/users.json` | `User[]` | 8-10 users with `id`, `handle`, `displayName`, `bio`, `avatarUrl`, `followerCount`, `followingCount` |
| `src/lib/data/posts.json` | `Post[]` | 30-40 posts with `id`, `authorId`, `content`, `createdAt`, `likeCount`, `repostCount`, `parentId`, `tags` |
| `src/lib/data/tags.json` | `Tag[]` | 10-15 tags with `name`, `postCount` |

---

## Responsibilities

1. **Load data:** Each `+page.ts` file imports from JSON and returns typed data to the page component via the `data` prop.
2. **Filter for route:** Profile pages filter `posts.json` by `authorId`; thread pages find the post by ID and filter replies by `parentId`.
3. **Prerender entries:** Dynamic routes export `entries()` that return all known IDs/handles from the JSON files.

---

## Boundaries

- DATA_SYSTEM does NOT manage client-side interactive state (likes, follows, etc.) — that lives in FEED_SYSTEM and PROFILE_SYSTEM.
- DATA_SYSTEM does NOT make network requests — all data is static JSON bundled at build time.
- DATA_SYSTEM does NOT validate data shape at runtime — types are inferred from JSON structure.

---

## Interactions with Other Systems

| Consumer | What it receives |
|---|---|
| FEED_SYSTEM | All posts + all users (home feed); single post + replies + users (thread) |
| PROFILE_SYSTEM | Single user + filtered posts for that user |
| DISCOVERY_SYSTEM | All tags + all users + all posts (explore); all posts + users (search) |

---

## TypeScript Types

```typescript
interface User {
  id: string;
  handle: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  followerCount: number;
  followingCount: number;
}

interface Post {
  id: string;
  authorId: string;
  content: string;
  createdAt: string; // ISO 8601
  likeCount: number;
  repostCount: number;
  parentId: string | null;
  tags: string[];
}

interface Tag {
  name: string;
  postCount: number;
}
```
