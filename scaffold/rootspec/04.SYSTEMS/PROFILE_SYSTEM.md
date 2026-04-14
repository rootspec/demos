# Level 4: Profile System

**Responsibility:** User profile display, follow/unfollow state management, and routing to individual user pages (`/profile/[handle]`).

---

## Boundaries

- **Owns:** Follow/unfollow state, user profile page layout, user's post list on their profile
- **Does not own:** Post content (FEED_SYSTEM owns post cards), post threads (THREAD_SYSTEM), explore user suggestions (DISCOVERY_SYSTEM)
- **Route:** `/profile/[handle]`

---

## Data Ownership

### User Entity (from users.json)
- `id` — unique user identifier
- `handle` — URL-safe username (used in route parameter)
- `displayName` — human-readable display name
- `bio` — short user bio string
- `avatar` — URL to avatar image (DiceBear placeholder URL)
- `followerCount` — baseline follower count from data file
- `followingCount` — baseline following count from data file

### ProfileState (client-side, in-memory)
- `followedIds: string[]` — user IDs that the current session has followed

---

## Rules

### Profile Loading
- The route `/profile/[handle]` loads the user by matching `handle` to `users.json`
- If no user matches, the page renders a "User not found" message
- The profile page loads all posts where `authorId === user.id` and displays them in reverse-chronological order

### Follow Behavior
- If the user being viewed is NOT in `followedIds`, a "Follow" button is shown
- If the user is in `followedIds`, an "Unfollow" button is shown
- Clicking Follow/Unfollow toggles the ID in `followedIds` immediately
- Displayed follower/following counts are the static values from `users.json` — they do NOT update when follow state changes
- The current session's "logged in" identity is always the first user (`u1`, Alice Chen) — there is no auth system

### User Post List
- Posts by this user are shown in reverse-chronological order
- Each post links to its detail page via `/post/[id]`
- Engagement counts (likes, reposts) are shown as static values from data

---

## State Transitions

```
Follow State (per userId):
  not_following → (click Follow) → following
  following → (click Unfollow) → not_following
```

---

## System Interactions

- **→ THREAD_SYSTEM:** Each post on the profile page links to `/post/[id]`
- **← DISCOVERY_SYSTEM:** ProfileState's `followedIds` is shared — the explore page also provides follow/unfollow buttons that mutate the same state
- **← SYSTEMS_OVERVIEW:** Reads from shared `users.json` and `posts.json`
