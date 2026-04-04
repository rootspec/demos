#!/usr/bin/env bash
# test.sh — Run the full test suite
# Usage: ./scripts/test.sh
# Starts the dev server, runs Cypress, then stops the server.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Start dev server
"$SCRIPT_DIR/dev.sh" start

# Give the server a moment to be ready
sleep 3

# Build test fixtures from YAML stories
cd "$PROJECT_ROOT"
node scripts/build-stories.cjs

# Run tests
npx cypress run || TEST_EXIT=$?

# Stop dev server
"$SCRIPT_DIR/dev.sh" stop

exit "${TEST_EXIT:-0}"
