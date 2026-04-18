# DISCOVERY_SYSTEM

**Level:** 4 — Systems
**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md, DATA_SYSTEM.md

---

## Responsibility

DISCOVERY_SYSTEM owns two surfaces: the Search page and the Explore page. Search enables real-time keyword filtering of posts. Explore surfaces trending tags, suggested users, and popular posts from the mock dataset. Both surfaces operate entirely in-memory with no external search index.

---

## Search

### State

| State Key    | Type     | Initial Value | Mutation                                |
|--------------|----------|---------------|-----------------------------------------|
| searchQuery  | string   | ""            | Updated on every keystroke in input     |
| searchResults | Post[]  | []            | Derived from searchQuery + all posts    |

### Filtering Rules

- Results are computed as a derived/reactive value from `searchQuery` and the full posts array
- A post matches if its `content` field contains the query string (case-insensitive substring match)
- Empty query → empty results (not "all posts")
- Results are rendered in the order they appear in the posts array (reverse-chronological)

### Display

Each search result renders:
- Author display name (links to profile)
- Author handle
- Post content with query match visible (no highlighting required in the basic implementation)
- Link to full post thread

When query is non-empty and results are empty, show: `No results for "[query]"`

---

## Explore

### Tag Filtering State

| State Key     | Type          | Initial Value | Mutation                               |
|---------------|---------------|---------------|----------------------------------------|
| activeTag     | string or null | null         | Set on tag chip click; cleared on re-click or new tag |
| filteredPosts | Post[]        | All posts     | Derived from activeTag                 |

### Tag Filtering Rules

- All tags from DATA_SYSTEM are displayed as clickable chips
- Clicking a tag sets it as `activeTag` and filters the visible post list to posts that include that tag
- Clicking the active tag again clears `activeTag` and returns to showing all posts
- Only one tag can be active at a time
- The active tag chip is visually distinguished from inactive tags

### Suggested Users

- All users from DATA_SYSTEM are displayed on the explore page
- Each user shows: avatar, display name, handle, bio, and a Follow button
- The Follow button reflects and mutates the same follow state as PROFILE_SYSTEM
- Users are displayed in a fixed order (as they appear in the users data)

### Popular Posts

- Posts are sorted by `likeCount` descending to surface the most-liked content
- Only a [top N] subset of posts is shown on the explore page
- Each post links to its full thread view

---

## Interactions with Other Systems

| System          | Relationship                                                         |
|-----------------|----------------------------------------------------------------------|
| DATA_SYSTEM     | Receives all posts, users, and tags from page loader                 |
| VIEW_SYSTEM     | Renders output into the main content area; receives user actions     |
| PROFILE_SYSTEM  | Shares follow state if implemented with application-level stores     |
