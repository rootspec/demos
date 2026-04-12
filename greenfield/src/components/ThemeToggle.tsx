import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('rootspec-theme');
    const current = stored || (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') || 'dark';
    setTheme(current as 'dark' | 'light');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('rootspec-theme', next);
  };

  return (
    <button
      data-test="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        color: 'var(--text)',
        borderRadius: '6px',
        padding: '6px 12px',
        cursor: 'pointer',
        fontSize: '0.85rem',
        fontFamily: 'inherit',
        transition: 'background 200ms ease',
      }}
    >
      {theme === 'dark' ? '☀ Light' : '◗ Dark'}
    </button>
  );
}
