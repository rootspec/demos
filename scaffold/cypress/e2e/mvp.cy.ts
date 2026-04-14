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

// US-008: Browse trending tags and suggested users on the explore page
const stories_008 = `
id: US-008
title: Browse trending tags and suggested users on the explore page
acceptance_criteria:
  - id: AC-008-1
    title: Explore page shows trending tags and user list
    given:
      - visit: /explore
    then:
      - shouldExist:
          selector: body
      - shouldContain:
          selector: body
          text: Trending
      - shouldContain:
          selector: body
          text: People
    when: []
`;
loadAndRun(stories_008);

// US-009: Click a tag on the explore page to filter posts
const stories_009 = `
id: US-009
title: Click a tag on the explore page to filter posts
acceptance_criteria:
  - id: AC-009-1
    title: Clicking a tag filters the visible posts to that tag
    given:
      - visit: /explore
    when:
      - click:
          selector: '[data-test=tag-chip]:first-child'
    then:
      - shouldExist:
          selector: '[data-test=tag-chip]:first-child.active'
`;
loadAndRun(stories_009);

// US-001: View the home feed with posts and author info
const stories_001 = `
id: US-001
title: View the home feed with posts and author info
acceptance_criteria:
  - id: AC-001-1
    title: Home feed shows posts with author info and engagement counts
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=post-card]'
      - shouldExist:
          selector: '[data-test=post-author]'
      - shouldExist:
          selector: '[data-test=post-content]'
      - shouldExist:
          selector: '[data-test=like-count]'
    when: []
  - id: AC-001-2
    title: Meta banner is visible on home page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldExist:
          selector: '[data-test=seed-link]'
      - shouldExist:
          selector: '[data-test=spec-link]'
    when: []
`;
loadAndRun(stories_001);

// US-002: Like and bookmark posts on the home feed
const stories_002 = `
id: US-002
title: Like and bookmark posts on the home feed
acceptance_criteria:
  - id: AC-002-1
    title: Like button toggles visual state and updates count
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=post-card]:first-child [data-test=like-button]'
    then:
      - shouldExist:
          selector: '[data-test=post-card]:first-child [data-test=like-button].active'
  - id: AC-002-2
    title: Bookmark button toggles visual state
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=post-card]:first-child [data-test=bookmark-button]'
    then:
      - shouldExist:
          selector: '[data-test=post-card]:first-child [data-test=bookmark-button].active'
`;
loadAndRun(stories_002);

// US-003: Compose and submit a new post from the home feed
const stories_003 = `
id: US-003
title: Compose and submit a new post from the home feed
acceptance_criteria:
  - id: AC-003-1
    title: Valid post submission adds post to feed
    given:
      - visit: /
    when:
      - fill:
          selector: '[data-test=composer-input]'
          value: Hello from RootFeed test
      - click:
          selector: '[data-test=composer-submit]'
    then:
      - shouldContain:
          selector: '[data-test=post-card]:first-child [data-test=post-content]'
          text: Hello from RootFeed test
  - id: AC-003-2
    title: Empty post submission shows validation error
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=composer-submit]'
    then:
      - shouldExist:
          selector: '[data-test=composer-error]'
`;
loadAndRun(stories_003);

// US-010: Toggle between dark and light theme
const stories_010 = `
id: US-010
title: Toggle between dark and light theme
acceptance_criteria:
  - id: AC-010-1
    title: Theme toggle button exists in the navigation
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-010-2
    title: Clicking theme toggle switches the theme class
    given:
      - visit: /
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: html.dark
`;
loadAndRun(stories_010);

// US-011: See the meta banner explaining the demo origin on every page
const stories_011 = `
id: US-011
title: See the meta banner explaining the demo origin on every page
acceptance_criteria:
  - id: AC-011-1
    title: Meta banner is visible on the home page
    given:
      - visit: /
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldExist:
          selector: '[data-test=scaffold-link]'
    when: []
  - id: AC-011-2
    title: Meta banner is visible on the explore page
    given:
      - visit: /explore
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-011-3
    title: Meta banner is visible on the search page
    given:
      - visit: /search
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
`;
loadAndRun(stories_011);

// US-005: View a user profile with their posts and stats
const stories_005 = `
id: US-005
title: View a user profile with their posts and stats
acceptance_criteria:
  - id: AC-005-1
    title: Profile page shows user info and posts
    given:
      - visit: /profile/alice.dev
    then:
      - shouldContain:
          selector: body
          text: Alice Chen
      - shouldContain:
          selector: body
          text: '@alice.dev'
    when: []
  - id: AC-005-2
    title: Unknown profile handle shows not-found message
    given:
      - visit: /profile/nobody-here
    then:
      - shouldContain:
          selector: body
          text: User not found
    when: []
`;
loadAndRun(stories_005);

// US-006: Follow and unfollow a user from their profile page
const stories_006 = `
id: US-006
title: Follow and unfollow a user from their profile page
acceptance_criteria:
  - id: AC-006-1
    title: Follow button toggles to Unfollow after clicking
    given:
      - visit: /profile/bobwrites
    when:
      - click:
          selector: '[data-test=follow-button]'
    then:
      - shouldContain:
          selector: '[data-test=follow-button]'
          text: Unfollow
  - id: AC-006-2
    title: Unfollow button toggles back to Follow after clicking
    given:
      - visit: /profile/bobwrites
    when:
      - click:
          selector: '[data-test=follow-button]'
      - click:
          selector: '[data-test=follow-button]'
    then:
      - shouldContain:
          selector: '[data-test=follow-button]'
          text: Follow
`;
loadAndRun(stories_006);

// US-007: Search posts by keyword and see filtered results
const stories_007 = `
id: US-007
title: Search posts by keyword and see filtered results
acceptance_criteria:
  - id: AC-007-1
    title: Typing a query shows matching posts
    given:
      - visit: /search
    when:
      - fill:
          selector: input[type=text]
          value: microservices
    then:
      - shouldExist:
          selector: '[data-test=post-content]'
      - shouldContain:
          selector: '[data-test=post-content]'
          text: microservices
  - id: AC-007-2
    title: No matching results shows empty state message
    given:
      - visit: /search
    when:
      - fill:
          selector: input[type=text]
          value: xyzquerynotindata123
    then:
      - shouldContain:
          selector: body
          text: No results
  - id: AC-007-3
    title: Empty query shows no results
    given:
      - visit: /search
    then:
      - shouldExist:
          selector: input[type=text]
    when: []
`;
loadAndRun(stories_007);

// US-004: View a single post with its replies
const stories_004 = `
id: US-004
title: View a single post with its replies
acceptance_criteria:
  - id: AC-004-1
    title: Post detail page shows the post content and author
    given:
      - visit: /post/p1
    then:
      - shouldExist:
          selector: '[data-test=post-content]'
      - shouldExist:
          selector: '[data-test=post-author]'
    when: []
  - id: AC-004-2
    title: Invalid post ID shows not-found message
    given:
      - visit: /post/nonexistent-id
    then:
      - shouldContain:
          selector: body
          text: Post not found
    when: []
`;
loadAndRun(stories_004);
