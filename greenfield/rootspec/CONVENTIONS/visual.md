# Visual Conventions

## Color System

**Theme Structure**: Dark/Light theme support
- System preference detection with manual override
- CSS custom properties for dynamic color application
- High contrast mode compatibility

**Primary Palette**:
- Brand colors that reinforce RootSpec methodology themes
- Sufficient contrast ratios for accessibility compliance
- Semantic color usage (success, warning, error states)

## Typography

**Hierarchy**:
- Clear heading structure (H1-H4) for content organization
- Readable font sizes across all device sizes
- Consistent line height for optimal readability

**Content Guidelines**:
- Technical but accessible language for developer audience
- No buzzwords or marketing speak per SEED.md requirements
- Clear, descriptive text for all interactive elements

## Layout & Spacing

**Grid System**: 12-column responsive grid
- Mobile-first responsive design
- Consistent spacing scale using CSS custom properties
- Maximum content width of 1200px for readability

**Component Spacing**:
- Section spacing: 80px for visual breathing room
- Component spacing: 24px between related elements
- Touch targets: minimum 44px for mobile accessibility

## Interactive Elements

**Buttons & Controls**:
- Clear visual affordances for interactive elements
- Consistent hover and focus states
- Loading and disabled states for form controls

**Animation Guidelines**:
- Respect `prefers-reduced-motion` user preference
- Smooth transitions (200-400ms) for state changes
- Purposeful animation that supports user understanding

## Responsive Behavior

**Breakpoints**:
- Mobile: up to 768px
- Tablet: 768px to 1024px  
- Desktop: 1024px and above

**Content Adaptation**:
- Progressive disclosure for complex interactive features
- Touch-optimized interactions on mobile devices
- Readable text scaling without layout breakage

## Accessibility Visual Standards

**Focus Management**:
- Clear, visible focus indicators (2px outline minimum)
- Logical tab order through all interactive elements
- Skip links for efficient keyboard navigation

**Contrast Requirements**:
- WCAG AA compliance: 4.5:1 for normal text
- WCAG AAA for high contrast mode: 7:1 ratio
- Color not as sole means of conveying information

## Brand Expression

**Tone**: Confident but not preachy, technical but accessible
- Visual design reflects the structured, methodical nature of RootSpec
- Clean, organized layouts that demonstrate the methodology's clarity
- Professional appearance without corporate polish

**Demo Acknowledgment**:
- Meta banner clearly identifies generated nature of site
- Honest representation of what minimal iteration produces
- Links to source materials (SEED.md, specification files)

## Error & Feedback States

**User Feedback**:
- Success messages: 3-second display duration
- Error messages: 5-second display duration  
- Inline validation with helpful guidance

**Graceful Degradation**:
- Functional fallbacks when JavaScript unavailable
- Readable content with basic browser styling
- Clear messaging when features fail to load