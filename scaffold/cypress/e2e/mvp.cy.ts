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

// US-301: Search posts by keyword
const stories_301 = `
id: US-301
title: Search posts by keyword
acceptance_criteria:
  - id: AC-301-1
    title: Typing in search input shows matching posts
    given:
      - visit: /demos/scaffold/search
    when:
      - fill:
          selector: '[data-test=search-input]'
          value: TypeScript
    then:
      - shouldExist:
          selector: '[data-test=search-result]'
  - id: AC-301-2
    title: Search input is visible on search page
    given:
      - visit: /demos/scaffold/search
    then:
      - shouldExist:
          selector: '[data-test=search-input]'
    when: []
`;
loadAndRun(stories_301);

// US-302: Search empty state
const stories_302 = `
id: US-302
title: Search empty state
acceptance_criteria:
  - id: AC-302-1
    title: Searching with no matches shows empty state message
    given:
      - visit: /demos/scaffold/search
    when:
      - fill:
          selector: '[data-test=search-input]'
          value: xyzzy_no_match_12345
    then:
      - shouldExist:
          selector: '[data-test=search-empty]'
`;
loadAndRun(stories_302);

// US-303: View explore page
const stories_303 = `
id: US-303
title: View explore page
acceptance_criteria:
  - id: AC-303-1
    title: Explore page shows trending tags
    given:
      - visit: /demos/scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=tag-chip]'
    when: []
  - id: AC-303-2
    title: Explore page shows suggested users
    given:
      - visit: /demos/scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=suggested-user]'
    when: []
`;
loadAndRun(stories_303);

// US-304: Filter explore by tag
const stories_304 = `
id: US-304
title: Filter explore by tag
acceptance_criteria:
  - id: AC-304-1
    title: Clicking a tag filters the explore posts
    given:
      - visit: /demos/scaffold/explore
    when:
      - click:
          selector: '[data-test=tag-chip]'
    then:
      - shouldExist:
          selector: '[data-test=active-tag]'
`;
loadAndRun(stories_304);

// US-305: Navigate from explore to profile
const stories_305 = `
id: US-305
title: Navigate from explore to profile
acceptance_criteria:
  - id: AC-305-1
    title: Clicking a suggested user navigates to their profile
    given:
      - visit: /demos/scaffold/explore
    when:
      - click:
          selector: '[data-test=suggested-user-link]'
    then:
      - shouldExist:
          selector: '[data-test=profile-name]'
`;
loadAndRun(stories_305);

// US-101: View home feed with posts
const stories_101 = `
id: US-101
title: View home feed with posts
acceptance_criteria:
  - id: AC-101-1
    title: Home feed shows posts with author and content
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=post-card]'
      - shouldExist:
          selector: '[data-test=post-author]'
      - shouldExist:
          selector: '[data-test=post-content]'
    when: []
  - id: AC-101-2
    title: Home feed shows post timestamps
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=post-timestamp]'
    when: []
  - id: AC-101-3
    title: Home feed shows like counts
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=like-count]'
    when: []
`;
loadAndRun(stories_101);

// US-102: Like a post
const stories_102 = `
id: US-102
title: Like a post
acceptance_criteria:
  - id: AC-102-1
    title: Like button toggles and updates count
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=like-button]'
    then:
      - shouldExist:
          selector: '[data-test=like-button].active'
`;
loadAndRun(stories_102);

// US-103: Bookmark a post
const stories_103 = `
id: US-103
title: Bookmark a post
acceptance_criteria:
  - id: AC-103-1
    title: Bookmark button toggles on click
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=bookmark-button]'
    then:
      - shouldExist:
          selector: '[data-test=bookmark-button].active'
`;
loadAndRun(stories_103);

