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
      // Wait for React islands to hydrate
      cy.get('[data-test=theme-toggle][data-hydrated=true]', { timeout: 10000 }).should('exist');
    }
    else if ('click' in s) cy.get(s.click.selector).first().click();
    else if ('tap' in s) cy.get(s.tap.selector).first().click();
    else if ('fill' in s) {
      cy.get(s.fill.selector).clear().type(s.fill.value);
    }
    else if ('type' in s) {
      cy.get(s.type.selector).clear().type(s.type.text);
    }
    else if ('hover' in s) {
      cy.get(s.hover.selector).trigger('mouseover');
    }
    else if ('scrollTo' in s) {
      cy.get(s.scrollTo.selector).scrollIntoView();
    }
    else if ('dragSlider' in s) {
      // Simulate slider drag by setting value directly
      cy.get(s.dragSlider.selector).then(($slider) => {
        if ($slider[0] && 'value' in $slider[0]) {
          ($slider[0] as HTMLInputElement).value = s.dragSlider.position.toString();
          $slider.trigger('input').trigger('change');
        }
      });
    }
    else if ('swipe' in s) {
      // Simulate swipe by triggering appropriate touch events
      const direction = s.swipe.direction;
      if (direction === 'right') {
        cy.get(s.swipe.selector).trigger('touchstart', { touches: [{ clientX: 100, clientY: 100 }] })
          .trigger('touchmove', { touches: [{ clientX: 200, clientY: 100 }] })
          .trigger('touchend');
      }
    }
    else if ('reload' in s) {
      cy.reload();
    }
    else if ('pageLoads' in s) {
      cy.wait(500); // Brief wait for page load
    }
    else if ('setViewport' in s) {
      cy.viewport(s.setViewport.width, s.setViewport.height);
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
    else if ('shouldBeVisible' in s) {
      cy.get(s.shouldBeVisible.selector).should('be.visible');
    }
    else if ('shouldHaveClass' in s) {
      const sel = s.shouldHaveClass.selector;
      const className = s.shouldHaveClass.className;
      // Handle html element specifically
      if (sel === 'html') {
        cy.get('html').should('have.class', className);
      } else {
        cy.get(sel).should('have.class', className);
      }
    }
    else if ('shouldHaveAttribute' in s) {
      cy.get(s.shouldHaveAttribute.selector).should('have.attr', s.shouldHaveAttribute.attribute, s.shouldHaveAttribute.value);
    }
    else if ('shouldMatch' in s) {
      const regex = new RegExp(s.shouldMatch.regex);
      cy.get(s.shouldMatch.selector).should(($el) => {
        expect($el.text()).to.match(regex);
      });
    }
  }
}
