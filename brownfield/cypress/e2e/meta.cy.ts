/// <reference types="cypress" />

// =============================================================================
// US-115: See a persistent meta banner identifying this as a RootSpec brownfield demo
// =============================================================================
describe('US-115: See a persistent meta banner identifying this as a RootSpec brownfield demo', () => {
  it('AC-115-1: Meta banner is visible on page load', () => {
    cy.visit('/');
    cy.get('.meta-banner').should('exist');
  });

  it('AC-115-2: Meta banner contains links to the GitHub repo', () => {
    cy.visit('/');
    cy.get('.meta-banner a[href*="github.com/rootspec/demos"]').should('exist');
  });
});
