import type { Step } from './schema';

export function runSetupSteps(steps: Step[]) {
  for (const s of steps ?? []) {
    if ('visit' in s) safeVisit(s.visit);
    else if ('click' in s) cy.get(s.click.selector).first().click();
    else if ('fill' in s) cy.get(s.fill.selector).clear().type(s.fill.value);
    else if ('loginAs' in s) cy.task('loginAs', s.loginAs);
    else if ('seedItem' in s) cy.task('seedItem', s.seedItem);
    else if ('awaitReady' in s) cy.appReady();
  }
}

export function runAssertionSteps(steps: Step[]) {
  for (const s of steps ?? []) {
    if ('shouldContain' in s) {
      cy.get(s.shouldContain.selector).should('contain', s.shouldContain.text);
    }
    else if ('shouldExist' in s) {
      cy.get(s.shouldExist.selector).should('exist');
    }
  }
}

// Combines two contracts:
// 1. baseUrl must be host:port only — if it carries a path AND the visit
//    target starts with that path, the runner concatenates them into a 404
//    like /sub/path/sub/path/. Throws a clear error rather than silently
//    normalizing — keeps the contract visible to maintainers.
// 2. After visit, wait for app readiness via cy.appReady(). What 'ready' means
//    is project-defined in cypress/support/app-ready.ts. The framework makes
//    no claim about HOW the app signals readiness — only that it must.
function safeVisit(target: string) {
  const baseUrl = (Cypress.config('baseUrl') || '').replace(/\/+$/, '');
  let basePath = '';
  try { basePath = new URL(baseUrl).pathname; } catch { basePath = ''; }
  if (basePath && basePath !== '/' && target.startsWith(basePath)) {
    throw new Error(
      `Invalid baseUrl: '${baseUrl}' contains path '${basePath}'. ` +
      'baseUrl must be host:port only; deploy paths belong in visit targets. ' +
      `Strip '${basePath}' from cypress.config.ts baseUrl.`
    );
  }
  cy.visit(target);
  cy.appReady();
}
