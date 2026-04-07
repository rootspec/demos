import React, { useState, useEffect } from 'react';
import { templates, pillarSuggestions } from '../data/wizard';

interface WizardState {
  step: number;
  mission: string;
  pillars: string[];
  interaction: string;
}

export default function SpecWizard() {
  const [state, setState] = useState<WizardState>({
    step: 1,
    mission: '',
    pillars: [],
    interaction: '',
  });

  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');

  // Persist state in session storage
  useEffect(() => {
    const saved = sessionStorage.getItem('spec-wizard-state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
      } catch (error) {
        console.error('Failed to parse saved wizard state:', error);
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('spec-wizard-state', JSON.stringify(state));
  }, [state]);

  // Input validation
  const validateMission = (mission: string) => {
    if (mission.length > 200) {
      setValidationError('Mission must be 200 characters or less');
      return false;
    }
    // Basic HTML sanitization check
    if (mission.includes('<') || mission.includes('>')) {
      setValidationError('HTML tags are not allowed');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleMissionChange = (value: string) => {
    // Sanitize HTML for security (US-103-2)
    const sanitized = value.replace(/<[^>]*>/g, '');
    setState(prev => ({ ...prev, mission: sanitized }));
    validateMission(sanitized);
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setState(prev => ({ ...prev, mission: template.mission }));
      setValidationError('');
    }
  };

  const handlePillarToggle = (pillarId: string) => {
    setState(prev => ({
      ...prev,
      pillars: prev.pillars.includes(pillarId)
        ? prev.pillars.filter(p => p !== pillarId)
        : [...prev.pillars, pillarId]
    }));
  };

  const handleNextStep = () => {
    if (state.step === 1 && !state.mission.trim()) {
      setValidationError('Mission is required');
      return;
    }
    if (state.step === 2 && state.pillars.length === 0) {
      setValidationError('Select at least one pillar');
      return;
    }
    setValidationError('');
    setState(prev => ({ ...prev, step: prev.step + 1 }));
  };

  const handlePrevStep = () => {
    setState(prev => ({ ...prev, step: prev.step - 1 }));
  };

  const generatePreview = () => {
    setShowPreview(true);
  };

  const renderPreview = () => {
    const selectedPillarLabels = state.pillars
      .map(id => pillarSuggestions.find(p => p.id === id)?.label)
      .filter(Boolean);

    return (
      <div data-test="spec-preview" className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-6 border">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Generated RootSpec Preview</h4>
        <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono bg-white dark:bg-gray-900 p-4 rounded border overflow-x-auto">
{`# L1: Philosophy

## Mission
${state.mission}

## Design Pillars
${selectedPillarLabels.map((pillar, i) => `${i + 1}. **${pillar}**`).join('\n')}

# L2: Truths
(Define core truths and trade-offs that guide decisions)

# L3: Interactions
## Core Flow
${state.interaction || '(Define your primary user interaction)'}

# L4: Systems
(Define the systems needed to support your interactions)

# L5: Implementation
(User stories and acceptance criteria will be generated here)`}
        </pre>
      </div>
    );
  };

  return (
    <div data-test="spec-wizard" className="max-w-4xl mx-auto" id="wizard">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Try the Spec Wizard
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Experience creating a RootSpec through our guided three-step process.
          Your progress is saved as you work.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-center items-center space-x-4 mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                data-test={`step-${step}`}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  state.step >= step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`w-12 h-0.5 mx-2 ${
                    state.step > step ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div data-test="step-indicator" className="text-center text-sm text-gray-600 dark:text-gray-400">
          Step {state.step} of 3
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
        {/* Step 1: Mission */}
        {state.step === 1 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Define Your Mission
            </h3>

            {/* Template Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Choose a template or write your own:
              </label>
              <select
                data-test="template-select"
                value={selectedTemplate}
                onChange={(e) => handleTemplateSelect(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a template...</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id} data-test={`mission-template-${template.id}`}>
                    {template.label}
                  </option>
                ))}
                <option value="custom" data-test="custom-option">Custom Mission</option>
              </select>
            </div>

            {/* Mission Input */}
            <div className="mb-4">
              <label htmlFor="mission-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mission Statement:
              </label>
              <textarea
                id="mission-input"
                data-test="mission-input"
                value={state.mission}
                onChange={(e) => handleMissionChange(e.target.value)}
                placeholder="What transformation do you want to create for your users?"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical min-h-[100px]"
                maxLength={250}
              />
              <div className="flex justify-between items-center mt-1">
                <span
                  data-test="character-count"
                  className={`text-xs ${
                    state.mission.length > 200 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {state.mission.length}/200 characters
                </span>
                {validationError && (
                  <span data-test="validation-error" className="text-xs text-red-500">
                    {validationError}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Pillars */}
        {state.step === 2 && (
          <div data-test="step-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Select Your Design Pillars
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choose 2-4 pillars that will guide all design decisions:
            </p>

            <div data-test="pillar-suggestions" className="grid md:grid-cols-2 gap-4 mb-6">
              {pillarSuggestions.map((pillar) => (
                <label
                  key={pillar.id}
                  className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${
                    state.pillars.includes(pillar.id)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={state.pillars.includes(pillar.id)}
                    onChange={() => handlePillarToggle(pillar.id)}
                    className="sr-only"
                  />
                  <div className="font-medium text-gray-900 dark:text-white">
                    {pillar.label}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {pillar.description}
                  </div>
                </label>
              ))}
            </div>

            {validationError && (
              <div data-test="validation-error" className="text-sm text-red-500 mb-4">
                {validationError}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Interaction */}
        {state.step === 3 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Describe the Core Interaction
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              What's the main thing users will do in your product?
            </p>

            <div className="mb-6">
              <label htmlFor="interaction-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Core User Interaction:
              </label>
              <textarea
                id="interaction-input"
                data-test="interaction-input"
                value={state.interaction}
                onChange={(e) => setState(prev => ({ ...prev, interaction: e.target.value }))}
                placeholder="Example: User clicks add task, types the task name, and sees it appear in their list"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical min-h-[100px]"
              />
            </div>

            <button
              data-test="generate-preview"
              onClick={generatePreview}
              className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Generate Spec Preview
            </button>

            {showPreview && renderPreview()}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handlePrevStep}
            disabled={state.step === 1}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {state.step < 3 && (
            <button
              data-test="next-step"
              onClick={handleNextStep}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Next Step
            </button>
          )}
        </div>
      </div>
    </div>
  );
}