export interface WizardTemplate {
  id: string;
  label: string;
  mission: string;
}

export interface PillarSuggestion {
  id: string;
  label: string;
  description: string;
}

export const templates: WizardTemplate[] = [
  {
    id: 'productivity',
    label: 'Productivity Tool',
    mission: 'Help people accomplish meaningful work without burning out',
  },
  {
    id: 'learning',
    label: 'Learning Platform',
    mission: 'Make complex subjects accessible through structured, interactive learning',
  },
  {
    id: 'collaboration',
    label: 'Team Collaboration',
    mission: 'Enable distributed teams to work together as effectively as in-person',
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    mission: 'Connect creators with the people who need what they make',
  },
];

export const pillarSuggestions: PillarSuggestion[] = [
  { id: 'empowered', label: 'Empowered Action', description: 'Users feel in control and capable' },
  { id: 'clarity', label: 'Calm Clarity', description: 'Information is always organized' },
  { id: 'trust', label: 'Earned Trust', description: 'Every interaction builds confidence' },
  { id: 'delight', label: 'Subtle Delight', description: 'Small moments of unexpected joy' },
  { id: 'flow', label: 'Effortless Flow', description: 'Tasks feel natural, never forced' },
  { id: 'belonging', label: 'Genuine Belonging', description: 'Users feel part of something meaningful' },
  { id: 'mastery', label: 'Growing Mastery', description: 'Users get better over time' },
  { id: 'safety', label: 'Confident Safety', description: 'Users never fear losing work or data' },
];
