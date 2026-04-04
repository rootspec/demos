# DISCOVERY_SYSTEM

## Responsibility
Powers search, tag filtering, and the explore page.

## Data
- **Tags** — Loaded from `tags.json`. Each tag: name, postCount
- **Search index** — Derived from post content at load time

## Behaviors
- Search: filters posts by keyword match against content, updates results as user types with [debounce_duration] delay
- Tag filtering: clicking a tag filters posts to those containing that tag
- Explore page: displays trending tags (sorted by postCount), suggested users (subset of users), popular posts (sorted by engagement)
- Empty results: displays "No posts found" with suggestion to try different keywords

## Boundaries
- Reads post and user data from shared store
- Does not modify any state — read-only system
