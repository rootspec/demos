# Level 4: Layout System

> References: 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md

## Responsibility

Owns the spacing scale, typography scale, breakpoint definitions, and max-width constraints. Provides the grid vocabulary all other systems use to position content. Does not own color or animation timing (those belong to THEME_SYSTEM).

## Boundaries

- **Owns:** Spacing tokens, typography scale, breakpoint values, container max-widths, grid column definitions
- **Does not own:** Color (THEME_SYSTEM), component state (INTERACTIVE_SYSTEM), content (CONTENT_SYSTEM)
- **Consumed by:** PRESENTATION_SYSTEM, CONTENT_SYSTEM, INTERACTIVE_SYSTEM, THEME_SYSTEM (for layout-adjacent animation)

## Breakpoints

| Name | Min Width | Primary Use |
|------|-----------|-------------|
| `sm` | [N]px | Small phones |
| `md` | [N]px | Tablets, large phones landscape |
| `lg` | [N]px | Desktop, small laptops |
| `xl` | [N]px | Wide desktop |

## Container

- Max content width: `[N]px`
- Horizontal padding (mobile): `[N]px` each side
- Horizontal padding (desktop): `[N]px` each side
- Centered via `margin: 0 auto`

## Spacing Scale

A consistent multiplier-based scale. All spacing values (margin, padding, gap) derive from a base unit of `[N]px`.

| Token | Value | Common use |
|-------|-------|------------|
| `--space-1` | [N]px | Tight internal spacing |
| `--space-2` | [N]px | Component internal padding |
| `--space-3` | [N]px | Between related elements |
| `--space-4` | [N]px | Between components |
| `--space-6` | [N]px | Section padding |
| `--space-8` | [N]px | Major section separation |
| `--space-12` | [N]px | Hero/CTA vertical padding |

## Typography Scale

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `--text-xs` | [N]px | 400 | Captions, meta |
| `--text-sm` | [N]px | 400 | Secondary copy |
| `--text-base` | [N]px | 400 | Body text |
| `--text-lg` | [N]px | 500 | Lead copy, emphasized body |
| `--text-xl` | [N]px | 600 | Section subheadings |
| `--text-2xl` | [N]px | 700 | Section headings |
| `--text-3xl` | [N]px | 700 | Hero tagline (mobile) |
| `--text-4xl` | [N]px | 800 | Hero tagline (desktop) |

## Grid

- Base grid: 12 columns (desktop), 4 columns (mobile)
- Column gap: `--space-4`
- Row gap: `--space-6`

## Rules

- All spacing in components uses `--space-*` tokens; no arbitrary pixel values
- Typography sizes always use `--text-*` tokens; no arbitrary rem/px values
- No component defines its own breakpoints; breakpoints are defined here and consumed via Tailwind config or CSS media queries
- Line height: 1.5 for body text, 1.2 for headings
- Font family: system font stack by default; monospace stack for code blocks
