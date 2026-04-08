# L4: Content System

## Responsibility
Manages all static and dynamic content presentation, including marketing copy, meta information, and educational materials that explain RootSpec methodology.

## Boundaries

### Owns
- Hero section content (tagline, description)
- Meta banner (demo acknowledgment, links to spec/seed)
- Problem/solution section copy
- How it works explanatory content
- Open source CTA and attribution footer
- Version number display and management

### Does Not Own
- Interactive widget content (managed by Interactive System)
- Visual styling and theming (managed by Theme System)
- Layout and responsive behavior (managed by Layout System)
- User input processing (managed by Interactive System)

## Data Ownership

### Static Content
- Marketing copy stored in Astro components/pages
- Version number as configuration constant
- Attribution information (builder name, build date)
- GitHub repository links and metadata

### Dynamic Content
- Section visibility state based on user scroll position
- Reading progress indicators
- Content adaptation based on theme/layout context

## Interactions with Other Systems

### → Interactive System
- **Provides:** Section trigger points for wizard activation
- **Receives:** State updates that affect content visibility
- **Interface:** Event-based content show/hide, wizard data integration

### → Theme System  
- **Provides:** Content structure requiring visual treatment
- **Receives:** Theme-aware content variants (if applicable)
- **Interface:** CSS class application, content readability optimization

### → Layout System
- **Provides:** Content hierarchy and semantic structure
- **Receives:** Responsive content adaptations
- **Interface:** Content reflow, mobile-optimized copy variants

### → Framework Integration
- **Provides:** Static content for build-time processing
- **Receives:** Astro component structure and hydration points
- **Interface:** Component props, slot content, static generation directives

## Internal Structure

### Content Types
1. **Hero Content:** Mission statement, value proposition, immediate call-to-action
2. **Educational Content:** Problem definition, methodology explanation, workflow walkthrough  
3. **Meta Content:** Demo disclaimer, transparency about rough edges, development attribution
4. **CTA Content:** GitHub links, getting started instructions, community resources

### Content Management
- Version-controlled in component files
- Single source of truth for all copy
- Build-time validation for broken links
- Consistent tone and voice across all sections

## Quality Assurance

### Content Standards
- Technical accuracy about RootSpec methodology
- Tone alignment with "confident but not preachy" guideline
- No buzzwords or corporate marketing speak
- Specific examples rather than abstract concepts

### Validation Rules  
- All external links functional at build time
- Version number consistency across displays
- Attribution completeness (builder name, date)
- Content accessibility (reading level, structure)