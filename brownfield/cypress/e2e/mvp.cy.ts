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

// US-014: Compare two or more cities side by side
const stories_014 = `
id: US-014
title: Compare two or more cities side by side
acceptance_criteria:
  - id: AC-014-1
    title: Entering compare mode shows city selection affordance
    given:
      - visit: /demos/brownfield/
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Copenhagen
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Stockholm
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - click:
          selector: .view-btn:last-child
      - click:
          selector: .compare-btn
    then:
      - shouldExist:
          selector: '[data-testid="compare-card"]'
  - id: AC-014-2
    title: Selecting 2 cities auto-transitions to comparison view
    given:
      - visit: /demos/brownfield/
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Copenhagen
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Stockholm
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - click:
          selector: .view-btn:last-child
      - click:
          selector: .compare-btn
      - click:
          selector: '[data-testid="compare-card"]:nth-child(1)'
      - click:
          selector: '[data-testid="compare-card"]:nth-child(2)'
    then:
      - shouldExist:
          selector: .comparison-view
  - id: AC-014-3
    title: Comparison view shows columns for each city
    given:
      - visit: /demos/brownfield/
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Copenhagen
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Stockholm
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - click:
          selector: .view-btn:last-child
      - click:
          selector: .compare-btn
      - click:
          selector: '[data-testid="compare-card"]:nth-child(1)'
      - click:
          selector: '[data-testid="compare-card"]:nth-child(2)'
    then:
      - shouldExist:
          selector: '[data-testid="comparison-column"]'
  - id: AC-014-4
    title: Back to Dashboard button returns to dashboard view
    given:
      - visit: /demos/brownfield/
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Copenhagen
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Stockholm
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - click:
          selector: .view-btn:last-child
      - click:
          selector: .compare-btn
      - click:
          selector: '[data-testid="compare-card"]:nth-child(1)'
      - click:
          selector: '[data-testid="compare-card"]:nth-child(2)'
      - click:
          selector: .back-to-dashboard
    then:
      - shouldContain:
          selector: h3
          text: All Locations
`;
loadAndRun(stories_014);

// US-013: View all saved locations on dashboard
const stories_013 = `
id: US-013
title: View all saved locations on dashboard
acceptance_criteria:
  - id: AC-013-1
    title: Dashboard tab appears when favorites exist
    given:
      - visit: /demos/brownfield/
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Amsterdam
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
    then:
      - shouldExist:
          selector: .view-toggle
  - id: AC-013-2
    title: Clicking Dashboard tab shows locations grid
    given:
      - visit: /demos/brownfield/
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Amsterdam
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
  - id: AC-013-3
    title: Compare button appears in dashboard when 2+ favorites exist
    given:
      - visit: /demos/brownfield/
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Amsterdam
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Brussels
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - click:
          selector: .view-btn:last-child
    then:
      - shouldExist:
          selector: .compare-btn
`;
loadAndRun(stories_013);

// US-002: Save a location to favorites
const stories_002 = `
id: US-002
title: Save a location to favorites
acceptance_criteria:
  - id: AC-002-1
    title: Save button appears after selecting a city not yet in favorites
    given:
      - visit: /demos/brownfield/
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Berlin
      - click:
          selector: ul li:first-child
    then:
      - shouldExist:
          selector: .save-btn
  - id: AC-002-2
    title: Saved city appears in favorites bar
    given:
      - visit: /demos/brownfield/
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Berlin
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
    then:
      - shouldExist:
          selector: button[class*="Chip"]
`;
loadAndRun(stories_002);

// US-003: Switch between saved locations
const stories_003 = `
id: US-003
title: Switch between saved locations
acceptance_criteria:
  - id: AC-003-1
    title: Clicking a favorites chip loads that city's weather
    given:
      - visit: /demos/brownfield/
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Tokyo
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - click:
          selector: button[class*="Chip"]:first-child
    then:
      - shouldExist:
          selector: .card
`;
loadAndRun(stories_003);

// US-004: Remove a location from favorites
const stories_004 = `
id: US-004
title: Remove a location from favorites
acceptance_criteria:
  - id: AC-004-1
    title: Clicking the remove button on a chip removes the city
    given:
      - visit: /demos/brownfield/
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Rome
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - click:
          selector: span[class*="RemoveBtn"]
    then:
      - shouldExist:
          selector: .empty
`;
loadAndRun(stories_004);

