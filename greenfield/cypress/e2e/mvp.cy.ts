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

// US-101: Meta banner explains demo context with working GitHub links
const stories_101 = `
id: US-101
title: Meta banner explains demo context with working GitHub links
acceptance_criteria:
  - id: AC-101-1
    title: Meta banner is visible on page load
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldContain:
          selector: '[data-test=meta-banner]'
          text: RootSpec
    when: []
  - id: AC-101-2
    title: Meta banner links to spec files on GitHub
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner-spec-link]'
      - shouldExist:
          selector: '[data-test=meta-banner-seed-link]'
    when: []
`;
loadAndRun(stories_101);

// US-102: Hero section displays tagline, explanation, and version badge
const stories_102 = `
id: US-102
title: Hero section displays tagline, explanation, and version badge
acceptance_criteria:
  - id: AC-102-1
    title: Hero shows tagline and one-line explanation
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=hero-section]'
      - shouldExist:
          selector: '[data-test=hero-tagline]'
    when: []
  - id: AC-102-2
    title: Hero displays RootSpec version badge
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
`;
loadAndRun(stories_102);

// US-103: Problem section clearly describes four pain points
const stories_103 = `
id: US-103
title: Problem section clearly describes four pain points
acceptance_criteria:
  - id: AC-103-1
    title: Problem section is present and contains pain point content
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=problem-section]'
      - shouldContain:
          selector: '[data-test=problem-section]'
          text: spec
    when: []
`;
loadAndRun(stories_103);

// US-104: How It Works section walks through the four RootSpec skills
const stories_104 = `
id: US-104
title: How It Works section walks through the four RootSpec skills
acceptance_criteria:
  - id: AC-104-1
    title: Workflow section displays all four skills
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=workflow-section]'
      - shouldContain:
          selector: '[data-test=workflow-section]'
          text: rs-init
      - shouldContain:
          selector: '[data-test=workflow-section]'
          text: rs-spec
      - shouldContain:
          selector: '[data-test=workflow-section]'
          text: rs-impl
      - shouldContain:
          selector: '[data-test=workflow-section]'
          text: rs-validate
    when: []
`;
loadAndRun(stories_104);

// US-105: CTA section provides link to the RootSpec GitHub repository
const stories_105 = `
id: US-105
title: CTA section provides link to the RootSpec GitHub repository
acceptance_criteria:
  - id: AC-105-1
    title: CTA section exists with GitHub link
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=cta-section]'
      - shouldExist:
          selector: '[data-test=cta-github-link]'
    when: []
`;
loadAndRun(stories_105);

// US-201: User clicks a hierarchy level to expand and view example content
const stories_201 = `
id: US-201
title: User clicks a hierarchy level to expand and view example content
acceptance_criteria:
  - id: AC-201-1
    title: Hierarchy Explorer is visible on page
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
      - shouldExist:
          selector: '[data-test=hierarchy-level]'
    when: []
  - id: AC-201-2
    title: Clicking a level shows expanded content
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=hierarchy-level]:first-child'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-content]'
`;
loadAndRun(stories_201);

// US-202: User completes the Spec Wizard and sees a skeleton spec output
const stories_202 = `
id: US-202
title: User completes the Spec Wizard and sees a skeleton spec output
acceptance_criteria:
  - id: AC-202-1
    title: Spec Wizard is visible and shows step 1
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
    when: []
  - id: AC-202-2
    title: Wizard advance requires mission input
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
  - id: AC-202-3
    title: Completing the wizard shows skeleton spec output
    given:
      - visit: /demos/greenfield/
    when:
      - fill:
          selector: '[data-test=wizard-mission-input]'
          value: A tool to help teams write better specs
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=wizard-pillar-option]:first-child'
      - click:
          selector: '[data-test=wizard-pillar-option]:nth-child(2)'
      - click:
          selector: '[data-test=wizard-pillar-option]:nth-child(3)'
      - click:
          selector: '[data-test=wizard-next]'
      - fill:
          selector: '[data-test=wizard-interaction-input]'
          value: User clicks a level to expand example content
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-output]'
`;
loadAndRun(stories_202);

// US-203: User sees the before/after comparison of specs with and without RootSpec
const stories_203 = `
id: US-203
title: User sees the before/after comparison of specs with and without RootSpec
acceptance_criteria:
  - id: AC-203-1
    title: Comparison section is visible with both panels
    given:
      - visit: /demos/greenfield/
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

// US-501: RootSpec methodology diagram is visible on the page
const stories_501 = `
id: US-501
title: RootSpec methodology diagram is visible on the page
acceptance_criteria:
  - id: AC-501-1
    title: Methodology diagram renders in the page
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=methodology-diagram]'
    when: []
`;
loadAndRun(stories_501);

// US-502: Page sections animate into view as user scrolls
const stories_502 = `
id: US-502
title: Page sections animate into view as user scrolls
acceptance_criteria:
  - id: AC-502-1
    title: Main sections are visible after scroll
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=hero-section]'
      - shouldExist:
          selector: '[data-test=problem-section]'
      - shouldExist:
          selector: '[data-test=workflow-section]'
    when: []
`;
loadAndRun(stories_502);

// US-401: Site renders correctly and is usable on mobile devices
const stories_401 = `
id: US-401
title: Site renders correctly and is usable on mobile devices
acceptance_criteria:
  - id: AC-401-1
    title: Page renders without horizontal scroll on mobile
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=hero-section]'
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-401-2
    title: Hierarchy Explorer is usable on mobile
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=hierarchy-level]:first-child'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-content]'
`;
loadAndRun(stories_401);

// US-301: User toggles between dark and light theme
const stories_301 = `
id: US-301
title: User toggles between dark and light theme
acceptance_criteria:
  - id: AC-301-1
    title: Theme toggle button is present in the header
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-301-2
    title: Clicking theme toggle changes the theme
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
`;
loadAndRun(stories_301);
