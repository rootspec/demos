#!/usr/bin/env bash
# Release script for RootSpec projects
# Handles versioning and release coordination

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

VERSION_TYPE="${1:-patch}"

echo "Preparing release (version bump: $VERSION_TYPE)..."

cd "$PROJECT_ROOT"

# Bump version in package.json
if command -v npm >/dev/null 2>&1; then
  npm version "$VERSION_TYPE" --no-git-tag-version
  NEW_VERSION=$(node -p "require('./package.json').version")
  echo "Version bumped to $NEW_VERSION"
else
  echo "npm not found, skipping version bump"
  NEW_VERSION="unknown"
fi

# Update RootSpec version if spec exists
if [[ -f "rootspec/spec-status.json" ]]; then
  echo "Updating RootSpec version..."
  # Update the version in spec-status.json
  sed -i.bak "s/\"version\": \"[^\"]*\"/\"version\": \"$NEW_VERSION\"/" rootspec/spec-status.json
  rm -f rootspec/spec-status.json.bak
fi

echo "Release preparation complete"
echo "Next steps:"
echo "1. Review changes: git diff"
echo "2. Commit: git add . && git commit -m 'Release $NEW_VERSION'"
echo "3. Tag: git tag v$NEW_VERSION"
echo "4. Push: git push && git push --tags"