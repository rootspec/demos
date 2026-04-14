# Visual Conventions

## Theme System
- **Dark mode strategy:** Tailwind `class` strategy — `dark` class on `<html>` element
- **Light mode:** Default (no class); dark mode activated by `<html class="dark">`
- **Toggle:** Button in navigation header; icon switches sun/moon based on current theme
- **Persistence:** `localStorage` key `rootfeed-theme`; falls back to `prefers-color-scheme`

## Color Palette (Tailwind defaults, no custom tokens)
- **Background (light):** `white` / `gray-50` for page, `white` for cards
- **Background (dark):** `gray-900` for page, `gray-800` for cards
- **Text primary (light):** `gray-900`
- **Text primary (dark):** `gray-100`
- **Text secondary (light):** `gray-500`
- **Text secondary (dark):** `gray-400`
- **Border (light):** `gray-200`
- **Border (dark):** `gray-700`
- **Accent / interactive:** `blue-600` (links, active states)
- **Like active:** red family (`red-500` or `heart` filled)
- **Bookmark active:** amber family (`amber-500`)
- **Meta banner:** `blue-50` bg / `blue-900` text (light); `blue-950` bg / `blue-200` text (dark)

## Typography
- **Font family:** System UI stack (Tailwind default — `font-sans`)
- **Headings:** `text-xl font-bold` for page titles, `text-lg font-semibold` for section headers
- **Body:** `text-base` (16px)
- **Small/meta:** `text-sm` (14px) for timestamps, handles, counts
- **Extra small:** `text-xs` (12px) for labels and badges

## Layout
- **Max width:** `max-w-2xl mx-auto` for content column (feed, profile, etc.)
- **Page padding:** `px-4` horizontal, `py-6` or `py-4` vertical
- **Nav:** Full-width with `max-w-2xl` inner content; `border-b` separator
- **Cards:** `border-b border-gray-200 dark:border-gray-700 py-3` — no rounded card boxes for feed items
- **Spacing unit:** Tailwind 4px base (`space-y-4`, `gap-3`, etc.)

## Interactive Elements
- **Buttons:** Rounded (`rounded`), hover backgrounds, focus rings via Tailwind defaults
- **Icon buttons:** `p-1` or `p-2` padding, `hover:bg-gray-100 dark:hover:bg-gray-800`
- **Links:** `text-blue-600 hover:underline` or context-styled
- **Follow button:** Outlined (`border`) when not following, filled (`bg-blue-600 text-white`) when following

## Component States
- **Like active:** Button gains `.active` class; icon changes to filled, color shifts to red
- **Bookmark active:** Button gains `.active` class; icon changes to filled, color shifts to amber
- **Following:** Follow button label changes to "Unfollow"; style changes to filled
- **Tag active:** Tag chip gains `.active` class; background shifts to `blue-600`, text to `white`
- **Error state:** `text-red-500 text-sm` inline validation messages

## Motion
- **Toggle animations:** Instant or `transition-colors duration-150` — no layout animations
- **No page transitions:** Static site; navigation is a full page load
- **No loading spinners:** All data is local; no async loading states needed
