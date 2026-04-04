# Brownfield Demo: RootWeather Dashboard

A weather dashboard built with React 18, mixed patterns (some hooks, some class components), no TypeScript, no tests, no spec. Uses the Open-Meteo API (no API key required).

This demo shows how RootSpec retrofits onto an existing codebase — deriving a specification from code that was never designed with one.

## Status

- [x] Build the app (pre-RootSpec)
- [ ] `/rs-init` — Initialize RootSpec
- [ ] `/rs-spec` — Derive specification from existing code
- [ ] `/rs-impl` — Add tests and fill gaps identified by the spec
- [ ] `/rs-validate` — Validate implementation

## What Makes This Brownfield

- **No SEED.md** — the existing code is the seed
- **Mixed patterns** — hooks and class components coexist
- **No TypeScript** — plain JavaScript with JSX
- **No tests** — zero test coverage
- **Inconsistent styling** — CSS modules in some places, styled-components in others
- **Real API calls** — Open-Meteo weather data, not mocks
- **Working app** — functional before RootSpec touches it

## Getting Started

1. `npx skills add rootspec/rootspec --skill '*'`
2. `cd brownfield`
3. `npm install && npm run dev` (verify the app works)
4. `/rs-init`
5. `/rs-spec` (no seed file — the spec agent scans existing code)
6. `/rs-impl`
7. `/rs-validate`

## The App

RootWeather lets you:
- Search for cities and view current weather
- See a 7-day forecast with temperature charts
- Save favorite locations
- Toggle between Celsius and Fahrenheit
- View weather details (humidity, wind, UV index)

All data from [Open-Meteo](https://open-meteo.com/) — free, no API key.

## Attribution

This is a RootSpec demo. The app was intentionally built with mixed patterns and no tests to simulate a real legacy codebase. RootSpec version and attribution appear in the footer.
