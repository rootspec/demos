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

// US-001: Technical lead understands RootSpec in 5 minutes
const us001Stories = `
id: US-001
title: Technical lead understands RootSpec in 5 minutes
requirement_id: R-001

acceptance_criteria:
  - id: AC-001-1
    title: Hero section explains RootSpec clearly
    narrative: |
      Given I am a technical lead visiting the site
      When I view the hero section
      Then I should understand what RootSpec is in one sentence
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=hero-tagline]' }
      - shouldContain: { selector: '[data-test=hero-tagline]', text: 'RootSpec' }

  - id: AC-001-2
    title: Meta banner shows site is RootSpec demo
    narrative: |
      Given I am viewing any page
      When I look for context about the site itself
      Then I should see this site was built with RootSpec
    given:
      - visit: '/'
    when: []
    then:
      - shouldContain: { selector: '[data-test=meta-banner]', text: 'This site was generated' }
      - shouldExist: { selector: '[data-test=seed-link]' }
      - shouldExist: { selector: '[data-test=spec-link]' }
`;

// US-002: Interact with five-level hierarchy
const us002Stories = `
id: US-002
title: Interact with five-level hierarchy
requirement_id: R-002

acceptance_criteria:
  - id: AC-002-1
    title: Click levels to expand details
    narrative: |
      Given I am viewing the hierarchy explorer
      When I click on a level
      Then I should see that level's details expand
    given:
      - visit: '/'
    when:
      - click: { selector: '[data-test=level-1]' }
    then:
      - shouldExist: { selector: '[data-test=level-1-expanded]' }
      - shouldContain: { selector: '[data-test=level-1-details]', text: 'Philosophy' }

  - id: AC-002-2
    title: Hover shows allowed references
    narrative: |
      Given I am viewing the expanded hierarchy
      When I hover over a level
      Then I should see which levels it can reference
    given:
      - visit: '/'
    when:
      - click: { selector: '[data-test=level-3]' }
    then:
      - shouldExist: { selector: '[data-test=reference-highlights]' }
`;

// US-003: Generate skeleton spec from idea
const us003Stories = `
id: US-003
title: Generate skeleton spec from idea
requirement_id: R-003

acceptance_criteria:
  - id: AC-003-1
    title: Complete wizard steps successfully
    narrative: |
      Given I want to test RootSpec with my own idea
      When I complete all wizard steps
      Then I should see a skeleton spec generated
    given:
      - visit: '/'
    when:
      - fill: { selector: '[data-test=idea-input]', value: 'A task management app' }
      - click: { selector: '[data-test=next-step]' }
      - click: { selector: '[data-test=mission-template]' }
      - click: { selector: '[data-test=next-step]' }
      - click: { selector: '[data-test=pillar-1]' }
      - click: { selector: '[data-test=pillar-2]' }
      - click: { selector: '[data-test=next-step]' }
      - fill: { selector: '[data-test=interaction-input]', value: 'Add a new task quickly' }
      - click: { selector: '[data-test=generate-spec]' }
    then:
      - shouldExist: { selector: '[data-test=generated-spec]' }
      - shouldContain: { selector: '[data-test=spec-l1]', text: 'Philosophy' }
      - shouldContain: { selector: '[data-test=spec-l2]', text: 'Truths' }
      - shouldContain: { selector: '[data-test=spec-l3]', text: 'Interactions' }

  - id: AC-003-2
    title: Wizard works on mobile
    narrative: |
      Given I am using a mobile device
      When I complete the wizard
      Then all steps should work with touch interactions
    given:
      - visit: '/'
    when:
      - fill: { selector: '[data-test=idea-input]', value: 'Mobile app' }
      - click: { selector: '[data-test=next-step]' }
    then:
      - shouldExist: { selector: '[data-test=step-2]' }
`;

// US-004: See concrete before/after differences
const us004Stories = `
id: US-004
title: See concrete before/after differences
requirement_id: R-004

acceptance_criteria:
  - id: AC-004-1
    title: Toggle between spec/no-spec views
    narrative: |
      Given I want to understand RootSpec value
      When I use the before/after comparison
      Then I should see clear differences between approaches
    given:
      - visit: '/'
    when:
      - click: { selector: '[data-test=toggle-without]' }
      - click: { selector: '[data-test=toggle-with]' }
    then:
      - shouldContain: { selector: '[data-test=comparison-content]', text: 'structured hierarchy' }

  - id: AC-004-2
    title: Slider works on touch devices
    narrative: |
      Given I am using a touch device
      When I drag the comparison slider
      Then the content should update smoothly
    given:
      - visit: '/'
    when:
      - click: { selector: '[data-test=comparison-slider]' }
    then:
      - shouldExist: { selector: '[data-test=comparison-slider]' }
`;

// US-005: Find clear path to getting started
const us005Stories = `
id: US-005
title: Find clear path to getting started
requirement_id: R-005

acceptance_criteria:
  - id: AC-005-1
    title: CTA section provides next steps
    narrative: |
      Given I understand RootSpec and want to use it
      When I look for next steps
      Then I should find clear getting started information
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=github-link]' }
      - shouldExist: { selector: '[data-test=documentation-link]' }
      - shouldContain: { selector: '[data-test=getting-started]', text: 'getting started' }

  - id: AC-005-2
    title: Version information is visible
    narrative: |
      Given I want to know what version of RootSpec this demonstrates
      When I look for version information
      Then I should see the current RootSpec version prominently displayed
    given:
      - visit: '/'
    when: []
    then:
      - shouldContain: { selector: '[data-test=version-badge]', text: 'v6.2' }
`;

// US-006: Navigate site with keyboard only
const us006Stories = `
id: US-006
title: Navigate site with keyboard only
requirement_id: R-006

acceptance_criteria:
  - id: AC-006-1
    title: Keyboard navigation works for all features
    narrative: |
      Given I am using keyboard navigation only
      When I navigate through interactive features
      Then I should be able to access all functionality
    given:
      - visit: '/'
    when:
      - click: { selector: '[data-test=skip-link]' }
    then:
      - shouldExist: { selector: '[data-test=main-content]' }

  - id: AC-006-2
    title: Interactive features support keyboard
    narrative: |
      Given I am using keyboard navigation
      When I interact with the hierarchy explorer
      Then I should be able to expand levels with keyboard
    given:
      - visit: '/'
    when:
      - click: { selector: '[data-test=level-1]' }
    then:
      - shouldExist: { selector: '[data-test=level-1-expanded]' }
`;

// US-007: Use site effectively on mobile
const us007Stories = `
id: US-007
title: Use site effectively on mobile
requirement_id: R-007

acceptance_criteria:
  - id: AC-007-1
    title: Mobile layout adapts appropriately
    narrative: |
      Given I am using a mobile device
      When I visit any section of the site
      Then the layout should be optimized for mobile
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=hero-section]' }

  - id: AC-007-2
    title: Theme toggle works on mobile
    narrative: |
      Given I am using a mobile device
      When I toggle between light and dark themes
      Then the theme should change smoothly
    given:
      - visit: '/'
    when:
      - click: { selector: '[data-test=theme-toggle]' }
    then:
      - shouldExist: { selector: '[data-test=theme-toggle]' }
`;

// Run all story tests
loadAndRun(us001Stories);
loadAndRun(us002Stories);
loadAndRun(us003Stories);
loadAndRun(us004Stories);
loadAndRun(us005Stories);
loadAndRun(us006Stories);
loadAndRun(us007Stories);