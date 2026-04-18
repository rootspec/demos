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

// ─── Feed Stories ───────────────────────────────────────────────────────────

const feedStories = `
id: US-101
title: View home feed
acceptance_criteria:
  - id: AC-101-1
    title: Home feed displays posts
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=post-card]' }
  - id: AC-101-2
    title: Post card shows author handle
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=post-author-handle]' }
  - id: AC-101-3
    title: Post card links to thread detail
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=post-content-link]' }
---
id: US-102
title: Load more posts
acceptance_criteria:
  - id: AC-102-1
    title: Load More button is visible when posts remain
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=load-more-btn]' }
  - id: AC-102-2
    title: Clicking Load More shows additional posts
    given:
      - visit: '/demos/scaffold/'
    when:
      - click: { selector: '[data-test=load-more-btn]' }
    then:
      - shouldExist: { selector: '[data-test=post-card]' }
---
id: US-103
title: Like a post
acceptance_criteria:
  - id: AC-103-1
    title: Like button exists on post cards
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=like-btn]' }
  - id: AC-103-2
    title: Clicking like marks post as liked
    given:
      - visit: '/demos/scaffold/'
    when:
      - click: { selector: '[data-test=like-btn]' }
    then:
      - shouldExist: { selector: '[data-test=like-btn][data-liked=true]' }
---
id: US-104
title: Bookmark a post
acceptance_criteria:
  - id: AC-104-1
    title: Bookmark button exists on post cards
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=bookmark-btn]' }
  - id: AC-104-2
    title: Clicking bookmark marks post as bookmarked
    given:
      - visit: '/demos/scaffold/'
    when:
      - click: { selector: '[data-test=bookmark-btn]' }
    then:
      - shouldExist: { selector: '[data-test=bookmark-btn][data-bookmarked=true]' }
---
id: US-105
title: Compose a new post
acceptance_criteria:
  - id: AC-105-1
    title: Post composer is visible on home feed
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=post-composer]' }
  - id: AC-105-2
    title: Submit button disabled when textarea is empty
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=compose-submit][disabled]' }
  - id: AC-105-3
    title: Submitting a post adds it to the feed
    given:
      - visit: '/demos/scaffold/'
    when:
      - fill: { selector: '[data-test=compose-textarea]', value: 'Hello from the composer!' }
      - click: { selector: '[data-test=compose-submit]' }
    then:
      - shouldContain: { selector: '[data-test=post-card]', text: 'Hello from the composer!' }
---
id: US-106
title: View post thread detail
acceptance_criteria:
  - id: AC-106-1
    title: Post detail page shows post content
    given:
      - visit: '/demos/scaffold/post/p1'
    when: []
    then:
      - shouldExist: { selector: '[data-test=post-detail]' }
  - id: AC-106-2
    title: Post detail shows replies when they exist
    given:
      - visit: '/demos/scaffold/post/p2'
    when: []
    then:
      - shouldExist: { selector: '[data-test=replies-section]' }
`;
loadAndRun(feedStories);

// ─── Profile Stories ─────────────────────────────────────────────────────────

const profileStories = `
id: US-201
title: View user profile
acceptance_criteria:
  - id: AC-201-1
    title: Profile page shows display name
    given:
      - visit: '/demos/scaffold/profile/alice.dev'
    when: []
    then:
      - shouldExist: { selector: '[data-test=profile-display-name]' }
  - id: AC-201-2
    title: Profile page shows user handle
    given:
      - visit: '/demos/scaffold/profile/alice.dev'
    when: []
    then:
      - shouldContain: { selector: '[data-test=profile-handle]', text: '@alice.dev' }
  - id: AC-201-3
    title: Profile page shows user bio
    given:
      - visit: '/demos/scaffold/profile/alice.dev'
    when: []
    then:
      - shouldExist: { selector: '[data-test=profile-bio]' }
  - id: AC-201-4
    title: Profile page shows user posts
    given:
      - visit: '/demos/scaffold/profile/alice.dev'
    when: []
    then:
      - shouldExist: { selector: '[data-test=profile-posts]' }
---
id: US-202
title: Follow a user
acceptance_criteria:
  - id: AC-202-1
    title: Follow button is visible on profile page
    given:
      - visit: '/demos/scaffold/profile/alice.dev'
    when: []
    then:
      - shouldExist: { selector: '[data-test=follow-btn]' }
  - id: AC-202-2
    title: Clicking follow changes button to unfollow
    given:
      - visit: '/demos/scaffold/profile/alice.dev'
    when:
      - click: { selector: '[data-test=follow-btn]' }
    then:
      - shouldExist: { selector: '[data-test=follow-btn][data-following=true]' }
`;
loadAndRun(profileStories);

