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

// US-009: Explore trending tags and filter posts
const stories_009 = `
id: US-009
title: Explore trending tags and filter posts
acceptance_criteria:
  - id: AC-009-1
    title: Explore page shows trending tags
    given:
      - visit: /scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=trending-tags]'
      - shouldExist:
          selector: '[data-test=tag-chip]'
    when: []
  - id: AC-009-2
    title: Explore page shows suggested users
    given:
      - visit: /scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=suggested-users]'
      - shouldExist:
          selector: '[data-test=user-card]'
    when: []
  - id: AC-009-3
    title: Clicking a tag chip filters popular posts
    given:
      - visit: /scaffold/explore
    when:
      - click:
          selector: '[data-test=tag-chip]'
    then:
      - shouldExist:
          selector: '[data-test=tag-chip][data-active=true]'
      - shouldExist:
          selector: '[data-test=popular-posts]'
`;
loadAndRun(stories_009);

// US-002: Like and unlike a post
const stories_002 = `
id: US-002
title: Like and unlike a post
acceptance_criteria:
  - id: AC-002-1
    title: Like button exists on post cards
    given:
      - visit: /scaffold/
    then:
      - shouldExist:
          selector: '[data-test=like-button]'
    when: []
  - id: AC-002-2
    title: Clicking like button toggles liked state
    given:
      - visit: /scaffold/
    when:
      - click:
          selector: '[data-test=like-button]'
    then:
      - shouldExist:
          selector: '[data-test=like-button][data-liked=true]'
`;
loadAndRun(stories_002);

// US-003: Load more posts
const stories_003 = `
id: US-003
title: Load more posts
acceptance_criteria:
  - id: AC-003-1
    title: Load more button is visible when more posts exist
    given:
      - visit: /scaffold/
    then:
      - shouldExist:
          selector: '[data-test=load-more]'
    when: []
  - id: AC-003-2
    title: Clicking load more shows additional posts
    given:
      - visit: /scaffold/
    when:
      - click:
          selector: '[data-test=load-more]'
    then:
      - shouldExist:
          selector: '[data-test=post-card]'
`;
loadAndRun(stories_003);

// US-004: Compose a new post
const stories_004 = `
id: US-004
title: Compose a new post
acceptance_criteria:
  - id: AC-004-1
    title: Compose button opens the post composer
    given:
      - visit: /scaffold/
    when:
      - click:
          selector: '[data-test=compose-button]'
    then:
      - shouldExist:
          selector: '[data-test=post-composer]'
  - id: AC-004-2
    title: Submitting a new post adds it to the feed
    given:
      - visit: /scaffold/
      - click:
          selector: '[data-test=compose-button]'
    when:
      - fill:
          selector: '[data-test=composer-input]'
          value: Hello from the test composer
      - click:
          selector: '[data-test=composer-submit]'
    then:
      - shouldContain:
          selector: '[data-test=post-card]'
          text: Hello from the test composer
`;
loadAndRun(stories_004);

// US-001: View home feed with posts
const stories_001 = `
id: US-001
title: View home feed with posts
acceptance_criteria:
  - id: AC-001-1
    title: Home feed shows posts with author info
    given:
      - visit: /scaffold/
    then:
      - shouldExist:
          selector: '[data-test=post-card]'
      - shouldExist:
          selector: '[data-test=post-author]'
      - shouldExist:
          selector: '[data-test=post-content]'
    when: []
  - id: AC-001-2
    title: Meta banner is visible on home page
    given:
      - visit: /scaffold/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
`;
loadAndRun(stories_001);

// US-010: Toggle dark/light theme
const stories_010 = `
id: US-010
title: Toggle dark/light theme
acceptance_criteria:
  - id: AC-010-1
    title: Theme toggle button is accessible in the nav
    given:
      - visit: /scaffold/
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-010-2
    title: Clicking theme toggle switches the theme
    given:
      - visit: /scaffold/
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
`;
loadAndRun(stories_010);

