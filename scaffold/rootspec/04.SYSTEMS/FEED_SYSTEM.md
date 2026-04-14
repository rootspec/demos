# FEED_SYSTEM

**Responsibility:** Home feed rendering, post pagination, post composer, post detail/thread view, like and bookmark client-side state.

**Depends on:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, DATA_SYSTEM

---

## Routes Owned

| Route | File | Purpose |
|---|---|---|
| `/` | `src/routes/+page.svelte` | Home feed with pagination and composer |
| `/post/[id]` | `src/routes/post/[id]/+page.svelte` | Single post with thread (parent + replies) |

---

## State Managed

All state is local to the page component (Svelte 5 `$state` runes):

| State | Type | Default | Description |
|---|---|---|---|
| `likedPosts` | `Set<string>` | empty | Post IDs the user has liked |
| `bookmarkedPosts` | `Set<string>` | empty | Post IDs the user has bookmarked |
| `visibleCount` | `number` | 10 | Number of posts visible in feed |
| `composerText` | `string` | `''` | Text in the post composer |
| `composerPosts` | `Post[]` | `[]` | Posts created in this session |

---

## Responsibilities

1. **Render feed:** Display posts in reverse-chronological order (newest first), showing avatar, display name, handle, content, timestamp, like count, repost count, like button, bookmark button.
2. **Pagination:** Show first `visibleCount` posts; "Load more" button appends 10 more; button hides when `visibleCount >= totalPosts`.
3. **Like toggle:** On like click, toggle post ID in `likedPosts`; display count reflects base count ± client adjustment.
4. **Bookmark toggle:** On bookmark click, toggle post ID in `bookmarkedPosts`; icon reflects state.
5. **Post composer:** Text area for new post; submit creates a new post object prepended to the feed; composer resets after submit; empty submissions are ignored.
6. **Thread view:** `/post/[id]` displays parent post (if `parentId` is set), the main post, and all direct replies.

---

## Boundaries

- Does NOT own user data — resolves authors by looking up `authorId` in the users array received from DATA_SYSTEM.
- Does NOT persist state — all interaction state resets on page reload.
- Does NOT own tag filtering — that lives in DISCOVERY_SYSTEM.

---

## Interactions with Other Systems

| System | Interaction |
|---|---|
| DATA_SYSTEM | Receives posts and users via SvelteKit `data` prop |
| VIEW_SYSTEM | Renders within the shared layout; post cards are internal components |
