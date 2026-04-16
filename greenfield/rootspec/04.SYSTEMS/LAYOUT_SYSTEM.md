# Layout System

**Version:** 7.3.2
**Status:** Draft

---

## Responsibility

Owns the responsive grid, section structure, scroll behavior, and base path configuration for the static deployment. Provides the structural shell that all content and interactive sections are rendered within.

## Boundaries

- **Owns:** Page structure, responsive breakpoints, section spacing, base path (`/demos/greenfield/`)
- **Does not own:** Content copy (CONTENT_SYSTEM), theme state (THEME_SYSTEM), component-level interaction state (INTERACTIVE_SYSTEM)

## Data Owned

| Data | Source | Mutability |
|------|--------|------------|
| Viewport width | Browser | Read-only (observed) |
| Scroll position | Browser | Read-only (observed) |
| Base path | Build config | Static |

## Layout Structure

```
<html>
  <head> (meta, styles, theme init script) </head>
  <body>
    <header> (logo, version badge, theme toggle, nav) </header>
    <main>
      <MetaBanner />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <HierarchyExplorerSection />
      <SpecWizardSection />
      <ComparisonSection />
      <CTASection />
    </main>
    <footer> (attribution, build date) </footer>
  </body>
</html>
```

## Responsive Behavior

| Breakpoint | Layout Changes |
|-----------|----------------|
| Mobile (narrow) | Single column; touch targets expanded; comparison shows one panel |
| Tablet (medium) | Two-column where appropriate; hierarchy explorer stacks |
| Desktop (wide) | Full layout; side-by-side comparison; hierarchy explorer grid |

## Base Path

The site is deployed to GitHub Pages at `/demos/greenfield/`. All asset URLs (CSS, JS, images/SVG), internal links, and the sitemap must be prefixed with this base path. The framework's base path configuration handles this at build time — not at runtime.

## Scroll Behavior

- Sections transition smoothly as the user scrolls
- Section entry animations are triggered by scroll position (delegated to PRESENTATION_SYSTEM)
- No horizontal scroll on any viewport size
- Header remains visible (sticky or fixed) so theme toggle and version badge are always accessible

## Rules

- No layout-level JavaScript that cannot degrade gracefully
- The base path must be set in framework config, not hardcoded in individual components
- Section order matches the narrative flow: meta → hero → problem → methodology → interactive → CTA

## Interactions with Other Systems

- **CONTENT_SYSTEM:** Provides the shell that content sections render within; does not control content
- **INTERACTIVE_SYSTEM:** Provides viewport size context; interactive components adapt their layout accordingly
- **PRESENTATION_SYSTEM:** Scroll positions are passed to PRESENTATION_SYSTEM for triggering section entry animations
- **THEME_SYSTEM:** Root element receives theme class before layout renders; no layout-specific theme logic
