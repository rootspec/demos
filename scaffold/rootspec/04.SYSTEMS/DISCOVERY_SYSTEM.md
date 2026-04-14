# Level 4: Discovery System

**Responsibility:** Explore page — trending tags display, tag-based post filtering, and suggested user list with follow/unfollow (`/explore`).

---

## Boundaries

- **Owns:** Tag display and filtering logic, explore-page user list and follow buttons
- **Does not own:** Tag data authorship (from tags.json), follow state storage (ProfileState from PROFILE_SYSTEM), individual post display (FEED_SYSTEM PostCard)
- **Route:** `/explore`

---

## Data Ownership

### Tag Entity (from tags.json)
- `name` — tag name string (without `#` prefix)
- `postCount` — number of posts with this tag

### Explore View State (client-side, in-memory)
- `selectedTag: string | null` — the currently active tag filter (null means no filter)

---

## Rules

### Tag Display
- Tags are sorted by `postCount` descending — highest-volume tags appear first
- Each tag is displayed as a clickable chip with format: `#[name] ([postCount])`
- When no tag is selected, all chips are in default (unselected) style
- When a tag is selected, the active chip is visually highlighted

### Tag Filtering
- Clicking an unselected tag sets it as `selectedTag` and filters the post list to posts where `post.tags` includes the tag name
- Clicking the currently selected tag deselects it (sets `selectedTag` to null) and shows all posts
- When a tag is selected and no posts match, an empty state message is shown

### Post List (under tags)
- When no tag is selected: a section of popular or featured posts is shown (or all posts if no curation is defined)
- When a tag is selected: only posts tagged with that tag are shown
- Post display shows: author name, handle, post content, link to post detail

### Suggested Users
- All users from `users.json` are shown in the people section
- Each user shows: display name, handle, bio, follow/unfollow button
- Follow/unfollow button reads from and writes to `ProfileState.followedIds` — the same state as PROFILE_SYSTEM
- Clicking Follow adds the user's ID to `followedIds`; clicking Unfollow removes it
- No cap on the number of users shown — all users in the data appear

---

## State Transitions

```
Tag Filter State:
  no_selection → (click tag) → tag_selected
  tag_selected → (click same tag) → no_selection
  tag_selected → (click different tag) → different_tag_selected

Follow State (shared with PROFILE_SYSTEM):
  not_following → (click Follow) → following
  following → (click Unfollow) → not_following
```

---

## System Interactions

- **← PROFILE_SYSTEM:** Reads and writes `ProfileState.followedIds` for the follow/unfollow buttons
- **→ PROFILE_SYSTEM:** Clicking a user name navigates to `/profile/[handle]`
- **→ THREAD_SYSTEM:** Clicking a post in the filtered list navigates to `/post/[id]`
- **← SYSTEMS_OVERVIEW:** Reads from shared `tags.json`, `posts.json`, and `users.json`
