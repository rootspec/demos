<script lang="ts">
	import { base } from '$app/paths';
	import type { Post, User } from '$lib/types';

	let { data } = $props();
	let query = $state('');

	let results = $derived(
		query.length > 0
			? data.posts.filter((p: Post) => p.content.toLowerCase().includes(query.toLowerCase()))
			: []
	);

	let showEmpty = $derived(query.length > 0 && results.length === 0);
	let showDefault = $derived(query.length === 0);

	function getAuthor(authorId: string): User | undefined {
		return data.users.find((u: User) => u.id === authorId);
	}
</script>

<h1 class="mb-4 text-xl font-bold">Search</h1>

<input
	data-test="search-input"
	type="text"
	bind:value={query}
	placeholder="Search posts..."
	class="mb-4 w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
/>

{#if showDefault}
	<p data-test="search-empty-default" class="text-sm text-gray-400">Type a keyword to search posts.</p>
{:else if showEmpty}
	<p data-test="search-empty" class="text-sm text-gray-400">No results for "{query}".</p>
{:else}
	{#each results as post (post.id)}
		{@const author = getAuthor(post.authorId)}
		<div data-test="search-result" class="border-b border-gray-200 py-3 dark:border-gray-700">
			<div class="mb-1 text-sm text-gray-500">
				<a href="{base}/profile/{author?.handle}" class="font-medium text-gray-900 hover:underline dark:text-gray-100">{author?.displayName}</a>
				<span class="ml-1">@{author?.handle}</span>
			</div>
			<a href="{base}/post/{post.id}" class="text-gray-800 hover:underline dark:text-gray-200">
				<p>{post.content}</p>
			</a>
		</div>
	{/each}
{/if}
