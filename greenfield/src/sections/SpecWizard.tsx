import { useState } from 'react';

interface WizardStep {
  id: number;
  title: string;
  description: string;
}

const steps: WizardStep[] = [
  {
    id: 1,
    title: 'Your Idea',
    description: 'Tell us about your product idea in a few words'
  },
  {
    id: 2,
    title: 'Mission',
    description: 'Choose a mission template that fits your product'
  },
  {
    id: 3,
    title: 'Pillars',
    description: 'Select the core pillars that will guide your product'
  },
  {
    id: 4,
    title: 'Interactions',
    description: 'Describe key user interactions'
  },
  {
    id: 5,
    title: 'Generated Spec',
    description: 'Your skeleton specification is ready!'
  }
];

const missionTemplates = [
  {
    id: 'productivity',
    name: 'Productivity Tool',
    description: 'Help users accomplish tasks more efficiently'
  },
  {
    id: 'social',
    name: 'Social Platform',
    description: 'Connect people and enable communication'
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    description: 'Facilitate transactions between buyers and sellers'
  },
  {
    id: 'education',
    name: 'Educational Tool',
    description: 'Enable learning and knowledge sharing'
  }
];

const pillars = [
  { id: 'simplicity', name: 'Simplicity', description: 'Easy to understand and use' },
  { id: 'speed', name: 'Speed', description: 'Fast and responsive experience' },
  { id: 'security', name: 'Security', description: 'Protect user data and privacy' },
  { id: 'collaboration', name: 'Collaboration', description: 'Enable teamwork and sharing' },
  { id: 'customization', name: 'Customization', description: 'Adaptable to user needs' },
  { id: 'accessibility', name: 'Accessibility', description: 'Inclusive for all users' }
];

