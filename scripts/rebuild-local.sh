#!/usr/bin/env bash
set -euo pipefail

# Local rebuild script — mirrors the CI workflow but runs on your machine.
# Usage: ./scripts/rebuild-local.sh <demo> [step]
#   demo: greenfield | scaffold | brownfield
#   step: all (default) | reset | spec | impl | validate

DEMO="${1:?Usage: rebuild-local.sh <demo> [step]}"
STEP="${2:-all}"
STATS_DIR="/tmp/rootspec-rebuild"
MODEL="claude-sonnet-4-20250514"

mkdir -p "$STATS_DIR"

stats() {
  local file="$1"
  echo "--- Stats ---"
  jq '{turns: .num_turns, cost_usd: .total_cost_usd, duration_ms: .duration_ms, input_tokens: (.usage.input_tokens + .usage.cache_read_input_tokens + .usage.cache_creation_input_tokens), output_tokens: .usage.output_tokens}' "$file"
}

# Inject cost/turns from claude JSON output into the last stats.json entry
inject_cost() {
  local claude_json="$1"
  local stats_file="$DEMO/rootspec/stats.json"
  [ -f "$claude_json" ] || return 0
  [ -f "$stats_file" ] || return 0
  local cost turns
  cost=$(jq -r '.total_cost_usd // 0' "$claude_json" 2>/dev/null || echo 0)
  turns=$(jq -r '.num_turns // 0' "$claude_json" 2>/dev/null || echo 0)
  jq --arg cost "$cost" --arg turns "$turns" \
    '.runs[-1].costUsd = ($cost | tonumber) | .runs[-1].turns = ($turns | tonumber)' \
    "$stats_file" > "$stats_file.tmp"
  mv "$stats_file.tmp" "$stats_file"
}

run_reset() {
  echo "=== Reset: $DEMO ==="
  cd "$DEMO"

  case "$DEMO" in
    greenfield)
      # Spec files (keep 00.AXIOMS.md and 00.FRAMEWORK.md)
      rm -rf rootspec/01.* rootspec/02.* rootspec/03.* rootspec/04.SYSTEMS rootspec/05.IMPLEMENTATION
      rm -rf rootspec/CONVENTIONS rootspec/DERIVED_ARTIFACTS
      rm -f rootspec/spec-status.json rootspec/tests-status.json rootspec/stats.json
      # Source code and build artifacts
      rm -rf src/ dist/ .astro/ .next/
      # Cypress / test infrastructure
      rm -rf cypress/ cypress.config.ts
      # Framework configs (agent chooses the framework)
      rm -f package.json package-lock.json tsconfig.json
      rm -f astro.config.mjs astro.config.ts vite.config.ts vite.config.js
      rm -f next.config.js next.config.ts next.config.mjs
      rm -f tailwind.config.mjs tailwind.config.js tailwind.config.ts
      rm -f postcss.config.js postcss.config.ts
      # Prerequisites (created by rs-init)
      rm -rf scripts/
      rm -f .rootspec.json .dev-server.pid .dev-server.log cypress-output.log
      # Orphaned node_modules from previous build
      rm -rf node_modules
      ;;
    scaffold)
      cd ..
      git checkout scaffold/skeleton -- scaffold/src/
      cd scaffold
      rm -rf rootspec/01.PHILOSOPHY.md rootspec/02.TRUTHS.md rootspec/03.INTERACTIONS.md \
             rootspec/04.SYSTEMS rootspec/05.IMPLEMENTATION rootspec/DERIVED_ARTIFACTS \
             rootspec/CONVENTIONS rootspec/spec-status.json rootspec/tests-status.json
      rm -rf cypress/e2e
      ;;
    brownfield)
      echo "Brownfield: no reset (spec-only rebuild)"
      ;;
  esac

  cd ..
  echo "Reset complete"
}

