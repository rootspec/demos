<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let theme = $state('light');

	function applyTheme(t: string) {
		const html = document.documentElement;
		html.setAttribute('data-theme', t);
		if (t === 'dark') {
			html.classList.add('dark');
		} else {
			html.classList.remove('dark');
		}
	}

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		localStorage.setItem('rootfeed-theme', theme);
		applyTheme(theme);
	}

	onMount(() => {
		const stored = localStorage.getItem('rootfeed-theme');
		if (stored) {
			theme = stored;
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			theme = 'dark';
		}
		applyTheme(theme);
		document.body.setAttribute('data-hydrated', 'true');
	});
</script>

<div class="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
	<!-- Meta Banner -->
	<div
		data-test="meta-banner"
		class="border-b border-blue-200 bg-blue-50 px-4 py-2 text-center text-sm text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200"
	>
		<span>RootFeed Demo — built with RootSpec</span>
		<a
			data-test="meta-banner-spec-link"
			href="https://github.com/rootspec/demos"
			class="ml-2 underline hover:no-underline"
			target="_blank"
			rel="noopener noreferrer"
		>View Spec</a>
	</div>

	<!-- Nav -->
	<nav class="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
		<div class="mx-auto flex max-w-2xl items-center gap-6">
			<a href="/demos/scaffold/" class="text-lg font-bold">RootFeed</a>
			<a href="/demos/scaffold/" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Home</a>
			<a href="/demos/scaffold/explore" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Explore</a>
			<a href="/demos/scaffold/search" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Search</a>
			<button
				data-test="theme-toggle"
				onclick={toggleTheme}
				class="ml-auto rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
				aria-label="Toggle theme"
			>
				{#if theme === 'dark'}
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 110 10A5 5 0 0112 7z" />
					</svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
					</svg>
				{/if}
			</button>
		</div>
	</nav>

	<main class="mx-auto max-w-2xl px-4 py-6">
		{@render children()}
	</main>
</div>
