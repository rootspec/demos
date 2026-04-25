// See rootspec/CONVENTIONS/technical.md → App Readiness for the documented signal.

Cypress.Commands.add('appReady', () => {
  // Wait for Astro client:load islands to hydrate.
  // Astro removes the [ssr] attribute from astro-island once hydration completes.
  cy.get('astro-island:not([ssr])', { timeout: 10000 }).should('exist');
});

declare global {
  namespace Cypress {
    interface Chainable {
      appReady(): Chainable<void>;
    }
  }
}

export {};
