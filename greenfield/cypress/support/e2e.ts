// Global test setup
beforeEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});

// Ignore Astro hydration module fetch errors in Cypress
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Failed to fetch dynamically imported module')) {
    return false;
  }
  return true;
});

import "./screenshot-hook";

import "./runtime-checks-hook";
