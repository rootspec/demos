# System: DISCOVERY_SYSTEM
<!-- L4: References L1-3 + Sibling L4 + External -->

## Responsibility

Powers the search and explore surfaces. Enables users to find posts by keyword, filter by tag, browse trending tags, and discover users. All filtering is computed client-side from the full mock dataset loaded at page init.

## State Owned

Discovery state is component-local (not in a shared store):

| State | Scope | Description |
|-------|-------|-------------|
| `query` | Search page | Current search query string |
| `activeTag` | Explore page | Currently selected tag filter (null or string) |

## Derived Values

- `results` — posts where `content.toLowerCase().includes(query.toLowerCase())` when query is non-empty
- `filteredPosts` — on explore page, posts filtered by `tags.includes(activeTag)` when a tag is active

## Behaviors

### Keyword Search (`/search`)
A text input binds to `query`. As the user types, `results` recomputes reactively. Results show matching posts with author name and a link to the post detail. No minimum query length required. Empty query shows no results (not the full set). "No results" message shown when query is non-empty but `results` is empty.

### Tag Filter (Explore and Search)
Tags appear as clickable chips. Clicking a tag sets `activeTag`. Clicking the active tag again clears it (returns to unfiltered). Only one tag active at a time.

### Explore Surface (`/explore`)
The explore page shows three sections:
1. **Trending Tags** — all tags from `data.tags`, displayed as clickable chips with post count
2. **Suggested Users** — all users from `data.users`, showing display name, handle, bio, and a profile link
3. **Popular Posts** — posts from `data.posts`, optionally filtered by `activeTag` when one is selected

### Post Thread Navigation
Post detail page (`/post/[id]`) is handled by a separate route but uses the same data pattern:
- Loads the target post by id
- Loads parent post if `parentId` is not null
- Loads all replies (posts where `parentId === post.id`)

## Boundaries

**Reads from:**
- DATA_SYSTEM: `data.posts`, `data.users`, `data.tags` (via search/explore load functions)

**Does not:**
- Manage like/bookmark state (owned by FEED_SYSTEM)
- Manage follow state (owned by PROFILE_SYSTEM)
- Persist search history or tag selections

## Key Files

- `src/routes/search/+page.svelte` — Search route
- `src/routes/search/+page.ts` — Search load function
- `src/routes/explore/+page.svelte` — Explore route
- `src/routes/explore/+page.ts` — Explore load function
- `src/routes/post/[id]/+page.svelte` — Post detail route
- `src/routes/post/[id]/+page.ts` — Post detail load function
