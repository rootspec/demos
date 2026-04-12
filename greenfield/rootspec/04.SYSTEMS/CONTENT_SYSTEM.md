# L4: Content System

## Responsibility

Owns all static page content: copy, section order, meta banner, hero, problem statement, how-it-works walkthrough, before/after panel content, and the footer attribution. Renders content into the page in the correct sequence.

## Boundaries

- Owns: All written copy and structured content data
- Does not own: Theme state, interactive widget state, layout decisions
- Does not call: Any external services or APIs
- Receives from: FRAMEWORK_INTEGRATION — the RootSpec version string at build time

## Data Ownership

| Data | Format | Source |
|------|--------|--------|
| Meta banner copy | Inline string with template slot for version | Hardcoded with version injected at build |
| Hero tagline and subhead | Short strings | Hardcoded |
| Problem section copy | Structured list + prose | Hardcoded |
| How It Works steps | Ordered array of {step, title, description} | Hardcoded |
| Before/After panel content | Two structured objects with labeled fields | Hardcoded |
| Footer attribution | Builder name + build date | Builder name hardcoded; date from build time |
| GitHub links (seed, spec) | URLs to repo files | Hardcoded to repo paths |

## Key Behaviors

- The meta banner renders above the fold on all screen sizes. It is not dismissable.
- GitHub links in the meta banner point to the actual SEED.md and rootspec/ directory in the repository.
- The footer names the builder (Claude, built with RootSpec) and the build date.
- Before/After panel content uses real, representative copy — no lorem ipsum.
- Version string passed from FRAMEWORK_INTEGRATION appears in the meta banner and is forwarded to LAYOUT_SYSTEM for the version badge.

## Interactions with Other Systems

- **→ LAYOUT_SYSTEM:** Provides section list and order; section content determines scroll regions
- **← FRAMEWORK_INTEGRATION:** Receives version string at build time for injection into meta banner
