# Level 4: Content System

## Responsibility

All static and semi-static content: copy, messaging, section content, links, and version display. Owns what the site says.

## Version Management

- RootSpec version stored as a single constant (e.g., in a config file or at the top of the main module)
- Referenced by: hero section version badge, meta banner, any version mentions in copy
- Updating the version requires changing one value

## Section Content

### Header
- Site title: "RootSpec"
- Version badge: `v[rootspec_version]`
- Theme toggle (rendered by Theme System)
- Navigation links to major sections

### Hero
- Tagline (short, memorable)
- One-sentence explanation of what RootSpec is
- Primary CTA button (links to GitHub or getting started)

### Meta Banner
- Prominent banner explaining this site is a RootSpec demo
- Tone: honest, direct — "This site was generated from a ~100-line product description using the RootSpec pipeline"
- Links to: SEED.md in GitHub repo, spec files in GitHub repo
- Acknowledges that rough edges reflect minimal human guidance, not carelessness

### The Problem
- [problem-count] named pain points, each with a title and brief description
- Pain points from L1: spec drift, philosophy-implementation gap, unreliable AI output, dead documentation
- Real-world framing — describe the problem as developers experience it

### How It Works
- Four-step walkthrough: init → spec → impl → validate
- Each step: command name, what it does, visual representation of before/after
- Visual flow showing the progression

### Open Source CTA
- GitHub repository link
- Getting started instructions (the four commands)
- Community links (if applicable)

### Footer
- Minimal: links, credits, GitHub

## External Links

All external links:
- Open in new tab (`target="_blank"` with `rel="noopener noreferrer"`)
- GitHub repo links point to the specific files (SEED.md, rootspec/ directory)

## Content Tone Rules

Per L1 inviolable principles and L2 developer-native communication:
- No buzzwords
- Specific over general
- Technical but accessible
- Confident but not preachy
