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

// US-001: View RootSpec marketing site with clear purpose
const stories_001 = `
id: US-001
title: View RootSpec marketing site with clear purpose
acceptance_criteria:
  - id: AC-001-1
    title: Meta banner explains demo nature
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldContain:
          selector: '[data-test=meta-banner]'
          text: generated from a ~100-line product description
    when: []
  - id: AC-001-2
    title: Hero section communicates value proposition
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero-tagline]'
      - shouldContain:
          selector: '[data-test=hero-tagline]'
          text: philosophy guides implementation
    when: []
  - id: AC-001-3
    title: Version information is prominently displayed
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
loadAndRun(stories_001);

// US-002: Understand the problem RootSpec solves
const stories_002 = `
id: US-002
title: Understand the problem RootSpec solves
acceptance_criteria:
  - id: AC-002-1
    title: Problem section identifies specification issues
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=problem-section]'
    then:
      - shouldExist:
          selector: '[data-test=problem-content]'
      - shouldContain:
          selector: '[data-test=problem-content]'
          text: spec drift
  - id: AC-002-2
    title: Solution overview explains methodology
    given:
      - visit: /
      - click:
          selector: '[data-test=problem-section]'
    when:
      - click:
          selector: '[data-test=solution-section]'
    then:
      - shouldExist:
          selector: '[data-test=solution-content]'
      - shouldContain:
          selector: '[data-test=solution-content]'
          text: init → spec → impl → validate
`;
loadAndRun(stories_002);

// US-003: Switch between dark and light themes
const stories_003 = `
id: US-003
title: Switch between dark and light themes
acceptance_criteria:
  - id: AC-003-1
    title: Theme toggle is accessible
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-003-2
    title: Manual theme switching works
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=dark-theme-indicator]'
  - id: AC-003-3
    title: Theme preference persists across sessions
    given:
      - visit: /
      - click:
          selector: '[data-test=theme-toggle]'
    when:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=dark-theme-indicator]'
`;
loadAndRun(stories_003);

// US-004: Access GitHub repository and documentation
const stories_004 = `
id: US-004
title: Access GitHub repository and documentation
acceptance_criteria:
  - id: AC-004-1
    title: GitHub links are prominently displayed
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=github-link]'
      - shouldContain:
          selector: '[data-test=github-link]'
          text: GitHub
    when: []
  - id: AC-004-2
    title: SEED.md link is accessible from meta banner
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=seed-link]'
    then:
      - shouldExist:
          selector: '[data-test=external-link-indicator]'
  - id: AC-004-3
    title: Spec files link is accessible from meta banner
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=spec-link]'
    then:
      - shouldExist:
          selector: '[data-test=external-link-indicator]'
`;
loadAndRun(stories_004);

// US-101: Explore RootSpec hierarchy interactively
const stories_101 = `
id: US-101
title: Explore RootSpec hierarchy interactively
acceptance_criteria:
  - id: AC-101-1
    title: Hierarchy explorer is visible and accessible
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-explorer]'
    then:
      - shouldExist:
          selector: '[data-test=level-1]'
      - shouldExist:
          selector: '[data-test=level-2]'
      - shouldExist:
          selector: '[data-test=level-3]'
      - shouldExist:
          selector: '[data-test=level-4]'
      - shouldExist:
          selector: '[data-test=level-5]'
  - id: AC-101-2
    title: Level selection reveals content and connections
    given:
      - visit: /
      - click:
          selector: '[data-test=hierarchy-explorer]'
    when:
      - click:
          selector: '[data-test=level-1]'
    then:
      - shouldExist:
          selector: '[data-test=level-1-content]'
      - shouldContain:
          selector: '[data-test=level-1-content]'
          text: Philosophy
  - id: AC-101-3
    title: Reference highlighting shows permitted connections
    given:
      - visit: /
      - click:
          selector: '[data-test=hierarchy-explorer]'
      - click:
          selector: '[data-test=level-3]'
    then:
      - shouldExist:
          selector: '[data-test=reference-highlight]'
    when: []
  - id: AC-101-4
    title: Keyboard navigation works through hierarchy
    given:
      - visit: /
      - click:
          selector: '[data-test=hierarchy-explorer]'
    when:
      - click:
          selector: '[data-test=level-2]'
    then:
      - shouldExist:
          selector: '[data-test=level-2-content]'
