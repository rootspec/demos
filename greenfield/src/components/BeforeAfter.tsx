import { useState, useEffect } from 'react';

const BEFORE_CONTENT = `# Product Requirements Document
## ReadTrack — Book Tracking App

### Overview
We want to build an app for tracking books.

### Requirements
- Users should be able to add books
- There should be a reading list
- Maybe some stats?
- Dark mode would be nice
- Mobile friendly

### Design
- Clean and modern
- Easy to use
- Should feel fast

### Notes
- Look at Goodreads for inspiration
- The team likes Material Design
- We'll figure out the backend later

### Timeline
- V1 by end of quarter
- Then we'll iterate`;

const AFTER_CONTENT = `# L1 — Philosophy / ReadTrack

**Mission:** Enable readers to build a honest record of their reading life without the social pressure of public platforms.

**Design Pillars:**
- Private by Default — no public profiles, no follower counts
- Frictionless Logging — adding a book takes one interaction
- Honest Reflection — stats show patterns, not judgments

---

# L4 — LIBRARY_SYSTEM

**Responsibility:** Manages the canonical list of books a user has read, is reading, or wants to read.

**Data Owned:**
| Key | Type | Source |
|-----|------|--------|
| bookEntries | Book[] | User input |
| readingStatus | enum: read/reading/want | User toggle |

**Rules:**
- A book entry requires title; author is optional
- Status transitions: want → reading → read (forward only)
- Duplicate titles within the same status are rejected`;

export default function BeforeAfter() {
  const [isMobile, setIsMobile] = useState(false);
  const [activePanel, setActivePanel] = useState<'before' | 'after'>('before');

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const panelStyle = (isActive: boolean) => ({
    flex: 1,
    background: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    padding: '1.25rem',
    display: (!isMobile || (isMobile && isActive)) ? 'block' : 'none',
  });

  return (
    <div data-test="before-after">
      {isMobile && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', justifyContent: 'center' }}>
          <button
            onClick={() => setActivePanel('before')}
            style={{
              padding: '6px 16px',
              border: `2px solid ${activePanel === 'before' ? 'var(--color-primary)' : 'var(--color-border)'}`,
              borderRadius: '6px',
              background: activePanel === 'before' ? 'var(--color-primary)' : 'none',
              color: activePanel === 'before' ? '#fff' : 'var(--color-text)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            Before
          </button>
          <button
            onClick={() => setActivePanel('after')}
            style={{
              padding: '6px 16px',
              border: `2px solid ${activePanel === 'after' ? 'var(--color-primary)' : 'var(--color-border)'}`,
              borderRadius: '6px',
              background: activePanel === 'after' ? 'var(--color-primary)' : 'none',
              color: activePanel === 'after' ? '#fff' : 'var(--color-text)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            After
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1.5rem', flexDirection: isMobile ? 'column' : 'row' }}>
        <div
          data-test="before-panel"
          style={panelStyle(!isMobile || activePanel === 'before')}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
            paddingBottom: '10px',
            borderBottom: '1px solid var(--color-border)',
          }}>
            <span style={{
              background: '#fee2e2',
              color: '#991b1b',
              borderRadius: '4px',
              padding: '2px 8px',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}>BEFORE</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
              Typical PRD / vague requirements doc
            </span>
          </div>
          <pre style={{
            whiteSpace: 'pre-wrap',
            fontSize: '0.78rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.6,
            background: 'none',
            padding: 0,
            overflow: 'visible',
          }}>
            {BEFORE_CONTENT}
          </pre>
        </div>

        <div
          data-test="after-panel"
          style={panelStyle(!isMobile || activePanel === 'after')}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
            paddingBottom: '10px',
            borderBottom: '1px solid var(--color-border)',
          }}>
            <span style={{
              background: '#dcfce7',
              color: '#166534',
              borderRadius: '4px',
              padding: '2px 8px',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}>AFTER</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
              RootSpec — testable, layered, traceable
            </span>
          </div>
          <pre style={{
            whiteSpace: 'pre-wrap',
            fontSize: '0.78rem',
            color: 'var(--color-text)',
            lineHeight: 1.6,
            background: 'none',
            padding: 0,
            overflow: 'visible',
          }}>
            {AFTER_CONTENT}
          </pre>
        </div>
      </div>
    </div>
  );
}
