<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import type { Snippet } from 'svelte';
	import { theme, toggleTheme, initTheme } from '$lib/stores/theme.svelte';

	let { children }: { children: Snippet } = $props();

	onMount(() => {
		initTheme();
	});
</script>

<div class="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
	<div
		data-test="meta-banner"
		class="bg-blue-50 px-4 py-2 text-center text-sm text-blue-900 dark:bg-blue-950 dark:text-blue-200"
	>
		This is a RootSpec demo. View the
		<a
			data-test="scaffold-link"
			href="https://github.com/rootspec/demos/tree/main/scaffold"
			class="underline"
			target="_blank"
			rel="noopener">scaffold artifacts</a
		>
		on GitHub.
	</div>

	<nav class="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
		<div class="mx-auto flex max-w-2xl items-center gap-6">
			<a href="{base}/" class="text-lg font-bold">RootFeed</a>
			<a data-test="nav-home" href="{base}/" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Home</a>
			<a data-test="nav-explore" href="{base}/explore" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Explore</a>
			<a data-test="nav-search" href="{base}/search" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Search</a>
			<span data-test="version-badge" class="ml-auto rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">v7.2.6</span>
			<button
				data-test="theme-toggle"
				onclick={toggleTheme}
				class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
				aria-label="Toggle theme"
			>
				{#if theme.current === 'dark'}☀️{:else}🌙{/if}
			</button>
		</div>
	</nav>

	<main class="mx-auto max-w-2xl px-4 py-6">
		{@render children()}
	</main>
</div>
