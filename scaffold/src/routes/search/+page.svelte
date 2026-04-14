<script lang="ts">
	import { base } from '$app/paths';

	let { data } = $props();
	let query = $state('');

	let results = $derived(
		query.length > 0
			? data.posts.filter((p: { content: string }) => p.content.toLowerCase().includes(query.toLowerCase()))
			: []
	);

	function getAuthor(authorId: string) {
		return data.users.find((u: { id: string }) => u.id === authorId);
	}
</script>

<h1 class="mb-4 text-xl font-bold">Search</h1>

<input
	data-test="search-input"
	type="text"
	bind:value={query}
	placeholder="Search posts..."
	class="mb-4 w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
/>

{#each results as post}
	{@const author = getAuthor(post.authorId)}
	<div data-test="search-result" class="border-b border-gray-200 py-3 dark:border-gray-700">
		<div class="mb-1 text-sm text-gray-500">
			<a href="{base}/profile/{author?.handle}" class="font-medium text-gray-900 dark:text-gray-100">{author?.displayName}</a>
		</div>
		<a href="{base}/post/{post.id}" class="block text-gray-900 dark:text-gray-100">
			<p>{post.content}</p>
		</a>
	</div>
{/each}

{#if query.length > 0 && results.length === 0}
	<p data-test="search-empty" class="text-gray-400">No results for "{query}"</p>
{/if}