// ─── Discovery Stories ────────────────────────────────────────────────────────

const discoveryStories = `
id: US-301
title: Search posts by keyword
acceptance_criteria:
  - id: AC-301-1
    title: Search input is present on search page
    given:
      - visit: '/demos/scaffold/search'
    when: []
    then:
      - shouldExist: { selector: '[data-test=search-input]' }
  - id: AC-301-2
    title: Typing a keyword shows matching posts
    given:
      - visit: '/demos/scaffold/search'
    when:
      - fill: { selector: '[data-test=search-input]', value: 'TypeScript' }
    then:
      - shouldExist: { selector: '[data-test=search-result]' }
  - id: AC-301-3
    title: No results message shown when no matches
    given:
      - visit: '/demos/scaffold/search'
    when:
      - fill: { selector: '[data-test=search-input]', value: 'xyzzy12345nomatch' }
    then:
      - shouldExist: { selector: '[data-test=search-no-results]' }
---
id: US-302
title: Browse explore page
acceptance_criteria:
  - id: AC-302-1
    title: Explore page shows trending tags
    given:
      - visit: '/demos/scaffold/explore'
    when: []
    then:
      - shouldExist: { selector: '[data-test=trending-tags]' }
  - id: AC-302-2
    title: Explore page shows suggested users
    given:
      - visit: '/demos/scaffold/explore'
    when: []
    then:
      - shouldExist: { selector: '[data-test=suggested-users]' }
  - id: AC-302-3
    title: Explore page shows popular posts
    given:
      - visit: '/demos/scaffold/explore'
    when: []
    then:
      - shouldExist: { selector: '[data-test=popular-posts]' }
---
id: US-303
title: Filter explore by tag
acceptance_criteria:
  - id: AC-303-1
    title: Clicking a tag filters the post list
    given:
      - visit: '/demos/scaffold/explore'
    when:
      - click: { selector: '[data-test=tag-chip]' }
    then:
      - shouldExist: { selector: '[data-test=tag-chip][data-active=true]' }
`;
loadAndRun(discoveryStories);

// ─── Meta Stories ─────────────────────────────────────────────────────────────

const metaStories = `
id: US-401
title: See meta banner on every page
acceptance_criteria:
  - id: AC-401-1
    title: Meta banner is visible on home page
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=meta-banner]' }
  - id: AC-401-2
    title: Meta banner contains link to spec
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=meta-banner-spec-link]' }
  - id: AC-401-3
    title: Meta banner is visible on explore page
    given:
      - visit: '/demos/scaffold/explore'
    when: []
    then:
      - shouldExist: { selector: '[data-test=meta-banner]' }
---
id: US-402
title: Toggle dark and light theme
acceptance_criteria:
  - id: AC-402-1
    title: Theme toggle button is visible in the nav
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=theme-toggle]' }
  - id: AC-402-2
    title: Clicking theme toggle changes the theme
    given:
      - visit: '/demos/scaffold/'
    when:
      - click: { selector: '[data-test=theme-toggle]' }
    then:
      - shouldExist: { selector: 'html[data-theme]' }
`;
loadAndRun(metaStories);

// ─── Thread Stories ───────────────────────────────────────────────────────────

const threadStories = `
id: US-501
title: View parent post context in thread
acceptance_criteria:
  - id: AC-501-1
    title: Thread detail shows parent post when reply
    given:
      - visit: '/demos/scaffold/post/p9'
    when: []
    then:
      - shouldExist: { selector: '[data-test=parent-post]' }
---
id: US-502
title: Like a post from the thread detail page
acceptance_criteria:
  - id: AC-502-1
    title: Like button exists on thread detail
    given:
      - visit: '/demos/scaffold/post/p1'
    when: []
    then:
      - shouldExist: { selector: '[data-test=like-btn]' }
  - id: AC-502-2
    title: Clicking like on thread detail marks post as liked
    given:
      - visit: '/demos/scaffold/post/p1'
    when:
      - click: { selector: '[data-test=like-btn]' }
    then:
      - shouldExist: { selector: '[data-test=like-btn][data-liked=true]' }
`;
loadAndRun(threadStories);
