# User Stories Overview

**References:** 01.PHILOSOPHY.md through 04.SYSTEMS/

---

## Phase: MVP

All stories below are in the MVP phase. They cover the full surface area of RootFeed as spec'd and implemented.

| ID | Title | Systems | Journey |
|---|---|---|---|
| US-001 | View home feed | FEED, VIEW, DATA | FEED |
| US-002 | Like a post | FEED, VIEW | FEED |
| US-003 | Bookmark a post | FEED, VIEW | FEED |
| US-004 | Compose and publish a post | FEED, VIEW | FEED |
| US-005 | Load more posts | FEED, VIEW, DATA | FEED |
| US-006 | View post detail and thread | VIEW, DATA | THREAD |
| US-007 | View a user profile | PROFILE, VIEW, DATA | PROFILE |
| US-008 | Follow and unfollow a user | PROFILE, VIEW | PROFILE |
| US-009 | Search posts by keyword | DISCOVERY, VIEW, DATA | SEARCH |
| US-010 | Explore trending tags and filter posts | DISCOVERY, VIEW, DATA | DISCOVERY |
| US-011 | Toggle dark/light theme | THEME, VIEW | META |

## Story Files

Stories are organized by system domain:

- `by_phase/MVP/feed.yaml` — Feed interactions (US-001 through US-005)
- `by_phase/MVP/thread.yaml` — Thread/post detail (US-006)
- `by_phase/MVP/profile.yaml` — Profile and follow (US-007, US-008)
- `by_phase/MVP/search.yaml` — Search (US-009)
- `by_phase/MVP/discovery.yaml` — Explore and tag filter (US-010)
- `by_phase/MVP/meta.yaml` — Theme toggle and meta banner (US-011)
