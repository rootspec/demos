import type { Step } from './schema';

export function runSetupSteps(steps: Step[]) {
	for (const s of steps ?? []) {
		if ('visit' in s) {
			cy.visit(s.visit);
			cy.appReady();
		} else if ('click' in s) cy.get(s.click.selector).first().click({ force: true });
		else if ('fill' in s) cy.get(s.fill.selector).clear().type(s.fill.value);
		else if ('awaitReady' in s) cy.appReady();
		else if ('loginAs' in s) {
			// No auth in this app — noop
		} else if ('seedItem' in s) {
			// Mock data is static — noop
		}
	}
}

export function runAssertionSteps(steps: Step[]) {
	for (const s of steps ?? []) {
		if ('shouldContain' in s) {
			cy.get(s.shouldContain.selector).should('contain', s.shouldContain.text);
		} else if ('shouldExist' in s) {
			cy.get(s.shouldExist.selector).should('exist');
		}
	}
}
