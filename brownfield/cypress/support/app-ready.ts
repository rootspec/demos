// cypress/support/app-ready.ts
//
// Define when your app is ready to be driven by tests. This file is the single
// source of truth for the readiness contract. Document the chosen mechanism in
// rootspec/CONVENTIONS/technical.md.
//
// Examples (uncomment and adapt one):
//
//   // Static site, no async work — ready immediately:
//   Cypress.Commands.add('appReady', () => { cy.wrap(true); });
//
//   // App sets a global when ready:
//   Cypress.Commands.add('appReady', () => {
//     cy.window({ timeout: 10000 }).its('appReady').should('be.true');
//   });
//
//   // Wait for every island/component that opted in:
//   Cypress.Commands.add('appReady', () => {
//     cy.get('[data-ready="true"]', { timeout: 10000 }).should('exist');
//   });

Cypress.Commands.add('appReady', () => {
  throw new Error(
    'cy.appReady() is not implemented. Edit cypress/support/app-ready.ts ' +
    'to define when your app is ready for tests. See ' +
    'rootspec/CONVENTIONS/technical.md for project-specific guidance.'
  );
});

declare global {
  namespace Cypress {
    interface Chainable {
      appReady(): Chainable<void>;
    }
  }
}

export {};