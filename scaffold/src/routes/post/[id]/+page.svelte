<script lang="ts">
	let { data } = $props();

	function getAuthor(authorId: string) {
		return data.users.find((u: { id: string }) => u.id === authorId);
	}
</script>

{#if data.post}
	{@const author = getAuthor(data.post.authorId)}
	<div class="mb-6">
		<div data-test="post-author" class="mb-1 text-sm text-gray-500 dark:text-gray-400">
			<a href="/profile/{author?.handle}" class="font-medium text-gray-900 dark:text-gray-100">{author?.displayName}</a>
			<span>@{author?.handle}</span>
		</div>
		<p data-test="post-content" class="text-lg">{data.post.content}</p>
		<div class="mt-2 text-sm text-gray-400">
			{data.post.likeCount} likes &middot; {data.post.repostCount} reposts
		</div>
	</div>

	{#if data.replies.length > 0}
		<h2 class="mb-2 font-bold">Replies</h2>
		{#each data.replies as reply}
			{@const replyAuthor = getAuthor(reply.authorId)}
			<div class="border-t border-gray-200 py-3 pl-4 dark:border-gray-700">
				<div class="mb-1 text-sm text-gray-500 dark:text-gray-400">
					<a href="/profile/{replyAuthor?.handle}" class="font-medium text-gray-900 dark:text-gray-100">{replyAuthor?.displayName}</a>
				</div>
				<p>{reply.content}</p>
			</div>
		{/each}
	{/if}
{:else}
	<p>Post not found</p>
{/if}
