# Theme System

**References:** `01.PHILOSOPHY.md`, `02.TRUTHS.md`, `03.INTERACTIONS.md`, `SYSTEMS_OVERVIEW.md`

---

## Responsibility

Manages visual mode (dark/light theme): detection of system preference, manual user toggle, and persistence of preference across sessions. This system is the single source of truth for current visual mode — no other system makes independent dark/light decisions.

---

## State

| State Property | Type | Source | Persistence |
|---------------|------|--------|-------------|
| `currentMode` | enum: dark \| light | system preference OR user override | localStorage |
| `userOverride` | boolean | manual toggle action | localStorage |

### State Transitions

```
Initial load:
  userOverride=false → read system preference → set currentMode
  userOverride=true  → read localStorage value → set currentMode (ignores system preference)

Toggle action:
  currentMode=dark  → currentMode=light, userOverride=true
  currentMode=light → currentMode=dark,  userOverride=true
```

---

## Detection

- System preference: read via `prefers-color-scheme` media query
- Preference changes (e.g., OS switches at sunset): optionally re-apply if no user override is set
- Initial render: mode must be applied before first paint to prevent flash of wrong theme

---

## Toggle

- Visible toggle control available in site header or accessible location
- Toggle must be keyboard accessible (focusable, activatable via Enter/Space)
- Transition between modes: smooth fade rather than hard flash
- Icon or label communicates current mode and what clicking will do

---

## Persistence

- Preference stored in localStorage under a stable key
- Survives page reload and navigation
- Cleared on explicit system-preference-only request (if implemented)
- No server-side storage — client-side only

---

## Integration

All visual systems read theme state from this system. They do not:
- Detect `prefers-color-scheme` themselves
- Store their own theme preference
- Apply hardcoded color values that ignore theme

SVG elements in the methodology diagram must adapt to theme state.

---

## Rules

- Flash of wrong theme is a failure state — server-side or inline script must apply theme class before rendering
- Theme toggle is an accessibility feature, not a cosmetic one — it must be reachable via keyboard
- User autonomy is respected: if a user sets a preference, it persists until they change it

---

## Interactions with Other Systems

- Provides `currentMode` to: LAYOUT_SYSTEM, INTERACTIVE_SYSTEM, PRESENTATION_SYSTEM
- Receives: toggle events from LAYOUT_SYSTEM (header toggle control)
