# Level 4: Presentation System

## Responsibility

Owns all visual design tokens: typography, color palette, spacing, and motion parameters. No system uses raw color or spacing values — all styling is expressed through tokens defined here.

## Typography

**Roles:**
- **Body / prose:** High-quality serif (e.g., Source Serif, Newsreader, or Charter). Used for all running text, the Author's Notes section, and the Problem/How It Works prose. Signals essay-quality writing.
- **UI / labels:** Clean sans-serif (e.g., Inter or IBM Plex Sans). Used for navigation, section headings, button labels, meta-banner, and wizard UI chrome.
- **Code / commands:** Monospace (e.g., JetBrains Mono or IBM Plex Mono). Used for the four skill names (`/rs-init`, etc.), code examples, and the version badge.

**Scale:** Generous. Long line lengths are acceptable for prose sections — editorial context expects them.

## Color Palette

**Principle:** Restrained. Two or three colors plus neutrals. One accent color used sparingly.

**Token structure:**
- `--color-bg`: Page background
- `--color-surface`: Card/panel background (slightly offset from bg)
- `--color-text-primary`: Main body text
- `--color-text-secondary`: Metadata, labels, captions
- `--color-accent`: Interactive states, links, highlights — used sparingly
- `--color-border`: Dividers and component borders
- `--color-banner-bg`: Meta-banner background (slightly distinct from main bg)

**Light mode:** Light background (off-white, not pure white), dark text, one muted accent.
**Dark mode:** Dark background, light text, same accent (adjusted for contrast).

**Anti-patterns:** No gradients. No glassmorphism. No glow effects. No decorative color use.

## Spacing

**Principle:** Generous whitespace. Sections breathe. Content is not cramped.

**Token structure:**
- `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`, `--space-2xl`: Scale of spacing values
- Section padding uses `--space-xl` or `--space-2xl` top/bottom
- Paragraph spacing is generous within prose sections

## Motion

**Principle:** Mechanical, not magical. Transitions are functional signals, not entertainment.

- **Duration:** [short transition duration] for expand/collapse, toggle, and state changes
- **Easing:** ease-out — quick start, gentle stop
- **No spring physics, no parallax, no scroll-triggered animations**
- **Theme switch:** Instant — no transition on color swap

## SVG Diagram (RootSpec Methodology)

The site includes one SVG diagram depicting the RootSpec methodology: a spec surrounding the development cycle, allowing only valid solutions to pass through.

**Design requirements:**
- Clear linework, intentional spacing — looks drawn, not generated
- No clip-art icons, no Visio-style chrome
- Monochrome or two-color — no decorative palette
- Scales correctly in both light and dark modes (uses `currentColor` or CSS variables)
- Inline SVG preferred (avoids separate HTTP request; inherits CSS variables)

## Responsive Strategy

- **Mobile-first:** Base styles target mobile; breakpoints add desktop layout
- **Typography:** Font sizes scale down on small screens; line lengths shorten
- **Interactive components:** Explorer and Wizard are touch-friendly at all screen widths
- **Comparison panels:** Stack vertically on mobile, side by side on desktop
- **Navigation:** Collapses to compact form on mobile

## Interactions with Other Systems

- Provides CSS custom property tokens consumed by all other systems
- Receives theme state from THEME_SYSTEM (applied as class or data attribute on `<html>`)
- All visual styling in INTERACTIVE_SYSTEM, LAYOUT_SYSTEM, and CONTENT_SYSTEM uses tokens from this system
