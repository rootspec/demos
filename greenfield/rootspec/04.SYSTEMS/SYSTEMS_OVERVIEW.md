# L4: Systems Overview

## System Architecture

### Content System
**Responsibility:** Static content presentation, site structure, SEO optimization  
**State:** Markdown content, meta information, site configuration  
**Boundaries:** Provides content to all other systems, manages site structure  
**Interactions:** Feeds data to Layout System, provides content for Meta System

### Layout System  
**Responsibility:** Responsive design, page structure, navigation, visual hierarchy  
**State:** Viewport dimensions, breakpoint states, scroll position  
**Boundaries:** Renders content from Content System, hosts Interactive System components  
**Interactions:** Receives content from Content System, coordinates with Theme System for styling

### Interactive System
**Responsibility:** Client-side features (hierarchy explorer, wizard, comparisons, toggles)  
**State:** User input, interaction progress, component states  
**Boundaries:** Embedded within Layout System, operates independently of external services  
**Interactions:** Uses Theme System for styling, provides feedback through Layout System

### Theme System
**Responsibility:** Dark/light mode, color schemes, visual consistency  
**State:** Current theme preference, system preference detection, transition states  
**Boundaries:** Provides styling to all visual systems, persists user preferences  
**Interactions:** Consumed by Layout System and Interactive System, responds to user input

### Meta System
**Responsibility:** RootSpec demonstration, version display, transparency features  
**State:** Current RootSpec version, build metadata, spec file references  
**Boundaries:** Overlays information on Content System, links to external repository  
**Interactions:** Gets version data from build process, displays within Layout System

## System Boundaries

**Content ↔ Layout:** Content System provides structured data, Layout System handles presentation  
**Layout ↔ Interactive:** Layout System provides container contexts, Interactive System manages component behavior  
**Theme ↔ All:** Theme System provides styling variables, all visual systems consume them  
**Meta ↔ Content:** Meta System overlays transparency information on content structure  
**Interactive ↔ Theme:** Interactive System triggers theme changes, Theme System provides styling feedback

## Data Flow

### Static Build Time
1. **Content System** processes markdown files and site configuration  
2. **Meta System** injects build metadata and version information  
3. **Layout System** structures pages and navigation  
4. **Theme System** generates CSS custom properties  
5. **Interactive System** bundles client-side components

### Runtime
1. **Theme System** detects system preference and applies initial theme  
2. **Layout System** renders responsive structure  
3. **Interactive System** hydrates components and enables interactions  
4. **Meta System** displays transparency banner and version badge  
5. **Content System** provides static content throughout

## Cross-System Concerns

**Performance:** All systems designed for static generation, minimal runtime JavaScript  
**Accessibility:** Each system maintains WCAG compliance, keyboard navigation support  
**Responsive Design:** Layout and Interactive Systems coordinate on breakpoint behavior  
**Progressive Enhancement:** Core functionality works without JavaScript, Interactive System adds enhancements  

## External Dependencies

**Build System:** Astro framework for static site generation  
**Styling:** CSS custom properties for theme system, no external CSS frameworks  
**Fonts:** System fonts prioritized, web fonts as enhancement  
**Analytics:** None (privacy-first approach)  
**CDN/APIs:** None (fully self-contained)