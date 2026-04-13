import { useState } from 'react';

const MISSIONS = [
  'Help teams ship features faster with less rework',
  'Replace ambiguous tickets with machine-readable specs',
  'Make product decisions explicit and traceable',
  'Enable AI agents to write code from specs',
];

const PILLARS = [
  'Testability — every feature has an acceptance test',
  'Clarity — requirements are unambiguous',
  'Traceability — decisions trace back to principles',
  'Automation — specs drive code generation',
  'Collaboration — shared language across roles',
];

type WizardStep = 'idea' | 'mission' | 'pillars' | 'interaction' | 'output';

export default function SpecWizard() {
  const [step, setStep] = useState<WizardStep>('idea');
  const [idea, setIdea] = useState('');
  const [ideaError, setIdeaError] = useState(false);
  const [mission, setMission] = useState<number | null>(null);
  const [pillars, setPillars] = useState<number[]>([]);
  const [interaction, setInteraction] = useState('');

  const handleNextFromIdea = () => {
    if (!idea.trim()) {
      setIdeaError(true);
      return;
    }
    setIdeaError(false);
    setStep('mission');
  };

  const handleNextFromMission = () => {
    setStep('pillars');
  };

  const [pillarError, setPillarError] = useState(false);

  const handleNextFromPillars = () => {
    if (pillars.length < 3) {
      setPillarError(true);
      return;
    }
    setPillarError(false);
    setStep('interaction');
  };

  const handleNextFromInteraction = () => {
    setStep('output');
  };

  const togglePillar = (idx: number) => {
    setPillars(prev =>
      prev.includes(idx) ? prev.filter(p => p !== idx) : [...prev, idx]
    );
  };

  const generateSpec = () => {
    const pillarList = pillars.map(p => `  - ${PILLARS[p]}`).join('\n');
    return `# L1: Philosophy
## Mission
${MISSIONS[mission ?? 0]}

# L2: Truths
## Design Principles
${pillarList || '  - (none selected)'}

## Trade-offs
  - Prioritise clarity over flexibility
  - Favour explicit over implicit decisions

# L3: Interactions
## Core Flow
GIVEN a user opens the app
WHEN ${interaction || 'they perform a key action'}
THEN the system responds appropriately`;
  };

  return (
    <div className="spec-wizard">
      {step === 'idea' && (
        <div className="wizard-pane">
          <p className="wizard-prompt">What are you building?</p>
          <textarea
            data-test="wizard-idea-input"
            className={`wizard-textarea ${ideaError ? 'wizard-textarea-error' : ''}`}
            placeholder="Describe your product idea in a sentence or two..."
            value={idea}
            onChange={e => { setIdea(e.target.value); if (ideaError) setIdeaError(false); }}
            rows={3}
          />
          {ideaError && (
            <p data-test="wizard-idea-error" className="wizard-error">
              Please enter a product idea to continue.
            </p>
          )}
          <button
            data-test="wizard-next"
            className="wizard-btn wizard-btn-primary"
            onClick={handleNextFromIdea}
          >
            Continue →
          </button>
        </div>
      )}

      {step === 'mission' && (
        <div data-test="wizard-step-1" className="wizard-pane">
          <p className="wizard-prompt">Choose the mission that best fits your product:</p>
          <div className="wizard-options">
            {MISSIONS.map((m, i) => (
              <button
                key={i}
                data-test={`wizard-mission-${i}`}
                className={`wizard-option ${mission === i ? 'wizard-option-selected' : ''}`}
                onClick={() => setMission(i)}
              >
                {m}
              </button>
            ))}
          </div>
          <button
            data-test="wizard-next"
            className="wizard-btn wizard-btn-primary"
            onClick={handleNextFromMission}
          >
            Continue →
          </button>
        </div>
      )}

      {step === 'pillars' && (
        <div className="wizard-pane">
          <p className="wizard-prompt">Select 3–5 design pillars:</p>
          <div className="wizard-options">
            {PILLARS.map((p, i) => (
              <button
                key={i}
                data-test={`wizard-pillar-${i}`}
                className={`wizard-option ${pillars.includes(i) ? 'wizard-option-selected' : ''}`}
                onClick={() => { togglePillar(i); if (pillarError) setPillarError(false); }}
              >
                {p}
              </button>
            ))}
          </div>
          {pillarError && (
            <p data-test="wizard-pillar-error" className="wizard-error">
              Please select at least 3 pillars to continue.
            </p>
          )}
          <button
            data-test="wizard-next"
            className="wizard-btn wizard-btn-primary"
            onClick={handleNextFromPillars}
          >
            Continue →
          </button>
        </div>
      )}

      {step === 'interaction' && (
        <div className="wizard-pane">
          <p className="wizard-prompt">Describe a core user interaction:</p>
          <input
            data-test="wizard-interaction-input"
            className="wizard-input"
            type="text"
            placeholder="e.g. User marks a book as finished"
            value={interaction}
            onChange={e => setInteraction(e.target.value)}
          />
          <button
            data-test="wizard-next"
            className="wizard-btn wizard-btn-primary"
            onClick={handleNextFromInteraction}
          >
            Generate Spec →
          </button>
        </div>
      )}

      {step === 'output' && (
        <div className="wizard-pane">
          <p className="wizard-prompt wizard-prompt-success">Your skeleton spec:</p>
          <div data-test="wizard-output" className="wizard-output">
            <pre><code>{generateSpec()}</code></pre>
          </div>
          <button
            data-test="wizard-next"
            className="wizard-btn wizard-btn-secondary"
            onClick={() => {
              setStep('idea');
              setIdea('');
              setMission(null);
              setPillars([]);
              setInteraction('');
            }}
          >
            Start over
          </button>
        </div>
      )}
    </div>
  );
}
