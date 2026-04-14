## Color Palette

- **Theme:** CSS custom properties on `:root` and `.dark`, toggled via `class` on `<html>`
- **Default theme:** dark (per fine-tuning spec)
- **Background:** `var(--bg)` — `#0a0f1a` (dark) / `#ffffff` (light)
- **Foreground:** `var(--fg)` — `#e2e8f0` (dark) / `#0f172a` (light)
- **Muted:** `var(--muted)` — `#94a3b8` (dark) / `#64748b` (light)
- **Border:** `var(--border)` — `#1e293b` (dark) / `#e2e8f0` (light)
- **Card background:** `var(--card)` — `#0f172a` (dark) / `#f8fafc` (light)
- **Brand color:** `var(--brand)` — `#38bdf8` (dark) / `#0ea5e9` (light)
- **Accent color:** `var(--accent)` — `#a78bfa` (dark) / `#8b5cf6` (light)

## Typography

- **Font family:** System sans-serif via Tailwind defaults
- **Monospace:** JetBrains Mono, Fira Code, system monospace (used for code and skill names)
- **Base size:** 16px (Tailwind default)

## Layout

- **Max content width:** 1200px (`max-w-content`, per fine-tuning)
- **Horizontal padding:** 24px (`px-6`)
- **Section vertical spacing:** 96px (`py-24`, per fine-tuning)
- **Mobile breakpoint:** 640px
- **Tablet breakpoint:** 768px
- **Desktop breakpoint:** 1024px

## Component Patterns

- **Meta banner:** sticky top, z-index 50, visible on load
- **Header:** sticky, z-index 40, contains version badge and theme toggle
- **Cards:** `var(--card)` background, `var(--border)` border, `rounded-xl p-6`
- **Buttons:** `rounded-lg`, `var(--brand)` or `var(--accent)` for primary actions
- **Code elements:** `var(--card)` bg, `var(--accent)` text, `rounded px-1.5 py-0.5`

## Interactive Components

- **HierarchyExplorer:** React island, `client:load`, always-in-DOM content panels with CSS display toggle
- **SpecWizard:** React island, `client:load`, 4-step linear flow, `data-test` on first option in each list
- **ComparisonSection:** React island, `client:load`, toggle between two views
- **Theme toggle:** vanilla JS in Header, instant (0ms transition), localStorage key `rootspec-theme`

## Z-Index Scale

- **Meta banner:** 50
- **Header:** 40

## Focus States

- `outline: 2px solid var(--brand)` via `:focus-visible` global rule
- All interactive elements: `minHeight: 44px` (WCAG touch target compliance)
