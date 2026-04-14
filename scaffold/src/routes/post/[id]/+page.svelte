<script lang="ts">
	let { data } = $props();

	function getAuthor(authorId: string) {
		return data.users.find((u: { id: string }) => u.id === authorId);
	}
</script>

{#if data.post}
	<!-- Parent post if this is a reply -->
	{#if data.parentPost}
		<div data-test="parent-post" class="mb-4 rounded border border-gray-200 p-4 opacity-75 dark:border-gray-700">
			{@const parentAuthor = getAuthor(data.parentPost.authorId)}
			<div class="mb-1 text-sm text-gray-500 dark:text-gray-400">
				<a href="/demos/scaffold/profile/{parentAuthor?.handle}" class="font-medium text-gray-900 dark:text-gray-100">{parentAuthor?.displayName}</a>
				<span>@{parentAuthor?.handle}</span>
			</div>
			<p class="text-sm">{data.parentPost.content}</p>
		</div>
	{/if}

	<!-- Main post -->
	<div data-test="post-detail" class="mb-6">
		{@const author = getAuthor(data.post.authorId)}
		<div class="mb-1 text-sm text-gray-500 dark:text-gray-400">
			<a href="/demos/scaffold/profile/{author?.handle}" class="font-medium text-gray-900 dark:text-gray-100">
				<span data-test="post-author">{author?.displayName}</span>
			</a>
			<span>@{author?.handle}</span>
		</div>
		<p class="text-lg">{data.post.content}</p>
		<div class="mt-2 text-sm text-gray-400">
			{data.post.likeCount} likes &middot; {data.post.repostCount} reposts
		</div>
	</div>

	<!-- Replies -->
	{#if data.replies.length > 0}
		<div data-test="replies-section">
			<h2 class="mb-2 font-bold">Replies</h2>
			{#each data.replies as reply (reply.id)}
				{@const replyAuthor = getAuthor(reply.authorId)}
				<div data-test="reply-item" class="border-t border-gray-200 py-3 pl-4 dark:border-gray-700">
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