// US-104: Compose a new post
const stories_104 = `
id: US-104
title: Compose a new post
acceptance_criteria:
  - id: AC-104-1
    title: Composer is visible on home page
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=composer]'
      - shouldExist:
          selector: '[data-test=composer-input]'
    when: []
  - id: AC-104-2
    title: Submitting a post adds it to the feed
    given:
      - visit: /demos/scaffold/
    when:
      - fill:
          selector: '[data-test=composer-input]'
          value: Hello from the composer test
      - click:
          selector: '[data-test=composer-submit]'
    then:
      - shouldContain:
          selector: '[data-test=post-content]'
          text: Hello from the composer test
  - id: AC-104-3
    title: Submitting an empty post shows an error
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=composer-submit]'
    then:
      - shouldExist:
          selector: '[data-test=composer-error]'
`;
loadAndRun(stories_104);

// US-105: Load more posts
const stories_105 = `
id: US-105
title: Load more posts
acceptance_criteria:
  - id: AC-105-1
    title: Load more button exists on home page
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=load-more]'
    when: []
`;
loadAndRun(stories_105);

// US-106: View post detail and thread
const stories_106 = `
id: US-106
title: View post detail and thread
acceptance_criteria:
  - id: AC-106-1
    title: Post detail page shows full post content
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=post-content]'
    then:
      - shouldExist:
          selector: '[data-test=post-content]'
`;
loadAndRun(stories_106);

// US-401: See meta banner on every page
const stories_401 = `
id: US-401
title: See meta banner on every page
acceptance_criteria:
  - id: AC-401-1
    title: Meta banner is visible on the home page
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-401-2
    title: Meta banner is visible on the explore page
    given:
      - visit: /demos/scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-401-3
    title: Meta banner is visible on the search page
    given:
      - visit: /demos/scaffold/search
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
`;
loadAndRun(stories_401);

// US-402: Navigate to seed and spec from banner
const stories_402 = `
id: US-402
title: Navigate to seed and spec from banner
acceptance_criteria:
  - id: AC-402-1
    title: Meta banner contains seed link
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=seed-link]'
    when: []
  - id: AC-402-2
    title: Meta banner contains spec link
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=spec-link]'
    when: []
  - id: AC-402-3
    title: Meta banner contains scaffold commit link
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=scaffold-link]'
    when: []
`;
loadAndRun(stories_402);

// US-201: View a user profile
const stories_201 = `
id: US-201
title: View a user profile
acceptance_criteria:
  - id: AC-201-1
    title: Profile page shows user display name and handle
    given:
      - visit: /demos/scaffold/profile/alice.dev
    then:
      - shouldExist:
          selector: '[data-test=profile-name]'
      - shouldExist:
          selector: '[data-test=profile-handle]'
    when: []
  - id: AC-201-2
    title: Profile page shows user posts
    given:
      - visit: /demos/scaffold/profile/alice.dev
    then:
      - shouldExist:
          selector: '[data-test=post-card]'
    when: []
  - id: AC-201-3
    title: Unknown profile shows not found message
    given:
      - visit: /demos/scaffold/profile/doesnotexist
    then:
      - shouldExist:
          selector: '[data-test=profile-not-found]'
    when: []
`;
loadAndRun(stories_201);

// US-202: Follow a user
const stories_202 = `
id: US-202
title: Follow a user
acceptance_criteria:
  - id: AC-202-1
    title: Follow button appears on profile and toggles to following state
    given:
      - visit: /demos/scaffold/profile/alice.dev
    when:
      - click:
          selector: '[data-test=follow-button]'
    then:
      - shouldContain:
          selector: '[data-test=follow-button]'
          text: Following
`;
loadAndRun(stories_202);

// US-203: Unfollow a user
const stories_203 = `
id: US-203
title: Unfollow a user
acceptance_criteria:
  - id: AC-203-1
    title: Clicking following button unfollows the user
    given:
      - visit: /demos/scaffold/profile/alice.dev
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
loadAndRun(stories_203);

// US-501: Toggle dark and light mode
const stories_501 = `
id: US-501
title: Toggle dark and light mode
acceptance_criteria:
  - id: AC-501-1
    title: Theme toggle button is visible in navigation
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-501-2
    title: Clicking theme toggle switches between light and dark mode
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: html.dark
`;
loadAndRun(stories_501);
