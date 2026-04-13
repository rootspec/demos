import { defineConfig } from 'cypress';
import { rootspecReporter } from './cypress/support/rootspec-reporter';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    video: false,
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      rootspecReporter(on, { statusPath: 'rootspec/tests-status.json' });

      // Placeholder tasks — customize bodies as needed
      on('task', {
        loginAs(role: string) { return null; },
        seedItem(data: Record<string, unknown>) { return null; },
        resetDatabase() { return null; },
        log(message: string) { console.log(message); return null; },
      });

      return config;
    },
  },
});