run_init() {
  if [ "$DEMO" != "greenfield" ]; then return; fi
  if [ -f "$DEMO/.rootspec.json" ]; then
    echo "=== Init: skipped (already initialized) ==="
    return
  fi

  echo "=== Init: $DEMO ==="
  cd "$DEMO"

  claude -p \
    --dangerously-skip-permissions \
    --output-format json \
    --max-turns 20 \
    --model "$MODEL" \
    "Run /rs-init. This is non-interactive — do not ask questions. There is no package.json — create one with npm init -y first." \
    | tee "$STATS_DIR/init.json" | jq -r '.result'

  stats "$STATS_DIR/init.json"

  # Install deps that rs-init set up
  if [ -f package.json ]; then
    npm install 2>&1 | tail -3
  fi

  cd ..
}

run_spec() {
  echo "=== Spec: $DEMO ==="
  cd "$DEMO"

  local prompt
  if [ "$DEMO" = "brownfield" ]; then
    prompt="Run /rs-spec. Skip the interview — derive the spec from existing code. This is non-interactive — do not ask questions."
  else
    prompt="Run /rs-spec. Read SEED.md for context and skip the interview. This is non-interactive — do not ask questions."
  fi

  claude -p \
    --dangerously-skip-permissions \
    --output-format json \
    --max-turns 50 \
    --model "$MODEL" \
    "$prompt" \
    | tee "$STATS_DIR/spec.json" | jq -r '.result'

  stats "$STATS_DIR/spec.json"
  cd ..
  inject_cost "$STATS_DIR/spec.json"
}

run_impl() {
  if [ "$DEMO" = "brownfield" ]; then
    echo "Skipping impl for brownfield (spec-only rebuild)"
    return
  fi

  echo "=== Impl: $DEMO ==="
  cd "$DEMO"

  claude -p \
    --dangerously-skip-permissions \
    --output-format json \
    --max-turns 100 \
    --model "$MODEL" \
    "Run /rs-impl. This is non-interactive — do not ask questions." \
    | tee "$STATS_DIR/impl.json" | jq -r '.result'

  stats "$STATS_DIR/impl.json"
  cd ..
  inject_cost "$STATS_DIR/impl.json"
}

run_validate() {
  echo "=== Validate: $DEMO ==="
  cd "$DEMO"

  claude -p \
    --dangerously-skip-permissions \
    --output-format json \
    --max-turns 40 \
    --model "$MODEL" \
    "Run /rs-validate. This is non-interactive — do not ask questions." \
    | tee "$STATS_DIR/validate.json" | jq -r '.result' \
    || echo "Validate exited with $?"

  stats "$STATS_DIR/validate.json" 2>/dev/null || true
  cd ..
  inject_cost "$STATS_DIR/validate.json"
}

print_summary() {
  echo ""
  echo "=== Summary ==="
  for step in init spec impl validate; do
    local file="$STATS_DIR/$step.json"
    if [ -f "$file" ]; then
      printf "%-10s turns=%-4s cost=\$%-8s duration=%ss\n" \
        "$step" \
        "$(jq -r '.num_turns' "$file")" \
        "$(jq -r '.total_cost_usd | . * 100 | round / 100' "$file")" \
        "$(jq -r '.duration_ms / 1000 | round' "$file")"
    fi
  done
  echo ""
  echo "Total cost: \$$(jq -s '[.[].total_cost_usd] | add | . * 100 | round / 100' "$STATS_DIR"/*.json 2>/dev/null)"
}

# Run from repo root
cd "$(git rev-parse --show-toplevel)"

case "$STEP" in
  all)
    run_reset
    run_init
    run_spec
    run_impl
    run_validate
    print_summary
    ;;
  reset)    run_reset ;;
  init)     run_init ;;
  spec)     run_spec ;;
  impl)     run_impl ;;
  validate) run_validate ;;
  summary)  print_summary ;;
  *)
    echo "Unknown step: $STEP (use: all, reset, init, spec, impl, validate, summary)"
    exit 1
    ;;
esac
