# Visual Design

*Generated from L1 design pillars and L3 interaction patterns*

## 1. Design Principles

### Effortless Clarity → Visual Simplicity
Weather information is immediately understandable through clear hierarchy and minimal visual noise.

- **Large data display** — Temperature dominates with emoji condition indicators
- **Minimal chrome** — No unnecessary borders, shadows, or decorative elements  
- **Information hierarchy** — Size, weight, and color communicate importance, not decoration
- **Alert visibility** — Condition-based alerts surface automatically with color coding

### Familiar Comfort → Consistent Warmth  
The interface feels like a personal tool with consistent, comfortable visual patterns.

- **Soft edges** — Rounded corners (8-12px radius) on cards, buttons, and chips
- **Warm neutral palette** — Grays with warm undertones, not cold blue-grays
- **Consistent accent** — Single accent color for all interactive elements
- **Predictable layouts** — Similar content types use similar visual patterns

### Ambient Awareness → Contextual Surfacing
Relevant information appears naturally without hunting or configuration.

- **Conditional display** — Alerts, save buttons, and comparison options only appear when relevant
- **Progressive disclosure** — Settings panel collapsed by default, favorites appear after saving locations
- **Inline feedback** — Precipitation probability shown contextually in forecasts
- **State clarity** — Active selections and current location clearly highlighted

> Source: 01.PHILOSOPHY.md — Design Pillars translated to visual principles

## 2. Component Patterns

### Primary Components

**Search Bar**
- Full-width text input with debounced autocomplete dropdown
- Clean dismiss behavior on city selection
- Prominent placement for immediate access

**Weather Display Cards**
- Centered layout with city name and weather emoji header
- Large temperature display as primary focal point
- Secondary details row (humidity, wind, UV) with emoji prefixes
- Alert badges positioned above when conditions warrant

**Favorites Management**
- Horizontal chip bar with pill-shaped buttons
- Active city highlighted with accent color fill
- Remove affordance (✕) with hover reveal
- Wraps to multiple lines as needed

**Forecast Components**
- Hourly strip: horizontal scroll with fixed-width time cards showing emoji, temp, precipitation
- Daily chart: proportional height bars with gradient fills between high/low temperatures
- Consistent emoji usage for weather condition recognition

### Multi-View Components

**Dashboard Grid**
- Auto-fill responsive grid (minimum 180px per card)
- Location cards show current temp and conditions
- Hover states provide selection feedback
- Compare button positioned above grid when applicable

**Comparison Interface**
- Selection mode: cards become toggleable with accent borders or check indicators
- Comparison view: equal-width columns (2-3) in flexible layout
- Each column: city header with deselect option, compact weather display, condensed forecast
- "Back to Dashboard" navigation at top of comparison view

**Settings Panel**
- Collapsible section with toggle control
- Binary option buttons (active state uses accent fill)
- Dropdown for default city selection from favorites
- Immediate persistence of all changes

> Source: 03.INTERACTIONS.md — Core Journeys mapped to visual patterns
> Source: 05.IMPLEMENTATION/USER_STORIES/ — specific component behaviors

## 3. Layout Approach

### Overall Structure
- **Single-column layout** with 640px max-width, auto margins for desktop
- **Vertical stacking** of all primary content regions
- **Sticky header** maintains context across view transitions

### Content Regions (in order)
1. **Header** — App title and view toggle (when favorites exist)
2. **Search** — Always accessible city search input
3. **Settings** — Collapsible preferences panel
4. **Primary Content** — Weather view, dashboard grid, or comparison columns
5. **Footer** — Attribution and version information

### View-Specific Layouts

**Weather View**
- Standard single-column layout at 640px max-width
- Favorites bar below search when locations are saved
- Weather content stack: alerts → current weather → hourly → daily forecast

**Dashboard View**  
- Grid layout within the 640px container
- Auto-fill responsive grid, minimum 180px per card
- Compare button above grid when 2+ favorites exist

**Comparison View**
- Expanded layout to accommodate 2-3 columns (960px+ max-width)
- Equal-width columns with vertical content stacking
- Each column uses compact versions of weather view components

