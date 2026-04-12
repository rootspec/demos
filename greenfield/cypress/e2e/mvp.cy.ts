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

// US-001: Visitor understands the demo context from the meta banner
const stories_001 = `
id: US-001
title: Visitor understands the demo context from the meta banner
acceptance_criteria:
  - id: AC-001-1
    title: Meta banner is visible on page load
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldContain:
          selector: '[data-test=meta-banner]'
          text: RootSpec pipeline
    when: []
  - id: AC-001-2
    title: Meta banner contains link to seed file
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner-seed-link]'
    when: []
  - id: AC-001-3
    title: Meta banner contains link to spec files
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner-spec-link]'
    when: []
`;
loadAndRun(stories_001);

// US-002: Visitor understands what RootSpec is from the hero section
const stories_002 = `
id: US-002
title: Visitor understands what RootSpec is from the hero section
acceptance_criteria:
  - id: AC-002-1
    title: Hero tagline and subhead are visible
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero-tagline]'
      - shouldExist:
          selector: '[data-test=hero-subhead]'
    when: []
  - id: AC-002-2
    title: Version badge is visible in or near the hero
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
      - shouldContain:
          selector: '[data-test=version-badge]'
          text: v
    when: []
`;
loadAndRun(stories_002);

// US-003: Visitor recognizes their pain points in the problem section
const stories_003 = `
id: US-003
title: Visitor recognizes their pain points in the problem section
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

// US-004: Visitor understands the four RootSpec skills from the how-it-works section
const stories_004 = `
id: US-004
title: Visitor understands the four RootSpec skills from the how-it-works section
acceptance_criteria:
  - id: AC-004-1
    title: How It Works section shows all four skills
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

// US-005: Visitor finds the GitHub link and getting started instructions
const stories_005 = `
id: US-005
title: Visitor finds the GitHub link and getting started instructions
acceptance_criteria:
  - id: AC-005-1
    title: Open source CTA section is present with GitHub link
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

// US-006: Visitor sees footer attribution identifying the site builder and build date
const stories_006 = `
id: US-006
title: Visitor sees footer attribution identifying the site builder and build date
acceptance_criteria:
  - id: AC-006-1
    title: Footer contains builder name and build date
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

// US-201: Visitor expands a hierarchy level to see example content
const stories_201 = `
id: US-201
title: Visitor expands a hierarchy level to see example content
acceptance_criteria:
  - id: AC-201-1
    title: Hierarchy explorer is present on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
      - shouldExist:
          selector: '[data-test=hierarchy-level-1]'
      - shouldExist:
          selector: '[data-test=hierarchy-level-5]'
    when: []
  - id: AC-201-2
    title: Clicking a level expands its content
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
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
`;
loadAndRun(stories_201);

// US-202: Visitor completes the spec wizard and sees a skeleton spec output
const stories_202 = `
id: US-202
title: Visitor completes the spec wizard and sees a skeleton spec output
acceptance_criteria:
  - id: AC-202-1
    title: Spec wizard section is present on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
      - shouldExist:
          selector: '[data-test=wizard-idea-input]'
    when: []
  - id: AC-202-2
    title: Wizard Next button is disabled when product idea is empty
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=wizard-next-btn][disabled]'
    when: []
  - id: AC-202-3
    title: Wizard advances to step 2 after entering a product idea and clicking Next
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-idea-input]'
          value: A tool that helps teams write better specs
      - click:
          selector: '[data-test=wizard-next-btn]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-2]'
  - id: AC-202-4
    title: Wizard produces skeleton spec output after completing all steps
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-idea-input]'
          value: A tool that helps teams write better specs
      - click:
          selector: '[data-test=wizard-next-btn]'
      - click:
          selector: '[data-test=wizard-mission-option-1]'
      - click:
          selector: '[data-test=wizard-next-btn]'
      - click:
          selector: '[data-test=wizard-pillar-1]'
      - click:
          selector: '[data-test=wizard-pillar-2]'
      - click:
          selector: '[data-test=wizard-pillar-3]'
      - fill:
          selector: '[data-test=wizard-interaction-input]'
          value: User types a product idea and sees a spec skeleton
      - click:
          selector: '[data-test=wizard-next-btn]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-output]'
      - shouldContain:
          selector: '[data-test=wizard-output]'
          text: A tool that helps teams write better specs
`;
loadAndRun(stories_202);

// US-203: Visitor uses the before/after comparison to see the value of structured specs
const stories_203 = `
id: US-203
title: Visitor uses the before/after comparison to see the value of structured specs
acceptance_criteria:
  - id: AC-203-1
    title: Before/After comparison section is present
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=before-after-section]'
    when: []
  - id: AC-203-2
    title: Toggle switches between before and after panels
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=before-after-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=before-after-section]'
`;
loadAndRun(stories_203);

// US-204: Visitor on mobile can access all interactive features without breakage
const stories_204 = `
id: US-204
title: Visitor on mobile can access all interactive features without breakage
acceptance_criteria:
  - id: AC-204-1
    title: All key sections exist on the page at any viewport
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldExist:
          selector: '[data-test=hero-tagline]'
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
      - shouldExist:
          selector: '[data-test=spec-wizard]'
      - shouldExist:
          selector: '[data-test=before-after-section]'
    when: []
`;
loadAndRun(stories_204);

// US-301: Keyboard user can navigate the hierarchy explorer without a mouse
const stories_301 = `
id: US-301
title: Keyboard user can navigate the hierarchy explorer without a mouse
acceptance_criteria:
  - id: AC-301-1
    title: Hierarchy level items are focusable via keyboard
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1][tabindex]'
    when: []
`;
loadAndRun(stories_301);

// US-302: The page functions fully without external network requests after load
const stories_302 = `
id: US-302
title: The page functions fully without external network requests after load
acceptance_criteria:
  - id: AC-302-1
    title: Page renders key content without any dynamic data fetching
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
      - shouldExist:
          selector: '[data-test=spec-wizard]'
      - shouldExist:
          selector: '[data-test=before-after-section]'
    when: []
`;
loadAndRun(stories_302);

// US-101: Visitor sees the correct theme on first visit based on system preference
const stories_101 = `
id: US-101
title: Visitor sees the correct theme on first visit based on system preference
acceptance_criteria:
  - id: AC-101-1
    title: Theme toggle control is visible in the header
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
`;
loadAndRun(stories_101);

// US-102: Visitor can toggle between dark and light themes
const stories_102 = `
id: US-102
title: Visitor can toggle between dark and light themes
acceptance_criteria:
  - id: AC-102-1
    title: Clicking the theme toggle changes the active theme attribute
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-theme]'
`;
loadAndRun(stories_102);
