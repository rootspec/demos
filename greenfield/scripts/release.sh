#!/usr/bin/env bash
# release.sh — Release script for RootSpec projects
# Usage: ./scripts/release.sh [patch|minor|major]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

VERSION_TYPE="${1:-patch}"

if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
  echo "Usage: $0 [patch|minor|major]"
  exit 1
fi

echo "🚀 Creating $VERSION_TYPE release..."

# Ensure clean working directory
if [[ -n "$(git status --porcelain)" ]]; then
  echo "❌ Working directory not clean. Commit or stash changes first."
  exit 1
fi

# Ensure we're on main/master branch
BRANCH=$(git branch --show-current)
if [[ "$BRANCH" != "main" && "$BRANCH" != "master" ]]; then
  echo "❌ Not on main/master branch. Switch to main branch first."
  exit 1
fi

# Run validation
echo "Running validation..."
if command -v npx >/dev/null 2>&1; then
  npx skills run rs-validate || {
    echo "❌ Validation failed. Fix issues before release."
    exit 1
  }
else
  echo "⚠️  npx not available, skipping validation"
fi

# Bump version
if [[ -f "package.json" ]] && command -v npm >/dev/null 2>&1; then
  echo "Bumping package.json version..."
  npm version "$VERSION_TYPE" --no-git-tag-version
  NEW_VERSION=$(node -p "require('./package.json').version")
else
  echo "⚠️  No package.json or npm not available"
  NEW_VERSION="$(date +%Y%m%d%H%M%S)"
fi

# Create commit and tag
echo "Creating release commit and tag..."
git add -A
git commit -m "Release v$NEW_VERSION" || echo "No changes to commit"
git tag "v$NEW_VERSION"

echo "✅ Release v$NEW_VERSION created!"
echo "Push with: git push origin main --tags"