// US-011: See meta banner on every page
const stories_011 = `
id: US-011
title: See meta banner on every page
acceptance_criteria:
  - id: AC-011-1
    title: Meta banner appears on the explore page
    given:
      - visit: /scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-011-2
    title: Meta banner appears on the search page
    given:
      - visit: /scaffold/search
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
`;
loadAndRun(stories_011);

// US-006: View a user profile
const stories_006 = `
id: US-006
title: View a user profile
acceptance_criteria:
  - id: AC-006-1
    title: Profile page shows user info and posts
    given:
      - visit: /scaffold/profile/alice.dev
    then:
      - shouldExist:
          selector: '[data-test=profile-header]'
      - shouldExist:
          selector: '[data-test=profile-displayname]'
      - shouldExist:
          selector: '[data-test=profile-handle]'
      - shouldExist:
          selector: '[data-test=profile-bio]'
      - shouldExist:
          selector: '[data-test=post-card]'
    when: []
  - id: AC-006-2
    title: Profile shows follower and following counts
    given:
      - visit: /scaffold/profile/alice.dev
    then:
      - shouldExist:
          selector: '[data-test=follower-count]'
      - shouldExist:
          selector: '[data-test=following-count]'
    when: []
  - id: AC-006-3
    title: Unknown user handle shows not found state
    given:
      - visit: /scaffold/profile/nobody.here
    then:
      - shouldExist:
          selector: '[data-test=user-not-found]'
    when: []
`;
loadAndRun(stories_006);

// US-007: Follow and unfollow a user
const stories_007 = `
id: US-007
title: Follow and unfollow a user
acceptance_criteria:
  - id: AC-007-1
    title: Follow button is shown on profile page
    given:
      - visit: /scaffold/profile/alice.dev
    then:
      - shouldExist:
          selector: '[data-test=follow-button]'
    when: []
  - id: AC-007-2
    title: Clicking follow button toggles follow state
    given:
      - visit: /scaffold/profile/alice.dev
    when:
      - click:
          selector: '[data-test=follow-button]'
    then:
      - shouldExist:
          selector: '[data-test=follow-button][data-following=true]'
`;
loadAndRun(stories_007);

// US-008: Search posts by keyword
const stories_008 = `
id: US-008
title: Search posts by keyword
acceptance_criteria:
  - id: AC-008-1
    title: Search input is shown on the search page
    given:
      - visit: /scaffold/search
    then:
      - shouldExist:
          selector: '[data-test=search-input]'
    when: []
  - id: AC-008-2
    title: Typing a query shows matching posts
    given:
      - visit: /scaffold/search
    when:
      - fill:
          selector: '[data-test=search-input]'
          value: security
    then:
      - shouldExist:
          selector: '[data-test=search-result]'
  - id: AC-008-3
    title: No results state shown when query has no matches
    given:
      - visit: /scaffold/search
    when:
      - fill:
          selector: '[data-test=search-input]'
          value: zzzzunmatchablequery9999
    then:
      - shouldExist:
          selector: '[data-test=search-empty]'
`;
loadAndRun(stories_008);

// US-005: View post detail and replies
const stories_005 = `
id: US-005
title: View post detail and replies
acceptance_criteria:
  - id: AC-005-1
    title: Post detail page shows full post content
    given:
      - visit: /scaffold/post/p1
    then:
      - shouldExist:
          selector: '[data-test=post-detail]'
      - shouldExist:
          selector: '[data-test=post-content]'
      - shouldExist:
          selector: '[data-test=post-author]'
    when: []
  - id: AC-005-2
    title: Post detail page shows replies when they exist
    given:
      - visit: /scaffold/post/p2
    then:
      - shouldExist:
          selector: '[data-test=replies-section]'
      - shouldExist:
          selector: '[data-test=reply-card]'
    when: []
  - id: AC-005-3
    title: Post not found shows graceful error state
    given:
      - visit: /scaffold/post/nonexistent
    then:
      - shouldExist:
          selector: '[data-test=post-not-found]'
    when: []
`;
loadAndRun(stories_005);
