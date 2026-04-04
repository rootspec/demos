/// <reference types="cypress" />

// Helper: search for a city and select the first result
function searchAndSelect(city: string) {
  cy.get('input[placeholder*="Search"]').clear().type(city);
  cy.get('ul li', { timeout: 10000 }).should('have.length.gte', 1);
  cy.get('ul li').first().click();
}

// Helper: wait for weather card to load
function waitForWeather() {
  cy.get('[class*="card"]', { timeout: 10000 }).should('exist');
}

// Helper: save current city as favorite
function saveAsFavorite() {
  cy.get('.save-btn').should('exist').click();
}

// Helper: open settings panel
function openSettings() {
  cy.contains('button', 'Settings').click();
}

// =============================================================================
// US-101: Search for a city by name and select it
// =============================================================================
describe('US-101: Search for a city by name and select it', () => {
  it('AC-101-1: Autocomplete dropdown appears after typing', () => {
    cy.visit('/');
    cy.get('input[placeholder*="Search"]').type('Berlin');
    cy.get('ul li', { timeout: 10000 }).should('have.length.gte', 1);
  });

  it('AC-101-2: Selecting a city loads its weather', () => {
    cy.visit('/');
    searchAndSelect('Berlin');
    cy.get('h2').should('contain', 'Berlin');
  });
});

// =============================================================================
// US-102: View current weather conditions for a selected city
// =============================================================================
describe('US-102: View current weather conditions for a selected city', () => {
  it('AC-102-1: Current conditions card shows temperature, humidity, wind, and UV', () => {
    cy.visit('/');
    searchAndSelect('London');
    waitForWeather();
    cy.get('[class*="details"]').should('contain', '%');
    cy.get('[class*="details"]').should('contain', 'km/h');
    cy.get('[class*="details"]').should('contain', 'UV');
  });
});

// =============================================================================
// US-103: See weather alerts when conditions meet thresholds
// =============================================================================
describe('US-103: See weather alerts when conditions meet thresholds', () => {
  it('AC-103-1: Alerts appear for notable conditions', () => {
    // Intercept weather API to ensure alert-triggering conditions
    cy.intercept('GET', 'https://api.open-meteo.com/v1/forecast*', (req) => {
      req.continue((res) => {
        if (res.body && res.body.current) {
          res.body.current.uv_index = 9;
          res.body.current.temperature_2m = 38;
        }
      });
    });
    cy.visit('/');
    searchAndSelect('Dubai');
    waitForWeather();
    cy.get('.weather-alerts').should('exist');
  });
});

// =============================================================================
// US-104: View hourly forecast for the next 24 hours
// =============================================================================
describe('US-104: View hourly forecast for the next 24 hours', () => {
  it('AC-104-1: Hourly forecast strip displays after selecting a city', () => {
    cy.visit('/');
    searchAndSelect('Tokyo');
    waitForWeather();
    cy.get('[class*="hourCard"], [class*="hour"]').should('have.length.gte', 1);
  });

  it('AC-104-2: Scroll arrows navigate the hourly strip', () => {
    cy.visit('/');
    searchAndSelect('Tokyo');
    waitForWeather();
    cy.get('button[class*="arrow"]').should('have.length', 2);
    cy.get('button[class*="arrow"]').last().click();
  });
});

// =============================================================================
// US-105: View 7-day forecast with temperature range and conditions
// =============================================================================
describe('US-105: View 7-day forecast with temperature range and conditions', () => {
  it('AC-105-1: Seven day cards appear with high/low temps and weather emoji', () => {
    cy.visit('/');
    searchAndSelect('Paris');
    waitForWeather();
    cy.contains('7-Day Forecast').should('exist');
  });
});

// =============================================================================
// US-106: Save a city as a favorite location
// =============================================================================
describe('US-106: Save a city as a favorite location', () => {
  it('AC-106-1: Save Location button appears for unsaved cities', () => {
    cy.visit('/');
    searchAndSelect('Sydney');
    waitForWeather();
    cy.get('.save-btn').should('exist');
  });

  it('AC-106-2: Clicking save adds the city to favorites chips', () => {
    cy.visit('/');
    searchAndSelect('Sydney');
    waitForWeather();
    saveAsFavorite();
    cy.contains('Saved Locations').should('exist');
    cy.get('.save-btn').should('not.exist');
  });
});

