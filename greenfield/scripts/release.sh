#!/usr/bin/env bash
# Simple release — tag and push
set -euo pipefail

VERSION=${1:?Usage: ./scripts/release.sh <version>}

echo "Releasing v${VERSION}..."
git tag -a "v${VERSION}" -m "Version ${VERSION}"
git push origin "v${VERSION}"
echo "Released v${VERSION}"
