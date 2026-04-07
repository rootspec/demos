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

// US-001: Meta Banner
const metaBannerStories = `
id: US-001
title: Understand this site is a RootSpec demo
requirement_id: R-001

acceptance_criteria:
  - id: AC-001-1
    title: Meta banner is visible and informative
    narrative: |
      Given I visit the RootSpec marketing site
      When I view the page
      Then I should see a prominent banner explaining this site is a RootSpec demo
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=meta-banner]' }
      - shouldContain: { selector: '[data-test=meta-banner]', text: 'generated from a ~100-line product description' }
      - shouldContain: { selector: '[data-test=meta-banner]', text: 'RootSpec pipeline' }

  - id: AC-001-2
    title: Banner links to spec and seed files
    narrative: |
      Given I can see the meta banner
      When I click the spec or seed links
      Then I should be taken to the GitHub repository files
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=view-spec-link]' }
      - shouldContain: { selector: '[data-test=view-spec-link]', text: 'RootSpec pipeline' }
`;

// US-002: Hero Section
const heroStories = `
id: US-002
title: Understand what RootSpec is immediately
requirement_id: R-002

acceptance_criteria:
  - id: AC-002-1
    title: Clear tagline and explanation
    narrative: |
      Given I visit the site
      When I read the hero section
      Then I should understand what RootSpec does in one sentence
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=hero-tagline]' }
      - shouldExist: { selector: '[data-test=hero-explanation]' }
      - shouldContain: { selector: '[data-test=hero-explanation]', text: 'philosophy guides implementation' }

  - id: AC-002-2
    title: Version badge is prominent
    narrative: |
      Given I am viewing the hero section
      When I look for version information
      Then I should see the current RootSpec version clearly displayed
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=version-badge]' }
      - shouldContain: { selector: '[data-test=version-badge]', text: 'v' }
`;

// US-003: Problem Section
const problemStories = `
id: US-003
title: Recognize specification pain points
requirement_id: R-003

acceptance_criteria:
  - id: AC-003-1
    title: Problem section explains current failures
    narrative: |
      Given I scroll to the problem section
      When I read about existing approaches
      Then I should see familiar pain points described
    given:
      - visit: '/'
    when: []
    then:
      - shouldContain: { selector: '[data-test=problem-section]', text: 'spec drift' }
      - shouldContain: { selector: '[data-test=problem-section]', text: 'philosophy-implementation gap' }
      - shouldContain: { selector: '[data-test=problem-section]', text: 'Google Docs specs nobody reads' }
`;

// US-004: How It Works
const howItWorksStories = `
id: US-004
title: See the four-skill workflow visually
requirement_id: R-004

acceptance_criteria:
  - id: AC-004-1
    title: Four skills are clearly presented
    narrative: |
      Given I reach the "How It Works" section
      When I view the workflow explanation
      Then I should see all four RootSpec skills with before/after context
    given:
      - visit: '/'
    when: []
    then:
      - shouldContain: { selector: '[data-test=how-it-works-section]', text: '/rs-init' }
      - shouldContain: { selector: '[data-test=how-it-works-section]', text: '/rs-spec' }
      - shouldContain: { selector: '[data-test=how-it-works-section]', text: '/rs-impl' }
      - shouldContain: { selector: '[data-test=how-it-works-section]', text: '/rs-validate' }
`;

// US-005: CTA Section
const ctaStories = `
id: US-005
title: Find getting started information easily
requirement_id: R-005

acceptance_criteria:
  - id: AC-005-1
    title: CTA section provides clear next steps
    narrative: |
      Given I want to try RootSpec
      When I look for getting started information
      Then I should find GitHub links and clear instructions
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=github-link]' }
      - shouldContain: { selector: '[data-test=cta-section]', text: 'getting started' }
      - shouldExist: { selector: '[data-test=community-links]' }
`;

// US-006: Footer
const footerStories = `
id: US-006
title: Know who built this site and when
requirement_id: R-006

acceptance_criteria:
  - id: AC-006-1
    title: Footer contains builder attribution and date
    narrative: |
      Given I scroll to the bottom of the site
      When I view the footer
      Then I should see the site builder's name and build date
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=attribution]' }
      - shouldContain: { selector: '[data-test=attribution]', text: '2026' }
      - shouldExist: { selector: '[data-test=builder-name]' }
`;

// US-101: Hierarchy Explorer
const hierarchyStories = `
id: US-101
title: Interact with the five-level hierarchy visualization
requirement_id: R-101

acceptance_criteria:
  - id: AC-101-1
    title: All five levels are clickable and expandable
    narrative: |
      Given I reach the hierarchy explorer section
      When I click on any of the five levels (L1-L5)
      Then I should see that level expand with example content
    given:
      - visit: '/'
    when:
      - click: { selector: '[data-test=level-1]' }
    then:
      - shouldExist: { selector: '[data-test=level-1-content]' }
      - shouldContain: { selector: '[data-test=level-1-content]', text: 'Philosophy' }

  - id: AC-101-2
    title: Visual connections show reference directions
    narrative: |
      Given I have expanded a level in the hierarchy explorer
      When I hover over any level
      Then I should see visual indicators showing which levels it can reference
    given:
      - visit: '/'
    when:
      - click: { selector: '[data-test=level-3]' }
    then:
      - shouldExist: { selector: '[data-test=level-3-content]' }

  - id: AC-101-3
    title: Multiple levels can be expanded simultaneously
    narrative: |
      Given I have one level expanded
      When I click on another level
      Then both levels should remain expanded
    given:
      - visit: '/'
      - click: { selector: '[data-test=level-1]' }
    when:
      - click: { selector: '[data-test=level-3]' }
    then:
      - shouldExist: { selector: '[data-test=level-1-content]' }
      - shouldExist: { selector: '[data-test=level-3-content]' }
`;

