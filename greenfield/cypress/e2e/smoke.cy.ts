import { runSetupSteps, runAssertionSteps } from '../support/steps';

describe('Smoke Tests', () => {
  it('US-001-1: Banner displays generation transparency', () => {
    runSetupSteps([{ visit: '/' }]);
    runAssertionSteps([
      { shouldExist: { selector: '[data-test=meta-banner]' } },
      { shouldContain: { selector: '[data-test=meta-banner]', text: 'This site was generated from a ~100-line product description' } }
    ]);
  });

  it('US-001-2: Banner links to source files', () => {
    runSetupSteps([{ visit: '/' }]);
    runAssertionSteps([
      { shouldExist: { selector: '[data-test=spec-link]' } }
    ]);
  });

  it('US-002-1: Hero communicates purpose immediately', () => {
    runSetupSteps([{ visit: '/' }]);
    runAssertionSteps([
      { shouldExist: { selector: '[data-test=hero]' } },
      { shouldContain: { selector: '[data-test=hero-tagline]', text: 'RootSpec' } },
      { shouldExist: { selector: '[data-test=hero-description]' } }
    ]);
  });

  it('US-002-2: Version badge displays current framework version', () => {
    runSetupSteps([{ visit: '/' }]);
    runAssertionSteps([
      { shouldExist: { selector: '[data-test=version-badge]' } },
      { shouldMatch: { selector: '[data-test=version-badge]', pattern: 'v\\d+\\.\\d+\\.\\d+' } }
    ]);
  });
});