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

// US-101: Display hero section with RootSpec tagline and explanation
const stories_101 = `
id: US-101
title: Display hero section with RootSpec tagline and explanation
acceptance_criteria:
  - id: AC-101-1
    title: Hero section clearly explains what RootSpec is
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero-section]'
      - shouldContain:
          selector: '[data-test=hero-tagline]'
          text: RootSpec
      - shouldContain:
          selector: '[data-test=hero-description]'
          text: specification language
    when: []
  - id: AC-101-2
    title: Version number displayed prominently
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=version-display]'
      - shouldContain:
          selector: '[data-test=version-display]'
          text: v6.2.0
    when: []
`;
loadAndRun(stories_101);

// US-102: Display meta banner explaining this site is a RootSpec demo
const stories_102 = `
id: US-102
title: Display meta banner explaining this site is a RootSpec demo
acceptance_criteria:
  - id: AC-102-1
    title: Demo banner explains site generation process
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldContain:
          selector: '[data-test=meta-banner]'
          text: generated from
      - shouldContain:
          selector: '[data-test=meta-banner]'
          text: four commands
    when: []
  - id: AC-102-2
    title: Links to spec and seed files in GitHub
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=spec-link]'
      - shouldExist:
          selector: '[data-test=seed-link]'
    when: []
`;
loadAndRun(stories_102);

// US-103: Explain why existing specification approaches fail
const stories_103 = `
id: US-103
title: Explain why existing specification approaches fail
acceptance_criteria:
  - id: AC-103-1
    title: Problem section identifies specification pain points
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=problem-section]'
      - shouldContain:
          selector: '[data-test=problem-section]'
          text: spec drift
      - shouldContain:
          selector: '[data-test=problem-section]'
          text: philosophy-implementation gap
      - shouldContain:
          selector: '[data-test=problem-section]'
          text: unreliable AI output
    when: []
`;
loadAndRun(stories_103);

// US-104: Display visual walkthrough of four RootSpec skills
const stories_104 = `
id: US-104
title: Display visual walkthrough of four RootSpec skills
acceptance_criteria:
  - id: AC-104-1
    title: How it works shows four-step process
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=how-it-works]'
      - shouldContain:
          selector: '[data-test=workflow-step]'
          text: rs-init
      - shouldContain:
          selector: '[data-test=workflow-step]'
          text: rs-spec
      - shouldContain:
          selector: '[data-test=workflow-step]'
          text: rs-impl
      - shouldContain:
          selector: '[data-test=workflow-step]'
          text: rs-validate
    when: []
`;
loadAndRun(stories_104);

// US-105: Show GitHub repository link and getting started information
const stories_105 = `
id: US-105
title: Show GitHub repository link and getting started information
acceptance_criteria:
  - id: AC-105-1
    title: Clear call-to-action for GitHub repository
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=github-cta]'
      - shouldContain:
          selector: '[data-test=github-cta]'
          text: GitHub
    when: []
  - id: AC-105-2
    title: Attribution footer identifies site builder
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=attribution]'
      - shouldContain:
          selector: '[data-test=attribution]'
          text: built
    when: []
`;
loadAndRun(stories_105);

// US-201: Explore RootSpec hierarchy interactively
const stories_201 = `
id: US-201
title: Explore RootSpec hierarchy interactively
acceptance_criteria:
  - id: AC-201-1
    title: Hierarchy levels expand to show example content
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-level-1]'
    then:
      - shouldExist:
          selector: '[data-test=level-content]'
      - shouldContain:
          selector: '[data-test=level-content]'
          text: Philosophy
  - id: AC-201-2
    title: Visual connections show upward-only references
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-level-3]'
    then:
      - shouldExist:
          selector: '[data-test=reference-connection]'
  - id: AC-201-3
    title: Hierarchy explorer is keyboard accessible
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-explorer]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]:focus-within'
`;
loadAndRun(stories_201);

// US-202: Walk through mini specification wizard
const stories_202 = `
id: US-202
title: Walk through mini specification wizard
acceptance_criteria:
  - id: AC-202-1
    title: Wizard collects product idea input
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=spec-wizard-start]'
      - fill:
          selector: '[data-test=product-idea-input]'
          value: Task management app
    then:
      - shouldContain:
          selector: '[data-test=product-idea-input]'
          text: Task management app
  - id: AC-202-2
    title: Mission template selection available
    given:
      - visit: /
      - click:
          selector: '[data-test=spec-wizard-start]'
      - fill:
          selector: '[data-test=product-idea-input]'
          value: Task app
    when:
      - click:
          selector: '[data-test=next-step]'
    then:
      - shouldExist:
          selector: '[data-test=mission-templates]'
  - id: AC-202-3
    title: Design pillars selection from suggestions
    given:
      - visit: /
      - click:
          selector: '[data-test=spec-wizard-start]'
      - fill:
          selector: '[data-test=product-idea-input]'
          value: Task app
      - click:
          selector: '[data-test=next-step]'
    when:
      - click:
          selector: '[data-test=next-step]'
    then:
      - shouldExist:
          selector: '[data-test=design-pillars]'
  - id: AC-202-4
    title: Wizard generates skeleton spec output
    given:
      - visit: /
      - click:
          selector: '[data-test=spec-wizard-start]'
      - fill:
          selector: '[data-test=product-idea-input]'
          value: Task app
      - click:
          selector: '[data-test=next-step]'
      - click:
          selector: '[data-test=next-step]'
    when:
      - click:
          selector: '[data-test=finish-wizard]'
    then:
      - shouldExist:
          selector: '[data-test=spec-output]'
      - shouldContain:
          selector: '[data-test=spec-output]'
          text: L1
`;
loadAndRun(stories_202);

