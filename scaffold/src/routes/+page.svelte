<script lang="ts">
	import { feed } from '$lib/stores/feed.svelte';
	import type { Post } from '$lib/types';

	let { data } = $props();

	let composerText = $state('');
	let displayedCount = $state(10);

	let allPosts = $derived([...feed.userPosts, ...data.posts]);
	let displayedPosts = $derived(allPosts.slice(0, displayedCount));
	let hasMore = $derived(displayedCount < allPosts.length);

	function getAuthor(authorId: string) {
		return data.users.find((u: { id: string }) => u.id === authorId);
	}

	function handleSubmit() {
		if (!composerText.trim()) return;
		feed.addPost(composerText.trim());
		composerText = '';
	}
</script>

<h1 class="mb-4 text-xl font-bold">Home Feed</h1>

<!-- Composer -->
<div class="mb-6 rounded border border-gray-200 p-4 dark:border-gray-700">
	<textarea
		data-test="composer-input"
		bind:value={composerText}
		placeholder="What's on your mind?"
		class="mb-3 w-full resize-none rounded border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
		rows="3"
	></textarea>
	<button
		data-test="composer-submit"
		onclick={handleSubmit}
		disabled={!composerText.trim()}
		class="rounded bg-blue-600 px-4 py-1.5 text-sm text-white disabled:opacity-40"
	>Post</button>
</div>

<!-- Feed Posts -->
{#each displayedPosts as post (post.id)}
	{@const author = getAuthor(post.authorId)}
	<div data-test="post-card" class="border-b border-gray-200 py-4 dark:border-gray-700">
		<div class="mb-1 text-sm text-gray-500 dark:text-gray-400">
			<a
				data-test="post-author-link"
				href="/demos/scaffold/profile/{author?.handle}"
				class="font-medium text-gray-900 hover:underline dark:text-gray-100"
			>
				<span data-test="post-author">{author?.displayName}</span>
			</a>
			<span>@{author?.handle}</span>
		</div>
		<a href="/demos/scaffold/post/{post.id}" class="block">
			<p data-test="post-content">{post.content}</p>
		</a>
		<div class="mt-2 flex items-center gap-4 text-xs text-gray-400">
			<button
				data-test="like-btn"
				data-liked={feed.isLiked(post.id)}
				onclick={() => feed.toggleLike(post.id)}
				class="flex items-center gap-1 hover:text-red-500 {feed.isLiked(post.id) ? 'text-red-500' : ''}"
			>
				{feed.isLiked(post.id) ? '♥' : '♡'}
				<span data-test="like-count">{post.likeCount + (feed.isLiked(post.id) ? 1 : 0)}</span>
			</button>
			<span>
				<span data-test="repost-count">{post.repostCount}</span> reposts
			</span>
			<button
				data-test="bookmark-btn"
				data-bookmarked={feed.isBookmarked(post.id)}
				onclick={() => feed.toggleBookmark(post.id)}
				class="flex items-center gap-1 hover:text-amber-500 {feed.isBookmarked(post.id) ? 'text-amber-500' : ''}"
			>
				{feed.isBookmarked(post.id) ? '🔖' : '☆'} Save
			</button>
		</div>
	</div>
{/each}

{#if hasMore}
	<button
		data-test="load-more-btn"
		onclick={() => { displayedCount += 10; }}
		class="mt-4 w-full rounded border border-gray-200 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400"
	>
		Load more
	</button>
{/if}
