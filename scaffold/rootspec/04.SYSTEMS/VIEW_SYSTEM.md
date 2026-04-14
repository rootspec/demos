# System: VIEW_SYSTEM
<!-- L4: References L1-3 + Sibling L4 + External -->

## Responsibility

Owns all shared UI components, the application layout, the navigation bar, the meta banner, and the footer. Renders content provided by other systems. Enforces visual consistency across all pages.

## Components Owned

| Component | File | Purpose |
|-----------|------|---------|
| `PostCard` | `src/lib/components/PostCard.svelte` | Renders a single post with author, timestamp, content, and engagement actions |
| `Composer` | `src/lib/components/Composer.svelte` | Post composition textarea with character counter and submit button |
| `MetaBanner` | `src/lib/components/MetaBanner.svelte` | Persistent demo context banner with links to seed, spec, and scaffold commit |
| Layout | `src/routes/+layout.svelte` | Navigation bar, theme initialization, page wrapper, footer |

## Layout Structure

Every page renders inside the layout which provides:
- **Navigation bar**: RootFeed logo (home link), Home/Explore/Search nav links, RootSpec version badge, theme toggle button
- **Meta banner**: Always visible, not dismissable
- **Main content area**: `max-w-2xl` centered, with page-level padding
- **Footer**: RootSpec version, build date, "Built by RootSpec" attribution, link to rootspec/rootspec on GitHub

## PostCard Behavior

PostCard receives `post` and `author` props. It:
- Renders the author avatar, display name (linked to profile), handle, and relative timestamp
- Renders post content (linked to post detail page)
- Renders a like button (heart icon, toggles local `liked` state, shows adjusted count)
- Renders a bookmark button (bookmark icon, toggles local `bookmarked` state)
- Renders repost count as read-only text
- Applies dark mode classes throughout
- Uses `data-test` attributes for all interactive and observable elements

Note: PostCard owns its own local like/bookmark state. The FEED_SYSTEM's FeedState store also tracks this for cross-page consistency. These are currently separate — PostCard's local state is the source of truth for visual rendering.

## Composer Behavior

Composer renders a textarea with placeholder "What's on your mind?", a character counter, and a "Post" submit button. On submit it calls `feed.addPost(content)` from FEED_SYSTEM. Empty submission shows an inline error message.

## Meta Banner

Always present at the top of the layout (above page content). Contains:
- Explanatory text about the demo origin
- "View the seed" link → SEED.md on GitHub
- "View the spec" link → rootspec/ directory on GitHub
- "View the scaffold commit" link → specific commit on GitHub

## Base Path Requirement

All internal links use `{base}` from `$app/paths` to resolve correctly under the `/demos/scaffold/` subpath deployment. External links are absolute URLs.

## Dark Mode

All components use Tailwind's dark mode variant classes (`dark:bg-*`, `dark:text-*`, `dark:border-*`). The `dark` class is toggled on `<html>` by THEME_SYSTEM.

## Boundaries

**Uses:**
- FEED_SYSTEM: `feed` store for like/bookmark/compose operations
- THEME_SYSTEM: `theme` state, `toggleTheme()`, `initTheme()` functions

**Does not:**
- Own any data or business logic
- Handle routing
- Manage follow state (PROFILE_SYSTEM) or search state (DISCOVERY_SYSTEM)

## Key Files

- `src/routes/+layout.svelte` — Root layout
- `src/routes/+layout.ts` — Layout load function (if any)
- `src/lib/components/PostCard.svelte`
- `src/lib/components/Composer.svelte`
- `src/lib/components/MetaBanner.svelte`
- `src/app.css` — Global styles and Tailwind base
