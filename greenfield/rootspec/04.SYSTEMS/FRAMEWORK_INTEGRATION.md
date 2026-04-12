# Level 4: Framework Integration System
# RootSpec Marketing Site

## Responsibility

The Framework Integration System handles all build-time concerns: reading project configuration, injecting values into the build output, and producing the static site artifact. It has no runtime presence beyond the values it injects during build.

## Data Owned

| Key | Source | Destination | Timing |
|-----|--------|-------------|--------|
| `version` | `.rootspec.json` → `version` field | Hero version badge, site header | Build time |
| `buildDate` | Build environment timestamp | Footer attribution | Build time |

## Build-Time Process

1. Read `.rootspec.json` from project root
2. Extract `version` field (string)
3. Inject `version` into the template/component that renders the version badge
4. Capture current UTC date at build time
5. Inject `buildDate` into the footer template
6. Static site generator produces final HTML with values baked in

## Rules

- Version must be read from `.rootspec.json` — it cannot be hardcoded in source
- If `version` field is missing or unreadable, the badge renders as "version unknown" — it does not error or crash the build
- `buildDate` is formatted as a human-readable date string (e.g., "April 12, 2026") — not an ISO timestamp
- FRAMEWORK_INTEGRATION writes nothing at runtime — all its work is done before the page serves
- No other config values from `.rootspec.json` are exposed to the page

## Interactions With Other Systems

| System | Interaction |
|--------|-------------|
| CONTENT_SYSTEM | Supplies `version` and `buildDate` as values that CONTENT_SYSTEM renders |
| All other systems | None — FRAMEWORK_INTEGRATION is build-time only; no runtime coupling |

## Stack Constraint

The static site generator must support:
- Reading JSON files at build time
- String interpolation into HTML/component templates
- Producing fully static output (no server-side rendering at request time)

The specific framework choice is an implementation detail; the system's contract is the above behavior.
