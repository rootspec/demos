# Level 4: Search System

**Responsibility:** Real-time content search across all posts by keyword (`/search`).

---

## Boundaries

- **Owns:** Search query state, result filtering logic, search result display
- **Does not own:** Post data (shared from posts.json), user data (shared from users.json), any persistent search history
- **Route:** `/search`

---

## Data Ownership

### Search State (client-side, in-memory)
- `query: string` — the current search input value (reactive, drives filtering)
- `results: Post[]` — derived from filtering all posts by query (no separate state — computed)

---

## Rules

### Query Behavior
- Search input is a plain text field
- There is no debounce — filtering runs on every keystroke (data is local, no network call)
- Query matching is case-insensitive
- The query is matched against `post.content` only — not tags, author names, or handles

### Result Construction
- If `query.length === 0`: no results are shown (empty state — not "all posts")
- If `query.length > 0`: results are all posts where `post.content.toLowerCase().includes(query.toLowerCase())`
- Results are shown in the order they appear in `posts.json` (no relevance ranking)
- Each result shows: author display name (linked to profile), post content (linked to post detail)
- Engagement counts are not shown on search results

### Empty States
- No query → no results displayed, no empty state message
- Query with no matches → "No results for [query]" message is shown

---

## State Transitions

```
Search State:
  empty_query → (type characters) → active_query
  active_query → (clear input) → empty_query
  active_query → (results found) → results_displayed
  active_query → (no results found) → empty_state_shown
```

---

## System Interactions

- **→ PROFILE_SYSTEM:** Author name on each result links to `/profile/[handle]`
- **→ THREAD_SYSTEM:** Post content on each result links to `/post/[id]`
- **← SYSTEMS_OVERVIEW:** Reads from shared `posts.json` and `users.json`
