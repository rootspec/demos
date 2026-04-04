<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import Composer from '$lib/components/Composer.svelte';
	import { feed } from '$lib/stores/feed.svelte';

	let { data } = $props();

	const PAGE_SIZE = 10;
	let visibleCount = $state(PAGE_SIZE);

	function getAuthor(authorId: string) {
		return data.users.find((u) => u.id === authorId);
	}

	let allPosts = $derived([...feed.userPosts, ...data.posts]);
	let visiblePosts = $derived(allPosts.slice(0, visibleCount));
	let hasMore = $derived(visibleCount < allPosts.length);
</script>

<h1 class="mb-4 text-xl font-bold">Home Feed</h1>

<Composer />

<div>
	{#each visiblePosts as post (post.id)}
		<PostCard {post} author={getAuthor(post.authorId)} />
	{/each}
</div>

{#if hasMore}
	<button
		onclick={() => (visibleCount += PAGE_SIZE)}
		class="mt-4 w-full rounded border border-gray-300 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
		data-test="load-more"
	>
		Load more
	</button>
{/if}
