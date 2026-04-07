#!/usr/bin/env bash
# Pre-commit hook for RootSpec projects
# Validates specification and runs basic checks

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "Running pre-commit checks..."

# Check if rootspec directory exists
if [[ ! -d "$PROJECT_ROOT/rootspec" ]]; then
  echo "Warning: No rootspec directory found"
  exit 0
fi

# Run spec validation if available
if command -v npx >/dev/null 2>&1; then
  echo "Validating RootSpec..."
  cd "$PROJECT_ROOT"
  npx @rootspec/skills validate-spec || {
    echo "Spec validation failed. Fix issues before committing."
    exit 1
  }
fi

echo "Pre-commit checks passed"