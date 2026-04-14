# Level 4: Framework System

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md

---

## Responsibility

Owns all references to the RootSpec framework itself: the version number (read from `.rootspec.json` at build time), and the canonical GitHub URLs for the framework repository, this demo repository, the spec files, and the seed file. Other systems import these values — they never hardcode them.

---

## Data Owned

| Data Point          | Source                          | Used By                                    |
|---------------------|---------------------------------|--------------------------------------------|
| `version`           | `.rootspec.json` → `version` field | CONTENT_SYSTEM (hero badge, footer), LAYOUT_SYSTEM (header badge) |
| `frameworkRepoUrl`  | Hardcoded in FRAMEWORK_SYSTEM   | CONTENT_SYSTEM (CTA section)               |
| `demosRepoUrl`      | Hardcoded in FRAMEWORK_SYSTEM   | CONTENT_SYSTEM (meta-banner)               |
| `specFileUrl`       | Derived from demosRepoUrl + path | CONTENT_SYSTEM (meta-banner "View spec →") |
| `seedFileUrl`       | Derived from demosRepoUrl + path | CONTENT_SYSTEM (meta-banner "View seed →") |

---

## Canonical URLs

```
frameworkRepoUrl = "https://github.com/rootspec/rootspec"
demosRepoUrl     = "https://github.com/rootspec/demos/tree/main/greenfield"
specFileUrl      = "https://github.com/rootspec/demos/tree/main/greenfield/rootspec"
seedFileUrl      = "https://github.com/rootspec/demos/tree/main/greenfield/SEED.md"
```

---

## Version Sourcing

At build time:
1. Read `.rootspec.json` from the project root
2. Extract the `version` field
3. Expose as a build-time constant available to all components

If `.rootspec.json` is missing or the `version` field is absent, use `"unknown"` as the fallback — do not fail the build.

---

## Interfaces

- **Reads at build time:** `.rootspec.json` (version field only)
- **Exports to CONTENT_SYSTEM:** `version`, `frameworkRepoUrl`, `demosRepoUrl`, `specFileUrl`, `seedFileUrl`
- **Exports to LAYOUT_SYSTEM:** `version` (for header/hero version badge)

---

## Rules

- No runtime reads — `.rootspec.json` is read at build time only
- All GitHub URLs are defined once in FRAMEWORK_SYSTEM, never duplicated in other files
- URL changes require updating only this system
- The `version` value must match `.rootspec.json` exactly — no reformatting or truncation
