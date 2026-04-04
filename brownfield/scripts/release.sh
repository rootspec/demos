#!/usr/bin/env bash
# release.sh — Bump version, tag, and push
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

BUMP="${1:-patch}"

# Bump version in package.json
NEW_VERSION=$(npm version "$BUMP" --no-git-tag-version)
echo "Bumped to $NEW_VERSION"

# Commit and tag
git add package.json
git commit -m "release: $NEW_VERSION"
git tag "$NEW_VERSION"

echo "Tagged $NEW_VERSION. Push with: git push && git push --tags"
