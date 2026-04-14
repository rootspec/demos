# Level 4: Layout System

**System:** LAYOUT_SYSTEM
**References:** L1-3, Sibling L4, External

---

## Responsibility

Owns the overall page structure, section ordering, responsive layout behavior, and the mounting positions for all other systems' components. The Astro layout shell is the primary artifact of this system.

---

## Page Structure (Top to Bottom)

1. Meta Banner (CONTENT_SYSTEM)
2. Header — site name, version badge, theme toggle (THEME_SYSTEM toggle, FRAMEWORK_SYSTEM version)
3. Hero Section (CONTENT_SYSTEM + FRAMEWORK_SYSTEM)
4. Problem Section (CONTENT_SYSTEM)
5. How It Works Section (CONTENT_SYSTEM)
6. Hierarchy Explorer (INTERACTIVE_SYSTEM)
7. Spec Wizard (INTERACTIVE_SYSTEM)
8. Before/After Comparison (INTERACTIVE_SYSTEM)
9. CTA Section (CONTENT_SYSTEM)
10. Footer (CONTENT_SYSTEM)

---

## Responsive Behavior

- Single-column layout on mobile
- Two-column layouts for comparison panels on desktop
- Interactive components reflow to touch-friendly single-column on narrow viewports
- Section padding and typography scale with viewport width via Tailwind responsive classes
- Minimum supported viewport width: [min_width] — below this, horizontal scrolling is acceptable but not preferred

---

## Transitions and Animation

- Section entry animations on scroll (fade-in, translate-up) using CSS or Intersection Observer
- Animation duration and easing values defined in Tailwind config / CSS variables
- Respects `prefers-reduced-motion` — all animations disabled when user has this preference

---

## Data Ownership

- Page document structure (head, body, section order)
- Global meta tags (title, description, OG tags)
- Theme toggle button position and markup
- Scroll behavior and section IDs for anchor links

---

## Boundaries

- Does not own copy or content inside sections (CONTENT_SYSTEM owns that)
- Does not own theme state (THEME_SYSTEM owns that)
- Does not own interactive component logic (INTERACTIVE_SYSTEM owns that)
- Does not own the version string or GitHub URLs (FRAMEWORK_SYSTEM owns that)

---

## Interactions with Other Systems

| System | Nature |
|--------|--------|
| CONTENT_SYSTEM | Renders static sections in the defined order |
| INTERACTIVE_SYSTEM | Mounts React islands in designated section slots |
| THEME_SYSTEM | Applies theme class at root; renders theme toggle button in header |
| FRAMEWORK_SYSTEM | Receives version string for header display |
