# Scaffold Demo: RootFeed Social Feed

A Bluesky-like social feed built on a pre-existing SvelteKit scaffold using the RootSpec methodology. Demonstrates how RootSpec adapts to projects that already have a framework, routing, and data in place.

## Status

- [x] Create SvelteKit scaffold (routes, mock data, layout)
- [x] `/rs-init` — Initialize RootSpec
- [x] `/rs-spec` — Define specification from SEED.md + existing scaffold
- [x] `/rs-impl` — Implement from spec
- [x] `/rs-validate` — All 12 stories passing

## What Happened

Started from a bare SvelteKit app with 5 routes, mock JSON data (8 users, 30 posts, 15 tags), and minimal UI. RootSpec spec'd and implemented the full experience:

1. `/rs-init` detected SvelteKit, Tailwind, and the existing route structure
2. `/rs-spec` used SEED.md and the existing code to produce L1-L5
3. `/rs-impl` built out all features: like/bookmark, follow/unfollow, post composer, tag filtering, load more, dark/light theme, and a meta banner
4. `/rs-validate` confirmed all 12 stories pass

## Getting Started

1. `npx skills add rootspec/rootspec --skill '*'`
2. `cd scaffold`
3. `/rs-init`
4. `/rs-spec` (use SEED.md as product context)
5. `/rs-impl`
6. `/rs-validate`

## Product Description

See [SEED.md](SEED.md).
