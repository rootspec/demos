# Level 4: Theme System

## Responsibility

Owns all visual design tokens: color palette, typography, spacing scale, motion parameters, and the dark/light theme mechanism. Every visible element on the site derives its appearance from tokens defined here.

## Boundaries

**Owns:**
- Color palette (background, foreground, accent, muted variants) for both light and dark modes
- Typography stack (serif for body, sans-serif for UI, monospace for code)
- Spacing scale (used by layout and content)
- Motion parameters (transition duration and easing for theme switches and interactive elements)
- Theme preference detection and storage
- CSS custom properties that all other systems consume

**Does not own:**
- Layout structure (LAYOUT_SYSTEM)
- Component behavior (INTERACTIVE_SYSTEM)
- Content (CONTENT_SYSTEM)

## Data Ownership

### Theme State

- `currentTheme`: `light` | `dark`
- `themeSource`: `system` | `manual`
- On first visit: system preference is used
- On manual toggle: preference is stored for the session

### Color Palette

Two palettes — light and dark — each defining:
- `--color-bg`: page background
- `--color-fg`: primary text
- `--color-muted`: secondary text, captions
- `--color-accent`: emphasis, interactive states, links
- `--color-surface`: card/section backgrounds slightly offset from bg
- `--color-border`: dividers, input borders

Design constraints (from L1 philosophy and L2 truths):
- Light mode is the default — background is near-white, text is near-black
- Restrained palette: two or three colors maximum plus neutrals
- Accent color used sparingly — for emphasis and interactive states only
- No gradients, no glassmorphism, no glow effects

### Typography

- **Body / Prose:** High-quality serif (Source Serif 4, Newsreader, or equivalent) — signals essay-quality writing
- **UI / Navigation / Labels:** Clean sans-serif (Inter, IBM Plex Sans, or equivalent)
- **Code / Commands / Skill names:** Monospace (JetBrains Mono, IBM Plex Mono, or equivalent)
- Line length for prose: generous — editorial reading width, not narrow column
- Font sizes: defined as a scale; actual values live in L5 fine-tuning

### Motion Parameters

- Theme transition: background and text colors only — layout elements do not shift
- Expand/collapse animations: height transition, [short duration]
- Interactive state changes: [brief duration] ease-out
- No spring animations, no parallax
- Transitions are functional, not decorative — within a short, perceptible range (see L5 fine-tuning for exact values)

## State Transitions

```
System preference detected → theme = system default
User clicks toggle → theme = opposite, source = manual
Page reload → if source = manual, restore manual preference; else re-detect system
```

## Interactions with Other Systems

| System | Interaction |
|--------|-------------|
| All systems | Consume CSS custom properties defined by THEME_SYSTEM |
| LAYOUT_SYSTEM | Theme toggle control is rendered in the header by LAYOUT_SYSTEM; THEME_SYSTEM provides the toggle logic |
| INTERACTIVE_SYSTEM | Interactive components use accent color for focus states, active states |

## Rules

- No system other than THEME_SYSTEM defines color or typography tokens
- Theme switch must not cause layout shift — only color values transition
- System preference is detected via `prefers-color-scheme` media query
- Manual preference overrides system preference for the duration of the session
- All interactive states (hover, focus, active) must maintain accessible contrast ratios
