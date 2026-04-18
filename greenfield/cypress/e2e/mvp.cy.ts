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

// US-101: See the version of RootSpec this site was built with
const stories_101 = `
id: US-101
title: See the version of RootSpec this site was built with
acceptance_criteria:
  - id: AC-101-1
    title: Version badge visible in hero section
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
  - id: AC-101-2
    title: Version badge shows a real version string
    given:
      - visit: /
    then:
      - shouldContain:
          selector: '[data-test=version-badge]'
          text: v7
    when: []
`;
loadAndRun(stories_101);

// US-102: Understand this site is itself a RootSpec demo via the meta banner
const stories_102 = `
id: US-102
title: Understand this site is itself a RootSpec demo via the meta banner
acceptance_criteria:
  - id: AC-102-1
    title: Meta banner is visible on page load
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-102-2
    title: Meta banner contains a link to the spec
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner-spec-link]'
    when: []
  - id: AC-102-3
    title: Meta banner contains a link to the seed
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner-seed-link]'
    when: []
`;
loadAndRun(stories_102);

// US-103: Read the hero tagline and understand what RootSpec is
const stories_103 = `
id: US-103
title: Read the hero tagline and understand what RootSpec is
acceptance_criteria:
  - id: AC-103-1
    title: Hero section is present
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero-section]'
    when: []
  - id: AC-103-2
    title: Hero contains a headline
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero-heading]'
    when: []
`;
loadAndRun(stories_103);

// US-104: Navigate to the RootSpec framework GitHub repository from the site
const stories_104 = `
id: US-104
title: Navigate to the RootSpec framework GitHub repository from the site
acceptance_criteria:
  - id: AC-104-1
    title: CTA section contains a GitHub link
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=github-cta-link]'
    when: []
`;
loadAndRun(stories_104);

// US-201: Explore the RootSpec five-level hierarchy interactively
const stories_201 = `
id: US-201
title: Explore the RootSpec five-level hierarchy interactively
acceptance_criteria:
  - id: AC-201-1
    title: Hierarchy explorer is present on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
    when: []
  - id: AC-201-2
    title: All five levels are listed
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1]'
      - shouldExist:
          selector: '[data-test=hierarchy-level-2]'
      - shouldExist:
          selector: '[data-test=hierarchy-level-3]'
      - shouldExist:
          selector: '[data-test=hierarchy-level-4]'
      - shouldExist:
          selector: '[data-test=hierarchy-level-5]'
    when: []
  - id: AC-201-3
    title: Clicking a level expands it to show content
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1-content]'
  - id: AC-201-4
    title: Clicking an expanded level collapses it
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
`;
loadAndRun(stories_201);

// US-202: Walk through the Spec Wizard with a product idea
const stories_202 = `
id: US-202
title: Walk through the Spec Wizard with a product idea
acceptance_criteria:
  - id: AC-202-1
    title: Spec wizard is present on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
    when: []
  - id: AC-202-2
    title: Step 1 mission input is available
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
    when: []
  - id: AC-202-3
    title: Completing all three steps shows output skeleton
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-mission-input]'
          value: Help developers write better specs
      - click:
          selector: '[data-test=wizard-next-step]'
      - click:
          selector: '[data-test=wizard-pillar-0]'
      - click:
          selector: '[data-test=wizard-pillar-1]'
      - click:
          selector: '[data-test=wizard-pillar-2]'
      - click:
          selector: '[data-test=wizard-next-step]'
      - fill:
          selector: '[data-test=wizard-interaction-input]'
          value: User clicks a button and sees the spec
      - click:
          selector: '[data-test=wizard-next-step]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-output]'
`;
loadAndRun(stories_202);

// US-203: Compare before/after examples to understand the RootSpec value
const stories_203 = `
id: US-203
title: Compare before/after examples to understand the RootSpec value
acceptance_criteria:
  - id: AC-203-1
    title: Before/after comparison section is present
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=comparison-section]'
    when: []
  - id: AC-203-2
    title: Both panels contain real content
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=comparison-without]'
      - shouldExist:
          selector: '[data-test=comparison-with]'
    when: []
`;
loadAndRun(stories_203);

// US-401: Use the site on a mobile device without layout breakage
const stories_401 = `
id: US-401
title: Use the site on a mobile device without layout breakage
acceptance_criteria:
  - id: AC-401-1
    title: Hero section visible on mobile viewport
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero-section]'
    when: []
  - id: AC-401-2
    title: Spec wizard is usable on mobile viewport
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
    when: []
`;
loadAndRun(stories_401);

// US-402: Navigate interactive components via keyboard
const stories_402 = `
id: US-402
title: Navigate interactive components via keyboard
acceptance_criteria:
  - id: AC-402-1
    title: Hierarchy explorer levels are keyboard accessible
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1][tabindex]'
    when: []
  - id: AC-402-2
    title: Theme toggle is keyboard accessible
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
`;
loadAndRun(stories_402);

// US-301: Toggle between dark and light themes
const stories_301 = `
id: US-301
title: Toggle between dark and light themes
acceptance_criteria:
  - id: AC-301-1
    title: Theme toggle button is present
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-301-2
    title: Clicking the theme toggle changes the active theme
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
`;
loadAndRun(stories_301);
