# **CONTENT_SYSTEM**

## Responsibility

Manages static content, copy, messaging, and informational assets throughout the site. Provides consistent voice, accurate technical information, and semantic content structure while maintaining currency with RootSpec methodology and framework versions.

## System Boundaries

### Owns
- Static text content and copy for all sections
- Code examples and syntax highlighting
- Meta information (RootSpec version, build attribution)
- External links and resource references
- Content templates for interactive features
- Semantic markup and content structure

### Does Not Own
- Visual presentation or styling (THEME_SYSTEM responsibility)
- Layout positioning or responsive behavior (LAYOUT_SYSTEM responsibility)
- User-generated content or dynamic interactions (INTERACTIVE_SYSTEM responsibility)
- Content accessibility beyond semantic markup (ACCESSIBILITY_SYSTEM responsibility)

## Data Ownership

### Static Content
```typescript
interface StaticContent {
  hero: HeroContent
  problem: ProblemContent
  methodology: MethodologyContent
  interactive: InteractiveContent
  openSource: OpenSourceContent
  footer: FooterContent
  metaBanner: MetaBannerContent
}

interface HeroContent {
  tagline: string
  description: string
  versionBadge: VersionInfo
}
```

### Technical Information
```typescript
interface TechnicalContent {
  rootSpecVersion: string
  frameworkDescription: string
  skillCommands: SkillCommand[]
  codeExamples: CodeExample[]
  specificationLinks: ExternalLink[]
}

interface CodeExample {
  id: string
  language: string
  content: string
  description: string
  highlightLines?: number[]
}
```

### Content Templates
```typescript
interface ContentTemplates {
  wizardSteps: WizardStepTemplate[]
  hierarchyLevels: HierarchyLevelTemplate[]
  beforeAfterComparison: ComparisonTemplate
  interactiveExamples: ExampleTemplate[]
}
```

## Interactions with Other Systems

### → THEME_SYSTEM
**Provides:** Content requiring specific styling (code vs prose), content types for syntax highlighting
**Receives:** Typography application, theme-aware styling for content presentation

### → LAYOUT_SYSTEM
**Provides:** Section requirements, semantic structure needs, content area definitions
**Receives:** Section containers, reading flow structure, content positioning

### → INTERACTIVE_SYSTEM
**Provides:** Template data for dynamic features, examples and copy for user interactions
**Receives:** User-generated content updates, dynamic content rendering requirements

### → ACCESSIBILITY_SYSTEM
**Provides:** Semantic markup structure, alt text requirements, content hierarchy
**Receives:** Accessibility markup requirements, screen reader optimized content structure

## Core Behaviors

### Content Delivery
- **Static Content Serving:** Provide consistent, accurate copy for all site sections
- **Dynamic Content Templates:** Supply templates and examples for interactive features
- **Version Synchronization:** Keep displayed RootSpec version current with framework version
- **Link Validation:** Ensure external links remain valid and current

### Content Maintenance
- **Accuracy Validation:** Verify all technical claims against current RootSpec documentation
- **Currency Monitoring:** Track RootSpec version changes and update displayed information
- **Link Health:** Monitor external link health and update broken references
- **Content Consistency:** Maintain consistent voice and terminology across all sections

### Content Organization
- **Semantic Structure:** Organize content with proper heading hierarchy and markup
- **Cross-Reference Management:** Maintain consistent internal linking and navigation
- **Example Curation:** Provide relevant, accurate examples for methodology demonstration
- **Attribution Maintenance:** Keep build attribution and source references current

## External Dependencies

### RootSpec Framework
- Framework version information for version badge display
- Official documentation for accuracy validation
- Skill command specifications for technical reference

### External Resources
- GitHub repository links for spec and seed file access
- Official RootSpec documentation for methodology reference
- Community resources and getting started guides

### Build System
- Framework version detection during build process
- Content file processing and optimization
- Link validation during build verification

## Validation Rules

### Accuracy Requirements
- All technical claims must be verifiable against official RootSpec documentation
- Displayed framework version must match actual version used to build specification
- Code examples must be syntactically correct and executable
- External links must resolve to valid, relevant resources

### Content Quality
- Voice remains consistent across all copy and messaging
- Technical terminology used correctly and consistently
- Examples relevant to target audience (developers, technical leads)
- No broken internal references or navigation links

### Currency Standards
- RootSpec version updated within 24 hours of framework changes
- External links validated monthly for continued relevance
- Content reviewed quarterly for accuracy and relevance
- Attribution information reflects current build context

## Error Handling

### Content Loading Failures
- **Fallback Content:** Provide generic content if dynamic loading fails
- **Graceful Degradation:** Ensure core messaging remains available if enhanced content fails
- **Missing Content Recovery:** Use placeholder content rather than broken layout

### Version Detection Failures
- **Default Version:** Display "latest" if specific version detection fails
- **Warning Notice:** Notify users if version information may be inaccurate
- **Manual Override:** Provide mechanism for manual version specification

### External Link Failures
- **Link Validation:** Check external links and provide alternatives for broken ones
- **Archived Alternatives:** Provide archived or alternative sources for critical external content
- **User Notification:** Inform users when following links to potentially outdated resources

## Content Patterns

### Voice and Tone
- **Confident but Not Preachy:** Demonstrate conviction without evangelism
- **Technical but Accessible:** Use appropriate terminology without exclusionary jargon
- **Transparent:** Acknowledge limitations and rough edges honestly
- **Action-Oriented:** Focus on what users can do, not just what RootSpec is

### Information Architecture
- **Progressive Disclosure:** Present information in logical complexity order
- **Problem-Solution Structure:** Lead with relatable problems, follow with concrete solutions
- **Evidence-Based Claims:** Support all claims with demonstrable evidence
- **Clear Next Steps:** Always provide clear actions users can take

### Technical Content Standards
- **Code Example Quality:** All code examples functional and well-formatted
- **Methodology Accuracy:** Perfect fidelity to actual RootSpec methodology
- **Practical Relevance:** Examples and scenarios relevant to target user problems
- **Version Specificity:** Clear about which version of RootSpec applies to each claim