# DISCOVERY_SYSTEM

**Responsibility:** Explore page (trending tags, suggested people, popular posts with tag filtering) and search page (live keyword search).

**Depends on:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, DATA_SYSTEM

---

## Routes Owned

| Route | File | Purpose |
|---|---|---|
| `/explore` | `src/routes/explore/+page.svelte` | Trending tags, suggested people, popular posts with tag filter |
| `/search` | `src/routes/search/+page.svelte` | Live keyword search across post content |

---

## State Managed

| State | Type | Default | Description |
|---|---|---|---|
| `activeTag` | `string \| null` | `null` | Currently selected tag filter on explore page |
| `searchQuery` | `string` | `''` | Current search input value |

---

## Responsibilities

### Explore (`/explore`)
1. **Trending tags:** Display all tags from `tags.json` as clickable tag chips showing name and post count.
2. **Tag filter:** Clicking a tag sets `activeTag`; posts section shows only posts containing that tag; clicking same tag deselects (returns to all posts); selected tag is visually highlighted.
3. **Suggested people:** List all users with display name, handle, bio, linking to `/profile/[handle]`.
4. **Popular posts section:** Shows posts filtered by active tag (or all posts sorted by like count if no tag selected).
5. **Empty tag state:** If a tag has no matching posts, show "No posts tagged #[tag]".

### Search (`/search`)
1. **Search input:** Text input, placeholder "Search posts..."; results update on every keystroke.
2. **Live filtering:** Case-insensitive substring match against `post.content` for all posts.
3. **Empty state:** No results shown when query is empty.
4. **No results:** Show "No results for '[query]'" when query has no matches.
5. **Result display:** Each result shows author display name (linked to profile), post content (linked to post detail).

---

## Boundaries

- Does NOT manage like/bookmark state — those live in FEED_SYSTEM.
- Does NOT manage follow state — that lives in PROFILE_SYSTEM.
- Search matches post content only (not handles, display names, or tags).

---

## Interactions with Other Systems

| System | Interaction |
|---|---|
| DATA_SYSTEM | Receives tags, users, and posts via SvelteKit `data` prop |
| VIEW_SYSTEM | Renders within the shared layout |
| FEED_SYSTEM | Post results link to `/post/[id]` (FEED_SYSTEM route) |
| PROFILE_SYSTEM | User cards and author links point to `/profile/[handle]` (PROFILE_SYSTEM route) |