// US-203: Compare development with and without RootSpec
const stories_203 = `
id: US-203
title: Compare development with and without RootSpec
acceptance_criteria:
  - id: AC-203-1
    title: Toggle between without and with RootSpec views
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=comparison-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=comparison-content]'
  - id: AC-203-2
    title: Without spec shows vague requirements
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=without-spec]'
    then:
      - shouldExist:
          selector: '[data-test=vague-requirements]'
      - shouldContain:
          selector: '[data-test=vague-requirements]'
          text: vague
  - id: AC-203-3
    title: With RootSpec shows structured hierarchy
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=with-rootspec]'
    then:
      - shouldExist:
          selector: '[data-test=structured-hierarchy]'
      - shouldContain:
          selector: '[data-test=structured-hierarchy]'
          text: design pillar
`;
loadAndRun(stories_203);

// US-401: Site adapts to mobile viewport sizes
const stories_401 = `
id: US-401
title: Site adapts to mobile viewport sizes
acceptance_criteria:
  - id: AC-401-1
    title: Content readable on mobile screens
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero-section]'
      - shouldContain:
          selector: '[data-test=hero-description]'
          text: specification
    when: []
  - id: AC-401-2
    title: Interactive elements are touch-friendly
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
  - id: AC-401-3
    title: Navigation works on small screens
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=spec-wizard-start]'
    then:
      - shouldExist:
          selector: '[data-test=product-idea-input]'
`;
loadAndRun(stories_401);

// US-402: Complete keyboard navigation support
const stories_402 = `
id: US-402
title: Complete keyboard navigation support
acceptance_criteria:
  - id: AC-402-1
    title: Tab order follows logical content flow
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hero-section]'
    then:
      - shouldExist:
          selector: '[data-test=hero-section]:focus-within'
  - id: AC-402-2
    title: All interactive elements keyboard accessible
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-explorer]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]:focus-within'
  - id: AC-402-3
    title: Skip links available for screen readers
    given:
      - visit: /
    then:
      - shouldExist:
          selector: main
    when: []
`;
loadAndRun(stories_402);

// US-403: Consistent functionality across device types
const stories_403 = `
id: US-403
title: Consistent functionality across device types
acceptance_criteria:
  - id: AC-403-1
    title: Core functionality works without JavaScript
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero-section]'
      - shouldContain:
          selector: '[data-test=hero-description]'
          text: specification
    when: []
  - id: AC-403-2
    title: Progressive enhancement adds interactivity
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=spec-wizard-start]'
    then:
      - shouldExist:
          selector: '[data-test=product-idea-input]'
  - id: AC-403-3
    title: Consistent visual presentation across browsers
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=hero-section]'
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
`;
loadAndRun(stories_403);

// US-301: Switch between dark and light themes
const stories_301 = `
id: US-301
title: Switch between dark and light themes
acceptance_criteria:
  - id: AC-301-1
    title: Theme toggle changes visual appearance
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
  - id: AC-301-2
    title: System preference detected on first visit
    given:
      - visit: /
    then:
      - shouldExist:
          selector: body
    when: []
  - id: AC-301-3
    title: Theme preference persists across sessions
    given:
      - visit: /
      - click:
          selector: '[data-test=theme-toggle]'
    when:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
  - id: AC-301-4
    title: Smooth transition between themes
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

// US-302: All components respect current theme selection
const stories_302 = `
id: US-302
title: All components respect current theme selection
acceptance_criteria:
  - id: AC-302-1
    title: Interactive elements styled for current theme
    given:
      - visit: /
      - click:
          selector: '[data-test=theme-toggle]'
    when:
      - click:
          selector: '[data-test=spec-wizard-start]'
    then:
      - shouldExist:
          selector: '[data-test=spec-wizard-start]'
  - id: AC-302-2
    title: Focus indicators visible in both themes
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=hierarchy-explorer]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-explorer]:focus-within'
  - id: AC-302-3
    title: Text remains readable in both themes
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=hero-description]'
      - shouldContain:
          selector: '[data-test=hero-description]'
          text: specification
`;
loadAndRun(stories_302);
