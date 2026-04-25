// Capture a full-page screenshot after each passing criterion.
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
