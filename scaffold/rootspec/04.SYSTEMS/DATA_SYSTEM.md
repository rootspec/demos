# DATA_SYSTEM

**Level:** 4 — Systems
**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md

---

## Responsibility

DATA_SYSTEM owns all mock data definitions and exposes them to other systems. It is the single source of truth for the static dataset that powers RootFeed. It does not manage client-side state mutations — those are owned by the systems that render the data.

---

## Data Entities

### User

Represents a mock social network account.

| Field          | Type    | Description                              |
|----------------|---------|------------------------------------------|
| id             | string  | Unique identifier (e.g., "u1")           |
| handle         | string  | URL-safe username (e.g., "alice.dev")    |
| displayName    | string  | Human-readable name                      |
| bio            | string  | Short profile description                |
| avatar         | string  | URL to placeholder avatar image          |
| followerCount  | number  | Initial follower count from mock data    |
| followingCount | number  | Initial following count from mock data   |

### Post

Represents a single microblog post.

| Field       | Type           | Description                                     |
|-------------|----------------|-------------------------------------------------|
| id          | string         | Unique identifier (e.g., "p1")                  |
| authorId    | string         | References a User.id                            |
| content     | string         | Post text content                               |
| createdAt   | string (ISO)   | Timestamp of creation                           |
| likeCount   | number         | Initial like count from mock data               |
| repostCount | number         | Initial repost count from mock data             |
| parentId    | string or null | References parent Post.id if this is a reply    |
| tags        | string[]       | List of tag names associated with this post     |

### Tag

Represents a trending/common hashtag.

| Field     | Type   | Description                              |
|-----------|--------|------------------------------------------|
| name      | string | Tag name without the `#` prefix          |
| postCount | number | Number of posts using this tag           |

---

## Data Files

| File                        | Contents                  | Size Target            |
|-----------------------------|---------------------------|------------------------|
| `src/lib/data/users.json`   | Array of User objects     | [small number] users   |
| `src/lib/data/posts.json`   | Array of Post objects     | [medium number] posts  |
| `src/lib/data/tags.json`    | Array of Tag objects      | [small number] tags    |

---

## Data Constraints

- Every Post.authorId must reference a valid User.id
- Every Post.parentId (when non-null) must reference a valid Post.id
- Reply chains must not be circular
- At least [some] posts must have parentId set to create visible thread structure
- Tags in Post.tags must correspond to entries in the tags data file
- Avatar URLs use placeholder image services (e.g., DiceBear) — no real user images

---

## Access Pattern

DATA_SYSTEM data is loaded by SvelteKit's `+page.ts` loader functions. Each route loads only the data it needs:

| Route                  | Data Loaded                              |
|------------------------|------------------------------------------|
| `/`                    | All posts, all users                     |
| `/profile/[handle]`    | One user (by handle), that user's posts  |
| `/post/[id]`           | One post, its author, parent post (if any), all replies |
| `/search`              | All posts, all users                     |
| `/explore`             | All tags, all users, all posts           |

Data is passed from loaders to page components via the `data` prop. Systems that mutate state (likes, follows) copy the initial values into reactive local state — they do not mutate the loaded data directly.

---

## Interactions with Other Systems

| System             | Relationship                                        |
|--------------------|-----------------------------------------------------|
| FEED_SYSTEM        | Receives all posts and users from loader            |
| PROFILE_SYSTEM     | Receives one user and their posts from loader       |
| DISCOVERY_SYSTEM   | Receives all posts, users, and tags from loader     |
| VIEW_SYSTEM        | No direct data dependency; receives rendered output |
