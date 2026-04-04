import { defineConfig } from 'cypress';
import { rootspecReporter } from './cypress/support/rootspec-reporter';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: 'cypress/support/e2e.ts',
    defaultCommandTimeout: 8000,
    retries: { runMode: 2, openMode: 0 },
    video: false,
    setupNodeEvents(on) {
      rootspecReporter(on, { statusPath: 'rootspec/tests-status.json' });
    },
  },
});
