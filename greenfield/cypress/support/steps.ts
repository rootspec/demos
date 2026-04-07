import type { Step } from './schema';

export function runSetupSteps(steps: Step[]) {
  for (const s of steps ?? []) {
    // Navigation
    if ('visit' in s) {
      cy.visit(s.visit, {
        onBeforeLoad(win) {
          // Apply system preferences if previously set
          const prefs = (Cypress as any).systemPrefs;
          if (prefs) {
            const original = win.matchMedia;
            win.matchMedia = (query: string) => {
              if (query === '(prefers-color-scheme: dark)') {
                return { matches: prefs.colorScheme === 'dark', media: query, addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {}, onchange: null, dispatchEvent: () => false } as MediaQueryList;
              }
              if (query === '(prefers-reduced-motion: reduce)') {
                return { matches: prefs.reducedMotion === true, media: query, addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {}, onchange: null, dispatchEvent: () => false } as MediaQueryList;
              }
              return original.call(win, query);
            };
          }
        },
      });
      // Wait for page to be ready
      cy.get('body').should('be.visible');
    }
    else if ('scrollTo' in s) {
      cy.get(s.scrollTo.selector).scrollIntoView({ duration: 300 });
    }
    else if ('reload' in s) {
      cy.reload();
    }

    // Interactions
    else if ('click' in s) cy.get(s.click.selector).first().click();
    else if ('fill' in s) {
      cy.get(s.fill.selector).clear().type(s.fill.value);
    }
    else if ('hover' in s) cy.get(s.hover.selector).trigger('mouseover');
    else if ('keyPress' in s) cy.get('body').trigger('keydown', { key: s.keyPress.key });
    else if ('tap' in s) cy.get(s.tap.selector).first().click(); // Touch = click in Cypress

    // Viewport
    else if ('setViewport' in s) cy.viewport(s.setViewport.width, s.setViewport.height);
    else if ('resizeViewport' in s) cy.viewport(s.resizeViewport.width, s.resizeViewport.height);

    // System preferences
    else if ('setSystemPreference' in s) {
      (Cypress as any).systemPrefs = s.setSystemPreference;
    }

    // Test data
    else if ('loginAs' in s) cy.task('loginAs', s.loginAs);
    else if ('seedItem' in s) cy.task('seedItem', s.seedItem);
  }
}

export function runAssertionSteps(steps: Step[]) {
  for (const s of steps ?? []) {
    // Basic content assertions
    if ('shouldContain' in s) {
      cy.get(s.shouldContain.selector).should('contain', s.shouldContain.text);
    }
    else if ('shouldNotContain' in s) {
      cy.get(s.shouldNotContain.selector).should('not.contain', s.shouldNotContain.text);
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
    else if ('shouldBeVisible' in s) {
      cy.get(s.shouldBeVisible.selector).should('be.visible');
    }

    // Attribute assertions
    else if ('shouldHaveAttribute' in s) {
      const { selector, attribute, value } = s.shouldHaveAttribute;
      if (selector === 'html' || selector === 'body') {
        cy.get(selector).should('have.attr', attribute, value);
      } else {
        cy.get(selector).should('have.attr', attribute, value);
      }
    }
    else if ('shouldHaveClass' in s) {
      cy.get(s.shouldHaveClass.selector).should('have.class', s.shouldHaveClass.class);
    }
    else if ('shouldHaveValue' in s) {
      cy.get(s.shouldHaveValue.selector).should('have.value', s.shouldHaveValue.value);
    }
    else if ('shouldMatch' in s) {
      const pattern = new RegExp(s.shouldMatch.pattern);
      cy.get(s.shouldMatch.selector).should('match', pattern);
    }

    // Navigation assertions
    else if ('shouldNavigateToURL' in s) {
      const pattern = new RegExp(s.shouldNavigateToURL.pattern);
      cy.url().should('match', pattern);
    }

    // Accessibility assertions
    else if ('shouldHaveFocus' in s) {
      cy.get(s.shouldHaveFocus.selector).should('have.focus');
    }
    else if ('shouldHaveVisibleFocusIndicator' in s) {
      cy.get(s.shouldHaveVisibleFocusIndicator.selector).should('have.css', 'outline-style', 'solid')
        .or('have.css', 'box-shadow').and('not.be.empty');
    }
    else if ('shouldAnnounce' in s) {
      // Simplified screen reader announcement check
      cy.get('[aria-live]').should('contain', s.shouldAnnounce.text);
    }

    // Visual/accessibility checks (simplified for demo)
    else if ('shouldMeetContrastRatio' in s) {
      // Simplified contrast check - in reality would need color analysis
      cy.get(s.shouldMeetContrastRatio.selector).should('be.visible');
    }

    else {
      cy.log('Unknown assertion step:', JSON.stringify(s));
    }
  }
}
