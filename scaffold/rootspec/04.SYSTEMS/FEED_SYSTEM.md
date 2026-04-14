# FEED_SYSTEM

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md, DATA_SYSTEM.md

---

## Responsibility

Owns the home feed experience: rendering posts, managing pagination, handling post engagement state (likes, bookmarks), and providing the post composer for new posts.

---

## State Owned

| State | Type | Description |
|-------|------|-------------|
| visibleCount | number | Number of posts currently shown (paginated) |
| likedPosts | Set\<string\> | Post IDs the user has liked this session |
| bookmarkedPosts | Set\<string\> | Post IDs the user has bookmarked this session |
| composedPosts | Post[] | Posts created in this session via composer |
| composerOpen | boolean | Whether the composer panel is open |
| composerContent | string | Current text in the composer input |

All state is component-local and ephemeral — it resets on page reload.

---

## Rules

### Pagination
- Initial load shows first [N] posts (e.g., 10)
- "Load more" button appears when more posts exist beyond `visibleCount`
- Each click of "Load more" increments `visibleCount` by [N]
- Posts are displayed in reverse-chronological order (newest first)

### Like Toggle
- Clicking like on a post adds its ID to `likedPosts` and increments displayed count
- Clicking again removes it and decrements the count
- Initial count comes from `post.likeCount` in DATA_SYSTEM

### Bookmark Toggle
- Clicking bookmark adds/removes post ID from `bookmarkedPosts`
- No count displayed — only icon state changes

### Post Composer
- Composer is accessible from the feed header
- Character limit: [N] characters
- On submit: prepend new post to the feed with a session author identity (e.g., "You" or the first user in mock data)
- New posts have 0 likes, 0 reposts, and current timestamp
- Composer resets after submit

---

## Data Consumed

- `posts[]` from DATA_SYSTEM — full post list for the home feed
- `users[]` from DATA_SYSTEM — for resolving `authorId` to display names and handles

---

## Interactions with Other Systems

- Provides post cards that link to PROFILE_SYSTEM routes (via author handle)
- Provides post cards that link to post detail routes (post ID)
- Does not communicate with DISCOVERY_SYSTEM or THEME_SYSTEM directly

---

## Rendered Elements (Key)

- Post card: avatar, display name, handle, content, timestamp, like count, repost count, like button, bookmark button
- "Load more" button at bottom of feed
- Post composer: textarea, character count, submit button, cancel/collapse affordance
- Feed header with "New Post" / compose trigger
