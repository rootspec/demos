# RootSpec Demos

Demonstrates the RootSpec spec-to-code pipeline. Each demo follows the full workflow — from product idea to deployed, validated application.

## Demos

| Demo | Scenario | Status |
|------|----------|--------|
| [greenfield/](greenfield/) | Marketing site for RootSpec, built from scratch | In progress |

## How It Works

Each demo is rebuilt from scratch using the [RootSpec Orchestrator](https://github.com/rootspec/rootspec/tree/main/orchestrator) — a single command that runs the full pipeline:

```
rs-orchestrate --budget 10 --phases init,spec,impl,validate,review
```

The orchestrator runs five phases:

1. **Init** — Set up project structure, prerequisites, dev scripts
2. **Spec** — Derive a full specification from `SEED.md`
3. **Impl** — Implement from the spec, test-driven
4. **Validate** — Run Cypress tests, capture screenshots
5. **Review** — AI quality review with fix cycles (screenshots + source inspection)

Quality gates between phases enforce pass rates, and the review-fix loop catches visual bugs, broken links, and placeholder content that functional tests miss.

## CI Rebuild

Trigger a rebuild from the [Actions tab](https://github.com/rootspec/demos/actions/workflows/rebuild-demo.yml) (`Rebuild Demo` workflow). It:

- Resets the selected demo to a blank slate
- Clones the RootSpec framework and builds the orchestrator
- Runs the full pipeline (init → spec → impl → validate → review)
- Opens a PR with the results, quality score, and cost breakdown

## Live Demos

<!-- TODO: add link after first deployment -->
