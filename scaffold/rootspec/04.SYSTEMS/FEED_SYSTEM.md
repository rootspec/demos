# FEED_SYSTEM

## Responsibility
Renders the home feed, manages post interactions (like, bookmark), handles the post composer, and controls pagination.

## Data
- **Posts** — Loaded from `posts.json`. Each post: id, authorId, content, createdAt, likeCount, repostCount, parentId (nullable), tags[]
- **Client-side state** — Liked post IDs (Set), bookmarked post IDs (Set), user-created posts (Array)

## Behaviors
- Feed displays posts in reverse chronological order
- Like toggle: adds/removes post ID from liked set, increments/decrements displayed count
- Bookmark toggle: adds/removes post ID from bookmarked set
- Composer: validates non-empty content, prepends new post to feed with current timestamp
- Pagination: loads [page_size] posts at a time, "Load more" appends next batch
- Author info resolved by joining post.authorId against user data

## Boundaries
- Delegates thread assembly to THREAD_SYSTEM
- Reads user data from PROFILE_SYSTEM for author display
- Does not persist state — all client-side state resets on page refresh
