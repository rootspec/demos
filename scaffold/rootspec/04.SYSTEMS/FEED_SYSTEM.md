# FEED_SYSTEM

**References:** L1 (Philosophy), L2 (Truths), L3 (Interactions), L4 sibling: DATA_SYSTEM, INTERACTION_SYSTEM

---

## Responsibility

FEED_SYSTEM owns the home feed experience at `/`. It renders the chronological post timeline, manages pagination (load more), and hosts the post composer. It is the primary surface where users encounter the product.

---

## State Owned

- **Visible post count** — starts at [initial_page_size]; increments by [page_increment] on "Load More"
- No data is owned — FEED_SYSTEM reads from DATA_SYSTEM and INTERACTION_SYSTEM

---

## Behavior

### Timeline Rendering

Posts are displayed in reverse-chronological order. Each post card shows:
- Author avatar (from DATA_SYSTEM)
- Author display name (linked to profile)
- Author handle
- Post content
- Timestamp (relative or formatted)
- Like count (from INTERACTION_SYSTEM, reflects toggles)
- Repost count (from DATA_SYSTEM, read-only)
- Like button (toggles via INTERACTION_SYSTEM)
- Bookmark button (toggles via INTERACTION_SYSTEM)

### Pagination

- Initial render: first [initial_page_size] posts
- "Load More" button: appends next [page_increment] posts
- When all posts shown: "Load More" hidden; "All caught up" message shown

### Post Composer

Located above the post list. Contains:
- Textarea for post content
- Character count indicator
- Submit button (disabled when textarea is empty or at max length)

On submission:
- New post prepended to visible list
- Timestamp set to current client time
- Author set to first user in mock data (placeholder "logged-in" user)
- Textarea cleared

---

## Boundaries

**FEED_SYSTEM owns:**
- `/` route component (`src/routes/+page.svelte` and `+page.ts`)
- Post card component (shared with PROFILE_SYSTEM if extracted)
- Pagination state
- Composer state (textarea value, submission handler)

**FEED_SYSTEM does NOT own:**
- Like/bookmark state — owned by INTERACTION_SYSTEM
- User data — owned by DATA_SYSTEM
- Post data persistence — no persistence exists

---

## Interactions with Other Systems

| System | Interaction |
|--------|-------------|
| DATA_SYSTEM | Receives posts array and users array at load time |
| INTERACTION_SYSTEM | Reads like/bookmark state; dispatches like/bookmark/compose actions |
| VIEW_SYSTEM | Rendered within the main layout |
