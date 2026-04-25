/**
 * App-readiness implementation for Cypress tests
 *
 * This command should be customized to wait for your application to be
 * fully interactive before proceeding with test steps.
 *
 * For static sites: implement as a no-op
 * For hydrated sites: wait for critical components to be interactive
 *
 * Examples:
 * - Wait for React hydration to complete
 * - Wait for critical async data to load
 * - Wait for essential UI components to be ready
 */

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Wait for the application to be fully ready for interaction.
       * Must be implemented by the project.
       */
      appReady(): Chainable<Element>
    }
  }
}

// STUB IMPLEMENTATION - CUSTOMIZE FOR YOUR APPLICATION
Cypress.Commands.add('appReady', () => {
  throw new Error(
    'cy.appReady() is not implemented. ' +
    'Customize cypress/support/app-ready.ts for your application:\n' +
    '- Static sites: return cy.get("body")\n' +
    '- React apps: wait for hydration markers\n' +
    '- Data-driven apps: wait for initial data load\n' +
    'Document your chosen approach in CONVENTIONS/technical.md'
  )
})

export {}