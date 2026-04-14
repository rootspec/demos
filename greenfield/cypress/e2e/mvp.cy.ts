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

// ============================================================
// US-101: Meta banner
// ============================================================
const stories_101 = `
id: US-101
title: Visitor sees meta banner explaining this is a RootSpec demo
acceptance_criteria:
  - id: AC-101-1
    title: Meta banner is visible on page load without scrolling
    given:
      - visit: /
    when:
      - pageLoad: {}
    then:
      - shouldBeVisible:
          selector: '[data-test=meta-banner]'
  - id: AC-101-2
    title: Meta banner contains links to spec and seed
    given:
      - visit: /
    when:
      - pageLoad: {}
    then:
      - shouldExist:
          selector: '[data-test=meta-banner] a[data-test=link-spec]'
      - shouldExist:
          selector: '[data-test=meta-banner] a[data-test=link-seed]'
  - id: AC-101-3
    title: Meta banner links open in new tab
    given:
      - visit: /
    when:
      - pageLoad: {}
    then:
      - shouldHaveAttr:
          selector: '[data-test=link-spec]'
          attr: target
          value: _blank
      - shouldHaveAttr:
          selector: '[data-test=link-seed]'
          attr: target
          value: _blank
`;
loadAndRun(stories_101);

// ============================================================
// US-102: Version badge
// ============================================================
const stories_102 = `
id: US-102
title: Visitor sees version badge with current RootSpec version
acceptance_criteria:
  - id: AC-102-1
    title: Version badge is visible in hero section
    given:
      - visit: /
    when:
      - pageLoad: {}
    then:
      - shouldBeVisible:
          selector: '[data-test=version-badge]'
  - id: AC-102-2
    title: Version badge displays a non-empty version string
    given:
      - visit: /
    when:
      - pageLoad: {}
    then:
      - shouldMatch:
          selector: '[data-test=version-badge]'
          pattern: 'v\\d+\\.\\d+\\.\\d+'
`;
loadAndRun(stories_102);

// ============================================================
// US-103: Hero section
// ============================================================
const stories_103 = `
id: US-103
title: Visitor reads the hero section and understands what RootSpec is
acceptance_criteria:
  - id: AC-103-1
    title: Hero section has a headline and one-sentence explanation
    given:
      - visit: /
    when:
      - pageLoad: {}
    then:
      - shouldBeVisible:
          selector: '[data-test=hero-headline]'
      - shouldBeVisible:
          selector: '[data-test=hero-subheadline]'
  - id: AC-103-2
    title: Hero section has a primary CTA linking to GitHub
    given:
      - visit: /
    when:
      - pageLoad: {}
    then:
      - shouldBeVisible:
          selector: '[data-test=hero-cta]'
      - shouldHaveAttr:
          selector: '[data-test=hero-cta]'
          attr: href
          value: https://github.com/rootspec/rootspec
`;
loadAndRun(stories_103);

// ============================================================
// US-104: Problem section
// ============================================================
const stories_104 = `
id: US-104
title: Visitor reads the problem section and recognizes their pain
acceptance_criteria:
  - id: AC-104-1
    title: Problem section exists and has at least 3 pain points
    given:
      - visit: /
    when:
      - scrollTo:
          selector: '[data-test=problem-section]'
    then:
      - shouldExist:
          selector: '[data-test=problem-section] [data-test=pain-point]'
          minCount: 3
`;
loadAndRun(stories_104);

// ============================================================
// US-105: Workflow section
// ============================================================
const stories_105 = `
id: US-105
title: Visitor sees the four-step workflow and understands the process
acceptance_criteria:
  - id: AC-105-1
    title: Workflow section shows all four commands
    given:
      - visit: /
    when:
      - scrollTo:
          selector: '[data-test=workflow-section]'
    then:
      - shouldContain:
          selector: '[data-test=workflow-section]'
          text: rs-init
      - shouldContain:
          selector: '[data-test=workflow-section]'
          text: rs-spec
      - shouldContain:
          selector: '[data-test=workflow-section]'
          text: rs-impl
      - shouldContain:
          selector: '[data-test=workflow-section]'
          text: rs-validate
`;
loadAndRun(stories_105);

// ============================================================
// US-106: Footer
// ============================================================
const stories_106 = `
id: US-106
title: Visitor sees footer with builder attribution and build date
acceptance_criteria:
  - id: AC-106-1
    title: Footer shows builder name and build date
    given:
      - visit: /
    when:
      - scrollTo:
          selector: '[data-test=footer]'
    then:
      - shouldBeVisible:
          selector: '[data-test=footer-attribution]'
      - shouldContain:
          selector: '[data-test=footer-attribution]'
          text: Claude
`;
loadAndRun(stories_106);

