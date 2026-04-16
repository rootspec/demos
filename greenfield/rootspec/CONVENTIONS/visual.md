## Color Palette
- **Brand:** `brand-500: #0ea5e9` (sky blue) — links, CTAs
- **Accent:** `accent-500: #8b5cf6` (violet) — highlights, badges, interactive states
- **Success:** `green-400` — "after" states, passing
- **Warning:** `yellow-400` — validate skill color
- **Error/Before:** `red-400` — "before" states, issues
- **Background (dark):** `#0f172a` (slate-900)
- **Background secondary (dark):** `#1e293b` (slate-800)
- **Text primary (dark):** `#f1f5f9`
- **Text secondary (dark):** `#94a3b8`

## Typography
- **Headings:** Bold, tight tracking (`tracking-tight`)
- **Code/commands:** `font-mono` — JetBrains Mono
- **Body:** System sans, `leading-relaxed`
- **Version badge:** Mono, small, with animated pulse dot

## Layout
- **Max width:** `max-w-6xl mx-auto` for content, `max-w-4xl` for focused sections
- **Section padding:** `py-24 px-4`
- **Responsive grid:** 1 col mobile → 2 col md → 4 col lg for workflow cards

## Visual Motifs
- **Grid background:** Subtle CSS grid lines in hero (low opacity purple)
- **Cards:** `rounded-xl border border-white/10 bg-[var(--bg-secondary)]`
- **Interactive states:** `hover:border-accent-500/30 transition-colors`
- **Badges:** `rounded-full px-3 py-1 border bg-accent/10`
- **Hierarchy levels:** Color-coded by L1–L5 (purple, blue, cyan, green, yellow)

## Dark/Light Mode
- **Default:** Dark mode
- **Toggle:** Header button with sun/moon icon
- **Stored:** `localStorage.theme` = `'light'` or `'dark'`
- **Applied:** `class="dark"` or `class="light"` on `<html>`
