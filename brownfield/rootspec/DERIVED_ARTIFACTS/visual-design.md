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

### Familiar Comfort → Consistent Warmth
Soft edges, neutral backgrounds, accent color for interactive elements. The interface should feel like a personal tool, not a data dashboard.
- Rounded corners on cards and chips (8-12px radius)
- Warm neutral palette (grays, not blue-grays)
- Active states use the accent color (#667eea) consistently

### Ambient Awareness → Contextual Surfacing
Information appears when relevant, not by default. Alerts, precipitation probability, and the save button appear only when applicable.
- Alerts render above weather card only when thresholds are met
- Precipitation percentage shown inline only when > 0%
- Save button absent for already-saved cities
- View toggle absent when no favorites exist

---

## 2. Component Patterns

> Source: 03.INTERACTIONS.md — Core Journeys, 05.IMPLEMENTATION/USER_STORIES/

**Search input + dropdown:** Full-width text input with debounced autocomplete. Dropdown overlays content below. Clean dismiss on selection.

**Weather card:** Centered layout with city name + emoji header, large temperature, description, and a details row (humidity, wind, UV) using emoji prefixes.

**Chip bar:** Horizontal wrap of pill-shaped buttons for favorites. Active chip uses accent fill. Remove affordance (✕) inline with opacity hover reveal.

**Hourly strip:** Horizontal scroll with arrow controls. Fixed-width hour cards showing time, emoji, temperature, and optional precipitation.

**Forecast bar chart:** Horizontal flex of day columns with proportional height bars (gradient fill) between high and low temperatures.

**Dashboard grid:** Auto-fill responsive grid (minmax 180px). Hover shadow on cards. Click navigates to weather view.

**Settings panel:** Collapsible section with toggle button. Binary option buttons (active = accent fill). Select dropdown for default city.

**Alert badges:** Small colored pills. Background and text color vary by severity. No dismiss — they reflect current conditions.

---

## 3. Layout Approach

> Source: 03.INTERACTIONS.md — Interaction Loop Architecture

**Single-column, centered:** Max-width 640px, auto margins. All content stacks vertically.

**Region order:**
1. Header (title + view toggle) — sticky context
2. Search — always accessible
3. Settings — collapsed by default, secondary
4. Content (weather view OR dashboard) — primary focus

**Navigation:** No pages, no routes. Two views (weather/dashboard) toggled by header buttons. City selection via search or chip click.

**Information hierarchy:** Search → context (favorites/settings) → primary data (weather/dashboard). Most important action (search) is always visible and topmost.

---

## 4. Color & Typography Direction

> Source: 01.PHILOSOPHY.md — Pillars, existing codebase

**Palette direction:**
- Background: Light warm gray (#f0f2f5)
- Cards: White with subtle borders (#eee)
- Primary accent: Indigo (#667eea) — used for active states, links, interactive highlights
- Gradient accent: Indigo to purple (#667eea → #764ba2) — forecast bars
- Alert colors: Semantic (red for danger, amber for warning, blue for info, gray for neutral)
- Text: Dark gray (#333) primary, medium gray (#666) secondary, light gray (#999) tertiary

**Typography:**
- System font stack: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif
- Scale: 12px (metadata) → 13-14px (body/controls) → 16px (empty state) → 18px (section headers) → 24px (app title) → large (temperature display)
- Weight: 400 normal, 500 medium (alerts), 600 semibold (temperatures, city names)

---

## 5. Responsive Strategy

> Source: 02.TRUTHS.md — Constraints, 03.INTERACTIONS.md

**Desktop-first, responsive-tolerant.** The 640px max-width means the layout naturally works on mobile without breakpoints. Key responsive behaviors:

- Forecast chart uses `flex: 1 0 0` with `minWidth: 60px` and horizontal scroll overflow
- Dashboard grid uses `auto-fill, minmax(180px, 1fr)` — collapses to single column on narrow screens
- Hourly strip scrolls horizontally with arrow controls
- Favorites chips wrap to multiple rows

No media queries in the existing codebase. The narrow max-width and flex/grid patterns handle most viewport sizes without explicit breakpoints.
