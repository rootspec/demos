<script lang="ts">
	import { base } from '$app/paths';
	import type { Post, User } from '$lib/types';

	let { data } = $props();

	function getAuthor(authorId: string): User | undefined {
		return data.users.find((u: User) => u.id === authorId);
	}

	let parentPost = $derived(
		data.post?.parentId
			? data.allPosts?.find((p: Post) => p.id === data.post.parentId)
			: null
	);
</script>

{#if data.post}
	{@const author = getAuthor(data.post.authorId)}

	<!-- Parent post context -->
	{#if parentPost}
		{@const parentAuthor = getAuthor(parentPost.authorId)}
		<div data-test="parent-post" class="mb-4 rounded border border-gray-200 bg-gray-50 p-3 text-sm dark:border-gray-700 dark:bg-gray-800">
			<div class="mb-1 text-xs text-gray-500">Replying to:</div>
			<a href="{base}/profile/{parentAuthor?.handle}" class="font-medium text-gray-900 hover:underline dark:text-gray-100">{parentAuthor?.displayName}</a>
			<p class="mt-1 text-gray-700 dark:text-gray-300">{parentPost.content}</p>
		</div>
	{/if}

	<!-- Main post -->
	<div data-test="post-detail" class="mb-6">
		<div class="mb-2 flex items-center gap-2 text-sm text-gray-500">
			<a data-test="post-author-name" href="{base}/profile/{author?.handle}" class="font-medium text-gray-900 hover:underline dark:text-gray-100">{author?.displayName}</a>
			<span>@{author?.handle}</span>
		</div>
		<p data-test="post-detail-content" class="text-lg text-gray-900 dark:text-gray-100">{data.post.content}</p>
		<div class="mt-3 flex items-center gap-4 text-sm text-gray-400">
			<span>♡ <span data-test="post-like-count">{data.post.likeCount}</span> likes</span>
			<span>↻ {data.post.repostCount} reposts</span>
		</div>
	</div>

	<!-- Replies -->
	{#if data.replies.length > 0}
		<h2 class="mb-2 font-semibold">Replies</h2>
		<div data-test="post-replies">
			{#each data.replies as reply (reply.id)}
				{@const replyAuthor = getAuthor(reply.authorId)}
				<div class="border-t border-gray-200 py-3 pl-4 dark:border-gray-700">
					<div class="mb-1 text-sm text-gray-500">
						<a href="{base}/profile/{replyAuthor?.handle}" class="font-medium text-gray-900 hover:underline dark:text-gray-100">{replyAuthor?.displayName}</a>
					</div>
					<p class="text-gray-800 dark:text-gray-200">{reply.content}</p>
				</div>
			{/each}
		</div>
	{:else}
		<div data-test="post-replies" class="text-sm text-gray-400">No replies yet.</div>
	{/if}
{:else}
	<p>Post not found.</p>
{/if}
