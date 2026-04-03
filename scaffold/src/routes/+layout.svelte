<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="min-h-screen bg-white text-gray-900">
	<nav class="border-b border-gray-200 px-4 py-3">
		<div class="mx-auto flex max-w-2xl items-center gap-6">
			<a href="/" class="text-lg font-bold">RootFeed</a>
			<a href="/" class="text-sm text-gray-600 hover:text-gray-900">Home</a>
			<a href="/explore" class="text-sm text-gray-600 hover:text-gray-900">Explore</a>
			<a href="/search" class="text-sm text-gray-600 hover:text-gray-900">Search</a>
		</div>
	</nav>

	<main class="mx-auto max-w-2xl px-4 py-6">
		{@render children()}
	</main>
</div>
