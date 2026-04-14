# Level 4: Meta System

**Responsibility:** Persistent UI chrome — navigation header, meta banner, footer, theme management, and RootSpec version display. Present on every page.

---

## Boundaries

- **Owns:** Layout shell (nav, banner, footer), theme state, RootSpec version string display
- **Does not own:** Page-specific content, route-specific data, any post or user data
- **Routes:** All routes (implemented in `+layout.svelte`)

---

## Data Ownership

### Theme State (client-side, partially persisted)
- `current: 'light' | 'dark'` — active theme value
- Initialization order:
  1. Check `localStorage` for `rootfeed-theme`
  2. If found and valid, use stored value
  3. If not found, check `window.matchMedia('(prefers-color-scheme: dark)')`
  4. Default to `'light'` if neither condition applies
- On toggle: update `theme.current`, write to `localStorage`, toggle `dark` class on `<html>` element

### Static Display Data
- **RootSpec version:** `7.2.5` (from `00.FRAMEWORK.md` — displayed as-is)
- **Meta banner links:** External URLs to SEED.md, spec files directory, and the original scaffold commit hash in the demo repo
- **Footer attribution:** RootSpec version, build date (static), builder identity, link to rootspec/rootspec repo

---

## Rules

### Navigation Header
- Always visible at the top of every page
- Contains: RootFeed logo/name (links to `/`), Home link, Explore link, Search link, RootSpec version badge, theme toggle button
- RootSpec version badge format: `v[version]` (e.g., `v7.2.5`)
- Theme toggle shows a sun icon (switch to light) or moon icon (switch to dark), depending on current theme

### Meta Banner
- Always visible immediately below the navigation, above page content
- Contains: descriptive text about the scaffold origin, links to:
  - SEED.md in the GitHub repo
  - Spec files directory in the GitHub repo
  - The original scaffold commit
- Must not be dismissible — it is a permanent fixture, not a notification

### Footer
- Always visible at the bottom of every page
- Contains:
  - "Built with RootSpec v[version]"
  - Build date (static string, set at implementation time)
  - Builder identity (e.g., "Claude Sonnet 4" or the implementing agent)
  - Link to `https://github.com/rootspec/rootspec`

### Theme Application
- The `dark` CSS class on `<html>` controls dark mode for all Tailwind `dark:` variants
- All pages inherit theme automatically through Tailwind's dark mode class strategy
- No per-page or per-component theme overrides

---

## State Transitions

```
Theme State:
  light → (click toggle) → dark
  dark → (click toggle) → light

  On init (browser):
    localStorage='dark' → dark
    localStorage='light' → light
    no storage, system=dark → dark
    no storage, system=light → light
    no storage, no system preference → light
```

---

## System Interactions

- **→ All systems:** Provides the layout shell that wraps every page
- **← All systems:** All page content renders inside the layout slot
- **No data dependencies** on other systems — META_SYSTEM is purely structural and presentational
