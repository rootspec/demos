import { useState } from 'react';

const LEVELS = [
  {
    num: 1,
    name: 'Philosophy',
    tagline: 'Why we build this way',
    example: `# Why does this product exist?
What problem are we solving?
What change do we want in the world?
What will we never do?`,
    description: 'The immutable "why" — product mission, values, and principles that every decision flows from.',
  },
  {
    num: 2,
    name: 'Truths',
    tagline: 'What we know to be true',
    example: `## Inviolable Principles
- No third-party API calls at runtime
- All data stays on the user's device
- Every feature must have a failing test before code`,
    description: 'Hard constraints and non-negotiable truths that the spec never violates.',
  },
  {
    num: 3,
    name: 'Interactions',
    tagline: 'How users flow through the product',
    example: `## Core Journey: First Use
GIVEN a new visitor lands on the page
WHEN they view the hero section
THEN they understand the product in under 10 seconds`,
    description: 'User journeys and interaction flows in plain language — no implementation details.',
  },
  {
    num: 4,
    name: 'Systems',
    tagline: 'What owns what',
    example: `## CONTENT_SYSTEM
**Owns:** Hero, meta banner, comparison section
**Reads from:** .rootspec.json (version)
**Provides to:** LAYOUT_SYSTEM (rendered sections)`,
    description: 'System boundaries, ownership, and contracts between system components.',
  },
  {
    num: 5,
    name: 'Implementation',
    tagline: 'Testable acceptance criteria',
    example: `id: US-101
title: Understand what RootSpec is
acceptance_criteria:
  - id: AC-101-1
    given: [visit: '/']
    then:
      - shouldExist:
          selector: '[data-test=hero-tagline]'`,
    description: 'Machine-readable user stories with given/when/then acceptance criteria. These become your Cypress tests.',
  },
];

export default function HierarchyExplorer() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (num: number) => {
    setExpanded(prev => prev === num ? null : num);
  };

  return (
    <div className="hierarchy-explorer">
      {LEVELS.map((level) => {
        const isExpanded = expanded === level.num;
        return (
          <div key={level.num} className={`level-item ${isExpanded ? 'level-expanded' : ''}`}>
            <button
              data-test={`hierarchy-level-${level.num}`}
              aria-expanded={isExpanded}
              className="level-header"
              onClick={() => toggle(level.num)}
            >
              <div className="level-left">
                <span className="level-num">L{level.num}</span>
                <div className="level-text">
                  <span className="level-name">{level.name}</span>
                  <span className="level-tagline">{level.tagline}</span>
                </div>
              </div>
              <span className="level-chevron" aria-hidden="true">
                {isExpanded ? '▲' : '▼'}
              </span>
            </button>
            {isExpanded && (
              <div
                data-test={`hierarchy-level-${level.num}-content`}
                className="level-content"
              >
                <p className="level-description">{level.description}</p>
                <pre className="level-example"><code>{level.example}</code></pre>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
