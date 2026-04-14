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

// US-010: Browse trending tags on the Explore page and filter posts by tag
const stories_010 = `
id: US-010
title: Browse trending tags on the Explore page and filter posts by tag
acceptance_criteria:
  - id: AC-010-1
    title: Explore page shows trending tags
    given:
      - visit: /demos/scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=tag-chip]'
    when: []
  - id: AC-010-2
    title: Clicking a tag filters the posts shown
    given:
      - visit: /demos/scaffold/explore
    when:
      - click:
          selector: '[data-test=tag-chip]'
    then:
      - shouldExist:
          selector: '[data-test=tag-chip].selected'
      - shouldExist:
          selector: '[data-test=filtered-posts]'
  - id: AC-010-3
    title: Explore page shows suggested users
    given:
      - visit: /demos/scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=suggested-user]'
    when: []
`;
loadAndRun(stories_010);

// US-001: View home feed with posts and author info
const stories_001 = `
id: US-001
title: View home feed with posts and author info
acceptance_criteria:
  - id: AC-001-1
    title: Home feed shows posts with author and content
    given:
      - visit: /demos/scaffold
    then:
      - shouldExist:
          selector: '[data-test=post-card]'
      - shouldExist:
          selector: '[data-test=post-author]'
      - shouldExist:
          selector: '[data-test=post-content]'
    when: []
  - id: AC-001-2
    title: Posts show timestamp and engagement counts
    given:
      - visit: /demos/scaffold
    then:
      - shouldExist:
          selector: '[data-test=post-timestamp]'
      - shouldExist:
          selector: '[data-test=like-count]'
      - shouldExist:
          selector: '[data-test=repost-count]'
    when: []
`;
loadAndRun(stories_001);

// US-002: Like a post on the home feed
const stories_002 = `
id: US-002
title: Like a post on the home feed
acceptance_criteria:
  - id: AC-002-1
    title: Like button toggles active state
    given:
      - visit: /demos/scaffold
    when:
      - click:
          selector: '[data-test=like-button]'
    then:
      - shouldExist:
          selector: '[data-test=like-button].active'
`;
loadAndRun(stories_002);

// US-003: Bookmark a post on the home feed
const stories_003 = `
id: US-003
title: Bookmark a post on the home feed
acceptance_criteria:
  - id: AC-003-1
    title: Bookmark button toggles active state
    given:
      - visit: /demos/scaffold
    when:
      - click:
          selector: '[data-test=bookmark-button]'
    then:
      - shouldExist:
          selector: '[data-test=bookmark-button].active'
`;
loadAndRun(stories_003);

// US-004: Compose a new post that appears in the feed
const stories_004 = `
id: US-004
title: Compose a new post that appears in the feed
acceptance_criteria:
  - id: AC-004-1
    title: Composer is present on home page
    given:
      - visit: /demos/scaffold
    then:
      - shouldExist:
          selector: '[data-test=composer]'
      - shouldExist:
          selector: '[data-test=composer-input]'
      - shouldExist:
          selector: '[data-test=composer-submit]'
    when: []
  - id: AC-004-2
    title: Composing a post adds it to the feed
    given:
      - visit: /demos/scaffold
    when:
      - fill:
          selector: '[data-test=composer-input]'
          value: Hello from the composer
      - click:
          selector: '[data-test=composer-submit]'
    then:
      - shouldContain:
          selector: '[data-test=post-content]'
          text: Hello from the composer
  - id: AC-004-3
    title: Submitting empty post shows error
    given:
      - visit: /demos/scaffold
    when:
      - click:
          selector: '[data-test=composer-submit]'
    then:
      - shouldExist:
          selector: '[data-test=composer-error]'
`;
loadAndRun(stories_004);

// US-005: Load additional posts by clicking Load more
const stories_005 = `
id: US-005
title: Load additional posts by clicking Load more
acceptance_criteria:
  - id: AC-005-1
    title: Load more button appears and loads additional posts
    given:
      - visit: /demos/scaffold
    when:
      - click:
          selector: '[data-test=load-more]'
    then:
      - shouldExist:
          selector: '[data-test=post-card]'
`;
loadAndRun(stories_005);