// ============================================================
// US-201: Hierarchy Explorer
// ============================================================
const stories_201 = `
id: US-201
title: Visitor explores the hierarchy by clicking levels in the Hierarchy Explorer
acceptance_criteria:
  - id: AC-201-1
    title: Hierarchy Explorer renders all five levels
    given:
      - visit: /
    when:
      - scrollTo:
          selector: '[data-test=hierarchy-explorer]'
    then:
      - shouldExist:
          selector: '[data-test=hierarchy-level]'
          count: 5
  - id: AC-201-2
    title: Clicking a level expands it to show more content
    given:
      - visit: /
      - scrollTo:
          selector: '[data-test=hierarchy-explorer]'
    when:
      - click:
          selector: '[data-test=hierarchy-level]:first-child'
    then:
      - shouldHaveClass:
          selector: '[data-test=hierarchy-level]:first-child'
          class: expanded
      - shouldBeVisible:
          selector: '[data-test=hierarchy-level]:first-child [data-test=level-detail]'
  - id: AC-201-3
    title: Clicking an expanded level collapses it
    given:
      - visit: /
      - scrollTo:
          selector: '[data-test=hierarchy-explorer]'
      - click:
          selector: '[data-test=hierarchy-level]:first-child'
    when:
      - click:
          selector: '[data-test=hierarchy-level]:first-child'
    then:
      - shouldNotHaveClass:
          selector: '[data-test=hierarchy-level]:first-child'
          class: expanded
  - id: AC-201-4
    title: Hierarchy Explorer is keyboard navigable
    given:
      - visit: /
      - scrollTo:
          selector: '[data-test=hierarchy-explorer]'
    when:
      - focus:
          selector: '[data-test=hierarchy-level]:first-child'
      - keyPress:
          key: Enter
    then:
      - shouldHaveClass:
          selector: '[data-test=hierarchy-level]:first-child'
          class: expanded
`;
loadAndRun(stories_201);

// ============================================================
// US-202: Spec Wizard
// ============================================================
const stories_202 = `
id: US-202
title: Visitor uses the Spec Wizard to generate a skeleton spec from their idea
acceptance_criteria:
  - id: AC-202-1
    title: Wizard renders step 1 with a text input
    given:
      - visit: /
      - scrollTo:
          selector: '[data-test=spec-wizard]'
    when:
      - pageLoad: {}
    then:
      - shouldBeVisible:
          selector: '[data-test=wizard-step-1]'
      - shouldBeVisible:
          selector: '[data-test=wizard-idea-input]'
  - id: AC-202-2
    title: Next button is disabled when step 1 input is empty
    given:
      - visit: /
      - scrollTo:
          selector: '[data-test=spec-wizard]'
    when:
      - pageLoad: {}
    then:
      - shouldBeDisabled:
          selector: '[data-test=wizard-next]'
  - id: AC-202-3
    title: Visitor can advance through all steps and see output
    given:
      - visit: /
      - scrollTo:
          selector: '[data-test=spec-wizard]'
    when:
      - type:
          selector: '[data-test=wizard-idea-input]'
          text: A tool for remote teams to stay aligned
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=mission-option]:first-child'
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=pillar-option]:nth-child(1)'
      - click:
          selector: '[data-test=pillar-option]:nth-child(2)'
      - click:
          selector: '[data-test=pillar-option]:nth-child(3)'
      - click:
          selector: '[data-test=wizard-next]'
    then:
      - shouldBeVisible:
          selector: '[data-test=wizard-output]'
      - shouldContain:
          selector: '[data-test=wizard-output]'
          text: Mission
  - id: AC-202-4
    title: Start Over resets the wizard to step 1
    given:
      - visit: /
      - scrollTo:
          selector: '[data-test=spec-wizard]'
      - type:
          selector: '[data-test=wizard-idea-input]'
          text: Test idea
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=mission-option]:first-child'
      - click:
          selector: '[data-test=wizard-next]'
      - click:
          selector: '[data-test=pillar-option]:nth-child(1)'
      - click:
          selector: '[data-test=pillar-option]:nth-child(2)'
      - click:
          selector: '[data-test=pillar-option]:nth-child(3)'
      - click:
          selector: '[data-test=wizard-next]'
    when:
      - click:
          selector: '[data-test=wizard-reset]'
    then:
      - shouldBeVisible:
          selector: '[data-test=wizard-step-1]'
      - shouldHaveValue:
          selector: '[data-test=wizard-idea-input]'
          value: ''
`;
loadAndRun(stories_202);

// ============================================================
// US-203: Before/After comparison
// ============================================================
const stories_203 = `
id: US-203
title: Visitor sees Before/After comparison of spec vs. no spec
acceptance_criteria:
  - id: AC-203-1
    title: Before/After section renders two panels with real content
    given:
      - visit: /
      - scrollTo:
          selector: '[data-test=comparison-section]'
    when:
      - pageLoad: {}
    then:
      - shouldBeVisible:
          selector: '[data-test=panel-before]'
      - shouldBeVisible:
          selector: '[data-test=panel-after]'
      - shouldContain:
          selector: '[data-test=panel-before]'
          text: Without
      - shouldContain:
          selector: '[data-test=panel-after]'
          text: With RootSpec
`;
loadAndRun(stories_203);

