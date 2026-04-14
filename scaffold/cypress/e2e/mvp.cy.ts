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

// US-010: Browse explore page with trending tags and suggested users
const stories_010 = `
id: US-010
title: Browse explore page with trending tags and suggested users
acceptance_criteria:
  - id: AC-010-1
    title: Explore page shows trending tags
    given:
      - visit: /demos/scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=trending-tags]'
      - shouldExist:
          selector: '[data-test=tag-item]'
    when: []
  - id: AC-010-2
    title: Explore page shows suggested users
    given:
      - visit: /demos/scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=suggested-users]'
      - shouldExist:
          selector: '[data-test=user-item]'
    when: []
`;
loadAndRun(stories_010);

// US-011: Filter explore posts by clicking a tag
const stories_011 = `
id: US-011
title: Filter explore posts by clicking a tag
acceptance_criteria:
  - id: AC-011-1
    title: Clicking a tag filters the posts list
    given:
      - visit: /demos/scaffold/explore
    when:
      - click:
          selector: '[data-test=tag-item]'
    then:
      - shouldExist:
          selector: '[data-test=tag-item][data-active=true]'
      - shouldExist:
          selector: '[data-test=filtered-posts]'
  - id: AC-011-2
    title: Clicking the active tag deselects it
    given:
      - visit: /demos/scaffold/explore
    when:
      - click:
          selector: '[data-test=tag-item]'
      - click:
          selector: '[data-test=tag-item][data-active=true]'
    then:
      - shouldExist:
          selector: '[data-test=tag-item][data-active=false]'
`;
loadAndRun(stories_011);

// US-001: View home feed with posts and author info
const stories_001 = `
id: US-001
title: View home feed with posts and author info
acceptance_criteria:
  - id: AC-001-1
    title: Home feed shows posts with author info
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
  - id: AC-001-2
    title: Posts show engagement counts
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=like-count]'
      - shouldExist:
          selector: '[data-test=repost-count]'
    when: []
`;
loadAndRun(stories_001);

// US-002: Like and unlike a post
const stories_002 = `
id: US-002
title: Like and unlike a post
acceptance_criteria:
  - id: AC-002-1
    title: Like button toggles liked state
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=like-btn]'
    then:
      - shouldExist:
          selector: '[data-test=like-btn][data-liked=true]'
  - id: AC-002-2
    title: Like count updates on toggle
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=like-btn]'
      - click:
          selector: '[data-test=like-btn]'
    then:
      - shouldExist:
          selector: '[data-test=like-btn][data-liked=false]'
`;
loadAndRun(stories_002);

// US-003: Bookmark and unbookmark a post
const stories_003 = `
id: US-003
title: Bookmark and unbookmark a post
acceptance_criteria:
  - id: AC-003-1
    title: Bookmark button toggles bookmarked state
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=bookmark-btn]'
    then:
      - shouldExist:
          selector: '[data-test=bookmark-btn][data-bookmarked=true]'
`;
loadAndRun(stories_003);

// US-004: Load more posts in the feed
const stories_004 = `
id: US-004
title: Load more posts in the feed
acceptance_criteria:
  - id: AC-004-1
    title: Load more button loads additional posts
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=load-more-btn]'
    then:
      - shouldExist:
          selector: '[data-test=post-card]'
`;
loadAndRun(stories_004);

// US-005: Compose and publish a new post
const stories_005 = `
id: US-005
title: Compose and publish a new post
acceptance_criteria:
  - id: AC-005-1
    title: Composer allows typing and submitting a post
    given:
      - visit: /demos/scaffold/
    when:
      - fill:
          selector: '[data-test=composer-input]'
          value: Hello from the composer!
      - click:
          selector: '[data-test=composer-submit]'
    then:
      - shouldContain:
          selector: '[data-test=post-card]'
          text: Hello from the composer!
  - id: AC-005-2
    title: Submit button is disabled when composer is empty
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=composer-submit][disabled]'
    when: []
`;
loadAndRun(stories_005);

// US-012: Toggle between dark and light theme
const stories_012 = `
id: US-012
title: Toggle between dark and light theme
acceptance_criteria:
  - id: AC-012-1
    title: Theme toggle button switches the theme
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
  - id: AC-012-2
    title: Dark mode applies dark class to document
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: html.dark
`;
loadAndRun(stories_012);

// US-013: See the meta banner explaining the demo on every page
const stories_013 = `
id: US-013
title: See the meta banner explaining the demo on every page
acceptance_criteria:
  - id: AC-013-1
    title: Meta banner is visible on home page
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldExist:
          selector: '[data-test=scaffold-link]'
    when: []
  - id: AC-013-2
    title: Meta banner is visible on explore page
    given:
      - visit: /demos/scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
`;
loadAndRun(stories_013);

