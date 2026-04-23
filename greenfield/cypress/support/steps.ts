import type { Step } from './schema';

export function runSetupSteps(steps: Step[]) {
  for (const s of steps ?? []) {
    if ('visit' in s) cy.visit(s.visit);
    else if ('click' in s) cy.get(s.click.selector).first().click();
    else if ('fill' in s) cy.get(s.fill.selector).clear().type(s.fill.value);
    else if ('loginAs' in s) cy.task('loginAs', s.loginAs);
    else if ('seedItem' in s) cy.task('seedItem', s.seedItem);
  }
}

export function runAssertionSteps(steps: Step[]) {
  for (const s of steps ?? []) {
    if ('shouldContain' in s) {
      // For inputs/textareas check .value, for other elements check text content
      cy.get(s.shouldContain.selector).then(($el) => {
        const tagName = $el.prop('tagName')?.toLowerCase();
        if (tagName === 'input' || tagName === 'textarea') {
          cy.wrap($el).should('have.value', s.shouldContain.text);
        } else {
          cy.wrap($el).should('contain', s.shouldContain.text);
        }
      });
    }
    else if ('shouldExist' in s) {
      cy.get(s.shouldExist.selector).should('exist');
    }
  }
}
