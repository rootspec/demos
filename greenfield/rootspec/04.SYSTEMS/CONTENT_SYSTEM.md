# Level 4: Content System

**System:** CONTENT_SYSTEM
**References:** L1-3, Sibling L4, External

---

## Responsibility

Owns all static marketing copy and section structure for the site. Defines what appears in each section, in what order, and with what framing. Does not manage interactivity or layout mechanics.

---

## Sections Owned

### Meta Banner
- Position: top of page, above everything including the header
- Content: honest statement that the site was generated from a ~100-line seed using four commands
- Links: to SEED.md and spec files in the GitHub repository
- Behavior: always visible, never dismissible
- Tone: direct and candid — not self-deprecating, not boastful

### Hero Section
- Tagline: primary value proposition for RootSpec
- Subheading: one-sentence explanation of what RootSpec is
- Version badge: current RootSpec version (injected by FRAMEWORK_SYSTEM)
- RootSpec diagram: SVG depicting the methodology — spec surrounding the development cycle, only valid solutions passing through
- No CTA button in the hero — the page itself is the argument

### Problem Section
- Identifies four to five developer pain points that RootSpec addresses
- Each pain point has a short title and explanatory sentence
- No proposed solutions in this section — problem only

### How It Works Section
- Visual walkthrough of the four RootSpec skills: init → spec → impl → validate
- Each skill has a name, icon/symbol, and one-sentence description
- Optional: before/after framing for each skill

### CTA Section
- Single CTA: link to the RootSpec GitHub repository at https://github.com/rootspec/rootspec
- Supporting copy: brief getting-started framing
- No email capture, no form, no secondary CTA

### Footer
- Builder attribution: identifies the AI agent that built the site, with build date
- RootSpec version reference

---

## Data Ownership

- All copy text (static strings)
- Section ordering
- Link URLs (passed from FRAMEWORK_SYSTEM for GitHub links)
- Version string (passed from FRAMEWORK_SYSTEM)

---

## Boundaries

- Does not own interactive component content (INTERACTIVE_SYSTEM owns that)
- Does not own layout mechanics (LAYOUT_SYSTEM owns that)
- Does not own theme/color state (THEME_SYSTEM owns that)
- Does not fetch or generate content at runtime

---

## Interactions with Other Systems

| System | Nature |
|--------|--------|
| FRAMEWORK_SYSTEM | Receives version string and GitHub repo base URL at build time |
| LAYOUT_SYSTEM | Sections are rendered within the LAYOUT_SYSTEM page shell |
| INTERACTIVE_SYSTEM | Placeholder slots in the content structure where interactive islands are mounted |
