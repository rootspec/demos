# Visual Conventions

## Component Library
- **Base:** Custom components (no external library)
- **Customization:** CSS Modules + styled-components for specific components

## Colors
- **Primary:** Blue gradient (#667eea to #764ba2)
- **Secondary:** Orange (#c05621) for warnings
- **Neutral:** Light gray (#f0f2f5) background, dark gray (#333) text
- **Semantic:** Red (#c53030) danger, orange (#c05621) warnings, blue (#2b6cb0) info
- **Background:** Light gray (#f0f2f5) body, white cards

## Spacing
- **Base unit:** 4px implied from margin/padding values
- **Scale:** Multiples of 4px (8px, 12px, 16px, 20px, 24px)
- **Container:** 640px max width (1024px for comparison view)

## Typography
- **Body font:** System font stack (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Heading font:** Same as body
- **Mono font:** Not specified
- **Scale:** 13px small, 14px body, 18px subheading, 24px heading, 64px display

## Layout
- **Grid:** CSS Grid for dashboard cards (auto-fill, minmax 180px)
- **Navigation:** Top header with view toggle buttons
- **Page structure:** Single column, centered container with header/main/footer

## Responsive
- **Approach:** Mobile-first implied
- **Breakpoints:** Container max-width changes for comparison view
- **Patterns:** Grid auto-fill adapts to screen width

## Motion
- **Transitions:** Simple CSS transitions (0.2s for hover effects)
- **Duration:** 200ms for box-shadow and border-color changes
- **Philosophy:** Subtle, functional only

## Icons
- **Library:** Unicode emoji characters (🌤️, 💧, 💨, ☀️, ❄️)
- **Size:** Inline with text, 48px for weather condition emojis