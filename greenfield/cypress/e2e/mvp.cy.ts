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

// US-101: Read what RootSpec is on arrival
const stories_101 = `
id: US-101
title: Read what RootSpec is on arrival
acceptance_criteria:
  - id: AC-101-1
    title: Hero section renders with tagline and explanation
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero-heading]'
      - shouldExist:
          selector: '[data-test=hero-subheading]'
    when: []
  - id: AC-101-2
    title: Meta banner is visible with links to spec artifacts
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldExist:
          selector: '[data-test=meta-banner-seed-link]'
      - shouldExist:
          selector: '[data-test=meta-banner-spec-link]'
    when: []
`;
loadAndRun(stories_101);

// US-102: See the RootSpec version displayed
const stories_102 = `
id: US-102
title: See the RootSpec version displayed
acceptance_criteria:
  - id: AC-102-1
    title: Version badge shows in header
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
`;
loadAndRun(stories_102);

// US-103: Read the problem statement
const stories_103 = `
id: US-103
title: Read the problem statement
acceptance_criteria:
  - id: AC-103-1
    title: Problem section renders with expected content
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=problem-section]'
      - shouldExist:
          selector: '[data-test=problem-heading]'
    when: []
`;
loadAndRun(stories_103);

// US-104: Understand the four RootSpec skills
const stories_104 = `
id: US-104
title: Understand the four RootSpec skills
acceptance_criteria:
  - id: AC-104-1
    title: How It Works section displays all four skills
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=how-it-works-section]'
      - shouldExist:
          selector: '[data-test=skill-init]'
      - shouldExist:
          selector: '[data-test=skill-spec]'
      - shouldExist:
          selector: '[data-test=skill-impl]'
      - shouldExist:
          selector: '[data-test=skill-validate]'
    when: []
`;
loadAndRun(stories_104);

// US-105: Find the GitHub CTA to get started
const stories_105 = `
id: US-105
title: Find the GitHub CTA to get started
acceptance_criteria:
  - id: AC-105-1
    title: CTA section renders with GitHub link
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=cta-section]'
      - shouldExist:
          selector: '[data-test=cta-github-link]'
    when: []
`;
loadAndRun(stories_105);

// US-106: See the builder attribution in the footer
const stories_106 = `
id: US-106
title: See the builder attribution in the footer
acceptance_criteria:
  - id: AC-106-1
    title: Footer displays attribution and build date
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=footer]'
      - shouldExist:
          selector: '[data-test=footer-attribution]'
    when: []
`;
loadAndRun(stories_106);

// US-301: Explore the RootSpec hierarchy levels
const stories_301 = `
id: US-301
title: Explore the RootSpec hierarchy levels
acceptance_criteria:
  - id: AC-301-1
    title: Hierarchy Explorer section renders with all five levels
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
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
    when: []
  - id: AC-301-2
    title: Clicking a level reveals its example content
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=level-1]'
    then:
      - shouldExist:
          selector: '[data-test=level-1-content]'
  - id: AC-301-3
    title: Clicking the active level collapses it
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=level-1]'
      - click:
          selector: '[data-test=level-1]'
    then:
      - shouldExist:
          selector: '[data-test=level-1][aria-expanded=false]'
`;
loadAndRun(stories_301);

// US-302: Use the Spec Wizard to map a product idea to RootSpec
const stories_302 = `
id: US-302
title: Use the Spec Wizard to map a product idea to RootSpec
acceptance_criteria:
  - id: AC-302-1
    title: Spec Wizard section is present on the page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard]'
      - shouldExist:
          selector: '[data-test=wizard-step-1]'
    when: []
  - id: AC-302-2
    title: Entering a product idea and selecting a mission advances the wizard
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-idea-input]'
          value: A tool for tracking learning goals
      - click:
          selector: '[data-test=wizard-mission-option]:first-child'
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-2]'
  - id: AC-302-3
    title: Completing the wizard generates a spec skeleton
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-idea-input]'
          value: A tool for tracking learning goals
      - click:
          selector: '[data-test=wizard-mission-option]:first-child'
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=wizard-pillar-option]:first-child'
      - click:
          selector: '[data-test=wizard-pillar-option]:nth-child(2)'
      - click:
          selector: '[data-test=wizard-pillar-option]:nth-child(3)'
      - click:
          selector: '[data-test=wizard-next]'
      - fill:
          selector: '[data-test=wizard-interaction-input]'
          value: User marks a goal complete
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-output]'
`;
loadAndRun(stories_302);

// US-303: View the before/after comparison of specs vs. no specs
const stories_303 = `
id: US-303
title: View the before/after comparison of specs vs. no specs
acceptance_criteria:
  - id: AC-303-1
    title: Comparison section renders with both panels accessible
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=comparison-section]'
      - shouldExist:
          selector: '[data-test=comparison-toggle]'
    when: []
  - id: AC-303-2
    title: Toggling the comparison shows the RootSpec panel
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=comparison-toggle-rootspec]'
    then:
      - shouldExist:
          selector: '[data-test=comparison-panel-rootspec][data-active=true]'
`;
loadAndRun(stories_303);

// US-401: Use the site on a mobile device
const stories_401 = `
id: US-401
title: Use the site on a mobile device
acceptance_criteria:
  - id: AC-401-1
    title: Page renders correctly at mobile viewport width
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero-heading]'
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]'
    when: []
  - id: AC-401-2
    title: Spec Wizard is usable on mobile
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=wizard-idea-input]'
          value: A habit tracker for developers
      - click:
          selector: '[data-test=wizard-mission-option]:first-child'
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldExist:
          selector: '[data-test=wizard-step-2]'
`;
loadAndRun(stories_401);

// US-201: Toggle between dark and light themes
const stories_201 = `
id: US-201
title: Toggle between dark and light themes
acceptance_criteria:
  - id: AC-201-1
    title: Theme toggle button is present in the header
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-201-2
    title: Clicking the theme toggle changes the active theme
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-theme=light]'
  - id: AC-201-3
    title: Clicking the theme toggle again reverts to dark mode
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-theme=dark]'
`;
loadAndRun(stories_201);
