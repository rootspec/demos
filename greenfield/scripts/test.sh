#!/usr/bin/env bash
# Validation/testing script for RootSpec projects
# Starts dev server and runs full test suite

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "Running validation tests..."

cd "$PROJECT_ROOT"

# Start dev server if not running
echo "Ensuring dev server is running..."
./scripts/dev.sh start

# Wait for server to be ready
echo "Waiting for server to be ready..."
timeout=30
while ! curl -sf http://localhost:4321 >/dev/null 2>&1; do
  sleep 1
  timeout=$((timeout - 1))
  if [[ $timeout -eq 0 ]]; then
    echo "Server failed to start within 30 seconds"
    exit 1
  fi
done

echo "Running Cypress tests..."
npm run cypress:run

echo "Validation complete"