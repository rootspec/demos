# Level 4: Theme System

> References: 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md, SYSTEMS_OVERVIEW.md

## Responsibility

Owns dark/light mode detection, switching, and persistence. Defines the color token vocabulary and animation timing constants used across all other systems. Does not own layout or spacing (those belong to LAYOUT_SYSTEM).

## Boundaries

- **Owns:** Color tokens, animation timing tokens, theme state, `prefers-color-scheme` detection, theme toggle button behavior
- **Does not own:** Spacing, typography scale, layout structure (LAYOUT_SYSTEM)
- **Touches:** Root `<html>` element only (via class: `dark` or `light`)

## Theme Detection and Initialization

1. On page load (before first paint): read `prefers-color-scheme` media query
2. If `localStorage` has a saved preference, use that; otherwise use system preference
3. Apply class to `<html>`: `class="dark"` or `class="light"`
4. Smooth transitions applied to `background-color` and `color` properties to avoid flash

**Priority order:** `localStorage` → `prefers-color-scheme` → default (dark)

## Theme Toggle

- Button in header with accessible label ("Switch to light mode" / "Switch to dark mode")
- Clicking toggles the `<html>` class and saves to `localStorage`
- Icon changes to reflect current state (sun = currently dark mode, will switch to light; moon = opposite)

## Color Tokens

Color tokens are CSS custom properties defined on `:root` and overridden in `.dark` / `.light` classes.

### Semantic Token Groups

| Group | Tokens | Purpose |
|-------|--------|---------|
| Background | `--bg-page`, `--bg-surface`, `--bg-elevated` | Page background, card surfaces, modals |
| Text | `--text-primary`, `--text-secondary`, `--text-muted` | Body copy, secondary info, captions |
| Brand | `--brand-primary`, `--brand-accent` | Primary CTAs, highlights, active states |
| Border | `--border-default`, `--border-subtle` | Card borders, dividers |
| Interactive | `--interactive-hover`, `--interactive-active` | Hover/active states on clickable elements |
| Status | `--status-success`, `--status-warning`, `--status-error` | Validation states, feedback |

## Animation Tokens

All animation timing is defined here and consumed as CSS custom properties:

| Token | Default Value | Purpose |
|-------|--------------|---------|
| `--anim-fast` | [N]ms | Hover effects, toggle switches |
| `--anim-default` | [N]ms | Panel transitions, expand/collapse |
| `--anim-slow` | [N]ms | Page section fade-in on scroll |
| `--anim-easing` | ease-out | Default easing for all transitions |

**Reduced motion:** When `prefers-reduced-motion: reduce` is detected, all `--anim-*` tokens are overridden to 0ms. No animation tokens are hardcoded in components — they always consume from THEME_SYSTEM tokens.

## State Owned

- `currentTheme: 'dark' | 'light'` — The active theme
- Theme preference source: system or manual

## Rules

- No component hardcodes `#hexcolor` values — always use semantic tokens
- No component hardcodes animation durations — always use `--anim-*` tokens
- THEME_SYSTEM is the only system that modifies the `<html>` element's class
- Default theme is dark (aligns with developer audience expectations)
