<script lang="ts">
	import { base } from '$app/paths';
	import type { Post, User } from '$lib/types';

	let { data } = $props();

	function getAuthor(authorId: string) {
		return (data.users as User[]).find((u) => u.id === authorId);
	}
</script>

{#if data.post}
	{@const author = getAuthor(data.post.authorId)}
	<div class="mb-6" data-test="post-detail">
		<div class="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
			{#if author}
				<img src={author.avatar} alt={author.displayName} class="h-10 w-10 rounded-full" />
				<div>
					<a href="{base}/profile/{author.handle}" class="font-medium text-gray-900 dark:text-gray-100" data-test="post-author">{author.displayName}</a>
					<p>@{author.handle}</p>
				</div>
			{/if}
		</div>
		<p class="text-lg text-gray-900 dark:text-gray-100" data-test="post-content">{data.post.content}</p>
		<div class="mt-2 text-sm text-gray-400 dark:text-gray-500">
			<span data-test="like-count">{data.post.likeCount} likes</span>
			&middot;
			<span data-test="repost-count">{data.post.repostCount} reposts</span>
		</div>
	</div>

	{#if data.replies.length > 0}
		<div data-test="replies-section">
			<h2 class="mb-2 font-semibold">Replies</h2>
			{#each data.replies as reply}
				{@const replyAuthor = getAuthor(reply.authorId)}
				<div class="border-t border-gray-200 py-3 pl-4 dark:border-gray-700" data-test="reply-card">
					<div class="mb-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
						{#if replyAuthor}
							<img src={replyAuthor.avatar} alt={replyAuthor.displayName} class="h-7 w-7 rounded-full" />
							<a href="{base}/profile/{replyAuthor.handle}" class="font-medium text-gray-900 dark:text-gray-100" data-test="post-author">{replyAuthor.displayName}</a>
						{/if}
					</div>
					<p class="text-gray-900 dark:text-gray-100" data-test="post-content">{reply.content}</p>
				</div>
			{/each}
		</div>
	{/if}
{:else}
	<div data-test="post-not-found">
		<p class="text-gray-500">Post not found.</p>
	</div>
{/if}
