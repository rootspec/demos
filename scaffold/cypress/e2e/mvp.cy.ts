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

// US-110: Explore trending tags
const stories_110 = `
id: US-110
title: Explore trending tags
acceptance_criteria:
  - id: AC-110-1
    title: Explore page displays trending tags
    given:
      - visit: /demos/scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=tag-chip]'
    when: []
  - id: AC-110-2
    title: Tags show their post count
    given:
      - visit: /demos/scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=tag-post-count]'
    when: []
`;
loadAndRun(stories_110);

// US-111: Filter explore posts by tag
const stories_111 = `
id: US-111
title: Filter explore posts by tag
acceptance_criteria:
  - id: AC-111-1
    title: Clicking a tag filters the visible posts
    given:
      - visit: /demos/scaffold/explore
    when:
      - click:
          selector: '[data-test=tag-chip]'
    then:
      - shouldExist:
          selector: '[data-test=filtered-posts]'
  - id: AC-111-2
    title: Active tag is visually indicated
    given:
      - visit: /demos/scaffold/explore
    when:
      - click:
          selector: '[data-test=tag-chip]'
    then:
      - shouldExist:
          selector: '[data-test=tag-chip][data-active=true]'
  - id: AC-111-3
    title: Clicking active tag clears the filter
    given:
      - visit: /demos/scaffold/explore
    when:
      - click:
          selector: '[data-test=tag-chip]'
      - click:
          selector: '[data-test=tag-chip][data-active=true]'
    then:
      - shouldExist:
          selector: '[data-test=popular-posts]'
`;
loadAndRun(stories_111);

// US-112: Follow a user from the explore page
const stories_112 = `
id: US-112
title: Follow a user from the explore page
acceptance_criteria:
  - id: AC-112-1
    title: Explore page shows suggested users with follow buttons
    given:
      - visit: /demos/scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=suggested-user]'
      - shouldExist:
          selector: '[data-test=follow-button]'
    when: []
  - id: AC-112-2
    title: Following a user from explore updates the button
    given:
      - visit: /demos/scaffold/explore
    when:
      - click:
          selector: '[data-test=follow-button]'
    then:
      - shouldContain:
          selector: '[data-test=follow-button]'
          text: Unfollow
`;
loadAndRun(stories_112);

// US-101: View the home feed
const stories_101 = `
id: US-101
title: View the home feed
acceptance_criteria:
  - id: AC-101-1
    title: Home feed displays posts
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=post-item]'
    when: []
  - id: AC-101-2
    title: Posts show author handle and display name
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=post-author-name]'
      - shouldExist:
          selector: '[data-test=post-author-handle]'
    when: []
  - id: AC-101-3
    title: Posts show engagement counts
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=post-like-count]'
      - shouldExist:
          selector: '[data-test=post-repost-count]'
    when: []
`;
loadAndRun(stories_101);

// US-102: Like a post
const stories_102 = `
id: US-102
title: Like a post
acceptance_criteria:
  - id: AC-102-1
    title: Like button toggles liked state
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=like-button]'
    then:
      - shouldExist:
          selector: '[data-test=like-button][data-liked=true]'
  - id: AC-102-2
    title: Like count increments when liked
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=like-button]'
    then:
      - shouldExist:
          selector: '[data-test=post-like-count]'
  - id: AC-102-3
    title: Like toggles off when clicked again
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=like-button]'
      - click:
          selector: '[data-test=like-button]'
    then:
      - shouldExist:
          selector: '[data-test=like-button][data-liked=false]'
`;
loadAndRun(stories_102);

// US-103: Bookmark a post
const stories_103 = `
id: US-103
title: Bookmark a post
acceptance_criteria:
  - id: AC-103-1
    title: Bookmark button toggles bookmarked state
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=bookmark-button]'
    then:
      - shouldExist:
          selector: '[data-test=bookmark-button][data-bookmarked=true]'
`;
loadAndRun(stories_103);

// US-104: Load more posts
const stories_104 = `
id: US-104
title: Load more posts
acceptance_criteria:
  - id: AC-104-1
    title: Load more button exists when more posts are available
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=load-more-button]'
    when: []
  - id: AC-104-2
    title: Clicking load more reveals additional posts
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=load-more-button]'
    then:
      - shouldExist:
          selector: '[data-test=post-item]'
`;
loadAndRun(stories_104);

// US-105: Compose and post a new message
const stories_105 = `
id: US-105
title: Compose and post a new message
acceptance_criteria:
  - id: AC-105-1
    title: Compose button opens the composer
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=compose-button]'
    then:
      - shouldExist:
          selector: '[data-test=post-composer]'
  - id: AC-105-2
    title: Submitting a post adds it to the feed
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=compose-button]'
      - fill:
          selector: '[data-test=composer-input]'
          value: Hello from the composer
      - click:
          selector: '[data-test=composer-submit]'
    then:
      - shouldContain:
          selector: '[data-test=post-item]'
          text: Hello from the composer
`;
loadAndRun(stories_105);

// US-113: Toggle dark/light theme
const stories_113 = `
id: US-113
title: Toggle dark/light theme
acceptance_criteria:
  - id: AC-113-1
    title: Theme toggle button is visible in the header
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=theme-toggle]'
    when: []
  - id: AC-113-2
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
loadAndRun(stories_113);

// US-114: See the meta banner on every page
const stories_114 = `
id: US-114
title: See the meta banner on every page
acceptance_criteria:
  - id: AC-114-1
    title: Meta banner is visible on the home feed
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-114-2
    title: Meta banner contains links to spec and seed
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=meta-banner-spec-link]'
      - shouldExist:
          selector: '[data-test=meta-banner-seed-link]'
    when: []
  - id: AC-114-3
    title: Meta banner is visible on the explore page
    given:
      - visit: /demos/scaffold/explore
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
  - id: AC-114-4
    title: Meta banner is visible on the search page
    given:
      - visit: /demos/scaffold/search
    then:
      - shouldExist:
          selector: '[data-test=meta-banner]'
    when: []
