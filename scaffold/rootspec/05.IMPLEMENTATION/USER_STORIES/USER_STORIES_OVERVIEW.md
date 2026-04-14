# User Stories Overview

**Phase:** MVP
**Total Stories:** 11
**Organization:** by_phase/MVP/

---

## Story Index

| ID | Title | Systems | File |
|----|-------|---------|------|
| US-001 | View home feed with posts | FEED_SYSTEM, DATA_SYSTEM | meta.yaml |
| US-002 | Like and unlike a post | FEED_SYSTEM, VIEW_SYSTEM | feed.yaml |
| US-003 | Load more posts | FEED_SYSTEM | feed.yaml |
| US-004 | Compose a new post | FEED_SYSTEM, VIEW_SYSTEM | feed.yaml |
| US-005 | View post detail and replies | FEED_SYSTEM, DATA_SYSTEM, VIEW_SYSTEM | thread.yaml |
| US-006 | View a user profile | PROFILE_SYSTEM, DATA_SYSTEM, VIEW_SYSTEM | profile.yaml |
| US-007 | Follow and unfollow a user | PROFILE_SYSTEM, VIEW_SYSTEM | profile.yaml |
| US-008 | Search posts by keyword | DISCOVERY_SYSTEM, VIEW_SYSTEM | search.yaml |
| US-009 | Explore trending tags and filter posts | DISCOVERY_SYSTEM, VIEW_SYSTEM | discovery.yaml |
| US-010 | Toggle dark/light theme | VIEW_SYSTEM | meta.yaml |
| US-011 | See meta banner on every page | VIEW_SYSTEM | meta.yaml |

---

## Cypress Test Suite

Test file: `cypress/e2e/mvp.cy.ts`
Loads: `rootspec/05.IMPLEMENTATION/USER_STORIES/by_phase/MVP/**/*.yaml`
