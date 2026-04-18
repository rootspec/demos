// Track console errors and network failures during tests.
// Injected by the orchestrator before each validate phase.
// Results are read by the static review phase.
// Self-initializing — works even outside the orchestrator (e.g. validate-deploy CI).

const allIssues: Array<{ type: string; test: string; message: string }> = [];

Cypress.on('uncaught:exception', (err) => {
  allIssues.push({ type: 'console_error', test: '', message: err.message });
  return false;
});

let currentNetwork404s: string[] = [];

beforeEach(() => {
  currentNetwork404s = [];
  cy.intercept('**/*', (req) => {
    req.continue((res) => {
      if (res.statusCode >= 400) {
        currentNetwork404s.push(`${res.statusCode} ${req.url}`);
      }
    });
  });
});

afterEach(function () {
  const testName = this.currentTest?.title ?? '';
  for (const msg of currentNetwork404s) {
    allIssues.push({ type: 'network_404', test: testName, message: msg });
  }
});

after(() => {
  cy.writeFile('rootspec/runtime-issues.json', allIssues, { log: false });
});
