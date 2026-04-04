#!/usr/bin/env bash
# release.sh — Version bump, tag, and push
# Usage: ./scripts/release.sh [major|minor|patch]

set -euo pipefail

BUMP="${1:-patch}"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

# Bump version in package.json
npm version "$BUMP" --no-git-tag-version

VERSION=$(node -p "require('./package.json').version")

# Update spec version if rootspec.json exists
if [[ -f .rootspec.json ]]; then
  node -e "
    const fs = require('fs');
    const cfg = JSON.parse(fs.readFileSync('.rootspec.json', 'utf8'));
    cfg.version = '$VERSION';
    fs.writeFileSync('.rootspec.json', JSON.stringify(cfg, null, 2) + '\n');
  "
fi

git add -A
git commit -m "release: v$VERSION"
git tag "v$VERSION"

echo "Released v$VERSION"
echo "Run 'git push && git push --tags' to publish."
