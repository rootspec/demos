# Visual Conventions

## Color Palette

- **Primary Blue:** `bg-blue-600`, `text-blue-700`, `border-blue-200`
- **Success Green:** `text-green-600`, `text-green-400` (terminal)
- **Error Red:** `text-red-600`
- **Neutral Gray:** `bg-gray-50`, `bg-gray-800`, `text-gray-600`, `text-gray-700`
- **Background:** `bg-white`, `bg-gray-50` (sections), `bg-gray-900` (terminal)

## Typography

- **Font Stack:** `font-family: system-ui, sans-serif`
- **Headings:** `text-5xl font-bold` (h1), `text-3xl font-bold` (h2), `text-xl font-semibold` (h3)
- **Body Text:** `text-xl` (hero), `text-gray-600` (standard), `text-sm` (small)
- **Code/Terminal:** `font-mono text-sm` with `bg-gray-900 text-green-400`

## Layout

- **Container:** `max-w-4xl mx-auto` (standard), `max-w-6xl mx-auto` (wide sections)
- **Spacing:** `py-16 px-4` (sections), `p-6` (cards), `mb-8` (element spacing)
- **Grid:** `grid md:grid-cols-2 gap-8` (comparison panels)

## Interactive Elements

- **Buttons:** `bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700`
- **Links:** `underline hover:no-underline` (meta banner), `text-blue-400 hover:text-blue-300` (footer)
- **Cards:** `bg-white p-6 rounded-lg border`

## Responsive Design

- **Breakpoints:** Tailwind's responsive prefixes (`md:`, `lg:`)
- **Mobile First:** Base styles for mobile, enhanced for larger screens
- **Grid Adaptation:** Single column on mobile, two columns on `md:` and up

## Sections

- **Meta Banner:** Light blue background `bg-blue-50 border-b border-blue-200`
- **Hero:** Clean white background with centered content
- **Comparison:** Gray background `bg-gray-50` with contrasting white cards
- **Getting Started:** Terminal-style code block with dark theme
- **Footer:** Dark footer `bg-gray-800 text-white`