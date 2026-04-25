// App Readiness: Astro with client:load React islands.
// Astro removes the [ssr] attribute from each <astro-island> once that
// island's framework runtime hydrates. Waiting for at least one island
// without [ssr] is a real readiness signal — not document.readyState,
// not body presence, not unconditional resolution.
// See rootspec/CONVENTIONS/technical.md → App Readiness.

Cypress.Commands.add('appReady', () => {
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
