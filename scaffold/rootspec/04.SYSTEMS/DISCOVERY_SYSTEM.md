# DISCOVERY_SYSTEM

**References:** L1 (Philosophy), L2 (Truths), L3 (Interactions), L4 sibling: DATA_SYSTEM, INTERACTION_SYSTEM

---

## Responsibility

DISCOVERY_SYSTEM owns two surfaces: the explore page (`/explore`) and the search page (`/search`). Together they form the discovery layer — the ways a user finds content and people beyond the main feed.

---

## State Owned

- **Active tag filter** — which tag (if any) is currently selected on the explore page; defaults to none (show all)
- **Search query** — the current value of the search input; derived results are computed reactively

---

## Behavior

### Explore Page (`/explore`)

Divided into three sections:

#### Trending Tags
- All tags from DATA_SYSTEM, ordered by `postCount` descending
- Each tag displayed as a chip showing `#name` and count
- Click a tag: activates filter; post section below updates to show only matching posts
- Click same tag again: clears filter; all posts shown
- Active tag is visually highlighted

#### Suggested Users
- All users from DATA_SYSTEM
- Each user card shows: avatar, display name, handle, bio, follower count, Follow/Unfollow button
- Follow state from INTERACTION_SYSTEM — consistent with profile page

#### Popular Posts
- When no tag filter: posts ordered by `likeCount` descending
- When tag filter active: posts filtered to that tag, ordered by `likeCount` descending
- Each post card shows author, content, engagement counts, links to thread detail

### Search Page (`/search`)

- Single text input, auto-focused on load
- Filters posts in real time as user types (no debounce, no submit button)
- Matching is case-insensitive substring match on post content
- Empty query: empty results state (no posts shown)
- Non-empty query with no matches: "No results for [query]" message
- Results show post content with author name (linked to profile), link to thread detail

---

## Boundaries

**DISCOVERY_SYSTEM owns:**
- `/explore` route component (`src/routes/explore/+page.svelte` and `+page.ts`)
- `/search` route component (`src/routes/search/+page.svelte` and `+page.ts`)
- Tag filter state (active tag)
- Search query state

**DISCOVERY_SYSTEM does NOT own:**
- Tags data, user data, post data — owned by DATA_SYSTEM
- Follow state — owned by INTERACTION_SYSTEM
- Like state — owned by INTERACTION_SYSTEM

---

## Interactions with Other Systems

| System | Interaction |
|--------|-------------|
| DATA_SYSTEM | Receives tags, users, and all posts at load time for explore; receives all posts and users for search |
| INTERACTION_SYSTEM | Reads/dispatches follow state for suggested users; reads like state for post cards |
| VIEW_SYSTEM | Rendered within the main layout |
