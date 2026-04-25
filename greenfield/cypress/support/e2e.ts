// Global test setup
beforeEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});

import './screenshot-hook';
import './app-ready';

import "./runtime-checks-hook";
