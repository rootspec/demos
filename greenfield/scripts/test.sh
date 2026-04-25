#!/usr/bin/env bash
# Test runner — defaults to preview mode (built artifact + preview server).
# Override via .rootspec.json prerequisites.testMode = "dev".
set -euo pipefail

MODE=$(grep -o '"testMode"[^,}]*' .rootspec.json 2>/dev/null \
  | sed -E 's/.*"testMode"[[:space:]]*:[[:space:]]*"([^"]*)".*/\1/')
MODE="${MODE:-preview}"

if [[ "$MODE" == "dev" ]]; then
  ./scripts/dev.sh start
  trap "./scripts/dev.sh stop" EXIT
  export CYPRESS_BASE_URL="$(./scripts/dev.sh url)"
else
  npm run build
  ./scripts/preview.sh start
  trap "./scripts/preview.sh stop" EXIT
  export CYPRESS_BASE_URL="$(./scripts/preview.sh url)"
fi

npx cypress run --config-file cypress.config.ts 2>&1
