<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import type { Snippet } from 'svelte';
	import MetaBanner from '$lib/components/MetaBanner.svelte';
	import { theme, toggleTheme, initTheme } from '$lib/stores/theme.svelte';

	let { children }: { children: Snippet } = $props();

	onMount(() => {
		initTheme();
		document.body.setAttribute('data-hydrated', 'true');
	});
</script>

<div class="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
	<MetaBanner />
	<nav class="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
		<div class="mx-auto flex max-w-2xl items-center gap-6">
			<a href="{base}/" class="text-lg font-bold">RootFeed</a>
			<a href="{base}/" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Home</a>
			<a href="{base}/explore" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Explore</a>
			<a href="{base}/search" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Search</a>
			<button
				onclick={toggleTheme}
				class="ml-auto rounded p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
				data-test="theme-toggle"
				aria-label="Toggle theme"
			>
				{#if theme.current === 'dark'}
					<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M18.364 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
					</svg>
				{:else}
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
