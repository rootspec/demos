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

// US-201: Access GitHub repository and spec files
const stories_201 = `
id: US-201
title: Access GitHub repository and spec files
acceptance_criteria:
  - id: AC-201-1
    title: Meta-banner links to spec and seed files
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=meta-link-spec]'
    then: []
  - id: AC-201-2
    title: Footer contains GitHub repository link
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=github-link]'
    when: []
  - id: AC-201-3
    title: Getting started section provides next steps
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=getting-started]'
      - shouldContain:
          selector: '[data-test=getting-started]'
          text: rs-init
      - shouldContain:
          selector: '[data-test=getting-started]'
          text: rs-spec
    when: []
`;
loadAndRun(stories_201);

// US-202: View before/after comparison
const stories_202 = `
id: US-202
title: View before/after comparison
acceptance_criteria:
  - id: AC-202-1
    title: Can toggle between without/with RootSpec views
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=comparison-toggle]'
    then:
      - shouldContain:
          selector: '[data-test=comparison-content]'
          text: structured hierarchy
  - id: AC-202-2
    title: Both panels address same product concept
    given:
      - visit: /
    then:
      - shouldContain:
          selector: '[data-test=comparison-without]'
          text: task management
      - shouldContain:
          selector: '[data-test=comparison-with]'
          text: task management
      - shouldContain:
          selector: '[data-test=comparison-without]'
          text: vague
      - shouldContain:
          selector: '[data-test=comparison-with]'
          text: testable
    when: []
`;
loadAndRun(stories_202);
