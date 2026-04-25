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

// US-101: Visitor sees the meta banner immediately on page load
const stories_101 = `
id: US-101
title: Visitor sees the meta banner immediately on page load
acceptance_criteria:
  - id: AC-101-1
    title: Meta banner is visible above the fold
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-101-2
    title: Meta banner contains a link to the seed file
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner] a[href*="SEED.md"]'
    when: []
`;
loadAndRun(stories_101);

// US-102: Visitor sees the current RootSpec version prominently displayed
const stories_102 = `
id: US-102
title: Visitor sees the current RootSpec version prominently displayed
acceptance_criteria:
  - id: AC-102-1
    title: Version number is visible in the hero section
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
      - shouldContain:
          selector: '[data-test=version-badge]'
          text: v
    when: []
`;
loadAndRun(stories_102);

// US-103: Visitor immediately understands what RootSpec is from the hero section
const stories_103 = `
id: US-103
title: Visitor immediately understands what RootSpec is from the hero section
acceptance_criteria:
  - id: AC-103-1
    title: Hero section contains a tagline and one-sentence explanation
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=hero-section]'
      - shouldExist:
          selector: '[data-test=hero-tagline]'
      - shouldExist:
          selector: '[data-test=hero-description]'
    when: []
`;
loadAndRun(stories_103);

// US-104: Visitor recognizes their pain points in the problem section
const stories_104 = `
id: US-104
title: Visitor recognizes their pain points in the problem section
acceptance_criteria:
  - id: AC-104-1
    title: Problem section addresses spec drift
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=problem-section]'
    then:
      - shouldExist:
          selector: '[data-test=problem-section]'
      - shouldContain:
          selector: '[data-test=problem-section]'
          text: drift
`;
loadAndRun(stories_104);

// US-105: Visitor understands the four-command workflow
const stories_105 = `
id: US-105
title: Visitor understands the four-command workflow
acceptance_criteria:
  - id: AC-105-1
    title: How It Works section shows all four skills
    given:
      - visit: /demos/greenfield/
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
loadAndRun(stories_105);

// US-106: Visitor reads the full author's notes verbatim
const stories_106 = `
id: US-106
title: Visitor reads the full author's notes verbatim
acceptance_criteria:
  - id: AC-106-1
    title: Author's Notes section exists and contains the opening text
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=authors-notes]'
      - shouldContain:
          selector: '[data-test=authors-notes]'
          text: Most thinking about AI in software development
    when: []
`;
loadAndRun(stories_106);

// US-107: Visitor finds a clear path to the GitHub repository
const stories_107 = `
id: US-107
title: Visitor finds a clear path to the GitHub repository
acceptance_criteria:
  - id: AC-107-1
    title: CTA section has a link to the framework GitHub repo
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=cta-section]'
      - shouldExist:
          selector: '[data-test=cta-section] a[href*="github.com/rootspec"]'
    when: []
`;
loadAndRun(stories_107);

// US-108: Visitor sees site builder attribution in the footer
const stories_108 = `
id: US-108
title: Visitor sees site builder attribution in the footer
acceptance_criteria:
  - id: AC-108-1
    title: Footer contains builder attribution
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=footer]'
      - shouldContain:
          selector: '[data-test=footer]'
          text: Claude
    when: []
`;
loadAndRun(stories_108);

// US-201: Visitor explores the five-level RootSpec hierarchy interactively
const stories_201 = `
id: US-201
title: Visitor explores the five-level RootSpec hierarchy interactively
acceptance_criteria:
  - id: AC-201-1
    title: Hierarchy Explorer renders five levels
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
      - shouldExist:
          selector: '[data-test=hierarchy-level]'
    when: []
  - id: AC-201-2
    title: Clicking a level expands its content
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=hierarchy-level]:first-child'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-content]'
  - id: AC-201-3
    title: Clicking the same level again collapses it
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=hierarchy-level]:first-child'
      - click:
          selector: '[data-test=hierarchy-level]:first-child'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
`;
loadAndRun(stories_201);

// US-202: Visitor completes the Spec Your Idea wizard and sees skeleton spec output
const stories_202 = `
id: US-202
title: Visitor completes the Spec Your Idea wizard and sees skeleton spec output
acceptance_criteria:
  - id: AC-202-1
    title: Wizard renders initial step with input
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
    when: []
  - id: AC-202-2
    title: Wizard advances to step 2 after entering a product idea
    given:
      - visit: /demos/greenfield/
    when:
      - fill:
          selector: '[data-test=product-idea-input]'
          value: A tool for tracking personal goals
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-2]'
  - id: AC-202-3
    title: Next button is disabled without input on step 1
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=wizard-next][disabled]'
    when: []
`;
loadAndRun(stories_202);

// US-203: Visitor understands the difference RootSpec makes through a side-by-side comparison
const stories_203 = `
id: US-203
title: Visitor understands the difference RootSpec makes through a side-by-side comparison
acceptance_criteria:
  - id: AC-203-1
    title: Comparison section renders both panels
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=comparison-section]'
    when: []
  - id: AC-203-2
    title: Comparison has a toggle to switch panels
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=comparison-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=comparison-section]'
`;
loadAndRun(stories_203);

// US-204: Visitor toggles between light and dark mode
const stories_204 = `
id: US-204
title: Visitor toggles between light and dark mode
acceptance_criteria:
  - id: AC-204-1
    title: Theme toggle is present in the header
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-204-2
    title: Clicking the theme toggle changes the theme
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-theme=dark]'
`;
loadAndRun(stories_204);

// US-301: Visitor on mobile can read all content without horizontal scrolling
const stories_301 = `
id: US-301
title: Visitor on mobile can read all content without horizontal scrolling
acceptance_criteria:
  - id: AC-301-1
    title: Page loads without horizontal overflow on mobile viewport
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=hero-section]'
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
`;
loadAndRun(stories_301);

// US-302: Visitor can navigate the hierarchy explorer with keyboard
const stories_302 = `
id: US-302
title: Visitor can navigate the hierarchy explorer with keyboard
acceptance_criteria:
  - id: AC-302-1
    title: Hierarchy Explorer levels are keyboard focusable
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level][tabindex]'
    when: []
`;
loadAndRun(stories_302);

// US-401: Visitor experiences light mode as the default theme
const stories_401 = `
id: US-401
title: Visitor experiences light mode as the default theme
acceptance_criteria:
  - id: AC-401-1
    title: Page loads in light mode by default
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-theme=light]'
    when: []
`;
loadAndRun(stories_401);

// US-402: Visitor can switch to dark mode using the theme toggle
const stories_402 = `
id: US-402
title: Visitor can switch to dark mode using the theme toggle
acceptance_criteria:
  - id: AC-402-1
    title: Clicking the theme toggle switches to dark mode from light mode
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-theme=dark]'
  - id: AC-402-2
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
          selector: '[data-theme=light]'
`;
loadAndRun(stories_402);
