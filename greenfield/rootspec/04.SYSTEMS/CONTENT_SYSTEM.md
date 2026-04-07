# CONTENT_SYSTEM

*References: [[01.PHILOSOPHY]] [[02.TRUTHS]] [[03.INTERACTIONS]] [[SYSTEMS_OVERVIEW]]*

## Responsibility

Manages all static content rendering, meta-information display, version tracking, and external resource linking. Serves as the primary data source for all display systems.

## Boundaries

**Owns**: 
- Static HTML generation from Astro components
- Meta-banner content and GitHub repository links
- RootSpec version badge display and update mechanisms
- Markdown content compilation (SEED.md references, documentation)
- Structured data for interactive components (hierarchy examples, wizard templates)

**Does Not Own**: 
- Interactive behavior or state management (INTERACTIVE_SYSTEM)
- Visual styling beyond semantic markup (THEME_SYSTEM, LAYOUT_SYSTEM)
- User input validation or client-side logic (INTERACTIVE_SYSTEM)

## Data Ownership

**Version Information**: Current RootSpec framework version, build timestamps, GitHub commit references
**Static Content**: Hero copy, problem descriptions, methodology explanations, getting-started instructions
**Template Data**: Structured templates for spec wizard, hierarchy explorer examples, before/after comparison content
**External References**: GitHub repository URLs, documentation links, community resource references

## Interactions with Other Systems

**→ LAYOUT_SYSTEM**: Provides semantic HTML structure, heading hierarchy, content sections for responsive styling
**→ INTERACTIVE_SYSTEM**: Supplies structured data templates for wizard progression, hierarchy examples for explorer component
**→ THEME_SYSTEM**: Generates markup with proper CSS class hooks for theme application
**← INTERACTIVE_SYSTEM**: Receives dynamic content updates for wizard output display, comparison panel content

## Implementation Patterns

**Component Architecture**: Astro components for each major content section (Hero, Problem, HowItWorks, Explorer, Wizard, Comparison, Footer)
**Data Sources**: Static JSON for wizard templates, inline content for marketing copy, environment variables for version information
**Markdown Integration**: Automatic compilation of SEED.md references, documentation snippets, GitHub-flavored markdown support
**Link Management**: Centralized configuration for GitHub repository, documentation, and community links with automatic validation