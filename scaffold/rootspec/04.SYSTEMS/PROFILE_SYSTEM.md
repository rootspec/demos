# PROFILE_SYSTEM

**References:** L1 (Philosophy), L2 (Truths), L3 (Interactions), L4 sibling: DATA_SYSTEM, INTERACTION_SYSTEM

---

## Responsibility

PROFILE_SYSTEM owns the user profile experience at `/profile/[handle]`. It renders a user's identity (avatar, display name, handle, bio, social counts) and their post history. It manages the follow/unfollow interaction for that user.

---

## State Owned

PROFILE_SYSTEM does not own persistent state. It reads:
- User data from DATA_SYSTEM
- Follow state from INTERACTION_SYSTEM

---

## Behavior

### Profile Header

Displays for each user:
- Avatar image (from DATA_SYSTEM)
- Display name
- Handle (prefixed with `@`)
- Bio
- Follower count (from INTERACTION_SYSTEM — reflects follow toggles)
- Following count (from DATA_SYSTEM — read-only)
- Follow/Unfollow button

### Follow/Unfollow

- Default state: "Follow" (user is not followed)
- On Follow click: button becomes "Unfollow"; INTERACTION_SYSTEM records follow; follower count shown increments by one
- On Unfollow click: button returns to "Follow"; follow removed; follower count shown decrements by one
- Follow state is reflected consistently wherever this user appears (profile + explore page)

### Post List

Displays all posts authored by this user in reverse-chronological order. Each post shows:
- Post content (linked to thread detail)
- Like count (from INTERACTION_SYSTEM)
- Repost count (from DATA_SYSTEM)

---

## Boundaries

**PROFILE_SYSTEM owns:**
- `/profile/[handle]` route component (`src/routes/profile/[handle]/+page.svelte` and `+page.ts`)
- Prerender entries for all known handles
- Profile header rendering

**PROFILE_SYSTEM does NOT own:**
- Follow state — owned by INTERACTION_SYSTEM
- Post like state — owned by INTERACTION_SYSTEM
- User data or posts data — owned by DATA_SYSTEM

---

## Interactions with Other Systems

| System | Interaction |
|--------|-------------|
| DATA_SYSTEM | Receives single user object and their posts at load time |
| INTERACTION_SYSTEM | Reads follow state; dispatches follow/unfollow actions; reads like state for post list |
| VIEW_SYSTEM | Rendered within the main layout |
| DISCOVERY_SYSTEM | Follow state shared — follows from explore page visible on profile |
