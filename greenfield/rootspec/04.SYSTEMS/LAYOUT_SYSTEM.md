# Layout System

**References:** `01.PHILOSOPHY.md`, `02.TRUTHS.md`, `03.INTERACTIONS.md`, `SYSTEMS_OVERVIEW.md`, `CONTENT_SYSTEM.md`, `THEME_SYSTEM.md`

---

## Responsibility

Manages overall page structure: the meta banner, site header (including theme toggle and version badge), section layout, responsive breakpoints, and navigation. This system owns how content is positioned and structured on the page — not what the content says or how it animates.

---

## Page Structure

```
┌─────────────────────────────────┐
│ Meta Banner (always visible)    │
├─────────────────────────────────┤
│ Site Header                     │
│  ├─ Logo / wordmark             │
│  ├─ Version badge               │
│  └─ Theme toggle                │
├─────────────────────────────────┤
│ Hero Section                    │
│  ├─ Tagline                     │
│  └─ One-sentence explanation    │
├─────────────────────────────────┤
│ Problem Section                 │
├─────────────────────────────────┤
│ How It Works Section            │
│  └─ Methodology Diagram (SVG)  │
├─────────────────────────────────┤
│ Hierarchy Explorer Section      │
├─────────────────────────────────┤
│ Spec Wizard Section             │
├─────────────────────────────────┤
│ Before/After Comparison Section │
├─────────────────────────────────┤
│ Open Source CTA Section         │
├─────────────────────────────────┤
│ Footer                          │
│  └─ Builder name, build date   │
└─────────────────────────────────┘
```

---

## Meta Banner

- Persists at the top of every page view
- Never hidden, scrolled away, or dismissible
- Contains: build method description + two absolute GitHub links
- Must be readable in both dark and light modes

---

## Header

- Contains: version badge (from CONTENT_SYSTEM), theme toggle (from THEME_SYSTEM)
- Version badge is prominent — visible without searching
- Theme toggle is accessible via keyboard

---

## Responsive Strategy

| Breakpoint | Layout Behavior |
|-----------|-----------------|
| Mobile ([small width]) | Single-column, stacked sections, touch-sized tap targets |
| Tablet ([medium width]) | Single or two-column depending on section content |
| Desktop ([large width]) | Wider content with side-by-side where appropriate |

All interactive features must be fully functional at minimum supported mobile width.

---

## Navigation

This is a single-page marketing site — no multi-page routing is required. Smooth scroll to sections if navigation anchors are present. No sticky navigation is required (meta banner takes that position).

---

## Base Path Configuration

The site is deployed at `/demos/greenfield/`. The framework's base path must be configured so:
- All asset URLs (CSS, JS, images, fonts) resolve correctly from the subpath
- Internal links work correctly from the subpath
- The static prerenderer does not use relative URLs for external links (already handled by CONTENT_SYSTEM using absolute URLs)

---

## Data Ownership

- Receives version string from CONTENT_SYSTEM for badge
- Receives `currentMode` from THEME_SYSTEM for visual state
- Emits toggle events to THEME_SYSTEM on toggle activation
- Emits viewport/breakpoint signals to INTERACTIVE_SYSTEM

---

## Rules

- Meta banner must be visible on page load without user action on all viewport sizes
- No section may be completely hidden from view — all content must be reachable by scrolling
- Footer must include builder name and build date (per L1 attribution requirement)
- Base path configuration is a build-time concern, not runtime — do not patch URLs dynamically

---

## Interactions with Other Systems

- Provides viewport and breakpoint signals to: INTERACTIVE_SYSTEM
- Receives: version string from CONTENT_SYSTEM
- Receives: theme mode from THEME_SYSTEM
- Emits: theme toggle events to THEME_SYSTEM
- Contains: INTERACTIVE_SYSTEM components (Hierarchy Explorer, Spec Wizard, Before/After)
