import { loadUserStories, runStory } from '../support/helpers';

describe('MVP Phase Stories', () => {
  const storyFiles = [
    'rootspec/05.IMPLEMENTATION/USER_STORIES/by_phase/MVP/content.yaml',
    'rootspec/05.IMPLEMENTATION/USER_STORIES/by_phase/MVP/interactive.yaml',
    'rootspec/05.IMPLEMENTATION/USER_STORIES/by_phase/MVP/responsive.yaml',
    'rootspec/05.IMPLEMENTATION/USER_STORIES/by_phase/MVP/theme.yaml'
  ];

  storyFiles.forEach(filepath => {
    const stories = loadUserStories(filepath);
    stories.forEach(story => {
      story.acceptance_criteria.forEach(ac => {
        it(`${story.id}: ${ac.title}`, () => {
          runStory(story.id, ac.id, ac.given || [], ac.when || [], ac.then || []);
        });
      });
    });
  });
});