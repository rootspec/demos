<script lang="ts">
	let { data } = $props();

	function getAuthor(authorId: string) {
		return data.users.find((u: { id: string }) => u.id === authorId);
	}
</script>

{#if data.post}
	<!-- Parent post context -->
	{#if data.parent}
		{@const parentAuthor = getAuthor(data.parent.authorId)}
		<div data-test="parent-post" class="mb-4 rounded border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
			<div class="mb-1 text-xs text-gray-500 dark:text-gray-400">Replying to</div>
			<div class="text-sm text-gray-500 dark:text-gray-400">
				<a href="/demos/scaffold/profile/{parentAuthor?.handle}" class="font-medium text-gray-900 dark:text-gray-100">{parentAuthor?.displayName}</a>
				<span>@{parentAuthor?.handle}</span>
			</div>
			<a href="/demos/scaffold/post/{data.parent.id}" class="mt-1 block text-sm text-gray-700 dark:text-gray-300">{data.parent.content}</a>
		</div>
	{/if}

	{@const author = getAuthor(data.post.authorId)}
	<div data-test="post-detail" class="mb-6">
		<div class="mb-1 text-sm text-gray-500 dark:text-gray-400">
			<a href="/demos/scaffold/profile/{author?.handle}" class="font-medium text-gray-900 dark:text-gray-100">{author?.displayName}</a>
			<span>@{author?.handle}</span>
		</div>
		<p class="text-lg">{data.post.content}</p>
		<div class="mt-2 text-sm text-gray-400">
			{data.post.likeCount} likes &middot; {data.post.repostCount} reposts
		</div>
	</div>

	{#if data.replies.length > 0}
		<div data-test="replies-section">
			<h2 class="mb-2 font-bold">Replies</h2>
			{#each data.replies as reply}
				{@const replyAuthor = getAuthor(reply.authorId)}
				<div class="border-t border-gray-200 py-3 pl-4 dark:border-gray-700">
					<div class="mb-1 text-sm text-gray-500 dark:text-gray-400">
						<a href="/demos/scaffold/profile/{replyAuthor?.handle}" class="font-medium text-gray-900 dark:text-gray-100">{replyAuthor?.displayName}</a>
					</div>
					<p>{reply.content}</p>
				</div>
			{/each}
		</div>
	{/if}
{:else}
	<p>Post not found.</p>
{/if}
