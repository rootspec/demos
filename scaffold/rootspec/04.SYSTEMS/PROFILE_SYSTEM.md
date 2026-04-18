# PROFILE_SYSTEM

**Level:** 4 — Systems
**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md, DATA_SYSTEM.md

---

## Responsibility

PROFILE_SYSTEM owns the user profile display and the follow/unfollow interaction. It surfaces one user's identity and their posts, and it manages whether the current viewer is "following" that user.

---

## State

PROFILE_SYSTEM manages the following reactive state:

| State Key      | Type                  | Initial Value                          | Mutation                              |
|----------------|-----------------------|----------------------------------------|---------------------------------------|
| followedHandles | Set\<string\>        | Empty (no users followed on load)      | Toggle on follow/unfollow button      |
| followerCounts  | Map\<string, number\>| User.followerCount values from mock data | Increment/decrement on follow toggle |

State is component-local. Following a user on the profile page and then navigating away does not persist the follow state unless the stores are shared at the application level across routes.

---

## Profile Display

The profile page renders:
- Author avatar
- Display name
- Handle (with `@` prefix)
- Bio
- Follower count (mutable: reflects follow/unfollow actions by the current viewer)
- Following count (display only — does not change based on viewer actions)
- Follow / Unfollow button

Below the identity block:
- All posts by this user, in reverse-chronological order
- Each post is rendered with the same display rules as FEED_SYSTEM posts (content, timestamp, like count, like button, bookmark button, link to thread)

---

## Follow / Unfollow Rules

**Follow:**
- Add user handle to followedHandles
- Increment displayed followerCount by 1
- Change button label from "Follow" to "Unfollow"

**Unfollow:**
- Remove user handle from followedHandles
- Decrement displayed followerCount by 1
- Change button label from "Unfollow" to "Follow"

The Follow/Unfollow button reflects the current follow state at all times. On page load, all users start as "not followed."

---

## Route and Data Dependencies

| Input          | Source                        |
|----------------|-------------------------------|
| User record    | DATA_SYSTEM via `+page.ts` loader (looked up by handle) |
| User's posts   | DATA_SYSTEM via `+page.ts` loader (filtered by authorId) |

The profile route is prerendered for all known handles. Unknown handles produce a 404 at the hosting layer — PROFILE_SYSTEM does not model a "not found" state in the application.

---

## Interactions with Other Systems

| System          | Relationship                                                      |
|-----------------|-------------------------------------------------------------------|
| DATA_SYSTEM     | Receives user and posts from page loader                          |
| VIEW_SYSTEM     | Renders output into the main content area; receives user actions  |
| FEED_SYSTEM     | No direct interaction; like/bookmark on profile posts may share store state if implemented at app level |
