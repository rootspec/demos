import * as yaml from 'js-yaml';
import { UserStorySchema, type UserStory, type Step } from './schema';
import { runSetupSteps, runAssertionSteps } from './steps';

export function loadUserStories(filepath: string): UserStory[] {
  const content = cy.readFile(filepath) as any;
  const parsed = yaml.load(content as string) as unknown[];

  // Filter out comments (lines that start with #) and invalid entries
  const stories = parsed.filter(item =>
    item && typeof item === 'object' && 'id' in item
  );

  return stories.map(story => UserStorySchema.parse(story));
}

export function runStory(
  storyId: string,
  acId: string,
  given: Step[],
  when: Step[],
  then: Step[]
) {
  cy.log(`Running ${storyId}: ${acId}`);

  // Report test start to RootSpec reporter
  cy.task('rootspecTestStart', { storyId, acId }, { log: false });

  // Setup steps (given)
  if (given.length > 0) {
    cy.log('Given steps:', given);
    runSetupSteps(given);
  }

  // Action steps (when)
  if (when.length > 0) {
    cy.log('When steps:', when);
    runSetupSteps(when);
  }

  // Assertion steps (then)
  if (then.length > 0) {
    cy.log('Then steps:', then);
    runAssertionSteps(then);
  }

  // Report test completion to RootSpec reporter
  cy.task('rootspecTestEnd', { storyId, acId, status: 'pass' }, { log: false });
}