// US-102: Spec Wizard
const wizardStories = `
id: US-102
title: Create a sample spec for my own product idea
requirement_id: R-102

acceptance_criteria:
  - id: AC-102-1
    title: Wizard has three clear steps
    narrative: |
      Given I reach the spec wizard section
      When I start the wizard
      Then I should see three distinct steps with clear labels
    given:
      - visit: '/'
    when:
      - click: { selector: '[data-test=start-wizard]' }
    then:
      - shouldExist: { selector: '[data-test=wizard-step-1]' }
      - shouldContain: { selector: '[data-test=wizard-step-1]', text: 'mission' }
      - shouldExist: { selector: '[data-test=wizard-progress]' }

  - id: AC-102-2
    title: Step 1 captures product mission
    narrative: |
      Given I am in wizard step 1
      When I select or enter a mission statement
      Then I should see my input reflected and be able to proceed
    given:
      - visit: '/'
      - click: { selector: '[data-test=start-wizard]' }
    when:
      - click: { selector: '[data-test=mission-template-1]' }
      - click: { selector: '[data-test=next-step]' }
    then:
      - shouldExist: { selector: '[data-test=wizard-step-2]' }
      - shouldContain: { selector: '[data-test=wizard-step-2]', text: 'design pillars' }

  - id: AC-102-3
    title: Step 2 selects design pillars
    narrative: |
      Given I am in wizard step 2
      When I select 3-5 design pillars
      Then I should see my selections and be able to proceed
    given:
      - visit: '/'
      - click: { selector: '[data-test=start-wizard]' }
      - click: { selector: '[data-test=mission-template-1]' }
      - click: { selector: '[data-test=next-step]' }
      - click: { selector: '[data-test=pillar-option-1]' }
      - click: { selector: '[data-test=pillar-option-2]' }
      - click: { selector: '[data-test=pillar-option-3]' }
    when:
      - click: { selector: '[data-test=next-step]' }
    then:
      - shouldExist: { selector: '[data-test=wizard-step-3]' }
      - shouldContain: { selector: '[data-test=wizard-step-3]', text: 'key interaction' }

  - id: AC-102-4
    title: Step 3 describes key interaction and shows output
    narrative: |
      Given I am in wizard step 3
      When I describe a key interaction and complete the wizard
      Then I should see structured spec output mapping my input to L1-L3
    given:
      - visit: '/'
      - click: { selector: '[data-test=start-wizard]' }
      - click: { selector: '[data-test=mission-template-1]' }
      - click: { selector: '[data-test=next-step]' }
      - click: { selector: '[data-test=pillar-option-1]' }
      - click: { selector: '[data-test=pillar-option-2]' }
      - click: { selector: '[data-test=pillar-option-3]' }
      - click: { selector: '[data-test=next-step]' }
    when:
      - fill: { selector: '[data-test=interaction-input]', value: 'User uploads a photo and gets instant feedback' }
      - click: { selector: '[data-test=complete-wizard]' }
    then:
      - shouldExist: { selector: '[data-test=spec-output]' }
      - shouldContain: { selector: '[data-test=spec-output]', text: 'L1: Philosophy' }
      - shouldContain: { selector: '[data-test=spec-output]', text: 'L2: Truths' }
      - shouldContain: { selector: '[data-test=spec-output]', text: 'L3: Interactions' }
`;

// US-103: Comparison
const comparisonStories = `
id: US-103
title: See the difference between chaotic and structured specifications
requirement_id: R-103

acceptance_criteria:
  - id: AC-103-1
    title: Comparison shows both states with real content
    narrative: |
      Given I reach the before/after comparison section
      When I view the default state
      Then I should see side-by-side content showing structured vs unstructured approaches
    given:
      - visit: '/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=before-panel]' }
      - shouldExist: { selector: '[data-test=after-panel]' }
      - shouldContain: { selector: '[data-test=before-panel]', text: 'vague requirements' }
      - shouldContain: { selector: '[data-test=after-panel]', text: 'structured hierarchy' }

  - id: AC-103-2
    title: Slider or toggle controls the comparison
    narrative: |
      Given I can see the before/after comparison
      When I interact with the slider or toggle control
      Then I should see smooth transitions between the two states
    given:
      - visit: '/'
    when:
      - click: { selector: '[data-test=comparison-toggle]' }
    then:
      - shouldExist: { selector: '[data-test=comparison-section]' }
`;

loadAndRun(metaBannerStories);
loadAndRun(heroStories);
loadAndRun(problemStories);
loadAndRun(howItWorksStories);
loadAndRun(ctaStories);
loadAndRun(footerStories);
loadAndRun(hierarchyStories);
loadAndRun(wizardStories);
loadAndRun(comparisonStories);