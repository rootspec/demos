# Level 4: Layout System

## Responsibility

Page structure, section ordering, scroll behavior, navigation indicators, and responsive layout. The container that everything else lives inside.

## Page Structure

The page is a single vertical scroll with ordered sections:

| Order | Section | Content System Owner |
|-------|---------|---------------------|
| 1 | Header | Site title, version badge, theme toggle, nav links |
| 2 | Hero | Tagline, one-sentence explanation |
| 3 | Meta Banner | "This site is a RootSpec demo" with links |
| 4 | The Problem | Pain points section |
| 5 | How It Works | Four-skill walkthrough |
| 6 | Hierarchy Explorer | Interactive five-level visualization |
| 7 | Spec Wizard | Interactive "Spec Your Idea" |
| 8 | Before/After | Interactive comparison |
| 9 | Open Source CTA | GitHub, getting started, community |
| 10 | Footer | Links, credits |

## Scroll Behavior

- Smooth scroll enabled for in-page navigation links
- Sections animate on entry (slide/fade) when they enter the viewport
- Animation respects `prefers-reduced-motion` — if enabled, sections appear without animation
- Scroll position tracked for navigation indicator

## Navigation

- Minimal header with section jump links
- Optional floating nav dot indicator on the side (desktop only)
- Header collapses or becomes sticky on scroll

## Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| < [small-breakpoint] | Single column, stacked sections, hamburger nav |
| [small-breakpoint] – [large-breakpoint] | Two-column where appropriate, simplified interactives |
| > [large-breakpoint] | Full layout, side-by-side comparisons, full interactives |

## Data Attributes

- `data-section="<section-name>"` on each section container
- `data-visible="true|false"` toggled by intersection observer
- `data-test="<element-name>"` on all testable elements
