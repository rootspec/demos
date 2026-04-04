# Technical Design

Derived from the RootFeed specification. Regenerated on each `/rs-spec` run.

---

## 1. Technology Stack

> Source: scan-project.sh — detected framework and configuration

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | SvelteKit 2 (Svelte 5) | Rune-based reactivity (`$props()`, `$state()`) |
| Language | TypeScript (strict mode) | `resolveJsonModule`, `moduleResolution: bundler` |
| Styling | Tailwind CSS 3.4 | Utility-first, configured with PostCSS + Autoprefixer |
| Build | Vite 6 | SvelteKit Vite plugin |
| Deployment | Static adapter | Outputs to `build/`, fallback `404.html` |
| Testing | Cypress (E2E) | User stories generate Cypress specs from YAML |

No backend runtime. No database. No auth. All data is mock JSON loaded at build time.

## 2. Architecture Patterns

> Source: 04.SYSTEMS/SYSTEMS_OVERVIEW.md — system boundaries

### Module Structure

```
src/
  lib/
    types.ts              # Shared TypeScript interfaces (User, Post, Tag)
    data/                 # Mock JSON data (users.json, posts.json, tags.json)
    stores/               # Client-side state (Svelte stores or runes)
    components/           # Reusable UI components
  routes/
    +layout.svelte        # Root layout — nav, meta banner, footer
    +page.svelte          # Home feed (FEED_SYSTEM)
    profile/[handle]/     # User profile (PROFILE_SYSTEM)
    post/[id]/            # Post detail + thread (THREAD_SYSTEM)
    search/               # Search (DISCOVERY_SYSTEM)
    explore/              # Explore (DISCOVERY_SYSTEM)
```

### State Management

> Source: 02.TRUTHS.md — client-side simplicity over real infrastructure

- **Mock data** — loaded from JSON via SvelteKit `load()` functions. Shared across pages.
- **Client-side state** — managed with Svelte 5 reactive primitives (`$state()`, `$derived()`). Each system owns its state:
  - FEED_SYSTEM: liked IDs (Set), bookmarked IDs (Set), user-created posts (Array)
  - PROFILE_SYSTEM: followed user IDs (Set)
  - META_SYSTEM: theme preference (string)
- **No persistence** — state resets on page refresh. This is an explicit design choice per L2.

### Data Flow

```
JSON files → load() functions → page props → components → client-side state
```

Data flows one direction. Components receive data via props and manage local interactive state. No global state bus needed — systems are scoped to routes.

## 3. Coding Conventions

> Source: existing codebase patterns

- **File naming**: lowercase with hyphens for components (SvelteKit convention)
- **Component pattern**: `<script lang="ts">` block with `$props()` destructuring, then markup, then optional `<style>`
- **Imports**: `$lib/` alias for `src/lib/`, JSON imports for data
- **Type safety**: strict TypeScript, interfaces in `types.ts`, typed `load()` return values
- **Styling**: Tailwind utility classes inline, no separate CSS files per component
- **Data attributes**: `data-test=` attributes on interactive elements for Cypress targeting

## 4. API Approach

> Source: 04.SYSTEMS/SYSTEMS_OVERVIEW.md — no backend

No API. All data is static JSON loaded at build time via SvelteKit's `load()` functions. The `load()` functions act as the data access layer — filtering, sorting, and joining data before passing to pages.

If this were to evolve into a real app, the `load()` functions would be the natural seam to swap in API calls.

## 5. Data Model

> Source: 04.SYSTEMS/ — system data ownership, src/lib/types.ts

### Entities

| Entity | Owner | Key Fields |
|--------|-------|-----------|
| User | PROFILE_SYSTEM | id, handle, displayName, bio, avatar, followerCount, followingCount |
| Post | FEED_SYSTEM | id, authorId, content, createdAt, likeCount, repostCount, parentId, tags[] |
| Tag | DISCOVERY_SYSTEM | name, postCount |

### Relationships

- Post → User via `authorId` (many-to-one)
- Post → Post via `parentId` (self-referential, nullable — threading)
- Post → Tag via `tags[]` (many-to-many, denormalized)

### Client-Side State (not persisted)

| State | Type | Owner |
|-------|------|-------|
| Liked post IDs | Set\<string\> | FEED_SYSTEM |
| Bookmarked post IDs | Set\<string\> | FEED_SYSTEM |
| User-created posts | Array\<Post\> | FEED_SYSTEM |
| Followed user IDs | Set\<string\> | PROFILE_SYSTEM |
| Theme preference | "light" \| "dark" | META_SYSTEM |

## 6. Testing Strategy

> Source: 05.IMPLEMENTATION/USER_STORIES/ — 12 user stories, 20 acceptance criteria

- **E2E only** — Cypress tests generated from L5 user story YAML files
- **No unit tests** — the app is primarily data display and client-side toggles; E2E covers the meaningful behaviors
- **Test organization**: by phase (MVP), by journey (feed browsing, discovery, meta), by system
- **Test data**: mock JSON is the test fixture — deterministic, no seeding needed
- **`data-test` attributes**: all interactive elements and key content areas get `data-test` attributes for stable Cypress selectors
- **CI**: validation script (`scripts/test.sh`) starts dev server, runs Cypress, stops server
