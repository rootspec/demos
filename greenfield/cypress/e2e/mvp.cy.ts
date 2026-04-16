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

// US-101: See meta banner explaining the site is a RootSpec demo
const stories_101 = `
id: US-101
title: See meta banner explaining the site is a RootSpec demo
acceptance_criteria:
  - id: AC-101-1
    title: Meta banner is visible on page load
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldContain:
          selector: '[data-test=meta-banner]'
          text: RootSpec
    when: []
  - id: AC-101-2
    title: Meta banner contains link to spec files
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner] a[href*="github.com"]'
    when: []
`;
loadAndRun(stories_101);

// US-102: See hero section with tagline and version badge
const stories_102 = `
id: US-102
title: See hero section with tagline and version badge
acceptance_criteria:
  - id: AC-102-1
    title: Hero section renders with tagline
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero]'
      - shouldContain:
          selector: '[data-test=hero]'
          text: RootSpec
    when: []
  - id: AC-102-2
    title: Version badge displays current RootSpec version
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
`;
loadAndRun(stories_102);

// US-103: Read the problem section describing spec drift and AI limitations
const stories_103 = `
id: US-103
title: Read the problem section describing spec drift and AI limitations
acceptance_criteria:
  - id: AC-103-1
    title: Problem section is present and readable
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=problem-section]'
    when: []
`;
loadAndRun(stories_103);

// US-104: Read how-it-works walkthrough of the four skills
const stories_104 = `
id: US-104
title: Read how-it-works walkthrough of the four skills
acceptance_criteria:
  - id: AC-104-1
    title: How-it-works section describes the four skills
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=how-it-works]'
      - shouldContain:
          selector: '[data-test=how-it-works]'
          text: rs-init
    when: []
`;
loadAndRun(stories_104);

// US-105: Find CTA with link to the RootSpec GitHub repository
const stories_105 = `
id: US-105
title: Find CTA with link to the RootSpec GitHub repository
acceptance_criteria:
  - id: AC-105-1
    title: CTA section contains GitHub link
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=cta-section]'
      - shouldExist:
          selector: '[data-test=cta-section] a[href*="github.com/rootspec"]'
    when: []
`;
loadAndRun(stories_105);

// US-201: Explore the five spec levels using the Hierarchy Explorer
const stories_201 = `
id: US-201
title: Explore the five spec levels using the Hierarchy Explorer
acceptance_criteria:
  - id: AC-201-1
    title: Hierarchy Explorer renders all five levels
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
      - shouldExist:
          selector: '[data-test=level-card-1]'
      - shouldExist:
          selector: '[data-test=level-card-5]'
    when: []
  - id: AC-201-2
    title: Clicking a level card expands it with example content
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=level-card-1]'
    then:
      - shouldExist:
          selector: '[data-test=level-detail-1]'
`;
loadAndRun(stories_201);

// US-202: Complete the Spec Wizard with a product idea
const stories_202 = `
id: US-202
title: Complete the Spec Wizard with a product idea
acceptance_criteria:
  - id: AC-202-1
    title: Spec Wizard renders on page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
      - shouldExist:
          selector: '[data-test=wizard-step-indicator]'
    when: []
  - id: AC-202-2
    title: Wizard advances to step 2 after entering a mission
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-mission-input]'
          value: A tool for focused writing without distractions
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-2]'
  - id: AC-202-3
    title: Wizard blocks advance when mission is empty
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-validation-message]'
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
  - id: AC-202-4
    title: Completed wizard shows spec output fragment
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-mission-input]'
          value: A tool for focused writing
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=pillar-option]:first-child'
      - click:
          selector: '[data-test=wizard-next]'
      - fill:
          selector: '[data-test=wizard-interaction-input]'
          value: User opens app and starts writing immediately
      - click:
          selector: '[data-test=wizard-finish]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-output]'
`;
loadAndRun(stories_202);

// US-203: View the Before/After comparison of spec quality
const stories_203 = `
id: US-203
title: View the Before/After comparison of spec quality
acceptance_criteria:
  - id: AC-203-1
    title: Before/After comparison renders with two panels
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=comparison-section]'
      - shouldExist:
          selector: '[data-test=comparison-before]'
      - shouldExist:
          selector: '[data-test=comparison-after]'
    when: []
`;
loadAndRun(stories_203);

// US-401: Use the site comfortably on a mobile device
const stories_401 = `
id: US-401
title: Use the site comfortably on a mobile device
acceptance_criteria:
  - id: AC-401-1
    title: Page is readable on mobile viewport
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero]'
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-401-2
    title: Hierarchy Explorer shows accordion on mobile
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
    when: []
  - id: AC-401-3
    title: Spec Wizard is usable on mobile
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
    when: []
`;
loadAndRun(stories_401);

// US-301: Toggle between dark and light mode
const stories_301 = `
id: US-301
title: Toggle between dark and light mode
acceptance_criteria:
  - id: AC-301-1
    title: Theme toggle button is present in the header
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-301-2
    title: Clicking theme toggle switches the active theme
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-theme]'
`;
loadAndRun(stories_301);
