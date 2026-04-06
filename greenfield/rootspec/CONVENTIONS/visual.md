# Visual Conventions

## Component Library
- **Base:** Custom components with Tailwind styling
- **Customization:** Tailwind utility classes with design tokens

## Colors
- **Primary:** blue-600 (professional, trustworthy)
- **Secondary:** slate-600 (supporting content)
- **Neutral:** slate palette (50-900 range)
- **Semantic:** green-600 success, red-600 error, amber-600 warning
- **Background:** white/slate-50 light mode, slate-900/slate-800 dark mode

## Spacing
- **Base unit:** 8px (Tailwind default rem-based system)
- **Scale:** Tailwind spacing utilities (space-1 through space-64)
- **Container:** max-w-6xl (1152px) for main content

## Typography
- **Body font:** system-ui (-apple-system, BlinkMacSystemFont, Segoe UI)
- **Heading font:** same as body for consistency
- **Mono font:** ui-monospace (Menlo, Monaco, Consolas)
- **Scale:** Tailwind text utilities (text-sm through text-6xl)

## Layout
- **Grid:** CSS Grid with Tailwind grid utilities
- **Navigation:** top navigation with smooth scroll anchors
- **Page structure:** full-width hero, constrained content sections

## Responsive
- **Approach:** mobile-first responsive design
- **Breakpoints:** Tailwind defaults (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- **Patterns:** single column mobile, multi-column desktop

## Motion
- **Transitions:** Tailwind transition utilities with custom timing
- **Duration:** 150ms micro-interactions, 200ms hover states, 300ms page transitions
- **Philosophy:** functional motion supporting usability, reduced motion respected

## Icons
- **Library:** Heroicons or Lucide React (consistent stroke style)
- **Size:** 16px inline text, 24px standalone buttons, 32px+ features
- **Style:** outline style for consistency with minimalist aesthetic

## Theme System
- **Modes:** light and dark mode support
- **Detection:** system preference with manual override
- **Storage:** localStorage for user preference persistence
- **Implementation:** CSS custom properties with Tailwind dark: variants

## Accessibility
- **Contrast:** minimum 4.5:1 for normal text, 3:1 for large text
- **Focus:** 2px outline with theme-appropriate color
- **Touch targets:** minimum 44px for interactive elements
- **Motion:** respects prefers-reduced-motion system preference