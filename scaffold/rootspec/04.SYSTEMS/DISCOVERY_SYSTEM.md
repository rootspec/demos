# Level 4: Discovery System

**References:** L1 Philosophy, L2 Truths, L3 Interactions, SYSTEMS_OVERVIEW.md, DATA_SYSTEM.md

---

## Responsibility

Owns the explore and search surfaces. Explore (`/explore`) presents trending tags, suggested users, and popular posts. Search (`/search`) provides real-time keyword filtering of posts. Both are client-side only — no server queries.

---

## Explore Page

### Sections

1. **Trending Tags** — All tags from DATA_SYSTEM, sorted by `postCount` descending. Each tag is clickable and acts as a filter.
2. **Suggested Users** — All users from DATA_SYSTEM. Shows avatar, display name, handle, bio, and a link to their profile.
3. **Popular Posts** — Posts filtered by the currently active tag (or all posts if no tag selected), sorted by `likeCount` descending.

### Tag Filter State

| Property      | Type          | Description                                      |
|---------------|---------------|--------------------------------------------------|
| `activeTag`   | string | null  | The currently selected tag name, or null         |

- Stored in local component state (not a shared store)
- Clicking a tag sets `activeTag` to that tag name
- Clicking the active tag again sets `activeTag` to null (deselects)
- Clicking a different tag sets `activeTag` to the new tag name
- Post list re-derives from `activeTag` on every render

---

## Search Page

### Behavior

- Single text input bound to a query string
- Results are derived state: posts whose `content` includes the query (case-insensitive), or empty array if query is empty
- Each result shows: author display name (linked to profile), post content (linked to post detail)
- No debounce required at mock data scale
- Empty query → no results shown, no empty-state message
- Non-empty query with no matches → empty-state message shown

### Search Algorithm

```
if query.length === 0: results = []
else: results = posts.filter(p => p.content.toLowerCase().includes(query.toLowerCase()))
```

No tag-based search on this page (tag filtering lives in Explore).

---

## Boundaries

- **Reads from:** DATA_SYSTEM (via route loaders)
- **Owns:** tag filter state (local to Explore page), search query state (local to Search page)
- **Does not:** maintain persistent state, affect other systems
- **Interacts with:** VIEW_SYSTEM (rendered within layout), PROFILE_SYSTEM (user links), FEED_SYSTEM (post links)
