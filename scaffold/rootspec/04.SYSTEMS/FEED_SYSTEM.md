# Level 4: Feed System

**References:** L1 Philosophy, L2 Truths, L3 Interactions, SYSTEMS_OVERVIEW.md, DATA_SYSTEM.md

---

## Responsibility

Owns the home feed experience: displaying posts, paginating them, enabling engagement (like/bookmark), and accepting new posts from the composer. Manages the `FeedState` store.

---

## State Ownership: FeedState

Svelte class-based reactive store (`src/lib/stores/feed.svelte.ts`):

| Property       | Type       | Description                                                      |
|----------------|------------|------------------------------------------------------------------|
| `likedIds`     | string[]   | Post IDs the user has liked this session                         |
| `bookmarkedIds`| string[]   | Post IDs the user has bookmarked this session                    |
| `userPosts`    | Post[]     | Posts composed during this session (prepended to feed)           |

### Derived State

| Derived           | From                    | Description                                      |
|-------------------|-------------------------|--------------------------------------------------|
| `isLiked(id)`     | likedIds                | Whether a given post ID is currently liked        |
| `isBookmarked(id)`| bookmarkedIds           | Whether a given post ID is currently bookmarked  |
| Visible like count| likedIds + post.likeCount| Displayed count = base + 1 if liked, else base  |

---

## Feed Display Rules

- Posts are sorted by `createdAt` descending (newest first), with `userPosts` prepended before data posts
- [N] posts per page (default: 10)
- "Load more" button loads the next [N] posts
- "Load more" is hidden when all posts are visible
- Each post card shows: author avatar, display name, handle, content, formatted timestamp, like count (adjusted), repost count, like button, bookmark button

---

## Post Composer

Located on the home feed page (collapsible or always visible).

| Property        | Rule                                                          |
|-----------------|---------------------------------------------------------------|
| Character limit | [N] characters maximum                                        |
| Empty guard     | Submit button disabled when content is empty                  |
| Over-limit guard| Submit button disabled and counter shown in warning state     |
| On submit       | New Post added to `userPosts`, composer clears               |
| Author          | Hardcoded to the first mock user (demo constraint)            |

---

## Like/Bookmark Mechanics

- Toggle is immediate; no async operation
- Like count display = `post.likeCount + (isLiked ? 1 : 0)`
- Bookmark count is not displayed (bookmarked icon only)
- Both states reset on page reload (in-memory store)

---

## Boundaries

- **Reads from:** DATA_SYSTEM (via route loader)
- **Writes to:** FeedState store (in-memory)
- **Does not:** persist to localStorage, call external APIs, or affect other routes' data
- **Interacts with:** VIEW_SYSTEM (renders within layout), PROFILE_SYSTEM (author links navigate to profiles)
