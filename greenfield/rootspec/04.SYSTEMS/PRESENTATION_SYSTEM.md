# Level 4: Presentation System

## Responsibility

Handles build-time data injection: reads the RootSpec version from `.rootspec.json`, constructs the absolute GitHub base URL for the repo, and makes these values available as constants to the rest of the build. Operates entirely at build time — has no runtime state.

## Boundaries

- **Owns:** `.rootspec.json` parsing, version string derivation, absolute GitHub URL construction
- **Does not own:** Theme, layout, interactive state, section content
- **Operates at:** Build time only; no runtime behavior
- **Does not call:** Any external APIs — all data is read from local config files

## Data Structures

### Build-Time Constants

```
presentation_constants:
  rootspec_version: string (e.g., "7.3.7") — read from .rootspec.json `version` field
  github_base_url: string — absolute URL to the greenfield directory in the demos repo
    e.g., "https://github.com/rootspec/demos/tree/main/greenfield"
  seed_url: string — absolute URL to SEED.md
    e.g., "https://github.com/rootspec/demos/tree/main/greenfield/SEED.md"
  spec_url: string — absolute URL to rootspec/ directory
    e.g., "https://github.com/rootspec/demos/tree/main/greenfield/rootspec"
  build_date: string — ISO 8601 date string at build time
```

## Rules

- If `.rootspec.json` is missing or the `version` field is absent, `rootspec_version` defaults to `"unknown"` — the build must not fail
- All GitHub URLs are constructed as absolute URLs; relative paths are forbidden (they break the static prerenderer)
- `build_date` is the date at the time the build runs, not a hardcoded value
- The version string is injected into the hero section and/or header — it must not be hardcoded in templates
- No runtime JavaScript is needed for this system; values are embedded in the rendered HTML at build time

## Injection Points

PRESENTATION_SYSTEM provides values to:

| Target | Value Injected |
|--------|---------------|
| Hero section | `rootspec_version` (displayed as version badge) |
| Header | `rootspec_version` (optional, if header includes version) |
| Meta Banner | `seed_url`, `spec_url` (linked in banner copy) |
| Footer | `build_date` (attribution footer) |

## Interactions with Other Systems

- **PRESENTATION_SYSTEM** → **CONTENT_SYSTEM**: Injects version string and GitHub URLs into content templates at build time
- No runtime interaction with any other system
