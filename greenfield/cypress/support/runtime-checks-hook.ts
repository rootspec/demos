// Track console errors and network failures during tests.
// Injected by the orchestrator before each validate phase.
// Results are read by the static review phase.

const runtimeErrors: string[] = [];
const network404s: string[] = [];

Cypress.on('uncaught:exception', (err) => {
  runtimeErrors.push(err.message);
  return false;
});

beforeEach(() => {
  runtimeErrors.length = 0;
  network404s.length = 0;
  cy.intercept('**/*', (req) => {
    req.continue((res) => {
      if (res.statusCode >= 400) {
        network404s.push(`${res.statusCode} ${req.url}`);
      }
    });
  });
});

afterEach(function () {
  const issues = [
    ...runtimeErrors.map(e => ({ type: 'console_error' as const, test: this.currentTest?.title ?? '', message: e })),
    ...network404s.map(e => ({ type: 'network_404' as const, test: this.currentTest?.title ?? '', message: e })),
  ];
  if (issues.length > 0) {
    cy.readFile('rootspec/runtime-issues.json', { log: false }).then((existing: unknown) => {
      const arr = Array.isArray(existing) ? existing : [];
      cy.writeFile('rootspec/runtime-issues.json', [...arr, ...issues], { log: false });
    });
  }
});
