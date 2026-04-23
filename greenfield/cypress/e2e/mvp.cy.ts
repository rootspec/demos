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

// US-101: Visitor sees the demo context banner before any other content
const stories_101 = `
id: US-101
title: Visitor sees the demo context banner before any other content
acceptance_criteria:
  - id: AC-101-1
    title: Meta banner is visible above the fold on load
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-101-2
    title: Meta banner contains a link to the SEED.md file
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner] a[href*="SEED.md"]'
    when: []
  - id: AC-101-3
    title: Meta banner contains a link to the spec directory
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner] a[href*="rootspec"]'
    when: []
`;
loadAndRun(stories_101);

// US-102: Visitor sees the tagline and version badge in the hero
const stories_102 = `
id: US-102
title: Visitor sees the tagline and version badge in the hero
acceptance_criteria:
  - id: AC-102-1
    title: Hero section is visible with a heading and tagline
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=hero]'
      - shouldExist:
          selector: '[data-test=hero-heading]'
    when: []
  - id: AC-102-2
    title: Version badge is displayed in the hero
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
`;
loadAndRun(stories_102);

// US-103: Visitor can scroll through all content sections
const stories_103 = `
id: US-103
title: Visitor can scroll through all content sections
acceptance_criteria:
  - id: AC-103-1
    title: Problem section is present
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=problem-section]'
    when: []
  - id: AC-103-2
    title: How It Works section is present
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=how-it-works]'
    when: []
  - id: AC-103-3
    title: CTA section with GitHub link is present
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=cta-section]'
      - shouldExist:
          selector: '[data-test=cta-section] a[href*="github.com"]'
    when: []
  - id: AC-103-4
    title: Footer with attribution is present
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=footer]'
    when: []
`;
loadAndRun(stories_103);

// US-201: Visitor expands a hierarchy level to see example content
const stories_201 = `
id: US-201
title: Visitor expands a hierarchy level to see example content
acceptance_criteria:
  - id: AC-201-1
    title: Clicking a level card expands it to show example content
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
  - id: AC-201-2
    title: Clicking an expanded level collapses it
    given:
      - visit: /demos/greenfield/
      - click:
          selector: '[data-test=hierarchy-level-1]'
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1][aria-expanded="false"]'
  - id: AC-201-3
    title: Only one level is expanded at a time
    given:
      - visit: /demos/greenfield/
      - click:
          selector: '[data-test=hierarchy-level-1]'
    when:
      - click:
          selector: '[data-test=hierarchy-level-2]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1][aria-expanded="false"]'
      - shouldExist:
          selector: '[data-test=hierarchy-level-2][aria-expanded="true"]'
`;
loadAndRun(stories_201);

// US-202: Visitor navigates the hierarchy explorer using the keyboard
const stories_202 = `
id: US-202
title: Visitor navigates the hierarchy explorer using the keyboard
acceptance_criteria:
  - id: AC-202-1
    title: Hierarchy level cards are keyboard focusable
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=hierarchy-explorer]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1]:focus, [data-test=hierarchy-level-1] [tabindex="0"]'
`;
loadAndRun(stories_202);

// US-203: Visitor completes the spec wizard and sees skeleton spec output
const stories_203 = `
id: US-203
title: Visitor completes the spec wizard and sees skeleton spec output
acceptance_criteria:
  - id: AC-203-1
    title: Wizard is visible on the page
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
    when: []
  - id: AC-203-2
    title: Next button is disabled when idea field is empty
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
      - shouldExist:
          selector: '[data-test=wizard-next][disabled]'
    when: []
  - id: AC-203-3
    title: Visitor can advance through all wizard steps
    given:
      - visit: /demos/greenfield/
    when:
      - fill:
          selector: '[data-test=wizard-idea-input]'
          value: A task manager for remote teams
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=wizard-mission-option]:first-child'
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=wizard-pillar-chip]:nth-child(1)'
      - click:
          selector: '[data-test=wizard-pillar-chip]:nth-child(2)'
      - click:
          selector: '[data-test=wizard-pillar-chip]:nth-child(3)'
      - click:
          selector: '[data-test=wizard-next]'
      - fill:
          selector: '[data-test=wizard-interaction-input]'
          value: User creates a task and assigns it to a teammate
      - click:
          selector: '[data-test=wizard-generate]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-output]'
  - id: AC-203-4
    title: Visitor can go back and change an answer
    given:
      - visit: /demos/greenfield/
      - fill:
          selector: '[data-test=wizard-idea-input]'
          value: A recipe app
      - click:
          selector: '[data-test=wizard-next]'
    when:
      - click:
          selector: '[data-test=wizard-back]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
      - shouldContain:
          selector: '[data-test=wizard-idea-input]'
          text: A recipe app
`;
loadAndRun(stories_203);

// US-204: Visitor views the before/after comparison of specs
const stories_204 = `
id: US-204
title: Visitor views the before/after comparison of specs
acceptance_criteria:
  - id: AC-204-1
    title: Comparison section is present with both panels
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=comparison-section]'
    when: []
`;
loadAndRun(stories_204);

// US-401: Visitor on a mobile device sees a usable layout
const stories_401 = `
id: US-401
title: Visitor on a mobile device sees a usable layout
acceptance_criteria:
  - id: AC-401-1
    title: Page renders without horizontal scrolling on mobile viewport
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldExist:
          selector: '[data-test=hero]'
    when: []
  - id: AC-401-2
    title: Hierarchy explorer is usable on mobile
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level-1][aria-expanded="true"]'
  - id: AC-401-3
    title: Spec wizard is usable on mobile
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
      - shouldExist:
          selector: '[data-test=wizard-idea-input]'
    when: []
`;
loadAndRun(stories_401);

// US-301: Visitor toggles between light and dark mode
const stories_301 = `
id: US-301
title: Visitor toggles between light and dark mode
acceptance_criteria:
  - id: AC-301-1
    title: Page loads in light mode by default
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: html[data-theme="light"], body[data-theme="light"], :root[data-theme="light"]
    when: []
  - id: AC-301-2
    title: Theme toggle button is visible in the header
    given:
      - visit: /demos/greenfield/
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-301-3
    title: Clicking the toggle switches to dark mode
    given:
      - visit: /demos/greenfield/
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: html[data-theme="dark"], body[data-theme="dark"]
  - id: AC-301-4
    title: Clicking the toggle again switches back to light mode
    given:
      - visit: /demos/greenfield/
      - click:
          selector: '[data-test=theme-toggle]'
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: html[data-theme="light"], body[data-theme="light"]
`;
loadAndRun(stories_301);
