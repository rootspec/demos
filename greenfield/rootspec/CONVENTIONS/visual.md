# Visual Conventions

## Component Library
- **Base:** Custom components built on semantic HTML
- **Customization:** CSS custom properties for theme adaptation

## Colors
- **Primary:** CSS custom property system with light-dark() function
- **Secondary:** Accent colors for interactive elements
- **Neutral:** System-appropriate grays for both themes
- **Semantic:** Standard success/warning/error palette
- **Background:** Dynamic background colors supporting dark and light themes

## Spacing
- **Base unit:** 16px (1rem) for consistent spacing scale
- **Scale:** Powers of 2 and Fibonacci-inspired spacing (8px, 16px, 24px, 32px, 48px)
- **Container:** 1200px maximum content width for optimal reading

## Typography
- **Body font:** System font stack for optimal performance and familiarity
- **Heading font:** Same as body font for consistency
- **Mono font:** System monospace for code and version information
- **Scale:** Modular scale with clear hierarchy (1rem, 1.25rem, 1.5rem, 2rem, 3rem)

## Layout
- **Grid:** CSS Grid for page-level layout, Flexbox for component layout
- **Navigation:** Sticky header with mobile-responsive hamburger pattern
- **Page structure:** Single column on mobile, content-focused layout on desktop

## Responsive
- **Approach:** Mobile-first responsive design
- **Breakpoints:** 768px (tablet) and 1024px (desktop) based on fine-tuning parameters
- **Patterns:** Progressive enhancement from mobile base to desktop features

## Motion
- **Transitions:** CSS transitions with custom properties for theme coordination
- **Duration:** 200ms for theme changes, 250ms for interactive feedback (per fine-tuning)
- **Philosophy:** Functional motion that supports accessibility and reduced motion preferences

## Icons
- **Library:** SVG icons embedded directly for performance
- **Size:** 24px standard size for interactive elements
- **Style:** Simple, geometric icons that work in both themes