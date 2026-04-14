import { useState } from 'react';

const WITHOUT_SPEC = {
  title: 'Without a spec',
  items: [
    { label: 'Requirements', content: 'Slack thread from 3 months ago. Partially contradicted by a later Slack thread. Nobody knows which is current.' },
    { label: 'User story', content: '"As a user, I want to see my data." (No acceptance criteria. No definition of done.)' },
    { label: 'Feature decision', content: '"We added dark mode because a customer asked for it."' },
    { label: 'AI output', content: '"Here\'s an implementation of your feature." (Based on what philosophy? Nobody knows.)' },
    { label: 'Validation', content: '"It looks right to me." — engineer who built it, reviewing their own work' },
  ],
  color: '#f97316',
  bg: '#f9731611',
  border: '#f9731633',
};

const WITH_SPEC = {
  title: 'With RootSpec',
  items: [
    { label: 'Requirements', content: 'L1–L3 written once, version-controlled, referenced by every downstream decision. Any drift is caught at validation.' },
    { label: 'User story', content: 'US-042: Given user has items, When they visit /dashboard, Then they see count badge. Traceable to L2 Truth: "Users always know system state."' },
    { label: 'Feature decision', content: '"Dark mode is in scope because it traces to Design Pillar: User Autonomy. Feature X is out of scope because it doesn\'t."' },
    { label: 'AI output', content: '"Here\'s an implementation constrained by your spec. These 3 decisions required trade-offs — here\'s why each was made per L2."' },
    { label: 'Validation', content: '15/15 tests pass. Spec coverage: 94%. 1 story has no test. Report generated.' },
  ],
  color: '#22c55e',
  bg: '#22c55e11',
  border: '#22c55e33',
};

export default function ComparisonSection() {
  const [showWithSpec, setShowWithSpec] = useState(false);
  const current = showWithSpec ? WITH_SPEC : WITHOUT_SPEC;

  return (
    <section
      data-test="comparison-section"
      className="section-spacing"
      style={{ background: 'var(--card)' }}
    >
      <div className="container-content">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
            See the difference
          </h2>
          <p className="text-lg mb-6" style={{ color: 'var(--muted)' }}>
            The same software team, before and after RootSpec.
          </p>
          {/* Toggle */}
          <div className="inline-flex items-center rounded-xl p-1" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <button
              onClick={() => setShowWithSpec(false)}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: !showWithSpec ? WITHOUT_SPEC.bg : 'transparent',
                color: !showWithSpec ? WITHOUT_SPEC.color : 'var(--muted)',
                border: !showWithSpec ? `1px solid ${WITHOUT_SPEC.border}` : '1px solid transparent',
              }}
            >
              Without spec
            </button>
            <button
              data-test="comparison-toggle"
              onClick={() => setShowWithSpec(v => !v)}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: showWithSpec ? WITH_SPEC.bg : 'transparent',
                color: showWithSpec ? WITH_SPEC.color : 'var(--muted)',
                border: showWithSpec ? `1px solid ${WITH_SPEC.border}` : '1px solid transparent',
              }}
            >
              With RootSpec
            </button>
          </div>
        </div>

        {/* Content panel */}
        <div
          className="rounded-xl overflow-hidden max-w-2xl mx-auto"
          style={{ border: `1px solid ${current.border}`, background: current.bg }}
        >
          <div
            className="px-6 py-4"
            style={{ borderBottom: `1px solid ${current.border}`, background: current.bg }}
          >
            <h3 className="font-bold text-lg" style={{ color: current.color }}>{current.title}</h3>
          </div>
          <div className="divide-y" style={{ borderColor: current.border }}>
            {current.items.map((item) => (
              <div key={item.label} className="px-6 py-4">
                <div className="text-xs font-mono font-bold mb-1 uppercase" style={{ color: current.color, opacity: 0.7 }}>
                  {item.label}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--fg)' }}>{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
