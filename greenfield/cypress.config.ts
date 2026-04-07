import { defineConfig } from 'cypress';
import { rootspecReporter } from './cypress/support/rootspec-reporter';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4321',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      rootspecReporter(on, { statusPath: 'rootspec/tests-status.json' });
    },
  },
});