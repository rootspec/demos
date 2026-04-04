<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';

	let { data } = $props();
	let query = $state('');

	let results = $derived(
		query.length > 0
			? data.posts.filter((p) => p.content.toLowerCase().includes(query.toLowerCase()))
			: []
	);

	function getAuthor(authorId: string) {
		return data.users.find((u) => u.id === authorId);
	}
</script>

<h1 class="mb-4 text-xl font-bold">Search</h1>

<input
	type="text"
	bind:value={query}
	placeholder="Search posts..."
	class="mb-4 w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
	data-test="search-input"
/>

<div data-test="search-results">
	{#each results as post (post.id)}
		<PostCard {post} author={getAuthor(post.authorId)} />
	{/each}
</div>

{#if query.length > 0 && results.length === 0}
	<p class="text-gray-400" data-test="no-results">No posts found. Try different keywords.</p>
{/if}
