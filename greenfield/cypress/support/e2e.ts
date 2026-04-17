// Global test setup
beforeEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});

import "./screenshot-hook";

import "./runtime-checks-hook";
