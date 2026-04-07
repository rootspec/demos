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

// Content Stories - Meta Banner, Hero, Problem, How It Works, Open Source, Attribution
const contentStories = `
id: US-001
title: View site generation transparency banner
requirement_id: R-001
acceptance_criteria:
  - id: AC-001-1
    title: Meta banner visible on page load
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=meta-banner]' }
      - shouldContain: { selector: '[data-test=meta-banner]', text: '~100-line' }
      - shouldContain: { selector: '[data-test=meta-banner]', text: 'RootSpec pipeline' }

  - id: AC-001-2
    title: Links to spec and seed files work
    given:
      - visit: '/'
    when:
      - click: { selector: '[data-test=meta-banner-spec-link]' }
    then: []

  - id: AC-001-3
    title: Seed file link accessible
    given:
      - visit: '/'
    when:
      - click: { selector: '[data-test=meta-banner-seed-link]' }
    then: []
---
id: US-002
title: Understand RootSpec value proposition immediately
requirement_id: R-002
acceptance_criteria:
  - id: AC-002-1
    title: Clear tagline and description visible
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=hero-section]' }
      - shouldExist: { selector: '[data-test=hero-tagline]' }
      - shouldExist: { selector: '[data-test=hero-description]' }
      - shouldContain: { selector: '[data-test=hero-section]', text: 'specification' }

  - id: AC-002-2
    title: Version badge displays current framework version
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=version-badge]' }
      - shouldContain: { selector: '[data-test=version-badge]', text: 'v' }
---
id: US-003
title: Recognize specification problems I experience
requirement_id: R-003
acceptance_criteria:
  - id: AC-003-1
    title: Problem section resonates with developer experience
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=problem-section]' }
      - shouldContain: { selector: '[data-test=problem-section]', text: 'spec drift' }
      - shouldContain: { selector: '[data-test=problem-section]', text: 'philosophy-implementation gap' }
      - shouldContain: { selector: '[data-test=problem-section]', text: 'unreliable AI output' }
---
id: US-004
title: Understand how RootSpec methodology works
requirement_id: R-004
acceptance_criteria:
  - id: AC-004-1
    title: Four-skill pipeline clearly explained
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=how-it-works]' }
      - shouldExist: { selector: '[data-test=methodology-section]' }
      - shouldContain: { selector: '[data-test=methodology-section]', text: '/rs-init' }
      - shouldContain: { selector: '[data-test=methodology-section]', text: '/rs-spec' }
      - shouldContain: { selector: '[data-test=methodology-section]', text: '/rs-impl' }
      - shouldContain: { selector: '[data-test=methodology-section]', text: '/rs-validate' }

  - id: AC-004-2
    title: Before and after comparison visible
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=before-after-section]' }
      - shouldExist: { selector: '[data-test=before-content]' }
      - shouldExist: { selector: '[data-test=after-content]' }
      - shouldContain: { selector: '[data-test=before-content]', text: 'vague requirements' }
      - shouldContain: { selector: '[data-test=after-content]', text: 'structured hierarchy' }
---
id: US-005
title: Access RootSpec open source resources
requirement_id: R-005
acceptance_criteria:
  - id: AC-005-1
    title: GitHub repository link accessible
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=open-source-section]' }
      - shouldExist: { selector: '[data-test=github-link]' }
      - shouldContain: { selector: '[data-test=github-link]', text: 'GitHub' }

  - id: AC-005-2
    title: Getting started instructions visible
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=getting-started]' }
      - shouldContain: { selector: '[data-test=getting-started]', text: 'npx' }
---
id: US-006
title: View site builder attribution
requirement_id: R-006
acceptance_criteria:
  - id: AC-006-1
    title: Footer contains builder attribution
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=footer]' }
      - shouldExist: { selector: '[data-test=builder-attribution]' }
      - shouldContain: { selector: '[data-test=builder-attribution]', text: '2026' }
`;
loadAndRun(contentStories);

// Interactive Stories - Hierarchy Explorer, Spec Wizard, Comparison Slider, Theme Toggle
const interactiveStories = `
id: US-101
title: Explore RootSpec five-level hierarchy interactively
requirement_id: R-101
acceptance_criteria:
  - id: AC-101-1
    title: Hierarchy explorer loads with collapsed levels
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=hierarchy-explorer]' }
      - shouldExist: { selector: '[data-test=level-L1]' }
      - shouldExist: { selector: '[data-test=level-L2]' }
      - shouldExist: { selector: '[data-test=level-L3]' }
      - shouldExist: { selector: '[data-test=level-L4]' }
      - shouldExist: { selector: '[data-test=level-L5]' }

  - id: AC-101-2
    title: Click level to expand and show example content
    given:
      - visit: '/'
    when:
      - click: { selector: '[data-test=level-L1]' }
    then:
      - shouldExist: { selector: '[data-test=level-L1-content].expanded' }
      - shouldContain: { selector: '[data-test=level-L1-content]', text: 'Philosophy' }
      - shouldContain: { selector: '[data-test=level-L1-content]', text: 'mission' }
---
id: US-102
title: Generate skeleton spec from my product idea
requirement_id: R-102
acceptance_criteria:
  - id: AC-102-1
    title: Wizard starts with mission input step
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=spec-wizard]' }
      - shouldExist: { selector: '[data-test=wizard-step-1]' }
      - shouldContain: { selector: '[data-test=step-indicator]', text: '1/3' }
      - shouldExist: { selector: '[data-test=mission-input]' }
      - shouldContain: { selector: '[data-test=step-title]', text: 'mission' }

  - id: AC-102-2
    title: Progress through wizard steps with navigation
    given:
      - visit: '/'
      - fill: { selector: '[data-test=mission-input]', value: 'Help teams build better software through clear specifications' }
    when:
      - click: { selector: '[data-test=wizard-next]' }
    then:
      - shouldContain: { selector: '[data-test=step-indicator]', text: '2/3' }
      - shouldExist: { selector: '[data-test=pillars-selection]' }
      - shouldContain: { selector: '[data-test=step-title]', text: 'design pillars' }
---
id: US-103
title: Compare specification approaches with interactive slider
requirement_id: R-103
acceptance_criteria:
  - id: AC-103-1
    title: Comparison slider loads with before state
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=comparison-slider]' }
      - shouldExist: { selector: '[data-test=slider-control]' }
      - shouldExist: { selector: '[data-test=before-content]' }

  - id: AC-103-2
    title: Dragging slider reveals after content
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=after-content]' }
---
id: US-104
title: Switch between dark and light themes
requirement_id: R-104
acceptance_criteria:
  - id: AC-104-1
    title: Theme toggle detects system preference on first visit
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=theme-toggle]' }

  - id: AC-104-2
    title: Manual theme override persists across sessions
    given:
      - visit: '/'
    when:
      - click: { selector: '[data-test=theme-toggle]' }
    then: []
`;
loadAndRun(interactiveStories);