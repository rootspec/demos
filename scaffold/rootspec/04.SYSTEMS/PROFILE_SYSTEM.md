# PROFILE_SYSTEM

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, DATA_SYSTEM.md

---

## Responsibility

Owns the user profile experience: displaying a user's bio, follower/following counts, and posts, and managing the follow/unfollow toggle state.

---

## State

### Follow Store
- Tracks which user IDs the current user is following (Set)
- Following a user adds their ID to the set; unfollowing removes it
- Displayed follower count on the profile = original `followerCount` + 1 (if following) or original value (if not)
- State is session-only; resets on page reload

---

## Profile Header Component

Renders:
- User avatar
- Display name
- Handle (`@handle` format)
- Bio
- Follower count (reactive to follow store)
- Following count (static)
- Follow / Unfollow button (toggleable, reflects follow store state)

The Follow button reads "Follow" when not following and "Unfollow" when following. Clicking transitions between states immediately.

---

## User Posts Section

- All posts by this user, sorted by `createdAt` descending
- Same PostCard component used in the feed (consistent with VIEW_SYSTEM)
- No pagination on profile — all posts visible at once
- Reply posts are included and show the "Replying to @handle" indicator

---

## Rules

- If a handle in the URL does not match any user in DATA_SYSTEM, render a "User not found" state — not an error page, just a graceful empty state with a link home.
- Follower count is a derived value: base count ± follow store delta; never negative.
- The profile does not show posts the user has liked or bookmarked — only posts they authored.
- Following count does not change when the current user follows/unfollows (it represents other users' behavior).

---

## Interactions with Other Systems

- **DATA_SYSTEM** provides user record and filtered posts via load function
- **VIEW_SYSTEM** renders profile header and post list using shared components
- Follow/unfollow events are emitted from VIEW_SYSTEM and handled by PROFILE_SYSTEM's follow store
