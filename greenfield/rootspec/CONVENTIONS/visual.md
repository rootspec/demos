# Visual Conventions

## Component Library
- **Base:** Custom components (no external UI library per L2 constraints)
- **Customization:** CSS custom properties for theming, component-scoped styles

## Colors
- **Primary:** CSS custom properties for brand colors (theme-aware)
- **Neutral:** Semantic neutral palette supporting both light and dark themes
- **Semantic:** Standard success/warning/error colors with sufficient contrast
- **Background:** CSS custom properties for surface and page backgrounds (theme-aware)

## Spacing
- **Base unit:** 4px base unit for consistent spacing
- **Scale:** Powers of 2 scale (4px, 8px, 16px, 32px, 64px) for predictable rhythm
- **Container:** 1200px max-width for optimal reading (per fine-tuning parameters)

## Typography
- **Body font:** System font stack prioritizing readability and performance
- **Heading font:** Same as body font for consistency and performance
- **Mono font:** System monospace for any code snippets
- **Scale:** Modular scale with 1.6 line-height for accessibility (per fine-tuning)

## Layout
- **Grid:** CSS Grid for complex layouts, Flexbox for component-level alignment
- **Navigation:** Top navigation with theme toggle, footer with attribution
- **Page structure:** Single-column content with generous vertical spacing

## Responsive
- **Approach:** Mobile-first progressive enhancement
- **Breakpoints:** 768px tablet, 1024px desktop (per fine-tuning parameters)
- **Patterns:** Stack on mobile, side-by-side comparisons on tablet+

## Motion
- **Transitions:** CSS transitions for theme changes (200ms) and interactions (300ms)
- **Duration:** Fast enough for responsiveness, smooth enough for polish
- **Philosophy:** Functional motion respecting prefers-reduced-motion preference

## Icons
- **Library:** SVG icons inline for performance and customization
- **Size:** 24px standard size for interactive elements (44px touch targets)
- **Style:** Simple, geometric icons consistent with developer-first clarity pillar

## Theme System
- **Implementation:** CSS custom properties with system preference detection
- **Persistence:** localStorage for manual overrides, 365-day retention
- **Transitions:** 200ms smooth transitions respecting accessibility preferences
- **Contrast:** WCAG AA compliant color contrast ratios (4.5:1 minimum)