#!/usr/bin/env bash
# pre-commit.sh — Git pre-commit hook for spec validation
# Install: cp scripts/pre-commit.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
# Or use husky: npx husky add .husky/pre-commit './scripts/pre-commit.sh'

set -euo pipefail

echo "Running pre-commit checks..."

# Check if spec files were modified
SPEC_CHANGED=$(git diff --cached --name-only | grep '^rootspec/' || true)

if [[ -n "$SPEC_CHANGED" ]]; then
  echo "Spec files changed — running validation..."
  # TODO: Add spec validation command once /rs-validate is configured
  # Example: npx rootspec validate
  echo "Spec validation: skipped (not yet configured)"
fi

# Run tests if available
if [[ -f "package.json" ]] && grep -q '"test"' package.json 2>/dev/null; then
  echo "Running tests..."
  npm test
else
  echo "Tests: skipped (no test script found)"
fi

echo "Pre-commit checks passed"
