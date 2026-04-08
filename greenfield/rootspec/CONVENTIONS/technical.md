# Technical Conventions

## Framework & Architecture

**Primary Framework**: Astro
- Static site generation with component-based architecture
- TypeScript support for type safety
- Built-in optimization and performance features

**Styling Approach**: CSS-first with framework integration
- CSS custom properties for theming
- Responsive design with mobile-first approach
- Component-scoped styling where appropriate

## Component Patterns

**Interactive Components**:
- Client-side JavaScript for dynamic features
- Progressive enhancement from static content
- Accessible event handling for keyboard and mouse

**Layout Components**:
- Semantic HTML structure with ARIA landmarks
- Flexible grid system with CSS Grid and Flexbox
- Responsive breakpoints: mobile (768px), tablet (1024px), desktop (1200px)

## State Management

**Theme State**: Browser localStorage + CSS custom properties
**Interactive State**: Component-local state management
**Session State**: Client-side only, no persistence across sessions

## Testing Strategy

**Acceptance Testing**: Cypress with custom DSL commands
- Data attributes for test selectors (`data-test`)
- End-to-end user journey coverage
- Accessibility testing integration

## Performance Standards

**Core Web Vitals**:
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

**Asset Optimization**:
- Image lazy loading with intersection observer
- CSS and JavaScript minification in production
- Critical CSS inlined for above-the-fold content

## Accessibility Standards

**WCAG Compliance**: AA level minimum, AAA for high contrast
**Keyboard Navigation**: Full site accessibility without mouse
**Screen Reader Support**: Semantic markup and ARIA labels
**Motion Sensitivity**: Respect `prefers-reduced-motion`

## Code Organization

**File Structure**:
```
src/
  components/     # Reusable UI components
  layouts/        # Page layout templates  
  pages/          # Route pages
  styles/         # Global and component styles
```

**Naming Conventions**:
- PascalCase for component files
- kebab-case for assets and utilities
- Descriptive data-test attributes for testing

## Browser Support

**Target Browsers**: Modern evergreen browsers
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Progressive enhancement for older browsers
- Graceful degradation when JavaScript unavailable