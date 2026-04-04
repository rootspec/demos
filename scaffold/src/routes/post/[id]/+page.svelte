<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';

	let { data } = $props();

	function getAuthor(authorId: string) {
		return data.users.find((u) => u.id === authorId);
	}
</script>

{#if data.post}
	{#if data.parent}
		<div data-test="parent-post" class="mb-2 border-l-2 border-gray-300 pl-4 dark:border-gray-600">
			<PostCard post={data.parent} author={getAuthor(data.parent.authorId)} />
		</div>
	{/if}

	<div data-test="post-detail">
		<PostCard post={data.post} author={getAuthor(data.post.authorId)} />
	</div>

	{#if data.replies.length > 0}
		<div data-test="replies-section" class="mt-4">
			<h2 class="mb-2 font-bold">Replies</h2>
			{#each data.replies as reply (reply.id)}
				<div class="pl-4">
					<PostCard post={reply} author={getAuthor(reply.authorId)} />
				</div>
			{/each}
		</div>
	{/if}
{:else}
	<p data-test="post-not-found">Post not found.</p>
{/if}
