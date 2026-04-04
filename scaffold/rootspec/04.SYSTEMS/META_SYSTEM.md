# META_SYSTEM

## Responsibility
Manages the demo framing layer — the meta banner, attribution, theme toggling, and links to RootSpec artifacts.

## Data
- **Banner content** — Static: explains seed → spec → implementation pipeline
- **Theme state** — Current theme (light/dark), stored in client-side storage
- **Links** — URLs to SEED.md, spec files, scaffold commit in GitHub repo

## Behaviors
- Meta banner renders on every page, explains the demo origin
- Banner links to SEED.md, spec directory, and scaffold commit
- Theme toggle: switches between light and dark mode
- Theme detection: reads system preference on first load, applies it
- Theme persistence: saves choice to localStorage, respects it on subsequent page loads within session
- Footer: displays RootSpec version, build context, link to rootspec repo

## Boundaries
- Does not interact with other systems — purely presentational
- Theme state is global but owned solely by META_SYSTEM
