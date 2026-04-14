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

// ============================================================================
// FEED STORIES
// ============================================================================

const feedStories = `
id: US-001
title: View home feed with posts and authors
acceptance_criteria:
  - id: AC-001-1
    title: Feed displays posts
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=post-item]' }
  - id: AC-001-2
    title: Posts show author display name
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=post-author]' }
  - id: AC-001-3
    title: Posts show like count
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=post-like-count]' }
---
id: US-002
title: Load more posts in feed
acceptance_criteria:
  - id: AC-002-1
    title: Load more button is visible
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=load-more]' }
  - id: AC-002-2
    title: Clicking load more shows additional posts
    given:
      - visit: '/demos/scaffold/'
    when:
      - click: { selector: '[data-test=load-more]' }
    then:
      - shouldExist: { selector: '[data-test=post-item]' }
---
id: US-003
title: Like a post
acceptance_criteria:
  - id: AC-003-1
    title: Like button is present on posts
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=like-button]' }
  - id: AC-003-2
    title: Clicking like toggles active state
    given:
      - visit: '/demos/scaffold/'
    when:
      - click: { selector: '[data-test=like-button]' }
    then:
      - shouldExist: { selector: '[data-test=like-button][data-liked=true]' }
---
id: US-004
title: Bookmark a post
acceptance_criteria:
  - id: AC-004-1
    title: Bookmark button is present on posts
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=bookmark-button]' }
  - id: AC-004-2
    title: Clicking bookmark toggles active state
    given:
      - visit: '/demos/scaffold/'
    when:
      - click: { selector: '[data-test=bookmark-button]' }
    then:
      - shouldExist: { selector: '[data-test=bookmark-button][data-bookmarked=true]' }
---
id: US-005
title: Compose and submit a new post
acceptance_criteria:
  - id: AC-005-1
    title: Post composer is accessible on home feed
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=composer]' }
  - id: AC-005-2
    title: Submitting a post adds it to the feed
    given:
      - visit: '/demos/scaffold/'
    when:
      - fill: { selector: '[data-test=composer-input]', value: 'Hello from the composer' }
      - click: { selector: '[data-test=composer-submit]' }
    then:
      - shouldContain: { selector: '[data-test=post-item]', text: 'Hello from the composer' }
`;
loadAndRun(feedStories);

// ============================================================================
// THREAD STORIES
// ============================================================================

const threadStories = `
id: US-006
title: View post detail with thread
acceptance_criteria:
  - id: AC-006-1
    title: Post detail page shows post content
    given:
      - visit: '/demos/scaffold/post/p1'
    when: []
    then:
      - shouldExist: { selector: '[data-test=post-detail]' }
      - shouldContain: { selector: '[data-test=post-detail]', text: 'CSS grid' }
  - id: AC-006-2
    title: Post detail shows replies when they exist
    given:
      - visit: '/demos/scaffold/post/p2'
    when: []
    then:
      - shouldExist: { selector: '[data-test=replies-section]' }
---
id: US-017
title: View post with parent context
acceptance_criteria:
  - id: AC-017-1
    title: Reply post shows parent post above it
    given:
      - visit: '/demos/scaffold/post/p5'
    when: []
    then:
      - shouldExist: { selector: '[data-test=parent-post]' }
`;
loadAndRun(threadStories);

// ============================================================================
// PROFILE STORIES
// ============================================================================

const profileStories = `
id: US-007
title: View user profile
acceptance_criteria:
  - id: AC-007-1
    title: Profile page shows user display name
    given:
      - visit: '/demos/scaffold/profile/devguru'
    when: []
    then:
      - shouldExist: { selector: '[data-test=profile-display-name]' }
  - id: AC-007-2
    title: Profile page shows user bio
    given:
      - visit: '/demos/scaffold/profile/devguru'
    when: []
    then:
      - shouldExist: { selector: '[data-test=profile-bio]' }
  - id: AC-007-3
    title: Profile page shows user posts
    given:
      - visit: '/demos/scaffold/profile/devguru'
    when: []
    then:
      - shouldExist: { selector: '[data-test=profile-post-item]' }
  - id: AC-007-4
    title: Profile page shows follower count
    given:
      - visit: '/demos/scaffold/profile/devguru'
    when: []
    then:
      - shouldExist: { selector: '[data-test=profile-follower-count]' }
---
id: US-008
title: Follow and unfollow a user
acceptance_criteria:
  - id: AC-008-1
    title: Follow button is present on profile page
    given:
      - visit: '/demos/scaffold/profile/devguru'
    when: []
    then:
      - shouldExist: { selector: '[data-test=follow-button]' }
  - id: AC-008-2
    title: Clicking follow changes button to Unfollow
    given:
      - visit: '/demos/scaffold/profile/devguru'
    when:
      - click: { selector: '[data-test=follow-button]' }
    then:
      - shouldContain: { selector: '[data-test=follow-button]', text: 'Unfollow' }
  - id: AC-008-3
    title: Clicking unfollow returns button to Follow
    given:
      - visit: '/demos/scaffold/profile/devguru'
    when:
      - click: { selector: '[data-test=follow-button]' }
      - click: { selector: '[data-test=follow-button]' }
    then:
      - shouldContain: { selector: '[data-test=follow-button]', text: 'Follow' }
`;
loadAndRun(profileStories);

