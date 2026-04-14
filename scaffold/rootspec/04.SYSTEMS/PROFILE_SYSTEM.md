# PROFILE_SYSTEM

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md, DATA_SYSTEM.md

---

## Responsibility

Owns the user profile view and follow/unfollow interaction state. Renders a user's identity, bio, stats, and post history.

---

## State Owned

| State | Type | Description |
|-------|------|-------------|
| followedUsers | Set\<string\> | User IDs followed this session |

Follow state is component-local and ephemeral — it resets on page reload.

---

## Rules

### Profile Display
- Profile page is pre-rendered for each user handle in `users.json`
- Displays: avatar, display name, handle, bio, follower count, following count
- Follower count adjusts (increments or decrements by one) based on local follow state

### Follow Toggle
- Initial state: not following (unless additional logic is added)
- Clicking "Follow" adds user ID to `followedUsers`, increments displayed follower count
- Clicking "Unfollow" removes user ID, decrements displayed follower count
- Button label and style reflect current follow state

### Posts List
- Shows all posts by this user (from `posts.json` filtered by `authorId === user.id`)
- Displayed in reverse-chronological order
- Each post links to its post detail page

---

## Data Consumed

- `users[]` from DATA_SYSTEM — to find the profile user by handle
- `posts[]` from DATA_SYSTEM — to filter posts by this user's ID

---

## Route

- `/profile/[handle]` — pre-rendered for each handle in `users.json`
- Page loader receives `handle` param and finds matching user; if no match, renders fallback (though this case should not occur for known handles)

---

## Interactions with Other Systems

- Profile page links back to post detail routes (FEED_SYSTEM post cards)
- Does not manage like/bookmark state — those belong to FEED_SYSTEM
- Does not communicate with DISCOVERY_SYSTEM directly

---

## Rendered Elements (Key)

- Avatar image
- Display name (large, prominent)
- Handle (subdued, @prefixed)
- Bio text
- Follower count / Following count
- Follow / Unfollow button with live count update
- Post list with link-to-detail for each post
