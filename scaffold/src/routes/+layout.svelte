<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { initTheme, toggleTheme, theme } from '$lib/stores/theme.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	onMount(() => {
		initTheme();
		document.body.setAttribute('data-hydrated', 'true');
	});
</script>

<div class="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
	<nav class="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
		<div class="mx-auto flex max-w-2xl items-center gap-6">
			<a href="/" class="text-lg font-bold">RootFeed</a>
			<a href="/" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Home</a>
			<a href="/explore" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Explore</a>
			<a href="/search" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Search</a>
			<div class="ml-auto">
				<button
					data-test="theme-toggle"
					onclick={toggleTheme}
					class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
					aria-label="Toggle theme"
				>
					{#if theme.current === 'dark'}☀️{:else}🌙{/if}
				</button>
			</div>
		</div>
	</nav>

	<div
		data-test="meta-banner"
		class="border-b border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200"
	>
		<div class="mx-auto flex max-w-2xl items-center gap-3">
			<span>🌱 RootSpec demo —</span>
			<a
				data-test="scaffold-link"
				href="https://github.com/rootspec/demos/tree/main/scaffold/SEED.md"
				target="_blank"
				rel="noopener"
				class="underline hover:no-underline"
			>Scaffold</a>
			<a
				data-test="seed-link"
				href="https://github.com/rootspec/demos/tree/main/scaffold/SEED.md"
				target="_blank"
				rel="noopener"
				class="underline hover:no-underline"
			>Seed</a>
			<a
				data-test="spec-link"
				href="https://github.com/rootspec/demos/tree/main/scaffold/rootspec"
				target="_blank"
				rel="noopener"
				class="underline hover:no-underline"
			>Spec</a>
		</div>
	</div>

	<main class="mx-auto max-w-2xl px-4 py-6">
		{@render children()}
	</main>
</div>
