# Level 4: Profile System

**References:** L1 Philosophy, L2 Truths, L3 Interactions, SYSTEMS_OVERVIEW.md, DATA_SYSTEM.md

---

## Responsibility

Owns the user profile view: displaying a user's identity, stats, and post history. Manages follow/unfollow state via the `ProfileState` store. Each profile is a prerendered static page.

---

## State Ownership: ProfileState

Svelte class-based reactive store (`src/lib/stores/profile.svelte.ts`):

| Property     | Type     | Description                                          |
|-------------|----------|------------------------------------------------------|
| `followedIds`| string[] | User IDs the current session user has followed       |

### Derived State

| Derived          | From                          | Description                                                |
|------------------|-------------------------------|------------------------------------------------------------|
| `isFollowing(id)`| followedIds                   | Whether a given user is currently followed                  |
| Displayed follower count | followedIds + user.followerCount | base + 1 if followed, else base             |

---

## Profile Display Rules

Each profile page (`/profile/[handle]`) shows:
- User avatar
- Display name
- Handle (`@handle`)
- Bio
- Follower count (adjusted for follow state)
- Following count
- Follow/Unfollow button
- List of user's posts (from DATA_SYSTEM, sorted newest first)

---

## Follow/Unfollow Mechanics

- Toggle is immediate; no async operation
- Follow button label: "Follow" when not following, "Unfollow" when following
- Button visual state changes on toggle (style distinction)
- Follower count display = `user.followerCount + (isFollowing ? 1 : 0)`
- State is stored in ProfileState — resets on page reload

---

## Route Generation

Profile pages are prerendered for all users in `users.json`. The route `/profile/[handle]` resolves only for known handles. The `entries()` function in `+page.ts` returns all handles for static prerendering.

---

## Boundaries

- **Reads from:** DATA_SYSTEM (via route loader) — user record and their posts
- **Writes to:** ProfileState store (in-memory follow state)
- **Does not:** affect other users' data, persist follows, or handle authentication
- **Interacts with:** VIEW_SYSTEM (rendered within layout), FEED_SYSTEM (post cards on profile share PostCard component)
