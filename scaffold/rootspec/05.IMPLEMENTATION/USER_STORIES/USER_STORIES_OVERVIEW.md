# User Stories Overview

## Organization

All stories belong to a single phase: **MVP**. RootFeed is a demo — there is no post-launch roadmap.

### By Phase
- `by_phase/MVP/` — All stories

### By Journey
- `by_journey/FEED_BROWSING/` — Home feed, post interactions, composer, pagination
- `by_journey/DISCOVERY/` — Search, explore, tag filtering
- `by_journey/META/` — Banner, theme, attribution

### By System
- `by_system/FEED_SYSTEM/` — Feed rendering, like, bookmark, composer, pagination
- `by_system/PROFILE_SYSTEM/` — Profile display, follow/unfollow
- `by_system/THREAD_SYSTEM/` — Thread assembly, post detail
- `by_system/DISCOVERY_SYSTEM/` — Search, tags, explore
- `by_system/META_SYSTEM/` — Banner, theme, footer

## Story Index

| ID | Title | Systems | Journey |
|----|-------|---------|---------|
| US-101 | Browse the home feed | FEED_SYSTEM | FEED_BROWSING |
| US-102 | Like and bookmark posts | FEED_SYSTEM | FEED_BROWSING |
| US-103 | Compose a new post | FEED_SYSTEM | FEED_BROWSING |
| US-104 | Load more posts | FEED_SYSTEM | FEED_BROWSING |
| US-105 | View a user profile | PROFILE_SYSTEM | FEED_BROWSING |
| US-106 | Follow and unfollow users | PROFILE_SYSTEM | FEED_BROWSING |
| US-107 | Read a post thread | THREAD_SYSTEM | FEED_BROWSING |
| US-108 | Search posts | DISCOVERY_SYSTEM | DISCOVERY |
| US-109 | Explore trending content | DISCOVERY_SYSTEM | DISCOVERY |
| US-110 | Filter posts by tag | DISCOVERY_SYSTEM | DISCOVERY |
| US-111 | See the demo banner | META_SYSTEM | META |
| US-112 | Toggle dark/light theme | META_SYSTEM | META |

## Test Suites

- `cypress/e2e/mvp.cy.ts` — loads `by_phase/MVP/**/*.yaml`
- `cypress/e2e/feed.cy.ts` — loads `by_journey/FEED_BROWSING/**/*.yaml`
- `cypress/e2e/discovery.cy.ts` — loads `by_journey/DISCOVERY/**/*.yaml`
- `cypress/e2e/meta.cy.ts` — loads `by_journey/META/**/*.yaml`
