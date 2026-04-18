# INTERACTION_SYSTEM

**References:** L1 (Philosophy), L2 (Truths), L3 (Interactions), L4 sibling: DATA_SYSTEM

---

## Responsibility

INTERACTION_SYSTEM owns all mutable client-side state that results from user actions: likes, bookmarks, follows, and composed posts. It is the single source of truth for "what has the user done in this session." All other systems read from INTERACTION_SYSTEM; none of them own mutable user-action state themselves.

Because this is a demo with no persistence, all state is reset on page reload. This is by design (see L2 trade-offs).

---

## State Owned

- **Liked post IDs** — set of post IDs the user has liked in this session
- **Bookmarked post IDs** — set of post IDs the user has bookmarked in this session
- **Followed user IDs** — set of user IDs the user has followed in this session
- **Composed posts** — array of posts created via the composer in this session

---

## Behavior

### Like Toggle

- If post is not liked: add its ID to liked set; increment displayed like count by one
- If post is liked: remove its ID; decrement displayed like count by one
- Like count shown = `baselikeCount` (from DATA_SYSTEM) ± delta from INTERACTION_SYSTEM

### Bookmark Toggle

- If post is not bookmarked: add its ID to bookmarked set; show filled bookmark icon
- If post is bookmarked: remove its ID; show outline bookmark icon
- No count is associated with bookmarks (bookmarks are private to the session)

### Follow Toggle

- If user is not followed: add their ID to followed set; increment displayed follower count by one
- If user is followed: remove their ID; decrement displayed follower count by one
- Follower count shown = `baseFollowerCount` (from DATA_SYSTEM) ± delta from INTERACTION_SYSTEM
- Follow state is consistent wherever a user appears (profile page, explore page)

### Post Composition

- New post created from textarea content
- Post shape matches DATA_SYSTEM's post type
- `id` generated client-side (e.g., `composed-[timestamp]`)
- `authorId` set to first user in mock data
- `createdAt` set to current client timestamp
- `likeCount`, `repostCount` initialized to 0
- `parentId` set to null (all composed posts are root posts)
- `tags` set to empty array
- Composed posts prepended to FEED_SYSTEM's visible list

---

## Boundaries

**INTERACTION_SYSTEM owns:**
- Svelte stores for all mutable session state (in `src/lib/stores/`)
- Delta computation for displayed counts
- Post composition logic and client-side ID generation

**INTERACTION_SYSTEM does NOT own:**
- Base data (users, posts, tags) — owned by DATA_SYSTEM
- Rendering any UI — all display handled by route components via VIEW_SYSTEM
- Persistence — nothing is stored beyond the current page session

---

## Interactions with Other Systems

| System | Interaction |
|--------|-------------|
| DATA_SYSTEM | Reads baseline counts (likes, followers) to compute display values |
| FEED_SYSTEM | Provides like/bookmark state; receives composed posts |
| PROFILE_SYSTEM | Provides follow state; provides like state for post cards |
| DISCOVERY_SYSTEM | Provides follow state for explore page user cards |