### Navigation Model
- **No routing** — three view states managed via application state
- **View toggle** in header switches between Weather and Dashboard
- **Comparison** entered from Dashboard, returns to Dashboard on completion
- **Search selection** automatically switches to Weather view

> Source: 03.INTERACTIONS.md — interaction loops and view transitions

## 4. Color & Typography Direction

### Color Palette

**Base Colors**
- Background: Light warm gray (#f0f2f5) for overall page
- Cards: White with subtle borders (#eee) for content containers
- Text: Dark gray (#333) primary, medium gray (#666) secondary, light gray (#999) tertiary

**Interactive Colors**
- Primary accent: Indigo (#667eea) for active states, links, selection highlights
- Gradient accent: Indigo to purple (#667eea → #764ba2) for forecast bars
- Hover states: Subtle opacity changes and shadow additions

**Semantic Colors**
- Alert red: Danger conditions and error states
- Alert amber: Warning conditions
- Alert blue: Information and notices
- Alert gray: Neutral status indicators

**Selection States**
- Accent border or subtle accent background for selected comparison cards
- Accent fill for active favorites chips and settings options

### Typography Scale

**Font Stack**
- System fonts: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
- Fallback: Arial, sans-serif

**Scale & Weights**
- Metadata: 12px regular (timestamps, attribution)
- Body text: 13-14px regular (descriptions, details)
- Controls: 14px regular (buttons, inputs, labels)  
- Empty states: 16px regular (prompts, instructions)
- Section headers: 18px medium (component titles)
- App title: 24px semibold (header branding)
- Temperatures: Large sizes 28-36px semibold (primary data display)
- City names: 20px semibold (location headers)

**Comparison Adjustments**
- Compact variants use slightly reduced font sizes for column layouts
- Maintain relative hierarchy while fitting more content per column

> Source: 01.PHILOSOPHY.md — emotional targets inform visual mood
> Source: Existing codebase — styled-components implementation patterns

## 5. Responsive Strategy

### Desktop-First Approach
The 640px max-width container naturally works on mobile devices without complex breakpoints.

**Key Responsive Behaviors**
- **Dashboard grid** uses auto-fill with 180px minimum — collapses to single column on narrow screens
- **Favorites chips** wrap to multiple rows as needed
- **Hourly forecast** scrolls horizontally with touch-friendly controls
- **Daily forecast** bars use flexible sizing with 60px minimum width

**Comparison View Responsive**
- **Wide screens** (960px+): 3-column side-by-side layout
- **Medium screens** (640-960px): 2-column layout with optional vertical stack at breakpoint
- **Narrow screens** (<640px): Single column with sequential city comparisons

### Mobile Considerations
- **Touch targets** minimum 44px for buttons and interactive elements
- **Scroll areas** optimized for touch interaction
- **Content spacing** sufficient for thumb navigation
- **Text sizing** maintains readability without zoom requirements

### Breakpoint Strategy
- **No media queries** in current implementation for main layout
- **Comparison view** may introduce first breakpoint for column transitions
- **Container queries** preferred over viewport queries for component responsiveness

> Source: 02.TRUTHS.md — responsive constraints
> Source: 03.INTERACTIONS.md — interaction patterns across screen sizes

## Implementation Notes

### Existing Visual Implementation
The current codebase uses a mix of styled-components and global CSS, implementing these design principles through:
- Consistent spacing scale and color usage
- Emoji-first weather condition display
- Subtle shadows and rounded corners for depth
- Clean typography hierarchy with system fonts

### Visual Debt Areas
- **Styling consistency** — Mix of styled-components, CSS modules, and inline styles
- **Component variants** — No systematic approach to compact/expanded component versions
- **Design tokens** — Colors and spacing values scattered across components

### Enhancement Opportunities
- **Design system** — Centralized tokens for colors, spacing, typography
- **Comparison UI** — New visual patterns for multi-city comparison interface
- **Accessibility** — Color contrast verification and focus state improvements

> Source: src/styles/ and component analysis — actual visual implementation patterns