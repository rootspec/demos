# System: Layout System

> References: L1 (01.PHILOSOPHY.md), L2 (02.TRUTHS.md), L3 (03.INTERACTIONS.md)
> Interacts with: CONTENT_SYSTEM, INTERACTIVE_SYSTEM, THEME_SYSTEM, PRESENTATION_SYSTEM

## Responsibility

Owns the page shell: HTML document structure, `<head>`, navigation header, footer, section grid, and responsive breakpoints. All page sections are composed inside the Layout.

## Components

- `Layout.astro` — Root layout: `<html>`, `<head>`, meta tags, theme script, slot for page content
- `Header.astro` — Site navigation, version badge, theme toggle button
- Page-level grid in `src/pages/index.astro` — arranges all sections in order

## Base Path Configuration

All asset URLs and internal links must use Astro's `base` config set to `/demos/greenfield/`. This ensures correct resolution when served from the GitHub Pages subpath.

## Responsive Breakpoints

Standard Tailwind breakpoints:
- Mobile: default (< 768px)
- Tablet: `md:` (≥ 768px)
- Desktop: `lg:` (≥ 1024px)

All interactive features must be functional and touch-friendly at mobile breakpoint.

## Data Owned

- Page metadata (title, description, OG tags) — injected per-page via Layout props
- Navigation items — static array in Header component
- Footer attribution — builder name and build date (injected at build time)

## Boundaries

- Does NOT own section content (CONTENT_SYSTEM)
- Does NOT own theme state (THEME_SYSTEM), but renders the toggle button
- Does NOT own interactive widget logic (INTERACTIVE_SYSTEM)
- Provides the structural frame; all other systems slot into it
