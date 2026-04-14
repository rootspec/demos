# DISCOVERY_SYSTEM

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md, DATA_SYSTEM.md

---

## Responsibility

Owns the explore and search surfaces. Manages tag filtering state on the explore page and reactive keyword search on the search page.

---

## State Owned

### Explore Page State

| State | Type | Description |
|-------|------|-------------|
| activeTag | string or null | Currently selected tag filter; null means show all |

### Search Page State

| State | Type | Description |
|-------|------|-------------|
| searchQuery | string | Current text in the search input |

All state is component-local and ephemeral.

---

## Rules

### Explore Page

- Renders trending tags, suggested users, and a filterable post list
- Tags are rendered from `tags.json`, sorted by `postCount` descending (highest first)
- Suggested users are rendered from `users[]` (all users shown as suggestions)
- Post list shows all posts by default; filters to matching posts when a tag is active
- Tag matching: post must include the tag name in its `tags[]` array
- Clicking an active tag deselects it (sets `activeTag` to null)
- Clicking a different tag switches the active filter

### Search Page

- Search input filters posts reactively as `searchQuery` changes
- Matching: case-insensitive substring match on `post.content`
- No results shown when `searchQuery` is empty
- Empty state message shown when query is non-empty but yields no matches
- Each result shows author name, handle, and post content with link to post detail

---

## Data Consumed

- `tags[]` from DATA_SYSTEM — tag list for explore
- `users[]` from DATA_SYSTEM — user suggestions for explore and author resolution for search results
- `posts[]` from DATA_SYSTEM — post list for tag filtering and keyword search

---

## Routes

- `/explore` — trending tags, suggested users, filterable posts
- `/search` — keyword search across posts

---

## Interactions with Other Systems

- Explore page links to PROFILE_SYSTEM routes via user handles in suggested users list
- Search results link to FEED_SYSTEM post detail routes
- Does not manage like/bookmark state or follow state

---

## Rendered Elements (Key)

### Explore

- Tag chips: `#tagname (postCount)` — clickable, active tag has distinct style
- User suggestion cards: avatar, display name, handle, bio, link to profile
- Post list: filtered post cards with author and content, link to post detail
- Clear filter affordance when a tag is active

### Search

- Search input with placeholder text
- Reactive post results list
- Empty state message: "No results for '[query]'"