// US-011: Toggle between dark and light mode using the theme button in the nav
const stories_011 = `
id: US-011
title: Toggle between dark and light mode using the theme button in the nav
acceptance_criteria:
  - id: AC-011-1
    title: Meta banner is present on every page
    given:
      - visit: /demos/scaffold
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
      - shouldExist:
          selector: '[data-test=seed-link]'
      - shouldExist:
          selector: '[data-test=spec-link]'
      - shouldExist:
          selector: '[data-test=scaffold-link]'
    when: []
  - id: AC-011-2
    title: Theme toggle button is present in navigation
    given:
      - visit: /demos/scaffold
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-011-3
    title: Clicking theme toggle switches the active class on html element
    given:
      - visit: /demos/scaffold
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: html.dark
`;
loadAndRun(stories_011);

// US-007: View a user profile with bio, counts, and posts
const stories_007 = `
id: US-007
title: View a user profile with bio, counts, and posts
acceptance_criteria:
  - id: AC-007-1
    title: Profile page shows user info and posts
    given:
      - visit: /demos/scaffold
    when:
      - click:
          selector: '[data-test=post-author]'
    then:
      - shouldExist:
          selector: '[data-test=user-display-name]'
      - shouldExist:
          selector: '[data-test=user-handle]'
      - shouldExist:
          selector: '[data-test=user-bio]'
  - id: AC-007-2
    title: Profile page shows follower counts
    given:
      - visit: /demos/scaffold/profile/alice.dev
    then:
      - shouldExist:
          selector: '[data-test=follower-count]'
      - shouldExist:
          selector: '[data-test=following-count]'
    when: []
`;
loadAndRun(stories_007);

// US-008: Follow and unfollow a user from their profile page
const stories_008 = `
id: US-008
title: Follow and unfollow a user from their profile page
acceptance_criteria:
  - id: AC-008-1
    title: Follow button is present on profile pages
    given:
      - visit: /demos/scaffold/profile/bobwrites
    then:
      - shouldExist:
          selector: '[data-test=follow-button]'
    when: []
  - id: AC-008-2
    title: Clicking follow updates button to Following state
    given:
      - visit: /demos/scaffold/profile/bobwrites
    when:
      - click:
          selector: '[data-test=follow-button]'
    then:
      - shouldContain:
          selector: '[data-test=follow-button]'
          text: Following
`;
loadAndRun(stories_008);

// US-009: Search for posts using a keyword and see results update live
const stories_009 = `
id: US-009
title: Search for posts using a keyword and see results update live
acceptance_criteria:
  - id: AC-009-1
    title: Search input is present on search page
    given:
      - visit: /demos/scaffold/search
    then:
      - shouldExist:
          selector: '[data-test=search-input]'
    when: []
  - id: AC-009-2
    title: Typing a keyword shows matching posts
    given:
      - visit: /demos/scaffold/search
    when:
      - fill:
          selector: '[data-test=search-input]'
          value: rust
    then:
      - shouldExist:
          selector: '[data-test=search-result]'
  - id: AC-009-3
    title: Searching with no matches shows empty state message
    given:
      - visit: /demos/scaffold/search
    when:
      - fill:
          selector: '[data-test=search-input]'
          value: xyzzy12345notaword
    then:
      - shouldExist:
          selector: '[data-test=search-empty]'
`;
loadAndRun(stories_009);

// US-006: View a single post with its full thread context
const stories_006 = `
id: US-006
title: View a single post with its full thread context
acceptance_criteria:
  - id: AC-006-1
    title: Post detail page shows post content and author
    given:
      - visit: /demos/scaffold
    when:
      - click:
          selector: '[data-test=post-content]'
    then:
      - shouldExist:
          selector: '[data-test=post-content]'
      - shouldExist:
          selector: '[data-test=post-author]'
`;
loadAndRun(stories_006);
