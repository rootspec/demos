import type { Step } from './schema';

export function runSetupSteps(steps: Step[]) {
  for (const s of steps ?? []) {
    if ('visit' in s) safeVisit(s.visit);
    else if ('click' in s) cy.get(s.click.selector).first().click();
    else if ('fill' in s) cy.get(s.fill.selector).clear().type(s.fill.value);
    else if ('loginAs' in s) cy.task('loginAs', s.loginAs);
    else if ('seedItem' in s) cy.task('seedItem', s.seedItem);
    else if ('awaitReady' in s) cy.appReady();
    else if ('setViewport' in s) cy.viewport(s.setViewport.width, s.setViewport.height);
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
    else if ('shouldHaveNoOverflowX' in s) {
      cy.get('body').then($body => {
        expect($body[0].scrollWidth).to.be.lte($body[0].clientWidth);
      });
    }
    else if ('shouldFitViewport' in s) {
      cy.get('body').then($body => {
        expect($body[0].scrollWidth).to.be.lte(s.shouldFitViewport.width);
      });
    }
  }
}

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
