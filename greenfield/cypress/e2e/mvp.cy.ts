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

// US-101: Visitor sees meta-banner explaining the site is a RootSpec demo
const stories_101 = `
id: US-101
title: Visitor sees meta-banner explaining the site is a RootSpec demo
acceptance_criteria:
  - id: AC-101-1
    title: Meta banner is visible on page load without scrolling
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldContain:
          selector: '[data-test=meta-banner]'
          text: generated
      - shouldExist:
          selector: '[data-test=meta-banner-spec-link]'
      - shouldExist:
          selector: '[data-test=meta-banner-seed-link]'
    when: []
`;
loadAndRun(stories_101);

// US-102: Visitor sees version badge showing the RootSpec version used to build the site
const stories_102 = `
id: US-102
title: Visitor sees version badge showing the RootSpec version used to build the site
acceptance_criteria:
  - id: AC-102-1
    title: Version badge is present in the hero section
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
  - id: AC-102-2
    title: Version badge contains a version string
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
`;
loadAndRun(stories_102);

// US-103: Visitor sees hero tagline and one-sentence description immediately
const stories_103 = `
id: US-103
title: Visitor sees hero tagline and one-sentence description immediately
acceptance_criteria:
  - id: AC-103-1
    title: Hero section contains tagline and description
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero]'
      - shouldExist:
          selector: '[data-test=hero-tagline]'
      - shouldExist:
          selector: '[data-test=hero-description]'
    when: []
`;
loadAndRun(stories_103);

// US-104: Visitor can navigate to the GitHub repository from the open source CTA
const stories_104 = `
id: US-104
title: Visitor can navigate to the GitHub repository from the open source CTA
acceptance_criteria:
  - id: AC-104-1
    title: Open source CTA section exists with GitHub link
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=open-source-cta]'
      - shouldExist:
          selector: '[data-test=github-link]'
    when: []
`;
loadAndRun(stories_104);

// US-105: Visitor sees footer with builder attribution and build date
const stories_105 = `
id: US-105
title: Visitor sees footer with builder attribution and build date
acceptance_criteria:
  - id: AC-105-1
    title: Footer contains attribution and date
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=footer]'
      - shouldExist:
          selector: '[data-test=footer-attribution]'
    when: []
`;
loadAndRun(stories_105);

// US-301: Visitor explores the five-level hierarchy interactively
const stories_301 = `
id: US-301
title: Visitor explores the five-level hierarchy interactively
acceptance_criteria:
  - id: AC-301-1
    title: Hierarchy explorer section is present on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
    when: []
  - id: AC-301-2
    title: Clicking a level in the explorer expands it
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-explorer-level]:first-child'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer-level-content]'
  - id: AC-301-3
    title: All five levels are represented in the explorer
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer-level]'
    when: []
`;
loadAndRun(stories_301);

// US-302: Visitor uses the Spec Your Idea wizard to generate a skeleton spec
const stories_302 = `
id: US-302
title: Visitor uses the Spec Your Idea wizard to generate a skeleton spec
acceptance_criteria:
  - id: AC-302-1
    title: Wizard section is present on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
    when: []
  - id: AC-302-2
    title: Wizard step 1 accepts a product idea
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-idea-input]'
          value: A tool for tracking reading habits
    then:
      - shouldExist:
          selector: '[data-test=wizard-idea-input]'
  - id: AC-302-3
    title: Wizard next button is disabled until required input is provided
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=wizard-next][disabled]'
    when: []
  - id: AC-302-4
    title: Wizard produces output after completing all steps
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-idea-input]'
          value: A tool for tracking reading habits
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=wizard-mission-option]:first-child'
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=wizard-pillar-option]:nth-child(1)'
      - click:
          selector: '[data-test=wizard-pillar-option]:nth-child(2)'
      - click:
          selector: '[data-test=wizard-pillar-option]:nth-child(3)'
      - click:
          selector: '[data-test=wizard-next]'
      - fill:
          selector: '[data-test=wizard-interaction-input]'
          value: User logs a book they finished reading
      - click:
          selector: '[data-test=wizard-generate]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-output]'
`;
loadAndRun(stories_302);

// US-303: Visitor sees before/after comparison of spec vs. no-spec
const stories_303 = `
id: US-303
title: Visitor sees before/after comparison of spec vs. no-spec
acceptance_criteria:
  - id: AC-303-1
    title: Before/after section is present on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=before-after]'
    when: []
  - id: AC-303-2
    title: Both before and after panels contain real content
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=before-panel]'
      - shouldExist:
          selector: '[data-test=after-panel]'
    when: []
`;
loadAndRun(stories_303);

// US-401: Visitor on mobile can access all core content
const stories_401 = `
id: US-401
title: Visitor on mobile can access all core content
acceptance_criteria:
  - id: AC-401-1
    title: Core sections are accessible on narrow viewport
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldExist:
          selector: '[data-test=hero]'
    when: []
`;
loadAndRun(stories_401);

// US-402: Visitor on mobile can use the wizard with touch-friendly controls
const stories_402 = `
id: US-402
title: Visitor on mobile can use the wizard with touch-friendly controls
acceptance_criteria:
  - id: AC-402-1
    title: Wizard is functional on mobile viewport
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
      - shouldExist:
          selector: '[data-test=wizard-idea-input]'
    when: []
`;
loadAndRun(stories_402);

// US-403: Visitor can navigate the site using keyboard only
const stories_403 = `
id: US-403
title: Visitor can navigate the site using keyboard only
acceptance_criteria:
  - id: AC-403-1
    title: Theme toggle is keyboard accessible
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-403-2
    title: Hierarchy explorer levels are keyboard accessible
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer-level]'
    when: []
`;
loadAndRun(stories_403);

// US-201: Visitor can toggle between dark and light themes
const stories_201 = `
id: US-201
title: Visitor can toggle between dark and light themes
acceptance_criteria:
  - id: AC-201-1
    title: Theme toggle is present and visible
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-201-2
    title: Clicking theme toggle switches the theme
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-theme]'
`;
loadAndRun(stories_201);

// US-202: Visitor theme preference persists across page refresh
const stories_202 = `
id: US-202
title: Visitor theme preference persists across page refresh
acceptance_criteria:
  - id: AC-202-1
    title: Theme preference is stored and restored on reload
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
      - visit: /
    then:
      - shouldExist:
          selector: '[data-theme]'
`;
loadAndRun(stories_202);
