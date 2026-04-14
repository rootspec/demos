# View System

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, DATA_SYSTEM.md, FEED_SYSTEM.md, PROFILE_SYSTEM.md, DISCOVERY_SYSTEM.md, THEME_SYSTEM.md

---

## Responsibility

The View System owns the complete UI layer: all SvelteKit routes, shared components, and the navigation layout. It reads state from all other systems and renders it. It also fires mutations back to FEED SYSTEM, PROFILE SYSTEM, and THEME SYSTEM in response to user interactions.

## Boundaries

- **Owns:** `src/routes/**`, `src/lib/components/**`, `src/routes/+layout.svelte`
- **Reads from:** All systems (data, feed state, profile state, discovery state, theme)
- **Does not own:** Any persistent state — that lives in the respective systems

## Routes

| Route | File | Data Source | Systems Used |
|---|---|---|---|
| `/` | `+page.svelte` + `+page.ts` | posts.json, users.json | FEED SYSTEM (likes, bookmarks, userPosts) |
| `/post/[id]` | `+page.svelte` + `+page.ts` | posts.json, users.json | FEED SYSTEM (likes on post detail) |
| `/profile/[handle]` | `+page.svelte` + `+page.ts` | users.json, posts.json | PROFILE SYSTEM (follow state) |
| `/search` | `+page.svelte` + `+page.ts` | posts.json, users.json | DISCOVERY SYSTEM (search query/results) |
| `/explore` | `+page.svelte` + `+page.ts` | tags.json, users.json | DISCOVERY SYSTEM (tag filter), PROFILE SYSTEM (follow on user cards) |

## Shared Components

### `PostCard.svelte`
- Props: `post: Post`, `author: User | undefined`
- Renders: avatar, author name+handle, relative timestamp, content, like button, repost count, bookmark button
- Local state: `liked` (boolean), `bookmarked` (boolean) — NOT connected to FEED SYSTEM store
- `data-test` attributes: `post-card`, `post-author`, `post-timestamp`, `post-content`, `like-button`, `like-count`, `repost-count`, `bookmark-button`

### `Composer.svelte`
- Props: none (reads from FEED SYSTEM directly)
- Renders: textarea, character counter, submit button, error message
- Calls `feed.addPost(content)` on submit
- `data-test` attributes: `composer`, `composer-input`, `composer-submit`, `composer-error`

### `MetaBanner.svelte`
- Props: none
- Renders: explanatory text + links to seed, spec, scaffold commit
- Always visible; never dismissable
- `data-test` attributes: `meta-banner`, `seed-link`, `spec-link`, `scaffold-link`

## Layout

`+layout.svelte` wraps all routes with:
- Persistent nav: RootFeed logo, Home/Explore/Search links, RootSpec version badge, theme toggle
- MetaBanner (rendered above main content, below nav)
- `<main>` wrapper with max-width constraint
- Dark mode class applied to `html` element via THEME SYSTEM

## Navigation `data-test` attributes

- `nav` — navigation bar container
- `nav-home`, `nav-explore`, `nav-search` — nav links
- `theme-toggle` — theme toggle button

## Base Path

All internal links must use `{base}` from `$app/paths` to resolve correctly at `/demos/scaffold/` subpath on GitHub Pages. Components that link to routes (PostCard, layout nav) must prefix with `{base}`.

## Interactions with Other Systems

| System | Interaction |
|---|---|
| FEED SYSTEM | Reads `feed.likedIds`, `feed.bookmarkedIds`, `feed.userPosts`; calls `feed.toggleLike`, `feed.toggleBookmark`, `feed.addPost` |
| PROFILE SYSTEM | Reads `profile.isFollowing(id)`; calls `profile.toggleFollow(id)` |
| DISCOVERY SYSTEM | Renders search input and tag filter; derived results computed in page component |
| THEME SYSTEM | Reads `theme.current`; calls `toggleTheme()`; `initTheme()` called in layout `onMount` |
| DATA SYSTEM | Receives data via SvelteKit `load()` functions as component props |
