// Global test setup
beforeEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});

// Suppress Astro hydration errors from failing tests
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Failed to fetch dynamically imported module') || err.message.includes('astro:scripts')) {
    return false;
  }
});

import "./screenshot-hook";
