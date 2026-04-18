<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	let { children }: { children: Snippet } = $props();

	let theme = $state<'light' | 'dark'>('light');

	onMount(() => {
		const stored = localStorage.getItem('rootfeed-theme');
		if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			theme = 'dark';
			document.documentElement.classList.add('dark');
		} else {
			theme = 'light';
			document.documentElement.classList.remove('dark');
		}
		document.body.setAttribute('data-hydrated', 'true');
	});

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		localStorage.setItem('rootfeed-theme', theme);
	}
</script>

<div class="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
	<!-- Meta Banner -->
	<div data-test="meta-banner" class="bg-blue-50 px-4 py-2 text-center text-xs text-blue-900 dark:bg-blue-950 dark:text-blue-200">
		RootFeed is a demo app built with RootSpec.
		<a data-test="meta-banner-spec-link" href="https://github.com/rootspec/demos/tree/main/scaffold/rootspec" target="_blank" rel="noopener" class="underline ml-1">View Spec</a>
		<a data-test="meta-banner-seed-link" href="https://github.com/rootspec/demos/blob/main/scaffold/SEED.md" target="_blank" rel="noopener" class="underline ml-1">View Seed</a>
	</div>

	<!-- Nav -->
	<nav class="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
		<div class="mx-auto flex max-w-2xl items-center gap-6">
			<a href="{base}/" data-test="nav-brand" class="text-lg font-bold">RootFeed</a>
			<span data-test="nav-version" class="text-xs text-gray-400">v7.3.6</span>
			<a href="{base}/" data-test="nav-home" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Home</a>
			<a href="{base}/explore" data-test="nav-explore" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Explore</a>
			<a href="{base}/search" data-test="nav-search" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Search</a>
			<button
				data-test="theme-toggle"
				onclick={toggleTheme}
				class="ml-auto rounded p-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
				aria-label="Toggle theme"
			>
				{#if theme === 'dark'}☀️{:else}🌙{/if}
			</button>
		</div>
	</nav>

	<main class="mx-auto max-w-2xl px-4 py-6">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer data-test="footer" class="border-t border-gray-200 px-4 py-6 text-center text-sm text-gray-400 dark:border-gray-700">
		<span data-test="footer-attribution">Built with <a href="https://rootspec.dev" class="underline">RootSpec</a> v7.3.6</span>
	</footer>
</div>
