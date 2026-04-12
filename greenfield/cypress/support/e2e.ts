// Global test setup
beforeEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});

// Wait for Astro React islands to hydrate after each visit
Cypress.Commands.overwrite('visit', (originalFn: any, url: any, options?: any) => {
  return originalFn(url, options).then(() => {
    cy.get('astro-island[ssr]', { timeout: 10000 }).should('not.exist');
  });
});
