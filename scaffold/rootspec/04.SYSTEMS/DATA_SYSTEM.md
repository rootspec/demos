# System: DATA_SYSTEM
<!-- L4: References L1-3 + Sibling L4 + External -->

## Responsibility

Owns all static mock data and makes it available to page routes via SvelteKit's `load` functions. Acts as the read-only data layer for the entire application. No writes flow through this system — all mutations live in client-side stores (FEED_SYSTEM, PROFILE_SYSTEM).

## Data Owned

| File | Type | Contents |
|------|------|----------|
| `src/lib/data/users.json` | `User[]` | 8-10 users with id, handle, displayName, bio, avatar, followerCount, followingCount |
| `src/lib/data/posts.json` | `Post[]` | ~30 posts with id, authorId, content, createdAt, likeCount, repostCount, parentId, tags |
| `src/lib/data/tags.json` | `Tag[]` | 15 tags with name and postCount |

## Type Contracts

Defined in `src/lib/types.ts`:
- `User`: id, handle, displayName, bio, avatar, followerCount, followingCount
- `Post`: id, authorId, content, createdAt, likeCount, repostCount, parentId (null | string), tags (string[])
- `Tag`: name, postCount

## Boundaries

**Provides to:**
- FEED_SYSTEM: full posts array + users array via home page `load()`
- PROFILE_SYSTEM: user by handle + their posts via profile page `load()`
- DISCOVERY_SYSTEM: all posts, users, and tags via search and explore page `load()` functions

**Does not:**
- Mutate data (read-only)
- Persist user-generated posts or interactions
- Contact any external API or server

## Load Function Pattern

Each route's `+page.ts` imports JSON directly and returns the relevant slice. Example:
- Home: returns `{ posts, users }`
- Profile: returns `{ user, posts }` filtered by handle
- Post detail: returns `{ post, replies, users }` filtered by post id
- Search/Explore: returns `{ posts, users, tags }`

## Interactions with Other Systems

- FEED_SYSTEM reads `data.posts` and `data.users` from the load function return value
- PROFILE_SYSTEM reads `data.user` and `data.posts` from the profile load function
- DISCOVERY_SYSTEM reads `data.posts`, `data.users`, `data.tags` from search and explore load functions
