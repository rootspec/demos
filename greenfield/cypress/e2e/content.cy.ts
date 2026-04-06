import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { UserStorySchema, type UserStory, type AcceptanceCriterion } from '../support/schema';
import { runSetupSteps, runAssertionSteps } from '../support/steps';

const storiesPath = path.join(process.cwd(), 'rootspec/05.IMPLEMENTATION/USER_STORIES/by_phase/MVP/content.yaml');
const storiesYaml = fs.readFileSync(storiesPath, 'utf8');
const storiesData = yaml.load(storiesYaml) as any;

// Define test cases for US-001
const US_001_TESTS: AcceptanceCriterion[] = [
  {
    id: 'AC-001-1',
    title: 'Banner appears prominently on page',
    given: [{ visit: '/' }],
    then: [{ shouldExist: { selector: '[data-test=meta-banner]' } }]
  },
  {
    id: 'AC-001-2',
    title: 'Banner text explains site was generated from ~100-line description',
    given: [{ visit: '/' }],
    then: [{ shouldContain: { selector: '[data-test=meta-banner]', text: '~100-line product description' } }]
  },
  {
    id: 'AC-001-3',
    title: 'Banner includes links to SEED.md and spec files in GitHub repo',
    given: [{ visit: '/' }],
    then: [
      { shouldExist: { selector: '[data-test=seed-link]' } },
      { shouldExist: { selector: '[data-test=spec-link]' } }
    ]
  },
  {
    id: 'AC-001-4',
    title: 'Banner acknowledges rough edges result from minimal human guidance',
    given: [{ visit: '/' }],
    then: [{ shouldContain: { selector: '[data-test=meta-banner]', text: 'rough edges result from minimal human guidance' } }]
  },
  {
    id: 'AC-001-5',
    title: 'Banner text conveys honesty and transparency about the demo nature',
    given: [{ visit: '/' }],
    then: [{ shouldContain: { selector: '[data-test=meta-banner]', text: 'Demo Site' } }]
  }
];

describe('Content User Stories', () => {
  describe('US-001: Meta Banner Display', () => {
    it('AC-001-1: Banner appears prominently on page', () => {
      cy.visit('/');
      cy.get('[data-test=meta-banner]', { timeout: 30000 }).should('exist');
    });

    it('AC-001-2: Banner text explains site was generated from ~100-line description', () => {
      cy.visit('/');
      cy.get('[data-test=meta-banner]').should('contain', '~100-line product description');
    });

    it('AC-001-3: Banner includes links to SEED.md and spec files', () => {
      cy.visit('/');
      cy.get('[data-test=seed-link]').should('exist');
      cy.get('[data-test=spec-link]').should('exist');
    });

    it('AC-001-4: Banner acknowledges rough edges result from minimal guidance', () => {
      cy.visit('/');
      cy.get('[data-test=meta-banner]').should('contain', 'rough edges result from minimal human guidance');
    });

    it('AC-001-5: Banner text conveys honesty about demo nature', () => {
      cy.visit('/');
      cy.get('[data-test=meta-banner]').should('contain', 'Demo Site');
    });
  });
});