export default function SpecWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    idea: '',
    mission: '',
    selectedPillars: [] as string[],
    interactions: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleIdeaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, idea: e.target.value });
  };

  const handleMissionSelect = (missionId: string) => {
    setFormData({ ...formData, mission: missionId });
  };

  const handlePillarToggle = (pillarId: string) => {
    const newPillars = formData.selectedPillars.includes(pillarId)
      ? formData.selectedPillars.filter(p => p !== pillarId)
      : [...formData.selectedPillars, pillarId];
    setFormData({ ...formData, selectedPillars: newPillars });
  };

  const handleInteractionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, interactions: e.target.value });
  };

  const generateSpec = async () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      nextStep();
    }, 2000);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.idea.length > 0;
      case 2:
        return formData.mission.length > 0;
      case 3:
        return formData.selectedPillars.length >= 2;
      case 4:
        return formData.interactions.length > 0;
      default:
        return true;
    }
  };

  return (
    <div data-test="spec-wizard" className="spec-wizard">
      <div className="wizard-content">
        <div className="wizard-header">
          <h2>Try the Spec Wizard</h2>
          <p>Generate a skeleton specification from your idea in 5 simple steps</p>
        </div>

        <div className="wizard-progress">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`progress-step ${currentStep >= step.id ? 'completed' : ''} ${
                currentStep === step.id ? 'active' : ''
              }`}
            >
              <div className="step-number">{step.id}</div>
              <div className="step-info">
                <div className="step-title">{step.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="wizard-body">
          {currentStep === 1 && (
            <div data-test="step-1" className="wizard-step">
              <h3>{steps[0].title}</h3>
              <p>{steps[0].description}</p>
              <input
                type="text"
                data-test="idea-input"
                placeholder="e.g., A task management app for remote teams"
                value={formData.idea}
                onChange={handleIdeaChange}
                className="wizard-input"
                autoFocus
              />
            </div>
          )}

          {currentStep === 2 && (
            <div data-test="step-2" className="wizard-step">
              <h3>{steps[1].title}</h3>
              <p>{steps[1].description}</p>
              <div data-test="mission-options" className="option-grid">
                {missionTemplates.map((template) => (
                  <div
                    key={template.id}
                    data-test={`mission-template`}
                    className={`option-card ${formData.mission === template.id ? 'selected' : ''}`}
                    onClick={() => handleMissionSelect(template.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleMissionSelect(template.id);
                      }
                    }}
                  >
                    <h4>{template.name}</h4>
                    <p>{template.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div data-test="step-3" className="wizard-step">
              <h3>{steps[2].title}</h3>
              <p>{steps[2].description} (select at least 2)</p>
              <div className="pillars-grid">
                {pillars.map((pillar, index) => (
                  <div
                    key={pillar.id}
                    data-test={`pillar-${index + 1}`}
                    className={`pillar-card ${formData.selectedPillars.includes(pillar.id) ? 'selected' : ''}`}
                    onClick={() => handlePillarToggle(pillar.id)}
                    role="checkbox"
                    aria-checked={formData.selectedPillars.includes(pillar.id)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handlePillarToggle(pillar.id);
                      }
                    }}
                  >
                    <h4>{pillar.name}</h4>
                    <p>{pillar.description}</p>
                    <div className="pillar-check">
                      {formData.selectedPillars.includes(pillar.id) ? '✓' : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div data-test="step-4" className="wizard-step">
              <h3>{steps[3].title}</h3>
              <p>{steps[3].description}</p>
              <textarea
                data-test="interaction-input"
                placeholder="e.g., Add a new task quickly, Collaborate with team members, Track project progress"
                value={formData.interactions}
                onChange={handleInteractionChange}
                className="wizard-textarea"
                rows={4}
                autoFocus
              />
            </div>
          )}

          {currentStep === 5 && (
            <div data-test="step-5" className="wizard-step">
              <h3>{steps[4].title}</h3>
              <p>Here's your generated specification skeleton:</p>
              <div data-test="generated-spec" className="generated-spec">
                <div data-test="spec-l1" className="spec-level">
                  <h4>1. Philosophy</h4>
                  <p>
                    Mission: {missionTemplates.find(t => t.id === formData.mission)?.description}<br />
                    Pillars: {formData.selectedPillars.map(id => pillars.find(p => p.id === id)?.name).join(', ')}
                  </p>
                </div>
                <div data-test="spec-l2" className="spec-level">
                  <h4>2. Truths</h4>
                  <p>User needs: {formData.idea}</p>
                </div>
                <div data-test="spec-l3" className="spec-level">
                  <h4>3. Interactions</h4>
                  <p>{formData.interactions}</p>
                </div>
                <div className="spec-level">
                  <h4>4. Systems</h4>
                  <p>Authentication, Data Management, User Interface</p>
                </div>
                <div className="spec-level">
                  <h4>5. Implementation</h4>
                  <p>User stories, API specifications, UI components</p>
                </div>
              </div>
              <div className="spec-actions">
                <button className="btn-primary">Download Spec</button>
                <button className="btn-secondary" onClick={() => {
                  setCurrentStep(1);
                  setFormData({ idea: '', mission: '', selectedPillars: [], interactions: '' });
                }}>
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="wizard-controls">
          {currentStep > 1 && currentStep < 5 && (
            <button
              onClick={prevStep}
              className="btn-secondary"
            >
              Previous
            </button>
          )}
          {currentStep < 4 && (
            <button
              data-test="next-step"
              onClick={nextStep}
              disabled={!canProceed()}
              className="btn-primary"
            >
              Next
            </button>
          )}
          {currentStep === 4 && (
            <button
              data-test="generate-spec"
              onClick={generateSpec}
              disabled={!canProceed() || isGenerating}
              className="btn-primary"
            >
              {isGenerating ? 'Generating...' : 'Generate Spec'}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .spec-wizard {
          background: var(--bg-primary);
          padding: var(--spacing-3xl) 0;
        }

        .wizard-content {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 var(--spacing-md);
        }

        .wizard-header {
          text-align: center;
          margin-bottom: var(--spacing-3xl);
        }

        .wizard-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 var(--spacing-md) 0;
        }

        .wizard-header p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .wizard-progress {
          display: flex;
          justify-content: center;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-3xl);
          flex-wrap: wrap;
        }

        .progress-step {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }

        .progress-step.completed, .progress-step.active {
          opacity: 1;
        }

        .step-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--border-color);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }

        .progress-step.completed .step-number {
          background: var(--color-success);
          color: white;
        }

        .progress-step.active .step-number {
          background: var(--color-primary);
          color: white;
        }

        .step-title {
          font-weight: 500;
          color: var(--text-primary);
          font-size: 0.875rem;
        }

        .wizard-body {
          min-height: 400px;
          margin-bottom: var(--spacing-xl);
        }

        .wizard-step {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .wizard-step h3 {
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 var(--spacing-md) 0;
        }

        .wizard-step p {
          font-size: 1.125rem;
          color: var(--text-secondary);
          margin: 0 0 var(--spacing-xl) 0;
        }

        .wizard-input, .wizard-textarea {
          width: 100%;
          padding: var(--spacing-md);
          border: 2px solid var(--border-color);
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          background: var(--bg-secondary);
          color: var(--text-primary);
          transition: border-color 0.3s ease;
        }

        .wizard-input:focus, .wizard-textarea:focus {
          outline: none;
          border-color: var(--color-primary);
        }

        .option-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: var(--spacing-md);
          margin-top: var(--spacing-lg);
        }

        .option-card, .pillar-card {
          padding: var(--spacing-lg);
          border: 2px solid var(--border-color);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: var(--bg-secondary);
          text-align: left;
          position: relative;
        }

        .option-card:hover, .pillar-card:hover {
          border-color: var(--color-primary);
          transform: translateY(-2px);
        }

        .option-card.selected, .pillar-card.selected {
          border-color: var(--color-primary);
          background: rgba(0, 102, 204, 0.05);
        }

        .option-card:focus, .pillar-card:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }

        .option-card h4, .pillar-card h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 var(--spacing-sm) 0;
        }

        .option-card p, .pillar-card p {
          color: var(--text-secondary);
          margin: 0;
          font-size: 0.875rem;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-md);
          margin-top: var(--spacing-lg);
        }

        .pillar-check {
          position: absolute;
          top: var(--spacing-md);
          right: var(--spacing-md);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--color-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .pillar-card.selected .pillar-check {
          opacity: 1;
        }

        .generated-spec {
          text-align: left;
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: var(--spacing-xl);
          margin: var(--spacing-lg) 0;
        }

        .spec-level {
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-lg);
          border-bottom: 1px solid var(--border-color);
        }

        .spec-level:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .spec-level h4 {
          color: var(--color-primary);
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 var(--spacing-sm) 0;
        }

        .spec-level p {
          color: var(--text-primary);
          margin: 0;
          line-height: 1.6;
        }

        .spec-actions {
          display: flex;
          gap: var(--spacing-md);
          justify-content: center;
          margin-top: var(--spacing-xl);
        }

        .wizard-controls {
          display: flex;
          justify-content: center;
          gap: var(--spacing-md);
        }

        .btn-primary, .btn-secondary {
          padding: var(--spacing-md) var(--spacing-xl);
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          border: 2px solid;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
          min-width: 120px;
        }

        .btn-primary {
          background: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }

        .btn-primary:hover:not(:disabled) {
          background: #0052a3;
          border-color: #0052a3;
          transform: translateY(-2px);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: transparent;
          color: var(--color-primary);
          border-color: var(--color-primary);
        }

        .btn-secondary:hover {
          background: var(--color-primary);
          color: white;
          transform: translateY(-2px);
        }

        .btn-primary:focus, .btn-secondary:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }

        @media (max-width: 768px) {
          .wizard-header h2 {
            font-size: 2rem;
          }

          .wizard-progress {
            gap: var(--spacing-md);
          }

          .step-info {
            display: none;
          }

          .wizard-step h3 {
            font-size: 1.5rem;
          }

          .option-grid, .pillars-grid {
            grid-template-columns: 1fr;
          }

          .wizard-controls {
            flex-direction: column;
            align-items: center;
          }

          .spec-actions {
            flex-direction: column;
            align-items: center;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
            max-width: 200px;
          }
        }
      `}</style>
    </div>
  );
}