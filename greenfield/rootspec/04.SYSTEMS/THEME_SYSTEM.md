# Level 4: Theme System

**References:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md
**Part of:** SYSTEMS_OVERVIEW.md

---

## Responsibility

The Theme System owns all visual design tokens — typography, color palette, spacing rhythm, and motion timing. It is the single source of truth for all visual decisions. All other systems consume its tokens; none define their own. It also manages the light/dark theme state and the theme toggle interaction.

---

## Typography Stack

Three type families, each with a distinct role:

| Role | Family type | Usage |
|------|-------------|-------|
| Body / Editorial | High-quality serif (e.g., Source Serif 4, Newsreader, Charter) | All prose, body copy, section headings |
| UI / Labels | Clean sans-serif (e.g., Inter, IBM Plex Sans) | Navigation, buttons, captions, metadata |
| Code / Commands | Monospace (e.g., JetBrains Mono, IBM Plex Mono) | Skill names (`/rs-init`), code examples, version badge |

Typography is the primary design element. Font choices must signal essay-quality writing, not SaaS marketing.

---

## Color Palette

Restrained palette: two to three colors plus neutrals. One accent used sparingly.

| Token | Role | Light value | Dark value |
|-------|------|-------------|------------|
| `--color-surface` | Page background | Near-white | Near-black |
| `--color-text` | Body text | Near-black | Near-white |
| `--color-text-muted` | Secondary text | Mid-gray | Mid-gray |
| `--color-accent` | Links, interactive states, emphasis | [single accent color] | [adjusted accent] |
| `--color-border` | Dividers, section boundaries | Light gray | Dark gray |
| `--color-surface-raised` | Banners, cards, inset areas | Off-white | Off-black |

Rules:
- No gradients on any element
- No glassmorphism, glows, or drop shadows used decoratively
- The accent color appears sparingly — link underlines, active states, one or two emphasis uses
- All colors must meet WCAG AA contrast ratios in both themes

---

## Spacing

Generous whitespace. The page breathes. Spacing is based on a consistent scale.

| Token | Purpose |
|-------|---------|
| `--space-section` | Vertical padding between page sections — [generous value] |
| `--space-prose` | Maximum width for prose columns — [comfortable reading width] |
| `--space-gap` | Standard gap between related elements |
| `--space-tight` | Tight gap for closely related elements |

---

## Motion

Transitions are quick and functional. No springy animations. No parallax.

| Token | Value | Use |
|-------|-------|-----|
| `--duration-quick` | [short duration] | Interactive state changes (hover, focus) |
| `--duration-transition` | [short duration] | Theme toggle, section reveals |
| `--easing` | ease-out | All transitions |

No animations play on page load. No scroll-triggered animations. Transitions respond to user action only.

---

## Theme State Management

| State | Description |
|-------|-------------|
| `light` | Default. Applied on first visit and when system preference is light. |
| `dark` | Applied when user toggles, or on first visit when system preference is dark. |

Rules:
- Light mode is the default
- System preference (`prefers-color-scheme`) is detected on first load only
- User preference persists in `localStorage` under a consistent key
- Theme class is applied to the `<html>` element to enable CSS cascade

---

## Boundaries

- The Theme System does NOT own component structure or layout — that belongs to LAYOUT_SYSTEM
- The Theme System does NOT own interactive logic — that belongs to INTERACTIVE_SYSTEM
- All color, font, spacing, and motion decisions live here and nowhere else
- Components must consume tokens, never hardcode values
