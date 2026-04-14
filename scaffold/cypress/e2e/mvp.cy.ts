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

// US-060: View trending tags on the explore page
const stories_060 = `
id: US-060
title: View trending tags on the explore page
acceptance_criteria:
  - id: AC-060-1
    title: Explore page shows a list of trending tags
    given:
      - visit: /demos/scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=tag-chip]'
    when: []
  - id: AC-060-2
    title: Tags show their post count
    given:
      - visit: /demos/scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=tag-post-count]'
    when: []
`;
loadAndRun(stories_060);

// US-061: Filter posts by tag on the explore page
const stories_061 = `
id: US-061
title: Filter posts by tag on the explore page
acceptance_criteria:
  - id: AC-061-1
    title: Clicking a tag filters the post list
    given:
      - visit: /demos/scaffold/explore
    when:
      - click:
          selector: '[data-test=tag-chip]'
    then:
      - shouldExist:
          selector: '[data-test=explore-post]'
      - shouldExist:
          selector: '[data-test=tag-chip][data-active=true]'
  - id: AC-061-2
    title: Clicking the active tag again clears the filter
    given:
      - visit: /demos/scaffold/explore
    when:
      - click:
          selector: '[data-test=tag-chip]'
      - click:
          selector: '[data-test=tag-chip][data-active=true]'
    then:
      - shouldExist:
          selector: '[data-test=explore-post]'
`;
loadAndRun(stories_061);

// US-062: View suggested users on the explore page
const stories_062 = `
id: US-062
title: View suggested users on the explore page
acceptance_criteria:
  - id: AC-062-1
    title: Explore page shows a list of suggested users
    given:
      - visit: /demos/scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=suggested-user]'
    when: []
  - id: AC-062-2
    title: Suggested user cards show display name, handle, and bio
    given:
      - visit: /demos/scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=suggested-user-name]'
      - shouldExist:
          selector: '[data-test=suggested-user-handle]'
    when: []
  - id: AC-062-3
    title: Suggested user names link to profile pages
    given:
      - visit: /demos/scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=suggested-user-link]'
    when: []
`;
loadAndRun(stories_062);

// US-010: See a list of posts on the home feed
const stories_010 = `
id: US-010
title: See a list of posts on the home feed
acceptance_criteria:
  - id: AC-010-1
    title: Home feed displays posts
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=post-card]'
    when: []
  - id: AC-010-2
    title: Posts show author display name and handle
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=post-author-name]'
      - shouldExist:
          selector: '[data-test=post-author-handle]'
    when: []
  - id: AC-010-3
    title: Posts show like and repost counts
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=post-like-count]'
      - shouldExist:
          selector: '[data-test=post-repost-count]'
    when: []
`;
loadAndRun(stories_010);

// US-011: Load more posts by clicking "Load more"
const stories_011 = `
id: US-011
title: Load more posts by clicking "Load more"
acceptance_criteria:
  - id: AC-011-1
    title: Load more button is visible when more posts exist
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=load-more-btn]'
    when: []
  - id: AC-011-2
    title: Clicking Load more shows additional posts
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=load-more-btn]'
    then:
      - shouldExist:
          selector: '[data-test=post-card]'
`;
loadAndRun(stories_011);

// US-012: Like a post to toggle like state
const stories_012 = `
id: US-012
title: Like a post to toggle like state
acceptance_criteria:
  - id: AC-012-1
    title: Like button is visible on each post
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=like-btn]'
    when: []
  - id: AC-012-2
    title: Clicking like toggles the liked state
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=like-btn]'
    then:
      - shouldExist:
          selector: '[data-test=like-btn][data-liked=true]'
`;
loadAndRun(stories_012);

// US-013: Bookmark a post to toggle bookmark state
const stories_013 = `
id: US-013
title: Bookmark a post to toggle bookmark state
acceptance_criteria:
  - id: AC-013-1
    title: Bookmark button is visible on each post
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=bookmark-btn]'
    when: []
  - id: AC-013-2
    title: Clicking bookmark toggles the bookmarked state
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=bookmark-btn]'
    then:
      - shouldExist:
          selector: '[data-test=bookmark-btn][data-bookmarked=true]'
`;
loadAndRun(stories_013);

