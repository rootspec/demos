# Level 4: Feed System

**Responsibility:** Home timeline display, post composition, and engagement interactions (like/bookmark) on the home route (`/`).

---

## Boundaries

- **Owns:** The home feed list, post composer, like/bookmark toggle state
- **Does not own:** User profile data (PROFILE_SYSTEM), post thread construction (THREAD_SYSTEM), tag/explore discovery (DISCOVERY_SYSTEM)
- **Route:** `/`

---

## Data Ownership

### Post Entity (from posts.json)
- `id` — unique post identifier
- `authorId` — reference to a User entity
- `content` — post text body
- `createdAt` — ISO 8601 timestamp
- `likeCount` — baseline like count from data file
- `repostCount` — repost count from data file
- `parentId` — null for top-level posts; string ID for replies
- `tags` — array of tag name strings

### FeedState (client-side, in-memory)
- `likedIds: string[]` — post IDs the current session has liked
- `bookmarkedIds: string[]` — post IDs the current session has bookmarked
- `userPosts: Post[]` — posts created in the current session via the composer

---

## Rules

### Feed Construction
- Posts are loaded from `posts.json` at route load time
- User-composed posts (`userPosts`) are prepended to the top of the data file posts
- Posts are displayed in reverse-chronological order (newest first)
- The feed does not paginate in the current implementation — all posts are shown

### Post Filtering
- The home feed shows ALL posts (top-level and replies)
- No filtering by follow state — all mock users' posts appear

### Like Behavior
- Each post card tracks its own local `liked` boolean state
- When liked: like button is visually active (filled heart, red color), displayed count increments by 1
- When unliked: button returns to default state, count returns to `post.likeCount`
- Like state is local to the post card component — not shared with THREAD_SYSTEM or PROFILE_SYSTEM

### Bookmark Behavior
- Each post card tracks its own local `bookmarked` boolean state
- When bookmarked: bookmark button is visually active (filled, amber color)
- Bookmark state is local to the post card component — purely visual feedback, no list of bookmarks exists

### Post Composition
- Composer textarea accepts plain text
- Maximum post length: [max_post_length] characters
- Character count is displayed as `[current]/[max_post_length]`
- Empty or whitespace-only submission is blocked with an inline validation error
- Valid submission creates a new Post entity with:
  - Generated ID (`user-[timestamp]`)
  - `authorId` set to `u1` (Alice Chen — the default "current user")
  - Current timestamp
  - Zero likes, zero reposts
  - No parent, no tags
- New post is prepended to `userPosts` and appears at the top of the feed immediately

---

## State Transitions

```
Post Like State:
  unliked → (click like button) → liked
  liked → (click like button) → unliked

Post Bookmark State:
  unbookmarked → (click bookmark button) → bookmarked
  bookmarked → (click bookmark button) → unbookmarked

Composer State:
  empty → (type content) → has_content
  has_content → (submit valid) → empty (post created)
  empty → (submit) → error_shown
  error_shown → (type content) → has_content (error clears)
```

---

## System Interactions

- **→ PROFILE_SYSTEM:** Author handle on each post card links to `/profile/[handle]`
- **→ THREAD_SYSTEM:** Post content on each card links to `/post/[id]`
- **← SYSTEMS_OVERVIEW:** Reads from shared `posts.json` and `users.json`
