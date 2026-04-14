# Technical Conventions

## Framework
- **Primary Framework:** SvelteKit 2 with Svelte 5 and TypeScript
- **Svelte Version:** Svelte 5 — uses runes (`$state`, `$derived`, `$props`) not legacy stores
- **Adapter:** `@sveltejs/adapter-static` — outputs a static site (no SSR)
- **Styling:** Tailwind CSS v3 with PostCSS and `darkMode: 'class'`
- **Build Tool:** Vite
- **Package Manager:** npm

## Dependencies
- **Core:** svelte@5, @sveltejs/kit, typescript, vite
- **Adapter:** @sveltejs/adapter-static
- **Styling:** tailwindcss, postcss, autoprefixer
- **Testing:** cypress, js-yaml

## File Structure
- **Routes:** `src/routes/` — SvelteKit file-based routing (`+page.svelte`, `+page.ts`, `+layout.svelte`)
- **Components:** `src/lib/components/` — reusable Svelte components
- **Stores:** `src/lib/stores/` — module-level singleton state classes (`.svelte.ts` extension)
- **Types:** `src/lib/types.ts` — shared TypeScript interfaces
- **Data:** `src/lib/data/` — static JSON mock data files

## State Management
- **Global state:** Svelte 5 class-based stores using `$state` in `.svelte.ts` files (e.g., `feed.svelte.ts`, `profile.svelte.ts`, `theme.svelte.ts`)
- **Pattern:** Export a singleton instance (`export const feed = new FeedState()`)
- **Local state:** Use `$state()` rune inside components for component-scoped state
- **Derived state:** Use `$derived()` rune for computed values (e.g., filtered search results)
- **Props:** Use `let { data } = $props()` pattern in page components

## Component Patterns
- **Page load data:** Route data loaded via `+page.ts` `export function load()` returning plain objects
- **Data access in components:** `let { data } = $props()` from the load result
- **Svelte 5 runes only:** Never use `writable`, `readable`, or `derived` from `svelte/store`
- **File naming:** Components are PascalCase `.svelte` files; stores are camelCase `.svelte.ts` files

## Data Patterns
- **Mock data:** Static JSON in `src/lib/data/` — `users.json`, `posts.json`, `tags.json`
- **Data loading:** Import JSON directly in `+page.ts` load functions; cast with `as TypeName[]`
- **No API calls:** All data is local; no fetch, no async in load functions
- **Immutability:** State mutations always create new arrays (spread operator), never mutate in-place

## Routing
- `/` — home feed (`+page.svelte` + `+page.ts`)
- `/explore` — discovery (`explore/+page.svelte` + `explore/+page.ts`)
- `/post/[id]` — post detail (`post/[id]/+page.svelte` + `post/[id]/+page.ts`)
- `/profile/[handle]` — user profile (`profile/[handle]/+page.svelte` + `profile/[handle]/+page.ts`)
- `/search` — search (`search/+page.svelte` — no `+page.ts`, data loaded in component)

## Testing Attributes
- **Test selectors:** `data-test` attributes on all interactive and assertable elements
- **Naming:** kebab-case (e.g., `data-test="post-card"`, `data-test="like-button"`)
- **Required:** Every element referenced in acceptance criteria must have a `data-test` attribute
- **Active state:** Toggled-on elements add `.active` class in addition to `data-test`

## Dark Mode
- **Strategy:** Tailwind `darkMode: 'class'` — toggle `dark` class on `<html>` element
- **Persistence:** `localStorage.setItem('rootfeed-theme', value)` in `theme.svelte.ts`
- **Init:** `initTheme()` called in `+layout.svelte` `onMount` to apply stored/system preference
