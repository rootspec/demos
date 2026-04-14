# THEME_SYSTEM

**Responsibility:** Dark/light mode detection, manual toggle, and localStorage persistence.

**Depends on:** 01.PHILOSOPHY.md, 02.TRUTHS.md, 03.INTERACTIONS.md

---

## State Managed

| State | Type | Default | Description |
|---|---|---|---|
| `theme` | `'light' \| 'dark'` | system preference | Active theme |

---

## Responsibilities

1. **System preference detection:** On first visit (no stored preference), detect `prefers-color-scheme: dark` and apply the matching theme.
2. **Manual toggle:** Theme toggle button in nav; clicking switches between light and dark.
3. **Persistence:** Store chosen theme in `localStorage` under key `rootfeed-theme`; on subsequent visits, restore stored preference over system default.
4. **DOM application:** Apply theme by toggling class `dark` on the `<html>` element (Tailwind dark mode via class strategy).
5. **Toggle indicator:** Button reflects current mode (e.g., sun icon for light, moon icon for dark).

---

## Boundaries

- THEME_SYSTEM does NOT own layout, nav, or any visible UI — it only manages the theme class and persistence.
- All visual dark mode styles are handled by Tailwind's `dark:` variants in VIEW_SYSTEM and component files.

---

## Interactions with Other Systems

| System | Interaction |
|---|---|
| VIEW_SYSTEM | Provides active theme class applied to root; toggle button rendered in layout nav |