// US-001: Search for a city and see weather
const stories_001 = `
id: US-001
title: Search for a city and see weather
acceptance_criteria:
  - id: AC-001-1
    title: Search input is visible on load
    given:
      - visit: /demos/brownfield/
    then:
      - shouldExist:
          selector: input[placeholder="Search for a city..."]
    when: []
  - id: AC-001-2
    title: Typing a city name shows dropdown results
    given:
      - visit: /demos/brownfield/
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: London
    then:
      - shouldExist:
          selector: ul li
  - id: AC-001-3
    title: Selecting a city shows weather
    given:
      - visit: /demos/brownfield/
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Paris
      - click:
          selector: ul li:first-child
    then:
      - shouldExist:
          selector: .card
  - id: AC-001-4
    title: Empty state shown before any city is selected
    given:
      - visit: /demos/brownfield/
    then:
      - shouldContain:
          selector: .empty
          text: Search for a city to see the weather forecast
    when: []
`;
loadAndRun(stories_001);

// US-009: Change temperature unit
const stories_009 = `
id: US-009
title: Change temperature unit
acceptance_criteria:
  - id: AC-009-1
    title: Settings panel opens on button click
    given:
      - visit: /demos/brownfield/
    when:
      - click:
          selector: button[class*="toggle"]
    then:
      - shouldExist:
          selector: button[class*="option"]
  - id: AC-009-2
    title: Temperature unit buttons are visible in settings
    given:
      - visit: /demos/brownfield/
    when:
      - click:
          selector: button[class*="toggle"]
    then:
      - shouldContain:
          selector: div[class*="panel"]
          text: °C
`;
loadAndRun(stories_009);

// US-010: Change wind unit
const stories_010 = `
id: US-010
title: Change wind unit
acceptance_criteria:
  - id: AC-010-1
    title: Wind unit buttons are visible in settings panel
    given:
      - visit: /demos/brownfield/
    when:
      - click:
          selector: button[class*="toggle"]
    then:
      - shouldContain:
          selector: div[class*="panel"]
          text: km/h
`;
loadAndRun(stories_010);

// US-011: Change time format
const stories_011 = `
id: US-011
title: Change time format
acceptance_criteria:
  - id: AC-011-1
    title: Time format buttons are visible in settings panel
    given:
      - visit: /demos/brownfield/
    when:
      - click:
          selector: button[class*="toggle"]
    then:
      - shouldContain:
          selector: div[class*="panel"]
          text: 24h
`;
loadAndRun(stories_011);

// US-012: Set a default city
const stories_012 = `
id: US-012
title: Set a default city
acceptance_criteria:
  - id: AC-012-1
    title: Default city dropdown appears in settings when favorites exist
    given:
      - visit: /demos/brownfield/
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Vienna
      - click:
          selector: ul li:first-child
      - click:
          selector: .save-btn
      - click:
          selector: button[class*="toggle"]
    then:
      - shouldExist:
          selector: select[class*="select"]
`;
loadAndRun(stories_012);

// US-005: See current conditions
const stories_005 = `
id: US-005
title: See current conditions
acceptance_criteria:
  - id: AC-005-1
    title: Current weather card shows city name and temperature
    given:
      - visit: /demos/brownfield/
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Sydney
      - click:
          selector: ul li:first-child
    then:
      - shouldExist:
          selector: .card
  - id: AC-005-2
    title: Current weather card shows humidity, wind, and UV
    given:
      - visit: /demos/brownfield/
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Sydney
      - click:
          selector: ul li:first-child
    then:
      - shouldContain:
          selector: .details
          text: UV
`;
loadAndRun(stories_005);

// US-006: See hourly forecast
const stories_006 = `
id: US-006
title: See hourly forecast
acceptance_criteria:
  - id: AC-006-1
    title: Hourly forecast strip is visible after city selection
    given:
      - visit: /demos/brownfield/
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Madrid
      - click:
          selector: ul li:first-child
    then:
      - shouldContain:
          selector: h3
          text: Today's Hourly
`;
loadAndRun(stories_006);

// US-007: See 7-day forecast
const stories_007 = `
id: US-007
title: See 7-day forecast
acceptance_criteria:
  - id: AC-007-1
    title: 7-day forecast chart is visible after city selection
    given:
      - visit: /demos/brownfield/
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Oslo
      - click:
          selector: ul li:first-child
    then:
      - shouldContain:
          selector: h3
          text: 7-Day Forecast
`;
loadAndRun(stories_007);

// US-008: See condition alerts
const stories_008 = `
id: US-008
title: See condition alerts
acceptance_criteria:
  - id: AC-008-1
    title: Alert badges container is present in the DOM when weather loads
    given:
      - visit: /demos/brownfield/
    when:
      - fill:
          selector: input[placeholder="Search for a city..."]
          value: Dubai
      - click:
          selector: ul li:first-child
    then:
      - shouldExist:
          selector: .weather-alerts
`;
loadAndRun(stories_008);
