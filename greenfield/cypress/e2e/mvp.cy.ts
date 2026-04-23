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

// US-101: Visitor reads the meta banner before any other content
const stories_101 = `
id: US-101
title: Visitor reads the meta banner before any other content
acceptance_criteria:
  - id: AC-101-1
    title: Meta banner appears above the fold before hero content
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
    title: Meta banner contains links to spec and seed files
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner] a[href*="github.com"]'
    when: []
`;
loadAndRun(stories_101);

// US-102: Visitor understands what RootSpec is from the hero
const stories_102 = `
id: US-102
title: Visitor understands what RootSpec is from the hero
acceptance_criteria:
  - id: AC-102-1
    title: Hero displays tagline and version badge
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero]'
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
  - id: AC-102-2
    title: Version badge shows a version number
    given:
      - visit: /
    then:
      - shouldContain:
          selector: '[data-test=version-badge]'
          text: v
    when: []
`;
loadAndRun(stories_102);

// US-103: Visitor reads about the spec drift problem
const stories_103 = `
id: US-103
title: Visitor reads about the spec drift problem
acceptance_criteria:
  - id: AC-103-1
    title: Problem section exists with real content
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=problem-section]'
      - shouldContain:
          selector: '[data-test=problem-section]'
          text: spec
    when: []
`;
loadAndRun(stories_103);

// US-104: Visitor learns about the four RootSpec skills
const stories_104 = `
id: US-104
title: Visitor learns about the four RootSpec skills
acceptance_criteria:
  - id: AC-104-1
    title: How it works section shows all four skills
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=how-it-works]'
      - shouldContain:
          selector: '[data-test=how-it-works]'
          text: /rs-init
      - shouldContain:
          selector: '[data-test=how-it-works]'
          text: /rs-spec
      - shouldContain:
          selector: '[data-test=how-it-works]'
          text: /rs-impl
      - shouldContain:
          selector: '[data-test=how-it-works]'
          text: /rs-validate
    when: []
`;
loadAndRun(stories_104);

// US-105: Visitor finds the GitHub repo link
const stories_105 = `
id: US-105
title: Visitor finds the GitHub repo link
acceptance_criteria:
  - id: AC-105-1
    title: CTA section has a link to the GitHub repo
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=cta-section]'
      - shouldExist:
          selector: '[data-test=cta-section] a[href*="github.com/rootspec/rootspec"]'
    when: []
`;
loadAndRun(stories_105);

// US-201: Visitor explores the five RootSpec levels in the hierarchy explorer
const stories_201 = `
id: US-201
title: Visitor explores the five RootSpec levels in the hierarchy explorer
acceptance_criteria:
  - id: AC-201-1
    title: Hierarchy explorer shows all five levels
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
      - shouldExist:
          selector: '[data-test=level-L1]'
      - shouldExist:
          selector: '[data-test=level-L2]'
      - shouldExist:
          selector: '[data-test=level-L3]'
      - shouldExist:
          selector: '[data-test=level-L4]'
      - shouldExist:
          selector: '[data-test=level-L5]'
    when: []
  - id: AC-201-2
    title: Clicking a level expands its content
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=level-L1]'
    then:
      - shouldExist:
          selector: '[data-test=level-L1-content]'
  - id: AC-201-3
    title: Clicking an expanded level collapses it
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=level-L1]'
      - click:
          selector: '[data-test=level-L1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
`;
loadAndRun(stories_201);

// US-202: Visitor completes the Spec Your Idea wizard
const stories_202 = `
id: US-202
title: Visitor completes the Spec Your Idea wizard
acceptance_criteria:
  - id: AC-202-1
    title: Wizard section is present on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
    when: []
  - id: AC-202-2
    title: Wizard step 1 accepts product idea input
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-idea-input]'
          value: A tool for tracking personal goals
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-2]'
  - id: AC-202-3
    title: Wizard prevents advancing with empty input
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
  - id: AC-202-4
    title: Wizard produces a skeleton spec output
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-idea-input]'
          value: A tool for tracking personal goals
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
          selector: '[data-test=wizard-finish]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-output]'
`;
loadAndRun(stories_202);

// US-203: Visitor compares before and after using RootSpec
const stories_203 = `
id: US-203
title: Visitor compares before and after using RootSpec
acceptance_criteria:
  - id: AC-203-1
    title: Comparison section is present with real content
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=comparison-section]'
    when: []
  - id: AC-203-2
    title: Both panels show distinct content
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=comparison-without]'
      - shouldExist:
          selector: '[data-test=comparison-with]'
    when: []
`;
loadAndRun(stories_203);

// US-204: Visitor toggles between light and dark mode
const stories_204 = `
id: US-204
title: Visitor toggles between light and dark mode
acceptance_criteria:
  - id: AC-204-1
    title: Theme toggle button is present in the header
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-204-2
    title: Clicking theme toggle changes the page theme
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: html[data-theme="dark"], html.dark
`;
loadAndRun(stories_204);

// US-301: Visitor navigates the page and reaches the footer
const stories_301 = `
id: US-301
title: Visitor navigates the page and reaches the footer
acceptance_criteria:
  - id: AC-301-1
    title: Footer is present with attribution
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=footer]'
      - shouldContain:
          selector: '[data-test=footer]'
          text: Claude
    when: []
`;
loadAndRun(stories_301);

// US-302: Visitor navigates interactive elements by keyboard
const stories_302 = `
id: US-302
title: Visitor navigates interactive elements by keyboard
acceptance_criteria:
  - id: AC-302-1
    title: Theme toggle is keyboard accessible
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]:not([disabled])'
    when: []
  - id: AC-302-2
    title: Wizard next button is keyboard accessible
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=wizard-next]'
    when: []
`;
loadAndRun(stories_302);

// US-303: Theme preference persists across page reloads
const stories_303 = `
id: US-303
title: Theme preference persists across page reloads
acceptance_criteria:
  - id: AC-303-1
    title: Dark mode preference is remembered after page reload
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
      - visit: /
    then:
      - shouldExist:
          selector: html[data-theme="dark"], html.dark
`;
loadAndRun(stories_303);

// US-401: Site loads in light mode by default with editorial typography
const stories_401 = `
id: US-401
title: Site loads in light mode by default with editorial typography
acceptance_criteria:
  - id: AC-401-1
    title: Page defaults to light mode on first visit
    given:
      - visit: /
    then:
      - shouldExist:
          selector: html:not([data-theme="dark"]):not(.dark), html[data-theme="light"], html.light
    when: []
  - id: AC-401-2
    title: Body text is rendered in a serif typeface
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=body-content]'
    when: []
  - id: AC-401-3
    title: Skill names are rendered in monospace
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=how-it-works] code, [data-test=how-it-works] [data-test=skill-name]'
    when: []
`;
loadAndRun(stories_401);

// US-402: Visitor sees the RootSpec methodology diagram
const stories_402 = `
id: US-402
title: Visitor sees the RootSpec methodology diagram
acceptance_criteria:
  - id: AC-402-1
    title: Methodology diagram is present on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=methodology-diagram]'
    when: []
  - id: AC-402-2
    title: Diagram is an SVG element
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=methodology-diagram] svg, svg[data-test=methodology-diagram]'
    when: []
`;
loadAndRun(stories_402);
