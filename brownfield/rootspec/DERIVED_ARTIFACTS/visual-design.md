# Visual Design

Derived from L1 design pillars and L3 interaction patterns. This is a brownfield project — existing visual choices are documented and mapped to spec intent.

---

## 1. Design Principles

> Source: 01.PHILOSOPHY.md — Design Pillars

### Effortless Clarity → Visual Simplicity
Large, prominent data. Minimal chrome. Information hierarchy enforced through size and weight, not decoration.
- Temperature is the largest text element in every context
- Weather emoji provides instant condition recognition without reading
- Alert badges use color alone to communicate severity
- **Comparison:** Side-by-side columns let differences register at a glance without mental context-switching

### Familiar Comfort → Consistent Warmth
Soft edges, neutral backgrounds, accent color for interactive elements. The interface should feel like a personal tool, not a data dashboard.
- Rounded corners on cards and chips (8-12px radius)
- Warm neutral palette (grays, not blue-grays)
- Active states use the accent color (#667eea) consistently
- **Comparison:** Selected cards use accent highlight; columns reuse the same card styles as the weather view

### Ambient Awareness → Contextual Surfacing
Information appears when relevant, not by default. Alerts, precipitation probability, and the save button appear only when applicable.
- Alerts render above weather card only when thresholds are met
- Precipitation percentage shown inline only when > 0%
- Save button absent for already-saved cities
- View toggle absent when no favorites exist
- **Comparison:** Compare button only appears when 2+ favorites exist; alerts surface per column

---

## 2. Component Patterns

> Source: 03.INTERACTIONS.md — Core Journeys, 05.IMPLEMENTATION/USER_STORIES/

**Search input + dropdown:** Full-width text input with debounced autocomplete. Dropdown overlays content below. Clean dismiss on selection.

**Weather card:** Centered layout with city name + emoji header, large temperature, description, and a details row (humidity, wind, UV) using emoji prefixes.

**Chip bar:** Horizontal wrap of pill-shaped buttons for favorites. Active chip uses accent fill. Remove affordance (✕) inline with opacity hover reveal.

**Hourly strip:** Horizontal scroll with arrow controls. Fixed-width hour cards showing time, emoji, temperature, and optional precipitation.

**Forecast bar chart:** Horizontal flex of day columns with proportional height bars (gradient fill) between high and low temperatures.

**Dashboard grid:** Auto-fill responsive grid (minmax 180px). Hover shadow on cards. Click navigates to weather view. Compare button positioned above the grid.

**Comparison selection cards:** Dashboard cards with a selectable toggle state — accent border or check indicator when selected. Non-destructive: clicking toggles, doesn't navigate.

**Comparison columns:** Equal-width columns (2-3) in a flex or grid row. Each column is a vertical stack: city name header with deselect affordance, then weather card, hourly strip (compact), and forecast chart (compact). "Back to Dashboard" link at the top of the comparison view.

**Settings panel:** Collapsible section with toggle button. Binary option buttons (active = accent fill). Select dropdown for default city.

**Alert badges:** Small colored pills. Background and text color vary by severity. No dismiss — they reflect current conditions.

---

## 3. Layout Approach

> Source: 03.INTERACTIONS.md — Interaction Loop Architecture

**Single-column, centered:** Max-width 640px, auto margins. All content stacks vertically.

**Comparison exception:** The comparison view needs wider layout to fit 2-3 columns. Options:
- Expand max-width to ~960px (3 × 300px columns + gaps)
- Or use the full viewport width with a max-width of ~1024px
- Each column maintains the same vertical stacking as the weather view but in a compact variant

**Region order:**
1. Header (title + view toggle) — sticky context
2. Search — always accessible
3. Settings — collapsed by default, secondary
4. Content (weather view OR dashboard OR comparison) — primary focus

**Navigation:** No pages, no routes. Three views (weather/dashboard/compare) managed via state. Comparison is entered from dashboard, not directly accessible from weather view.

**Information hierarchy:** Search → context (favorites/settings) → primary data (weather/dashboard/comparison). Most important action (search) is always visible and topmost.

---

## 4. Color & Typography Direction

> Source: 01.PHILOSOPHY.md — Pillars, existing codebase

**Palette direction:**
- Background: Light warm gray (#f0f2f5)
- Cards: White with subtle borders (#eee)
- Primary accent: Indigo (#667eea) — used for active states, links, interactive highlights, comparison selection
- Gradient accent: Indigo to purple (#667eea → #764ba2) — forecast bars
- Alert colors: Semantic (red for danger, amber for warning, blue for info, gray for neutral)
- Text: Dark gray (#333) primary, medium gray (#666) secondary, light gray (#999) tertiary
- Selection state: Accent border or subtle accent background for selected comparison cards

**Typography:**
- System font stack: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif
- Scale: 12px (metadata) → 13-14px (body/controls) → 16px (empty state) → 18px (section headers) → 24px (app title) → large (temperature display)
- Weight: 400 normal, 500 medium (alerts), 600 semibold (temperatures, city names)
- Comparison columns use slightly reduced font sizes for compact display

---

## 5. Responsive Strategy

> Source: 02.TRUTHS.md — Constraints, 03.INTERACTIONS.md

**Desktop-first, responsive-tolerant.** The 640px max-width means the layout naturally works on mobile without breakpoints. Key responsive behaviors:

- Forecast chart uses `flex: 1 0 0` with `minWidth: 60px` and horizontal scroll overflow
- Dashboard grid uses `auto-fill, minmax(180px, 1fr)` — collapses to single column on narrow screens
- Hourly strip scrolls horizontally with arrow controls
- Favorites chips wrap to multiple rows

**Comparison responsive behavior:** On narrow viewports, comparison columns may stack vertically (one per row) rather than side-by-side, since 2-3 columns at ~300px each require ~640-960px of content width. A single media query or container query can handle this transition.

No media queries in the existing codebase, but the comparison view may introduce the first one for the column layout breakpoint.
