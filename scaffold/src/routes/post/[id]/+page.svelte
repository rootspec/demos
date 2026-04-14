<script lang="ts">
	import { base } from '$app/paths';

	let { data } = $props();

	function getAuthor(authorId: string) {
		return data.users.find((u: { id: string }) => u.id === authorId);
	}
</script>

{#if data.post}
	{@const author = getAuthor(data.post.authorId)}
	<div class="mb-6">
		<div class="mb-1 text-sm text-gray-500">
			<a href="{base}/profile/{author?.handle}" class="font-medium text-gray-900 dark:text-gray-100" data-test="post-author">{author?.displayName}</a>
			<span>@{author?.handle}</span>
		</div>
		<p class="text-lg text-gray-900 dark:text-gray-100" data-test="post-content">{data.post.content}</p>
		<div class="mt-2 text-sm text-gray-400">
			{data.post.likeCount} likes &middot; {data.post.repostCount} reposts
		</div>
	</div>

	{#if data.replies.length > 0}
		<h2 class="mb-2 font-bold">Replies</h2>
		{#each data.replies as reply}
			{@const replyAuthor = getAuthor(reply.authorId)}
			<div class="border-t border-gray-200 py-3 pl-4 dark:border-gray-700">
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
