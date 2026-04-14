<script lang="ts">
	import { base } from '$app/paths';

	let { data } = $props();

	function getAuthor(authorId: string) {
		return data.users.find((u: { id: string }) => u.id === authorId);
	}
</script>

{#if data.post}
	{@const author = getAuthor(data.post.authorId)}
	<div class="mb-6" data-test="post-detail-content">
		<div data-test="post-detail-author" class="mb-1 text-sm text-gray-500">
			<a href="{base}/profile/{author?.handle}" class="font-medium text-gray-900 dark:text-gray-100">{author?.displayName}</a>
			<span>@{author?.handle}</span>
		</div>
		<p class="text-lg text-gray-900 dark:text-gray-100">{data.post.content}</p>
		<div class="mt-2 flex gap-4 text-sm text-gray-400">
			<span data-test="post-detail-like-count">{data.post.likeCount} likes</span>
			<span data-test="post-detail-repost-count">{data.post.repostCount} reposts</span>
		</div>
	</div>

	{#if data.replies.length > 0}
		<h2 class="mb-2 font-bold">Replies</h2>
		{#each data.replies as reply}
			{@const replyAuthor = getAuthor(reply.authorId)}
			<div data-test="reply-card" class="border-t border-gray-200 py-3 pl-4 dark:border-gray-700">
				<div class="mb-1 text-sm text-gray-500">
					<a href="{base}/profile/{replyAuthor?.handle}" class="font-medium text-gray-900 dark:text-gray-100">{replyAuthor?.displayName}</a>
				</div>
				<p class="text-gray-900 dark:text-gray-100">{reply.content}</p>
			</div>
		{/each}
	{/if}
{:else}
	<p>Post not found.</p>
{/if}
