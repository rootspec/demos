# Level 4: Presentation System

## Responsibility

Owns visual artifacts that are not prose content: the methodology diagram (SVG), the version badge, and the display of code and command examples. These elements are the site's primary non-textual signals of quality and credibility.

## Boundaries

**Owns:**
- Methodology diagram — inline SVG depicting the RootSpec spec encircling the five-skill development cycle
- Version badge — reads `.rootspec.json` at build time, renders the version number
- Code block styling and display for skill names (`/rs-init`, `/rs-spec`, etc.)
- Command example display throughout the How It Works section

**Does not own:**
- Surrounding content sections (CONTENT_SYSTEM)
- Color tokens applied to diagram and code blocks (THEME_SYSTEM)
- Layout positioning (LAYOUT_SYSTEM)

## Data Ownership

### Version Badge

- Source: `.rootspec.json` → `version` field
- Read at: build time (not runtime)
- Display locations: hero section, site header
- Format: a version label, e.g., "v7.7.0" or "Built with RootSpec v7.7.0"

### Methodology Diagram

The diagram is inline SVG — no external image files, no raster assets. It depicts:

1. **The five-skill cycle** (init → spec → impl → validate → review) arranged as a loop
2. **The specification** encircling the cycle, acting as a gate
3. **The gate concept** — only solutions that satisfy the spec pass through the cycle
4. Visual arrows showing the flow direction
5. Labels for each skill using monospace styling

**Design constraints (from L1 and L2):**
- Hand-considered appearance — not a Visio export or generic tech-blog illustration
- Clear linework, intentional spacing, no clip-art icons
- Theme-aware: uses CSS custom properties from THEME_SYSTEM for stroke and fill colors
- SVG is vector-clean — scales without pixelation at any viewport size
- Diagram must remain legible at mobile viewport widths

**Placement:** Near the hero or alongside the "How It Works" section — not in the footer. It must do real explanatory work, not decorate.

### Code and Command Display

- Skill names (`/rs-init`, `/rs-spec`, `/rs-impl`, `/rs-validate`, `/rs-review`) use monospace font from THEME_SYSTEM
- Code examples use a styled `<code>` or `<pre>` block
- No syntax highlighting library required — monospace + background offset is sufficient
- Command examples must be copy-friendly

## State Management

PRESENTATION_SYSTEM is stateless at runtime. The version number is determined at build time and baked into the rendered output. The diagram is static SVG. Code blocks do not change in response to user interaction.

Exception: the diagram uses CSS custom properties from THEME_SYSTEM, so its colors update when the theme toggles — but this is a CSS-level change, not component state.

## Interactions with Other Systems

| System | Interaction |
|--------|-------------|
| THEME_SYSTEM | Diagram SVG uses CSS custom property references for stroke/fill; code blocks use monospace token and surface color |
| CONTENT_SYSTEM | Diagram and version badge are embedded at specific positions within the content flow |
| LAYOUT_SYSTEM | Diagram is positioned and constrained by the layout grid; must scale within content width |

## Rules

- Version badge must read from `.rootspec.json` at build time — do not hardcode the version string
- Diagram must be inline SVG — no `<img src="diagram.png">` or external file reference
- Diagram colors must use CSS custom properties from THEME_SYSTEM — the diagram updates when the theme toggles
- Diagram placement must be above-the-fold or near the hero — not a footer afterthought
- At mobile viewport widths, the diagram must scale without horizontal overflow
- Skill names in prose and in the diagram use monospace font — they are commands, not labels
