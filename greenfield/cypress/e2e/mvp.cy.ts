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

// US-001: Meta banner is visible above the fold
const stories_001 = `
id: US-001
title: Meta banner is visible above the fold
acceptance_criteria:
  - id: AC-001-1
    title: Meta banner appears before any marketing content
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-001-2
    title: Meta banner contains links to seed and spec files
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner] [data-test=seed-link]'
      - shouldExist:
          selector: '[data-test=meta-banner] [data-test=spec-link]'
    when: []
`;
loadAndRun(stories_001);

// US-002: RootSpec version is displayed on the page
const stories_002 = `
id: US-002
title: RootSpec version is displayed on the page
acceptance_criteria:
  - id: AC-002-1
    title: Version badge is visible in the hero section
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
`;
loadAndRun(stories_002);

// US-003: Author's Notes section is present with verbatim text
const stories_003 = `
id: US-003
title: Author's Notes section is present with verbatim text
acceptance_criteria:
  - id: AC-003-1
    title: Author's Notes section is present on the page
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=authors-notes]'
    when: []
  - id: AC-003-2
    title: Author's Notes contains key opening paragraph text
    given:
      - visit: /demos/greenfield/
    then:
      - shouldContain:
          selector: '[data-test=authors-notes]'
          text: capturing human intent
    when: []
`;
loadAndRun(stories_003);

// US-004: Open source CTA links to the framework GitHub repo
const stories_004 = `
id: US-004
title: Open source CTA links to the framework GitHub repo
acceptance_criteria:
  - id: AC-004-1
    title: CTA section contains a link to the GitHub repo
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=cta-section] [data-test=github-link]'
    when: []
`;
loadAndRun(stories_004);

// US-005: All required page sections are present
const stories_005 = `
id: US-005
title: All required page sections are present
acceptance_criteria:
  - id: AC-005-1
    title: Hero section is present
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=hero-section]'
      - shouldContain:
          selector: '[data-test=hero-section]'
          text: RootSpec
    when: []
  - id: AC-005-2
    title: Problem section is present
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=problem-section]'
    when: []
  - id: AC-005-3
    title: How it works section is present
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=how-it-works-section]'
    when: []
  - id: AC-005-4
    title: Footer is present with attribution
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=footer]'
    when: []
`;
loadAndRun(stories_005);

// US-101: Visitor can expand a level in the hierarchy explorer
const stories_101 = `
id: US-101
title: Visitor can expand a level in the hierarchy explorer
acceptance_criteria:
  - id: AC-101-1
    title: Hierarchy explorer is present on the page
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
    when: []
  - id: AC-101-2
    title: Clicking a level expands it to show content
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1-content]'
  - id: AC-101-3
    title: All five levels are present in the explorer
    given:
      - visit: /demos/greenfield/
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
loadAndRun(stories_101);

// US-102: Visitor can complete the spec wizard and see output
const stories_102 = `
id: US-102
title: Visitor can complete the spec wizard and see output
acceptance_criteria:
  - id: AC-102-1
    title: Spec wizard is present on the page
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
    when: []
  - id: AC-102-2
    title: Entering a product idea enables advancing to step 2
    given:
      - visit: /demos/greenfield/
    when:
      - fill:
          selector: '[data-test=wizard-product-idea]'
          value: A tool for tracking reading habits
      - click:
          selector: '[data-test=wizard-mission-option-0]'
      - click:
          selector: '[data-test=wizard-next-step]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-2]'
  - id: AC-102-3
    title: Completing all steps produces a spec output
    given:
      - visit: /demos/greenfield/
    when:
      - fill:
          selector: '[data-test=wizard-product-idea]'
          value: A tool for tracking reading habits
      - click:
          selector: '[data-test=wizard-mission-option-0]'
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
          selector: '[data-test=wizard-key-interaction]'
          value: User logs a book they just finished
      - click:
          selector: '[data-test=wizard-next-step]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-output]'
`;
loadAndRun(stories_102);

// US-103: Visitor can toggle between light and dark themes
const stories_103 = `
id: US-103
title: Visitor can toggle between light and dark themes
acceptance_criteria:
  - id: AC-103-1
    title: Theme toggle button is present in the header
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-103-2
    title: Clicking the theme toggle changes the theme
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-theme=dark]'
`;
loadAndRun(stories_103);

// US-104: Visitor can view the before and after comparison
const stories_104 = `
id: US-104
title: Visitor can view the before and after comparison
acceptance_criteria:
  - id: AC-104-1
    title: Comparison section is present on the page
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=comparison-section]'
    when: []
  - id: AC-104-2
    title: Both panels contain real content
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=comparison-without]'
      - shouldExist:
          selector: '[data-test=comparison-with]'
    when: []
`;
loadAndRun(stories_104);

// US-301: Page is usable at mobile viewport width
const stories_301 = `
id: US-301
title: Page is usable at mobile viewport width
acceptance_criteria:
  - id: AC-301-1
    title: Meta banner is visible at mobile width
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-301-2
    title: Hero section is readable at mobile width
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=hero-section]'
    when: []
`;
loadAndRun(stories_301);

// US-201: Site defaults to light mode without system preference
const stories_201 = `
id: US-201
title: Site defaults to light mode without system preference
acceptance_criteria:
  - id: AC-201-1
    title: Page renders in light mode when no preference is set
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: html[data-theme=light], body[data-theme=light], :root[data-theme=light], [data-theme=light]
    when: []
`;
loadAndRun(stories_201);
