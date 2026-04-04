# Brownfield Demo: RootWeather Dashboard

A weather dashboard built with React 18, mixed patterns (some hooks, some class components), no TypeScript, no tests, no spec. Uses the Open-Meteo API (no API key required).

This demo shows how RootSpec retrofits onto an existing codebase — deriving a specification from code that was never designed with one.

## Status

- [x] Build the app (pre-RootSpec)
- [x] `/rs-init` — Initialize RootSpec
- [x] `/rs-spec` — Derive specification from existing code
- [x] `/rs-impl` — Add tests for all existing functionality
- [x] `/rs-validate` — All 14 baseline stories passing
- [x] `/rs-spec add` — Added comparison feature via spec
- [x] `/rs-impl` — Implemented comparison view
- [x] `/rs-validate` — All stories passing (baseline + new feature)

## What Makes This Brownfield

- **No SEED.md** — the existing code is the seed
- **Mixed patterns** — hooks and class components coexist
- **No TypeScript** — plain JavaScript with JSX
- **No tests** — zero test coverage before RootSpec
- **Inconsistent styling** — CSS modules, styled-components, and inline styles
- **Real API calls** — Open-Meteo weather data, not mocks
- **Working app** — fully functional before RootSpec touches it

## What Happened

### Phase 1: Retrofit

RootSpec was initialized on a working weather app that had no spec, no tests, and mixed code patterns. `/rs-spec` read every component, hook, and utility — then derived a full 5-level specification:

- **L1 Philosophy** — mission, design pillars, inviolable principles (all inferred from the code)
- **L2 Truths** — trade-offs, constraints, design philosophy
- **L3 Interactions** — 4 user journeys mapped from the actual UI flows
- **L4 Systems** — 4 subsystems (Weather, Location, Settings, View) matching the code architecture
- **L5 Stories** — 14 baseline user stories covering every existing feature, with testable acceptance criteria

`/rs-impl` then generated Cypress tests for all 14 stories. `/rs-validate` confirmed they all pass.

### Phase 2: New feature via spec

After the baseline was established, a new feature was added through the spec-first workflow:

```
/rs-spec add Side-by-side comparison view: select 2-3 saved locations
and display their current conditions, hourly forecast, and 7-day forecast
in columns. Accessible from the dashboard view via a "Compare" button.
```

`/rs-spec` updated L3 (new journey), L4 (cross-system interaction), and L5 (new stories). `/rs-impl` implemented the ComparisonView component and wired it into the existing app. `/rs-validate` confirmed all stories pass — both baseline and the new feature.

## The App

RootWeather lets you:
- Search for cities and view current weather
- See a 7-day forecast with temperature charts
- View hourly forecast for the next 24 hours
- Save favorite locations
- View all saved locations on a dashboard
- **Compare 2-3 cities side by side** (added via RootSpec)
- Weather alerts (UV, wind, humidity, temperature extremes)
- Settings: temperature units, wind units, time format, default city

All data from [Open-Meteo](https://open-meteo.com/) — free, no API key.

## Getting Started

1. `npx skills add rootspec/rootspec --skill '*'`
2. `cd brownfield`
3. `npm install && npm run dev` (verify the app works)
4. `/rs-init`
5. `/rs-spec` (no seed file — the spec agent scans existing code)
6. `/rs-impl`
7. `/rs-validate`

## Attribution

This is a RootSpec demo. The app was intentionally built with mixed patterns and no tests to simulate a real legacy codebase. RootSpec version and attribution appear in the footer.
