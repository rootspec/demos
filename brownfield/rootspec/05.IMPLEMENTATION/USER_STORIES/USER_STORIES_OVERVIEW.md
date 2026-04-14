# User Stories Overview

> References: All spec levels

## Organization

Stories are organized in three ways:

| Collection | Path | Purpose |
|------------|------|---------|
| by_phase/baseline | `by_phase/baseline/` | All existing app functionality (brownfield baseline) |
| by_journey/CITY_LOOKUP | `by_journey/CITY_LOOKUP/` | City search → weather display journey |
| by_journey/DASHBOARD_AND_COMPARE | `by_journey/DASHBOARD_AND_COMPARE/` | Multi-location and comparison journeys |
| by_system/LOCATION | `by_system/LOCATION/` | Location system stories |
| by_system/WEATHER | `by_system/WEATHER/` | Weather display and alert stories |
| by_system/SETTINGS | `by_system/SETTINGS/` | Settings and preferences stories |

## Story IDs

| Range | Domain |
|-------|--------|
| US-001–US-004 | City search and selection |
| US-005–US-008 | Weather display |
| US-009–US-012 | Favorites and location management |
| US-013–US-015 | Settings and preferences |
| US-016–US-018 | Dashboard view |
| US-019–US-020 | Comparison view |

## Phases

- **baseline** — All existing functionality derived from the codebase. These are brownfield stories: the code is truth for acceptance criteria.

## Test Suites

- `cypress/e2e/baseline.cy.ts` — Runs all baseline stories (`by_phase/baseline/**/*.yaml`)
- `cypress/e2e/comparison.cy.ts` — Runs comparison stories (`by_journey/DASHBOARD_AND_COMPARE/**/*.yaml`)
