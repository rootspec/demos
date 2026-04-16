# System: Content System

> References: L1 (01.PHILOSOPHY.md), L2 (02.TRUTHS.md), L3 (03.INTERACTIONS.md)
> Interacts with: LAYOUT_SYSTEM, THEME_SYSTEM, PRESENTATION_SYSTEM

## Responsibility

Owns all static page sections and their copy. Renders each marketing section as an Astro component. Injects build-time data (version number, GitHub URLs) into the appropriate sections.

## Sections Owned

| Section | Component | Key Content |
|---------|-----------|-------------|
| Meta Banner | `MetaBanner.astro` | Demo framing, links to spec and seed on GitHub |
| Hero | `HeroSection.astro` | Tagline, one-line explanation, version badge |
| Problem | `ProblemSection.astro` | Four pain points from L1 |
| How It Works | `WorkflowSection.astro` | Four-skill walkthrough |
| CTA | `CTASection.astro` | GitHub link, getting started |
| Footer | (inline in Layout) | Builder attribution, build date |

## Data Ownership

- **Version string** — Read from `.rootspec.json` at build time; passed as prop to Header and Hero
- **GitHub URLs** — Hardcoded absolute URLs in MetaBanner; must use `https://github.com/rootspec/demos/tree/main/greenfield`
- **Section copy** — Static strings in each component; no CMS or i18n

## Boundaries

- Does NOT own theme state (THEME_SYSTEM)
- Does NOT own interactive widget state (INTERACTIVE_SYSTEM)
- Does NOT own layout grid (LAYOUT_SYSTEM)
- Reads version at build time from `.rootspec.json` — no runtime file access

## Build-Time Injection

```astro
---
import rootspecConfig from '../../.rootspec.json';
const version = rootspecConfig.version;
---
```

This pattern is used in any component that displays the version badge.
