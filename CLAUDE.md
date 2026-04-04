# CLAUDE.md

This is the RootSpec demos repository — a collection of demo projects that showcase the RootSpec specification methodology.

## Structure

Each subdirectory is an independent demo project. When running RootSpec skills (`/rs-init`, `/rs-spec`, `/rs-impl`, `/rs-validate`), always run them from within the specific demo directory, not the repo root.

## Current Demos

- `greenfield/` — Marketing site for RootSpec, built from scratch
- `scaffold/` — SvelteKit social feed (RootFeed), spec'd from an existing scaffold
- `brownfield/` — React weather dashboard (RootWeather), legacy code retrofitted with RootSpec

## Important

- Each demo has a `SEED.md` describing the product to build
- SEED.md feeds into `/rs-spec` as the product description
- Do not create spec files at the repo root — specs live inside each demo
- CI/CD is handled by `.github/workflows/validate-deploy.yml`
