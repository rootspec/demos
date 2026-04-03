export const withoutSpec = `## Requirements Doc (v3, last updated ???)

**User Stories:**
- As a user, I want to create tasks
- As a user, I want to see my tasks
- As a user, I want to complete tasks

**Notes from standup:**
- "Make the task list look nice"
- "Add some kind of reward thing"
- "Should probably have dark mode"

**Open questions:**
- What happens when you complete a task?
- How do rewards work exactly?
- Who decided on the point values?

_Last edited by someone, probably, at some point._`;

export const withSpec = `## Level 1: Philosophy
**Mission:** Sustainable productivity through energy awareness
**Pillar:** "Empowered Action" — users feel in control, never overwhelmed

## Level 2: Truth
Complexity must be emergent, not imposed.
**Trade-off:** We choose simple rules over complex features.

## Level 4: Task System
- Status: active → completed → archived
- Completion emits event to Reward System
- Points: [base_task_points] × difficulty multiplier

## Level 5: User Story
\`\`\`yaml
id: US-101
title: Add new tasks quickly
acceptance_criteria:
  - id: AC-101-1
    given:
      - loginAs: member
    when:
      - click: { selector: '[data-test=add-task]' }
    then:
      - shouldExist: { selector: '[data-test=task-item]' }
\`\`\`

_Every feature traces to a design pillar. Every test traces to a story._`;
