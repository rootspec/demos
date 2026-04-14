<script lang="ts">
	import { base } from '$app/paths';
	import type { Post, User } from '$lib/types';

	let { data } = $props();
	let query = $state('');

	let results = $derived(
		query.length > 0
			? (data.posts as Post[]).filter((p: Post) => p.content.toLowerCase().includes(query.toLowerCase()))
			: []
	);

	function getAuthor(authorId: string) {
		return (data.users as User[]).find((u) => u.id === authorId);
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

{#each results as post}
	{@const author = getAuthor(post.authorId)}
	<div class="border-b border-gray-200 py-3 dark:border-gray-700" data-test="search-result">
		<div class="mb-1 text-sm text-gray-500 dark:text-gray-400">
			<a href="{base}/profile/{author?.handle}" class="font-medium text-gray-900 dark:text-gray-100" data-test="post-author">{author?.displayName}</a>
		</div>
		<a href="{base}/post/{post.id}" class="block">
			<p class="text-gray-900 dark:text-gray-100" data-test="post-content">{post.content}</p>
		</a>
	</div>
{/each}

{#if query.length > 0 && results.length === 0}
	<p class="text-gray-400" data-test="search-empty">No results for "{query}"</p>
{/if}
