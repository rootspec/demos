// Global test setup
beforeEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});

// Ignore Astro/Vite dev-server module fetch errors (known Cypress+Vite issue)
Cypress.on('uncaughtException', (err) => {
  if (err.message && (
    err.message.includes('dynamically imported module') ||
    err.message.includes('astro:scripts') ||
    err.message.includes('before-hydration')
  )) {
    return false;
  }
});

Cypress.on('unhandledRejection' as any, (err: any) => {
  if (err && err.message && (
    err.message.includes('dynamically imported module') ||
    err.message.includes('astro:scripts') ||
    err.message.includes('before-hydration')
  )) {
    return false;
  }
});

import "./screenshot-hook";
