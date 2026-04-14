# FEED_SYSTEM

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, DATA_SYSTEM.md

---

## Responsibility

Owns the home feed experience: displaying posts in reverse-chronological order, paginating them, handling like and bookmark toggles, and managing the post composer. This is the primary route (`/`) and the most-visited surface.

---

## State

### Pagination
- Feed renders posts in batches of [feed_page_size] posts
- "Load more" appends the next batch to the visible list
- When all posts are loaded, the "Load more" button is hidden

### Like Store
- Tracks which post IDs the current user has liked (Set)
- Liking a post adds its ID to the set; unliking removes it
- Displayed like count = original `likeCount` + 1 (if liked) or original value (if not)
- State is session-only; resets on page reload

### Bookmark Store
- Tracks which post IDs the current user has bookmarked (Set)
- Bookmarks are private; no public count change
- State is session-only

### Composed Posts Store
- New posts created via the composer are prepended to the feed
- Composed posts have generated IDs (e.g., `composed-[timestamp]`) and use the first user in the dataset as the author
- Composed posts do not appear in search results or profile pages (feed only, session only)

---

## Post Card Component

Each post in the feed renders:
- Author avatar (linked to profile)
- Author display name (linked to profile)
- Author handle (linked to profile)
- Relative timestamp (e.g., "2h ago")
- Post content (full text, no truncation in feed)
- Like button with count (toggleable)
- Bookmark button (toggleable, no count shown)
- Reply count (static, from `replies` derived from `parentId` references)

Reply posts (those with `parentId`) show a "Replying to @handle" indicator below the author line.

---

## Post Composer

- Accessible via a "New post" / compose button in the navigation
- Renders as an expandable textarea (or modal — implementation decides)
- Shows character count: `[current_length] / [max_post_length]`
- Submit is disabled when content is empty or over [max_post_length]
- On submit: creates a new post object, prepends to the composed posts store, clears the textarea
- New post immediately appears at top of home feed

---

## Rules

- Posts are sorted by `createdAt` descending (newest first) before pagination
- Composed posts always appear at the top of the feed, above static posts
- Like count is a derived value: base count from JSON ± store delta; never negative
- Bookmark state is a boolean per post ID; no aggregate count
- The composer never fails silently — empty or oversized content must produce visible validation feedback

---

## Interactions with Other Systems

- **DATA_SYSTEM** provides initial posts array and users map
- **VIEW_SYSTEM** renders PostCard component; FEED_SYSTEM passes post data and event handlers
- Like and bookmark events are emitted from VIEW_SYSTEM post cards and handled by FEED_SYSTEM stores
