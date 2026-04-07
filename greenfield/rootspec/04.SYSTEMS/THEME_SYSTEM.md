# THEME_SYSTEM

*References: [[01.PHILOSOPHY]] [[02.TRUTHS]] [[03.INTERACTIONS]] [[SYSTEMS_OVERVIEW]]*

## Responsibility

Coordinates visual consistency across all systems through dark/light mode management, color token distribution, and design system implementation. Ensures coherent visual experience while respecting user preferences.

## Boundaries

**Owns**:
- CSS custom property definitions for colors, spacing, typography
- Theme preference detection and storage
- Dark/light mode toggle functionality
- Design token coordination across all visual elements
- Animation and motion preference handling

**Does Not Own**:
- Component structure or layout (LAYOUT_SYSTEM)
- Interactive behavior (INTERACTIVE_SYSTEM)
- Content markup (CONTENT_SYSTEM)
- Accessibility implementation details (ACCESSIBILITY_SYSTEM)

## Data Ownership

**Theme Preferences**: User's dark/light mode choice, system preference detection results
**Design Tokens**: Color palettes, typography scales, spacing values, motion timing
**Visual State**: Current theme application, CSS custom property values
**Motion Settings**: User's motion preference, animation enable/disable state

## Interactions with Other Systems

**← ACCESSIBILITY_SYSTEM**: Receives motion preference detection, contrast requirements, focus indicator specifications
**→ CONTENT_SYSTEM**: Provides CSS class hooks and theme-aware markup patterns
**→ INTERACTIVE_SYSTEM**: Supplies visual tokens for dynamic component styling, theme change event notifications
**→ LAYOUT_SYSTEM**: Coordinates color contrast requirements, spacing token consistency

## Implementation Patterns

**CSS Custom Properties**: Centralized design token system with automatic theme switching
**Progressive Enhancement**: CSS-only theme application with JavaScript enhancement for user preferences
**Storage Management**: localStorage for theme persistence, automatic fallback to system preferences
**Event Coordination**: Custom events for theme changes, automatic re-render coordination

## Design Token Structure

**Colors**: Primary, secondary, accent, neutral scales with automatic dark/light variants
**Typography**: Font families, size scales, line heights, font weights
**Spacing**: Consistent spacing scale for margins, padding, gaps
**Motion**: Duration, easing, animation preferences
**Shadows**: Elevation system with theme-appropriate depth
**Borders**: Radius values, border widths, outline specifications

## Theme Switching Logic

1. **Initial Load**: Detect system preference via `prefers-color-scheme` media query
2. **Storage Check**: Override with user's stored preference if available
3. **Application**: Apply theme via CSS custom property updates
4. **Persistence**: Store user's explicit choice for future sessions
5. **Coordination**: Notify other systems of theme change via custom events