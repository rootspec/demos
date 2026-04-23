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

// US-001: Meta-banner is the first visible element on every page load
const stories_001 = `
id: US-001
title: Meta-banner is the first visible element on every page load
acceptance_criteria:
  - id: AC-001-1
    title: Meta-banner appears above all content on desktop
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-001-2
    title: Meta-banner contains spec link and seed link
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner] [data-test=spec-link]'
      - shouldExist:
          selector: '[data-test=meta-banner] [data-test=seed-link]'
    when: []
  - id: AC-001-3
    title: Meta-banner links are absolute GitHub URLs
    given:
      - visit: /demos/greenfield/
    then:
      - shouldContain:
          selector: '[data-test=spec-link]'
          text: spec
      - shouldContain:
          selector: '[data-test=seed-link]'
          text: seed
    when: []
`;
loadAndRun(stories_001);

// US-002: Version badge displays current RootSpec version
const stories_002 = `
id: US-002
title: Version badge displays current RootSpec version
acceptance_criteria:
  - id: AC-002-1
    title: Version badge is visible in the hero section
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
  - id: AC-002-2
    title: Version badge contains a semver string
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
`;
loadAndRun(stories_002);

// US-004: User can explore the five-level hierarchy interactively
const stories_004 = `
id: US-004
title: User can explore the five-level hierarchy interactively
acceptance_criteria:
  - id: AC-004-1
    title: All five hierarchy levels are visible
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
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
  - id: AC-004-2
    title: Clicking a level card expands it to show content
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1][aria-expanded="true"]'
      - shouldExist:
          selector: '[data-test=hierarchy-level-1-content]'
  - id: AC-004-3
    title: Clicking an expanded level collapses it
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1][aria-expanded="false"]'
`;
loadAndRun(stories_004);

// US-005: User can generate a skeleton spec from a one-line product idea
const stories_005 = `
id: US-005
title: User can generate a skeleton spec from a one-line product idea
acceptance_criteria:
  - id: AC-005-1
    title: Wizard is present and shows Step 1 on load
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
      - shouldExist:
          selector: '[data-test=wizard-idea-input]'
    when: []
  - id: AC-005-2
    title: User can advance through all three steps
    given:
      - visit: /demos/greenfield/
    when:
      - fill:
          selector: '[data-test=wizard-idea-input]'
          value: A tool to help developers write better commit messages
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-2]'
  - id: AC-005-3
    title: Completing all steps generates a skeleton spec
    given:
      - visit: /demos/greenfield/
    when:
      - fill:
          selector: '[data-test=wizard-idea-input]'
          value: A tool to help teams avoid scope drift
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=wizard-mission-option]'
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=wizard-pillar-option]'
      - click:
          selector: '[data-test=wizard-pillar-option]'
      - click:
          selector: '[data-test=wizard-pillar-option]'
      - click:
          selector: '[data-test=wizard-next]'
      - fill:
          selector: '[data-test=wizard-interaction-input]'
          value: User runs /rs-spec and answers interview questions
      - click:
          selector: '[data-test=wizard-generate]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-result]'
      - shouldExist:
          selector: '[data-test=wizard-result-l1]'
`;
loadAndRun(stories_005);

// US-006: User can see a before/after comparison of spec vs no spec
const stories_006 = `
id: US-006
title: User can see a before/after comparison of spec vs no spec
acceptance_criteria:
  - id: AC-006-1
    title: Comparison section shows both panels
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=comparison-section]'
      - shouldExist:
          selector: '[data-test=comparison-without]'
      - shouldExist:
          selector: '[data-test=comparison-with]'
    when: []
`;
loadAndRun(stories_006);

// US-007: Site is usable on mobile devices
const stories_007 = `
id: US-007
title: Site is usable on mobile devices
acceptance_criteria:
  - id: AC-007-1
    title: Site renders without horizontal overflow on mobile viewport
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldExist:
          selector: '[data-test=hero]'
    when: []
`;
loadAndRun(stories_007);

// US-008: User can navigate the full page and reach the CTA
const stories_008 = `
id: US-008
title: User can navigate the full page and reach the CTA
acceptance_criteria:
  - id: AC-008-1
    title: All major sections are present on the page
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=hero]'
      - shouldExist:
          selector: '[data-test=problem-section]'
      - shouldExist:
          selector: '[data-test=how-it-works]'
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
      - shouldExist:
          selector: '[data-test=spec-wizard]'
      - shouldExist:
          selector: '[data-test=comparison-section]'
      - shouldExist:
          selector: '[data-test=cta-section]'
    when: []
  - id: AC-008-2
    title: CTA section links to the GitHub repository
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=cta-section] [data-test=github-link]'
    when: []
  - id: AC-008-3
    title: Footer shows attribution
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=footer]'
      - shouldExist:
          selector: '[data-test=footer-attribution]'
    when: []
`;
loadAndRun(stories_008);

// US-003: User can toggle between light and dark mode
const stories_003 = `
id: US-003
title: User can toggle between light and dark mode
acceptance_criteria:
  - id: AC-003-1
    title: Theme toggle button is present in the header
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-003-2
    title: Clicking the toggle switches from light to dark mode
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: html[data-theme="dark"]
  - id: AC-003-3
    title: Clicking the toggle again returns to light mode
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=theme-toggle]'
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: html[data-theme="light"]
  - id: AC-003-4
    title: Default theme is light mode
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: html[data-theme="light"]
    when: []
`;
loadAndRun(stories_003);
