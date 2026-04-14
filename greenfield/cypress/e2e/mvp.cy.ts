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

// US-001: View the meta banner explaining the site is a RootSpec demo
const stories_001 = `
id: US-001
title: View the meta banner explaining the site is a RootSpec demo
acceptance_criteria:
  - id: AC-001-1
    title: Meta banner is visible above the fold
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-001-2
    title: Meta banner contains a link to the seed file
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner-seed-link]'
    when: []
  - id: AC-001-3
    title: Meta banner contains a link to the spec files
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner-spec-link]'
    when: []
`;
loadAndRun(stories_001);

// US-002: Understand what RootSpec is from the hero section
const stories_002 = `
id: US-002
title: Understand what RootSpec is from the hero section
acceptance_criteria:
  - id: AC-002-1
    title: Hero section contains a tagline
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero-tagline]'
    when: []
  - id: AC-002-2
    title: Hero section displays the RootSpec version
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
  - id: AC-002-3
    title: Hero section contains a RootSpec diagram
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=rootspec-diagram]'
    when: []
`;
loadAndRun(stories_002);

// US-003: Understand the problems RootSpec solves
const stories_003 = `
id: US-003
title: Understand the problems RootSpec solves
acceptance_criteria:
  - id: AC-003-1
    title: Problem section is present on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=problem-section]'
    when: []
`;
loadAndRun(stories_003);

// US-004: Understand the four RootSpec skills
const stories_004 = `
id: US-004
title: Understand the four RootSpec skills
acceptance_criteria:
  - id: AC-004-1
    title: How It Works section lists all four skills
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=how-it-works-section]'
      - shouldContain:
          selector: '[data-test=how-it-works-section]'
          text: rs-init
      - shouldContain:
          selector: '[data-test=how-it-works-section]'
          text: rs-spec
      - shouldContain:
          selector: '[data-test=how-it-works-section]'
          text: rs-impl
      - shouldContain:
          selector: '[data-test=how-it-works-section]'
          text: rs-validate
    when: []
`;
loadAndRun(stories_004);

// US-005: Navigate to the RootSpec GitHub repository from the CTA section
const stories_005 = `
id: US-005
title: Navigate to the RootSpec GitHub repository from the CTA section
acceptance_criteria:
  - id: AC-005-1
    title: CTA section has a link to the GitHub repo
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=cta-section]'
      - shouldExist:
          selector: '[data-test=github-cta-link]'
    when: []
`;
loadAndRun(stories_005);

// US-006: See who built the site and when
const stories_006 = `
id: US-006
title: See who built the site and when
acceptance_criteria:
  - id: AC-006-1
    title: Footer identifies the builder and build date
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=footer]'
      - shouldExist:
          selector: '[data-test=footer-attribution]'
    when: []
`;
loadAndRun(stories_006);

// US-007: Explore the five-level spec hierarchy interactively
const stories_007 = `
id: US-007
title: Explore the five-level spec hierarchy interactively
acceptance_criteria:
  - id: AC-007-1
    title: Hierarchy Explorer is visible on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
    when: []
  - id: AC-007-2
    title: Clicking a level expands it to show content
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1-content]'
  - id: AC-007-3
    title: All five levels are present
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
loadAndRun(stories_007);

// US-008: Walk through the spec wizard and see a skeleton spec
const stories_008 = `
id: US-008
title: Walk through the spec wizard and see a skeleton spec
acceptance_criteria:
  - id: AC-008-1
    title: Spec Wizard is visible on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
    when: []
  - id: AC-008-2
    title: Completing Step 1 advances to Step 2
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-product-idea]'
          value: A tool for tracking reading habits
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-2]'
  - id: AC-008-3
    title: Completing all steps shows the skeleton spec
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-product-idea]'
          value: A tool for tracking reading habits
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=wizard-pillar-option-0]'
      - click:
          selector: '[data-test=wizard-next]'
      - fill:
          selector: '[data-test=wizard-key-interaction]'
          value: User logs a book they finished
      - click:
          selector: '[data-test=wizard-submit]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-output]'
`;
loadAndRun(stories_008);

// US-009: Compare development with and without RootSpec
const stories_009 = `
id: US-009
title: Compare development with and without RootSpec
acceptance_criteria:
  - id: AC-009-1
    title: Before/After Comparison section is visible
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=comparison-section]'
    when: []
  - id: AC-009-2
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
loadAndRun(stories_009);

// US-011: Access the full site content on a mobile device
const stories_011 = `
id: US-011
title: Access the full site content on a mobile device
acceptance_criteria:
  - id: AC-011-1
    title: All key sections are present on narrow viewports
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldExist:
          selector: '[data-test=hero-tagline]'
      - shouldExist:
          selector: '[data-test=how-it-works-section]'
    when: []
`;
loadAndRun(stories_011);

// US-012: Interact with the hierarchy explorer on touch devices
const stories_012 = `
id: US-012
title: Interact with the hierarchy explorer on touch devices
acceptance_criteria:
  - id: AC-012-1
    title: Hierarchy explorer tap interaction works
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1-content]'
`;
loadAndRun(stories_012);

// US-010: Toggle between dark and light theme
const stories_010 = `
id: US-010
title: Toggle between dark and light theme
acceptance_criteria:
  - id: AC-010-1
    title: Theme toggle button is visible in the header
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-010-2
    title: Clicking the theme toggle changes the theme
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
`;
loadAndRun(stories_010);
