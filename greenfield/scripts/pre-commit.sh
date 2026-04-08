#!/usr/bin/env bash
# pre-commit.sh — Pre-commit hook for RootSpec projects
# Runs spec validation before commits

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

echo "🔍 Running pre-commit checks..."

# Run spec validation if rootspec exists
if [[ -f "rootspec/spec-status.json" ]]; then
  echo "Validating RootSpec..."
  if command -v npx >/dev/null 2>&1; then
    npx skills run rs-validate --quiet || {
      echo "❌ Spec validation failed. Fix issues before committing."
      exit 1
    }
  else
    echo "⚠️  npx not available, skipping spec validation"
  fi
fi

echo "✅ Pre-commit checks passed"