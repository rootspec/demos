# L4: Framework Integration

## Responsibility  
Manages Astro framework-specific concerns including static site generation, component hydration, build optimization, and integration with the broader web platform.

## Boundaries

### Owns
- Astro component architecture and organization
- Static site generation configuration and optimization
- Client-side hydration strategy for interactive elements
- Build process configuration and performance optimization
- Routing and page template management
- Framework-specific tooling integration

### Does Not Own
- Content creation and management (managed by Content System)
- Interactive widget implementation logic (managed by Interactive System)
- Visual design and theming (managed by Theme System)
- Layout patterns and accessibility (managed by Layout System)

## Data Ownership

### Build-Time Data
- Static site generation configuration
- Component dependencies and import resolution
- Asset optimization and bundling instructions
- Route generation and page template associations
- Environment-specific build variables

### Runtime Integration
- Client-side hydration boundaries and strategies
- Progressive enhancement coordination
- Framework-specific performance monitoring
- Browser compatibility and polyfill management

## Interactions with Other Systems

### → Content System
- **Provides:** Static generation capabilities for content processing
- **Receives:** Content structure requiring build-time optimization
- **Interface:** Component props, slots, and static content processing

### → Interactive System  
- **Provides:** Client-side hydration for interactive components
- **Receives:** JavaScript requirements and state management needs
- **Interface:** Hydration directives, component boundaries, progressive enhancement

### → Theme System
- **Provides:** CSS processing and optimization during build
- **Receives:** Styling requirements and theme switching logic
- **Interface:** Scoped styles, global CSS variables, build-time style processing

### → Layout System
- **Provides:** Component structure and page template framework
- **Receives:** Layout requirements and responsive component needs
- **Interface:** Page layouts, component composition, responsive utilities

## Internal Structure

### Component Architecture
1. **Page Components**
   - Landing page template with section organization
   - Layout wrapper with theme and navigation
   - SEO metadata and structured data

2. **Feature Components**  
   - Hierarchy explorer with progressive enhancement
   - Spec wizard with client-side state management
   - Before/after comparison with smooth transitions

3. **Shared Components**
   - Theme toggle with system preference detection
   - Navigation and footer with accessibility features
   - Version display with configuration management

### Build Configuration
- **Static Generation:** Pre-render all pages for optimal performance
- **Asset Optimization:** Image compression, CSS minification, JavaScript bundling
- **Progressive Enhancement:** Core functionality without JavaScript
- **SEO Optimization:** Meta tags, structured data, sitemap generation

### Hydration Strategy
- **Selective Hydration:** Only interactive components receive client-side JavaScript
- **Performance Budget:** Minimal JavaScript bundle size for fast loading
- **Fallback Support:** Graceful degradation when JavaScript fails or is disabled

## Quality Assurance

### Build Performance
- Build time optimization for development workflow
- Bundle size monitoring and optimization
- Asset delivery optimization (compression, caching)
- Core Web Vitals compliance (LCP, FID, CLS)

### Framework Best Practices
- Component reusability and maintainability
- Proper separation of concerns across component boundaries
- TypeScript integration for type safety
- Astro-specific performance optimizations

### Integration Testing
- Build process validation across environments
- Component hydration testing
- Progressive enhancement verification
- Cross-browser compatibility testing

### Developer Experience
- Clear component organization and naming conventions
- Comprehensive error handling and debugging support
- Hot reload functionality for development efficiency
- Documentation integration with framework patterns