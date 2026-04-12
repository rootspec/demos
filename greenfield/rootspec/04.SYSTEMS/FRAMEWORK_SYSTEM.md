# Level 4: Framework System

**System:** FRAMEWORK_SYSTEM
**Last Updated:** 2026-04-12

---

## Responsibility

The Framework System owns the build pipeline, static site generation, development server, and deployment configuration. It is the bridge between the spec and the running application. It reads build-time configuration (`.rootspec.json`, `package.json`) and makes derived values (like the RootSpec version string) available to other systems at build time.

---

## Boundaries

- **Owns:** Build scripts, static generation configuration, development server, asset pipeline, deployment config
- **Does not own:** Content copy, interactive behavior, theme state, layout structure
- **Reads at build time:** `.rootspec.json` (version field), `package.json` (project metadata)
- **Provides at build time:** Version string → LAYOUT_SYSTEM (version badge), CONTENT_SYSTEM (footer)

---

## Build-Time Data

| Source | Field | Consumed by | Purpose |
|--------|-------|-------------|---------|
| `.rootspec.json` | `version` | LAYOUT_SYSTEM, CONTENT_SYSTEM | Display current RootSpec version in header and footer |
| `package.json` | `name`, `version` | Build metadata | Internal build identification |

---

## Static Generation

The site is statically generated. All pages are pre-rendered to HTML at build time. There are no server-side routes, no API endpoints, and no database queries.

**Rationale:** Enforces the "no external API calls" inviolable principle. Maximizes performance and availability. Simplifies deployment to any static host.

---

## Development Server

The development server is configured in `scripts/dev.sh`. It serves the static output with hot reload during development. The server is local-only and not used in production.

---

## Asset Pipeline

- **JavaScript:** Bundled and tree-shaken at build time. Interactive sections load as lightweight client-side modules.
- **CSS:** Custom properties for theming; critical CSS inlined in `<head>` to prevent flash of unstyled content.
- **SVG diagrams:** Treated as source files; inlined or referenced depending on usage context.
- **Images:** Optimized at build time. No images from external CDNs at runtime.

---

## Deployment

The build output is a static directory. It can be served from any static hosting provider (GitHub Pages, Netlify, Vercel, S3). The CI/CD pipeline (`.github/workflows/validate-deploy.yml`) handles build and deployment on push to the main branch.

---

## Configuration Files

| File | Purpose |
|------|---------|
| `.rootspec.json` | RootSpec version and spec directory configuration |
| `package.json` | Project scripts and dependencies |
| `scripts/dev.sh` | Development server management |
| `scripts/test.sh` | Test runner (Cypress) |
| `scripts/release.sh` | Release workflow |

---

## Framework Choice

The specific static site framework is selected at implementation time based on the CONVENTIONS files. Candidate frameworks for greenfield static marketing sites include Astro, Next.js (static export), and SvelteKit (static adapter). The choice is constrained by: no server-side runtime, good support for component-based architecture, and straightforward build-time data injection.
