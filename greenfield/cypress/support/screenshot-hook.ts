// Capture a full-page screenshot after each passing criterion.
// Screenshots land at cypress/screenshots/<spec>/US-101--AC-101-1.png
// Used by /rs-review for visual quality inspection.
afterEach(function () {
  if (this.currentTest?.state === 'passed') {
    const titles: string[] = (this.currentTest as any).titlePath?.() ?? [];
    const joined = titles.join(' ');
    const storyMatch = joined.match(/US-\d+/);
    const critMatch = joined.match(/AC-\d+-\d+/);
    if (storyMatch) {
      const name = critMatch
        ? `${storyMatch[0]}--${critMatch[0]}`
        : storyMatch[0];
      cy.screenshot(name, { capture: 'fullPage' });
    }
  }
});
