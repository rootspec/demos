import { runSetupSteps, runAssertionSteps } from '../support/steps';
import * as YAML from 'js-yaml';
import { readFileSync } from 'fs';
import { UserStorySchema, type UserStory } from '../support/schema';

// Load user stories from YAML file
const yamlContent = readFileSync('rootspec/05.IMPLEMENTATION/USER_STORIES/by_phase/MVP/marketing_site.yaml', 'utf8');
const stories = YAML.loadAll(yamlContent)
  .filter(Boolean)
  .map((story) => UserStorySchema.parse(story)) as UserStory[];

describe('RootSpec Marketing Site - MVP', () => {
  stories.forEach((story) => {
    if (story.skip) return;

    describe(story.title, () => {
      story.acceptance_criteria.forEach((ac) => {
        if (ac.skip) return;

        const testFn = ac.only ? it.only : it;
        testFn(ac.title, () => {
          // Execute given steps
          if (ac.given?.length) {
            runSetupSteps(ac.given);
          }

          // Execute when steps
          if (ac.when?.length) {
            runSetupSteps(ac.when);
          }

          // Execute then steps (assertions)
          if (ac.then?.length) {
            runAssertionSteps(ac.then);
          }
        });
      });
    });
  });
});