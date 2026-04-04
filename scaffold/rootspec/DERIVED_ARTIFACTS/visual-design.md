# Visual Design

Derived from the RootFeed specification. Regenerated on each `/rs-spec` run.

---

## 1. Design Principles

> Source: 01.PHILOSOPHY.md — design pillars

### Earned Credibility → Clarity and Precision
The UI should feel intentional and well-structured — not flashy, not minimal-to-a-fault. Clean lines, clear hierarchy, no decorative noise. Every element earns its place. The developer looking at this should think "this was designed, not thrown together."

### Effortless Curiosity → Inviting Depth
The interface should reward exploration. Clickable elements should be obviously interactive. Navigation should feel like a web of connected content — profiles link to posts, posts link to threads, tags link to filtered views. Visual cues draw the eye forward.

### Approachable Confidence → Familiar Patterns
Use social feed conventions developers already know (Bluesky, Twitter/X). Don't reinvent navigation, card layouts, or engagement patterns. Familiarity makes the demo approachable; the innovation is in *how* it was built, not *what* it looks like.

## 2. Component Patterns

> Source: 03.INTERACTIONS.md — interaction loops and feedback

### Post Card
The primary repeating element. Contains:
- Author avatar (circle, small), display name (bold), handle (muted), relative timestamp
- Post content (body text)
- Engagement row: like button + count, repost count, bookmark button
- Like/bookmark toggle: immediate visual state change (filled/outlined icon, color shift)
- Entire card clickable to post detail (except interactive buttons)

### Composer
Top of the home feed. Contains:
- Text input area (expandable or textarea)
- Character count indicator
- Submit button (disabled when empty/whitespace)
- Error state for validation

### Profile Header
Top of profile page. Contains:
- Avatar (larger), display name, handle, bio
- Follower/following counts
- Follow/unfollow button with state toggle (visual distinction between "Follow" and "Following")

### Meta Banner
Persistent across all pages. Contains:
- Brief explanation text (one or two sentences)
- Three links: seed, spec, scaffold commit
- Visually distinct from app content — different background, subtle border, or muted style
- Should feel like a developer toolbar, not an ad banner

### Navigation
Top bar with logo ("RootFeed") and route links. Current route visually indicated (bold, underline, or color). Compact — one row, left-aligned.

### Footer
RootSpec version, build context, link to repo. Muted, small text. Present but not prominent.

## 3. Layout Approach

> Source: 03.INTERACTIONS.md — screen architecture

### Single-Column, Centered
All content in a single centered column (`max-w-2xl` — already established in scaffold). This mirrors Bluesky/Twitter's reading-width constraint and keeps focus on content.

### Page Structure
```
[Nav Bar — full width, content centered]
[Meta Banner — full width or within content column]
[Page Content — centered column]
[Footer — within content column]
```

### Information Hierarchy
1. Navigation (always accessible)
2. Meta banner (always visible — the demo story)
3. Primary content (feed, profile, post detail, search results)
4. Engagement actions (within content cards)
5. Footer (attribution)

## 4. Color & Typography Direction

> Source: 01.PHILOSOPHY.md — pillars (credibility, curiosity, confidence)

### Color Direction
- **Base palette**: Light and dark modes. Light mode: white background, dark text, gray accents. Dark mode: dark background, light text, muted accents.
- **Accent**: A single accent color for interactive elements (links, active states, follow button). Something modern and recognizable — a blue or teal that nods to Bluesky without copying it.
- **State colors**: Like (red/pink toggle), bookmark (yellow/amber toggle), follow (accent color toggle)
- **Meta banner**: Subtle background distinction — slightly different shade or border to separate it from app content
- **Mood**: Professional but warm. Not corporate gray, not playful neon. Think: a well-lit workspace.

### Typography Direction
- **System font stack** — no custom fonts. Fast loading, native feel.
- **Type scale**: Clear hierarchy — page titles (xl/2xl), card author names (sm bold), body text (base), metadata (xs/sm muted)
- **Weight contrast**: Bold for names and headings, regular for content, light/muted for timestamps and counts

## 5. Responsive Strategy

> Source: 03.INTERACTIONS.md — interaction contexts

### Mobile-First
Tailwind's mobile-first breakpoint system is already in place. The single-column layout works across all sizes without major restructuring.

### Breakpoint Approach
- **Mobile** (default): Full-width content column with padding. Nav collapses to essential links.
- **Tablet/Desktop** (md+): Centered content column with max-width constraint. Nav shows all links.
- **No sidebar or multi-column layout** — the social feed pattern works best single-column.

### Touch Targets
- Like, bookmark, and follow buttons: minimum tap target size
- Post cards: large click area for navigation to detail view
- Tag chips: padded for comfortable tapping
