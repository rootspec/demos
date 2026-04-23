import type { Step } from './schema';

export function runSetupSteps(steps: Step[]) {
  for (const s of steps ?? []) {
    if ('visit' in s) {
      cy.visit(s.visit);
    }
    else if ('click' in s) {
      // Click the first visible matching element (important for multi-step UIs with hidden elements)
      cy.get(s.click.selector).filter(':visible').first().click();
    }
    else if ('fill' in s) {
      cy.get(s.fill.selector).click().clear().type(s.fill.value);
    }
    else if ('loginAs' in s) cy.task('loginAs', s.loginAs);
    else if ('seedItem' in s) cy.task('seedItem', s.seedItem);
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
