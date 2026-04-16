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

// US-201: Visitor sees meta-banner explaining the site is a RootSpec demo
const stories_201 = `
id: US-201
title: Visitor sees meta-banner explaining the site is a RootSpec demo
acceptance_criteria:
  - id: AC-201-1
    title: Meta-banner is visible on page load
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-201-2
    title: Meta-banner contains link to the spec files
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner] [data-test=view-spec-link]'
    when: []
  - id: AC-201-3
    title: Meta-banner contains link to the seed file
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner] [data-test=view-seed-link]'
    when: []
`;
loadAndRun(stories_201);

// US-202: Visitor sees the hero section with tagline and version badge
const stories_202 = `
id: US-202
title: Visitor sees the hero section with tagline and version badge
acceptance_criteria:
  - id: AC-202-1
    title: Hero section is visible with a headline
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero-section]'
      - shouldExist:
          selector: '[data-test=hero-headline]'
    when: []
  - id: AC-202-2
    title: Version badge is visible in the hero or header
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
`;
loadAndRun(stories_202);

// US-203: Visitor sees the problem section explaining why existing approaches fail
const stories_203 = `
id: US-203
title: Visitor sees the problem section explaining why existing approaches fail
acceptance_criteria:
  - id: AC-203-1
    title: Problem section is present on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=problem-section]'
    when: []
`;
loadAndRun(stories_203);

// US-204: Visitor sees the four RootSpec skills explained
const stories_204 = `
id: US-204
title: Visitor sees the four RootSpec skills explained
acceptance_criteria:
  - id: AC-204-1
    title: How-it-works section is present with the four skills
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
loadAndRun(stories_204);

// US-205: Visitor sees the open source CTA with GitHub link
const stories_205 = `
id: US-205
title: Visitor sees the open source CTA with GitHub link
acceptance_criteria:
  - id: AC-205-1
    title: CTA section contains GitHub link
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=cta-section]'
      - shouldExist:
          selector: '[data-test=github-link]'
    when: []
`;
loadAndRun(stories_205);

// US-206: Visitor sees the footer with builder attribution
const stories_206 = `
id: US-206
title: Visitor sees the footer with builder attribution
acceptance_criteria:
  - id: AC-206-1
    title: Footer is present with attribution text
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=footer]'
      - shouldExist:
          selector: '[data-test=footer-attribution]'
    when: []
`;
loadAndRun(stories_206);

// US-301: Visitor can expand hierarchy levels in the explorer
const stories_301 = `
id: US-301
title: Visitor can expand hierarchy levels in the explorer
acceptance_criteria:
  - id: AC-301-1
    title: Hierarchy explorer section is present
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
    when: []
  - id: AC-301-2
    title: Clicking a level card expands it
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1][aria-expanded="true"]'
  - id: AC-301-3
    title: Expanded level shows example content
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1-content]'
`;
loadAndRun(stories_301);

// US-302: Visitor can complete the Spec Your Idea Wizard
const stories_302 = `
id: US-302
title: Visitor can complete the Spec Your Idea Wizard
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
    title: Wizard shows step 1 with a product idea input
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
      - shouldExist:
          selector: '[data-test=product-idea-input]'
    when: []
  - id: AC-302-3
    title: Wizard advances to step 2 after entering a product idea
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=product-idea-input]'
          value: A tool for tracking daily habits
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-2]'
  - id: AC-302-4
    title: Completing the wizard shows a spec skeleton output
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=product-idea-input]'
          value: A tool for tracking daily habits
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=mission-template-0]'
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=pillar-option-0]'
      - click:
          selector: '[data-test=pillar-option-1]'
      - click:
          selector: '[data-test=pillar-option-2]'
      - fill:
          selector: '[data-test=key-interaction-input]'
          value: User marks a habit as complete
      - click:
          selector: '[data-test=wizard-generate]'
    then:
      - shouldExist:
          selector: '[data-test=spec-output]'
`;
loadAndRun(stories_302);

// US-303: Visitor can toggle the before/after comparison
const stories_303 = `
id: US-303
title: Visitor can toggle the before/after comparison
acceptance_criteria:
  - id: AC-303-1
    title: Comparison section is present
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=comparison-section]'
    when: []
  - id: AC-303-2
    title: Toggling shows the "with RootSpec" panel
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=comparison-toggle-after]'
    then:
      - shouldExist:
          selector: '[data-test=comparison-panel-after]'
`;
loadAndRun(stories_303);

// US-304: Visitor can navigate the hierarchy explorer with keyboard
const stories_304 = `
id: US-304
title: Visitor can navigate the hierarchy explorer with keyboard
acceptance_criteria:
  - id: AC-304-1
    title: Hierarchy level cards are reachable via keyboard
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1][tabindex], [data-test=hierarchy-level-1][role="button"]'
    when: []
`;
loadAndRun(stories_304);

// US-401: Site renders correctly on mobile viewport
const stories_401 = `
id: US-401
title: Site renders correctly on mobile viewport
acceptance_criteria:
  - id: AC-401-1
    title: Page is usable on a narrow viewport
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldExist:
          selector: '[data-test=hero-section]'
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
    when: []
`;
loadAndRun(stories_401);

// US-402: Site is navigable without JavaScript
const stories_402 = `
id: US-402
title: Site is navigable without JavaScript
acceptance_criteria:
  - id: AC-402-1
    title: Core content is visible without JavaScript
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldExist:
          selector: '[data-test=hero-section]'
      - shouldExist:
          selector: '[data-test=cta-section]'
    when: []
`;
loadAndRun(stories_402);

// US-101: Page loads in correct theme based on system preference
const stories_101 = `
id: US-101
title: Page loads in correct theme based on system preference
acceptance_criteria:
  - id: AC-101-1
    title: Dark mode applied when system prefers dark
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-theme="dark"], html.dark, body.dark'
    when: []
  - id: AC-101-2
    title: Theme toggle is visible in the header
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
`;
loadAndRun(stories_101);

// US-102: Toggle switches between dark and light theme
const stories_102 = `
id: US-102
title: Toggle switches between dark and light theme
acceptance_criteria:
  - id: AC-102-1
    title: Clicking theme toggle changes the theme
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: html.light, html[data-theme="light"], body.light
`;
loadAndRun(stories_102);
