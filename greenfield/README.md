# Greenfield Demo: RootSpec Marketing Site

A marketing site for RootSpec, built entirely from specification using the RootSpec methodology. Demonstrates the full pipeline from product idea to deployed, validated site — including interactive features like a hierarchy explorer and spec wizard.

## Status

- [x] `/rs-init` — Initialize RootSpec
- [x] `/rs-spec` — Define specification from SEED.md
- [x] `/rs-impl` — Implement from spec
- [x] `/rs-validate` — All 10 stories passing

## What Happened

Started from a ~100-line product description ([SEED.md](SEED.md)) with no code, no framework, no design. RootSpec walked through the full pipeline:

1. `/rs-init` created the spec directory and prerequisites
2. `/rs-spec` interviewed based on SEED.md, producing L1-L5 and derived artifacts
3. `/rs-impl` chose a framework, built the site, and generated Cypress tests
4. `/rs-validate` confirmed all 10 stories pass

The site includes interactive features (hierarchy explorer, spec wizard, before/after comparison), dark/light theme, and a meta banner explaining it was auto-generated.

## Getting Started

1. `npx skills add rootspec/rootspec --skill '*'`
2. `cd greenfield`
3. `/rs-init`
4. `/rs-spec` (use SEED.md as product context)
5. `/rs-impl`
6. `/rs-validate`

## Product Description

See [SEED.md](SEED.md).
