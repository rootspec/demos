import type { Step } from './schema';

export function runSetupSteps(steps: Step[]) {
  for (const s of steps ?? []) {
    if ('visit' in s) {
      cy.visit(s.visit as string);
    } else if ('click' in s) {
      cy.get((s as any).click.selector).first().click();
    } else if ('fill' in s) {
      cy.get((s as any).fill.selector).clear().type((s as any).fill.value);
    } else if ('type' in s) {
      cy.get((s as any).type.selector).clear().type((s as any).type.text);
    } else if ('loginAs' in s) {
      cy.task('loginAs', (s as any).loginAs);
    } else if ('seedItem' in s) {
      cy.task('seedItem', (s as any).seedItem);
    } else if ('scrollTo' in s) {
      cy.get((s as any).scrollTo.selector).scrollIntoView();
    } else if ('viewport' in s) {
      const vp = (s as any).viewport;
      cy.viewport(vp.width, vp.height);
    } else if ('focus' in s) {
      cy.get((s as any).focus.selector).first().focus();
    } else if ('keyPress' in s) {
      cy.focused().type(`{${(s as any).keyPress.key.toLowerCase()}}`);
    } else if ('pageLoad' in s) {
      // pageLoad: no-op, page already loaded by visit
    } else if ('mediaQuery' in s) {
      // mediaQuery: simulate via cy.window for reduced-motion
      const mq = (s as any).mediaQuery;
      if (mq.name === 'prefers-reduced-motion' && mq.value === 'reduce') {
        cy.window().then((win) => {
          // Override matchMedia for prefers-reduced-motion
          Object.defineProperty(win, 'matchMedia', {
            writable: true,
            value: (query: string) => ({
              matches: query.includes('prefers-reduced-motion'),
              media: query,
              onchange: null,
              addListener: () => {},
              removeListener: () => {},
              addEventListener: () => {},
              removeEventListener: () => {},
              dispatchEvent: () => false,
            }),
          });
        });
      }
    }
  }
}

export function runAssertionSteps(steps: Step[]) {
  for (const s of steps ?? []) {
    if ('shouldContain' in s) {
      cy.get((s as any).shouldContain.selector).should('contain', (s as any).shouldContain.text);
    } else if ('shouldExist' in s) {
      const se = (s as any).shouldExist;
      if (se.count !== undefined) {
        cy.get(se.selector).should('have.length', se.count);
      } else if (se.minCount !== undefined) {
        cy.get(se.selector).should('have.length.gte', se.minCount);
      } else {
        cy.get(se.selector).should('exist');
      }
    } else if ('shouldBeVisible' in s) {
      cy.get((s as any).shouldBeVisible.selector).should('be.visible');
    } else if ('shouldHaveAttr' in s) {
      const sha = (s as any).shouldHaveAttr;
      cy.get(sha.selector).should('have.attr', sha.attr, sha.value);
    } else if ('shouldMatch' in s) {
      const sm = (s as any).shouldMatch;
      cy.get(sm.selector).invoke('text').should('match', new RegExp(sm.pattern));
    } else if ('shouldHaveClass' in s) {
      const shc = (s as any).shouldHaveClass;
      cy.get(shc.selector).first().should('have.class', shc.class);
    } else if ('shouldNotHaveClass' in s) {
      const snhc = (s as any).shouldNotHaveClass;
      cy.get(snhc.selector).first().should('not.have.class', snhc.class);
    } else if ('shouldBeDisabled' in s) {
      cy.get((s as any).shouldBeDisabled.selector).should('be.disabled');
    } else if ('shouldHaveValue' in s) {
      const shv = (s as any).shouldHaveValue;
      cy.get(shv.selector).should('have.value', shv.value);
    } else if ('shouldNotOverflow' in s) {
      const sno = (s as any).shouldNotOverflow;
      if (sno.direction === 'x') {
        cy.get(sno.selector).then(($el) => {
          const el = $el[0];
          expect(el.scrollWidth).to.be.lte(el.clientWidth + 5); // 5px tolerance
        });
      }
    } else if ('shouldHaveStyle' in s) {
      const shs = (s as any).shouldHaveStyle;
      // For animation:none check, use computed style
      cy.get(shs.selector).then(($el) => {
        const style = window.getComputedStyle($el[0]);
        const val = style.getPropertyValue(shs.property);
        expect(val).to.include(shs.value);
      });
    }
  }
}
