# Greenfield Demo: RootSpec Marketing Site

A marketing site for RootSpec, built entirely from specification using the RootSpec methodology. Demonstrates the full pipeline from product idea to deployed, validated site — including interactive features like a hierarchy explorer and spec wizard.

## Status

- [ ] `/rs-init` — Initialize RootSpec
- [ ] `/rs-spec` — Define specification
- [ ] `/rs-impl` — Implement from spec
- [ ] `/rs-validate` — Validate implementation

## Getting Started

1. `npx skills add rootspec/rootspec --skill '*'`
2. `cd greenfield`
3. `/rs-init`
4. `/rs-spec` (use SEED.md as product context)
5. `/rs-impl`
6. `/rs-validate`

## Product Description

See [SEED.md](SEED.md).

## Notes

CI will fail until `/rs-impl` creates the app — this is expected. The workflow builds, runs Cypress, and deploys to GitHub Pages on green.
