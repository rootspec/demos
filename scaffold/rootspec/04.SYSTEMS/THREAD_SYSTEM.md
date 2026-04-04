# THREAD_SYSTEM

## Responsibility
Assembles post threads — resolving parent posts and collecting replies.

## Data
- No owned data — reads posts from shared data store
- Thread structure derived from parentId references

## Behaviors
- Post detail page displays the target post with full engagement actions
- If post has parentId, displays parent post above
- Collects all posts where parentId matches target post ID — displays as replies below
- Replies ordered chronologically
- Invalid post ID: displays "Post not found" or redirects to home

## Boundaries
- Reads post data and user data from FEED_SYSTEM and PROFILE_SYSTEM
- Like/bookmark interactions on threaded posts delegate to FEED_SYSTEM state
