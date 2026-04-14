# Visual Conventions

## Color Palette
- **Brand primary:** `#6366f1` (Indigo 500) — `brand.primary` in Tailwind
- **Brand secondary:** `#8b5cf6` (Violet 500) — `brand.secondary` in Tailwind
- **Dark background:** `#0f0f17` — `var(--bg-primary)`
- **Dark surface:** `#1a1a2e` — `var(--bg-secondary)`
- **Light background:** `#f8fafc` — `var(--bg-primary)` in light mode
- **Light surface:** `#f1f5f9` — `var(--bg-secondary)` in light mode
- **Border:** `rgba(99, 102, 241, 0.2)` — `var(--border-color)`

## Typography
- **Body font:** Inter (Google Fonts), fallback: `system-ui, sans-serif`
- **Mono font:** JetBrains Mono (Google Fonts), fallback: `Fira Code, monospace`
- **Headline sizes:** `text-4xl sm:text-5xl md:text-6xl lg:text-7xl` (hero), `text-3xl sm:text-4xl` (section)
- **Font weights:** `font-extrabold` (hero), `font-bold` (section headings), `font-semibold` (CTAs)

## Layout
- **Max content width:** `max-w-6xl mx-auto` (sections), `max-w-3xl mx-auto` (wizard/hierarchy)
- **Section padding:** `py-24 px-4`
- **Card radius:** `rounded-xl`
- **Border style:** 1px solid `var(--border-color)` with hover accent effect

## Component Patterns
- **Pain points grid:** `sm:grid-cols-2 lg:grid-cols-3`
- **Workflow grid:** `sm:grid-cols-2 lg:grid-cols-4`
- **Comparison:** `md:grid-cols-2` side-by-side panels
- **Before panel:** Red accent (`border-red-500/30`, `bg-red-500/5`)
- **After panel:** Brand accent (`border-brand-primary/30`, `bg-brand-primary/5`)

## Accessibility
- **Focus management:** `tabIndex={0}`, `role="button"`, `aria-expanded` on interactive divs
- **Keyboard navigation:** Enter/Space triggers expand/collapse in HierarchyExplorer
- **Reduced motion:** CSS `@media (prefers-reduced-motion: reduce)` disables all animations
- **Dark/light class:** Applied to `<html>` element before first paint via inline script

## CTA Style
- **Primary:** `bg-brand-primary hover:bg-brand-secondary text-white` with shadow
- **Secondary:** `border border-[var(--border-color)] hover:bg-[var(--bg-secondary)]`
- **Padding:** `px-8 py-3.5 rounded-lg`
