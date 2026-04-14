<script lang="ts">
	import { feed } from '$lib/stores/feed.svelte';
	import type { Post } from '$lib/types';

	let { data } = $props();

	let composerText = $state('');
	let composerError = $state('');

	// Combine user-composed posts with loaded posts
	let allPosts = $derived([...feed.userPosts, ...data.posts]);

	function getAuthor(authorId: string) {
		return data.users.find((u: { id: string }) => u.id === authorId);
	}

	function submitPost() {
		if (!composerText.trim()) {
			composerError = 'Post cannot be empty';
			return;
		}
		composerError = '';
		feed.addPost(composerText.trim());
		composerText = '';
	}

	function getLikeCount(post: Post): number {
		return post.likeCount + (feed.isLiked(post.id) ? 1 : 0);
	}
</script>

<h1 class="mb-4 text-xl font-bold">Home Feed</h1>

<div class="mb-6 border-b border-gray-200 pb-4 dark:border-gray-700">
	<textarea
		data-test="composer-input"
		bind:value={composerText}
		placeholder="What's on your mind?"
		rows="3"
		class="mb-2 w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
	></textarea>
	{#if composerError}
		<p data-test="composer-error" class="mb-2 text-sm text-red-500">{composerError}</p>
	{/if}
	<button
		data-test="composer-submit"
		onclick={submitPost}
		class="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
	>Post</button>
</div>

<div data-test="feed-list">
{#each allPosts as post}
	{@const author = getAuthor(post.authorId)}
	<div data-test="post-card" class="border-b border-gray-200 py-4 dark:border-gray-700">
		<div data-test="post-author" class="mb-1 text-sm text-gray-500 dark:text-gray-400">
			<a href="/profile/{author?.handle}" class="font-medium text-gray-900 dark:text-gray-100">{author?.displayName ?? 'You'}</a>
			<span>@{author?.handle ?? 'you'}</span>
		</div>
		<a href="/post/{post.id}" class="block">
			<p data-test="post-content">{post.content}</p>
		</a>
		<div class="mt-2 flex items-center gap-4 text-xs text-gray-400">
			<button
				data-test="like-button"
				onclick={() => feed.toggleLike(post.id)}
				class="flex items-center gap-1 rounded px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 {feed.isLiked(post.id) ? 'active text-red-500' : ''}"
			>
				{feed.isLiked(post.id) ? '❤️' : '🤍'}
				<span data-test="like-count">{getLikeCount(post)}</span>
			</button>
			<button
				data-test="bookmark-button"
				onclick={() => feed.toggleBookmark(post.id)}
				class="flex items-center gap-1 rounded px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 {feed.isBookmarked(post.id) ? 'active text-amber-500' : ''}"
			>
				{feed.isBookmarked(post.id) ? '🔖' : '📄'}
			</button>
			<span>{post.repostCount} reposts</span>
		</div>
	</div>
{/each}
</div>
