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

// US-001: Understand the site is a RootSpec demo before reading anything else
const stories_001 = `
id: US-001
title: Understand the site is a RootSpec demo before reading anything else
acceptance_criteria:
  - id: AC-001-1
    title: Meta banner is visible without scrolling
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-001-2
    title: Meta banner contains link to spec files
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner-spec-link]'
    when: []
  - id: AC-001-3
    title: Meta banner contains link to SEED.md
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner-seed-link]'
    when: []
`;
loadAndRun(stories_001);

// US-002: Understand what RootSpec is from the hero section
const stories_002 = `
id: US-002
title: Understand what RootSpec is from the hero section
acceptance_criteria:
  - id: AC-002-1
    title: Hero shows tagline
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero-tagline]'
    when: []
  - id: AC-002-2
    title: Hero shows version badge
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
  - id: AC-002-3
    title: Hero shows primary CTA link
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero-cta]'
    when: []
`;
loadAndRun(stories_002);

// US-003: Recognize my pain points in the problem section
const stories_003 = `
id: US-003
title: Recognize my pain points in the problem section
acceptance_criteria:
  - id: AC-003-1
    title: Problem section exists with real content
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=problem-section]'
    when: []
`;
loadAndRun(stories_003);

// US-004: Understand the four-skill workflow
const stories_004 = `
id: US-004
title: Understand the four-skill workflow
acceptance_criteria:
  - id: AC-004-1
    title: How it works section shows four skills
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=how-it-works]'
      - shouldContain:
          selector: '[data-test=how-it-works]'
          text: rs-init
      - shouldContain:
          selector: '[data-test=how-it-works]'
          text: rs-spec
      - shouldContain:
          selector: '[data-test=how-it-works]'
          text: rs-impl
      - shouldContain:
          selector: '[data-test=how-it-works]'
          text: rs-validate
    when: []
`;
loadAndRun(stories_004);

// US-005: Find the GitHub repo link to start using RootSpec
const stories_005 = `
id: US-005
title: Find the GitHub repo link to start using RootSpec
acceptance_criteria:
  - id: AC-005-1
    title: CTA section exists with GitHub link
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=cta-section]'
      - shouldExist:
          selector: '[data-test=github-link]'
    when: []
`;
loadAndRun(stories_005);

// US-006: See who built the site and when
const stories_006 = `
id: US-006
title: See who built the site and when
acceptance_criteria:
  - id: AC-006-1
    title: Footer shows builder attribution and date
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

// US-010: Explore the five spec levels interactively
const stories_010 = `
id: US-010
title: Explore the five spec levels interactively
acceptance_criteria:
  - id: AC-010-1
    title: Hierarchy explorer is visible on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
    when: []
  - id: AC-010-2
    title: Clicking a level expands it
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1-content]'
  - id: AC-010-3
    title: Clicking the same level again collapses it
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
loadAndRun(stories_010);

// US-011: Generate a skeleton spec from my own product idea
const stories_011 = `
id: US-011
title: Generate a skeleton spec from my own product idea
acceptance_criteria:
  - id: AC-011-1
    title: Wizard is visible on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
    when: []
  - id: AC-011-2
    title: Entering a product idea advances to step 2
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-idea-input]'
          value: A tool for tracking reading habits
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-2]'
  - id: AC-011-3
    title: Completing the wizard shows a skeleton spec
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-idea-input]'
          value: A tool for tracking reading habits
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=wizard-mission-option]'
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=wizard-pillar-option]'
      - click:
          selector: '[data-test=wizard-next]'
      - fill:
          selector: '[data-test=wizard-interaction-input]'
          value: Mark a book as finished
      - click:
          selector: '[data-test=wizard-finish]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-output]'
`;
loadAndRun(stories_011);

// US-012: See the difference between specced and unspecced development
const stories_012 = `
id: US-012
title: See the difference between specced and unspecced development
acceptance_criteria:
  - id: AC-012-1
    title: Comparison section is visible
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=comparison-section]'
    when: []
  - id: AC-012-2
    title: Toggling switches between views
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=comparison-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=comparison-section]'
`;
loadAndRun(stories_012);

// US-013: Switch between dark and light mode
const stories_013 = `
id: US-013
title: Switch between dark and light mode
acceptance_criteria:
  - id: AC-013-1
    title: Theme toggle is visible in the header
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-013-2
    title: Clicking the toggle changes the theme
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
`;
loadAndRun(stories_013);

// US-030: Access all content and interactive features on a mobile device
const stories_030 = `
id: US-030
title: Access all content and interactive features on a mobile device
acceptance_criteria:
  - id: AC-030-1
    title: Page renders all sections on mobile viewport
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero-tagline]'
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-030-2
    title: Hierarchy explorer is usable on mobile
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1-content]'
`;
loadAndRun(stories_030);

// US-031: Navigate all interactive elements without a mouse
const stories_031 = `
id: US-031
title: Navigate all interactive elements without a mouse
acceptance_criteria:
  - id: AC-031-1
    title: Theme toggle is keyboard accessible
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
  - id: AC-031-2
    title: Hierarchy explorer levels have visible focus states
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1]'
`;
loadAndRun(stories_031);

// US-020: See correct theme on first visit without manual configuration
const stories_020 = `
id: US-020
title: See correct theme on first visit without manual configuration
acceptance_criteria:
  - id: AC-020-1
    title: Page renders without flash of incorrect theme
    given:
      - visit: /
    then:
      - shouldExist:
          selector: html
    when: []
`;
loadAndRun(stories_020);

// US-021: Have my theme preference remembered when I return
const stories_021 = `
id: US-021
title: Have my theme preference remembered when I return
acceptance_criteria:
  - id: AC-021-1
    title: Theme toggle is present and functional
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
`;
loadAndRun(stories_021);
