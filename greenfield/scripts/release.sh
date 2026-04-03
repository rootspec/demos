#!/usr/bin/env bash
# release.sh — Version bump, tag, and release
# Usage: ./scripts/release.sh [major|minor|patch]

set -euo pipefail

BUMP="${1:-patch}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

# Ensure clean working tree
if [[ -n "$(git status --porcelain)" ]]; then
  echo "Error: working tree is not clean. Commit or stash changes first."
  exit 1
fi

# Get current version from package.json (if exists) or .rootspec.json
if [[ -f "package.json" ]]; then
  CURRENT=$(node -p "require('./package.json').version" 2>/dev/null || echo "0.0.0")
else
  CURRENT="0.0.0"
fi

# Parse semver
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT"

case "$BUMP" in
  major) MAJOR=$((MAJOR + 1)); MINOR=0; PATCH=0 ;;
  minor) MINOR=$((MINOR + 1)); PATCH=0 ;;
  patch) PATCH=$((PATCH + 1)) ;;
  *) echo "Usage: $0 [major|minor|patch]"; exit 1 ;;
esac

NEW_VERSION="$MAJOR.$MINOR.$PATCH"

echo "Bumping version: $CURRENT → $NEW_VERSION"

# Update package.json if it exists
if [[ -f "package.json" ]]; then
  npm version "$NEW_VERSION" --no-git-tag-version
fi

# Commit and tag
git add -A
git commit -m "release: v$NEW_VERSION"
git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION"

echo "Released v$NEW_VERSION"
echo "Run 'git push && git push --tags' to publish"
