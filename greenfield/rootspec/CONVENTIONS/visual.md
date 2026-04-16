## Color Palette
- **Brand purple:** `#7c3aed` (purple-600) — primary actions, CTAs
- **Brand blue:** `#2563eb` (blue-600) — rs-spec skill card accent
- **Brand cyan:** `#0891b2` (cyan-600) — rs-impl skill card accent
- **Brand green:** `#16a34a` (green-600) — rs-validate skill card accent

## Theme Tokens (CSS custom properties)
- **`--bg`:** Page background (`#ffffff` light / `#0f172a` dark)
- **`--fg`:** Primary text (`#0f172a` light / `#f1f5f9` dark)
- **`--muted`:** Secondary text (`#64748b` light / `#94a3b8` dark)
- **`--border`:** Borders/dividers (`#e2e8f0` light / `#1e293b` dark)
- **`--card`:** Card/section backgrounds (`#f8fafc` light / `#1e293b` dark)

## Typography
- **Font:** System font stack (Tailwind default)
- **Headings:** `font-bold` or `font-extrabold`, tight tracking on hero
- **Monospace:** `font-mono` for skill names (rs-init, rs-spec, etc.) and code samples
- **Body:** `text-sm` to `text-lg` depending on context

## Spacing & Layout
- **Max width:** `max-w-5xl` (sections), `max-w-4xl` (hero), `max-w-3xl` (wizard)
- **Section padding:** `py-20 px-4` standard; `py-24` for hero
- **Container:** `mx-auto` centering

## Component Styles
- **Cards:** `rounded-xl border-2 p-4/6` with colored border per skill/level
- **Buttons:** `px-6 py-3 rounded-lg font-medium` with hover transition
- **Meta-banner:** Purple-700 bg, white text, sticky at top
- **Header:** Sticky, `bg-[var(--bg)]/90 backdrop-blur`, border-bottom
- **Sections alternate:** White/card backgrounds for visual rhythm

## Meta-banner
- Background: `bg-purple-700` (always purple, not themed)
- Links: `underline font-medium` with hover lighten

## Interactive States
- **Hover:** Transition on `bg`, `border-color`, `color` — 150-200ms
- **Focus:** Purple ring (`focus:ring-2 focus:ring-purple-500`)
- **Disabled:** `opacity-40 cursor-not-allowed`
- **Active/selected card:** Purple border + tinted background (`bg-purple-50 dark:bg-purple-950/40`)
