# Level 4: Layout System

## Responsibility

Owns the structural scaffolding of the page: the header, navigation, meta banner slot, footer, responsive grid, and breakpoint behavior. Controls how content sections are arranged and how navigation collapses on small viewports.

## Boundaries

**Owns:**
- Page-level structure (header, main, footer slots)
- Navigation component (links, mobile collapse behavior, theme toggle placement)
- Responsive breakpoints and grid
- Meta banner placement (occupies a fixed slot, renders META_SYSTEM content)
- Scroll behavior and section anchoring
- Tap target sizing on mobile

**Does not own:**
- Content within sections (CONTENT_SYSTEM)
- Theme tokens (THEME_SYSTEM)
- Interactive component behavior (INTERACTIVE_SYSTEM)
- External links and URLs (META_SYSTEM)

## Data Ownership

### Navigation State

- `navOpen`: boolean — whether mobile navigation is open
- `activeSection`: string — current visible section (for nav highlight state)
- Nav links: static list derived from CONTENT_SYSTEM section IDs and headings

### Viewport State

- Single responsive threshold: mobile vs. desktop
- Below threshold: navigation collapses, single-column layout
- Above threshold: navigation visible, multi-column layout where appropriate

### Layout Slots

1. **Meta banner** — always first, above all other content; rendered sticky or prominent at top
2. **Header** — site name, navigation links, theme toggle
3. **Main content** — sequential sections in CONTENT_SYSTEM order
4. **Footer** — attribution text, builder name, build date

## Responsive Behavior

### Mobile (below breakpoint)

- Navigation: hamburger or compact stack; expands on tap
- Meta banner: visible without scrolling, may wrap to multiple lines
- Hero text: reflows cleanly; no overflow, no awkward hyphenation
- Diagram: scales proportionally; no horizontal scroll
- Hierarchy explorer and wizard: usable with thumb-only interaction
- No horizontal scrolling at any width down to [minimum supported width]
- Tap targets: minimum [accessible touch target size] × [accessible touch target size]

### Desktop (above breakpoint)

- Navigation: visible inline in header
- Content: generous line length for prose; single or two-column where content benefits
- Interactive sections: full-width or constrained to readable width

## State Transitions

```
Viewport width changes → layout recalculates; nav state resets to closed
User taps hamburger → navOpen = true
User taps nav link or outside nav → navOpen = false
User scrolls → activeSection updates to current visible section
```

## Interactions with Other Systems

| System | Interaction |
|--------|-------------|
| META_SYSTEM | Banner content is provided by META_SYSTEM; LAYOUT_SYSTEM provides the slot and positioning |
| CONTENT_SYSTEM | Section content is wrapped in layout containers; section IDs come from CONTENT_SYSTEM |
| THEME_SYSTEM | Layout elements use THEME_SYSTEM color tokens; no layout-specific colors defined here |
| INTERACTIVE_SYSTEM | LAYOUT_SYSTEM provides viewport context; interactive components adapt to mobile/desktop |

## Rules

- Meta banner must be visible above the fold on all viewports without scrolling — this is the highest-priority layout constraint
- Navigation label for author's notes section must read "Why I Built RootSpec" — identical to section heading
- Footer must include: builder attribution (Claude / AI model used), build date
- No horizontal scroll at any viewport width down to [minimum supported width]
- Mobile nav must not trap focus — closing the nav returns focus to the trigger
- All section anchors resolve correctly under the `/demos/greenfield/` base path
