## Color Palette
- **Background (dark):** `#0f1117` (`--color-bg`)
- **Background (light):** `#f8faff` (`--color-bg`)
- **Text (dark):** `#f0f4ff` (`--color-text`)
- **Text (light):** `#1c1f55` (`--color-text`)
- **Surface (dark):** `#1a1d2e` (`--color-surface`)
- **Surface (light):** `#ffffff` (`--color-surface`)
- **Border (dark):** `#2a2d3e` (`--color-border`)
- **Border (light):** `#e0e9ff` (`--color-border`)
- **Brand accent:** `#6270f5` (primary), `#8194fa` (lighter), `#4f55e9` (darker)

## Typography
- **Body font:** Inter (Google Fonts), system-ui fallback
- **Mono font:** JetBrains Mono, Fira Code fallback
- **Headings:** `font-bold`, sizes `text-3xl` to `text-6xl`
- **Body text:** `text-sm` to `text-lg`

## Theming
- **Default theme:** Dark (`html` has class `dark`)
- **Toggle mechanism:** JS class toggle on `html` element (`dark` / `light`)
- **Persistence:** `localStorage` key `theme`
- **CSS vars:** Theme colours defined on `:root` and `html.light`

## Layout
- **Max widths:** `max-w-4xl` for content sections, `max-w-6xl` for comparison
- **Padding:** `px-6 py-20` for sections, `px-6 py-4` for header
- **Spacing:** Tailwind spacing utilities (`gap-`, `space-y-`, `mb-`)

## Component Styles
- **Cards/Surfaces:** `rounded-xl border` with `var(--color-surface)` background
- **Buttons primary:** `bg-brand-600 hover:bg-brand-500 text-white rounded-lg px-6 py-3`
- **Buttons secondary:** `border border-brand-600 text-brand-300 rounded-lg px-6 py-3`
- **Version badge:** `font-mono` pill with animated pulse dot
- **Meta banner:** `bg-brand-950 border-b border-brand-800` strip at top of page

## Hierarchy Level Colors
- **L1 Philosophy:** `#8194fa` (blue-purple)
- **L2 Truths:** `#a78bfa` (purple)
- **L3 Interactions:** `#60a5fa` (blue)
- **L4 Systems:** `#34d399` (green)
- **L5 Implementation:** `#fbbf24` (amber)
