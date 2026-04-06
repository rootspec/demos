describe('RootSpec Marketing Site - Content Sections', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('US-001: Version Display', () => {
    it('AC-001-1: Shows RootSpec version v7.0.2 in hero section', () => {
      cy.get('[data-test="version-display"]').should('be.visible');
      cy.get('[data-test="version-display"]').should('contain', 'v7.0.2');
    });

    it('AC-001-3: Version remains visible on mobile', () => {
      cy.viewport(375, 667); // iPhone SE
      cy.get('[data-test="version-display"]').should('be.visible');
      cy.get('[data-test="version-display"]').should('contain', 'v7.0.2');
    });
  });

  describe('US-002: Meta Banner', () => {
    it('AC-002-1: Shows banner explaining site generation from SEED.md', () => {
      cy.get('[data-test="meta-banner"]').should('be.visible');
      cy.get('[data-test="meta-banner"]').should('contain', 'Built with RootSpec');
      cy.get('[data-test="meta-banner"]').should('contain', 'simple product description');
    });

    it('AC-002-2: Provides links to SEED.md and spec files', () => {
      cy.get('[data-test="seed-link"]').should('be.visible');
      cy.get('[data-test="seed-link"]').should('have.attr', 'href').and('include', 'SEED.md');
      cy.get('[data-test="spec-link"]').should('be.visible');
      cy.get('[data-test="spec-link"]').should('have.attr', 'href').and('include', 'rootspec');
    });
  });

  describe('US-003: Problem Statement', () => {
    it('AC-003-1: Describes specification drift, philosophy gaps, and unreliable AI', () => {
      cy.get('[data-test="problem-section"]').should('be.visible');
      cy.get('[data-test="spec-drift-problem"]').should('be.visible');
      cy.get('[data-test="philosophy-gap-problem"]').should('be.visible');
      cy.get('[data-test="ai-unreliability-problem"]').should('be.visible');
    });

    it('AC-003-2: References familiar Google Docs spec frustrations', () => {
      cy.get('[data-test="spec-drift-problem"]').should('contain', 'Google Doc');
    });

    it('AC-003-3: Highlights key problems for easy scanning', () => {
      cy.get('[data-test="problem-section"] h3').should('have.length.at.least', 3);
      cy.get('[data-test="problem-section"] ul li').should('have.length.at.least', 3);
    });
  });

  describe('US-004: Methodology Explanation', () => {
    it('AC-004-1: Explains five levels clearly', () => {
      cy.get('[data-test="how-it-works-section"]').should('be.visible');
      cy.get('[data-test="levels-hierarchy"]').should('be.visible');
      cy.get('[data-test="level-1"]').should('contain', 'Philosophy');
      cy.get('[data-test="level-2"]').should('contain', 'Truths');
      cy.get('[data-test="level-3"]').should('contain', 'Interactions');
      cy.get('[data-test="level-4"]').should('contain', 'Systems');
      cy.get('[data-test="level-5"]').should('contain', 'Implementation');
    });

    it('AC-004-2: Makes upward-only reference rule explicit', () => {
      cy.get('[data-test="upward-rule"]').should('be.visible');
      cy.get('[data-test="upward-rule"]').should('contain', 'Upward-Only');
      cy.get('[data-test="upward-rule"]').should('contain', 'above');
    });

    it('AC-004-3: Prominently features four commands', () => {
      cy.get('[data-test="commands-workflow"]').should('be.visible');
      cy.get('[data-test="init-command"]').should('contain', '/rs-init');
      cy.get('[data-test="spec-command"]').should('contain', '/rs-spec');
      cy.get('[data-test="impl-command"]').should('contain', '/rs-impl');
      cy.get('[data-test="validate-command"]').should('contain', '/rs-validate');
    });
  });

  describe('US-005: Getting Started Information', () => {
    it('AC-005-1: Shows clear instructions to run /rs-init', () => {
      cy.get('[data-test="cta-section"]').should('be.visible');
      cy.get('[data-test="step-init"]').should('contain', '/rs-init');
    });

    it('AC-005-2: Provides links to GitHub and documentation', () => {
      cy.get('[data-test="github-link"]').should('be.visible');
      cy.get('[data-test="github-link"]').should('have.attr', 'href').and('include', 'github.com');
      cy.get('[data-test="docs-link"]').should('be.visible');
    });

    it('AC-005-3: Shows community support links', () => {
      cy.get('[data-test="community-section"]').should('be.visible');
      cy.get('[data-test="issues-link"]').should('be.visible');
      cy.get('[data-test="discussions-link"]').should('be.visible');
      cy.get('[data-test="contribute-link"]').should('be.visible');
    });
  });

  describe('US-006: Builder Attribution', () => {
    it('AC-006-1: Identifies site builder by name', () => {
      cy.get('[data-test="footer"]').should('be.visible');
      cy.get('[data-test="builder-name"]').should('contain', 'Claude Sonnet 4');
    });

    it('AC-006-2: Shows build date', () => {
      cy.get('[data-test="build-date"]').should('be.visible');
      cy.get('[data-test="build-date"]').should('not.be.empty');
    });

    it('AC-006-3: Attribution is clearly formatted and professional', () => {
      cy.get('[data-test="attribution"]').should('be.visible');
      cy.get('[data-test="attribution"]').should('contain', 'Built by');
      cy.get('[data-test="attribution"]').should('contain', 'RootSpec methodology');
    });
  });
});