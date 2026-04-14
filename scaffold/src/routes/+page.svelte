<script lang="ts">
	import Composer from '$lib/components/Composer.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import { feed } from '$lib/stores/feed.svelte';

	let { data } = $props();

	const PAGE_SIZE = 5;
	let visibleCount = $state(PAGE_SIZE);

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

<h1 class="mb-4 text-xl font-bold">Home Feed</h1>

<Composer />

{#each visiblePosts as post (post.id)}
	<PostCard {post} author={getAuthor(post.authorId)} />
{/each}

{#if hasMore}
	<div class="mt-4 flex justify-center">
		<button
			onclick={loadMore}
			class="rounded border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
			data-test="load-more"
		>
			Load more
		</button>
	</div>
{/if}
