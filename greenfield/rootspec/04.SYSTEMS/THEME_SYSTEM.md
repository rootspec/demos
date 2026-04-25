# Level 4: Theme System

References: [01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md]

## Responsibility

The Theme System owns all visual tokens, typography configuration, and light/dark mode state for the site. Every other system consumes the tokens this system exposes — no system should define raw color values or typographic properties directly.

This system does NOT own:
- Component layout (owned by LAYOUT_SYSTEM)
- Content or copy (owned by CONTENT_SYSTEM)
- Interactive behavior of components (owned by respective component systems)

## Visual Design Direction

The site's aesthetic is **editorial-meets-technical**: a long-form essay site crossed with developer documentation. Not a SaaS landing page. Not a startup pitch site. The reader should feel they've arrived at a place where someone thinks, not a place where someone sells.

Visual quality is part of the product argument — a polished, considered aesthetic signals the methodology produces real results.

## Typography

### Type Roles

| Role | Purpose | Example Usage |
|------|---------|---------------|
| Serif | Body copy, prose, long-form reading | Author's Notes, Problem section, explanatory paragraphs |
| Sans-serif | UI elements, navigation, labels, headings | Header, section titles, button labels, meta banner |
| Monospace | Code, commands, skill names | `/rs-init`, `/rs-spec`, code examples |

### Typeface Choices

- **Serif body:** Source Serif, Newsreader, Charter, or similar high-quality editorial serif
- **Sans-serif UI:** Inter, IBM Plex Sans, or similar clean humanist sans
- **Monospace:** JetBrains Mono, IBM Plex Mono, or similar developer-friendly mono

### Typographic Scale

Generous, editorial. Comfortable line lengths for prose (up to [editorial line length]) are appropriate — readers expect them in essay contexts.

## Color Palette

### Restrained palette — two to three colors plus neutrals

- **Primary neutral (light mode):** Near-white background, near-black text
- **Primary neutral (dark mode):** Near-black background, near-white text
- **One accent color:** Used sparingly — interactive states, hover, focus, emphasis; not decorative
- **No gradients, glassmorphism, glows, or decorative effects**

### Light/Dark Mode

- **Light mode is the default** — editorial sites read better in light, and defaulting to dark signals AI-generated aesthetics
- **Dark mode** is a toggle override, not the default preference
- System preference (`prefers-color-scheme`) is detected on load and used as the initial state if no session override is set
- Session override (manual toggle) takes precedence over system preference for the duration of the session

### Token Structure

All color values are exposed as CSS custom properties consumed by all systems:

```
--color-bg          Background
--color-text        Primary text
--color-text-muted  Secondary / caption text
--color-accent      Accent / interactive emphasis
--color-border      Dividers and borders
--color-surface     Slightly elevated surface (cards, banners)
--color-code-bg     Code block background
```

## Motion

- **Mechanical, not magical** — transitions should feel like tool interactions, not entertainment
- **Duration range:** [quick transition] to [standard transition]; avoid anything that feels slow or springy
- **Easing:** ease-out — quick start, smooth stop; no bounce, no spring
- **No parallax, no scroll-triggered animations, no flourish**
- Theme switching applies all tokens simultaneously in one [quick transition]

## Anti-patterns

Explicitly prohibited visual patterns:
- Hero sections with massive gradient text on dark backgrounds
- Three-column feature grids with icons
- Testimonial cards
- Stat counters
- Gradient blobs or decorative background effects
- Stock illustrations
- Anything that resembles a Vercel or shadcn template

## State Managed by This System

| State | Type | Persistence |
|-------|------|-------------|
| Current theme (light/dark) | Enum: light, dark | Session-ephemeral |
| System preference detected | Boolean | Read-only, not stored |
| User has manually toggled | Boolean | Session-ephemeral |

### State Transitions

- On load: apply system preference unless session override exists
- On toggle: flip current theme; mark user-has-manually-toggled as true
- Session ends: state resets; system preference re-applies on next load

## Interfaces Exposed to Other Systems

- CSS custom properties (all tokens) applied to `:root` — consumed by all systems via Tailwind or direct CSS
- Theme class (`data-theme="light"` or `data-theme="dark"`) on the root element — consumed by LAYOUT_SYSTEM
