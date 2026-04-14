# Level 4: Systems Overview
<!-- L4: Implementation architecture — References L1-3 + Sibling L4 + External -->

## System Map

RootFeed is composed of five systems. Each owns a distinct domain and communicates with others through well-defined boundaries.

| System | Responsibility | Key Files |
|--------|---------------|-----------|
| **DATA_SYSTEM** | Static mock data loading and routing | `src/lib/data/*.json`, `+page.ts` load functions |
| **FEED_SYSTEM** | Home feed state, post composition, pagination, likes, bookmarks | `src/lib/stores/feed.svelte.ts`, `src/routes/+page.svelte` |
| **PROFILE_SYSTEM** | User profile display and follow state | `src/lib/stores/profile.svelte.ts`, `src/routes/profile/[handle]/+page.svelte` |
| **DISCOVERY_SYSTEM** | Search, tag filtering, and explore surface | `src/routes/search/+page.svelte`, `src/routes/explore/+page.svelte` |
| **THEME_SYSTEM** | Dark/light mode detection, toggling, and persistence | `src/lib/stores/theme.svelte.ts` |
| **VIEW_SYSTEM** | Shared UI components, navigation, meta banner, footer | `src/lib/components/`, `src/routes/+layout.svelte` |

## System Interactions

| From | To | Nature of Dependency |
|------|----|---------------------|
| FEED_SYSTEM | DATA_SYSTEM | Reads post and user data loaded by page load functions |
| PROFILE_SYSTEM | DATA_SYSTEM | Reads user and post data for a given handle |
| DISCOVERY_SYSTEM | DATA_SYSTEM | Reads all posts, users, and tags for filtering/searching |
| VIEW_SYSTEM | FEED_SYSTEM | Renders PostCard and Composer; consumes feed store |
| VIEW_SYSTEM | PROFILE_SYSTEM | Renders profile page; consumes profile store |
| VIEW_SYSTEM | THEME_SYSTEM | Applies dark class to root element; binds toggle |
| FEED_SYSTEM | — | No dependency on PROFILE_SYSTEM or DISCOVERY_SYSTEM |
| THEME_SYSTEM | — | No dependency on data or content systems |

## Data Flow

```
JSON files (static)
    └── DATA_SYSTEM (SvelteKit load functions)
            ├── FEED_SYSTEM (FeedState store + home route)
            ├── PROFILE_SYSTEM (ProfileState store + profile route)
            └── DISCOVERY_SYSTEM (search + explore routes)

THEME_SYSTEM (localStorage + system preference)
    └── VIEW_SYSTEM (layout + nav + all pages)
```

## Shared State Model

- **FeedState** (`feed.svelte.ts`): Svelte 5 reactive class. Owns liked IDs, bookmarked IDs, and user-composed posts. Shared across all pages via module-level singleton.
- **ProfileState** (`profile.svelte.ts`): Svelte 5 reactive class. Owns followed user IDs. Shared across all pages.
- **ThemeState** (`theme.svelte.ts`): Svelte 5 reactive object. Owns current theme value. Reads/writes localStorage. Initializes from system preference.

## Deployment Constraint

All internal links and asset paths must include the SvelteKit base path (`/demos/scaffold`). Components use `{base}` from `$app/paths`. Static adapter builds to `build/` directory for GitHub Pages deployment.
