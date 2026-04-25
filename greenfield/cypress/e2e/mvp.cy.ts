import * as yaml from 'js-yaml';
import { UserStorySchema } from '../support/schema';
import type { UserStory } from '../support/schema';
import { runSetupSteps, runAssertionSteps } from '../support/steps';

function loadAndRun(yamlContent: string) {
  const docs = yaml.loadAll(yamlContent) as UserStory[];
  for (const doc of docs) {
    if (!doc || !doc.id) continue;
    const story = UserStorySchema.parse(doc);
    const describeFn = story.skip ? describe.skip : story.only ? describe.only : describe;
    describeFn(`${story.id}: ${story.title}`, () => {
      for (const ac of story.acceptance_criteria) {
        const itFn = ac.skip ? it.skip : ac.only ? it.only : it;
        itFn(`${ac.id}: ${ac.title}`, () => {
          if (ac.given) runSetupSteps(ac.given);
          if (ac.when) runSetupSteps(ac.when);
          if (ac.then) runAssertionSteps(ac.then);
        });
      }
    });
  }
}

// --- Content Stories ---
const contentStories = `
id: US-001
title: See the meta banner above all content
acceptance_criteria:
  - id: AC-001-1
    title: Meta banner is visible without scrolling
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=meta-banner]' }
  - id: AC-001-2
    title: Meta banner contains link to the spec
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=meta-banner] [data-test=spec-link]' }
  - id: AC-001-3
    title: Meta banner contains link to the seed
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=meta-banner] [data-test=seed-link]' }
---
id: US-002
title: Read the hero section with tagline and version
acceptance_criteria:
  - id: AC-002-1
    title: Hero section is present with tagline
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=hero]' }
  - id: AC-002-2
    title: Version badge is visible in the hero
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=version-badge]' }
---
id: US-003
title: Read the full author's notes verbatim
acceptance_criteria:
  - id: AC-003-1
    title: "Why I Built RootSpec section exists with correct heading"
    given:
      - visit: '/demos/greenfield/#why-i-built-rootspec'
    when: []
    then:
      - shouldExist: { selector: '[data-test=authors-notes]' }
      - shouldContain: { selector: '[data-test=authors-notes-heading]', text: 'Why I Built RootSpec' }
  - id: AC-003-2
    title: "Author's notes contains the opening paragraph verbatim"
    given:
      - visit: '/demos/greenfield/#why-i-built-rootspec'
    when: []
    then:
      - shouldContain: { selector: '[data-test=authors-notes]', text: 'Most thinking about AI in software development' }
  - id: AC-003-3
    title: "Author's notes contains the replicator metaphor"
    given:
      - visit: '/demos/greenfield/#why-i-built-rootspec'
    when: []
    then:
      - shouldContain: { selector: '[data-test=authors-notes]', text: 'replicator from Star Trek' }
  - id: AC-003-4
    title: "Author's notes contains the closing paragraph"
    given:
      - visit: '/demos/greenfield/#why-i-built-rootspec'
    when: []
    then:
      - shouldContain: { selector: '[data-test=authors-notes]', text: 'Generating code is now trivial' }
---
id: US-004
title: Navigate to sections via the header navigation
acceptance_criteria:
  - id: AC-004-1
    title: "Navigation includes link to author's notes with correct label"
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldContain: { selector: '[data-test=nav]', text: 'Why I Built RootSpec' }
  - id: AC-004-2
    title: Navigation includes link to the interactive section
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=nav] [data-test=nav-try-it]' }
---
id: US-005
title: See footer attribution identifying the builder
acceptance_criteria:
  - id: AC-005-1
    title: Footer is present with attribution text
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=footer]' }
  - id: AC-005-2
    title: Footer identifies the AI builder
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldContain: { selector: '[data-test=footer]', text: 'Claude' }
---
id: US-006
title: Read the problem section explaining spec drift
acceptance_criteria:
  - id: AC-006-1
    title: Problem section is present
    given:
      - visit: '/demos/greenfield/#the-problem'
    when: []
    then:
      - shouldExist: { selector: '[data-test=problem-section]' }
---
id: US-007
title: Read the how it works section with the five skills
acceptance_criteria:
  - id: AC-007-1
    title: How It Works section is present
    given:
      - visit: '/demos/greenfield/#how-it-works'
    when: []
    then:
      - shouldExist: { selector: '[data-test=how-it-works]' }
  - id: AC-007-2
    title: How It Works mentions the five skills
    given:
      - visit: '/demos/greenfield/#how-it-works'
    when: []
    then:
      - shouldContain: { selector: '[data-test=how-it-works]', text: '/rs-init' }
---
id: US-008
title: See the methodology diagram
acceptance_criteria:
  - id: AC-008-1
    title: Methodology diagram is present on the page
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=methodology-diagram]' }
---
id: US-009
title: Find the link to the RootSpec GitHub repo
acceptance_criteria:
  - id: AC-009-1
    title: Open source CTA section is present
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=cta-section]' }
      - shouldExist: { selector: '[data-test=github-link]' }
`;
loadAndRun(contentStories);

