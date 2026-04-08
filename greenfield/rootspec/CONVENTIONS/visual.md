# Visual Conventions

## Color Palette

### Light Theme
- **Background:** `#ffffff`, `#f8fafc`
- **Text:** `#1e293b`, `#475569`
- **Primary:** `hsl(210, 85%, 55%)` (Professional blue)
- **Accent:** `#0ea5e9`

### Dark Theme  
- **Background:** `#0f172a`, `#1e293b`
- **Text:** `#f1f5f9`, `#cbd5e1`
- **Primary:** `hsl(210, 85%, 65%)` (Brighter blue for contrast)
- **Accent:** `#38bdf8`

## Typography
- **Primary Font:** System font stack (-apple-system, BlinkMacSystemFont, "Segoe UI")
- **Code Font:** "Fira Code", "SF Mono", Consolas, monospace
- **Base Size:** 16px
- **Line Height:** 1.6 for body text, 1.2 for headings
- **Scale:** 1.25 ratio (16, 20, 25, 31, 39, 49px)

## Spacing System
- **Base Unit:** 16px
- **Scale:** 0.5x, 1x, 1.5x, 2x, 3x, 4x (8, 16, 24, 32, 48, 64px)
- **Section Spacing:** 64px desktop, 32px mobile
- **Component Spacing:** 24px internal, 16px between elements

## Layout Grid
- **Max Width:** 1200px
- **Breakpoints:** 320px (mobile), 768px (tablet), 1024px (desktop)
- **Grid Gap:** 24px
- **Content Padding:** 32px desktop, 16px mobile

## Interactive Elements
- **Border Radius:** 8px (buttons), 4px (inputs)
- **Touch Targets:** Minimum 44px
- **Focus Outline:** 2px solid primary, 2px offset
- **Hover States:** Subtle opacity or color shifts

## Animation
- **Duration:** 300ms standard, 200ms fast, 400ms slow
- **Easing:** `cubic-bezier(0.4, 0.0, 0.2, 1)` (Material easing)
- **Motion:** Respect `prefers-reduced-motion`
- **Transitions:** Opacity, transform, color changes

## Accessibility
- **Contrast:** Minimum 4.5:1 (WCAG AA)
- **Focus Management:** Visible focus indicators
- **Semantic HTML:** Proper heading hierarchy, landmarks
- **Screen Readers:** Descriptive labels and live regions