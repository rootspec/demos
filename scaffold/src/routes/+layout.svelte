<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let isDark = $state(false);

	onMount(() => {
		const stored = localStorage.getItem('rootfeed-theme');
		if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			isDark = true;
			document.documentElement.setAttribute('data-theme', 'dark');
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
		}
		document.body.setAttribute('data-hydrated', 'true');
	});

	function toggleTheme() {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.classList.add('dark');
			document.documentElement.setAttribute('data-theme', 'dark');
			localStorage.setItem('rootfeed-theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			document.documentElement.setAttribute('data-theme', 'light');
			localStorage.setItem('rootfeed-theme', 'light');
		}
	}
</script>

<div class="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
	<!-- Meta banner -->
	<div data-test="meta-banner" class="border-b border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
		<div class="mx-auto flex max-w-2xl flex-wrap items-center gap-3">
			<span><strong>RootSpec</strong> scaffold demo — built from spec, not from scratch.</span>
			<a data-test="meta-banner-scaffold-link" href="https://github.com/rootspec/demos/tree/main/scaffold" target="_blank" rel="noopener" class="underline hover:opacity-80">View scaffold commit</a>
			<a data-test="meta-banner-spec-link" href="https://github.com/rootspec/demos/tree/main/scaffold/rootspec" target="_blank" rel="noopener" class="underline hover:opacity-80">View spec</a>
			<a data-test="meta-banner-seed-link" href="https://github.com/rootspec/demos/blob/main/scaffold/SEED.md" target="_blank" rel="noopener" class="underline hover:opacity-80">View seed</a>
		</div>
	</div>

	<nav class="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
		<div class="mx-auto flex max-w-2xl items-center gap-6">
			<a href="/demos/scaffold/" class="text-lg font-bold">RootFeed</a>
			<a data-test="nav-home" href="/demos/scaffold/" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Home</a>
			<a data-test="nav-explore" href="/demos/scaffold/explore" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Explore</a>
			<a data-test="nav-search" href="/demos/scaffold/search" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">Search</a>
			<div class="ml-auto flex items-center gap-3">
				<span data-test="rootspec-version" class="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">v7.2.7</span>
				<button data-test="theme-toggle" onclick={toggleTheme} class="rounded p-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Toggle theme">
					{#if isDark}☀️{:else}🌙{/if}
				</button>
			</div>
		</div>
	</nav>

	<main class="mx-auto max-w-2xl px-4 py-6">
		{@render children()}
	</main>

	<footer data-test="footer" class="border-t border-gray-200 px-4 py-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
		Built with <strong>RootSpec</strong> v7.2.7 — spec-driven development demo.
	</footer>
</div>
