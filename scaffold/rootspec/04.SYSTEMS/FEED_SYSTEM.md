# FEED_SYSTEM

**Level:** 4 — Systems
**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md, DATA_SYSTEM.md

---

## Responsibility

FEED_SYSTEM owns the home feed experience: displaying posts in reverse-chronological order, managing pagination, handling post-level engagement (likes, bookmarks), and providing the post composer. It is the primary interactive surface of RootFeed.

---

## State

FEED_SYSTEM manages the following reactive state, initialized from DATA_SYSTEM and mutated by user actions:

| State Key          | Type                  | Initial Value                          | Mutation                         |
|--------------------|-----------------------|----------------------------------------|----------------------------------|
| likedPostIds       | Set\<string\>         | Empty (no posts liked on load)         | Toggle on like button click      |
| bookmarkedPostIds  | Set\<string\>         | Empty (no posts bookmarked on load)    | Toggle on bookmark button click  |
| likeCounts         | Map\<string, number\> | Post.likeCount values from mock data   | Increment/decrement on like      |
| visiblePostCount   | number                | [initial page size]                    | Increment by [page size] on "Load more" |
| composedPosts      | Post[]                | Empty array                            | Prepended on successful compose  |

All state is component-local or held in Svelte reactive variables. It is not persisted across sessions.

---

## Post Display Rules

Each post in the feed renders:
- Author avatar (links to author profile)
- Author display name (links to author profile)
- Author handle (links to author profile)
- Post content text
- Relative timestamp (e.g., "2h ago")
- Like count + like toggle button
- Repost count (display only — reposting is not an interaction in this demo)
- Bookmark toggle button
- Link to full post thread view

Posts are sorted reverse-chronologically. Composed posts (session-only) appear at the top of the list, prepended to the mock data posts.

---

## Pagination

The feed displays [initial page size] posts at a time. A "Load more" button at the bottom of the list reveals the next [page size] posts. The button is hidden when all posts are visible.

Composed posts are always visible regardless of pagination state — they exist outside the paginated window.

---

## Post Composer

The composer is triggered by a visible "Post" or "Compose" button on the home feed. It provides:
- A text input area for post content
- A submit action that creates an ephemeral post and prepends it to the feed
- A cancel action that dismisses the composer without creating a post

Composed posts have:
- Content from the user's input
- A synthetic author (the "viewer" — a mock identity defined in the system, not from mock data users)
- A generated timestamp (current time at composition)
- Initial like/repost counts of zero

The composer does not support tags, threading, or image attachment.

---

## Like / Bookmark Rules

**Like toggle:**
- If post is not liked: increment likeCount by 1, add to likedPostIds
- If post is liked: decrement likeCount by 1, remove from likedPostIds
- Like button has distinct visual states for liked vs. not-liked

**Bookmark toggle:**
- If post is not bookmarked: add to bookmarkedPostIds
- If post is bookmarked: remove from bookmarkedPostIds
- Bookmark button has distinct visual states for bookmarked vs. not-bookmarked

Both actions are instant with no loading state or network call.

---

## Interactions with Other Systems

| System          | Relationship                                                      |
|-----------------|-------------------------------------------------------------------|
| DATA_SYSTEM     | Receives posts and users from page loader                         |
| VIEW_SYSTEM     | Renders output into the main content area; receives user actions  |
| PROFILE_SYSTEM  | No direct interaction; profile navigation is handled by VIEW_SYSTEM |
