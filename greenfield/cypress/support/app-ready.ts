// App Readiness: Astro with client:load React islands.
// Deferred boundaries: HierarchyExplorer and SpecWizard use client:load.
// Signal: wait for document.readyState === 'complete' then check that
// all [data-astro-source-file] islands have rendered (no astro-island with
// ssr-only attribute remaining). For fully static pages this resolves immediately.
// See rootspec/CONVENTIONS/technical.md → App Readiness.

Cypress.Commands.add('appReady', () => {
  cy.document().should('have.prop', 'readyState', 'complete');
  // Wait for any Astro islands to hydrate (client:load components replace
  // the astro-island wrapper's innerHTML). If no islands, resolves instantly.
  cy.get('body').then(($body) => {
    const islands = $body.find('astro-island');
    if (islands.length > 0) {
      // Each island hydrates and removes the ssr attribute when done
      cy.wrap(null).then(() => {
        return new Promise<void>((resolve) => {
          const check = () => {
            const remaining = Cypress.$('astro-island[ssr]');
            if (remaining.length === 0) resolve();
            else setTimeout(check, 50);
          };
          check();
        });
      });
    }
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      appReady(): Chainable<void>;
    }
  }
}

export {};
