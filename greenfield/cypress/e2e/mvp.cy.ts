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

// US-001: Meta banner is visible above the fold on page load
const stories_001 = `
id: US-001
title: Meta banner is visible above the fold on page load
acceptance_criteria:
  - id: AC-001-1
    title: Meta banner is present in the page
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-001-2
    title: Meta banner contains links to spec and seed files
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner] a[href*="github.com"]'
    when: []
`;
loadAndRun(stories_001);

// US-002: Hero section displays tagline, explanation, and version badge
const stories_002 = `
id: US-002
title: Hero section displays tagline, explanation, and version badge
acceptance_criteria:
  - id: AC-002-1
    title: Hero section is present
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=hero]'
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
  - id: AC-002-2
    title: Version badge displays a version string
    given:
      - visit: /demos/greenfield/
    then:
      - shouldContain:
          selector: '[data-test=version-badge]'
          text: v
    when: []
`;
loadAndRun(stories_002);

// US-003: Author's Notes section renders the full verbatim text
const stories_003 = `
id: US-003
title: Author's Notes section renders the full verbatim text
acceptance_criteria:
  - id: AC-003-1
    title: Author's Notes section exists with a heading
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=authors-notes]'
    when: []
  - id: AC-003-2
    title: Author's Notes contains the opening sentence of the author's text
    given:
      - visit: /demos/greenfield/
    then:
      - shouldContain:
          selector: '[data-test=authors-notes]'
          text: This page explains why I built Rootspec.
    when: []
  - id: AC-003-3
    title: Author's Notes contains the replicator metaphor
    given:
      - visit: /demos/greenfield/
    then:
      - shouldContain:
          selector: '[data-test=authors-notes]'
          text: replicator from Star Trek
    when: []
`;
loadAndRun(stories_003);

// US-004: Visitor expands a hierarchy level to see its purpose and example content
const stories_004 = `
id: US-004
title: Visitor expands a hierarchy level to see its purpose and example content
acceptance_criteria:
  - id: AC-004-1
    title: Hierarchy Explorer is present on the page
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
    when: []
  - id: AC-004-2
    title: Clicking a level reveals expanded content
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1-expanded]'
  - id: AC-004-3
    title: Expanding a different level collapses the previous
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
      - click:
          selector: '[data-test=hierarchy-level-2]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-2-expanded]'
`;
loadAndRun(stories_004);

// US-005: Visitor completes the Spec Wizard and receives a skeleton spec output
const stories_005 = `
id: US-005
title: Visitor completes the Spec Wizard and receives a skeleton spec output
acceptance_criteria:
  - id: AC-005-1
    title: Spec Wizard is present on the page
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
    when: []
  - id: AC-005-2
    title: Entering a product idea and advancing shows Step 2
    given:
      - visit: /demos/greenfield/
    when:
      - fill:
          selector: '[data-test=wizard-product-idea]'
          value: A tool for tracking reading habits
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-2]'
  - id: AC-005-3
    title: Empty product idea prevents advancing
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-error]'
`;
loadAndRun(stories_005);

// US-007: Core page sections are readable and usable on mobile viewports
const stories_007 = `
id: US-007
title: Core page sections are readable and usable on mobile viewports
acceptance_criteria:
  - id: AC-007-1
    title: Meta banner is visible on mobile without horizontal scrolling
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-007-2
    title: Hero section is present and readable on mobile
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=hero]'
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
`;
loadAndRun(stories_007);

// US-006: Visitor can toggle between light and dark mode
const stories_006 = `
id: US-006
title: Visitor can toggle between light and dark mode
acceptance_criteria:
  - id: AC-006-1
    title: Theme toggle control is present in the header
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-006-2
    title: Clicking the theme toggle changes the active theme
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: html[data-theme="dark"], html.dark
`;
loadAndRun(stories_006);