// ============================================================
// US-401: Desktop layout
// ============================================================
const stories_401 = `
id: US-401
title: Visitor on desktop sees multi-column layout in key sections
acceptance_criteria:
  - id: AC-401-1
    title: Workflow section shows steps in a grid on desktop
    given:
      - viewport:
          width: 1280
          height: 800
      - visit: /
    when:
      - scrollTo:
          selector: '[data-test=workflow-section]'
    then:
      - shouldBeVisible:
          selector: '[data-test=workflow-steps]'
      - shouldExist:
          selector: '[data-test=workflow-step]'
          count: 4
  - id: AC-401-2
    title: Before/After comparison shows panels side by side on desktop
    given:
      - viewport:
          width: 1280
          height: 800
      - visit: /
    when:
      - scrollTo:
          selector: '[data-test=comparison-section]'
    then:
      - shouldBeVisible:
          selector: '[data-test=panel-before]'
      - shouldBeVisible:
          selector: '[data-test=panel-after]'
`;
loadAndRun(stories_401);

// ============================================================
// US-402: Tablet layout
// ============================================================
const stories_402 = `
id: US-402
title: Visitor on tablet sees appropriately adapted layout
acceptance_criteria:
  - id: AC-402-1
    title: Page is usable at 768px viewport width
    given:
      - viewport:
          width: 768
          height: 1024
      - visit: /
    when:
      - scrollTo:
          selector: '[data-test=footer]'
    then:
      - shouldNotOverflow:
          selector: body
          direction: x
      - shouldBeVisible:
          selector: '[data-test=meta-banner]'
      - shouldBeVisible:
          selector: '[data-test=footer]'
`;
loadAndRun(stories_402);

// ============================================================
// US-403: CTA section
// ============================================================
const stories_403 = `
id: US-403
title: CTA section links to the correct GitHub repository
acceptance_criteria:
  - id: AC-403-1
    title: CTA section has a link to the RootSpec GitHub repo
    given:
      - visit: /
    when:
      - scrollTo:
          selector: '[data-test=cta-section]'
    then:
      - shouldBeVisible:
          selector: '[data-test=cta-github-link]'
      - shouldHaveAttr:
          selector: '[data-test=cta-github-link]'
          attr: href
          value: https://github.com/rootspec/rootspec
`;
loadAndRun(stories_403);

// ============================================================
// US-301: Dark theme
// ============================================================
const stories_301 = `
id: US-301
title: Visitor sees dark theme by default matching their system preference
acceptance_criteria:
  - id: AC-301-1
    title: Page applies dark class to html element on load
    given:
      - visit: /
    when:
      - pageLoad: {}
    then:
      - shouldExist:
          selector: 'html.dark'
  - id: AC-301-2
    title: Theme toggle button is visible in the header
    given:
      - visit: /
    when:
      - pageLoad: {}
    then:
      - shouldBeVisible:
          selector: '[data-test=theme-toggle]'
  - id: AC-301-3
    title: Clicking theme toggle switches between dark and light
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldHaveClass:
          selector: html
          class: light
`;
loadAndRun(stories_301);

// ============================================================
// US-302: Reduced motion
// ============================================================
const stories_302 = `
id: US-302
title: Visitor with reduced motion preference sees no animations
acceptance_criteria:
  - id: AC-302-1
    title: Section transitions are disabled with prefers-reduced-motion
    given:
      - visit: /
      - mediaQuery:
          name: prefers-reduced-motion
          value: reduce
    when:
      - pageLoad: {}
    then:
      - shouldHaveStyle:
          selector: '[data-test=hero-section]'
          property: animation-duration
          value: 0
`;
loadAndRun(stories_302);

// ============================================================
// US-303: Mobile usability
// ============================================================
const stories_303 = `
id: US-303
title: Visitor on mobile can use all interactive features
acceptance_criteria:
  - id: AC-303-1
    title: Page has no horizontal overflow on mobile viewport
    given:
      - viewport:
          width: 375
          height: 812
      - visit: /
    when:
      - pageLoad: {}
    then:
      - shouldNotOverflow:
          selector: body
          direction: x
  - id: AC-303-2
    title: Hierarchy Explorer is usable on mobile
    given:
      - viewport:
          width: 375
          height: 812
      - visit: /
      - scrollTo:
          selector: '[data-test=hierarchy-explorer]'
    when:
      - click:
          selector: '[data-test=hierarchy-level]:first-child'
    then:
      - shouldHaveClass:
          selector: '[data-test=hierarchy-level]:first-child'
          class: expanded
  - id: AC-303-3
    title: Spec Wizard is usable on mobile
    given:
      - viewport:
          width: 375
          height: 812
      - visit: /
      - scrollTo:
          selector: '[data-test=spec-wizard]'
    when:
      - type:
          selector: '[data-test=wizard-idea-input]'
          text: Mobile test idea
    then:
      - shouldHaveValue:
          selector: '[data-test=wizard-idea-input]'
          value: Mobile test idea
`;
loadAndRun(stories_303);
