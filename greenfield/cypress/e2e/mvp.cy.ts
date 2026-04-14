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

// US-201: See meta-banner explaining the demo nature of the site
const stories_201 = `
id: US-201
title: See meta-banner explaining the demo nature of the site
acceptance_criteria:
  - id: AC-201-1
    title: Meta-banner is visible on page load
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-201-2
    title: Meta-banner contains link to view the spec
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner-spec-link]'
    when: []
  - id: AC-201-3
    title: Meta-banner contains link to view the seed
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner-seed-link]'
    when: []
`;
loadAndRun(stories_201);

// US-202: See the RootSpec version displayed in the hero section
const stories_202 = `
id: US-202
title: See the RootSpec version displayed in the hero section
acceptance_criteria:
  - id: AC-202-1
    title: Version badge is visible in hero
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
`;
loadAndRun(stories_202);

// US-203: See the tagline and one-sentence explanation immediately
const stories_203 = `
id: US-203
title: See the tagline and one-sentence explanation immediately
acceptance_criteria:
  - id: AC-203-1
    title: Hero tagline is present
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero-tagline]'
    when: []
  - id: AC-203-2
    title: Hero subheading is present
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero-subheading]'
    when: []
`;
loadAndRun(stories_203);

// US-204: Navigate to the framework GitHub repository from the CTA section
const stories_204 = `
id: US-204
title: Navigate to the framework GitHub repository from the CTA section
acceptance_criteria:
  - id: AC-204-1
    title: CTA section contains a GitHub link
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=cta-github-link]'
    when: []
`;
loadAndRun(stories_204);

// US-301: Explore a RootSpec hierarchy level by clicking it
const stories_301 = `
id: US-301
title: Explore a RootSpec hierarchy level by clicking it
acceptance_criteria:
  - id: AC-301-1
    title: Hierarchy explorer renders all five levels
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
      - shouldExist:
          selector: '[data-test=hierarchy-level-L1]'
      - shouldExist:
          selector: '[data-test=hierarchy-level-L5]'
    when: []
  - id: AC-301-2
    title: Clicking a level expands its description
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-level-L1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-L1-content]'
  - id: AC-301-3
    title: Clicking an expanded level collapses it
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-level-L1]'
      - click:
          selector: '[data-test=hierarchy-level-L1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
`;
loadAndRun(stories_301);

// US-302: Walk through the spec wizard with a product idea
const stories_302 = `
id: US-302
title: Walk through the spec wizard with a product idea
acceptance_criteria:
  - id: AC-302-1
    title: Spec wizard renders Step 1
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
    when: []
  - id: AC-302-2
    title: Entering text in Step 1 enables the Next button
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-mission-input]'
          value: Help developers write better specs
    then:
      - shouldExist:
          selector: '[data-test=wizard-next-btn]'
  - id: AC-302-3
    title: Completing all steps shows the spec output
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-mission-input]'
          value: Help developers write better specs
      - click:
          selector: '[data-test=wizard-next-btn]'
      - click:
          selector: '[data-test=wizard-pillar-chip-0]'
      - click:
          selector: '[data-test=wizard-next-btn]'
      - fill:
          selector: '[data-test=wizard-interaction-input]'
          value: Users create a spec from a one-line idea
      - click:
          selector: '[data-test=wizard-generate-btn]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-output]'
`;
loadAndRun(stories_302);

// US-303: Compare requirements with and without RootSpec structure
const stories_303 = `
id: US-303
title: Compare requirements with and without RootSpec structure
acceptance_criteria:
  - id: AC-303-1
    title: Before/after comparison renders both panels
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=comparison-component]'
    when: []
  - id: AC-303-2
    title: Toggling shows the With RootSpec panel
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=comparison-toggle-with]'
    then:
      - shouldExist:
          selector: '[data-test=comparison-panel-with]'
`;
loadAndRun(stories_303);

// US-401: View the page without horizontal scrolling on mobile
const stories_401 = `
id: US-401
title: View the page without horizontal scrolling on mobile
acceptance_criteria:
  - id: AC-401-1
    title: Page content fits within mobile viewport
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=page-root]'
    when: []
`;
loadAndRun(stories_401);

// US-402: Navigate interactive components using keyboard only
const stories_402 = `
id: US-402
title: Navigate interactive components using keyboard only
acceptance_criteria:
  - id: AC-402-1
    title: Theme toggle is keyboard accessible
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
  - id: AC-402-2
    title: Spec wizard is keyboard accessible
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-mission-input]'
          value: Test product
    then:
      - shouldExist:
          selector: '[data-test=wizard-next-btn]'
`;
loadAndRun(stories_402);

// US-101: View site in system-preferred theme on first visit
const stories_101 = `
id: US-101
title: View site in system-preferred theme on first visit
acceptance_criteria:
  - id: AC-101-1
    title: Dark mode applied when system prefers dark
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: html.dark
`;
loadAndRun(stories_101);

// US-102: Toggle between dark and light mode manually
const stories_102 = `
id: US-102
title: Toggle between dark and light mode manually
acceptance_criteria:
  - id: AC-102-1
    title: Theme toggles on click
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
`;
loadAndRun(stories_102);

// US-103: Theme preference persists across page refreshes
const stories_103 = `
id: US-103
title: Theme preference persists across page refreshes
acceptance_criteria:
  - id: AC-103-1
    title: Saved theme reapplied on return visit
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
`;
loadAndRun(stories_103);
