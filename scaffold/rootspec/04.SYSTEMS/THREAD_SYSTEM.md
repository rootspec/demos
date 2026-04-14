# Level 4: Thread System

**Responsibility:** Single post detail view, parent post resolution, and reply chain display (`/post/[id]`).

---

## Boundaries

- **Owns:** Post detail layout, parent post lookup, reply list construction
- **Does not own:** Engagement state (each card manages its own), author profile (PROFILE_SYSTEM), feed composition (FEED_SYSTEM)
- **Route:** `/post/[id]`

---

## Data Ownership

Thread system uses the same Post and User entities as FEED_SYSTEM. It does not define new entities — it constructs views from existing data.

### Thread View (derived)
- **Focal post:** The post matching the route's `[id]`
- **Parent post:** The post whose `id === focal_post.parentId` (if `parentId` is not null)
- **Replies:** All posts where `parentId === focal_post.id`

---

## Rules

### Post Resolution
- Load the focal post by matching `id` to `posts.json`
- If no post matches, render a "Post not found" message and stop
- The focal post is displayed prominently (larger text, full content)

### Parent Resolution
- If `focal_post.parentId` is not null, look up the parent post in `posts.json`
- If the parent is found, display it above the focal post with a visual distinction (indented, or labeled as "In reply to")
- If the parent is not found (data inconsistency), silently omit the parent section

### Reply Construction
- Replies are all posts in `posts.json` where `parentId === focal_post.id`
- Replies are displayed in chronological order (oldest first) below the focal post
- Each reply shows: author info, content, engagement counts
- Nested replies (replies to replies) are NOT shown — only direct replies to the focal post

### Author Resolution
- For each post displayed (focal, parent, each reply), the author is resolved by matching `authorId` to `users.json`
- If the author is not found, author information is omitted gracefully — the post content still renders

### Engagement Display
- Like counts and repost counts are shown for the focal post
- Like/bookmark buttons are available on the focal post
- Replies show engagement counts but no interactive buttons in the current implementation

---

## State Transitions

Thread system is primarily read-only. No state is mutated by the thread view itself. Post engagement (like/bookmark) state is local to any post card components rendered on this page.

---

## System Interactions

- **→ PROFILE_SYSTEM:** Author names on posts link to `/profile/[handle]`
- **← FEED_SYSTEM:** Shares the same Post entity shape; no direct state sharing
- **← SYSTEMS_OVERVIEW:** Reads from shared `posts.json` and `users.json`
