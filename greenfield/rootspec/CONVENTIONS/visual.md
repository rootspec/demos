## Color Palette
- **Primary:** indigo-600 (#6366f1) — buttons, links, accents
- **Secondary:** violet-600 (#7c3aed) — generate button, gradients
- **Background light:** white / slate-50
- **Background dark:** slate-900 / slate-800
- **Text light:** slate-800 / slate-600
- **Text dark:** slate-100 / slate-300
- **Border light:** slate-200
- **Border dark:** slate-700
- **Meta banner:** indigo-600 background, white text
- **Comparison without:** red-50/red-200 border
- **Comparison with:** green-50/green-200 border

## Typography
- **Font:** System sans-serif stack (Tailwind default)
- **Heading XL:** text-5xl font-bold (hero tagline)
- **Heading L:** text-4xl font-bold (CTA)
- **Heading M:** text-3xl font-bold (section headings)
- **Heading S:** text-xl font-bold (wizard steps)
- **Body:** text-base/text-sm, text-slate-600 dark:text-slate-400
- **Mono:** font-mono text-xs (spec output, code blocks)

## Spacing
- **Section padding:** py-16 px-4 (standard sections), py-20 px-4 (hero/CTA)
- **Max content width:** max-w-4xl mx-auto (content), max-w-6xl mx-auto (header)
- **Card padding:** p-6 (feature cards), p-8 (wizard)

## Components
- **Buttons primary:** bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-6 py-2
- **Buttons secondary:** border border-slate-300 hover:bg-slate-100 rounded-lg
- **Cards:** rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800
- **Chips (active):** bg-indigo-600 text-white border-indigo-600 rounded-full
- **Chips (inactive):** border-slate-300 text-slate-700 rounded-full hover:bg-slate-100
- **Version badge:** bg-indigo-100 text-indigo-700 font-mono text-xs rounded-full border border-indigo-200

## Layout
- **Page root:** data-test=page-root wrapping the full page
- **Header:** sticky top-0 with backdrop blur
- **Meta banner:** full-width bar above header
- **Sections:** alternating white/slate-50 (dark: slate-900/slate-800) backgrounds

## Dark Mode
- **Toggle icon:** 🌙 (light mode) / ☀️ (dark mode)
- **Class strategy:** html.dark class on <html> element
- **Persistence:** localStorage key 'theme' = 'dark' | 'light'
