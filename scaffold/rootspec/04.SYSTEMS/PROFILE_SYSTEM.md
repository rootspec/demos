# PROFILE_SYSTEM

## Responsibility
Displays user profiles and manages follow/unfollow relationships.

## Data
- **Users** — Loaded from `users.json`. Each user: id, handle, displayName, bio, avatar, followerCount, followingCount
- **Client-side state** — Followed user IDs (Set)

## Behaviors
- Profile page shows user info, follower/following counts, and that user's posts
- Follow toggle: adds/removes user ID from followed set, adjusts displayed follower count
- Profile not found: displays "User not found" message
- User posts filtered from full post set by authorId

## Boundaries
- Provides user data to FEED_SYSTEM and THREAD_SYSTEM for author resolution
- Does not own posts — reads from shared data, filters by author
