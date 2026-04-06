# **Level 4: Systems Architecture**

> Implementation architecture and system boundaries

---

## System Boundaries

This marketing website consists of **5 primary systems** that work together to demonstrate RootSpec methodology while providing an engaging user experience.

### 🎨 **Presentation System**
**Responsibility**: Visual rendering, layout, and responsive design
**Scope**: Component library, theme management, responsive breakpoints  
**Data Owned**: Visual states, theme preferences, layout configurations
**External Dependencies**: CSS framework, design tokens

**Key Interfaces**:
- Renders content provided by Content System
- Responds to theme changes from Theme System  
- Adapts layout based on Interactive System state

### 📝 **Content System**  
**Responsibility**: Static content management and markdown processing
**Scope**: Site copy, documentation links, version information
**Data Owned**: Text content, structured data (version numbers, links), meta information
**External Dependencies**: Markdown processor, site configuration

**Key Interfaces**:
- Provides content to Presentation System for rendering
- Supplies structured data to Interactive System for dynamic displays
- Manages RootSpec version display across site

### ⚡ **Interactive System**
**Responsibility**: Client-side interactivity and user engagement features  
**Scope**: Hierarchy explorer, spec wizard, before/after comparison
**Data Owned**: UI state, user input, interaction preferences  
**External Dependencies**: React/Preact components, state management

**Key Interfaces**:
- Receives layout context from Presentation System
- Uses content data from Content System for templates
- Manages theme toggling through Theme System
- Reports analytics through Analytics System

### 🌗 **Theme System**
**Responsibility**: Dark/light mode and visual consistency
**Scope**: Color schemes, system preference detection, user overrides
**Data Owned**: Theme state, user preferences, CSS custom properties  
**External Dependencies**: Browser APIs (matchMedia), local storage

**Key Interfaces**:
- Provides theme context to Presentation System  
- Responds to user interactions from Interactive System
- Persists preferences across sessions

### 📊 **Analytics System**
**Responsibility**: User behavior tracking and interaction measurement
**Scope**: Event tracking, performance monitoring, engagement metrics
**Data Owned**: Interaction events, timing data, user flow analytics
**External Dependencies**: Analytics service (minimal, privacy-focused)

**Key Interfaces**:
- Receives interaction events from Interactive System
- Tracks content engagement from Presentation System
- Monitors theme usage from Theme System

## Data Flow Architecture

### Static Content Flow
```
Content System → Presentation System → User
```
- Site copy, documentation, and structured data flows directly to presentation
- No dynamic transformation required for static content

### Interactive Feature Flow  
```
User Input → Interactive System → Presentation System → Visual Feedback
                ↓
           Analytics System
```
- User interactions captured by Interactive System
- State changes trigger presentation updates
- Events logged for analytics

### Theme Management Flow
```
User Preference/System Preference → Theme System → Presentation System → Visual Update
                                        ↓
                                   Local Storage
```
- Theme changes propagate immediately to presentation layer
- Preferences persisted for future visits

## Technical Implementation

### Framework & Runtime
- **Core Framework**: Astro (static site generation with dynamic islands)
- **Interactive Components**: React/Preact (for complex UI state)
- **Styling**: Tailwind CSS (utility-first, theme-aware)
- **Build System**: Vite (fast development and optimized production builds)

### Performance Architecture
- **Static Generation**: Pre-rendered at build time for optimal loading
- **Selective Hydration**: Only interactive components load JavaScript
- **Asset Optimization**: Images, fonts, and CSS optimized automatically
- **CDN Ready**: Static assets suitable for global distribution

### Client-Side Features
- **No External API Calls**: All interactivity runs client-side
- **Progressive Enhancement**: Site works without JavaScript for core content
- **Responsive Design**: Single codebase serves all device sizes
- **Accessibility**: Keyboard navigation and screen reader support

## Integration Points

### External Dependencies
- **GitHub API**: For fetching current RootSpec version (build-time only)
- **Font Loading**: Web fonts with appropriate fallbacks
- **Analytics**: Minimal tracking (privacy-focused, no cookies)

### Development Dependencies  
- **TypeScript**: Type safety for complex interactive components
- **ESLint/Prettier**: Code quality and consistency
- **Playwright**: End-to-end testing for interactive features

## System Constraints

### Performance Constraints
- **Initial Load**: < 3 seconds on 3G networks
- **Interactive Features**: < 100ms response time for user inputs
- **Bundle Size**: JavaScript bundles < 100KB per page

### Technical Constraints
- **Browser Support**: Last 2 versions of major browsers
- **JavaScript Required**: Interactive features require JS, but core content accessible without
- **Build Dependency**: Static generation requires Node.js build environment

### Operational Constraints  
- **Zero Runtime Dependencies**: No server-side components or databases
- **Static Hosting**: Compatible with any static file hosting service
- **Update Process**: Content changes require rebuild and redeploy

## Security Considerations

### Content Security
- **No User Input Storage**: Interactive features don't persist sensitive data
- **Client-Side Only**: No server-side attack surface
- **Static Asset Integrity**: All assets served from controlled sources

### Privacy Protection
- **Minimal Analytics**: Only essential usage data collected
- **No Third-Party Tracking**: No external tracking scripts beyond essential analytics
- **Local Storage Only**: Theme preferences stored locally, not transmitted