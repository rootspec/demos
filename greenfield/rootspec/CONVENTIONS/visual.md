# Visual Conventions

## Component Library
- **UI Framework:** Custom components built with React and Tailwind CSS
- **Component Architecture:** Atomic design with reusable base components
- **Styling Approach:** Utility-first CSS with Tailwind classes
- **Customization:** Tailwind config for theme tokens and custom utilities

## Colors
- **Primary Palette:** Professional blue (HSL 240, 80%) for trust and technology
- **Accent Color:** Complementary purple (HSL 280) for highlights and CTAs
- **Semantic Colors:** Success, warning, error states using standard conventions
- **Theme Support:** Full light/dark mode with CSS custom properties

## Spacing
- **Base Unit:** 8px grid system for consistent spacing
- **Scale:** Multiples of base unit (8px, 16px, 24px, 32px, 48px, 64px, 96px)
- **Container:** Max-width 1200px for comfortable reading length
- **Gutters:** Responsive side margins with mobile minimum 16px

## Typography
- **Scale:** Modular scale with 1.25 ratio (major third)
- **Base Size:** 16px for optimal readability across devices
- **Line Heights:** 1.6 for body text, 1.2 for headings
- **Font Stack:** System font stack for performance and native feel

## Layout
- **Grid:** CSS Grid and Flexbox for responsive layouts
- **Breakpoints:** Mobile-first with 640px (mobile), 768px (tablet), 1024px (desktop), 1280px (wide)
- **Sections:** Consistent vertical rhythm with 96px section gaps
- **Cards:** 32px internal padding with subtle shadows/borders

## Responsive
- **Mobile First:** Base styles for mobile, progressively enhanced for larger screens
- **Touch Targets:** Minimum 44px for accessibility compliance
- **Viewport:** Responsive meta tag and fluid typography
- **Images:** Responsive images with proper aspect ratios

## Motion
- **Transitions:** 200ms ease-out for theme changes, 300ms for content expansion
- **Easing:** CSS ease-out function for natural motion feeling
- **Performance:** GPU-accelerated transforms, avoiding layout thrashing
- **Accessibility:** Respects user's reduced motion preferences

## Icons
- **Style:** Outline style icons for consistency
- **Size:** Standard sizes aligned to 8px grid (16px, 24px, 32px)
- **Weight:** Medium stroke weight for good visibility
- **Format:** SVG for scalability and performance

## Accessibility
- **Contrast:** WCAG AA compliance (4.5:1 normal text, 3.0:1 large text)
- **Focus:** 2px outline for clear focus indicators
- **Touch:** 44px minimum touch targets with adequate spacing
- **Motion:** Reduced motion support for vestibular disorders