`;
loadAndRun(stories_101);

// US-102: Complete Spec Your Idea wizard
const stories_102 = `
id: US-102
title: Complete Spec Your Idea wizard
acceptance_criteria:
  - id: AC-102-1
    title: Wizard is accessible and starts properly
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=spec-wizard]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
      - shouldContain:
          selector: '[data-test=wizard-step-1]'
          text: mission
  - id: AC-102-2
    title: Mission selection step works
    given:
      - visit: /
      - click:
          selector: '[data-test=spec-wizard]'
    when:
      - click:
          selector: '[data-test=mission-template]'
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-2]'
      - shouldContain:
          selector: '[data-test=wizard-step-2]'
          text: design pillars
  - id: AC-102-3
    title: Design pillars selection works
    given:
      - visit: /
      - click:
          selector: '[data-test=spec-wizard]'
      - click:
          selector: '[data-test=mission-template]'
      - click:
          selector: '[data-test=wizard-next]'
    when:
      - click:
          selector: '[data-test=pillar-suggestion]'
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-3]'
      - shouldContain:
          selector: '[data-test=wizard-step-3]'
          text: interaction
  - id: AC-102-4
    title: Wizard completion generates skeleton spec
    given:
      - visit: /
      - click:
          selector: '[data-test=spec-wizard]'
      - click:
          selector: '[data-test=mission-template]'
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=pillar-suggestion]'
      - click:
          selector: '[data-test=wizard-next]'
    when:
      - fill:
          selector: '[data-test=interaction-input]'
          value: User clicks button to see results
      - click:
          selector: '[data-test=wizard-complete]'
    then:
      - shouldExist:
          selector: '[data-test=generated-spec]'
      - shouldContain:
          selector: '[data-test=generated-spec]'
          text: L1
  - id: AC-102-5
    title: Wizard validation prevents incomplete submission
    given:
      - visit: /
      - click:
          selector: '[data-test=spec-wizard]'
    when:
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=validation-message]'
`;
loadAndRun(stories_102);

// US-103: Compare traditional vs RootSpec approaches
const stories_103 = `
id: US-103
title: Compare traditional vs RootSpec approaches
acceptance_criteria:
  - id: AC-103-1
    title: Comparison interface is accessible
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=comparison-section]'
    then:
      - shouldExist:
          selector: '[data-test=comparison-toggle]'
  - id: AC-103-2
    title: Toggle between before and after views
    given:
      - visit: /
      - click:
          selector: '[data-test=comparison-section]'
    when:
      - click:
          selector: '[data-test=comparison-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=rootspec-approach]'
      - shouldContain:
          selector: '[data-test=rootspec-approach]'
          text: structured hierarchy
  - id: AC-103-3
    title: Comparison content is substantive, not placeholder
    given:
      - visit: /
      - click:
          selector: '[data-test=comparison-section]'
    then:
      - shouldExist:
          selector: '[data-test=traditional-approach]'
      - shouldContain:
          selector: '[data-test=traditional-approach]'
          text: requirements
    when: []
`;
loadAndRun(stories_103);

// US-201: Use site effectively on mobile devices
const stories_201 = `
id: US-201
title: Use site effectively on mobile devices
acceptance_criteria:
  - id: AC-201-1
    title: Mobile layout is readable and functional
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=mobile-layout]'
      - shouldExist:
          selector: '[data-test=hero-tagline]'
    when: []
  - id: AC-201-2
    title: Interactive features work on touch devices
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-explorer]'
      - click:
          selector: '[data-test=level-1]'
    then:
      - shouldExist:
          selector: '[data-test=level-1-content]'
  - id: AC-201-3
    title: Wizard is usable on mobile
    given:
      - visit: /
      - click:
          selector: '[data-test=spec-wizard]'
    when:
      - click:
          selector: '[data-test=mission-template]'
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-2]'
`;
loadAndRun(stories_201);

// US-202: Navigate site using only keyboard
const stories_202 = `
id: US-202
title: Navigate site using only keyboard
acceptance_criteria:
  - id: AC-202-1
    title: All interactive elements are keyboard accessible
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
      - shouldExist:
          selector: '[data-test=spec-wizard]'
    when: []
  - id: AC-202-2
    title: Focus indicators are clearly visible
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=focus-indicator]'
  - id: AC-202-3
    title: Skip links provide efficient navigation
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=skip-link]'
    when: []
`;
loadAndRun(stories_202);

// US-203: Access site with assistive technologies
const stories_203 = `
id: US-203
title: Access site with assistive technologies
acceptance_criteria:
  - id: AC-203-1
    title: Screen reader users understand page structure
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=main-heading]'
      - shouldExist:
          selector: '[data-test=navigation-landmark]'
    when: []
  - id: AC-203-2
    title: Interactive elements have descriptive labels
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
    when: []
  - id: AC-203-3
    title: Form controls in wizard are properly labeled
    given:
      - visit: /
      - click:
          selector: '[data-test=spec-wizard]'
    then:
      - shouldExist:
          selector: '[data-test=form-label]'
    when: []
`;
loadAndRun(stories_203);

// US-204: Respect user accessibility preferences
const stories_204 = `
id: US-204
title: Respect user accessibility preferences
acceptance_criteria:
  - id: AC-204-1
    title: Reduced motion preference is respected
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-explorer]'
      - click:
          selector: '[data-test=level-1]'
    then:
      - shouldExist:
          selector: '[data-test=reduced-motion-indicator]'
  - id: AC-204-2
    title: High contrast mode works with themes
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=high-contrast-indicator]'
  - id: AC-204-3
    title: Text remains readable at increased sizes
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=scalable-text]'
      - shouldContain:
          selector: '[data-test=hero-tagline]'
          text: philosophy
    when: []
`;
loadAndRun(stories_204);
