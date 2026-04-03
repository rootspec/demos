#!/usr/bin/env bash
# test.sh — Run the full test suite
# Usage: ./scripts/test.sh [--headed]
# Starts the dev server, runs Cypress, then stops the server.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

CYPRESS_ARGS=""
if [[ "${1:-}" == "--headed" ]]; then
  CYPRESS_ARGS="--headed"
fi

# Start dev server
echo "Starting dev server..."
./scripts/dev.sh start

# Wait for server to be ready
echo "Waiting for server..."
ATTEMPTS=0
MAX_ATTEMPTS=30
PORT="${PORT:-3000}"

while ! curl -s "http://localhost:$PORT" > /dev/null 2>&1; do
  ATTEMPTS=$((ATTEMPTS + 1))
  if [[ $ATTEMPTS -ge $MAX_ATTEMPTS ]]; then
    echo "Server failed to start within ${MAX_ATTEMPTS}s"
    ./scripts/dev.sh stop
    exit 1
  fi
  sleep 1
done

echo "Server ready. Running tests..."

# Run Cypress
set +e
npx cypress run $CYPRESS_ARGS
TEST_EXIT=$?
set -e

# Stop dev server
./scripts/dev.sh stop

exit $TEST_EXIT
