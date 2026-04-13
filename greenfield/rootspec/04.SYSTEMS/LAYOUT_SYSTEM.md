# Level 4: Layout System

*References: 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md, THEME_SYSTEM.md*

## Responsibility

Manages the structural layout of the page: responsive grid, section sequencing, header and footer, typography scale, color tokens, and spacing. Renders content provided by CONTENT_SYSTEM into a coherent visual structure. Consumes theme state from THEME_SYSTEM.

## Boundaries

- **Owns:** CSS variables/tokens, page scaffold, section structure, responsive breakpoints, typography, header, footer
- **Does not own:** Content copy (CONTENT_SYSTEM), interactive component behavior (INTERACTIVE_SYSTEM), theme state (THEME_SYSTEM)
- **Provides to:** All other systems — the base visual environment they operate within

## Page Structure

```
<html class="dark|light">
  <head> [theme detection script, fonts, global CSS] </head>
  <body>
    <Header> [logo, nav, theme toggle, version badge] </Header>
    <main>
      <MetaBanner />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <HierarchySection />    [contains HierarchyExplorer interactive component]
      <WizardSection />       [contains SpecWizard interactive component]
      <ComparisonSection />   [contains BeforeAfter interactive component]
      <CTASection />
    </main>
    <Footer />
  </body>
</html>
```

## Header

- Fixed or sticky at top of viewport
- Contains: site wordmark/logo, primary nav (anchor links to sections), theme toggle button, version badge
- Responsive: collapses gracefully on mobile (no hamburger menu required if anchors fit)
- Height: `[header height]`

## Color Tokens

All colors defined as CSS custom properties on `:root`. THEME_SYSTEM's class on `<html>` overrides tokens for dark mode:

| Token | Purpose |
|-------|---------|
| `--color-bg` | Page background |
| `--color-surface` | Card/panel background |
| `--color-text-primary` | Primary body text |
| `--color-text-secondary` | Secondary/muted text |
| `--color-accent` | Brand accent (links, highlights, buttons) |
| `--color-border` | Dividers and borders |
| `--color-code-bg` | Inline code background |

## Typography Scale

| Name | Usage |
|------|-------|
| `text-hero` | Hero headline |
| `text-h1` | Section headings |
| `text-h2` | Subsection headings |
| `text-body` | Default body copy |
| `text-small` | Captions, meta text |
| `text-code` | Inline code, technical labels |

Font stack: system UI font or a single loaded sans-serif. No decorative fonts. Code elements use monospace system stack.

## Responsive Breakpoints

| Name | Min Width | Layout change |
|------|-----------|---------------|
| `sm` | [small breakpoint] | Single column, stacked sections |
| `md` | [medium breakpoint] | Two-column layouts enabled |
| `lg` | [large breakpoint] | Full layout, max-width container |

Max content width: `[max content width]`; centered with horizontal padding.

## Section Spacing

Each section separated by consistent vertical rhythm:
- Section padding top/bottom: `[section vertical padding]`
- Inner content max-width constrained for readability

## Animation

- Scroll-triggered fade-in on sections: opacity 0 → 1 as section enters viewport
- Animation duration: `[animation duration]`
- Respect `prefers-reduced-motion`: no animations if user prefers reduced motion

## Footer

- Attribution: site builder name and build date
- Framework version
- Links: GitHub repo
- Simple single-row layout on desktop; stacked on mobile
