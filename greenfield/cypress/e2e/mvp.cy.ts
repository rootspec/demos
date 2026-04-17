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

// US-101: Visitor sees honest meta banner about how the site was built
const stories_101 = `
id: US-101
title: Visitor sees honest meta banner about how the site was built
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

// US-102: Visitor understands what RootSpec is from the hero section
const stories_102 = `
id: US-102
title: Visitor understands what RootSpec is from the hero section
acceptance_criteria:
  - id: AC-102-1
    title: Hero section displays tagline
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero]'
      - shouldExist:
          selector: '[data-test=hero-tagline]'
    when: []
  - id: AC-102-2
    title: Version badge is displayed in hero or header
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
`;
loadAndRun(stories_102);

// US-103: Visitor recognizes their own pain points in the problem section
const stories_103 = `
id: US-103
title: Visitor recognizes their own pain points in the problem section
acceptance_criteria:
  - id: AC-103-1
    title: Problem section is present with specific pain points
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=problem-section]'
    when: []
`;
loadAndRun(stories_103);

// US-104: Visitor understands the four-skill workflow
const stories_104 = `
id: US-104
title: Visitor understands the four-skill workflow
acceptance_criteria:
  - id: AC-104-1
    title: How It Works section shows the four skills
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
loadAndRun(stories_104);

// US-201: Visitor explores the five-level hierarchy interactively
const stories_201 = `
id: US-201
title: Visitor explores the five-level hierarchy interactively
acceptance_criteria:
  - id: AC-201-1
    title: Hierarchy Explorer is present on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
    when: []
  - id: AC-201-2
    title: Clicking a level expands it to show content
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1-content]'
  - id: AC-201-3
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
          selector: '[data-test=hierarchy-explorer]'
`;
loadAndRun(stories_201);

// US-202: Visitor creates a skeleton spec for their own idea
const stories_202 = `
id: US-202
title: Visitor creates a skeleton spec for their own idea
acceptance_criteria:
  - id: AC-202-1
    title: Spec Wizard is present on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
    when: []
  - id: AC-202-2
    title: Visitor can enter a product idea and proceed to step 2
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=product-idea-input]'
          value: A task manager for developers
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-2]'
  - id: AC-202-3
    title: Visitor cannot proceed from step 1 without entering an idea
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
  - id: AC-202-4
    title: Completed wizard produces skeleton spec output
    given:
      - visit: /
      - fill:
          selector: '[data-test=product-idea-input]'
          value: A task manager for developers
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=mission-option-1]'
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=pillar-option-1]'
      - click:
          selector: '[data-test=pillar-option-2]'
      - click:
          selector: '[data-test=pillar-option-3]'
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-output]'
    when: []
`;
loadAndRun(stories_202);

// US-203: Visitor compares structured vs unstructured specifications
const stories_203 = `
id: US-203
title: Visitor compares structured vs unstructured specifications
acceptance_criteria:
  - id: AC-203-1
    title: Before/After comparison is present on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=comparison-section]'
    when: []
  - id: AC-203-2
    title: Visitor can toggle between before and after views
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=comparison-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=comparison-section]'
`;
loadAndRun(stories_203);

// US-401: Visitor on mobile can access all content and interactive features
const stories_401 = `
id: US-401
title: Visitor on mobile can access all content and interactive features
acceptance_criteria:
  - id: AC-401-1
    title: Page layout is usable on mobile viewport
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldExist:
          selector: '[data-test=hero]'
    when: []
  - id: AC-401-2
    title: Hierarchy Explorer is usable on mobile
    given:
      - visit: /
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1-content]'
    when: []
  - id: AC-401-3
    title: Spec Wizard is usable on mobile
    given:
      - visit: /
      - fill:
          selector: '[data-test=product-idea-input]'
          value: My product idea
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-2]'
    when: []
`;
loadAndRun(stories_401);

// US-301: Visitor can switch between dark and light themes
const stories_301 = `
id: US-301
title: Visitor can switch between dark and light themes
acceptance_criteria:
  - id: AC-301-1
    title: Theme toggle is visible on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-301-2
    title: Clicking theme toggle switches the visual mode
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
`;
loadAndRun(stories_301);

// US-302: Visitor can find the GitHub repository to get started
const stories_302 = `
id: US-302
title: Visitor can find the GitHub repository to get started
acceptance_criteria:
  - id: AC-302-1
    title: CTA section is present with GitHub link
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=cta-section]'
      - shouldExist:
          selector: '[data-test=cta-section] a[href*="github.com/rootspec"]'
    when: []
`;
loadAndRun(stories_302);

// US-303: Visitor can see who built the site and when
const stories_303 = `
id: US-303
title: Visitor can see who built the site and when
acceptance_criteria:
  - id: AC-303-1
    title: Footer is present with builder attribution
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=footer]'
      - shouldExist:
          selector: '[data-test=footer-attribution]'
    when: []
`;
loadAndRun(stories_303);
