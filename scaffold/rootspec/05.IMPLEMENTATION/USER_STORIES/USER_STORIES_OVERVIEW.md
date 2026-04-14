# User Stories Overview

**RootFeed — Level 5 User Stories**

---

## Organization

Stories are organized in `by_phase/MVP/` since this is a single-phase demo. All stories represent the complete implemented feature set — there are no future phases.

## Phase Definitions

| Phase | Description |
|-------|-------------|
| MVP | The full RootFeed demo — all five routes implemented and tested |

## Story Index

| ID | Title | File | Systems |
|----|-------|------|---------|
| US-001 | View home feed | by_phase/MVP/feed.yaml | FEED_SYSTEM |
| US-002 | Like and bookmark posts | by_phase/MVP/feed.yaml | FEED_SYSTEM |
| US-003 | Compose a new post | by_phase/MVP/feed.yaml | FEED_SYSTEM |
| US-004 | View post detail and replies | by_phase/MVP/thread.yaml | THREAD_SYSTEM |
| US-005 | View user profile | by_phase/MVP/profile.yaml | PROFILE_SYSTEM |
| US-006 | Follow and unfollow a user | by_phase/MVP/profile.yaml | PROFILE_SYSTEM |
| US-007 | Search posts | by_phase/MVP/search.yaml | SEARCH_SYSTEM |
| US-008 | Explore trending tags | by_phase/MVP/discovery.yaml | DISCOVERY_SYSTEM |
| US-009 | Filter posts by tag | by_phase/MVP/discovery.yaml | DISCOVERY_SYSTEM |
| US-010 | Toggle theme | by_phase/MVP/meta.yaml | META_SYSTEM |
| US-011 | See meta banner on every page | by_phase/MVP/meta.yaml | META_SYSTEM |

## Test Suite

The MVP test suite runs: `cypress run --spec 'cypress/e2e/mvp.cy.ts'`
The mvp.cy.ts file should load `rootspec/05.IMPLEMENTATION/USER_STORIES/by_phase/MVP/**/*.yaml`
