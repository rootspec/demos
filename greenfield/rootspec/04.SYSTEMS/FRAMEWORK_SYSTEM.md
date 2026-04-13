# Level 4: Framework System

*References: 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md*

## Responsibility

Manages the build framework, component model, development server, and asset pipeline. This system is the infrastructure layer that all other systems run on top of.

## Boundaries

- **Owns:** Build configuration, routing, component primitives, CSS pipeline, dev/build scripts
- **Does not own:** Content (CONTENT_SYSTEM), visual tokens (LAYOUT_SYSTEM), interactive state (INTERACTIVE_SYSTEM)
- **Provides to:** All other systems — the runtime environment and component API

## Technology Commitments

- **Static site framework:** Astro (island architecture; minimal JavaScript shipped by default)
- **UI components:** React (for interactive islands in INTERACTIVE_SYSTEM)
- **Styling:** Tailwind CSS (utility classes; CSS custom properties for theme tokens)
- **Language:** TypeScript throughout
- **Build output:** Static HTML + minimal JS; no server runtime required

*Rationale: Aligns with the "philosophy as foundation" pillar — Astro ships zero JavaScript for static content while enabling React islands for interactive features. The methodology site should itself demonstrate good architecture.*

## File Structure

```
greenfield/
├── src/
│   ├── components/         # Astro components (static sections)
│   ├── pages/              # Astro pages (index.astro is the single page)
│   ├── styles/             # Global CSS, Tailwind config
│   └── [interactive]/      # React component files (.tsx)
├── public/                 # Static assets
├── rootspec/               # Spec files (this directory)
├── .rootspec.json          # Framework config; version field
├── astro.config.mjs        # Astro configuration
├── tailwind.config.mjs     # Tailwind configuration
├── tsconfig.json           # TypeScript config
└── package.json
```

## Build Pipeline

1. **`/rs-init`** — Initializes `.rootspec.json`, rootspec directory, installs deps
2. **`/rs-spec`** — Writes spec files to `rootspec/`
3. **`/rs-impl`** — Implements application code in `src/`
4. **`/rs-validate`** — Runs Cypress tests against the running dev server

**Dev server command:** As configured in `.rootspec.json` `devCommand` field
**Build command:** As configured in `.rootspec.json` `buildCommand` field
**Test command:** Cypress; as configured in `.rootspec.json` `testCommand` field

## Version Data Access

The CONTENT_SYSTEM reads `.rootspec.json` at build time to extract the `version` field. In Astro, this happens in the frontmatter of the relevant `.astro` component:

```
// In .astro component frontmatter:
import rootspecConfig from '../../.rootspec.json';
const version = rootspecConfig.version;
```

The version is baked into the static HTML at build time — no runtime fetch.

## Component Model

- **Static sections:** Astro components (`.astro` files) — render to HTML, zero client JS
- **Interactive sections:** React components (`.tsx` files) — hydrated client-side via Astro islands
- **Props contract:** Astro components pass static data as props; React components manage their own state

## CSS Architecture

- Tailwind utility classes for layout and spacing
- CSS custom properties (`--color-*`, etc.) for theme tokens defined in global CSS
- THEME_SYSTEM's class on `<html>` switches token values via CSS selector override
- No CSS-in-JS; no styled-components

## Deployment

- Output: static HTML/CSS/JS files
- Hosting: any static host (GitHub Pages, Netlify, Vercel, etc.)
- No server-side runtime required
- CI/CD: a GitHub Actions workflow handles build → test → deploy pipeline
