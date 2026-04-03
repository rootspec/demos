export interface HierarchyLevel {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  exampleContent: string;
  allowedReferences: number[];
}

export const levels: HierarchyLevel[] = [
  {
    id: 1,
    icon: '📘',
    title: 'Foundational Philosophy',
    subtitle: 'WHY & WHAT EXPERIENCE',
    exampleContent: `## Mission
Transform how people interact with their tasks by prioritizing sustainable engagement over guilt-driven productivity.

## Design Pillars
1. **Empowered Action** — Users feel in control and capable, never overwhelmed.
2. **Sustainable Engagement** — Energizing focus, not draining obligation.
3. **Calm Clarity** — Information is always organized and never chaotic.`,
    allowedReferences: [],
  },
  {
    id: 2,
    icon: '⚙️',
    title: 'Stable Truths',
    subtitle: 'WHAT Strategy',
    exampleContent: `## Truth: Simplicity over completeness
The product should do fewer things exceptionally well, rather than many things adequately.

**Trade-off:** We choose focused workflows over feature breadth.

## Success Criteria
Users can complete their primary task within 30 seconds of opening the app.`,
    allowedReferences: [1],
  },
  {
    id: 3,
    icon: '🔄',
    title: 'Interaction Architecture',
    subtitle: 'HOW Users Interact',
    exampleContent: `## Core Loop
1. **Trigger** — User opens the app with intent
2. **Action** — Quick capture or review of tasks
3. **Feedback** — Visual confirmation + progress update
4. **Investment** — Task completion builds toward goals

## Failure Mode
If the user abandons mid-task, state is auto-saved. No work is lost.`,
    allowedReferences: [1, 2],
  },
  {
    id: 4,
    icon: '🧩',
    title: 'Systems',
    subtitle: 'HOW It\'s Built',
    exampleContent: `## Task System
**Owns:** Task entities, status transitions, ordering
**State:** active → completed → archived

## Properties
- id (uuid), title (string), status (enum)
- created_at (timestamp), completed_at (timestamp | null)

## Interactions
Task System → Reward System: emits completion events`,
    allowedReferences: [1, 2, 3],
  },
  {
    id: 5,
    icon: '⚖️',
    title: 'Implementation',
    subtitle: 'Validation & Tuning',
    exampleContent: `## User Story: Quick Task Creation
Given I am a logged-in member viewing the main screen
When I click add and enter a task name
Then I should see the task appear in my list

## Fine Tuning
feedback_delay: 200ms
  @rationale: Fast enough to feel immediate, slow enough to animate`,
    allowedReferences: [1, 2, 3, 4],
  },
];
