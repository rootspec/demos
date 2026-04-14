<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { initTheme, theme, toggleTheme } from '$lib/stores/theme.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	onMount(() => {
		initTheme();
		document.body.setAttribute('data-hydrated', 'true');
	});

	const version = '7.2.7';
</script>

<div class="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
	<div data-test="meta-banner" class="bg-blue-50 px-4 py-2 text-center text-sm text-blue-900 dark:bg-blue-950 dark:text-blue-200">
		RootFeed — a RootSpec scaffold demo
		<a data-test="banner-scaffold-link" href="https://github.com/rootspec/demos" class="ml-2 text-blue-600 hover:underline dark:text-blue-400">Scaffold</a>
		<a data-test="banner-spec-link" href="{base}/rootspec" class="ml-2 text-blue-600 hover:underline dark:text-blue-400">Spec</a>
		<a data-test="banner-seed-link" href="{base}/SEED.md" class="ml-2 text-blue-600 hover:underline dark:text-blue-400">Seed</a>
	</div>

	<nav class="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
		<div class="mx-auto flex max-w-2xl items-center gap-6">
			<a href="{base}/" class="text-lg font-bold">RootFeed</a>
			<a data-test="nav-home" href="{base}/" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Home</a>
			<a data-test="nav-explore" href="{base}/explore" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Explore</a>
			<a data-test="nav-search" href="{base}/search" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Search</a>
			<div class="ml-auto flex items-center gap-3">
				<span data-test="version-badge" class="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">v{version}</span>
				<button
					data-test="theme-toggle"
					onclick={toggleTheme}
					class="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
					aria-label="Toggle theme"
				>
					{#if theme.current === 'dark'}☀️{:else}🌙{/if}
				</button>
			</div>
		</div>
	</nav>

	<main class="mx-auto max-w-2xl px-4 py-6">
		{@render children()}
	</main>

	<footer data-test="footer" class="border-t border-gray-200 px-4 py-4 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
		Built with <span data-test="footer-version">RootSpec v{version}</span>
	</footer>
</div>
