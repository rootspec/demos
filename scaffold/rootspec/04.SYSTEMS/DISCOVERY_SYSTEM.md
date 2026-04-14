# Discovery System

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, DATA_SYSTEM.md

---

## Responsibility

The Discovery System owns the explore and search surfaces — the two routes that help users find content they're not already looking at. It manages tag-based filtering (on Explore) and keyword search (on Search). Both are implemented as client-side derived state with no server round-trips.

## Boundaries

- **Owns:** `src/routes/explore/+page.ts` (load function), `src/routes/explore/+page.svelte` (tag filter state), `src/routes/search/+page.svelte` (search derived state)
- **Reads from:** DATA SYSTEM (tags, posts, users)
- **Does not own:** Like/bookmark state (FEED SYSTEM), follow state (PROFILE SYSTEM)

## State

### Explore Page
| State | Type | Description |
|---|---|---|
| `selectedTag` | `string \| null` | Currently selected tag for filtering; null means no filter active |

### Search Page
| State | Type | Description |
|---|---|---|
| `query` | `string` | Live search query string; bound to text input |
| `results` | Derived `Post[]` | Posts whose content matches `query` (case-insensitive includes) |

## Operations

### Tag filtering (Explore)
- User clicks a tag chip → sets `selectedTag` to that tag's name
- If `selectedTag` is already that tag → clears selection (toggle behavior)
- Posts section shows only posts whose `tags` array includes `selectedTag`; if null, shows all popular posts

### Keyword search (Search)
- Input is reactive — results update on every keystroke
- Filter logic: `post.content.toLowerCase().includes(query.toLowerCase())`
- Empty query (`query.length === 0`) → no results shown (not an error state)
- Non-empty query with no matches → "No results for [query]" message shown

## Explore Page Data

The Explore `load()` function returns:
- `tags` — all tags sorted by `postCount` descending
- `users` — all users (for the "People" / suggested users section)

Popular posts (for post listing under tags) are sourced from DATA SYSTEM and filtered in the component.

## Interactions with Other Systems

| System | Interaction |
|---|---|
| DATA SYSTEM | Explore `load()` reads tags.json and users.json; Search page receives posts and users from DATA SYSTEM via route load |
| VIEW SYSTEM | Both explore and search page components render state from this system; tag/search interactions fire state mutations here |
