## Color Palette

- **Brand primary:** `#4f6ef7` (brand-500) — blue-indigo accent
- **Brand dark:** `#818cf8` (indigo-400) — dark mode accent
- **Background light:** `#ffffff` / `--bg`
- **Background dark:** `#0f172a` (slate-900) / `--bg`
- **Card light:** `#f8fafc` (slate-50) / `--card`
- **Card dark:** `#1e293b` (slate-800) / `--card`
- **Text light:** `#0f172a` (slate-900)
- **Text dark:** `#f1f5f9` (slate-100)
- **Muted light:** `#64748b` (slate-500)
- **Muted dark:** `#94a3b8` (slate-400)
- **Meta banner:** amber-50/amber-900 background, amber-800/amber-300 text

## Typography

- **Headings:** System sans-serif, bold, tight tracking
- **Body:** System sans-serif, regular
- **Code/mono:** JetBrains Mono (Google Fonts), fallback Fira Code, monospace
- **Hero headline:** 4xl–6xl responsive, bold
- **Section headings:** 3xl–4xl, bold

## Layout

- **Max content width:** `max-w-7xl` (80rem) centered
- **Section padding:** `py-20 px-4 sm:px-6 lg:px-8`
- **Header:** Sticky, 56px tall, `backdrop-blur` with semi-transparent background
- **Grid:** 2-col or 4-col responsive grids for cards

## Components

- **Cards:** Rounded-xl, border, shadow-sm, hover:shadow-md/-translate-y-1
- **Buttons primary:** `bg-brand-600 hover:bg-brand-700 text-white`, rounded-lg
- **Buttons secondary:** Border + text, rounded-lg
- **Code blocks:** `bg-slate-50 dark:bg-slate-800`, rounded-lg, font-mono text-xs
- **Level colors:** L1=blue-400, L2=violet-400, L3=indigo-400, L4=sky-400, L5=teal-400
- **Comparison panels:** Red for "without", emerald for "with"

## Dark Mode

- **Strategy:** Tailwind `darkMode: 'class'`
- **Toggle:** Theme toggle button in header, persisted in `localStorage`
- **Init:** Inline `<script>` in `<head>` reads localStorage and system preference to set class before paint
