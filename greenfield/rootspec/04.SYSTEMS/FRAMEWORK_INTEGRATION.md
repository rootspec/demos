# L4: Framework Integration

## Responsibility

Manages the build pipeline: reads `.rootspec.json` to extract the RootSpec version, passes it to other systems at build time, bundles assets, and produces the final static output. Has no runtime presence after the build completes.

## Boundaries

- Owns: Build configuration, static site generation, asset bundling, build-time data injection
- Does not own: Runtime state, content copy, theme logic, interactive behavior
- Reads at build time: `.rootspec.json` (version field)
- Produces: Static HTML, CSS, and JS artifacts consumed by all other systems

## Key Behaviors

- Reads `version` from `.rootspec.json` at build time and makes it available as a build-time variable or injected constant
- Version is passed to CONTENT_SYSTEM (meta banner) and LAYOUT_SYSTEM (version badge)
- Build completes without manual intervention — the four RootSpec commands are sufficient
- No server-side runtime; output is purely static files deployable to any CDN/static host
- TypeScript compilation (if applicable) happens at build time; no runtime transpilation
- CSS is bundled and minified; JS is bundled and tree-shaken

## Technology Assumptions

The framework is selected during `/rs-impl` based on the project setup. This system's responsibility does not change regardless of the specific framework (Astro, Next.js static export, Vite + vanilla, etc.). The constraint is: output must be static files with no server runtime requirement.

## Interactions with Other Systems

- **→ CONTENT_SYSTEM:** Injects version string into meta banner copy
- **→ LAYOUT_SYSTEM:** Provides version string for version badge rendering
- No runtime interactions — this system's work is complete at build time
