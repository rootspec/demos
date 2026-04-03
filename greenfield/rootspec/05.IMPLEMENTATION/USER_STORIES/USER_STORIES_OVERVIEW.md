# User Stories Overview

## Organization

Stories are organized by phase, journey, and system. A story may appear in multiple collections.

## Phases

| Phase | Description |
|-------|-------------|
| **MVP** | Core marketing site — all sections, all interactive features, dark/light theme, responsive layout |

This is a single-phase marketing site. All features ship together.

## Journeys

| Journey | Description |
|---------|-------------|
| **FIRST_VISIT** | Developer arrives, scrolls through the narrative, tries interactives, reaches CTA |

## Systems

| System | Story Coverage |
|--------|---------------|
| CONTENT_SYSTEM | Hero, meta banner, problem section, how-it-works, CTA |
| INTERACTIVE_SYSTEM | Hierarchy explorer, spec wizard, before/after comparison |
| THEME_SYSTEM | Dark/light toggle, system preference |
| ACCESSIBILITY_SYSTEM | Keyboard navigation, screen reader support |

## Test Suites

- `cypress/e2e/mvp.cy.ts` → loads `by_phase/MVP/**/*.yaml`
- `cypress/e2e/first-visit.cy.ts` → loads `by_journey/FIRST_VISIT/**/*.yaml`
