# System: Theme System

> References: L1 (01.PHILOSOPHY.md), L2 (02.TRUTHS.md), L3 (03.INTERACTIONS.md)
> Interacts with: CONTENT_SYSTEM, INTERACTIVE_SYSTEM, LAYOUT_SYSTEM

## Responsibility

Owns dark/light theme state, system preference detection, manual toggle, and persistence. Applies theme via CSS class on `<html>`. All visual systems inherit from CSS custom properties set at the root level.

## Data Ownership

- **Theme preference** — Stored in `localStorage` key `rootspec-theme`
- **System preference** — Read from `window.matchMedia('(prefers-color-scheme: dark)')` on first visit
- **Active theme class** — `dark` or `light` on `<html>` element

## State Machine

```
Initial load:
  localStorage has value → use it
  localStorage empty → read system preference → set and store

Toggle:
  current = dark → set light, store 'light'
  current = light → set dark, store 'dark'
```

## CSS Architecture

Theme is implemented via CSS custom properties on `:root`:
- Light theme: default values
- Dark theme: `.dark` class overrides on `:root` or `html.dark`

Tailwind's `darkMode: 'class'` strategy is used. All components use `dark:` variant classes.

## Boundaries

- Does NOT own component styling (CONTENT_SYSTEM, LAYOUT_SYSTEM)
- Does NOT own animation (PRESENTATION_SYSTEM)
- Exposes: CSS custom properties for colors, backgrounds, borders
- No server-side theme detection — all client-side to avoid flash

## Anti-Flash Strategy

A small inline `<script>` in the `<head>` reads localStorage and sets the class before first paint, preventing flash of wrong theme.