// US-014: Compose and publish a new post in the feed
const stories_014 = `
id: US-014
title: Compose and publish a new post in the feed
acceptance_criteria:
  - id: AC-014-1
    title: Compose button is visible on home feed
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=compose-btn]'
    when: []
  - id: AC-014-2
    title: Clicking compose reveals the composer input
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=compose-btn]'
    then:
      - shouldExist:
          selector: '[data-test=composer-input]'
  - id: AC-014-3
    title: Submitting a composed post adds it to the feed
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=compose-btn]'
      - fill:
          selector: '[data-test=composer-input]'
          value: Hello from the composer!
      - click:
          selector: '[data-test=composer-submit]'
    then:
      - shouldContain:
          selector: '[data-test=post-card]'
          text: Hello from the composer!
`;
loadAndRun(stories_014);

// US-001: See the meta banner on the home page
const stories_001 = `
id: US-001
title: See the meta banner on the home page
acceptance_criteria:
  - id: AC-001-1
    title: Meta banner is visible on home page
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-001-2
    title: Meta banner contains link to scaffold commit
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=banner-scaffold-link]'
    when: []
  - id: AC-001-3
    title: Meta banner contains link to the spec
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=banner-spec-link]'
    when: []
  - id: AC-001-4
    title: Meta banner contains link to the seed
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=banner-seed-link]'
    when: []
`;
loadAndRun(stories_001);

// US-002: See the RootSpec version in the navigation
const stories_002 = `
id: US-002
title: See the RootSpec version in the navigation
acceptance_criteria:
  - id: AC-002-1
    title: RootSpec version badge is visible in nav
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=version-badge]'
    when: []
`;
loadAndRun(stories_002);

// US-003: Navigate between main routes using the navigation bar
const stories_003 = `
id: US-003
title: Navigate between main routes using the navigation bar
acceptance_criteria:
  - id: AC-003-1
    title: Navigation bar shows Home, Explore, and Search links
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
`;
loadAndRun(stories_003);

// US-004: See the footer attribution on every page
const stories_004 = `
id: US-004
title: See the footer attribution on every page
acceptance_criteria:
  - id: AC-004-1
    title: Footer is visible on home page
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=footer]'
    when: []
  - id: AC-004-2
    title: Footer contains RootSpec version
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=footer-version]'
    when: []
`;
loadAndRun(stories_004);

// US-005: Toggle between dark and light theme
const stories_005 = `
id: US-005
title: Toggle between dark and light theme
acceptance_criteria:
  - id: AC-005-1
    title: Theme toggle button is visible in the navigation bar
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-005-2
    title: Clicking the theme toggle switches the active theme
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=theme-toggle]'
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
`;
loadAndRun(stories_005);

// US-030: View a user's profile page
const stories_030 = `
id: US-030
title: View a user's profile page
acceptance_criteria:
  - id: AC-030-1
    title: Profile page shows display name and handle
    given:
      - visit: /demos/scaffold/profile/alice.dev
    then:
      - shouldContain:
          selector: '[data-test=profile-name]'
          text: Alice Chen
      - shouldExist:
          selector: '[data-test=profile-handle]'
    when: []
  - id: AC-030-2
    title: Profile page shows bio
    given:
      - visit: /demos/scaffold/profile/alice.dev
    then:
      - shouldExist:
          selector: '[data-test=profile-bio]'
    when: []
  - id: AC-030-3
    title: Profile page shows follower and following counts
    given:
      - visit: /demos/scaffold/profile/alice.dev
    then:
      - shouldExist:
          selector: '[data-test=profile-follower-count]'
      - shouldExist:
          selector: '[data-test=profile-following-count]'
    when: []
  - id: AC-030-4
    title: Profile page shows a list of the user's posts
    given:
      - visit: /demos/scaffold/profile/alice.dev
    then:
      - shouldExist:
          selector: '[data-test=profile-post]'
    when: []
`;
loadAndRun(stories_030);

