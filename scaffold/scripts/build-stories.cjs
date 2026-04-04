#!/usr/bin/env node
// Reads YAML user stories and writes a JSON fixture for Cypress
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const storyDir = path.join(__dirname, '..', 'rootspec/05.IMPLEMENTATION/USER_STORIES/by_phase/MVP');
const outDir = path.join(__dirname, '..', 'cypress/fixtures');

const files = fs.readdirSync(storyDir).filter(f => f.endsWith('.yaml'));
const stories = [];

for (const file of files) {
	const content = fs.readFileSync(path.join(storyDir, file), 'utf8');
	const docs = yaml.loadAll(content);
	for (const doc of docs) {
		if (doc && typeof doc === 'object' && 'id' in doc) {
			stories.push(doc);
		}
	}
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'stories.json'), JSON.stringify(stories, null, 2));
console.log(`Generated ${stories.length} stories from ${files.length} files`);
