# PROFILE_SYSTEM

**Responsibility:** User profile page rendering and follow/unfollow client-side state.

**Depends on:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, DATA_SYSTEM

---

## Routes Owned

| Route | File | Purpose |
|---|---|---|
| `/profile/[handle]` | `src/routes/profile/[handle]/+page.svelte` | User profile with bio, stats, posts, follow button |

---

## State Managed

| State | Type | Default | Description |
|---|---|---|---|
| `isFollowing` | `boolean` | `false` | Whether the current visitor is following this user |

---

## Responsibilities

1. **Render profile header:** Display name, handle, avatar, bio, follower count, following count.
2. **Follow/unfollow button:** Toggles `isFollowing` on click; button label reflects state ("Follow" / "Unfollow"); follower count does NOT change in the mock data (client-side state only).
3. **Render user posts:** List of posts by this user, each linking to `/post/[id]`, showing content, like count, repost count.
4. **Prerender entries:** Export `entries()` returning all handles from `users.json`.

---

## Boundaries

- Does NOT modify follower/following counts in the data — follow is purely a UI state toggle.
- Does NOT show a "not found" page — unknown handles produce no static page; this is acceptable per TRUTHS.md.

---

## Interactions with Other Systems

| System | Interaction |
|---|---|
| DATA_SYSTEM | Receives user object and filtered posts array via SvelteKit `data` prop |
| VIEW_SYSTEM | Renders within the shared layout |
| FEED_SYSTEM | Posts on profile link to `/post/[id]` (FEED_SYSTEM route) |
