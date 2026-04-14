# System: FEED_SYSTEM
<!-- L4: References L1-3 + Sibling L4 + External -->

## Responsibility

Manages the home feed experience: displaying posts, paginating through them, composing new posts, and tracking like/bookmark state. The FEED_SYSTEM is the primary interactive surface of the app and the core demonstration of RootSpec's scaffold workflow.

## State Owned

All state lives in `src/lib/stores/feed.svelte.ts` as a Svelte 5 reactive class (`FeedState`):

| State | Type | Description |
|-------|------|-------------|
| `likedIds` | `string[]` | IDs of posts the user has liked (session only) |
| `bookmarkedIds` | `string[]` | IDs of posts the user has bookmarked (session only) |
| `userPosts` | `Post[]` | Posts composed in the current session, prepended to feed |

## Derived Values

- `isLiked(id)` — returns true if the post ID is in `likedIds`
- `isBookmarked(id)` — returns true if the post ID is in `bookmarkedIds`
- Displayed like count = `post.likeCount + (isLiked(id) ? 1 : 0)`

## Behaviors

### Feed Display
Posts are rendered via `PostCard` component. Each card shows: avatar, display name, handle, relative timestamp, content, like button with count, repost count (read-only), bookmark button.

### Pagination
Home feed shows [initial_posts_count] posts initially. A "Load more" control loads [load_more_count] additional posts per click. When all posts are shown, the control is hidden.

Combined post list = `userPosts` (new session posts first) + paginated slice of `data.posts`.

### Like Toggle
Clicking the like button: adds/removes post ID from `likedIds`, updates the displayed count immediately, renders filled/outlined heart icon.

### Bookmark Toggle
Clicking the bookmark button: adds/removes post ID from `bookmarkedIds`, renders filled/outlined bookmark icon.

### Post Composition
The `Composer` component renders above the feed. A textarea accepts content up to [max_post_length] characters. A character counter displays `n/[max_post_length]`. Submitting adds the post to `userPosts` prepended to the feed. Submitting empty content shows an inline error.

## Boundaries

**Reads from:**
- DATA_SYSTEM: `data.posts`, `data.users` (via page load function)

**Does not:**
- Manage follow state (owned by PROFILE_SYSTEM)
- Handle search or tag filtering (owned by DISCOVERY_SYSTEM)
- Persist state to localStorage (except THEME_SYSTEM owns that pattern)

## Key Files

- `src/lib/stores/feed.svelte.ts` — FeedState class
- `src/lib/components/Composer.svelte` — Post composer component
- `src/lib/components/PostCard.svelte` — Post display component
- `src/routes/+page.svelte` — Home feed route
- `src/routes/+page.ts` — Home page load function
