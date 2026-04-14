# System: PROFILE_SYSTEM
<!-- L4: References L1-3 + Sibling L4 + External -->

## Responsibility

Manages user profile display and follow state. When a visitor navigates to a user profile, this system renders the user's bio, stats, and posts, and manages the client-side follow/unfollow toggle.

## State Owned

All state lives in `src/lib/stores/profile.svelte.ts` as a Svelte 5 reactive class (`ProfileState`):

| State | Type | Description |
|-------|------|-------------|
| `followedIds` | `string[]` | IDs of users the current session user follows (session only) |

## Derived Values

- `isFollowing(id)` — returns true if the user ID is in `followedIds`
- Follow button label: "Follow" or "Following" based on `isFollowing`

## Behaviors

### Profile Display
The profile page (`/profile/[handle]`) renders:
- User display name (large, heading)
- Handle (@handle, subdued)
- Bio text
- Follower and following counts (from mock data, static)
- Follow/unfollow button

### Post List
All posts authored by the profile user are listed below the bio section in reverse chronological order. Each post links to its detail page.

### Follow Toggle
Clicking "Follow" adds the user's ID to `followedIds` and updates the button to "Following" with a different visual style. Clicking "Following" removes the ID and reverts the button. The follower count displayed does not change (it is read from static mock data).

### Not Found
If the handle in the URL does not match any user in the data, a "User not found" message is displayed.

## Boundaries

**Reads from:**
- DATA_SYSTEM: `data.user`, `data.posts` (via profile page load function)

**Does not:**
- Manage like/bookmark state (owned by FEED_SYSTEM)
- Handle search or explore (owned by DISCOVERY_SYSTEM)
- Persist follow state (session only)

## Key Files

- `src/lib/stores/profile.svelte.ts` — ProfileState class
- `src/routes/profile/[handle]/+page.svelte` — Profile route
- `src/routes/profile/[handle]/+page.ts` — Profile load function
