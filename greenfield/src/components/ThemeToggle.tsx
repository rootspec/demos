import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme-preference');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const shouldUseDark = savedTheme === 'dark' || (savedTheme === null && systemPrefersDark);

    setIsDark(shouldUseDark);
    updateTheme(shouldUseDark);
    setIsLoaded(true);
  }, []);

  const updateTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark-theme');
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    updateTheme(newTheme);
    localStorage.setItem('theme-preference', newTheme ? 'dark' : 'light');

    // Add theme transition class
    document.body.classList.add('theme-transition');
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 200);
  };

  if (!isLoaded) {
    return (
      <button
        className="theme-toggle"
        data-test="theme-toggle"
        aria-label="Loading theme..."
        disabled
      >
        ⏳
      </button>
    );
  }

  return (
    <button
      className="theme-toggle"
      data-test="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? '☀️' : '🌙'}

      <style jsx>{`
        .theme-toggle {
          position: fixed;
          top: 1rem;
          right: 1rem;
          width: 3rem;
          height: 3rem;
          border: none;
          border-radius: 50%;
          background-color: var(--bg-light);
          border: 2px solid var(--border-gray);
          cursor: pointer;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
          z-index: 1000;
        }

        .theme-toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .theme-toggle:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        :global(.theme-transition) {
          transition: background-color 0.2s ease, color 0.2s ease !important;
        }

        :global(.theme-transition *) {
          transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease !important;
        }

        :global([data-test="theme-transition"]) {
          transition-duration: 200ms !important;
        }

        :global(.dark-theme) {
          --text-dark: #f9fafb;
          --text-light: #d1d5db;
          --bg-light: #111827;
          --bg-gray: #1f2937;
          --border-gray: #374151;
        }

        :global(.dark-theme .hierarchy-explorer),
        :global(.dark-theme .spec-wizard),
        :global(.dark-theme .comparison-slider) {
          background-color: var(--bg-gray) !important;
          border-color: var(--border-gray) !important;
        }
      `}</style>
    </button>
  );
}