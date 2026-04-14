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

// US-019: Compare weather for multiple cities side by side
const stories_019 = `
id: US-019
title: Compare weather for multiple cities side by side
acceptance_criteria:
  - id: AC-019-1
    title: Compare button appears in dashboard when 2+ favorites exist
    given:
      - visit: /
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Madrid
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Lisbon
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - click:
          selector: .view-btn:last-child
    then:
      - shouldExist:
          selector: .compare-btn
  - id: AC-019-2
    title: Selecting 2 cities from compare mode triggers comparison view
    given:
      - visit: /
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Madrid
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Lisbon
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - click:
          selector: .view-btn:last-child
      - click:
          selector: .compare-btn
      - click:
          selector: '[data-testid="compare-card"]:first-child'
      - click:
          selector: '[data-testid="compare-card"]:last-child'
    then:
      - shouldExist:
          selector: .comparison-view
      - shouldExist:
          selector: '[data-testid="comparison-column"]'
  - id: AC-019-3
    title: Back to Dashboard button returns to dashboard view
    given:
      - visit: /
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Madrid
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Lisbon
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - click:
          selector: .view-btn:last-child
      - click:
          selector: .compare-btn
      - click:
          selector: '[data-testid="compare-card"]:first-child'
      - click:
          selector: '[data-testid="compare-card"]:last-child'
      - click:
          selector: .back-to-dashboard
    then:
      - shouldContain:
          selector: h3
          text: All Locations
`;
loadAndRun(stories_019);

// US-020: Remove a city from the comparison view
const stories_020 = `
id: US-020
title: Remove a city from the comparison view
acceptance_criteria:
  - id: AC-020-1
    title: Each comparison column has a remove button
    given:
      - visit: /
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Madrid
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Lisbon
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - click:
          selector: .view-btn:last-child
      - click:
          selector: .compare-btn
      - click:
          selector: '[data-testid="compare-card"]:first-child'
      - click:
          selector: '[data-testid="compare-card"]:last-child'
    then:
      - shouldExist:
          selector: '[data-testid="comparison-remove"]'
`;
loadAndRun(stories_020);

// US-016: View all saved locations in dashboard
const stories_016 = `
id: US-016
title: View all saved locations in dashboard
acceptance_criteria:
  - id: AC-016-1
    title: View toggle appears when favorites exist
    given:
      - visit: /
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Rome
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
    then:
      - shouldExist:
          selector: .view-toggle
      - shouldContain:
          selector: .view-toggle
          text: Dashboard
  - id: AC-016-2
    title: Dashboard view shows all locations header
    given:
      - visit: /
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Rome
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - click:
          selector: .view-btn:last-child
    then:
      - shouldContain:
          selector: h3
          text: All Locations
`;
loadAndRun(stories_016);

// US-009: Navigate between saved locations
const stories_009 = `
id: US-009
title: Navigate between saved locations
acceptance_criteria:
  - id: AC-009-1
    title: Saved Locations heading is displayed when locations are saved
    given:
      - visit: /
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Amsterdam
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
    then:
      - shouldContain:
          selector: h3
          text: Saved Locations
  - id: AC-009-2
    title: Clicking a favorite chip updates the weather view
    given:
      - visit: /
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Amsterdam
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - click:
          selector: h3 + div button:first-child
    then:
      - shouldExist:
          selector: .actions
`;
loadAndRun(stories_009);

// US-010: Remove a city from favorites
const stories_010 = `
id: US-010
title: Remove a city from favorites
acceptance_criteria:
  - id: AC-010-1
    title: Remove span is visible inside each favorite chip button
    given:
      - visit: /
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Sydney
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
    then:
      - shouldContain:
          selector: h3 + div button span
          text: ✕
`;
loadAndRun(stories_010);

// US-001: Search for a city by name
const stories_001 = `
id: US-001
title: Search for a city by name
acceptance_criteria:
  - id: AC-001-1
    title: Search input is present on load
    given:
      - visit: /
    then:
      - shouldExist:
          selector: input[placeholder="Search for a city..."]
    when: []
  - id: AC-001-2
    title: Typing triggers city suggestions
    given:
      - visit: /
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: London
    then:
      - shouldExist:
          selector: ul li
  - id: AC-001-3
    title: Selecting a city loads the weather view
    given:
      - visit: /
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Paris
      - click:
          selector: ul li:first-child
    then:
      - shouldExist:
          selector: .actions
`;
loadAndRun(stories_001);

// US-013: Change temperature unit
const stories_013 = `
id: US-013
title: Change temperature unit
acceptance_criteria:
  - id: AC-013-1
    title: Settings panel can be opened via the Settings button
    given:
      - visit: /
    when:
      - click:
          selector: button[class*="toggle"]
    then:
      - shouldExist:
          selector: '[class*="panel"]'
  - id: AC-013-2
    title: Temperature unit buttons are visible in settings
    given:
      - visit: /
    when:
      - click:
          selector: button[class*="toggle"]
    then:
      - shouldContain:
          selector: '[class*="panel"]'
          text: °C
      - shouldContain:
          selector: '[class*="panel"]'
          text: °F
`;
loadAndRun(stories_013);

// US-014: Change wind speed unit and time format
const stories_014 = `
id: US-014
title: Change wind speed unit and time format
acceptance_criteria:
  - id: AC-014-1
    title: Wind speed and time format options are visible in settings
    given:
      - visit: /
    when:
      - click:
          selector: button[class*="toggle"]
    then:
      - shouldContain:
          selector: '[class*="panel"]'
          text: km/h
      - shouldContain:
          selector: '[class*="panel"]'
          text: 24h
`;
loadAndRun(stories_014);

// US-005: View current weather conditions for a city
const stories_005 = `
id: US-005
title: View current weather conditions for a city
acceptance_criteria:
  - id: AC-005-1
    title: Actions area appears after selecting a city and weather loads
    given:
      - visit: /
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Berlin
      - click:
          selector: ul li:first-child
    then:
      - shouldExist:
          selector: .actions
  - id: AC-005-2
    title: Empty state shown when no city selected
    given:
      - visit: /
    then:
      - shouldContain:
          selector: .empty
          text: Search for a city to see the weather forecast
    when: []
`;
loadAndRun(stories_005);

// US-006: Save a location to favorites
const stories_006 = `
id: US-006
title: Save a location to favorites
acceptance_criteria:
  - id: AC-006-1
    title: Save button appears after selecting a new city
    given:
      - visit: /
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Tokyo
      - click:
          selector: ul li:first-child
    then:
      - shouldExist:
          selector: .save-btn
  - id: AC-006-2
    title: Saved Locations heading appears after saving
    given:
      - visit: /
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Tokyo
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
    then:
      - shouldContain:
          selector: h3
          text: Saved Locations
`;
loadAndRun(stories_006);
