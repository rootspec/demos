## Color Tokens (CSS Custom Properties)

- **`--bg-primary`:** Main page background
- **`--bg-secondary`:** Alternate section background (slightly lighter/darker)
- **`--bg-card`:** Card/panel backgrounds
- **`--text-primary`:** Headings and primary text
- **`--text-secondary`:** Body text and descriptions
- **`--text-muted`:** Subdued labels, metadata
- **`--accent`:** Brand purple (`#7c3aed` dark / `#6d28d9` light)
- **`--accent-hover`:** Accent hover state
- **`--border`:** Card and divider borders
- **`--meta-bg`:** Meta banner background
- **`--meta-text`:** Meta banner text
- **`--meta-border`:** Meta banner border

## Typography

- **Font stack:** System UI (`ui-sans-serif, system-ui, sans-serif`)
- **Monospace:** System monospace for code elements
- **Heading sizes:** `clamp()` for fluid scaling (e.g., `clamp(2rem, 5vw, 3.5rem)` for H1)
- **Font weights:** 400 (body), 600 (semibold), 700 (bold), 800 (display headings)

## Spacing

- **Section padding:** `4rem 1.5rem` to `5rem 1.5rem`
- **Card padding:** `1.5rem`
- **Card gap:** `1rem` to `1.5rem`
- **Max content width:** `1000px` to `1200px`

## Component Styles

- **Cards:** `border-radius: 0.75rem`, `border: 1px solid var(--border)`, `background: var(--bg-card)`
- **Buttons (primary):** `background: var(--accent)`, `color: white`, `border-radius: 0.5rem`, `font-weight: 600`
- **Buttons (secondary):** `background: var(--bg-card)`, `border: 1px solid var(--border)`
- **Pill tags:** `border-radius: 9999px`

## Layout

- **Grid:** `repeat(auto-fit, minmax(200px-280px, 1fr))` for card grids
- **Flex:** `flex-wrap: wrap` for responsive button groups
- **Sticky header:** `position: sticky; top: 0; z-index: 50; height: 3.5rem`

## Themes

### Dark mode (`[data-theme=dark]`)
- `--bg-primary: #0f0f13` (near-black)
- `--bg-secondary: #16161d`
- `--bg-card: #1e1e2d`
- `--text-primary: #f1f1f6`
- `--text-secondary: #a0a0b8`
- `--accent: #7c3aed`
- `--border: #2a2a3d`

### Light mode (`[data-theme=light]`)
- `--bg-primary: #ffffff`
- `--bg-secondary: #f8f7ff`
- `--bg-card: #f0eeff`
- `--text-primary: #111118`
- `--text-secondary: #4a4a65`
- `--accent: #6d28d9`
- `--border: #e0dff0`
