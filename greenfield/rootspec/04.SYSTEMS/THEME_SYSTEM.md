# Level 4: Theme System

## Responsibility

Owns theme preference state (light/dark) and defines all color and typography tokens as CSS custom properties. Is the sole system that reads and writes theme preference to localStorage. Applies theme by setting a `data-theme` attribute on the document root.

## Boundaries

- **Owns:** Theme preference (current value + persistence), CSS custom properties for colors and typography
- **Does not own:** Layout, component structure, animation timing
- **Does not read:** Any content, interactive state, or viewport dimensions

## Data Structures

### Theme State

```
theme_state:
  current: "light" | "dark"
  source: "explicit" | "system" | "default"
    # explicit = user clicked the toggle
    # system = inferred from prefers-color-scheme on first visit
    # default = light (fallback when no preference is available)
```

### CSS Token Sets

Light and dark token sets are defined as CSS custom properties applied to `:root[data-theme="light"]` and `:root[data-theme="dark"]`:

```
color tokens:
  --color-background: page background
  --color-surface: card/panel background
  --color-border: divider / border color
  --color-text-primary: main body text
  --color-text-secondary: labels, captions, subdued text
  --color-text-link: link color
  --color-accent: single accent color for emphasis and interactive states
  --color-accent-hover: hover state of accent
  --color-code-background: code block background
  --color-code-text: monospace text color

typography tokens:
  --font-serif: serif family stack (body copy)
  --font-sans: sans-serif family stack (UI, labels, navigation)
  --font-mono: monospace family stack (code, skill names)
  --font-size-base: base body text size
  --line-height-base: base line height
```

## State Transitions

1. **First visit:** Read `prefers-color-scheme`. If dark, set `source: "system"`, `current: "dark"`. Otherwise `source: "default"`, `current: "light"`.
2. **User toggles:** Update `current` to the opposite value. Set `source: "explicit"`. Write to localStorage.
3. **Subsequent visits:** Read localStorage. If present, apply stored value with `source: "explicit"`. Otherwise, apply system-default logic.
4. **localStorage unavailable:** Fall back to light mode. Do not throw; handle silently.

## Rules

- Light mode is always the explicit default — system preference is a secondary signal, not an override
- Theme transitions are immediate at the CSS level; component animations ([short duration]) are owned by components but consume THEME_SYSTEM tokens
- The toggle button must reflect the current theme (icon or label changes to indicate what clicking will switch TO, not what mode is currently active — e.g., "Switch to dark mode" when in light mode)
- All color decisions are encapsulated here; no component hard-codes color values

## Interactions with Other Systems

- **THEME_SYSTEM** → **LAYOUT_SYSTEM**: Applies `data-theme` attribute to document root; LAYOUT_SYSTEM and all component styles consume CSS custom properties defined here
- No other system writes to THEME_SYSTEM state
