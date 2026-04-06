import { useState } from 'react';
import { templates, pillarSuggestions } from '../data/wizard';

type WizardStep = 'idea' | 'mission' | 'pillars' | 'interaction' | 'result';

export default function SpecWizard() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('idea');
  const [productIdea, setProductIdea] = useState('');
  const [selectedMission, setSelectedMission] = useState('');
  const [selectedPillars, setSelectedPillars] = useState<string[]>([]);
  const [interaction, setInteraction] = useState('');
  const [generatedSpec, setGeneratedSpec] = useState('');

  const nextStep = () => {
    if (currentStep === 'idea' && productIdea) setCurrentStep('mission');
    else if (currentStep === 'mission' && selectedMission) setCurrentStep('pillars');
    else if (currentStep === 'pillars' && selectedPillars.length > 0) setCurrentStep('interaction');
    else if (currentStep === 'interaction' && interaction) generateSpec();
  };

  const generateSpec = () => {
    const selectedTemplate = templates.find(t => t.id === selectedMission);
    const selectedPillarObjs = selectedPillars.map(id =>
      pillarSuggestions.find(p => p.id === id)?.label
    ).filter(Boolean);

    const spec = `# ${productIdea} — RootSpec

## L1 — PHILOSOPHY

**Mission**: ${selectedTemplate?.mission || 'Help users accomplish their goals efficiently and effectively.'}

**Design Pillars**: ${selectedPillarObjs.join(', ')}

## L2 — TRUTHS

- Users want to feel productive and accomplished
- ${productIdea.toLowerCase()} should reduce cognitive load
- Trust is built through consistent, reliable interactions

## L3 — INTERACTIONS

**Core User Flow**: ${interaction}

## L4 — SYSTEMS

- User Interface System
- Data Management System
- Business Logic System

## L5 — IMPLEMENTATION

**User Stories**: Generated from the core interaction and system requirements.`;

    setGeneratedSpec(spec);
    setCurrentStep('result');
  };

  const togglePillar = (pillarId: string) => {
    setSelectedPillars(prev =>
      prev.includes(pillarId)
        ? prev.filter(id => id !== pillarId)
        : [...prev, pillarId]
    );
  };

  return (
    <div data-test="spec-wizard" className="space-y-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Try the Spec Wizard</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Walk through a simple wizard with your product idea and see how it maps to the RootSpec methodology.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        {currentStep === 'idea' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">What's your product idea?</h3>
            <input
              data-test="product-idea-input"
              type="text"
              value={productIdea}
              onChange={(e) => setProductIdea(e.target.value)}
              placeholder="e.g., A task management app for developers"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            />
            <button
              data-test="wizard-next"
              onClick={nextStep}
              disabled={!productIdea}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {currentStep === 'mission' && (
          <div data-test="mission-step">
            <h3 className="text-xl font-semibold mb-4">Choose a mission template</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Current idea: <span data-test="current-idea" className="font-medium">{productIdea}</span>
            </p>
            <div className="space-y-3">
              {templates.map((template, index) => (
                <button
                  key={template.id}
                  data-test={`mission-template-${index + 1}`}
                  onClick={() => setSelectedMission(template.id)}
                  className={`w-full p-4 text-left border rounded-lg transition-colors ${
                    selectedMission === template.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                  }`}
                >
                  <div className="font-medium">{template.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{template.mission}</div>
                </button>
              ))}
            </div>
            <button
              data-test="wizard-next"
              onClick={nextStep}
              disabled={!selectedMission}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {currentStep === 'pillars' && (
          <div data-test="pillars-step">
            <h3 className="text-xl font-semibold mb-4">Select design pillars</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Choose 2-4 pillars that define your product's personality.</p>
            <div className="grid grid-cols-2 gap-3">
              {pillarSuggestions.map((pillar) => {
                // Map specific pillars to test selectors
                let testId = pillar.id;
                if (pillar.label.toLowerCase().includes('simple') || pillar.id === 'clarity') testId = 'simple';
                else if (pillar.label.toLowerCase().includes('focused') || pillar.id === 'empowered') testId = 'focused';
                else if (pillar.label.toLowerCase().includes('reliable') || pillar.id === 'trust') testId = 'reliable';

                return (
                  <button
                    key={pillar.id}
                    data-test={`pillar-${testId}`}
                    onClick={() => togglePillar(pillar.id)}
                    className={`p-3 text-left border rounded-lg transition-colors ${
                      selectedPillars.includes(pillar.id)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-medium text-sm">{pillar.label}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{pillar.description}</div>
                  </button>
                );
              })}
            </div>
            <button
              data-test="wizard-next"
              onClick={nextStep}
              disabled={selectedPillars.length === 0}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {currentStep === 'interaction' && (
          <div data-test="interaction-step">
            <h3 className="text-xl font-semibold mb-4">Describe a core interaction</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">What's the main thing users do in your product?</p>
            <textarea
              data-test="interaction-input"
              value={interaction}
              onChange={(e) => setInteraction(e.target.value)}
              placeholder="e.g., User adds a task and sees it in their list"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 h-24"
            />
            <button
              data-test="generate-spec"
              onClick={generateSpec}
              disabled={!interaction}
              className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              Generate Specification
            </button>
          </div>
        )}

        {currentStep === 'result' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Your Generated Specification</h3>
            <div
              data-test="generated-spec"
              className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border font-mono text-sm whitespace-pre-line max-h-96 overflow-y-auto"
            >
              {generatedSpec}
            </div>
            <button
              onClick={() => {
                setCurrentStep('idea');
                setProductIdea('');
                setSelectedMission('');
                setSelectedPillars([]);
                setInteraction('');
                setGeneratedSpec('');
              }}
              className="mt-4 px-6 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}