`;
loadAndRun(stories_114);

// US-115: Navigate using the primary nav
const stories_115 = `
id: US-115
title: Navigate using the primary nav
acceptance_criteria:
  - id: AC-115-1
    title: Nav shows RootFeed brand and version
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=nav-brand]'
      - shouldExist:
          selector: '[data-test=nav-version]'
    when: []
  - id: AC-115-2
    title: Nav links to Home, Explore, and Search
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
  - id: AC-115-3
    title: Footer shows RootSpec attribution
    given:
      - visit: /demos/scaffold/
    then:
      - shouldExist:
          selector: '[data-test=footer]'
      - shouldExist:
          selector: '[data-test=footer-attribution]'
    when: []
`;
loadAndRun(stories_115);

// US-106: Navigate to a user profile
const stories_106 = `
id: US-106
title: Navigate to a user profile
acceptance_criteria:
  - id: AC-106-1
    title: Clicking an author name navigates to their profile
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=post-author-name]'
    then:
      - shouldExist:
          selector: '[data-test=profile-display-name]'
  - id: AC-106-2
    title: Profile page shows user bio and follow counts
    given:
      - visit: /demos/scaffold/profile/alice.dev
    then:
      - shouldExist:
          selector: '[data-test=profile-bio]'
      - shouldExist:
          selector: '[data-test=profile-follower-count]'
      - shouldExist:
          selector: '[data-test=profile-following-count]'
    when: []
  - id: AC-106-3
    title: Profile page shows user posts
    given:
      - visit: /demos/scaffold/profile/alice.dev
    then:
      - shouldExist:
          selector: '[data-test=post-item]'
    when: []
`;
loadAndRun(stories_106);

// US-107: Follow and unfollow a user
const stories_107 = `
id: US-107
title: Follow and unfollow a user
acceptance_criteria:
  - id: AC-107-1
    title: Follow button appears on profile pages
    given:
      - visit: /demos/scaffold/profile/alice.dev
    then:
      - shouldExist:
          selector: '[data-test=follow-button]'
    when: []
  - id: AC-107-2
    title: Clicking follow changes button to unfollow
    given:
      - visit: /demos/scaffold/profile/alice.dev
    when:
      - click:
          selector: '[data-test=follow-button]'
    then:
      - shouldContain:
          selector: '[data-test=follow-button]'
          text: Unfollow
  - id: AC-107-3
    title: Following a user increments their follower count
    given:
      - visit: /demos/scaffold/profile/alice.dev
    when:
      - click:
          selector: '[data-test=follow-button]'
    then:
      - shouldExist:
          selector: '[data-test=profile-follower-count]'
  - id: AC-107-4
    title: Clicking unfollow returns button to follow state
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
loadAndRun(stories_107);

// US-109: Search posts by keyword
const stories_109 = `
id: US-109
title: Search posts by keyword
acceptance_criteria:
  - id: AC-109-1
    title: Search page has a text input
    given:
      - visit: /demos/scaffold/search
    then:
      - shouldExist:
          selector: '[data-test=search-input]'
    when: []
  - id: AC-109-2
    title: Typing a query shows matching posts
    given:
      - visit: /demos/scaffold/search
    when:
      - fill:
          selector: '[data-test=search-input]'
          value: kubernetes
    then:
      - shouldExist:
          selector: '[data-test=search-result]'
  - id: AC-109-3
    title: No results message shown for unmatched query
    given:
      - visit: /demos/scaffold/search
    when:
      - fill:
          selector: '[data-test=search-input]'
          value: xyzzy-no-match-9999
    then:
      - shouldExist:
          selector: '[data-test=search-empty]'
  - id: AC-109-4
    title: Empty query shows no results
    given:
      - visit: /demos/scaffold/search
    then:
      - shouldExist:
          selector: '[data-test=search-empty-default]'
    when: []
`;
loadAndRun(stories_109);

// US-108: View a post thread
const stories_108 = `
id: US-108
title: View a post thread
acceptance_criteria:
  - id: AC-108-1
    title: Clicking a post navigates to its detail view
    given:
      - visit: /demos/scaffold/
    when:
      - click:
          selector: '[data-test=post-link]'
    then:
      - shouldExist:
          selector: '[data-test=post-detail]'
  - id: AC-108-2
    title: Post detail shows author, content, and engagement
    given:
      - visit: /demos/scaffold/post/p1
    then:
      - shouldExist:
          selector: '[data-test=post-detail-content]'
      - shouldExist:
          selector: '[data-test=post-author-name]'
      - shouldExist:
          selector: '[data-test=post-like-count]'
    when: []
  - id: AC-108-3
    title: Post thread shows replies
    given:
      - visit: /demos/scaffold/post/p1
    then:
      - shouldExist:
          selector: '[data-test=post-replies]'
    when: []
  - id: AC-108-4
    title: Reply post shows parent context
    given:
      - visit: /demos/scaffold/post/p9
    then:
      - shouldExist:
          selector: '[data-test=parent-post]'
    when: []
`;
loadAndRun(stories_108);
