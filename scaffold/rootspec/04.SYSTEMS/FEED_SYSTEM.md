# Feed System

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, DATA_SYSTEM.md

---

## Responsibility

The Feed System manages all mutable state related to the home feed experience: which posts the visitor has liked, which they've bookmarked, and any posts they've composed during the session. It also owns feed pagination — how many posts are currently visible.

## Boundaries

- **Owns:** `src/lib/stores/feed.svelte.ts`
- **Reads from:** DATA SYSTEM (posts via route load)
- **Does not own:** User identity, follow state (PROFILE SYSTEM), tag/search state (DISCOVERY SYSTEM)

## State

| State | Type | Default | Description |
|---|---|---|---|
| `likedIds` | `string[]` | `[]` | IDs of posts the visitor has liked this session |
| `bookmarkedIds` | `string[]` | `[]` | IDs of posts the visitor has bookmarked this session |
| `userPosts` | `Post[]` | `[]` | Posts composed by the visitor this session |

All state is in-memory only. Resets on page reload. This ephemerality is intentional and aligns with Radical Transparency.

## Derived Values

- `isLiked(id)` — boolean derived from `likedIds`
- `isBookmarked(id)` — boolean derived from `bookmarkedIds`
- Displayed like count = base `post.likeCount` incremented by one if the visitor has liked the post — computed in VIEW SYSTEM at render time

## Operations

### toggleLike(postId)
- If `postId` is in `likedIds`: removes it
- Otherwise: appends it
- No network call, no persistence

### toggleBookmark(postId)
- If `postId` is in `bookmarkedIds`: removes it
- Otherwise: appends it

### addPost(content)
- Creates a new `Post` object with a unique ID (`user-{timestamp}`), `authorId: 'u1'`, current ISO timestamp, empty counts, null parentId, empty tags
- Prepends to `userPosts`
- The new post appears at the top of the feed immediately via Svelte reactivity

## Feed Composition

The home feed shows: `userPosts` (prepended) + `posts from DATA SYSTEM` (paginated). The first [initial_post_count] DATA SYSTEM posts are shown; clicking "Load more" reveals the next [page_size].

## Interactions with Other Systems

| System | Interaction |
|---|---|
| DATA SYSTEM | Receives posts array from route `load()` |
| VIEW SYSTEM | `feed` store imported in `+page.svelte` for like/bookmark buttons and composer |