// US-031: Follow and unfollow a user from their profile
const stories_031 = `
id: US-031
title: Follow and unfollow a user from their profile
acceptance_criteria:
  - id: AC-031-1
    title: Follow button is visible on profile page
    given:
      - visit: /demos/scaffold/profile/alice.dev
    then:
      - shouldExist:
          selector: '[data-test=follow-btn]'
    when: []
  - id: AC-031-2
    title: Clicking Follow changes button to Unfollow
    given:
      - visit: /demos/scaffold/profile/alice.dev
    when:
      - click:
          selector: '[data-test=follow-btn]'
    then:
      - shouldContain:
          selector: '[data-test=follow-btn]'
          text: Unfollow
  - id: AC-031-3
    title: Clicking Unfollow changes button back to Follow
    given:
      - visit: /demos/scaffold/profile/alice.dev
    when:
      - click:
          selector: '[data-test=follow-btn]'
      - click:
          selector: '[data-test=follow-btn]'
    then:
      - shouldContain:
          selector: '[data-test=follow-btn]'
          text: Follow
`;
loadAndRun(stories_031);

// US-032: Navigate to a user profile from a post card
const stories_032 = `
id: US-032
title: Navigate to a user profile from a post card
acceptance_criteria:
  - id: AC-032-1
    title: Author name in post card links to profile
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=post-author-link]'
    when: []
`;
loadAndRun(stories_032);

// US-050: Search posts by keyword
const stories_050 = `
id: US-050
title: Search posts by keyword
acceptance_criteria:
  - id: AC-050-1
    title: Search page has a text input
    given:
      - visit: /demos/scaffold/search
    then:
      - shouldExist:
          selector: '[data-test=search-input]'
    when: []
  - id: AC-050-2
    title: Typing a keyword shows matching posts
    given:
      - visit: /demos/scaffold/search
    when:
      - fill:
          selector: '[data-test=search-input]'
          value: the
    then:
      - shouldExist:
          selector: '[data-test=search-result]'
  - id: AC-050-3
    title: Typing a keyword with no matches shows an empty state message
    given:
      - visit: /demos/scaffold/search
    when:
      - fill:
          selector: '[data-test=search-input]'
          value: xyzzy_no_match_12345
    then:
      - shouldExist:
          selector: '[data-test=search-empty]'
  - id: AC-050-4
    title: Empty search input shows no results
    given:
      - visit: /demos/scaffold/search
    then:
      - shouldExist:
          selector: '[data-test=search-input]'
    when: []
`;
loadAndRun(stories_050);

// US-040: View a single post and its replies
const stories_040 = `
id: US-040
title: View a single post and its replies
acceptance_criteria:
  - id: AC-040-1
    title: Post detail page shows the main post content
    given:
      - visit: /demos/scaffold/post/p1
    then:
      - shouldExist:
          selector: '[data-test=post-detail-content]'
    when: []
  - id: AC-040-2
    title: Post detail page shows the author
    given:
      - visit: /demos/scaffold/post/p1
    then:
      - shouldExist:
          selector: '[data-test=post-detail-author]'
    when: []
  - id: AC-040-3
    title: Post detail page shows replies when they exist
    given:
      - visit: /demos/scaffold/post/p1
    then:
      - shouldExist:
          selector: '[data-test=reply-card]'
    when: []
`;
loadAndRun(stories_040);

// US-041: Navigate to a post detail page from the feed
const stories_041 = `
id: US-041
title: Navigate to a post detail page from the feed
acceptance_criteria:
  - id: AC-041-1
    title: Post content in feed card links to post detail
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=post-card-link]'
    when: []
`;
loadAndRun(stories_041);

// US-042: See like and repost counts on a post detail page
const stories_042 = `
id: US-042
title: See like and repost counts on a post detail page
acceptance_criteria:
  - id: AC-042-1
    title: Post detail shows like and repost counts
    given:
      - visit: /demos/scaffold/post/p1
    then:
      - shouldExist:
          selector: '[data-test=post-detail-like-count]'
      - shouldExist:
          selector: '[data-test=post-detail-repost-count]'
    when: []
`;
loadAndRun(stories_042);
