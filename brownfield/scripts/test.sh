#!/usr/bin/env bash
# test.sh — Run Cypress E2E tests with dev server lifecycle
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Start dev server
"$SCRIPT_DIR/dev.sh" start

# Run Cypress
cd "$PROJECT_ROOT"
npx cypress run "$@"
EXIT_CODE=$?

# Stop dev server
"$SCRIPT_DIR/dev.sh" stop

exit $EXIT_CODE
