/// <reference types="cypress" />

// Helper: search for a city and select the first result
function searchAndSelect(city: string) {
  cy.get('input[placeholder*="Search"]').clear().type(city);
  cy.get('ul li', { timeout: 10000 }).should('have.length.gte', 1);
  cy.get('ul li').first().click();
}

// Helper: save current city as favorite
function saveAsFavorite() {
  cy.get('.save-btn', { timeout: 10000 }).should('exist').click();
}

// Helper: save two cities and go to dashboard
function setupTwoFavorites() {
  cy.visit('/');
  searchAndSelect('London');
  cy.get('[class*="card"]', { timeout: 10000 }).should('exist');
  saveAsFavorite();
  searchAndSelect('Paris');
  cy.get('[class*="card"]', { timeout: 10000 }).should('exist');
  saveAsFavorite();
  cy.get('.view-toggle', { timeout: 15000 }).should('exist');
  cy.get('.view-btn').last().click();
  cy.contains('All Locations', { timeout: 15000 }).should('exist');
}

// Helper: enter compare mode and select both cities
function enterComparisonView() {
  setupTwoFavorites();
  cy.get('.compare-btn', { timeout: 5000 }).should('exist').click();
  cy.get('[data-testid="compare-card"]', { timeout: 5000 }).should('have.length', 2);
  cy.get('[data-testid="compare-card"]').eq(0).click();
  cy.get('[data-testid="compare-card"]').eq(1).click();
  cy.get('.comparison-view', { timeout: 10000 }).should('exist');
}

// =============================================================================
// US-201: Enter comparison mode from dashboard
// =============================================================================
describe('US-201: Enter comparison mode from dashboard', () => {
  it('AC-201-1: Compare button appears on dashboard when 2+ favorites exist', () => {
    setupTwoFavorites();
    cy.get('.compare-btn').should('exist');
  });

  it('AC-201-2: Compare button is hidden when fewer than 2 favorites exist', () => {
    cy.visit('/');
    searchAndSelect('London');
    cy.get('[class*="card"]', { timeout: 10000 }).should('exist');
    saveAsFavorite();
    cy.get('.view-toggle', { timeout: 5000 }).should('exist');
    cy.get('.view-btn').last().click();
    cy.contains('All Locations', { timeout: 10000 }).should('exist');
    cy.get('.compare-btn').should('not.exist');
  });
});

// =============================================================================
// US-202: Select cities for side-by-side comparison
// =============================================================================
describe('US-202: Select cities for side-by-side comparison', () => {
  it('AC-202-1: Clicking Compare enters selection mode with selectable cards', () => {
    setupTwoFavorites();
    cy.get('.compare-btn').click();
    cy.contains('Select').should('exist');
  });

  it('AC-202-2: Selecting 2 cities shows comparison view', () => {
    setupTwoFavorites();
    cy.get('.compare-btn').click();
    cy.get('[data-testid="compare-card"]').eq(0).click();
    cy.get('[data-testid="compare-card"]').eq(1).click();
    cy.get('.comparison-view', { timeout: 10000 }).should('exist');
    cy.get('[data-testid="comparison-column"]').should('have.length', 2);
  });
});

// =============================================================================
// US-203: View comparison with current conditions, hourly, and 7-day
// =============================================================================
describe('US-203: View comparison with current conditions, hourly, and 7-day forecast', () => {
  it('AC-203-1: Each comparison column shows full weather details', () => {
    enterComparisonView();
    cy.get('.comparison-view').should('contain', 'London');
    cy.get('.comparison-view').should('contain', 'Paris');
    cy.get('.comparison-view').should('contain', '7-Day Forecast');
  });
});

// =============================================================================
// US-204: Deselect a city from comparison
// =============================================================================
describe('US-204: Deselect a city from comparison', () => {
  it('AC-204-1: Clicking a column header removes that city and exits to dashboard', () => {
    enterComparisonView();
    cy.get('[data-testid="comparison-remove"]').first().click();
    cy.get('.comparison-view').should('not.exist');
    cy.contains('All Locations').should('exist');
  });
});

// =============================================================================
// US-205: Navigate back to dashboard from comparison
// =============================================================================
describe('US-205: Navigate back to dashboard from comparison', () => {
  it('AC-205-1: Back button returns to dashboard', () => {
    enterComparisonView();
    cy.get('.back-to-dashboard').click();
    cy.get('.comparison-view').should('not.exist');
    cy.contains('All Locations').should('exist');
  });
});