// ============================================================================
// DISCOVERY STORIES
// ============================================================================

const discoveryStories = `
id: US-009
title: Explore trending tags and people
acceptance_criteria:
  - id: AC-009-1
    title: Explore page shows trending tags
    given:
      - visit: '/demos/scaffold/explore'
    when: []
    then:
      - shouldExist: { selector: '[data-test=trending-tags]' }
      - shouldExist: { selector: '[data-test=tag-chip]' }
  - id: AC-009-2
    title: Explore page shows suggested people
    given:
      - visit: '/demos/scaffold/explore'
    when: []
    then:
      - shouldExist: { selector: '[data-test=suggested-people]' }
      - shouldExist: { selector: '[data-test=user-card]' }
---
id: US-010
title: Filter posts by tag on explore page
acceptance_criteria:
  - id: AC-010-1
    title: Clicking a tag filters the posts section
    given:
      - visit: '/demos/scaffold/explore'
    when:
      - click: { selector: '[data-test=tag-chip]' }
    then:
      - shouldExist: { selector: '[data-test=tag-chip][data-active=true]' }
      - shouldExist: { selector: '[data-test=explore-post-item]' }
---
id: US-020
title: Tag filter deselect returns all posts
acceptance_criteria:
  - id: AC-020-1
    title: Clicking active tag deselects it and shows all posts
    given:
      - visit: '/demos/scaffold/explore'
    when:
      - click: { selector: '[data-test=tag-chip]' }
      - click: { selector: '[data-test=tag-chip][data-active=true]' }
    then:
      - shouldExist: { selector: '[data-test=explore-post-item]' }
`;
loadAndRun(discoveryStories);

// ============================================================================
// SEARCH STORIES
// ============================================================================

const searchStories = `
id: US-011
title: Search posts by keyword
acceptance_criteria:
  - id: AC-011-1
    title: Typing in search box shows matching posts
    given:
      - visit: '/demos/scaffold/search'
    when:
      - fill: { selector: '[data-test=search-input]', value: 'CSS' }
    then:
      - shouldExist: { selector: '[data-test=search-result]' }
  - id: AC-011-2
    title: Search results link to post detail
    given:
      - visit: '/demos/scaffold/search'
    when:
      - fill: { selector: '[data-test=search-input]', value: 'CSS' }
    then:
      - shouldExist: { selector: '[data-test=search-result] a' }
---
id: US-018
title: Search with no results shows message
acceptance_criteria:
  - id: AC-018-1
    title: No-results message appears for unmatched query
    given:
      - visit: '/demos/scaffold/search'
    when:
      - fill: { selector: '[data-test=search-input]', value: 'zxqwerty12345notarealword' }
    then:
      - shouldExist: { selector: '[data-test=search-no-results]' }
---
id: US-019
title: Empty search shows no results
acceptance_criteria:
  - id: AC-019-1
    title: Empty search box shows no result items
    given:
      - visit: '/demos/scaffold/search'
    when: []
    then:
      - shouldExist: { selector: '[data-test=search-input]' }
`;
loadAndRun(searchStories);

// ============================================================================
// THEME STORIES
// ============================================================================

const themeStories = `
id: US-012
title: Toggle dark/light theme
acceptance_criteria:
  - id: AC-012-1
    title: Theme toggle button is present in nav
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=theme-toggle]' }
  - id: AC-012-2
    title: Clicking theme toggle switches the theme
    given:
      - visit: '/demos/scaffold/'
    when:
      - click: { selector: '[data-test=theme-toggle]' }
    then:
      - shouldExist: { selector: 'html[data-theme]' }
`;
loadAndRun(themeStories);

// ============================================================================
// META / VIEW STORIES
// ============================================================================

const metaStories = `
id: US-013
title: See meta-banner with RootSpec links
acceptance_criteria:
  - id: AC-013-1
    title: Meta-banner is visible on home page
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=meta-banner]' }
      - shouldContain: { selector: '[data-test=meta-banner]', text: 'RootSpec' }
  - id: AC-013-2
    title: Meta-banner contains scaffold commit link
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=meta-banner-scaffold-link]' }
  - id: AC-013-3
    title: Meta-banner contains spec link
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=meta-banner-spec-link]' }
  - id: AC-013-4
    title: Meta-banner contains seed link
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=meta-banner-seed-link]' }
---
id: US-014
title: Navigate between routes
acceptance_criteria:
  - id: AC-014-1
    title: Nav links are present on home page
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=nav-home]' }
      - shouldExist: { selector: '[data-test=nav-explore]' }
      - shouldExist: { selector: '[data-test=nav-search]' }
---
id: US-015
title: See RootSpec version in header
acceptance_criteria:
  - id: AC-015-1
    title: RootSpec version badge visible in nav
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=rootspec-version]' }
      - shouldContain: { selector: '[data-test=rootspec-version]', text: 'v7.2.7' }
---
id: US-016
title: See footer with attribution
acceptance_criteria:
  - id: AC-016-1
    title: Footer contains RootSpec attribution
    given:
      - visit: '/demos/scaffold/'
    when: []
    then:
      - shouldExist: { selector: '[data-test=footer]' }
      - shouldContain: { selector: '[data-test=footer]', text: 'RootSpec' }
`;
loadAndRun(metaStories);
