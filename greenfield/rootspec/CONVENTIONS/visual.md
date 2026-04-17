## Color Palette
- **Brand primary:** `indigo-600` (#6366f1) / `indigo-400` (dark)
- **Brand dark:** `indigo-700` (#4f46e5)
- **Background light:** `white` / `gray-50`
- **Background dark:** `gray-950` / `gray-900`
- **Text primary:** `gray-900` / `white` (dark)
- **Text secondary:** `gray-600` / `gray-400` (dark)
- **Border:** `gray-200` / `gray-700` (dark)

## Typography
- **Sans font:** Inter (Google Fonts) — headings and body
- **Mono font:** JetBrains Mono (Google Fonts) — code, badges, skill names
- **Heading sizes:** `text-5xl` (hero) → `text-3xl` (sections) → `text-lg` (cards)
- **Body:** `text-base` / `text-sm` for card content

## Spacing & Layout
- **Max content width:** `max-w-6xl mx-auto` (sections) / `max-w-4xl` (hero/wizard)
- **Section padding:** `py-20 px-4`
- **Card pattern:** rounded-xl, border, shadow-sm, p-6

## Dark Mode
- Default: dark mode (`dark` class on `<html>`)
- Toggle stored in `localStorage` key `theme`
- All components use `dark:` Tailwind variants

## Component Style Tokens
- **Meta banner:** `bg-indigo-600` bar across top
- **Version badge:** `bg-indigo-100 text-indigo-700` pill
- **CTA section:** `bg-indigo-600` full-bleed with white text
- **Code blocks:** `bg-gray-900` / `bg-gray-950`, green/yellow/cyan syntax colors
- **Success indicator:** `text-green-500` ✅ / Error: `text-red-500` ✗
