# Level 4: Framework System

**System:** FRAMEWORK_SYSTEM
**References:** L1-3, Sibling L4, External

---

## Responsibility

Provides build-time data that connects the site to the RootSpec framework version and source code. Reads `.rootspec.json` at build time to extract the framework version. Constructs GitHub repository URLs. Has no runtime behavior.

---

## Data Owned

- **version:** The RootSpec framework version string read from `.rootspec.json` (the `version` field)
- **repo_base_url:** The GitHub URL base for this demo's spec and seed files: `https://github.com/rootspec/demos/tree/main/greenfield`
- **framework_repo_url:** The RootSpec framework GitHub URL: `https://github.com/rootspec/rootspec`

---

## Build-Time Behavior

1. At build time, read `.rootspec.json` from the project root
2. Extract the `version` field
3. If the file is missing or the field is absent, use a fallback indicator (e.g., `"unknown"`) and emit a build warning
4. Pass the version string and URLs as Astro props or component constants to:
   - The header component (version badge)
   - The hero section (version display)
   - The meta banner (links to spec and seed)
   - The CTA section (framework repo link)

---

## Boundaries

- Operates only at build time — no runtime file reads, no API calls
- Does not own the visual rendering of version or links (CONTENT_SYSTEM and LAYOUT_SYSTEM own that)
- Does not own the GitHub repository itself

---

## Interactions with Other Systems

| System | Nature |
|--------|--------|
| CONTENT_SYSTEM | Supplies version string and GitHub URLs as build-time props |
| LAYOUT_SYSTEM | Supplies version string for header badge |

---

## Failure Handling

If `.rootspec.json` is unreadable at build time:
- Build continues (not a fatal error)
- Version displays as `[version unknown]`
- GitHub links use the hardcoded base URL (still valid)
- A warning is logged to the build console
