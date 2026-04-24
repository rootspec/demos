import { defineConfig } from 'cypress';
import { rootspecReporter } from './cypress/support/rootspec-reporter';

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:5173',
		supportFile: 'cypress/support/e2e.ts',
		specPattern: 'cypress/e2e/**/*.cy.ts',
		video: false,
		screenshotOnRunFailure: false,
		setupNodeEvents(on) {
			rootspecReporter(on, { statusPath: 'rootspec/tests-status.json' });
		}
	}
});