// --- Interactive Stories ---
const interactiveStories = `
id: US-101
title: Expand a level in the hierarchy explorer
acceptance_criteria:
  - id: AC-101-1
    title: Hierarchy explorer is present on the page
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=hierarchy-explorer]' }
  - id: AC-101-2
    title: Clicking a level expands it
    given:
      - visit: '/demos/greenfield/'
    when:
      - click: { selector: '[data-test=level-1-trigger]' }
    then:
      - shouldExist: { selector: '[data-test=level-1-content]' }
  - id: AC-101-3
    title: Clicking an open level collapses it
    given:
      - visit: '/demos/greenfield/'
    when:
      - click: { selector: '[data-test=level-1-trigger]' }
      - click: { selector: '[data-test=level-1-trigger]' }
    then:
      - shouldExist: { selector: '[data-test=hierarchy-explorer]' }
  - id: AC-101-4
    title: All five levels are present in the explorer
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=level-1-trigger]' }
      - shouldExist: { selector: '[data-test=level-2-trigger]' }
      - shouldExist: { selector: '[data-test=level-3-trigger]' }
      - shouldExist: { selector: '[data-test=level-4-trigger]' }
      - shouldExist: { selector: '[data-test=level-5-trigger]' }
---
id: US-102
title: Complete the spec wizard to generate a skeleton spec
acceptance_criteria:
  - id: AC-102-1
    title: Wizard is present on the page
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=spec-wizard]' }
  - id: AC-102-2
    title: Wizard has an input field for the product idea
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=wizard-idea-input]' }
  - id: AC-102-3
    title: Entering a product idea enables progression
    given:
      - visit: '/demos/greenfield/'
    when:
      - fill: { selector: '[data-test=wizard-idea-input]', value: 'A task manager for remote teams' }
      - click: { selector: '[data-test=wizard-next]' }
    then:
      - shouldExist: { selector: '[data-test=wizard-step-mission]' }
  - id: AC-102-4
    title: Wizard step 2 shows mission options
    given:
      - visit: '/demos/greenfield/'
    when:
      - fill: { selector: '[data-test=wizard-idea-input]', value: 'A note-taking app' }
      - click: { selector: '[data-test=wizard-next]' }
    then:
      - shouldExist: { selector: '[data-test=wizard-step-mission]' }
      - shouldExist: { selector: '[data-test=mission-option]' }
---
id: US-103
title: "Toggle between before and after views of a spec"
acceptance_criteria:
  - id: AC-103-1
    title: "Before/after comparison is present on the page"
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=before-after]' }
  - id: AC-103-2
    title: "Both without-spec and with-spec content are accessible"
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=before-after]' }
      - shouldContain: { selector: '[data-test=before-after]', text: 'Without' }
  - id: AC-103-3
    title: "The With RootSpec panel is accessible"
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldContain: { selector: '[data-test=before-after]', text: 'With RootSpec' }
---
id: US-104
title: Toggle between light and dark theme
acceptance_criteria:
  - id: AC-104-1
    title: Theme toggle is present in the header
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=theme-toggle]' }
  - id: AC-104-2
    title: Clicking the theme toggle changes the theme
    given:
      - visit: '/demos/greenfield/'
    when:
      - click: { selector: '[data-test=theme-toggle]' }
    then:
      - shouldExist: { selector: '[data-test=theme-toggle]' }
`;
loadAndRun(interactiveStories);

// --- Responsive Stories ---
const responsiveStories = `
id: US-201
title: Browse the site on mobile without horizontal scrolling
acceptance_criteria:
  - id: AC-201-1
    title: Page does not overflow horizontally at mobile width
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: 'body' }
---
id: US-202
title: Access navigation on mobile
acceptance_criteria:
  - id: AC-202-1
    title: Mobile navigation control is present
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=nav]' }
---
id: US-203
title: Use the hierarchy explorer on mobile
acceptance_criteria:
  - id: AC-203-1
    title: Hierarchy explorer is usable on mobile
    given:
      - visit: '/demos/greenfield/'
    when:
      - click: { selector: '[data-test=level-1-trigger]' }
    then:
      - shouldExist: { selector: '[data-test=level-1-content]' }
---
id: US-204
title: View the methodology diagram on mobile without overflow
acceptance_criteria:
  - id: AC-204-1
    title: Diagram is present and contained on mobile
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=methodology-diagram]' }
`;
loadAndRun(responsiveStories);

// --- Theme Stories ---
const themeStories = `
id: US-301
title: See the site in light mode by default
acceptance_criteria:
  - id: AC-301-1
    title: Site renders with a light background by default
    given:
      - visit: '/demos/greenfield/'
    when: []
    then:
      - shouldExist: { selector: '[data-theme=light], body:not([data-theme=dark])' }
---
id: US-302
title: Switch to dark mode using the theme toggle
acceptance_criteria:
  - id: AC-302-1
    title: Theme toggle exists and is clickable
    given:
      - visit: '/demos/greenfield/'
    when:
      - click: { selector: '[data-test=theme-toggle]' }
    then:
      - shouldExist: { selector: '[data-test=theme-toggle]' }
---
id: US-303
title: See skill command names rendered in monospace
acceptance_criteria:
  - id: AC-303-1
    title: Skill commands appear in a code-style element
    given:
      - visit: '/demos/greenfield/#how-it-works'
    when: []
    then:
      - shouldExist: { selector: '[data-test=how-it-works] code' }
`;
loadAndRun(themeStories);
