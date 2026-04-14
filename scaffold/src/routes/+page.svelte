<script lang="ts">
	import { base } from '$app/paths';
	import { feed } from '$lib/stores/feed.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import Composer from '$lib/components/Composer.svelte';

	let { data } = $props();

	const PAGE_SIZE = 5;
	let visibleCount = $state(PAGE_SIZE);
	let showComposer = $state(false);

	let allPosts = $derived([...feed.userPosts, ...data.posts]);
	let visiblePosts = $derived(allPosts.slice(0, visibleCount));
	let hasMore = $derived(visibleCount < allPosts.length);

	function getAuthor(authorId: string) {
		return data.users.find((u: { id: string }) => u.id === authorId);
	}

	function loadMore() {
		visibleCount += PAGE_SIZE;
	}
</script>

<div class="mb-4 flex items-center justify-between">
	<h1 class="text-xl font-bold">Home Feed</h1>
	<button
		onclick={() => { showComposer = !showComposer; }}
		class="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
		data-test="compose-button"
	>
		New Post
	</button>
</div>

{#if showComposer}
	<div data-test="post-composer">
		<Composer />
	</div>
{/if}

{#each visiblePosts as post}
	<PostCard {post} author={getAuthor(post.authorId)} />
{/each}

{#if hasMore}
	<div class="mt-4 text-center">
		<button
			onclick={loadMore}
			class="rounded border border-gray-300 px-6 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
			data-test="load-more"
		>
			Load more
		</button>
	</div>
{/if}
