# L4: Theme System

## Responsibility
Manages visual design consistency, dark/light theme implementation, and aesthetic presentation that supports RootSpec's "clarity over convenience" design pillar.

## Boundaries

### Owns
- Color palette definitions and theme switching
- Typography scales and font loading
- Spacing system and visual rhythm
- Animation timing and motion design
- Visual hierarchy and design tokens
- Theme preference detection and persistence

### Does Not Own  
- Content structure and information architecture (managed by Content System)
- Interactive behavior and state management (managed by Interactive System)
- Responsive layout and grid systems (managed by Layout System)
- Component rendering and hydration (managed by Framework Integration)

## Data Ownership

### Design Tokens
- Color palette (primary, secondary, neutral, semantic colors)
- Typography scale (font sizes, weights, line heights)  
- Spacing system (margin, padding, gap values)
- Animation properties (durations, easing curves, delays)
- Border radius, shadows, and surface treatments

### Theme State
- Current theme preference (light/dark/system)
- System theme detection results
- User override preferences
- Theme-specific asset references

## Interactions with Other Systems

### → Content System
- **Provides:** Visual styling for content hierarchy and readability
- **Receives:** Content structure requiring thematic treatment
- **Interface:** CSS custom properties, component styling classes

### → Interactive System
- **Provides:** Visual feedback styling for interactive states
- **Receives:** Interactive state changes requiring visual updates
- **Interface:** State-based styling, animation coordination

### → Layout System  
- **Provides:** Theme-aware responsive styling adjustments
- **Receives:** Breakpoint context for theme adaptations
- **Interface:** Responsive design tokens, conditional styling

### → Framework Integration
- **Provides:** CSS architecture and build-time style processing
- **Receives:** Astro component styling requirements
- **Interface:** Scoped styles, global CSS custom properties

## Internal Structure

### Color System
1. **Light Theme**
   - Background: Clean whites and warm grays
   - Text: High contrast dark grays and blacks  
   - Accent: Professional blue with accessibility compliance
   - Interactive: Clear hover and focus states

2. **Dark Theme**
   - Background: Rich dark grays and near-blacks
   - Text: Warm whites and light grays
   - Accent: Brightened blue maintaining contrast ratios
   - Interactive: Subtle glow effects for feedback

### Typography Hierarchy
- **Primary Font:** Modern sans-serif for readability
- **Code Font:** Monospace for technical content
- **Heading Scale:** Clear hierarchy supporting content structure
- **Body Text:** Optimized for extended reading

### Motion Design
- **Micro-interactions:** Button hovers, focus indicators  
- **Content Transitions:** Smooth section reveals, theme switching
- **Interactive Feedback:** Immediate response to user actions
- **Respect Motion Preferences:** Reduced motion support

## Quality Assurance

### Accessibility Standards
- WCAG AA contrast ratios in both themes
- Focus indicators clearly visible in all contexts
- Motion respects user system preferences
- Color not sole means of conveying information

### Design Consistency  
- Design tokens prevent arbitrary styling
- Component styles inherit from central system
- Visual rhythm maintained across all breakpoints
- Theme switching preserves layout and functionality

### Performance Optimization
- Critical CSS inlined for fast initial render
- Theme switching without layout shift
- Font loading optimized to prevent FOIT/FOUT
- CSS custom properties for efficient theme updates