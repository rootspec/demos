<script lang="ts">
	let { data } = $props();

	let liked = $state(false);

	function getAuthor(authorId: string) {
		return data.users.find((u) => u.id === authorId);
	}

	function toggleLike() {
		liked = !liked;
	}
</script>

{#if data.post}
	{@const author = getAuthor(data.post.authorId)}

	<!-- Parent post context (for replies) -->
	{#if data.parentPost}
		{@const parentAuthor = getAuthor(data.parentPost.authorId)}
		<div data-test="parent-post" class="mb-4 rounded border border-gray-200 p-3 opacity-70 dark:border-gray-700">
			<div class="mb-1 text-xs text-gray-400">Replying to</div>
			<div class="text-sm font-medium">{parentAuthor?.displayName}</div>
			<p class="text-sm text-gray-600 dark:text-gray-400">{data.parentPost.content}</p>
		</div>
	{/if}

	<!-- Focal post -->
	<div data-test="post-detail" class="mb-6">
		<div class="mb-1 text-sm text-gray-500">
			<a href="/demos/scaffold/profile/{author?.handle}" class="font-medium text-gray-900 dark:text-gray-100">{author?.displayName}</a>
			<span>@{author?.handle}</span>
		</div>
		<p class="text-lg">{data.post.content}</p>
		<div class="mt-3 flex items-center gap-4 text-sm text-gray-400">
			<button
				data-test="like-btn"
				data-liked={liked ? 'true' : 'false'}
				onclick={toggleLike}
				class="flex items-center gap-1 hover:text-red-500 {liked ? 'text-red-500 active' : ''}"
			>
				{#if liked}
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
				{/if}
				{data.post.likeCount + (liked ? 1 : 0)} likes
			</button>
			<span>{data.post.repostCount} reposts</span>
		</div>
	</div>

	{#if data.replies.length > 0}
		<div data-test="replies-section">
			<h2 class="mb-2 font-semibold">Replies</h2>
			{#each data.replies as reply}
				{@const replyAuthor = getAuthor(reply.authorId)}
				<div class="border-t border-gray-200 py-3 pl-4 dark:border-gray-700">
					<div class="mb-1 text-sm text-gray-500">
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
