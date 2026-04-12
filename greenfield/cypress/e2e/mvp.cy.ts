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

// US-101: Understand what RootSpec is from the hero
const stories_101 = `
id: US-101
title: Understand what RootSpec is from the hero
acceptance_criteria:
  - id: AC-101-1
    title: Hero communicates the product in one sentence
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero-tagline]'
    when: []
`;
loadAndRun(stories_101);

// US-102: See the meta banner explaining the site is a RootSpec demo
const stories_102 = `
id: US-102
title: See the meta banner explaining the site is a RootSpec demo
acceptance_criteria:
  - id: AC-102-1
    title: Meta banner is visible above the fold
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-102-2
    title: Meta banner contains links to SEED.md and spec files
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner] a[data-test=seed-link]'
      - shouldExist:
          selector: '[data-test=meta-banner] a[data-test=spec-link]'
    when: []
`;
loadAndRun(stories_102);

// US-103: See the current RootSpec version displayed prominently
const stories_103 = `
id: US-103
title: See the current RootSpec version displayed prominently
acceptance_criteria:
  - id: AC-103-1
    title: Version badge shows the version from .rootspec.json
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
      - shouldContain:
          selector: '[data-test=version-badge]'
          text: 7.2.0
    when: []
`;
loadAndRun(stories_103);

// US-104: Find the GitHub repo and getting started instructions
const stories_104 = `
id: US-104
title: Find the GitHub repo and getting started instructions
acceptance_criteria:
  - id: AC-104-1
    title: CTA section contains GitHub link
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=cta-github]'
    when: []
`;
loadAndRun(stories_104);

// US-105: Read the before/after comparison with real content
const stories_105 = `
id: US-105
title: Read the before/after comparison with real content
acceptance_criteria:
  - id: AC-105-1
    title: Before panel contains a without-spec example
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=before-panel]'
    when: []
  - id: AC-105-2
    title: After panel contains a with-RootSpec example
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=after-panel]'
    when: []
`;
loadAndRun(stories_105);

// US-201: Explore the five-level hierarchy interactively
const stories_201 = `
id: US-201
title: Explore the five-level hierarchy interactively
acceptance_criteria:
  - id: AC-201-1
    title: Clicking a level expands it to show example content
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1][aria-expanded=true]'
      - shouldExist:
          selector: '[data-test=hierarchy-level-1-content]'
  - id: AC-201-2
    title: Clicking an expanded level collapses it
    given:
      - visit: /
      - click:
          selector: '[data-test=hierarchy-level-1]'
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1][aria-expanded=false]'
  - id: AC-201-3
    title: All five levels are visible in the explorer
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
`;
loadAndRun(stories_201);

// US-202: Complete the Spec Your Idea wizard with a product idea
const stories_202 = `
id: US-202
title: Complete the Spec Your Idea wizard with a product idea
acceptance_criteria:
  - id: AC-202-1
    title: Wizard accepts a product idea and advances to step 1
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-idea-input]'
          value: A tool for tracking personal reading habits
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
  - id: AC-202-2
    title: Empty product idea is rejected
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-idea-error]'
  - id: AC-202-3
    title: Completing all wizard steps shows a skeleton spec output
    given:
      - visit: /
      - fill:
          selector: '[data-test=wizard-idea-input]'
          value: A tool for tracking personal reading habits
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=wizard-mission-0]'
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=wizard-pillar-0]'
      - click:
          selector: '[data-test=wizard-pillar-1]'
      - click:
          selector: '[data-test=wizard-pillar-2]'
      - click:
          selector: '[data-test=wizard-next]'
      - fill:
          selector: '[data-test=wizard-interaction-input]'
          value: User marks a book as finished
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-output]'
    when: []
`;
loadAndRun(stories_202);

// US-203: Toggle between before and after views on mobile
const stories_203 = `
id: US-203
title: Toggle between before and after views on mobile
acceptance_criteria:
  - id: AC-203-1
    title: Before/after toggle switches the visible panel
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=comparison-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=after-panel]'
`;
loadAndRun(stories_203);

// US-401: Navigate the site on a mobile viewport
const stories_401 = `
id: US-401
title: Navigate the site on a mobile viewport
acceptance_criteria:
  - id: AC-401-1
    title: Meta banner is visible on mobile without horizontal scrolling
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-401-2
    title: Wizard is usable on mobile
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-idea-input]'
          value: A meal planning tool
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
`;
loadAndRun(stories_401);

// US-301: Toggle between dark and light mode
const stories_301 = `
id: US-301
title: Toggle between dark and light mode
acceptance_criteria:
  - id: AC-301-1
    title: Theme toggle switches the active theme
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-theme=dark]'
  - id: AC-301-2
    title: Theme toggle button is visible in the header
    given:
      - visit: /
    then:
      - shouldExist:
          selector: header [data-test=theme-toggle]
    when: []
`;
loadAndRun(stories_301);
