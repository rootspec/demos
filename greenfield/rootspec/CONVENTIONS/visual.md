# Visual Conventions

## Component Library
- **Base:** Custom components (no external UI library)
- **Customization:** CSS custom properties with CSS Modules classes

## Colors
- **Primary:** CSS custom property --color-primary (blue-600 equivalent)
- **Secondary:** CSS custom property --color-accent (emerald-500 equivalent)
- **Neutral:** CSS custom property --color-neutral (slate scale)
- **Semantic:** --color-success (green), --color-warning (yellow), --color-error (red)
- **Background:** --color-bg-primary, --color-bg-secondary for light/dark themes

## Spacing
- **Base unit:** 0.25rem (4px)
- **Scale:** 1.5x progression (0.25, 0.375, 0.5625, 0.844, 1.266rem)
- **Container:** 1200px max-width for content sections

## Typography
- **Body font:** System font stack (system-ui, -apple-system, BlinkMacSystemFont)
- **Heading font:** Same as body font for consistency
- **Mono font:** ui-monospace, 'Cascadia Code', 'Source Code Pro'
- **Scale:** 1.25 ratio progression (1rem, 1.25rem, 1.563rem, 1.953rem)

## Layout
- **Grid:** CSS Grid for section layouts, Flexbox for component layouts
- **Navigation:** Single page with anchor links to sections
- **Page structure:** Header + main content sections + footer

## Responsive
- **Approach:** Mobile-first design
- **Breakpoints:** 320px (mobile), 768px (tablet), 1024px (desktop)
- **Patterns:** Single column on mobile, multi-column layouts on desktop

## Motion
- **Transitions:** CSS transitions for simple state changes
- **Duration:** 150ms (micro-interactions), 250ms (component states), 400ms (section transitions)
- **Philosophy:** Subtle, functional motion that respects prefers-reduced-motion

## Icons
- **Library:** Inline SVG icons (custom)
- **Size:** 1rem (16px) for inline icons, 1.5rem (24px) for standalone