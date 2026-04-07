import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Get initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let initialTheme: 'light' | 'dark';
    if (savedTheme === 'dark' || savedTheme === 'light') {
      initialTheme = savedTheme;
    } else {
      initialTheme = systemPrefersDark ? 'dark' : 'light';
    }

    setTheme(initialTheme);
    applyTheme(initialTheme);
    setIsHydrated(true);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark') => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <button
      data-test="theme-toggle"
      data-hydrated={isHydrated}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="theme-toggle"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="theme-icon"
      >
        {theme === 'light' ? (
          // Moon icon for light mode (to switch to dark)
          <path
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            fill="currentColor"
          />
        ) : (
          // Sun icon for dark mode (to switch to light)
          <>
            <path
              d="M10 2v1a1 1 0 102 0V2a1 1 0 10-2 0zM10 17v1a1 1 0 102 0v-1a1 1 0 10-2 0zM2 10h1a1 1 0 100-2H2a1 1 0 100 2zM17 10h1a1 1 0 100-2h-1a1 1 0 100 2zM4.343 4.343l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zM14.243 14.243l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zM14.95 4.05l-.707.707a1 1 0 101.414 1.414l.707-.707a1 1 0 00-1.414-1.414zM5.05 14.95l-.707.707a1 1 0 101.414 1.414l.707-.707a1 1 0 00-1.414-1.414z"
              fill="currentColor"
            />
            <path
              d="M10 7a3 3 0 100 6 3 3 0 000-6z"
              fill="currentColor"
            />
          </>
        )}
      </svg>
    </button>
  );
}