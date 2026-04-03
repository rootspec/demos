# Scaffold Demo: RootFeed Social Feed

A Bluesky-like social feed built on a pre-existing SvelteKit scaffold using the RootSpec methodology. Demonstrates how RootSpec adapts to projects that already have a framework, routing, and data in place.

## Status

- [ ] Create SvelteKit scaffold (routes, mock data, layout)
- [ ] `/rs-init` — Initialize RootSpec
- [ ] `/rs-spec` — Define specification
- [ ] `/rs-impl` — Implement from spec
- [ ] `/rs-validate` — Validate implementation

## Getting Started

1. `npx skills add rootspec/rootspec --skill '*'`
2. `cd scaffold`
3. Create the SvelteKit scaffold (see below)
4. `/rs-init`
5. `/rs-spec` (use SEED.md as product context)
6. `/rs-impl`
7. `/rs-validate`

## Scaffold Setup

Before running RootSpec, this demo needs a working SvelteKit app with:
- 5 routes: `/`, `/profile/[handle]`, `/post/[id]`, `/search`, `/explore`
- Mock JSON data in `src/lib/data/`
- Static adapter, TypeScript, Tailwind CSS
- Basic layout and navigation

The scaffold should be functional but minimal — data loads and routes work, but the UI is bare-bones.

## Product Description

See [SEED.md](SEED.md).

## Notes

CI will fail until the scaffold app and `/rs-impl` output exist. The workflow builds, runs Cypress, and deploys to GitHub Pages on green.