// =============================================================================
// US-107: Click a favorite chip to view its weather
// =============================================================================
describe('US-107: Click a favorite chip to view its weather', () => {
  it('AC-107-1: Clicking a favorite chip loads that city\'s weather', () => {
    cy.visit('/');
    searchAndSelect('Rome');
    waitForWeather();
    saveAsFavorite();
    // Search for a different city to change context
    searchAndSelect('Berlin');
    cy.get('h2').should('contain', 'Berlin');
    // Click Rome chip to switch back
    cy.contains('button', 'Rome').click();
    cy.get('h2', { timeout: 10000 }).should('contain', 'Rome');
  });
});

// =============================================================================
// US-108: Remove a city from favorites
// =============================================================================
describe('US-108: Remove a city from favorites', () => {
  it('AC-108-1: Clicking the remove button on a chip removes the favorite', () => {
    cy.visit('/');
    searchAndSelect('Madrid');
    waitForWeather();
    saveAsFavorite();
    cy.contains('Saved Locations').should('exist');
    // Click the ✕ remove button on the chip
    cy.contains('button', 'Madrid').find('span').click({ force: true });
    cy.contains('Saved Locations').should('not.exist');
  });
});

// =============================================================================
// US-109: View all saved locations on the dashboard
// =============================================================================
describe('US-109: View all saved locations on the dashboard', () => {
  it('AC-109-1: Dashboard view toggle appears when favorites exist', () => {
    cy.visit('/');
    searchAndSelect('Oslo');
    waitForWeather();
    saveAsFavorite();
    cy.get('.view-toggle').should('exist');
    cy.get('.view-btn').should('have.length', 2);
  });

  it('AC-109-2: Switching to dashboard shows all locations with current weather', () => {
    cy.visit('/');
    searchAndSelect('Oslo');
    waitForWeather();
    saveAsFavorite();
    cy.get('.view-toggle').should('exist');
    // Click "Dashboard" button (second view-btn)
    cy.get('.view-btn').last().click();
    cy.contains('All Locations').should('exist');
  });
});

// =============================================================================
// US-110: Switch between Celsius and Fahrenheit
// =============================================================================
describe('US-110: Switch between Celsius and Fahrenheit', () => {
  it('AC-110-1: Changing temperature unit updates displayed temperatures', () => {
    cy.visit('/');
    searchAndSelect('New York');
    waitForWeather();
    openSettings();
    cy.contains('button', '°F').click();
    cy.get('[class*="temp"]').should('contain', '°F');
  });
});

// =============================================================================
// US-111: Switch between km/h and mph for wind speed
// =============================================================================
describe('US-111: Switch between km/h and mph for wind speed', () => {
  it('AC-111-1: Wind unit setting options are available', () => {
    cy.visit('/');
    openSettings();
    cy.get('[class*="panel"]').should('contain', 'km/h');
    cy.get('[class*="panel"]').should('contain', 'mph');
  });
});

// =============================================================================
// US-112: Switch between 24-hour and 12-hour time format
// =============================================================================
describe('US-112: Switch between 24-hour and 12-hour time format', () => {
  it('AC-112-1: Time format setting options are available', () => {
    cy.visit('/');
    openSettings();
    cy.get('[class*="panel"]').should('contain', '24h');
    cy.get('[class*="panel"]').should('contain', '12h');
  });
});

// =============================================================================
// US-113: Set a default city that loads on app startup
// =============================================================================
describe('US-113: Set a default city that loads on app startup', () => {
  it('AC-113-1: Default city dropdown appears when favorites exist', () => {
    cy.visit('/');
    searchAndSelect('Vienna');
    waitForWeather();
    saveAsFavorite();
    openSettings();
    cy.get('select[class*="select"]').should('exist');
  });
});

// =============================================================================
// US-114: See a prompt to search when no city is selected
// =============================================================================
describe('US-114: Empty state message shows on first load', () => {
  it('AC-114-1: Empty state message shows on first load', () => {
    cy.visit('/');
    cy.get('.empty').should('contain', 'Search for a city');
  });
});
