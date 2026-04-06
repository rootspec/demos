import type { Step } from './schema';

export function runSetupSteps(steps: Step[]) {
  for (const s of steps ?? []) {
    if ('visit' in s) {
      cy.visit(s.visit, {
        onBeforeLoad(win) {
          // Force light mode to prevent system dark mode from affecting tests
          const original = win.matchMedia;
          win.matchMedia = (query: string) => {
            if (query === '(prefers-color-scheme: dark)') {
              return { matches: false, media: query, addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {}, onchange: null, dispatchEvent: () => false } as MediaQueryList;
            }
            return original.call(win, query);
          };
        },
      });
      // Wait for page to load
      cy.get('body', { timeout: 10000 }).should('exist');
    }
    else if ('click' in s) cy.get(s.click.selector).first().click();
    else if ('fill' in s) {
      cy.get(s.fill.selector).clear().type(s.fill.value);
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
      const sel = s.shouldExist.selector;
      // Handle selectors that may match html/body (cy.get only searches within body)
      if (sel.startsWith('[data-theme')) {
        const val = sel.match(/=(\w+)/)?.[1];
        cy.get('html').should('have.attr', 'data-theme', val);
      } else {
        cy.get(sel).should('exist');
      }
    }
  }
}
