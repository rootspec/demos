/// <reference types="cypress" />

// Clear localStorage between tests for isolation
beforeEach(() => {
  cy.clearLocalStorage();
});

import "./screenshot-hook";
