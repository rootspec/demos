# Content System

## Responsibility
Manages all static content, configuration values, and structured data for the RootSpec marketing site. Serves as the single source of truth for site copy, links, version information, and data that powers interactive features.

## Boundaries
**Owns:**
- Site copy and messaging across all sections
- Configuration constants (RootSpec version, GitHub links)
- Structured data for hierarchy explorer and spec wizard
- Before/after comparison content
- Meta information and external resource links

**Does not own:**
- Dynamic user input or form state (INTERACTIVE_SYSTEM)
- Visual styling or theme preferences (THEME_SYSTEM)  
- Page layout or responsive behavior (LAYOUT_SYSTEM)
- Accessibility markup or ARIA labels (ACCESSIBILITY_SYSTEM)

## Data Ownership

**Configuration Data:**
```typescript
{
  ROOTSPEC_VERSION: string,
  GITHUB_REPO: string,
  SEED_URL: string, 
  SPEC_URL: string
}
```

**Hierarchy Data:**
```typescript
{
  levels: {
    id: string,
    name: string,
    description: string,
    canReference: string[],
    examples: string[]
  }[]
}
```

**Wizard Data:**
```typescript
{
  missions: { id: string, label: string, description: string }[],
  pillars: { id: string, label: string, description: string }[],
  interactionTemplates: { id: string, label: string, template: string }[]
}
```

**Comparison Data:**
```typescript
{
  without: { title: string, content: string, problems: string[] },
  with: { title: string, content: string, benefits: string[] }
}
```

## Interactions with Other Systems

**→ INTERACTIVE_SYSTEM:** Provides structured data for dynamic features
- Hierarchy levels and relationships for explorer component
- Template options and examples for spec wizard
- Before/after content for comparison slider

**→ LAYOUT_SYSTEM:** Supplies content for page sections  
- Hero copy and taglines
- Section headings and body content
- Navigation labels and structure
- Footer information and attributions

**→ ACCESSIBILITY_SYSTEM:** Provides semantic content structure
- Heading hierarchy and landmark content
- Alt text and descriptive content for interactive elements
- Error messages and user guidance text

## Content Organization

**Static Content Files:**
- `src/data/config.ts` — Version numbers and external links
- `src/data/hierarchy.ts` — Five-level structure data for explorer  
- `src/data/wizard.ts` — Template options for spec wizard
- `src/data/comparison.ts` — Before/after content examples

**Content Delivery:**
- Exported constants for consistent values across components
- Typed interfaces ensure content structure integrity  
- Static imports eliminate runtime content loading delays
- Immutable data prevents accidental content modification

## Content Validation

**Structure Validation:** TypeScript interfaces enforce required fields and data types for all structured content.

**Link Validation:** External URLs point to actual GitHub resources. Version numbers match current RootSpec framework version.

**Content Quality:** Real examples in all sections. No placeholder or lorem ipsum content. Before/after comparisons use authentic specification scenarios.

**Accessibility Content:** All interactive elements have descriptive labels. Error states include helpful guidance text.