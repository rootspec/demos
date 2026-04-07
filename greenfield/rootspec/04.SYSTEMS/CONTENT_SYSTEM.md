# Content System

## Purpose
Delivers static content and maintains information architecture that supports **Transparency over Polish** and **Methodology Demonstration over Product Sales**.

## Responsibilities
- Static page content generation and delivery
- Version information management and display
- Documentation linking and attribution
- Information hierarchy organization

## State Management

### Version State
```
version: string (semver)
buildDate: string (ISO timestamp)  
builderAttribution: string
frameworkVersion: string
```

### Content State
```
siteContent: {
  hero: { tagline, description, cta }
  problem: { headline, painPoints[], solutions[] }
  howItWorks: { steps[], visualGuides[] }
  comparison: { beforeState, afterState }
  cta: { githubUrl, gettingStarted, community }
}
metaBanner: {
  transparency: string
  specLink: string
  seedLink: string  
}
```

### Navigation State
```
sections: [
  { id, title, order, anchor }
]
currentSection: string
```

## External Interfaces

### Build System Integration
- **Input**: Markdown files, configuration, build metadata
- **Output**: Static HTML pages, structured data objects
- **Contract**: File-based routing with predictable naming conventions

### Repository Integration  
- **Input**: Commit metadata, file paths, repository URLs
- **Output**: Attribution links, transparency references
- **Contract**: Git metadata available at build time

### Interactive System Handoff
- **Output**: Template structures for wizard, example content for explorer
- **Contract**: Structured data objects with consistent schema
- **Example**: Wizard templates include mission options, pillar suggestions

## Implementation Patterns

### Static Generation
Content processed at build time through Astro compilation:
- Markdown → HTML conversion with frontmatter parsing
- Template rendering with build-time data injection
- Asset optimization and bundling

### Configuration Management
Centralized configuration drives content structure:
- Version information from package.json and build environment
- Site content from structured data files or frontmatter
- External links and references from environment variables

### Information Architecture
Content organization supports user journey flows:
- Progressive disclosure from hero through detailed explanations
- Visual hierarchy guides attention to key concepts
- Meta-information provides transparency without distraction

## Data Dependencies

### Version Management
- **Source**: package.json, build environment, git metadata
- **Usage**: Version badge display, attribution footer, meta banner
- **Update Trigger**: Build process, deployment pipeline

### Content Structure
- **Source**: Seed requirements, specification levels, framework documentation
- **Usage**: Section content, wizard templates, explorer examples
- **Update Trigger**: Specification changes, framework updates

### External References
- **Source**: Repository URLs, documentation links, community resources
- **Usage**: GitHub integration, getting started flows, community CTAs
- **Update Trigger**: Repository changes, documentation updates

## Error Handling

### Missing Content
- **Scenario**: Required content not available at build time
- **Response**: Build failure with clear error message indicating missing dependency
- **Recovery**: Graceful defaults for non-critical content, hard failure for essential data

### Invalid References  
- **Scenario**: Links to non-existent files or repositories
- **Response**: Build warning with link validation, fallback to generic references
- **Recovery**: Manual review and correction of broken references

### Version Mismatch
- **Scenario**: Framework version doesn't match site version
- **Response**: Clear indication in version badge, meta banner disclosure
- **Recovery**: Version synchronization through update process