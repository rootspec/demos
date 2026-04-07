# Theme System

## Responsibility
Controls visual presentation and user theme preferences for the RootSpec marketing site. Manages dark/light mode detection, theme switching, preference persistence, and coordinates theme application across all visual components.

## Boundaries
**Owns:**
- Theme state management and preference detection
- Dark/light mode switching functionality  
- Theme preference persistence across sessions
- CSS custom property coordination for theme values
- Motion and accessibility preference respect

**Does not own:**
- Individual component styling or layout (LAYOUT_SYSTEM)
- Interactive behavior or state (INTERACTIVE_SYSTEM)
- Content or configuration data (CONTENT_SYSTEM)
- Semantic structure or ARIA attributes (ACCESSIBILITY_SYSTEM)

## Data Ownership

**Theme State:**
```typescript
{
  currentTheme: 'light' | 'dark' | 'system',
  resolvedTheme: 'light' | 'dark',
  systemPreference: 'light' | 'dark',
  userHasManualPreference: boolean,
  motionPreference: 'reduce' | 'normal',
  contrastPreference: 'normal' | 'high'
}
```

**Theme Configuration:**
```typescript
{
  light: {
    colors: { primary: string, background: string, text: string, ... },
    shadows: { subtle: string, prominent: string, ... },
    typography: { weights: Record<string, number>, sizes: Record<string, string> }
  },
  dark: {
    colors: { primary: string, background: string, text: string, ... },
    shadows: { subtle: string, prominent: string, ... },
    typography: { weights: Record<string, number>, sizes: Record<string, string> }
  }
}
```

## Interactions with Other Systems

**→ LAYOUT_SYSTEM:** Provides theme values for visual styling
- CSS custom properties for colors, typography, and spacing
- Motion preference values for animation timing
- Contrast preference values for visual emphasis

**→ INTERACTIVE_SYSTEM:** Coordinates theme changes with dynamic elements
- Updates theme-sensitive interactive components
- Applies theme to dynamically generated content (wizard output)
- Ensures smooth transitions during theme switching

**← ACCESSIBILITY_SYSTEM:** Receives accessibility preference overrides
- Respects reduced motion preferences for animations
- Applies high contrast mode when requested
- Ensures color contrast meets WCAG requirements

**→ CONTENT_SYSTEM:** Influences content presentation
- Theme-appropriate icon selection
- Color-coded examples in before/after comparisons
- Visual hierarchy emphasis based on current theme

## Theme Management

**System Preference Detection:**
- Uses `prefers-color-scheme` media query for initial detection
- Listens for system preference changes during session
- Automatically updates resolved theme when system changes

**Manual Override:**
- User can explicitly select light or dark mode
- Manual preference persists across browser sessions
- Manual preference overrides system detection

**Preference Persistence:**
- Stores user theme choice in localStorage
- Syncs preference across browser tabs
- Graceful fallback to system preference if storage fails

**Theme Application:**
- Updates CSS custom properties on `<html>` element
- Provides smooth transition animations between themes
- Ensures theme consistency across all page sections

## Visual Coordination

**Color Management:**
- Semantic color tokens (primary, secondary, accent, neutral)
- Automatic contrast calculation for accessibility compliance
- Dark/light mode color variations with consistent relationships

**Typography Coordination:**
- Theme-appropriate font weights and sizing
- Contrast-adjusted text colors for readability
- Consistent typography hierarchy across themes

**Motion Preferences:**
- Respects `prefers-reduced-motion` for accessibility
- Scales animation duration based on preference
- Provides immediate theme switching when motion is reduced

**Focus and Interactive States:**
- Theme-appropriate focus indicator styling
- Hover and active state colors that work in both themes
- Accessible contrast ratios for all interactive elements

## Performance Considerations

**CSS Custom Properties:** Efficient theme switching without layout recalculation or component re-rendering.

**Minimal JavaScript:** Theme detection and switching require minimal client-side processing.

**No Flash of Wrong Theme:** Server-side theme detection prevents initial theme flicker.

**Efficient Storage:** Lightweight preference storage with automatic cleanup of outdated values.