## Design Direction

Editorial-meets-technical. Long-form essay crossed with developer documentation.
Not a SaaS landing page. The reader should feel they've arrived at a place where someone thinks.

## Typography

- **Serif:** Newsreader (Google Fonts) — prose, long-form content, Author's Notes, Problem section
- **Sans:** Inter (Google Fonts) — UI, navigation, labels, headings, section titles
- **Mono:** JetBrains Mono (Google Fonts) — code, commands, skill names (`/rs-init` etc.)
- **Loading:** `@import` in `global.css` with `display=swap`

## Color Palette

### Light Mode (default)

- **`--color-bg`:** `#fafaf8` — warm off-white background
- **`--color-text`:** `#1a1a1a` — near-black primary text
- **`--color-text-muted`:** `#6b7280` — secondary/caption text
- **`--color-accent`:** `#2563eb` — blue, used sparingly for links, interactive emphasis
- **`--color-border`:** `#e5e7eb` — dividers and borders
- **`--color-surface`:** `#f3f4f6` — slightly elevated surfaces (banners, code backgrounds)
- **`--color-code-bg`:** `#f0f0ef` — code block background

### Dark Mode

- **`--color-bg`:** `#111110`
- **`--color-text`:** `#e8e6e1`
- **`--color-text-muted`:** `#9ca3af`
- **`--color-accent`:** `#3b82f6`
- **`--color-border`:** `#2d2d2b`
- **`--color-surface`:** `#1c1c1a`
- **`--color-code-bg`:** `#1e1e1c`

## Motion

- **Duration:** 150ms — quick, functional
- **Easing:** `ease-out`
- **Applied to:** background-color, color on `html`; button hover states; theme toggle; hierarchy level expand/collapse

## Anti-patterns (explicitly avoided)

- Gradient text on dark backgrounds
- Three-column feature grids with icons
- Testimonial cards, stat counters
- Gradient blobs or decorative background effects
- Stock illustrations
- Anything resembling a Vercel/shadcn template

## Layout

- **Max width:** `max-w-4xl` (56rem) for content, centered
- **Padding:** `px-6` horizontal, `py-16` vertical sections
- **Section separators:** `border-t` with `pt-16` — simple ruled lines
- **Section labels:** `text-sm font-medium uppercase tracking-wider` in muted color
