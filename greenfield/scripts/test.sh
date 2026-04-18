#!/usr/bin/env bash
# Test runner — starts dev server, runs Cypress, stops server
set -euo pipefail
./scripts/dev.sh start
npx cypress run --config-file cypress.config.ts 2>&1
EXIT_CODE=$?
./scripts/dev.sh stop
exit $EXIT_CODE
