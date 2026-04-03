# Technical Design

Derived from the RootSpec specification. Regenerated on each `/rs-spec` run.

---

## 1. Technology Stack

> Source: 04.SYSTEMS/ — system requirements, L2 trade-offs

**Scenario:** Empty greenfield — no existing code or framework detected. Recommendations based on spec requirements.

**Recommended stack:**

| Concern | Recommendation | Rationale |
|---------|---------------|-----------|
| Framework | **Astro** | Static-first site with interactive islands. Matches L2 "client-side independence" — no server needed. Ships zero JS by default, hydrates interactive components on demand. |
| Interactive components | **React** (via Astro islands) | Hierarchy explorer, spec wizard, and comparison need component state. React's ecosystem has the richest accessibility tooling. |
| Styling | **Tailwind CSS** | Utility-first CSS with built-in dark mode support via `class` strategy. Theme system maps cleanly to CSS custom properties + Tailwind theming. |
| Build tool | **Vite** (via Astro) | Astro uses Vite internally. Fast dev server, optimized production builds. |
| Testing | **Cypress** | Required by RootSpec L5 user stories. Drives acceptance criteria validation. |
| Language | **TypeScript** | Type safety for interactive component state (wizard, explorer). Catches data structure errors at build time. |
| Deployment | **Static hosting** (GitHub Pages, Netlify, Vercel) | No server-side logic per L2 constraints. Pure static output. |

**Key libraries:**

- `@astrojs/react` — React integration for Astro islands
- `tailwindcss` — Utility CSS with dark mode
- `cypress` — E2E testing from L5 stories
- `js-yaml` — YAML parsing for test suite generation

## 2. Architecture Patterns

> Source: 04.SYSTEMS/SYSTEMS_OVERVIEW.md — system boundaries and interactions

**Module structure:**

```
src/
├── components/          # Shared UI components
│   ├── Header.astro
│   ├── Footer.astro
│   └── ThemeToggle.tsx  # React (needs state)
├── sections/            # Page sections (one per layout system section)
│   ├── Hero.astro
│   ├── MetaBanner.astro
│   ├── Problem.astro
│   ├── HowItWorks.astro
│   ├── HierarchyExplorer.tsx  # React island
│   ├── SpecWizard.tsx         # React island
│   ├── Comparison.tsx         # React island
│   └── CTA.astro
├── data/                # Static content and configuration
│   ├── config.ts        # Version constant, site metadata
│   ├── hierarchy.ts     # Five-level data for explorer
│   ├── wizard.ts        # Templates, pillar suggestions
│   └── comparison.ts    # Before/after panel content
├── styles/              # Global styles
│   ├── global.css       # CSS custom properties, theme tokens
│   └── fonts/           # Web fonts if any
├── layouts/
│   └── Layout.astro     # Base layout with theme initialization
└── pages/
    └── index.astro      # Single page, assembles sections
```

**State management:** Local component state only (React `useState`/`useReducer`). No global state library — each interactive component manages its own state per L4 system boundaries.

**Data flow:** Static data → Astro components (SSG) or React props (islands). No API calls, no fetching. All content defined in `src/data/`.

## 3. Coding Conventions

> Source: recommended for empty greenfield

- **File naming:** kebab-case for files, PascalCase for components
- **Components:** `.astro` for static sections, `.tsx` for interactive islands
- **Exports:** Named exports for data, default exports for components
- **CSS:** Tailwind utility classes; CSS custom properties for theme tokens only
- **Data attributes:** `data-test="element-name"` on all testable elements
- **Accessibility:** ARIA attributes co-located with the component that owns the interaction

## 4. API Approach

> Source: 02.TRUTHS.md — client-side independence

No API. All content is static or client-rendered. No backend, no endpoints, no auth.

External links (GitHub repo) are hardcoded URLs in the data layer.

## 5. Data Model

> Source: 04.SYSTEMS/ — system data ownership

**Hierarchy Explorer data:**
```typescript
interface HierarchyLevel {
  id: number           // 1-5
  icon: string         // Emoji
  title: string
  subtitle: string     // "WHY", "WHAT", etc.
  exampleContent: string
  allowedReferences: number[]
}
```

**Spec Wizard data:**
```typescript
interface WizardState {
  currentStep: 1 | 2 | 3 | 'result'
  mission: string
  selectedTemplate: string | null
  pillars: string[]
  interaction: {
    who: string
    trigger: string
    feedback: string
  }
}

interface WizardTemplate {
  id: string
  label: string
  mission: string
}

interface PillarSuggestion {
  id: string
  label: string
  description: string
}
```

**Theme state:**
```typescript
interface ThemeState {
  current: 'light' | 'dark'
  source: 'system' | 'user'
}
```

## 6. Testing Strategy

> Source: 05.IMPLEMENTATION/USER_STORIES/ — acceptance criteria patterns

**E2E (Cypress):** Primary testing approach. User stories in YAML drive all tests. Test suites:
- `cypress/e2e/mvp.cy.ts` — all MVP stories
- `cypress/e2e/first-visit.cy.ts` — journey-based suite

**Unit tests:** Not prioritized. Interactive component logic is simple enough that E2E coverage is sufficient. Add unit tests only if component logic becomes complex.

**Visual regression:** Not included in MVP. Consider after initial implementation stabilizes.

**Test data:** All test data is static (no seeding needed). The site has no user accounts or dynamic content.
