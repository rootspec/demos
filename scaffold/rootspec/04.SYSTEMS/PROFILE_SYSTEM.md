# Profile System

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, DATA_SYSTEM.md

---

## Responsibility

The Profile System manages the visitor's follow/unfollow state — which user IDs they've followed during the current session. It drives the follow button in the profile page UI.

## Boundaries

- **Owns:** `src/lib/stores/profile.svelte.ts`
- **Reads from:** DATA SYSTEM (user records via route load)
- **Does not own:** User data itself, follower counts (those live in DATA SYSTEM and are static), like/bookmark state (FEED SYSTEM)

## State

| State | Type | Default | Description |
|---|---|---|---|
| `followedIds` | `string[]` | `[]` | IDs of users the visitor has followed this session |

All state is in-memory only. Resets on page reload. Follower/following counts shown on profile pages are static from DATA SYSTEM and do not reflect this state.

## Derived Values

- `isFollowing(userId)` — boolean derived from `followedIds`

## Operations

### toggleFollow(userId)
- If `userId` is in `followedIds`: removes it (unfollow)
- Otherwise: appends it (follow)
- Follow button label switches between "Follow" and "Following" immediately via Svelte reactivity

## Constraints

- No automatic follow on load — visitor starts with zero followed users each session
- Follower counts on profile pages are cosmetic/static; they do not update when the visitor follows/unfollows
- The "current user" (alice.dev) is never shown a follow button on their own profile

## Interactions with Other Systems

| System | Interaction |
|---|---|
| DATA SYSTEM | Profile route `load()` provides user record; PROFILE SYSTEM only tracks the userId from it |
| VIEW SYSTEM | `profile` store imported in profile page component to toggle and read follow state |
