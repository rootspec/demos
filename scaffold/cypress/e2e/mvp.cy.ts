import { UserStorySchema } from '../support/schema';
import type { UserStory } from '../support/schema';
import { runSetupSteps, runAssertionSteps } from '../support/steps';
import storiesData from '../fixtures/stories.json';

const stories: UserStory[] = storiesData.map((s: unknown) => UserStorySchema.parse(s));

// Check for .only at story level
const onlyStories = stories.filter((s) => s.only);
const storiesToRun = onlyStories.length > 0 ? onlyStories : stories;

for (const story of storiesToRun) {
	const describeFn = story.skip ? describe.skip : describe;

	describeFn(`${story.id}: ${story.title}`, () => {
		// Check for .only at AC level
		const onlyACs = story.acceptance_criteria.filter((ac) => ac.only);
		const acsToRun = onlyACs.length > 0 ? onlyACs : story.acceptance_criteria;

		for (const ac of acsToRun) {
			const itFn = ac.skip ? it.skip : it;

			itFn(`${ac.id}: ${ac.title}`, () => {
				runSetupSteps(ac.given);
				runSetupSteps(ac.when);
				runAssertionSteps(ac.then);
			});
		}
	});
}