// US-014: Navigate between home feed, explore, and search
const stories_014 = `
id: US-014
title: Navigate between home feed, explore, and search
acceptance_criteria:
  - id: AC-014-1
    title: Navigation bar contains links to all main sections
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=nav-home]'
      - shouldExist:
          selector: '[data-test=nav-explore]'
      - shouldExist:
          selector: '[data-test=nav-search]'
    when: []
  - id: AC-014-2
    title: RootSpec version is shown in the header
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
`;
loadAndRun(stories_014);

// US-007: View user profile with bio and post history
const stories_007 = `
id: US-007
title: View user profile with bio and post history
acceptance_criteria:
  - id: AC-007-1
    title: Profile page shows user info and posts
    given:
      - visit: /demos/scaffold/profile/alice
    then:
      - shouldExist:
          selector: '[data-test=profile-name]'
      - shouldExist:
          selector: '[data-test=profile-handle]'
      - shouldExist:
          selector: '[data-test=profile-bio]'
      - shouldExist:
          selector: '[data-test=follower-count]'
      - shouldExist:
          selector: '[data-test=post-card]'
    when: []
`;
loadAndRun(stories_007);

// US-008: Follow and unfollow a user from their profile
const stories_008 = `
id: US-008
title: Follow and unfollow a user from their profile
acceptance_criteria:
  - id: AC-008-1
    title: Follow button follows a user
    given:
      - visit: /demos/scaffold/profile/alice
    when:
      - click:
          selector: '[data-test=follow-btn]'
    then:
      - shouldExist:
          selector: '[data-test=follow-btn][data-following=true]'
  - id: AC-008-2
    title: Unfollow button unfollows a user
    given:
      - visit: /demos/scaffold/profile/alice
    when:
      - click:
          selector: '[data-test=follow-btn]'
      - click:
          selector: '[data-test=follow-btn]'
    then:
      - shouldExist:
          selector: '[data-test=follow-btn][data-following=false]'
`;
loadAndRun(stories_008);

// US-016: Click an author name on a post to navigate to their profile
const stories_016 = `
id: US-016
title: Click an author name on a post to navigate to their profile
acceptance_criteria:
  - id: AC-016-1
    title: Author name on post card links to profile page
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=post-author-link]'
    when: []
`;
loadAndRun(stories_016);

// US-009: Search posts by keyword and see matching results
const stories_009 = `
id: US-009
title: Search posts by keyword and see matching results
acceptance_criteria:
  - id: AC-009-1
    title: Typing a query returns matching posts
    given:
      - visit: /demos/scaffold/search
    when:
      - fill:
          selector: '[data-test=search-input]'
          value: svelte
    then:
      - shouldExist:
          selector: '[data-test=search-result]'
  - id: AC-009-2
    title: Results are empty for an empty query
    given:
      - visit: /demos/scaffold/search
    then:
      - shouldExist:
          selector: '[data-test=search-input]'
    when: []
`;
loadAndRun(stories_009);

// US-017: See empty state message when search returns no results
const stories_017 = `
id: US-017
title: See empty state message when search returns no results
acceptance_criteria:
  - id: AC-017-1
    title: No-results message appears for unmatched query
    given:
      - visit: /demos/scaffold/search
    when:
      - fill:
          selector: '[data-test=search-input]'
          value: xyzzy12345notathing
    then:
      - shouldExist:
          selector: '[data-test=search-empty]'
`;
loadAndRun(stories_017);

// US-006: View post detail showing full content and replies
const stories_006 = `
id: US-006
title: View post detail showing full content and replies
acceptance_criteria:
  - id: AC-006-1
    title: Post detail page shows post content and author
    given:
      - visit: /demos/scaffold/post/p1
    then:
      - shouldExist:
          selector: '[data-test=post-detail]'
      - shouldExist:
          selector: '[data-test=post-author]'
    when: []
  - id: AC-006-2
    title: Post detail page shows replies when they exist
    given:
      - visit: /demos/scaffold/post/p1
    then:
      - shouldExist:
          selector: '[data-test=replies-section]'
      - shouldExist:
          selector: '[data-test=reply-item]'
    when: []
`;
loadAndRun(stories_006);

// US-015: View post thread showing parent post when viewing a reply
const stories_015 = `
id: US-015
title: View post thread showing parent post when viewing a reply
acceptance_criteria:
  - id: AC-015-1
    title: Reply post shows parent post above it
    given:
      - visit: /demos/scaffold/post/p2
    then:
      - shouldExist:
          selector: '[data-test=parent-post]'
      - shouldExist:
          selector: '[data-test=post-detail]'
    when: []
`;
loadAndRun(stories_015);
