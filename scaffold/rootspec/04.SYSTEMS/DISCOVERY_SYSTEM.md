# DISCOVERY_SYSTEM

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, DATA_SYSTEM.md

---

## Responsibility

Owns the two discovery surfaces: Search (`/search`) and Explore (`/explore`). Search filters posts by keyword and optional tag. Explore surfaces trending tags, suggested users, and popular posts with interactive tag filtering.

---

## Search

### State
- Query string (reactive, updates results as user types)
- Active tag filter (optional; narrows results further)

### Behavior
- Results appear when query length ≥ [min_query_length] characters
- Filtering is case-insensitive substring match on post content
- Tag filter (if active) applies on top of text query — results must match both
- Tag chips are shown below the search input; clicking one activates/deactivates it
- Only one tag can be active at a time
- "No results" state shown when query is active but no posts match
- Empty query state shows a prompt ("Search for posts…") rather than empty space

### Result Card
Each result shows:
- Author display name (linked to profile)
- Author handle
- Post content
- Post link to detail view

---

## Explore

### Sections
1. **Trending Tags** — All tags sorted by `postCount` descending, displayed as clickable chips
2. **Suggested Users** — All users sorted by `followerCount` descending, displayed as user cards
3. **Popular Posts** — Top [explore_popular_post_count] posts by `likeCount`, with tag filter applied

### State
- Active tag filter (optional; filters the Popular Posts section)

### Tag Filtering
- Clicking a tag chip activates it (visual highlight)
- The Popular Posts section re-renders to show only posts tagged with the active tag
- Clicking an already-active tag deactivates it; all popular posts are shown again
- One active tag at a time

### User Card
Each suggested user shows:
- Avatar
- Display name (linked to profile)
- Handle
- Bio
- Follow / Unfollow button (reflects PROFILE_SYSTEM follow store)

### Popular Post Card
Same PostCard component used in feed — with like/bookmark actions functional.

---

## Rules

- Search filtering is entirely client-side; all posts are loaded once and filtered in memory
- Explore data is static except for the tag filter state (client-side only)
- Tag filter state is not persisted between page navigations — it resets when the user leaves and returns to Explore
- Users are always shown in the Suggested Users section regardless of follow state (follow state is reflected in the button, not by removal from the list)

---

## Interactions with Other Systems

- **DATA_SYSTEM** provides all posts, all users, and tags via load function
- **VIEW_SYSTEM** renders tag chips, user cards, and post cards using shared components
- Follow events from user cards in Explore are handled by PROFILE_SYSTEM's follow store
- Like/bookmark events from post cards in Explore are handled by FEED_SYSTEM's stores
