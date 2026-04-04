import { browser } from '$app/environment';

function getInitialTheme(): 'light' | 'dark' {
	if (!browser) return 'light';
	const stored = localStorage.getItem('rootfeed-theme');
	if (stored === 'dark' || stored === 'light') return stored;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const theme = $state<{ current: 'light' | 'dark' }>({ current: getInitialTheme() });

export function toggleTheme() {
	theme.current = theme.current === 'light' ? 'dark' : 'light';
	if (browser) {
		localStorage.setItem('rootfeed-theme', theme.current);
		document.documentElement.classList.toggle('dark', theme.current === 'dark');
	}
}

export function initTheme() {
	if (browser) {
		document.documentElement.classList.toggle('dark', theme.current === 'dark');
	}
}
